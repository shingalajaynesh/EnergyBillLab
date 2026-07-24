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
    'Reporting Period',
    'State Code',
    'State Name',
    'Residential Rate (cents/kWh)',
    'Monthly Change (cents)',
    'Monthly Change (%)',
    'Annual Change (cents)',
    'Annual Change (%)',
    'Source Organization',
    'Source Dataset',
  ].join(',');

  const rows: string[] = [];

  // Build rows from highest rates and rankings
  for (const item of report.highestRates) {
    const period = report.reportingPeriod || '';
    const code = item.code;
    const name = `"${item.name.replace(/"/g, '""')}"`;
    const rate = item.priceCentsPerKwh.toFixed(4);

    // Find monthly change matching item
    const mMatch = report.largestMonthlyIncreases
      .concat(report.largestMonthlyDecreases)
      .find((c) => c.code === item.code);
    const mCents = mMatch ? mMatch.changeCents.toFixed(4) : 'N/A';
    const mPct = mMatch ? mMatch.changePercent.toFixed(2) : 'N/A';

    // Find annual change matching item
    const aMatch = report.largestAnnualIncreases
      .concat(report.largestAnnualDecreases)
      .find((c) => c.code === item.code);
    const aCents = aMatch ? aMatch.changeCents.toFixed(4) : 'N/A';
    const aPct = aMatch ? aMatch.changePercent.toFixed(2) : 'N/A';

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
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
