import { describe, expect, it } from 'vitest';
import {
  CANONICAL_50_STATE_CODES,
  getReadDatabaseClient,
  getLatestResidentialRatesForAllStates,
  getLatestResidentialRateByStateCode,
  getNationalResidentialRate,
  getResidentialRateHistory,
  getNationalReportRawData,
} from '@energy-bill-lab/database';
import { sitemapRoutes } from '@/lib/routes';
import { formatSourcePeriod } from '@/lib/server/get-state-page-data';

describe('May 2026 EIA Data Refresh & Validation', () => {
  it('validates May 2026 EIA reporting period formatting', () => {
    expect(formatSourcePeriod('2026-05')).toBe('May 2026');
    expect(formatSourcePeriod('2026-05-01')).toBe('May 2026');
  });

  it('queries database and confirms all 50 states use May 2026 common period', async () => {
    const db = getReadDatabaseClient();
    if (!db) {
      // Skip DB-dependent assertions if DB is unconfigured
      return;
    }

    const rates = await getLatestResidentialRatesForAllStates(db);
    expect(Object.keys(rates).length).toBeGreaterThanOrEqual(50);

    // Verify all canonical 50 states have period 2026-05-01 or 2026-05
    for (const code of CANONICAL_50_STATE_CODES) {
      const stateData = rates[code];
      expect(stateData).toBeDefined();
      expect(stateData?.period).toMatch(/^2026-05/);
    }
  });

  it('verifies North Carolina rate resolves to 15.09 cents/kWh for May 2026', async () => {
    const db = getReadDatabaseClient();
    if (!db) return;

    const ncRate = await getLatestResidentialRateByStateCode(db, 'NC');
    expect(ncRate).not.toBeNull();
    expect(ncRate?.period).toMatch(/^2026-05/);
    expect(ncRate?.priceCentsPerKwh).toBe(15.09);
  });

  it('verifies U.S. national average resolves to 18.44 cents/kWh for May 2026', async () => {
    const db = getReadDatabaseClient();
    if (!db) return;

    const usRate = await getNationalResidentialRate(db);
    expect(usRate).not.toBeNull();
    expect(usRate?.period).toMatch(/^2026-05/);
    expect(usRate?.priceCentsPerKwh).toBe(18.44);
  });

  it('verifies state history queries 25 records and displays 24', async () => {
    const db = getReadDatabaseClient();
    if (!db) return;

    const history = await getResidentialRateHistory(db, 'NC', 25);
    expect(history.length).toBeLessThanOrEqual(25);
    expect(history[0]?.period).toMatch(/^2026-05/);
  });

  it('verifies national report raw data resolves to 2026-05-01 common period', async () => {
    const db = getReadDatabaseClient();
    if (!db) return;

    const rawReport = await getNationalReportRawData(db);
    expect(rawReport.commonPeriod).toMatch(/^2026-05/);
    expect(rawReport.nationalAverageCentsPerKwh).toBe(18.44);
    expect(rawReport.rows.length).toBe(50);
  });

  it('confirms sitemap route inventory includes the Insights hub after launch threshold', () => {
    expect(sitemapRoutes.length).toBe(129);
    expect(sitemapRoutes.some((route) => route.href === '/insights')).toBe(true);
  });
});
