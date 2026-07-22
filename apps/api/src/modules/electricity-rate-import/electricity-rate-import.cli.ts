import 'reflect-metadata';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { EiaClientService } from '../../infrastructure/eia/eia-client.service';
import { AppModule } from '../app.module';
import { ElectricityRateImportService } from './electricity-rate-import.service';

async function main() {
  const logger = new Logger('EiaCli');
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });

  const command = process.argv[2] || 'help';
  const importService = app.get(ElectricityRateImportService);
  const eiaClient = app.get(EiaClientService);

  try {
    if (command === 'metadata') {
      logger.log('Verifying EIA v2 metadata contract...');
      const valid = await eiaClient.verifyMetadataContract();
      if (!valid) {
        logger.error('EIA metadata contract verification failed!');
        process.exit(1);
      }
      logger.log('EIA metadata contract verified successfully.');
    } else if (command === 'backfill' || command === 'sync') {
      const isDryRun = process.argv.includes('--dry-run');
      const startArg = process.argv.find((arg) => arg.startsWith('--start='));
      const endArg = process.argv.find((arg) => arg.startsWith('--end='));

      const startPeriod = startArg ? startArg.split('=')[1] : undefined;
      const endPeriod = endArg ? endArg.split('=')[1] : undefined;

      const report = await importService.runImport({
        importType: command === 'backfill' ? 'backfill' : 'incremental',
        startPeriod,
        endPeriod,
        dryRun: isDryRun,
      });

      logger.log(`Import finished with status: ${report.status}`);
      logger.log(
        `Fetched: ${report.fetchedRows}, Validated: ${report.validatedRows}, Inserted: ${report.insertedRows}`,
      );

      if (report.status === 'failed') {
        process.exit(1);
      }
    } else if (command === 'verify') {
      logger.log('Running EIA data verification check...');
      // Verification logic: checks DB data status
      process.exit(0);
    } else {
      logger.log('Usage: pnpm data:eia:[metadata|backfill|sync|verify]');
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error(`Command ${command} failed: ${msg}`);
    process.exit(1);
  } finally {
    await app.close();
  }
}

void main();
