import {
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import * as crypto from 'crypto';

import { ElectricityRateImportService } from './electricity-rate-import.service';

@Controller(['electricity-rate-import', 'admin/imports'])
export class ElectricityRateImportController {
  private readonly logger = new Logger(ElectricityRateImportController.name);

  constructor(private readonly importService: ElectricityRateImportService) {}

  @Post(['sync', 'sync-latest'])
  @HttpCode(HttpStatus.OK)
  async syncLatest(
    @Headers('x-sync-secret') syncSecretHeader?: string,
    @Headers('x-eia-sync-secret') eiaSyncHeader?: string,
    @Headers('authorization') authHeader?: string,
  ) {
    const configuredSecret =
      process.env.EIA_SYNC_SECRET || process.env.ENERGY_DATA_REVALIDATION_SECRET;

    if (!configuredSecret) {
      this.logger.error('EIA_SYNC_SECRET is not configured on server environment.');
      throw new UnauthorizedException('Sync endpoint secret not configured.');
    }

    const providedSecret =
      syncSecretHeader ||
      eiaSyncHeader ||
      (authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader);

    if (!providedSecret || !this.timingSafeCompare(providedSecret, configuredSecret)) {
      this.logger.warn('Unauthorized EIA sync attempt with invalid secret.');
      throw new UnauthorizedException('Invalid sync secret.');
    }

    const result = await this.importService.syncLatestPeriod();

    if (result.status === 'locked') {
      return {
        status: 'locked',
        message: result.message || 'Import locked by concurrent active process.',
      };
    }

    if (result.status === 'skipped_incomplete_period') {
      return {
        status: 'skipped_incomplete_period',
        latestDatabasePeriod: result.dbPeriod,
        latestEiaPeriod: result.eiaPeriod,
        missingGeographies: result.missingGeographies || [],
      };
    }

    if (result.mode === 'no-op') {
      return {
        status: 'no_update',
        latestDatabasePeriod: result.dbPeriod,
        latestEiaPeriod: result.eiaPeriod,
      };
    }

    if (result.status === 'succeeded') {
      const isRevalidated = result.revalidated;
      return {
        status: isRevalidated ? 'imported' : 'imported_revalidation_failed',
        period: result.eiaPeriod,
        acceptedRecords: result.insertedRows,
        rejectedRecords: result.rejectedRows || 0,
        importRunId: result.importRunId,
        revalidationTriggered: isRevalidated,
      };
    }

    return {
      status: 'failed',
      latestDatabasePeriod: result.dbPeriod,
      latestEiaPeriod: result.eiaPeriod,
      message: result.message || 'EIA rate synchronization failed.',
    };
  }

  private timingSafeCompare(a: string, b: string): boolean {
    try {
      const bufA = Buffer.from(a);
      const bufB = Buffer.from(b);
      if (bufA.length !== bufB.length) return false;
      return crypto.timingSafeEqual(bufA, bufB);
    } catch {
      return false;
    }
  }
}
