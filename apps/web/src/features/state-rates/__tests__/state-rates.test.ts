import { describe, expect, it } from 'vitest';

import {
  APPROVED_STATE_SLUGS,
  isApprovedStateSlug,
  PUBLISHED_STATES,
} from '@/config/published-states';
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
  it('defines exactly twenty approved states in PUBLISHED_STATES', () => {
    expect(APPROVED_STATE_SLUGS).toHaveLength(20);
    expect(Object.keys(PUBLISHED_STATES)).toHaveLength(20);
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
      'arizona',
      'virginia',
      'washington',
      'new-jersey',
      'massachusetts',
      'tennessee',
      'indiana',
      'missouri',
      'maryland',
      'wisconsin',
    ]);
  });

  it('verifies every published state contains authoritative non-empty sources', () => {
    APPROVED_STATE_SLUGS.forEach((slug) => {
      const config = PUBLISHED_STATES[slug];
      expect(config).toBeDefined();
      expect(config!.sources.length).toBeGreaterThan(0);
      config!.sources.forEach((src) => {
        expect(src.name).toBeTruthy();
        expect(src.url).toMatch(/^https?:\/\//);
      });
    });
  });

  it('correctly validates approved state slugs', () => {
    expect(isApprovedStateSlug('california')).toBe(true);
    expect(isApprovedStateSlug('TEXAS')).toBe(true);
    expect(isApprovedStateSlug('michigan')).toBe(true);
    expect(isApprovedStateSlug('arizona')).toBe(true);
    expect(isApprovedStateSlug('wisconsin')).toBe(true);

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

  it('formats EIA YYYY-MM and YYYY-MM-DD source periods into human-readable months', () => {
    expect(formatSourcePeriod('2026-03')).toBe('March 2026');
    expect(formatSourcePeriod('2026-04-01')).toBe('April 2026');
    expect(formatSourcePeriod('2025-12-01')).toBe('December 2025');
    expect(formatSourcePeriod('invalid')).toBe('invalid');
  });

  it('detects consecutive calendar months accurately to prevent false zero-interpolation on missing periods', () => {
    expect(isConsecutiveCalendarMonth('2026-03', '2026-02')).toBe(true);
    expect(isConsecutiveCalendarMonth('2026-04-01', '2026-03-01')).toBe(true);
    expect(isConsecutiveCalendarMonth('2026-01-01', '2025-12-01')).toBe(true);
    // Gap detected: March to January (missing Feb)
    expect(isConsecutiveCalendarMonth('2026-03-01', '2026-01-01')).toBe(false);
    expect(isConsecutiveCalendarMonth('2026-05-01', '2025-05-01')).toBe(false);
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
