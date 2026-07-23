import { describe, expect, it } from 'vitest';

import {
  APPROVED_STATE_SLUGS,
  FIRST_TEN_STATES,
  isApprovedStateSlug,
} from '@/config/first-ten-states';
import { isAdEligibleRoute } from '@/lib/ad-eligibility';
import { sitemapRoutes } from '@/lib/routes';
import {
  calculateHouseholdCostExamples,
  formatSourcePeriod,
  getStatePageDataUncached,
  isConsecutiveCalendarMonth,
} from '@/lib/server/get-state-page-data';
import { getStateRatesSnapshotUncached } from '@/lib/server/get-state-rates';

describe('State Electricity Rates Configuration & Helpers', () => {
  it('defines exactly ten approved states in FIRST_TEN_STATES', () => {
    expect(APPROVED_STATE_SLUGS).toHaveLength(10);
    expect(Object.keys(FIRST_TEN_STATES)).toHaveLength(10);
    expect(APPROVED_STATE_SLUGS).toEqual([
      'california',
      'texas',
      'florida',
      'new-york',
      'pennsylvania',
      'illinois',
      'ohio',
      'georgia',
      'north-carolina',
      'michigan',
    ]);
  });

  it('correctly validates approved state slugs', () => {
    expect(isApprovedStateSlug('california')).toBe(true);
    expect(isApprovedStateSlug('TEXAS')).toBe(true);
    expect(isApprovedStateSlug('michigan')).toBe(true);

    expect(isApprovedStateSlug('alaska')).toBe(false);
    expect(isApprovedStateSlug('hawaii')).toBe(false);
    expect(isApprovedStateSlug('district-of-columbia')).toBe(false);
    expect(isApprovedStateSlug('unknown-slug')).toBe(false);
  });

  it('calculates household energy charges correctly', () => {
    const rateCentsPerKwh = 20.0;
    const examples = calculateHouseholdCostExamples(rateCentsPerKwh);

    expect(examples).toHaveLength(4);
    expect(examples[0]).toEqual({
      kwh: 500,
      label: '500 kWh / month (Apartment / Small Home)',
      monthlyEnergyCostUsd: 100,
    });
    expect(examples[1]).toEqual({
      kwh: 800,
      label: '800 kWh / month (Medium Home / Efficient Usage)',
      monthlyEnergyCostUsd: 160,
    });
    expect(examples[2]).toEqual({
      kwh: 1000,
      label: '1,000 kWh / month (Standard U.S. Household Baseline)',
      monthlyEnergyCostUsd: 200,
    });
    expect(examples[3]).toEqual({
      kwh: 1500,
      label: '1,500 kWh / month (Large Home / All-Electric / High AC)',
      monthlyEnergyCostUsd: 300,
    });
  });

  it('formats EIA YYYY-MM source periods into human-readable months', () => {
    expect(formatSourcePeriod('2026-03')).toBe('March 2026');
    expect(formatSourcePeriod('2025-12')).toBe('December 2025');
    expect(formatSourcePeriod('invalid')).toBe('invalid');
  });

  it('detects consecutive calendar months accurately to prevent false zero-interpolation on missing periods', () => {
    expect(isConsecutiveCalendarMonth('2026-03', '2026-02')).toBe(true);
    expect(isConsecutiveCalendarMonth('2026-01', '2025-12')).toBe(true);
    // Gap detected: March to January (missing Feb)
    expect(isConsecutiveCalendarMonth('2026-03', '2026-01')).toBe(false);
    expect(isConsecutiveCalendarMonth('2026-05', '2025-05')).toBe(false);
  });

  it('includes all ten state pages in sitemapRoutes', () => {
    const sitemapHrefs = sitemapRoutes.map((r) => r.href);
    APPROVED_STATE_SLUGS.forEach((slug) => {
      expect(sitemapHrefs).toContain(`/electricity-rates/${slug}`);
    });
  });

  it('permits ad rendering only for the ten approved state pages', () => {
    APPROVED_STATE_SLUGS.forEach((slug) => {
      expect(isAdEligibleRoute(`/electricity-rates/${slug}`)).toBe(true);
    });

    expect(isAdEligibleRoute('/electricity-rates/alaska')).toBe(false);
    expect(isAdEligibleRoute('/electricity-rates/hawaii')).toBe(false);
    expect(isAdEligibleRoute('/electricity-rates/random')).toBe(false);
  });
});

describe('Data Provenance & Unavailable State Architecture', () => {
  it('returns unavailable provenance when database is unreachable', async () => {
    const snapshot = await getStateRatesSnapshotUncached();
    if (!snapshot.available) {
      expect(snapshot.provenance.status).toBe('unavailable');
      expect(snapshot.rates).toEqual({});
    } else {
      expect(snapshot.provenance.status).toBe('live_database');
      expect(snapshot.provenance).toHaveProperty('sourcePeriod');
      expect(snapshot.provenance).toHaveProperty('sourceName');
    }
  });

  it('returns explicit unavailable view model for state page when DB is offline', async () => {
    const data = await getStatePageDataUncached('california');
    expect(data).not.toBeNull();
    if (!data?.hasData) {
      expect(data?.provenance.status).toBe('unavailable');
      expect(data?.latestStateRate).toBeNull();
      expect(data?.latestNationalRate).toBeNull();
      expect(data?.householdExamples).toEqual([]);
      expect(data?.history).toEqual([]);
      expect(data?.dataStatusText).toContain('Current state-rate data could not be loaded.');
      // Does not contain technical Postgres errors
      expect(data?.dataStatusText).not.toContain('PostgreSQL');
      expect(data?.dataStatusText).not.toContain('error');
    }
  });
});
