import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';

import { NaturalGasCleanupService } from './natural-gas-cleanup.service';

function loadEnvIfMissing() {
  const envPaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'apps/api/.env'),
    path.resolve(__dirname, '../../../.env'),
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...vals] = trimmed.split('=');
          const k = key?.trim();
          const v = vals
            .join('=')
            .trim()
            .replace(/^["']|["']$/g, '');
          if (k && v && !process.env[k]) {
            process.env[k] = v;
          }
        }
      }
    }
  }
}

async function main() {
  loadEnvIfMissing();
  const logger = new Logger('NaturalGasCleanupCLI');
  logger.log('Starting natural gas database audit & cleanup dry-run CLI...');

  const service = new NaturalGasCleanupService();
  const dbUrl = process.env.DATABASE_URL || '';
  let host = 'N/A';
  let dbName = 'N/A';
  try {
    if (dbUrl) {
      const parsed = new URL(dbUrl);
      host = parsed.hostname;
      dbName = parsed.pathname.replace(/^\//, '');
    }
  } catch {
    // Ignore URL parse errors for safety
  }

  logger.log(`Target Database Host: ${host} | Database Name: ${dbName}`);

  const args = process.argv.slice(2);
  const isApplyMode = args.includes('--apply');
  const isApplyReplacementMode = args.includes('--apply-replacement');

  if (isApplyReplacementMode) {
    logger.warn(
      'WARNING: Executing OWNER-APPROVED ATOMIC TRANSACTIONAL REPLACEMENT (Delete PIN + Insert PRS)...',
    );
    const result = await service.executeAtomicReplacement({ confirm: true });
    logger.log(
      `Replacement Applied Successfully! Status: ${result.status} | Deleted PIN Rows: ${result.selectedRowCount} | Inserted PRS Rows: ${result.prsInsertedCount} | Total Writes: ${result.databaseWrites}`,
    );
    process.exit(0);
  } else if (!isApplyMode) {
    logger.log('Running in DEFAULT DRY-RUN MODE (writes = 0)...');
    const audit = await service.auditDatabase();
    logger.log('--- DATABASE AUDIT SUMMARY ---');
    logger.log(`Total Natural Gas Price Rows: ${audit.totalPriceRows}`);
    logger.log(`Period Range: ${audit.earliestPeriod} to ${audit.latestPeriod}`);
    logger.log(`Distinct Geographies: ${audit.distinctGeographyCount}`);
    logger.log(
      `Duplicates: ${audit.duplicateCount} | Nulls: ${audit.nullValueCount} | Nonpositives: ${audit.nonpositiveCount}`,
    );
    logger.log(`Import Run IDs: ${JSON.stringify(audit.associatedImportRunIds)}`);
    logger.log(`Isolation Assessment: ${audit.isolationAssessment.summary}`);

    logger.log('--- NATIONAL CHECKPOINT AUDIT ---');
    for (const c of audit.checkpointAudits) {
      logger.log(
        `  ${c.period}: Actual=${c.actualPriceMcf ?? 'N/A'} (Expected PRS=$${c.expectedPrs}, PIN=$${c.expectedPin}) => Status: ${c.status}`,
      );
    }

    const report = await service.runDryRunCleanup();
    logger.log('--- CLEANUP DRY-RUN RESULT ---');
    logger.log(`Mode: ${report.mode}`);
    logger.log(`Selection Criteria: ${report.selectionCriteria}`);
    logger.log(`Selected Row Count: ${report.selectedRowCount}`);
    logger.log(`Database Writes: ${report.databaseWrites}`);
    logger.log(`Explanation: ${report.auditExplanation}`);
    process.exit(0);
  } else {
    logger.warn('WARNING: Executing TRANSACTIONAL REPLACEMENT MODE...');
    const result = await service.executeAtomicReplacement({ confirm: true });
    logger.log(
      `Replacement Applied! Status: ${result.status} | Deleted PIN Rows: ${result.selectedRowCount} | Inserted PRS Rows: ${result.prsInsertedCount} | Writes: ${result.databaseWrites}`,
    );
    process.exit(0);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Cleanup CLI Error:', err);
    process.exit(1);
  });
}
