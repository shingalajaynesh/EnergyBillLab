import { describe, expect, it, vi } from 'vitest';

import type { EiaClientService } from '../../../infrastructure/eia/eia-client.service';
import { ElectricityRateImportService } from '../electricity-rate-import.service';

describe('ElectricityRateImportService.syncLatestPeriod', () => {
  it('1. Returns no-op when DATABASE_URL is unavailable', async () => {
    const mockEiaClient = {
      fetchRetailSalesData: vi.fn(),
    } as unknown as EiaClientService;

    const service = new ElectricityRateImportService(mockEiaClient);
    const result = await service.syncLatestPeriod();

    expect(result.status).toBe('failed');
    expect(result.mode).toBe('no-op');
  });
});
