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
import { sql } from 'drizzle-orm';
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

    // Try acquiring PostgreSQL advisory lock (ID 987654321)
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
      // 1. Seed canon geographies if missing
      await this.ensureGeographiesSeeded(db);

      // 2. Fetch paginated EIA rows
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

      // 3. Filter & validate rows
      const validRows: Array<{
        geographyCode: string;
        period: string; // YYYY-MM-01
        priceCentsPerKwh: string;
        revenueMillionUsd?: string;
        salesMillionKwh?: string;
        customers?: number;
      }> = [];

      const periodsSet = new Set<string>();
      const geographiesSet = new Set<string>();

      for (const row of allRows) {
        const stateCode = row.stateid.toUpperCase();
        if (!VALID_GEOGRAPHY_CODES.has(stateCode)) {
          report.rejectedRows++;
          continue;
        }

        if (row.price === undefined || row.price === null || row.price <= 0) {
          report.rejectedRows++;
          continue;
        }

        const periodDate = `${row.period}-01`;
        periodsSet.add(row.period);
        geographiesSet.add(stateCode);

        validRows.push({
          geographyCode: stateCode,
          period: periodDate,
          priceCentsPerKwh: row.price.toFixed(4),
          revenueMillionUsd:
            row.revenue !== undefined && row.revenue !== null ? row.revenue.toFixed(4) : undefined,
          salesMillionKwh:
            row.sales !== undefined && row.sales !== null ? row.sales.toFixed(4) : undefined,
          customers: row.customers ?? undefined,
        });
      }

      report.validatedRows = validRows.length;
      report.geographyCount = geographiesSet.size;

      const sortedPeriods = Array.from(periodsSet).sort();
      report.earliestPeriod = sortedPeriods[0] || null;
      report.latestPeriod = sortedPeriods[sortedPeriods.length - 1] || null;

      if (options.dryRun) {
        this.logger.log(`Dry-run completed. Validated ${validRows.length} rows.`);
        report.status = 'succeeded';
        return report;
      }

      // 4. Batch upsert valid rows inside transaction
      let insertedCount = 0;
      const chunkSize = 500;

      for (let i = 0; i < validRows.length; i += chunkSize) {
        const chunk = validRows.slice(i, i + chunkSize);

        const upsertValues = chunk.map((r) => ({
          geographyCode: r.geographyCode,
          period: r.period,
          sector: 'RES',
          priceCentsPerKwh: r.priceCentsPerKwh,
          revenueMillionUsd: r.revenueMillionUsd,
          salesMillionKwh: r.salesMillionKwh,
          customers: r.customers,
          source: 'EIA',
          sourceDataset: 'electricity/retail-sales',
          importRunId,
          importedAt: new Date(),
        }));

        await db
          .insert(electricityRetailSalesMonthly)
          .values(upsertValues)
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

      // 5. Record import run completion
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
