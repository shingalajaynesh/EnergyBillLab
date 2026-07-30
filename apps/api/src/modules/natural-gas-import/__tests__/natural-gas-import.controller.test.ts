import { UnauthorizedException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NaturalGasImportController } from '../natural-gas-import.controller';
import type { NaturalGasImportService } from '../natural-gas-import.service';

describe('NaturalGasImportController', () => {
  let controller: NaturalGasImportController;
  let mockImportService: NaturalGasImportService;
  let mockSyncLatestPeriod: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.EIA_SYNC_SECRET = 'correct-sync-secret-12345';
    process.env.ENERGY_DATA_REVALIDATION_SECRET = 'revalidation-secret-67890';

    mockSyncLatestPeriod = vi.fn().mockResolvedValue({
      importRunId: 'test-run-1',
      status: 'succeeded',
      mode: 'import-and-publish',
      eiaPeriod: '2026-04',
      dbPeriod: '2026-04',
      insertedRows: 51,
      durationMs: 150,
    });

    mockImportService = {
      syncLatestPeriod: mockSyncLatestPeriod,
    } as unknown as NaturalGasImportService;

    controller = new NaturalGasImportController(mockImportService);
  });

  it('accepts valid x-sync-secret and triggers import', async () => {
    const res = await controller.syncLatest('correct-sync-secret-12345');
    expect(res.status).toBe('succeeded');
    expect(mockSyncLatestPeriod).toHaveBeenCalledTimes(1);
  });

  it('rejects missing header with UnauthorizedException', async () => {
    await expect(controller.syncLatest(undefined)).rejects.toThrow(UnauthorizedException);
    expect(mockSyncLatestPeriod).not.toHaveBeenCalled();
  });

  it('rejects invalid x-sync-secret with UnauthorizedException', async () => {
    await expect(controller.syncLatest('wrong-secret')).rejects.toThrow(UnauthorizedException);
    expect(mockSyncLatestPeriod).not.toHaveBeenCalled();
  });

  it('rejects x-revalidation-secret when used on natural gas import endpoint', async () => {
    await expect(controller.syncLatest('revalidation-secret-67890')).rejects.toThrow(
      UnauthorizedException,
    );
    expect(mockSyncLatestPeriod).not.toHaveBeenCalled();
  });
});
