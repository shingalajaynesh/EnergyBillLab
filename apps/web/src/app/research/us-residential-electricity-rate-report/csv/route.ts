import { NextResponse } from 'next/server';

import { getNationalRateReport } from '@/lib/server/get-national-rate-report';

export async function GET() {
  const report = await getNationalRateReport();

  if (!report.available) {
    return new NextResponse('Report data unavailable.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  const header = [
    'reporting_period',
    'state_code',
    'state_name',
    'residential_rate_cents_per_kwh',
    'monthly_change_cents',
    'monthly_change_percent',
    'annual_change_cents',
    'annual_change_percent',
    'source_organization',
    'source_dataset',
  ].join(',');

  const rows: string[] = [];

  // Build rows for all 50 states in national report
  for (const item of report.allStates) {
    const period = report.reportingPeriod || '';
    const code = item.code;
    const name = `"${item.name.replace(/"/g, '""')}"`;
    const rate = item.priceCentsPerKwh.toFixed(4);

    // Find monthly change matching item
    const mMatch = report.largestMonthlyIncreases
      .concat(report.largestMonthlyDecreases)
      .find((c) => c.code === item.code);
    const mCents = mMatch ? mMatch.changeCents.toFixed(4) : '';
    const mPct = mMatch ? mMatch.changePercent.toFixed(2) : '';

    // Find annual change matching item
    const aMatch = report.largestAnnualIncreases
      .concat(report.largestAnnualDecreases)
      .find((c) => c.code === item.code);
    const aCents = aMatch ? aMatch.changeCents.toFixed(4) : '';
    const aPct = aMatch ? aMatch.changePercent.toFixed(2) : '';

    const sourceOrg = '"U.S. Energy Information Administration (EIA)"';
    const sourceDataset = '"Form EIA-861M Monthly Retail Sales"';

    rows.push(
      [period, code, name, rate, mCents, mPct, aCents, aPct, sourceOrg, sourceDataset].join(','),
    );
  }

  const csvContent = [header, ...rows].join('\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="us-residential-electricity-rate-report.csv"',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      'X-Report-Period': report.reportingPeriod || '2026-04',
    },
  });
}
