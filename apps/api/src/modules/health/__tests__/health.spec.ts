import { describe, expect, it, vi } from 'vitest';

import { HealthService } from '../health.service.js';

vi.mock('@energy-bill-lab/database', () => ({
  getReadDatabaseClient: vi.fn(() => ({})),
  getElectricityRateDataStatus: vi.fn(() =>
    Promise.resolve({
      source: 'EIA',
      dataset: 'electricity/retail-sales',
      latestAvailablePeriod: '2026-05-01',
      lastSuccessfulImportAt: '2026-07-27T04:19:42.000Z',
      geographyCount: 50,
      status: 'available',
    }),
  ),
  getDataFreshnessDetails: vi.fn(() =>
    Promise.resolve({
      latestPeriod: '2026-05-01',
      geographyCount: 50,
      isGeographyCountComplete: false,
      ageDays: 87,
      latestSuccessfulImportAt: '2026-07-27T04:19:42.000Z',
      latestFailedImportAt: null,
    }),
  ),
}));

describe('HealthService', () => {
  it('returns valid liveness response', () => {
    const service = new HealthService();
    const live = service.live();
    expect(live.status).toBe('ok');
    expect(live.service).toBe('energy-bill-lab-api');
    expect(live.version).toBe('1.0.0');
    expect(live.timestamp).toBeDefined();
  });

  it('returns valid readiness response with DB info', async () => {
    const service = new HealthService();
    const ready = await service.ready();
    expect(ready.status).toBe('ok');
    expect(ready.database.connected).toBe(true);
    expect(ready.database.latestPeriod).toBe('2026-05-01');
    expect(ready.database.latestPeriodGeographyCount).toBe(50);
  });

  it('returns valid data freshness response', async () => {
    const service = new HealthService();
    const fresh = await service.freshness();
    expect(fresh.status).toBe('ok');
    expect(fresh.freshness.latestPeriod).toBe('2026-05-01');
    expect(fresh.freshness.geographyCount).toBe(50);
    expect(fresh.freshness.isGeographyCountComplete).toBe(false);
  });

  it('does not expose database credentials, secrets, or internal hostnames in health outputs', async () => {
    const service = new HealthService();
    const live = service.live();
    const ready = await service.ready();
    const fresh = await service.freshness();

    const jsonStr = JSON.stringify({ live, ready, fresh });
    expect(jsonStr).not.toContain('postgres');
    expect(jsonStr).not.toContain('password');
    expect(jsonStr).not.toContain('neon.tech');
    expect(jsonStr).not.toContain('ebl_reval_sec');
  });
});
