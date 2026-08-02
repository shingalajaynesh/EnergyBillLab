import { Injectable, Logger } from '@nestjs/common';
import {
  dataImportRuns,
  getWriteDatabaseClient,
  naturalGasGeographies,
  naturalGasResidentialPricesMonthly,
} from '@energy-bill-lab/database';
import { eq, sql } from 'drizzle-orm';

import { EiaClientService } from '../../infrastructure/eia/eia-client.service';
import type { NaturalGasEiaRow } from '../../infrastructure/eia/natural-gas-eia-client.schema';

const ADVISORY_LOCK_ID = 987654322;
const MCF_TO_THERM_DIVISOR = 10.36;

export interface NaturalGasImportOptions {
  importType?: 'scheduled' | 'manual' | 'backfill';
  startPeriod?: string;
  endPeriod?: string;
  dryRun?: boolean;
}

export interface NaturalGasImportReport {
  importRunId: string;
  status: 'succeeded' | 'failed' | 'locked';
  mode: 'import-and-publish' | 'dry-run' | 'no-op' | 'failed';
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
  rejectionBreakdown?: Record<string, number>;
  issues: Array<{ severity: 'info' | 'warning' | 'critical'; message: string }>;
}

export type ParseRowResult =
  | {
      success: true;
      data: {
        geographyCode: string;
        period: string; // YYYY-MM-01
        priceDollarsPerMcf: string;
        priceDollarsPerTherm: string;
      };
    }
  | {
      success: false;
      reason:
        | 'NON_POSITIVE_SOURCE_VALUE'
        | 'UNKNOWN_GEOGRAPHY'
        | 'INVALID_PERIOD'
        | 'WRONG_UNIT'
        | 'WRONG_PROCESS'
        | 'WRONG_PRODUCT';
      rawPeriod?: string;
      rawDuoarea?: string;
      rawValue?: number | null;
    };

@Injectable()
export class NaturalGasImportService {
  private readonly logger = new Logger(NaturalGasImportService.name);

  constructor(private readonly eiaClient: EiaClientService) {}

  async syncLatestPeriod(): Promise<NaturalGasImportReport> {
    return this.runImport({ importType: 'scheduled', dryRun: false });
  }

