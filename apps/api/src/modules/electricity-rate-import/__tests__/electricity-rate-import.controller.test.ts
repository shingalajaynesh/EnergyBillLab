import { UnauthorizedException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';

import { ElectricityRateImportController } from '../electricity-rate-import.controller';
import type { ElectricityRateImportService } from '../electricity-rate-import.service';

describe('ElectricityRateImportController', () => {
  const secret = 'test-eia-sync-secret-12345';

  it('1. Rejects request with missing secret (throws UnauthorizedException)', async () => {
    process.env.EIA_SYNC_SECRET = secret;
    const mockService = {} as unknown as ElectricityRateImportService;
    const controller = new ElectricityRateImportController(mockService);

    await expect(controller.syncLatest()).rejects.toThrow(UnauthorizedException);
  });

  it('2. Rejects request with invalid secret (throws UnauthorizedException)', async () => {
    process.env.EIA_SYNC_SECRET = secret;
    const mockService = {} as unknown as ElectricityRateImportService;
    const controller = new ElectricityRateImportController(mockService);

    await expect(controller.syncLatest('invalid-secret')).rejects.toThrow(UnauthorizedException);
  });

  it('3. Accepts valid secret via x-sync-secret header and returns no_update when periods match', async () => {
    process.env.EIA_SYNC_SECRET = secret;
    const mockService = {
      syncLatestPeriod: vi.fn().mockResolvedValue({
        importRunId: 'eia-sync-1',
        status: 'succeeded',
        mode: 'no-op',
        eiaPeriod: '2026-05',
        dbPeriod: '2026-05',
        insertedRows: 0,
        revalidated: false,
        productionVerified: true,
        verificationSkipped: false,
        durationMs: 120,
      }),
    } as unknown as ElectricityRateImportService;

    const controller = new ElectricityRateImportController(mockService);
    const res = await controller.syncLatest(secret);

    expect(res).toEqual({
      status: 'no_update',
      latestDatabasePeriod: '2026-05',
      latestEiaPeriod: '2026-05',
    });
  });

  it('4. Returns imported status when new period is imported and revalidated', async () => {
    process.env.EIA_SYNC_SECRET = secret;
    const mockService = {
      syncLatestPeriod: vi.fn().mockResolvedValue({
        importRunId: 'eia-sync-run-999',
        status: 'succeeded',
        mode: 'import-and-publish',
        eiaPeriod: '2026-06',
        dbPeriod: '2026-05',
        insertedRows: 52,
        rejectedRows: 10,
        revalidated: true,
        productionVerified: true,
        verificationSkipped: false,
        durationMs: 450,
      }),
    } as unknown as ElectricityRateImportService;

    const controller = new ElectricityRateImportController(mockService);
    const res = await controller.syncLatest(secret);

    expect(res).toEqual({
      status: 'imported',
      period: '2026-06',
      acceptedRecords: 52,
      rejectedRecords: 10,
      importRunId: 'eia-sync-run-999',
      revalidationTriggered: true,
    });
  });

  it('5. Returns skipped_incomplete_period status when newest period is missing geographies', async () => {
    process.env.EIA_SYNC_SECRET = secret;
    const mockService = {
      syncLatestPeriod: vi.fn().mockResolvedValue({
        importRunId: 'eia-sync-run-000',
        status: 'skipped_incomplete_period',
        mode: 'skipped_incomplete_period',
        eiaPeriod: '2026-06',
        dbPeriod: '2026-05',
        insertedRows: 0,
        missingGeographies: ['HI', 'AK'],
        revalidated: false,
        productionVerified: false,
        verificationSkipped: true,
        durationMs: 200,
      }),
    } as unknown as ElectricityRateImportService;

    const controller = new ElectricityRateImportController(mockService);
    const res = await controller.syncLatest(secret);

    expect(res).toEqual({
      status: 'skipped_incomplete_period',
      latestDatabasePeriod: '2026-05',
      latestEiaPeriod: '2026-06',
      missingGeographies: ['HI', 'AK'],
    });
  });

  it('6. Returns locked status when advisory lock cannot be acquired', async () => {
    process.env.EIA_SYNC_SECRET = secret;
    const mockService = {
      syncLatestPeriod: vi.fn().mockResolvedValue({
        importRunId: 'eia-sync-run-locked',
        status: 'locked',
        mode: 'locked',
        message: 'Import locked by concurrent active process.',
        eiaPeriod: null,
        dbPeriod: null,
        insertedRows: 0,
        revalidated: false,
        productionVerified: false,
        verificationSkipped: true,
        durationMs: 50,
      }),
    } as unknown as ElectricityRateImportService;

    const controller = new ElectricityRateImportController(mockService);
    const res = await controller.syncLatest(secret);

    expect(res).toEqual({
      status: 'locked',
      message: 'Import locked by concurrent active process.',
    });
  });
});
