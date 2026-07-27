import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  dataImportRuns,
  electricityGeographies,
  electricityRetailSalesMonthly,
  getWriteDatabaseClient,
  type DatabaseInstance,
  US_GEOGRAPHIES,
  VALID_GEOGRAPHY_CODES,
} from '@energy-bill-lab/database';
import { eq, sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import { EiaClientService } from '../../infrastructure/eia/eia-client.service';
import type { EiaRow } from '../../infrastructure/eia/eia-client.schema';

export type ImportOptions = {
  importType: 'backfill' | 'incremental' | 'manual' | 'verification';
  startPeriod?: string;
  endPeriod?: string;
  dryRun?: boolean;
};

export type QualityReport = {
  importRunId: string;
  status: 'succeeded' | 'partial' | 'failed';
  sourceTotalRows: number;
  fetchedRows: number;
  validatedRows: number;
  insertedRows: number;
  updatedRows: number;
  unchangedRows: number;
  rejectedRows: number;
  geographyCount: number;
  earliestPeriod: string | null;
  latestPeriod: string | null;
  issues: Array<{ severity: 'info' | 'warning' | 'critical'; message: string }>;
};

export type SyncLatestOptions = {
  forceRevalidate?: boolean;
  verifyProduction?: boolean;
};

export type SyncLatestResult = {
  importRunId: string;
  status: 'succeeded' | 'failed' | 'no-op';
  mode: 'no-op' | 'import-and-publish' | 'publish-recovery';
  eiaPeriod: string | null;
  dbPeriod: string | null;
  insertedRows: number;
  revalidated: boolean;
  productionVerified: boolean;
  durationMs: number;
};

@Injectable()
export class ElectricityRateImportService {
  private readonly logger = new Logger(ElectricityRateImportService.name);

  constructor(@Inject(EiaClientService) private readonly eiaClient: EiaClientService) {}

  async runImport(options: ImportOptions): Promise<QualityReport> {
    const importRunId = `eia-${Date.now()}-${uuidv4().substring(0, 8)}`;
    const db = getWriteDatabaseClient();

    const report: QualityReport = {
      importRunId,
      status: 'failed',
      sourceTotalRows: 0,
      fetchedRows: 0,
      validatedRows: 0,
      insertedRows: 0,
      updatedRows: 0,
      unchangedRows: 0,
      rejectedRows: 0,
      geographyCount: 0,
      earliestPeriod: null,
      latestPeriod: null,
      issues: [],
    };

    if (!db) {
      this.logger.error('DATABASE_URL is not configured for import write execution.');
      report.issues.push({
        severity: 'critical',
        message: 'DATABASE_URL connection string unavailable.',
      });
      return report;
    }

    const lockAcquired = await this.acquireAdvisoryLock(db, 987654321);
    if (!lockAcquired) {
      this.logger.warn('Another import process is currently running. Exiting cleanly.');
      report.status = 'partial';
      report.issues.push({
        severity: 'warning',
        message: 'Import locked by concurrent active process.',
      });
      return report;
    }

    try {
      await this.ensureGeographiesSeeded(db);

      let offset = 0;
      const pageSize = 5000;
      let totalRows = 0;
      const allRows: EiaRow[] = [];

      this.logger.log(`Starting EIA import run ${importRunId} (type=${options.importType})`);

      do {
        const result = await this.eiaClient.fetchRetailSalesData({
          startPeriod: options.startPeriod,
          endPeriod: options.endPeriod,
          offset,
          length: pageSize,
        });

        totalRows = result.total;
        allRows.push(...result.rows);
        offset += pageSize;
      } while (offset < totalRows);

      report.sourceTotalRows = totalRows;
      report.fetchedRows = allRows.length;

      const validRows: Array<{
        geographyCode: string;
        period: string;
        sector: 'RES';
        priceCentsPerKwh: string;
        revenueMillionUsd: string | null;
        salesMillionKwh: string | null;
        customers: number | null;
      }> = [];

      let rejectedCount = 0;
      const geographiesSet = new Set<string>();
      const periodsSet = new Set<string>();

      for (const row of allRows) {
        const stateCode = row.stateid.toUpperCase();
        if (!VALID_GEOGRAPHY_CODES.has(stateCode)) {
          rejectedCount++;
          continue;
        }

        const priceNum =
          typeof row.price === 'number' ? row.price : row.price ? parseFloat(String(row.price)) : 0;

        if (isNaN(priceNum) || priceNum <= 0) {
          rejectedCount++;
          continue;
        }

        const revenueNum =
          typeof row.revenue === 'number'
            ? row.revenue
            : row.revenue
              ? parseFloat(String(row.revenue))
              : null;
        const salesNum =
          typeof row.sales === 'number'
            ? row.sales
            : row.sales
              ? parseFloat(String(row.sales))
              : null;
        const customerNum =
          typeof row.customers === 'number'
            ? Math.round(row.customers)
            : row.customers
              ? parseInt(String(row.customers), 10)
              : null;

        geographiesSet.add(stateCode);
        periodsSet.add(row.period);

        validRows.push({
          geographyCode: stateCode,
          period: `${row.period}-01`,
          sector: 'RES',
          priceCentsPerKwh: priceNum.toFixed(4),
          revenueMillionUsd: revenueNum !== null ? revenueNum.toFixed(4) : null,
          salesMillionKwh: salesNum !== null ? salesNum.toFixed(4) : null,
          customers: customerNum,
        });
      }

      report.validatedRows = validRows.length;
      report.rejectedRows = rejectedCount;
      report.geographyCount = geographiesSet.size;

      const sortedPeriods = Array.from(periodsSet).sort();
      report.earliestPeriod = sortedPeriods[0] || null;
      report.latestPeriod = sortedPeriods[sortedPeriods.length - 1] || null;

      if (options.dryRun) {
        this.logger.log(
          `Dry-run complete. Validated ${validRows.length} rows across ${geographiesSet.size} geographies.`,
        );
        report.status = 'succeeded';
        return report;
      }

      let insertedCount = 0;
      const chunkSize = 500;
      for (let i = 0; i < validRows.length; i += chunkSize) {
        const chunk = validRows.slice(i, i + chunkSize);
        await db
          .insert(electricityRetailSalesMonthly)
          .values(
            chunk.map((r) => ({
              geographyCode: r.geographyCode,
              period: r.period,
              sector: r.sector,
              priceCentsPerKwh: r.priceCentsPerKwh,
              revenueMillionUsd: r.revenueMillionUsd,
              salesMillionKwh: r.salesMillionKwh,
              customers: r.customers,
              source: 'EIA',
              sourceDataset: 'electricity/retail-sales',
              importRunId,
              importedAt: new Date(),
              updatedAt: new Date(),
            })),
          )
          .onConflictDoUpdate({
            target: [
              electricityRetailSalesMonthly.geographyCode,
              electricityRetailSalesMonthly.period,
              electricityRetailSalesMonthly.sector,
            ],
            set: {
              priceCentsPerKwh: sql`EXCLUDED.price_cents_per_kwh`,
              revenueMillionUsd: sql`EXCLUDED.revenue_million_usd`,
              salesMillionKwh: sql`EXCLUDED.sales_million_kwh`,
              customers: sql`EXCLUDED.customers`,
              importRunId: sql`EXCLUDED.import_run_id`,
              importedAt: sql`EXCLUDED.imported_at`,
              updatedAt: new Date(),
            },
          });

        insertedCount += chunk.length;
      }

      report.insertedRows = insertedCount;
      report.status = 'succeeded';

      await db.insert(dataImportRuns).values({
        id: importRunId,
        source: 'EIA',
        dataset: 'electricity/retail-sales',
        importType: options.importType,
        status: report.status,
        requestedStartPeriod: options.startPeriod ? `${options.startPeriod}-01` : undefined,
        requestedEndPeriod: options.endPeriod ? `${options.endPeriod}-01` : undefined,
        sourceTotalRows: report.sourceTotalRows,
        fetchedRows: report.fetchedRows,
        validatedRows: report.validatedRows,
        insertedRows: report.insertedRows,
        updatedRows: report.updatedRows,
        unchangedRows: report.unchangedRows,
        rejectedRows: report.rejectedRows,
        completedAt: new Date(),
      });

      this.logger.log(`Import run ${importRunId} succeeded cleanly.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`Import run ${importRunId} failed: ${msg}`);
      report.status = 'failed';
      report.issues.push({ severity: 'critical', message: msg });
    } finally {
      if (db) {
        await this.releaseAdvisoryLock(db, 987654321);
      }
    }

    return report;
  }

  /**
   * Automated production-safe EIA sync & live revalidation pipeline.
   */
  async syncLatestPeriod(options: SyncLatestOptions = {}): Promise<SyncLatestResult> {
    const startTime = Date.now();
    const importRunId = `eia-sync-${Date.now()}-${uuidv4().substring(0, 8)}`;
    const db = getWriteDatabaseClient();

    const result: SyncLatestResult = {
      importRunId,
      status: 'failed',
      mode: 'no-op',
      eiaPeriod: null,
      dbPeriod: null,
      insertedRows: 0,
      revalidated: false,
      productionVerified: false,
      durationMs: 0,
    };

    if (!db) {
      this.logger.error('DATABASE_URL is not configured for EIA sync execution.');
      return result;
    }

    const lockAcquired = await this.acquireAdvisoryLock(db, 987654321);
    if (!lockAcquired) {
      this.logger.warn(
        'Another import process holds the advisory lock (987654321). Exiting cleanly.',
      );
      result.status = 'no-op';
      result.durationMs = Date.now() - startTime;
      return result;
    }

    try {
      await this.ensureGeographiesSeeded(db);

      // 1. Discover latest EIA reporting period
      const sample = await this.eiaClient.fetchRetailSalesData({ length: 100 });
      const rawPeriods: string[] = sample.rows
        .filter((r: EiaRow) => {
          const p = typeof r.price === 'number' ? r.price : parseFloat(String(r.price ?? '0'));
          return VALID_GEOGRAPHY_CODES.has(r.stateid.toUpperCase()) && p > 0;
        })
        .map((r: EiaRow) => r.period);

      const sortedEiaPeriods: string[] = Array.from(new Set(rawPeriods)).sort();
      const latestEiaPeriod: string | undefined = sortedEiaPeriods[sortedEiaPeriods.length - 1];

      if (!latestEiaPeriod) {
        this.logger.error('Failed to discover latest EIA reporting period.');
        return result;
      }
      result.eiaPeriod = latestEiaPeriod;

      // 2. Query latest database period
      const dbRes = await db.execute<{ latest_period: string | null }>(
        sql`SELECT MAX(period)::text as latest_period FROM electricity_retail_sales_monthly WHERE sector = 'RES'`,
      );
      const dbRows =
        (dbRes as unknown as { rows: Array<{ latest_period: string | null }> }).rows || dbRes;
      const firstRow = Array.isArray(dbRows) ? dbRows[0] : undefined;
      const rawDbPeriod = firstRow?.latest_period;
      const latestDbPeriod: string | null =
        typeof rawDbPeriod === 'string' ? rawDbPeriod.substring(0, 7) : null;
      result.dbPeriod = latestDbPeriod;

      this.logger.log(
        `EIA Latest Period: ${latestEiaPeriod} | DB Latest Period: ${latestDbPeriod || 'NONE'}`,
      );

      // 3. Determine Execution Mode
      const prodBaseUrl =
        process.env.ENERGY_DATA_PRODUCTION_BASE_URL || 'https://energybilllab.com';

      if (latestDbPeriod && latestEiaPeriod < latestDbPeriod) {
        this.logger.warn(
          `EIA period (${latestEiaPeriod}) is older than DB period (${latestDbPeriod}). No-op.`,
        );
        result.mode = 'no-op';
        result.status = 'succeeded';
        result.durationMs = Date.now() - startTime;
        return result;
      }

      let mode: 'no-op' | 'import-and-publish' | 'publish-recovery' = 'import-and-publish';

      if (latestDbPeriod && latestEiaPeriod === latestDbPeriod) {
        const prodCheck = await this.checkProductionIsCurrent(prodBaseUrl, latestEiaPeriod);
        if (prodCheck && !options.forceRevalidate) {
          this.logger.log(
            `EIA period equals DB period (${latestEiaPeriod}) and production is verified current. No-op.`,
          );
          result.mode = 'no-op';
          result.status = 'succeeded';
          result.durationMs = Date.now() - startTime;
          return result;
        }
        this.logger.log(
          `EIA period equals DB period (${latestEiaPeriod}) but production is stale. Entering publish-recovery mode.`,
        );
        mode = 'publish-recovery';
      }

      result.mode = mode;

      // 4. Record data_import_runs row with status "running"
      await db.insert(dataImportRuns).values({
        id: importRunId,
        source: 'EIA',
        dataset: 'electricity/retail-sales',
        importType: 'incremental',
        status: 'running',
        requestedStartPeriod: `${latestEiaPeriod}-01`,
        requestedEndPeriod: `${latestEiaPeriod}-01`,
        sourceTotalRows: sample.total,
        fetchedRows: sample.rows.length,
        validatedRows: 0,
        insertedRows: 0,
        updatedRows: 0,
        unchangedRows: 0,
        rejectedRows: 0,
      });

      // 5. Complete-Dataset Validation & Database Transaction (if import-and-publish)
      if (mode === 'import-and-publish') {
        const fullRes = await this.eiaClient.fetchRetailSalesData({
          startPeriod: latestEiaPeriod,
          endPeriod: latestEiaPeriod,
          length: 5000,
        });

        const validRows: Array<{
          geographyCode: string;
          period: string;
          sector: 'RES';
          priceCentsPerKwh: string;
          revenueMillionUsd: string | null;
          salesMillionKwh: string | null;
          customers: number | null;
        }> = [];

        const geographiesSet = new Set<string>();

        for (const row of fullRes.rows) {
          const stateCode = row.stateid.toUpperCase();
          if (!VALID_GEOGRAPHY_CODES.has(stateCode)) {
            continue;
          }

          const priceNum =
            typeof row.price === 'number'
              ? row.price
              : row.price
                ? parseFloat(String(row.price))
                : 0;

          if (isNaN(priceNum) || priceNum <= 0) {
            continue;
          }

          const revenueNum =
            typeof row.revenue === 'number'
              ? row.revenue
              : row.revenue
                ? parseFloat(String(row.revenue))
                : null;
          const salesNum =
            typeof row.sales === 'number'
              ? row.sales
              : row.sales
                ? parseFloat(String(row.sales))
                : null;
          const customerNum =
            typeof row.customers === 'number'
              ? Math.round(row.customers)
              : row.customers
                ? parseInt(String(row.customers), 10)
                : null;

          geographiesSet.add(stateCode);
          validRows.push({
            geographyCode: stateCode,
            period: `${latestEiaPeriod}-01`,
            sector: 'RES',
            priceCentsPerKwh: priceNum.toFixed(4),
            revenueMillionUsd: revenueNum !== null ? revenueNum.toFixed(4) : null,
            salesMillionKwh: salesNum !== null ? salesNum.toFixed(4) : null,
            customers: customerNum,
          });
        }

        if (geographiesSet.size !== 52 || !geographiesSet.has('US') || !geographiesSet.has('NC')) {
          const errMsg = `Complete-dataset validation failed for ${latestEiaPeriod}: expected 52 geographies, got ${geographiesSet.size}`;
          this.logger.error(errMsg);
          await db
            .update(dataImportRuns)
            .set({ status: 'failed', completedAt: new Date() })
            .where(eq(dataImportRuns.id, importRunId));
          return result;
        }

        // Execute single transactional upsert
        await db.transaction(async (tx) => {
          for (const r of validRows) {
            await tx
              .insert(electricityRetailSalesMonthly)
              .values({
                geographyCode: r.geographyCode,
                period: r.period,
                sector: r.sector,
                priceCentsPerKwh: r.priceCentsPerKwh,
                revenueMillionUsd: r.revenueMillionUsd,
                salesMillionKwh: r.salesMillionKwh,
                customers: r.customers,
                source: 'EIA',
                sourceDataset: 'electricity/retail-sales',
                importRunId,
                importedAt: new Date(),
                updatedAt: new Date(),
              })
              .onConflictDoUpdate({
                target: [
                  electricityRetailSalesMonthly.geographyCode,
                  electricityRetailSalesMonthly.period,
                  electricityRetailSalesMonthly.sector,
                ],
                set: {
                  priceCentsPerKwh: sql`EXCLUDED.price_cents_per_kwh`,
                  revenueMillionUsd: sql`EXCLUDED.revenue_million_usd`,
                  salesMillionKwh: sql`EXCLUDED.sales_million_kwh`,
                  customers: sql`EXCLUDED.customers`,
                  importRunId: sql`EXCLUDED.import_run_id`,
                  importedAt: sql`EXCLUDED.imported_at`,
                  updatedAt: new Date(),
                },
              });
          }
        });

        result.insertedRows = validRows.length;
        this.logger.log(
          `Transactional database upsert succeeded (${validRows.length} rows) for ${latestEiaPeriod}.`,
        );
      }

      // 6. Cache Revalidation Stage
      const revalidationSecret = process.env.ENERGY_DATA_REVALIDATION_SECRET;
      const revalidationUrl =
        process.env.ENERGY_DATA_REVALIDATION_URL ||
        'https://energybilllab.com/api/internal/revalidate-energy-data';

      if (revalidationSecret) {
        try {
          this.logger.log(`Calling revalidation endpoint: ${revalidationUrl}`);
          const revalRes = await fetch(revalidationUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-revalidation-secret': revalidationSecret,
            },
            body: JSON.stringify({ period: latestEiaPeriod }),
          });

          if (revalRes.ok) {
            result.revalidated = true;
            this.logger.log(`Cache revalidation endpoint returned HTTP ${revalRes.status}.`);
          } else {
            this.logger.error(`Cache revalidation endpoint returned HTTP ${revalRes.status}`);
          }
        } catch (revalErr) {
          const msg = revalErr instanceof Error ? revalErr.message : String(revalErr);
          this.logger.error(`Cache revalidation call failed: ${msg}`);
        }
      } else {
        this.logger.warn(
          'ENERGY_DATA_REVALIDATION_SECRET is not configured; skipping remote revalidation API call.',
        );
      }

      // 7. Live Production Verification Stage
      if (options.verifyProduction !== false) {
        this.logger.log(`Verifying live production output against ${prodBaseUrl}...`);
        const isLiveCurrent = await this.verifyProductionWithRetries(prodBaseUrl, latestEiaPeriod);
        result.productionVerified = isLiveCurrent;

        if (!isLiveCurrent) {
          this.logger.error(
            `Production verification failed for period ${latestEiaPeriod}. Marking run failed.`,
          );
          await db
            .update(dataImportRuns)
            .set({ status: 'failed', completedAt: new Date() })
            .where(eq(dataImportRuns.id, importRunId));
          result.durationMs = Date.now() - startTime;
          return result;
        }
      } else {
        result.productionVerified = true;
      }

      // 8. Mark Run Succeeded
      await db
        .update(dataImportRuns)
        .set({
          status: 'succeeded',
          validatedRows: 52,
          insertedRows: result.insertedRows,
          completedAt: new Date(),
        })
        .where(eq(dataImportRuns.id, importRunId));

      result.status = 'succeeded';
      this.logger.log(
        `EIA sync & publication run ${importRunId} SUCCEEDED completely for ${latestEiaPeriod}.`,
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`EIA sync run ${importRunId} failed: ${msg}`);
      await db
        .update(dataImportRuns)
        .set({ status: 'failed', completedAt: new Date() })
        .where(eq(dataImportRuns.id, importRunId));
    } finally {
      await this.releaseAdvisoryLock(db, 987654321);
      result.durationMs = Date.now() - startTime;
    }

    return result;
  }

  private async checkProductionIsCurrent(
    prodBaseUrl: string,
    expectedPeriod: string,
  ): Promise<boolean> {
    try {
      const targetUrl = `${prodBaseUrl}/research/us-residential-electricity-rate-report/csv`;
      const res = await fetch(targetUrl, { method: 'HEAD' });
      const reportPeriod = res.headers.get('x-report-period');
      if (reportPeriod && reportPeriod.startsWith(expectedPeriod)) {
        return true;
      }
    } catch {
      // Fallback
    }
    return false;
  }

  private async verifyProductionWithRetries(
    prodBaseUrl: string,
    expectedPeriod: string,
  ): Promise<boolean> {
    const delaysMs = [0, 5000, 15000];
    for (let attempt = 0; attempt < delaysMs.length; attempt++) {
      if (delaysMs[attempt]! > 0) {
        await new Promise((r) => setTimeout(r, delaysMs[attempt]));
      }

      try {
        const csvUrl = `${prodBaseUrl}/research/us-residential-electricity-rate-report/csv`;
        const res = await fetch(csvUrl);
        if (res.ok) {
          const headerPeriod = res.headers.get('x-report-period');
          const body = await res.text();
          if (headerPeriod?.startsWith(expectedPeriod) || body.includes(expectedPeriod)) {
            return true;
          }
        }
      } catch {
        // Retry
      }
    }
    return false;
  }

  private async acquireAdvisoryLock(db: DatabaseInstance, lockId: number): Promise<boolean> {
    try {
      const res = await db.execute<{ locked: boolean }>(
        sql`SELECT pg_try_advisory_lock(${lockId}) as locked`,
      );
      const rawRows = Array.isArray(res.rows)
        ? res.rows
        : (res as unknown as Array<{ locked: boolean }>);
      const row = rawRows[0];
      return Boolean(row?.locked);
    } catch {
      return false;
    }
  }

  private async releaseAdvisoryLock(db: DatabaseInstance, lockId: number): Promise<void> {
    try {
      await db.execute(sql`SELECT pg_advisory_unlock(${lockId})`);
    } catch {
      // Ignore unlock failure
    }
  }

  private async ensureGeographiesSeeded(db: DatabaseInstance): Promise<void> {
    for (const g of US_GEOGRAPHIES) {
      await db
        .insert(electricityGeographies)
        .values({
          code: g.code,
          slug: g.slug,
          name: g.name,
          kind: g.kind,
          displayOrder: g.displayOrder,
          isActive: true,
        })
        .onConflictDoNothing();
    }
  }
}
