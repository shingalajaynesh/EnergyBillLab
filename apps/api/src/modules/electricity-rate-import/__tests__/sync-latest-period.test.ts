import { describe, expect, it, vi } from 'vitest';

import type {
  EiaClientService,
  FetchEiaParams,
  FetchEiaResult,
} from '../../../infrastructure/eia/eia-client.service';
import { loadCliEnv } from '../../../config/load-cli-env';
import { ElectricityRateImportService } from '../electricity-rate-import.service';

const ALL_52_GEOGRAPHIES = [
  'US',
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

let mockDbLatestPeriod = '2026-05-01';

vi.mock('@energy-bill-lab/database', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const actual = await importOriginal<typeof import('@energy-bill-lab/database')>();
  return {
    ...actual,
    getWriteDatabaseClient: () => ({
      execute: vi
        .fn()
        .mockImplementation(() => Promise.resolve([{ latest_period: mockDbLatestPeriod }])),
      insert: vi.fn().mockReturnValue({ values: vi.fn().mockResolvedValue(true) }),
      update: vi.fn().mockReturnValue({
        set: vi.fn().mockReturnValue({ where: vi.fn().mockResolvedValue(true) }),
      }),
      transaction: vi.fn().mockImplementation((cb: (tx: unknown) => Promise<unknown>) =>
        cb({
          insert: vi.fn().mockReturnValue({
            values: vi
              .fn()
              .mockReturnValue({ onConflictDoUpdate: vi.fn().mockResolvedValue(true) }),
          }),
        }),
      ),
    }),
  };
});

function create52RowMock(period: string): FetchEiaResult {
  return {
    total: 52,
    offset: 0,
    length: 52,
    rows: ALL_52_GEOGRAPHIES.map((geo) => ({
      period,
      stateid: geo,
      sectorid: 'RES',
      price: 15.5,
      revenue: 100,
      sales: 500,
      customers: 1000,
    })),
  };
}

