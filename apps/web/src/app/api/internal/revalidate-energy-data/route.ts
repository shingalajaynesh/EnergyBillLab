import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

import { getElectricityRateDataStatus, getReadDatabaseClient } from '@energy-bill-lab/database';

import { APPROVED_STATE_SLUGS } from '@/config/published-states';

export async function POST(req: NextRequest) {
  const secret = process.env.ENERGY_DATA_REVALIDATION_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'ENERGY_DATA_REVALIDATION_SECRET is not configured' },
      { status: 500 },
    );
  }

  const providedSecret =
    req.headers.get('x-revalidation-secret') ||
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!providedSecret || providedSecret !== secret) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid revalidation secret' },
      { status: 401 },
    );
  }

  let body: { period?: string } = {};
  const contentType = req.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    try {
      body = (await req.json()) as { period?: string };
    } catch {
      return NextResponse.json({ error: 'Malformed JSON payload' }, { status: 400 });
    }
  }

  if (body.period && !/^\d{4}-\d{2}(-\d{2})?$/.test(body.period)) {
    return NextResponse.json(
      { error: 'Invalid period format. Expected YYYY-MM or YYYY-MM-DD.' },
      { status: 400 },
    );
  }

  const db = getReadDatabaseClient();
  let dbLatestPeriod: string | null = null;
  if (db) {
    const status = await getElectricityRateDataStatus(db);
    dbLatestPeriod = status.latestAvailablePeriod;
  }

  const targetPeriod = body.period || dbLatestPeriod;
  if (body.period && dbLatestPeriod && !dbLatestPeriod.startsWith(body.period)) {
    return NextResponse.json(
      {
        error: `Requested period ${body.period} does not match database latest period ${dbLatestPeriod}`,
      },
      { status: 400 },
    );
  }

  // 1. Revalidate Next.js cache tags
  revalidateTag('eia-residential-rates');
  revalidateTag('state-page-data');
  revalidateTag('national-electricity-rate-report');

  // 2. Revalidate static / ISR page paths
  const paths: string[] = [
    '/',
    '/electricity-rates',
    ...APPROVED_STATE_SLUGS.map((slug) => `/electricity-rates/${slug}`),
    '/research',
    '/research/us-residential-electricity-rate-report',
    '/research/us-residential-electricity-rate-report/csv',
    '/electricity-bill-analyzer',
    '/tools',
    '/tools/ac-cost-calculator',
    '/tools/appliance-energy-cost-calculator',
    '/tools/clothes-dryer-cost-calculator',
    '/tools/dehumidifier-cost-calculator',
    '/tools/electric-water-heater-cost-calculator',
    '/tools/ev-home-charging-cost-calculator',
    '/tools/pool-pump-cost-calculator',
    '/tools/refrigerator-cost-calculator',
    '/tools/space-heater-cost-calculator',
  ];

  for (const p of paths) {
    revalidatePath(p);
  }

  return NextResponse.json({
    success: true,
    period: targetPeriod || 'unknown',
    revalidatedAt: new Date().toISOString(),
    pathsRevalidatedCount: paths.length,
  });
}
