import { NextRequest } from 'next/server';
import { describe, expect, it, vi } from 'vitest';

import { POST } from '@/app/api/internal/revalidate-energy-data/route';

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
  revalidatePath: vi.fn(),
}));

vi.mock('@energy-bill-lab/database', () => ({
  getReadDatabaseClient: () => ({}),
  getElectricityRateDataStatus: () =>
    Promise.resolve({
      latestAvailablePeriod: '2026-05-01',
    }),
}));

type RevalResponse = {
  error?: string;
  success?: boolean;
  period?: string;
  pathsRevalidatedCount?: number;
};

describe('Protected Vercel Revalidation Route (/api/internal/revalidate-energy-data)', () => {
  it('1. Server environment secret missing -> 500', async () => {
    delete process.env.ENERGY_DATA_REVALIDATION_SECRET;

    const req = new NextRequest('http://localhost:3000/api/internal/revalidate-energy-data', {
      method: 'POST',
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const data = (await res.json()) as RevalResponse;
    expect(data.error).toContain('ENERGY_DATA_REVALIDATION_SECRET is not configured');
  });

  it('2. Request secret missing -> 401', async () => {
    process.env.ENERGY_DATA_REVALIDATION_SECRET = 'test-secret-12345';

    const reqMissing = new NextRequest(
      'http://localhost:3000/api/internal/revalidate-energy-data',
      {
        method: 'POST',
      },
    );

    const resMissing = await POST(reqMissing);
    expect(resMissing.status).toBe(401);
    const data = (await resMissing.json()) as RevalResponse;
    expect(data.error).toContain('Unauthorized');
  });

  it('3. Request secret invalid -> 401', async () => {
    process.env.ENERGY_DATA_REVALIDATION_SECRET = 'test-secret-12345';

    const reqInvalid = new NextRequest(
      'http://localhost:3000/api/internal/revalidate-energy-data',
      {
        method: 'POST',
        headers: { 'x-revalidation-secret': 'wrong-secret' },
      },
    );

    const resInvalid = await POST(reqInvalid);
    expect(resInvalid.status).toBe(401);
    const data = (await resInvalid.json()) as RevalResponse;
    expect(data.error).toContain('Unauthorized');
  });

  it('4. Malformed JSON payload -> 400', async () => {
    process.env.ENERGY_DATA_REVALIDATION_SECRET = 'test-secret-12345';

    const reqMalformed = new NextRequest(
      'http://localhost:3000/api/internal/revalidate-energy-data',
      {
        method: 'POST',
        headers: {
          'x-revalidation-secret': 'test-secret-12345',
          'content-type': 'application/json',
        },
        body: 'invalid-json-{',
      },
    );

    const resMalformed = await POST(reqMalformed);
    expect(resMalformed.status).toBe(400);
    const data = (await resMalformed.json()) as RevalResponse;
    expect(data.error).toContain('Malformed JSON payload');
  });

  it('5. Invalid period format -> 400', async () => {
    process.env.ENERGY_DATA_REVALIDATION_SECRET = 'test-secret-12345';

    const reqInvalidPeriod = new NextRequest(
      'http://localhost:3000/api/internal/revalidate-energy-data',
      {
        method: 'POST',
        headers: {
          'x-revalidation-secret': 'test-secret-12345',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ period: 'invalid-month' }),
      },
    );

    const resInvalidPeriod = await POST(reqInvalidPeriod);
    expect(resInvalidPeriod.status).toBe(400);
    const data = (await resInvalidPeriod.json()) as RevalResponse;
    expect(data.error).toContain('Invalid period format');
  });

  it('6. Requested period differs from database latest period -> 400', async () => {
    process.env.ENERGY_DATA_REVALIDATION_SECRET = 'test-secret-12345';

    const reqMismatch = new NextRequest(
      'http://localhost:3000/api/internal/revalidate-energy-data',
      {
        method: 'POST',
        headers: {
          'x-revalidation-secret': 'test-secret-12345',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ period: '2026-04' }),
      },
    );

    const resMismatch = await POST(reqMismatch);
    expect(resMismatch.status).toBe(400);
    const data = (await resMismatch.json()) as RevalResponse;
    expect(data.error).toContain('does not match database latest period');
  });

  it('7. Correct secret and matching period -> 200', async () => {
    process.env.ENERGY_DATA_REVALIDATION_SECRET = 'test-secret-12345';

    const reqValid = new NextRequest('http://localhost:3000/api/internal/revalidate-energy-data', {
      method: 'POST',
      headers: {
        'x-revalidation-secret': 'test-secret-12345',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ period: '2026-05' }),
    });

    const resValid = await POST(reqValid);
    expect(resValid.status).toBe(200);
    const data = (await resValid.json()) as RevalResponse;
    expect(data.success).toBe(true);
    expect(data.period).toBe('2026-05');
    expect(data.pathsRevalidatedCount).toBeGreaterThan(60);
  });
});
