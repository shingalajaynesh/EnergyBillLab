import { timingSafeEqual } from 'node:crypto';

import {
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';

import { NaturalGasImportService } from './natural-gas-import.service';

function safeCompare(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

@Controller('v1/natural-gas-import')
export class NaturalGasImportController {
  private readonly logger = new Logger(NaturalGasImportController.name);

  constructor(private readonly naturalGasImportService: NaturalGasImportService) {}

  @Post('sync-latest')
  @HttpCode(HttpStatus.OK)
  async syncLatest(
    @Headers('x-sync-secret') syncSecretHeader?: string,
    @Query('secret') secretQuery?: string,
  ) {
    const configuredSecret = process.env.EIA_SYNC_SECRET;
    const providedSecret = syncSecretHeader || secretQuery;

    if (!configuredSecret || !providedSecret || !safeCompare(providedSecret, configuredSecret)) {
      this.logger.warn(
        'Unauthorized EIA natural gas sync attempt: missing or invalid x-sync-secret.',
      );
      throw new UnauthorizedException('Invalid or missing x-sync-secret.');
    }

    return this.naturalGasImportService.syncLatestPeriod();
  }
}
