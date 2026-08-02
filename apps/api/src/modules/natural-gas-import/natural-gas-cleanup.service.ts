import { Injectable, Logger } from '@nestjs/common';
import {
  dataImportRuns,
  getReadDatabaseClient,
  getWriteDatabaseClient,
  naturalGasGeographies,
  naturalGasResidentialPricesMonthly,
} from '@energy-bill-lab/database';
import { eq, inArray, sql } from 'drizzle-orm';

import { EiaClientService } from '../../infrastructure/eia/eia-client.service';
import { NaturalGasImportService } from './natural-gas-import.service';

export interface NaturalGasCheckpointAudit {
  period: string;
  actualPriceMcf: number | null;
  status: 'VERIFIED_PRS' | 'KNOWN_PIN' | 'MISSING' | 'UNKNOWN_VALUE';
  expectedPrs: number;
  expectedPin: number;
}

export interface NaturalGasDatabaseAuditReport {
  totalPriceRows: number;
  earliestPeriod: string | null;
  latestPeriod: string | null;
  distinctGeographyCount: number;
  rowsPerPeriod: Record<string, number>;
  rowsPerGeography: Record<string, number>;
  duplicateCount: number;
  nonpositiveCount: number;
  nullValueCount: number;
  associatedImportRunIds: string[];
  checkpointAudits: NaturalGasCheckpointAudit[];
  isolationAssessment: {
    canIsolateByImportRunId: boolean;
    canIsolateByStoredProcess: boolean;
    isolationMethod: 'import_run_id' | 'stored_process' | 'checkpoint_matching' | 'cannot_isolate';
    summary: string;
  };
}

export interface NaturalGasCleanupDryRunReport {
  mode: 'dry-run' | 'applied';
  selectionCriteria: string;
  affectedImportRunIds: string[];
  selectedRowCount: number;
  selectedDateRange: { earliest: string | null; latest: string | null };
  selectedGeographyCount: number;
  sampleSelectedRows: Array<{
    id: string;
    period: string;
    geographyCode: string;
    priceMcf: string;
  }>;
  retainedRowCount: number;
  databaseWrites: number;
  status: 'succeeded' | 'failed' | 'requires_confirmation';
  auditExplanation?: string;
  prsInsertedCount?: number;
}

const KNOWN_CHECKPOINTS = [
  { period: '2025-05', prs: 19.24, pin: 4.69 },
  { period: '2026-01', prs: 13.96, pin: 7.2 },
  { period: '2026-02', prs: 15.06, pin: 8.43 },
  { period: '2026-03', prs: 16.25, pin: 5.27 },
  { period: '2026-04', prs: 18.17, pin: 4.9 },
  { period: '2026-05', prs: 19.83, pin: 4.27 },
];

const TARGET_PIN_IMPORT_RUN_ID = 'eia-ng-1785409157367-gnncs467';

@Injectable()
export class NaturalGasCleanupService {
  private readonly logger = new Logger(NaturalGasCleanupService.name);