describe('ElectricityRateImportService.syncLatestPeriod & Result Semantics', () => {
  it('1. Missing DATABASE_URL returns status=failed and mode=failed (not no-op)', async () => {
    const mockEiaClient = {
      fetchRetailSalesData: vi.fn(),
    } as unknown as EiaClientService;

    const originalUrl = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;
    try {
      const service = new ElectricityRateImportService(mockEiaClient);
      vi.spyOn(
        service as unknown as { acquireAdvisoryLock: () => Promise<boolean> },
        'acquireAdvisoryLock',
      ).mockResolvedValue(true);

      const result = await service.syncLatestPeriod();

      expect(result.status).toBe('failed');
      expect(result.mode).toBe('failed');
      expect(result.mode).not.toBe('no-op');
    } finally {
      process.env.DATABASE_URL = originalUrl;
    }
  });

  it('2. Invalid EIA discovery returns status=failed and mode=failed (not no-op)', async () => {
    const mockEiaClient = {
      fetchRetailSalesData: vi.fn().mockResolvedValue({
        total: 0,
        offset: 0,
        length: 0,
        rows: [],
      }),
    } as unknown as EiaClientService;

    const service = new ElectricityRateImportService(mockEiaClient);
    vi.spyOn(
      service as unknown as { ensureGeographiesSeeded: () => Promise<void> },
      'ensureGeographiesSeeded',
    ).mockResolvedValue();
    vi.spyOn(
      service as unknown as { acquireAdvisoryLock: () => Promise<boolean> },
      'acquireAdvisoryLock',
    ).mockResolvedValue(true);

    process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
    try {
      const result = await service.syncLatestPeriod();
      expect(result.status).toBe('failed');
      expect(result.mode).toBe('failed');
      expect(result.mode).not.toBe('no-op');
    } finally {
      delete process.env.DATABASE_URL;
    }
  });

  it('3. Stale EIA source (EIA period < DB period) returns mode=stale-source and status=failed (not no-op)', async () => {
    const mockEiaClient = {
      fetchRetailSalesData: vi.fn().mockImplementation((params: FetchEiaParams) => {
        if (params.sortDirection === 'desc') {
          return Promise.resolve({
            total: 1,
            offset: 0,
            length: 1,
            rows: [{ period: '2026-04', stateid: 'NC', sectorid: 'RES', price: 14.0 }],
          });
        }
        if (params.startPeriod === '2026-04') {
          return Promise.resolve(create52RowMock('2026-04'));
        }
        return Promise.resolve({ total: 0, offset: 0, length: 0, rows: [] });
      }),
    } as unknown as EiaClientService;

    const service = new ElectricityRateImportService(mockEiaClient);
    vi.spyOn(
      service as unknown as { ensureGeographiesSeeded: () => Promise<void> },
      'ensureGeographiesSeeded',
    ).mockResolvedValue();
    vi.spyOn(
      service as unknown as { acquireAdvisoryLock: () => Promise<boolean> },
      'acquireAdvisoryLock',
    ).mockResolvedValue(true);

    process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
    mockDbLatestPeriod = '2026-05-01';
    try {
      const result = await service.syncLatestPeriod();
      expect(result.status).toBe('failed');
      expect(result.mode).toBe('stale-source');
      expect(result.mode).not.toBe('no-op');
    } finally {
      delete process.env.DATABASE_URL;
    }
  });

  it('4. --skip-verify (verifyProduction: false) returns productionVerified=false, verificationSkipped=true, and mode=no-op on equal period', async () => {
    const mockEiaClient = {
      fetchRetailSalesData: vi.fn().mockImplementation((params: FetchEiaParams) => {
        if (params.sortDirection === 'desc') {
          return Promise.resolve({
            total: 1,
            offset: 0,
            length: 1,
            rows: [{ period: '2026-05', stateid: 'NC', sectorid: 'RES', price: 14.5 }],
          });
        }
        if (params.startPeriod === '2026-05') {
          return Promise.resolve(create52RowMock('2026-05'));
        }
        return Promise.resolve({ total: 0, offset: 0, length: 0, rows: [] });
      }),
    } as unknown as EiaClientService;

    const service = new ElectricityRateImportService(mockEiaClient);
    vi.spyOn(
      service as unknown as { ensureGeographiesSeeded: () => Promise<void> },
      'ensureGeographiesSeeded',
    ).mockResolvedValue();
    vi.spyOn(
      service as unknown as { acquireAdvisoryLock: () => Promise<boolean> },
      'acquireAdvisoryLock',
    ).mockResolvedValue(true);

    process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
    mockDbLatestPeriod = '2026-05-01';
    try {
      const result = await service.syncLatestPeriod({ verifyProduction: false });
      expect(result.status).toBe('succeeded');
      expect(result.mode).toBe('no-op');
      expect(result.productionVerified).toBe(false);
      expect(result.verificationSkipped).toBe(true);
    } finally {
      delete process.env.DATABASE_URL;
    }
  });

  it('5. Normal verified no-op returns productionVerified=true and verificationSkipped=false', async () => {
    const mockEiaClient = {
      fetchRetailSalesData: vi.fn().mockImplementation((params: FetchEiaParams) => {
        if (params.sortDirection === 'desc') {
          return Promise.resolve({
            total: 1,
            offset: 0,
            length: 1,
            rows: [{ period: '2026-05', stateid: 'NC', sectorid: 'RES', price: 14.5 }],
          });
        }
        if (params.startPeriod === '2026-05') {
          return Promise.resolve(create52RowMock('2026-05'));
        }
        return Promise.resolve({ total: 0, offset: 0, length: 0, rows: [] });
      }),
    } as unknown as EiaClientService;

    const service = new ElectricityRateImportService(mockEiaClient);
    vi.spyOn(
      service as unknown as { ensureGeographiesSeeded: () => Promise<void> },
      'ensureGeographiesSeeded',
    ).mockResolvedValue();
    vi.spyOn(
      service as unknown as { acquireAdvisoryLock: () => Promise<boolean> },
      'acquireAdvisoryLock',
    ).mockResolvedValue(true);
    vi.spyOn(
      service as unknown as { checkProductionIsCurrent: () => Promise<boolean> },
      'checkProductionIsCurrent',
    ).mockResolvedValue(true);

    process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
    mockDbLatestPeriod = '2026-05-01';
    try {
      const result = await service.syncLatestPeriod({ verifyProduction: true });
      expect(result.status).toBe('succeeded');
      expect(result.mode).toBe('no-op');
      expect(result.productionVerified).toBe(true);
      expect(result.verificationSkipped).toBe(false);
    } finally {
      delete process.env.DATABASE_URL;
    }
  });

  it('6. Out-of-order API rows still select maximum valid period', async () => {
    const mockEiaClient = {
      fetchRetailSalesData: vi.fn().mockImplementation((params: FetchEiaParams) => {
        if (params.sortDirection === 'desc') {
          return Promise.resolve({
            total: 3,
            offset: 0,
            length: 3,
            rows: [
              { period: '2026-03', stateid: 'NC', sectorid: 'RES', price: 12.5 },
              { period: '2026-05', stateid: 'NC', sectorid: 'RES', price: 14.5 },
              { period: '2026-01', stateid: 'NC', sectorid: 'RES', price: 11.5 },
            ],
          });
        }
        if (params.startPeriod === '2026-05') {
          return Promise.resolve(create52RowMock('2026-05'));
        }
        return Promise.resolve({ total: 0, offset: 0, length: 0, rows: [] });
      }),
    } as unknown as EiaClientService;

    const service = new ElectricityRateImportService(mockEiaClient);
    vi.spyOn(
      service as unknown as { ensureGeographiesSeeded: () => Promise<void> },
      'ensureGeographiesSeeded',
    ).mockResolvedValue();
    vi.spyOn(
      service as unknown as { acquireAdvisoryLock: () => Promise<boolean> },
      'acquireAdvisoryLock',
    ).mockResolvedValue(true);
    vi.spyOn(
      service as unknown as { releaseAdvisoryLock: () => Promise<void> },
      'releaseAdvisoryLock',
    ).mockResolvedValue();
    vi.spyOn(
      service as unknown as { checkProductionIsCurrent: () => Promise<boolean> },
      'checkProductionIsCurrent',
    ).mockResolvedValue(true);

    process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
    mockDbLatestPeriod = '2026-05-01';
    try {
      const result = await service.syncLatestPeriod({ verifyProduction: true });
      expect(result.eiaPeriod).toBe('2026-05');
      expect(result.status).toBe('succeeded');
    } finally {
      delete process.env.DATABASE_URL;
    }
  });

  it('7. Process environment variables override loaded environment files', () => {
    process.env.TEST_OVERRIDE_VAR = 'PROCESS_VALUE';
    try {
      loadCliEnv();
      expect(process.env.TEST_OVERRIDE_VAR).toBe('PROCESS_VALUE');
    } finally {
      delete process.env.TEST_OVERRIDE_VAR;
    }
  });

  it('8. Incomplete newest EIA period is skipped and returns status=skipped_incomplete_period', async () => {
    const mockEiaClient = {
      fetchRetailSalesData: vi.fn().mockImplementation((params: FetchEiaParams) => {
        if (params.sortDirection === 'desc') {
          return Promise.resolve({
            total: 1,
            offset: 0,
            length: 1,
            rows: [{ period: '2026-06', stateid: 'NC', sectorid: 'RES', price: 15.0 }],
          });
        }
        if (params.startPeriod === '2026-06') {
          // Return only 50 rows (missing HI and AK)
          return Promise.resolve({
            total: 50,
            offset: 0,
            length: 50,
            rows: ALL_52_GEOGRAPHIES.filter((g) => g !== 'HI' && g !== 'AK').map((geo) => ({
              period: '2026-06',
              stateid: geo,
              sectorid: 'RES',
              price: 15.0,
            })),
          });
        }
        return Promise.resolve({ total: 0, offset: 0, length: 0, rows: [] });
      }),
    } as unknown as EiaClientService;

    const service = new ElectricityRateImportService(mockEiaClient);
    vi.spyOn(
      service as unknown as { ensureGeographiesSeeded: () => Promise<void> },
      'ensureGeographiesSeeded',
    ).mockResolvedValue();
    vi.spyOn(
      service as unknown as { acquireAdvisoryLock: () => Promise<boolean> },
      'acquireAdvisoryLock',
    ).mockResolvedValue(true);

    process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
    mockDbLatestPeriod = '2026-05-01';
    try {
      const result = await service.syncLatestPeriod();
      expect(result.status).toBe('skipped_incomplete_period');
      expect(result.mode).toBe('skipped_incomplete_period');
      expect(result.eiaPeriod).toBe('2026-06');
      expect(result.dbPeriod).toBe('2026-05');
      expect(result.missingGeographies).toEqual(expect.arrayContaining(['HI', 'AK']));
    } finally {
      delete process.env.DATABASE_URL;
    }
  });

  it('9. Advisory lock rejection returns status=locked and mode=locked', async () => {
    const mockEiaClient = {
      fetchRetailSalesData: vi.fn(),
    } as unknown as EiaClientService;

    const service = new ElectricityRateImportService(mockEiaClient);
    vi.spyOn(
      service as unknown as { acquireAdvisoryLock: () => Promise<boolean> },
      'acquireAdvisoryLock',
    ).mockResolvedValue(false);

    process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
    try {
      const result = await service.syncLatestPeriod();
      expect(result.status).toBe('locked');
      expect(result.mode).toBe('locked');
    } finally {
      delete process.env.DATABASE_URL;
    }
  });
});
