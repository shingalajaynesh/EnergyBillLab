import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { EiaClientService } from '../eia-client.service';

describe('EiaClientService', () => {
  let service: EiaClientService;
  const originalEnv = process.env;

  beforeEach(() => {
    service = new EiaClientService();
    process.env = {
      ...originalEnv,
      EIA_API_KEY: 'test-eia-key-12345',
      EIA_API_BASE_URL: 'https://api.eia.gov/v2/',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('throws error if EIA_API_KEY is not configured', async () => {
    delete process.env.EIA_API_KEY;
    await expect(service.fetchRetailSalesData()).rejects.toThrow('EIA_API_KEY is not configured');
  });

  it('constructs correct query parameters and parses response', async () => {
    const mockResponse = {
      response: {
        total: 1,
        data: [
          {
            period: '2026-04',
            stateid: 'CA',
            sectorid: 'RES',
            price: 28.5,
            revenue: 1500,
            sales: 5263.15,
            customers: 13000000,
          },
        ],
      },
    };

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await service.fetchRetailSalesData({ length: 10, offset: 0 });

    const firstCall = fetchSpy.mock.calls[0];
    expect(firstCall).toBeDefined();
    const calledUrl = Array.isArray(firstCall) ? (firstCall[0] as string) : String(firstCall);
    expect(calledUrl).toContain('api_key=test-eia-key-12345');
    expect(calledUrl).toContain('frequency=monthly');
    expect(calledUrl).toContain('facets%5Bsectorid%5D%5B%5D=RES');

    expect(result.total).toBe(1);
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0]?.stateid).toBe('CA');
    expect(result.rows[0]?.price).toBe(28.5);
  });

  it('rejects invalid schema response cleanly', async () => {
    const invalidResponse = {
      response: {
        total: 1,
        data: [
          {
            period: 'INVALID-PERIOD',
            stateid: 'CA',
            sectorid: 'COMMERCIAL', // Not RES
          },
        ],
      },
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(invalidResponse),
    } as Response);

    await expect(service.fetchRetailSalesData()).rejects.toThrow('EIA_CONTRACT_MISMATCH');
  });
});