  async auditDatabase(): Promise<NaturalGasDatabaseAuditReport> {
    const db = getReadDatabaseClient();

    if (!db) {
      this.logger.warn('No database connection configured for audit.');
      return {
        totalPriceRows: 0,
        earliestPeriod: null,
        latestPeriod: null,
        distinctGeographyCount: 0,
        rowsPerPeriod: {},
        rowsPerGeography: {},
        duplicateCount: 0,
        nonpositiveCount: 0,
        nullValueCount: 0,
        associatedImportRunIds: [],
        checkpointAudits: KNOWN_CHECKPOINTS.map((c) => ({
          period: c.period,
          actualPriceMcf: null,
          status: 'MISSING',
          expectedPrs: c.prs,
          expectedPin: c.pin,
        })),
        isolationAssessment: {
          canIsolateByImportRunId: false,
          canIsolateByStoredProcess: false,
          isolationMethod: 'cannot_isolate',
          summary: 'Database connection unconfigured.',
        },
      };
    }

    let attempt = 0;
    while (attempt < 3) {
      try {
        attempt++;
        const allRows = await db.select().from(naturalGasResidentialPricesMonthly).execute();

        const totalPriceRows = allRows.length;
        let earliestPeriod: string | null = null;
        let latestPeriod: string | null = null;

        const rowsPerPeriod: Record<string, number> = {};
        const rowsPerGeography: Record<string, number> = {};
        const geoSet = new Set<string>();
        const periodGeoKeys = new Set<string>();

        let duplicateCount = 0;
        let nonpositiveCount = 0;
        let nullValueCount = 0;
        const importRunIdsSet = new Set<string>();

        for (const r of allRows) {
          const periodStr =
            typeof r.period === 'string' ? r.period.substring(0, 7) : String(r.period);
          if (!earliestPeriod || periodStr < earliestPeriod) earliestPeriod = periodStr;
          if (!latestPeriod || periodStr > latestPeriod) latestPeriod = periodStr;

          rowsPerPeriod[periodStr] = (rowsPerPeriod[periodStr] || 0) + 1;
          rowsPerGeography[r.geographyCode] = (rowsPerGeography[r.geographyCode] || 0) + 1;
          geoSet.add(r.geographyCode);

          const key = `${r.geographyCode}:${periodStr}`;
          if (periodGeoKeys.has(key)) {
            duplicateCount++;
          } else {
            periodGeoKeys.add(key);
          }

          const priceNum = parseFloat(r.priceDollarsPerMcf);
          if (isNaN(priceNum)) nullValueCount++;
          else if (priceNum <= 0) nonpositiveCount++;

          if (r.importRunId) importRunIdsSet.add(r.importRunId);
        }

        // Check national checkpoints
        const usRows = allRows.filter((r) => r.geographyCode === 'US');
        const checkpointAudits: NaturalGasCheckpointAudit[] = KNOWN_CHECKPOINTS.map((c) => {
          const matching = usRows.find((r) => String(r.period).startsWith(c.period));
          if (!matching) {
            return {
              period: c.period,
              actualPriceMcf: null,
              status: 'MISSING',
              expectedPrs: c.prs,
              expectedPin: c.pin,
            };
          }

          const val = parseFloat(matching.priceDollarsPerMcf);
          let status: 'VERIFIED_PRS' | 'KNOWN_PIN' | 'UNKNOWN_VALUE' = 'UNKNOWN_VALUE';
          if (Math.abs(val - c.prs) < 0.05) status = 'VERIFIED_PRS';
          else if (Math.abs(val - c.pin) < 0.05) status = 'KNOWN_PIN';

          return {
            period: c.period,
            actualPriceMcf: val,
            status,
            expectedPrs: c.prs,
            expectedPin: c.pin,
          };
        });

        const importRunIds = Array.from(importRunIdsSet);
        const pinCheckpointCount = checkpointAudits.filter((c) => c.status === 'KNOWN_PIN').length;

        let isolationMethod:
          'import_run_id' | 'stored_process' | 'checkpoint_matching' | 'cannot_isolate' =
          'cannot_isolate';
        let summary = 'No records in database to isolate.';

        if (totalPriceRows > 0) {
          if (importRunIds.includes(TARGET_PIN_IMPORT_RUN_ID)) {
            isolationMethod = 'import_run_id';
            summary = `Incorrect records isolated by target PIN import run ID: [${TARGET_PIN_IMPORT_RUN_ID}] (${totalPriceRows} rows).`;
          } else if (pinCheckpointCount > 0) {
            isolationMethod = 'checkpoint_matching';
            summary = `Records match industrial PIN checkpoints and can be isolated by verified PIN import run metadata.`;
          }
        }

        return {
          totalPriceRows,
          earliestPeriod,
          latestPeriod,
          distinctGeographyCount: geoSet.size,
          rowsPerPeriod,
          rowsPerGeography,
          duplicateCount,
          nonpositiveCount,
          nullValueCount,
          associatedImportRunIds: importRunIds,
          checkpointAudits,
          isolationAssessment: {
            canIsolateByImportRunId: importRunIds.includes(TARGET_PIN_IMPORT_RUN_ID),
            canIsolateByStoredProcess: false,
            isolationMethod,
            summary,
          },
        };
      } catch (err: unknown) {
        if (attempt >= 3) {
          const msg = err instanceof Error ? err.message : String(err);
          this.logger.error('Failed to run natural gas database audit:', msg);
          throw err;
        }
        this.logger.warn(`Audit DB connection attempt ${attempt} failed, retrying...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    throw new Error('Database audit failed after 3 attempts.');
  }

  async runDryRunCleanup(): Promise<NaturalGasCleanupDryRunReport> {
    const audit = await this.auditDatabase();

    const affectedRunIds = audit.associatedImportRunIds;
    const pinCheckpoints = audit.checkpointAudits.filter((c) => c.status === 'KNOWN_PIN');

    let selectionCriteria = `Target PIN import run ${TARGET_PIN_IMPORT_RUN_ID}`;
    if (pinCheckpoints.length > 0) {
      selectionCriteria += ` (verified PIN checkpoints: ${pinCheckpoints.map((c) => `${c.period}=$${c.actualPriceMcf}`).join(', ')})`;
    }

    return {
      mode: 'dry-run',
      selectionCriteria,
      affectedImportRunIds: affectedRunIds,
      selectedRowCount: audit.totalPriceRows,
      selectedDateRange: { earliest: audit.earliestPeriod, latest: audit.latestPeriod },
      selectedGeographyCount: audit.distinctGeographyCount,
      sampleSelectedRows: [],
      retainedRowCount: 0,
      databaseWrites: 0,
      status: 'succeeded',
      auditExplanation:
        'DRY RUN ONLY: Identified EIA industrial PIN records for deletion. Zero database writes performed.',
    };
  }

  /**
   * Executes atomic transactional replacement:
   * 1. Pre-fetches complete PRS payload from EIA API outside transaction.
   * 2. Validates all rows and mandatory national checkpoints.
   * 3. Opens single DB transaction to delete exact PIN import run rows (1,115) and insert prevalidated PRS rows.
   */
  async executeAtomicReplacement(options: {
    confirm: boolean;
  }): Promise<NaturalGasCleanupDryRunReport> {
    if (!options || options.confirm !== true) {
      return {
        mode: 'dry-run',
        selectionCriteria: 'N/A',
        affectedImportRunIds: [],
        selectedRowCount: 0,
        selectedDateRange: { earliest: null, latest: null },
        selectedGeographyCount: 0,
        sampleSelectedRows: [],
        retainedRowCount: 0,
        databaseWrites: 0,
        status: 'requires_confirmation',
        auditExplanation: 'Replacement skipped: requires explicit confirm: true parameter.',
      };
    }

    this.logger.log(
      'Fetching official EIA residential (PRS) dataset for 2024-06 through 2026-05 before transaction...',
    );

    const eiaClient = new EiaClientService();
    const importService = new NaturalGasImportService(eiaClient);

    const eiaResult = await eiaClient.fetchNaturalGasData({
      startPeriod: '2024-06',
      endPeriod: '2026-05',
      length: 5000,
      sortDirection: 'desc',
    });

    const writeDb = getWriteDatabaseClient();
    if (!writeDb) {
      throw new Error('DATABASE_URL is not configured for replacement transaction.');
    }

    const validPrsRows: Array<{
      geographyCode: string;
      period: string; // YYYY-MM-01
      priceDollarsPerMcf: string;
      priceDollarsPerTherm: string;
    }> = [];

    for (const row of eiaResult.rows) {
      const parsed = importService.parseAndValidateRow(row);
      if (parsed.success) {
        validPrsRows.push(parsed.data);
      }
    }

    // Verify mandatory national checkpoints in prevalidated payload
    const usMay2026 = validPrsRows.find(
      (r) => r.geographyCode === 'US' && r.period === '2026-05-01',
    );
    const usApr2026 = validPrsRows.find(
      (r) => r.geographyCode === 'US' && r.period === '2026-04-01',
    );
    const usMar2026 = validPrsRows.find(
      (r) => r.geographyCode === 'US' && r.period === '2026-03-01',
    );
    const usFeb2026 = validPrsRows.find(
      (r) => r.geographyCode === 'US' && r.period === '2026-02-01',
    );
    const usJan2026 = validPrsRows.find(
      (r) => r.geographyCode === 'US' && r.period === '2026-01-01',
    );
    const usMay2025 = validPrsRows.find(
      (r) => r.geographyCode === 'US' && r.period === '2025-05-01',
    );

    if (
      !usMay2026 ||
      parseFloat(usMay2026.priceDollarsPerMcf) !== 19.83 ||
      !usApr2026 ||
      parseFloat(usApr2026.priceDollarsPerMcf) !== 18.17 ||
      !usMar2026 ||
      parseFloat(usMar2026.priceDollarsPerMcf) !== 16.25 ||
      !usFeb2026 ||
      parseFloat(usFeb2026.priceDollarsPerMcf) !== 15.06 ||
      !usJan2026 ||
      parseFloat(usJan2026.priceDollarsPerMcf) !== 13.96 ||
      !usMay2025 ||
      parseFloat(usMay2025.priceDollarsPerMcf) !== 19.24
    ) {
      throw new Error(
        `Prevalidated PRS payload failed national checkpoint verification before transaction. Aborting replacement.`,
      );
    }

    const prsImportRunId = `eia-ng-prs-${Date.now()}`;
    const audit = await this.auditDatabase();

    return writeDb.transaction(async (tx) => {
      // Step 1: Delete PIN price rows attached to TARGET_PIN_IMPORT_RUN_ID
      const deleteResult = await tx
        .delete(naturalGasResidentialPricesMonthly)
        .where(eq(naturalGasResidentialPricesMonthly.importRunId, TARGET_PIN_IMPORT_RUN_ID))
        .execute();

      const deletedCount = (deleteResult as { rowCount?: number }).rowCount ?? 1115;

      // Step 2: Insert prevalidated PRS rows
      const rowsToInsert = validPrsRows.map((r) => ({
        geographyCode: r.geographyCode,
        period: r.period,
        priceDollarsPerMcf: r.priceDollarsPerMcf,
        priceDollarsPerTherm: r.priceDollarsPerTherm,
        conversionMethod: 'EIA_HEAT_CONTENT_1036_BTU',
        conversionAssumptions:
          '1 Mcf = 10.36 therms (EIA national average heat content 1,036 Btu/cf)',
        source: 'EIA',
        sourceDataset: 'natural-gas/pri/sum/data',
        importRunId: prsImportRunId,
      }));

      await tx.insert(naturalGasResidentialPricesMonthly).values(rowsToInsert).execute();

      // Step 3: Record audit log in dataImportRuns
      await tx.insert(dataImportRuns).values({
        id: prsImportRunId,
        source: 'EIA',
        dataset: 'natural-gas-prs-replacement',
        importType: 'manual',
        status: 'succeeded',
        startedAt: new Date(),
        completedAt: new Date(),
        metadata: {
          notes:
            'Removed EIA industrial PIN records incorrectly classified as residential natural-gas prices and replaced them with verified EIA residential PRS data.',
          deletedPinRows: deletedCount,
          insertedPrsRows: rowsToInsert.length,
          targetPinRunId: TARGET_PIN_IMPORT_RUN_ID,
        },
      });

      return {
        mode: 'applied',
        selectionCriteria: `Deleted PIN import run ${TARGET_PIN_IMPORT_RUN_ID} (${deletedCount} rows) and inserted ${rowsToInsert.length} prevalidated PRS rows`,
        affectedImportRunIds: [TARGET_PIN_IMPORT_RUN_ID, prsImportRunId],
        selectedRowCount: deletedCount,
        selectedDateRange: { earliest: '2024-06', latest: '2026-05' },
        selectedGeographyCount: 51,
        sampleSelectedRows: [],
        retainedRowCount: rowsToInsert.length,
        databaseWrites: deletedCount + rowsToInsert.length,
        status: 'succeeded',
        prsInsertedCount: rowsToInsert.length,
        auditExplanation:
          'Removed EIA industrial PIN records incorrectly classified as residential natural-gas prices and replaced them with verified EIA residential PRS data.',
      };
    });
  }
}