  async runImport(options: NaturalGasImportOptions = {}): Promise<NaturalGasImportReport> {
    const importRunId = `eia-ng-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    const db = getWriteDatabaseClient();

    const report: NaturalGasImportReport = {
      importRunId,
      status: 'failed',
      mode: options.dryRun ? 'dry-run' : 'import-and-publish',
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

    if (!options.dryRun && !db) {
      this.logger.error('DATABASE_URL is not configured for natural gas import write execution.');
      report.issues.push({
        severity: 'critical',
        message: 'DATABASE_URL connection string unavailable.',
      });
      return report;
    }

    const startTime = Date.now();

    try {
      if (db) {
        await this.seedGeographies(db);
      }

      this.logger.log(
        `Starting natural gas import run ${importRunId} (dryRun=${!!options.dryRun})`,
      );

      if (!options.dryRun && db) {
        const lockRes = await db.execute<{ locked: boolean }>(
          sql`SELECT pg_try_advisory_xact_lock(${ADVISORY_LOCK_ID}) as locked`,
        );
        const rawRows = Array.isArray(lockRes.rows)
          ? lockRes.rows
          : (lockRes as unknown as Array<{ locked: boolean }>);
        if (rawRows.length > 0 && !rawRows[0]?.locked) {
          this.logger.warn(
            `Natural gas import ${importRunId} skipped: advisory lock ${ADVISORY_LOCK_ID} active.`,
          );
          report.status = 'locked';
          return report;
        }

        await db.insert(dataImportRuns).values({
          id: importRunId,
          source: 'EIA',
          dataset: 'eia-natural-gas-residential-prices',
          importType: options.importType || 'manual',
          status: 'running',
          startedAt: new Date(),
        });
      }

      const eiaResult = await this.eiaClient.fetchNaturalGasData({
        startPeriod: options.startPeriod,
        endPeriod: options.endPeriod,
        length: 5000,
        sortDirection: 'desc',
      });

      report.sourceTotalRows = eiaResult.total;
      report.fetchedRows = eiaResult.rows.length;

      const validRows: Array<{
        geographyCode: string;
        period: string; // YYYY-MM-01
        priceDollarsPerMcf: string;
        priceDollarsPerTherm: string;
      }> = [];

      const periodsSet = new Set<string>();
      const geoSet = new Set<string>();

      const rejectionBreakdown: Record<string, number> = {
        NON_POSITIVE_SOURCE_VALUE: 0,
        UNKNOWN_GEOGRAPHY: 0,
        INVALID_PERIOD: 0,
        WRONG_UNIT: 0,
        WRONG_PROCESS: 0,
        WRONG_PRODUCT: 0,
      };

      const rejectionExamples: Array<{
        period: string;
        duoarea: string;
        value: number | null | undefined;
        reason: string;
      }> = [];

      for (const row of eiaResult.rows) {
        const result = this.parseAndValidateRow(row);
        if (!result.success) {
          report.rejectedRows++;
          rejectionBreakdown[result.reason] = (rejectionBreakdown[result.reason] || 0) + 1;
          if (rejectionExamples.length < 10) {
            rejectionExamples.push({
              period: result.rawPeriod || 'N/A',
              duoarea: result.rawDuoarea || 'N/A',
              value: result.rawValue,
              reason: result.reason,
            });
          }
          continue;
        }

        validRows.push(result.data);
        periodsSet.add(result.data.period);
        geoSet.add(result.data.geographyCode);
      }

      report.validatedRows = validRows.length;
      report.geographyCount = geoSet.size;
      report.rejectionBreakdown = rejectionBreakdown;

      if (report.rejectedRows > 0) {
        this.logger.warn(
          `Rejected ${report.rejectedRows} unusable EIA source rows. Summary breakdown: ${JSON.stringify(rejectionBreakdown)}`,
        );
        if (rejectionExamples.length > 0) {
          this.logger.warn(
            `First ${rejectionExamples.length} rejection examples: ${JSON.stringify(rejectionExamples)}`,
          );
        }
      }

      if (validRows.length === 0) {
        report.status = 'failed';
        report.issues.push({
          severity: 'critical',
          message: 'No valid residential natural gas rows remain after source validation.',
        });
        return report;
      }

      const sortedPeriods = Array.from(periodsSet).sort();
      report.earliestPeriod = sortedPeriods[0] || null;
      report.latestPeriod = sortedPeriods[sortedPeriods.length - 1] || null;

      if (options.dryRun) {
        this.logger.log(
          `Dry-run complete for natural gas. Discovered ${validRows.length} valid rows across ${geoSet.size} geographies. Rejected ${report.rejectedRows} unusable rows.`,
        );
        report.status = 'succeeded';
        return report;
      }

      if (!db) {
        report.status = 'failed';
        report.issues.push({
          severity: 'critical',
          message: 'DATABASE_URL connection string unavailable.',
        });
        return report;
      }

      // Perform upsert inside transaction
      await db.transaction(async (tx) => {
        for (const row of validRows) {
          const res = await tx
            .insert(naturalGasResidentialPricesMonthly)
            .values({
              geographyCode: row.geographyCode,
              period: row.period,
              sector: 'RES',
              priceDollarsPerMcf: row.priceDollarsPerMcf,
              priceDollarsPerTherm: row.priceDollarsPerTherm,
              conversionMethod: 'EIA_HEAT_CONTENT_1036_BTU',
              conversionAssumptions:
                '1 Mcf = 1,036,000 Btu = 10.36 therms (1036 Btu/cu ft average heat content)',
              source: 'EIA',
              sourceDataset: 'natural-gas/pri/sum',
              importRunId,
            })
            .onConflictDoUpdate({
              target: [
                naturalGasResidentialPricesMonthly.geographyCode,
                naturalGasResidentialPricesMonthly.period,
                naturalGasResidentialPricesMonthly.sector,
              ],
              set: {
                priceDollarsPerMcf: row.priceDollarsPerMcf,
                priceDollarsPerTherm: row.priceDollarsPerTherm,
                importRunId,
                updatedAt: new Date(),
              },
            });

          if (res) {
            report.insertedRows++;
          }
        }
      });

      report.status = 'succeeded';

      await db
        .update(dataImportRuns)
        .set({
          status: 'succeeded',
          sourceTotalRows: report.sourceTotalRows,
          fetchedRows: report.fetchedRows,
          validatedRows: report.validatedRows,
          insertedRows: report.insertedRows,
          rejectedRows: report.rejectedRows,
          completedAt: new Date(),
        })
        .where(eq(dataImportRuns.id, importRunId));

      this.logger.log(
        `Natural gas import ${importRunId} succeeded in ${Date.now() - startTime}ms. Inserted/updated ${report.insertedRows} rows.`,
      );
      return report;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`Natural gas import ${importRunId} failed: ${msg}`);
      report.status = 'failed';
      report.issues.push({ severity: 'critical', message: msg });

      if (!options.dryRun && db) {
        await db
          .update(dataImportRuns)
          .set({
            status: 'failed',
            errorSummary: msg,
            completedAt: new Date(),
          })
          .where(eq(dataImportRuns.id, importRunId))
          .catch(() => undefined);
      }

      return report;
    }
  }

  parseAndValidateRow(row: Partial<NaturalGasEiaRow>): ParseRowResult {
    const rawPeriod = row.period;
    const rawDuoarea = row.duoarea;
    const rawValue = row.value;

    if (row.process && row.process !== 'PRS') {
      return { success: false, reason: 'WRONG_PROCESS', rawPeriod, rawDuoarea, rawValue };
    }

    if (row.product && row.product !== 'EPG0') {
      return { success: false, reason: 'WRONG_PRODUCT', rawPeriod, rawDuoarea, rawValue };
    }

    if (row.units && row.units !== '$/MCF' && row.units !== '$/Mcf') {
      return { success: false, reason: 'WRONG_UNIT', rawPeriod, rawDuoarea, rawValue };
    }

    if (
      rawValue === null ||
      rawValue === undefined ||
      !Number.isFinite(rawValue) ||
      rawValue <= 0
    ) {
      return {
        success: false,
        reason: 'NON_POSITIVE_SOURCE_VALUE',
        rawPeriod,
        rawDuoarea,
        rawValue,
      };
    }

    if (!rawPeriod || !/^\d{4}-\d{2}$/.test(rawPeriod)) {
      return { success: false, reason: 'INVALID_PERIOD', rawPeriod, rawDuoarea, rawValue };
    }

    const periodDate = `${rawPeriod}-01`;

    // Map duoarea: 'NUS' -> 'US', 'SCA' -> 'CA', 'STX' -> 'TX', etc.
    let geoCode = 'US';
    const duo = (rawDuoarea || '').toUpperCase();

    if (duo === 'NUS' || duo === 'US') {
      geoCode = 'US';
    } else if (duo.startsWith('S') && duo.length === 3) {
      geoCode = duo.substring(1);
    } else if (duo.length === 2) {
      geoCode = duo;
    } else {
      return { success: false, reason: 'UNKNOWN_GEOGRAPHY', rawPeriod, rawDuoarea, rawValue };
    }

    const priceDollarsPerMcf = Number(rawValue.toFixed(4));
    const priceDollarsPerTherm = Number((priceDollarsPerMcf / MCF_TO_THERM_DIVISOR).toFixed(4));

    return {
      success: true,
      data: {
        geographyCode: geoCode,
        period: periodDate,
        priceDollarsPerMcf: priceDollarsPerMcf.toFixed(4),
        priceDollarsPerTherm: priceDollarsPerTherm.toFixed(4),
      },
    };
  }

  private async seedGeographies(db: ReturnType<typeof getWriteDatabaseClient>) {
    if (!db) return;

    const baseGeographies = [
      { code: 'US', name: 'United States', type: 'NATIONAL' },
      { code: 'AL', name: 'Alabama', type: 'STATE' },
      { code: 'AK', name: 'Alaska', type: 'STATE' },
      { code: 'AZ', name: 'Arizona', type: 'STATE' },
      { code: 'AR', name: 'Arkansas', type: 'STATE' },
      { code: 'CA', name: 'California', type: 'STATE' },
      { code: 'CO', name: 'Colorado', type: 'STATE' },
      { code: 'CT', name: 'Connecticut', type: 'STATE' },
      { code: 'DE', name: 'Delaware', type: 'STATE' },
      { code: 'DC', name: 'District of Columbia', type: 'TERRITORY' },
      { code: 'FL', name: 'Florida', type: 'STATE' },
      { code: 'GA', name: 'Georgia', type: 'STATE' },
      { code: 'HI', name: 'Hawaii', type: 'STATE' },
      { code: 'ID', name: 'Idaho', type: 'STATE' },
      { code: 'IL', name: 'Illinois', type: 'STATE' },
      { code: 'IN', name: 'Indiana', type: 'STATE' },
      { code: 'IA', name: 'Iowa', type: 'STATE' },
      { code: 'KS', name: 'Kansas', type: 'STATE' },
      { code: 'KY', name: 'Kentucky', type: 'STATE' },
      { code: 'LA', name: 'Louisiana', type: 'STATE' },
      { code: 'ME', name: 'Maine', type: 'STATE' },
      { code: 'MD', name: 'Maryland', type: 'STATE' },
      { code: 'MA', name: 'Massachusetts', type: 'STATE' },
      { code: 'MI', name: 'Michigan', type: 'STATE' },
      { code: 'MN', name: 'Minnesota', type: 'STATE' },
      { code: 'MS', name: 'Mississippi', type: 'STATE' },
      { code: 'MO', name: 'Missouri', type: 'STATE' },
      { code: 'MT', name: 'Montana', type: 'STATE' },
      { code: 'NE', name: 'Nebraska', type: 'STATE' },
      { code: 'NV', name: 'Nevada', type: 'STATE' },
      { code: 'NH', name: 'New Hampshire', type: 'STATE' },
      { code: 'NJ', name: 'New Jersey', type: 'STATE' },
      { code: 'NM', name: 'New Mexico', type: 'STATE' },
      { code: 'NY', name: 'New York', type: 'STATE' },
      { code: 'NC', name: 'North Carolina', type: 'STATE' },
      { code: 'ND', name: 'North Dakota', type: 'STATE' },
      { code: 'OH', name: 'Ohio', type: 'STATE' },
      { code: 'OK', name: 'Oklahoma', type: 'STATE' },
      { code: 'OR', name: 'Oregon', type: 'STATE' },
      { code: 'PA', name: 'Pennsylvania', type: 'STATE' },
      { code: 'RI', name: 'Rhode Island', type: 'STATE' },
      { code: 'SC', name: 'South Carolina', type: 'STATE' },
      { code: 'SD', name: 'South Dakota', type: 'STATE' },
      { code: 'TN', name: 'Tennessee', type: 'STATE' },
      { code: 'TX', name: 'Texas', type: 'STATE' },
      { code: 'UT', name: 'Utah', type: 'STATE' },
      { code: 'VT', name: 'Vermont', type: 'STATE' },
      { code: 'VA', name: 'Virginia', type: 'STATE' },
      { code: 'WA', name: 'Washington', type: 'STATE' },
      { code: 'WV', name: 'West Virginia', type: 'STATE' },
      { code: 'WI', name: 'Wisconsin', type: 'STATE' },
      { code: 'WY', name: 'Wyoming', type: 'STATE' },
    ];

    for (const geo of baseGeographies) {
      await db
        .insert(naturalGasGeographies)
        .values(geo)
        .onConflictDoUpdate({
          target: naturalGasGeographies.code,
          set: { name: geo.name, type: geo.type },
        });
    }
  }
}
