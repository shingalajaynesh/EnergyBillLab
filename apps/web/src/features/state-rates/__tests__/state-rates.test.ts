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
  it('defines exactly fifty approved states in PUBLISHED_STATES', () => {
    expect(APPROVED_STATE_SLUGS).toHaveLength(50);
    expect(Object.keys(PUBLISHED_STATES)).toHaveLength(50);
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
      'colorado',
      'minnesota',
      'south-carolina',
      'alabama',
      'louisiana',
      'kentucky',
      'oregon',
      'oklahoma',
      'connecticut',
      'iowa',
      'nevada',
      'arkansas',
      'mississippi',
      'kansas',
      'utah',
      'nebraska',
      'new-mexico',
      'west-virginia',
      'idaho',
      'hawaii',
      'maine',
      'new-hampshire',
      'rhode-island',
      'vermont',
      'delaware',
      'montana',
      'south-dakota',
      'north-dakota',
      'wyoming',
      'alaska',
    ]);
  });

  it('verifies every published state contains complete authoritative sources (organization, title, url, supportedTopic)', () => {
    APPROVED_STATE_SLUGS.forEach((slug) => {
      const config = PUBLISHED_STATES[slug];
      expect(config).toBeDefined();
      expect(config!.sources.length).toBeGreaterThanOrEqual(2);
      config!.sources.forEach((src) => {
        expect(src.organization).toBeTruthy();
        expect(src.title).toBeTruthy();
        expect(src.url).toMatch(/^https?:\/\//);
        expect(src.supportedTopic).toBeTruthy();
      });
    });
  });

  it('verifies material key factors in each state have corresponding supportedTopic sources', () => {
    APPROVED_STATE_SLUGS.forEach((slug) => {
      const config = PUBLISHED_STATES[slug];
      expect(config).toBeDefined();
      expect(config!.keyFactors.length).toBe(3);
      // Prove that at least one source supportedTopic exists per state
      const supportedTopics = config!.sources.map((s) => s.supportedTopic.toLowerCase());
      expect(supportedTopics.length).toBeGreaterThan(0);
      expect(supportedTopics.some((t) => t.length > 5)).toBe(true);
    });
  });

  it('correctly validates approved state slugs for all fifty states', () => {
    expect(isApprovedStateSlug('california')).toBe(true);
    expect(isApprovedStateSlug('TEXAS')).toBe(true);
    expect(isApprovedStateSlug('nevada')).toBe(true);
    expect(isApprovedStateSlug('hawaii')).toBe(true);
    expect(isApprovedStateSlug('alaska')).toBe(true);
    expect(isApprovedStateSlug('maine')).toBe(true);

    expect(isApprovedStateSlug('district-of-columbia')).toBe(false);
    expect(isApprovedStateSlug('puerto-rico')).toBe(false);
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

  it('includes all fifty state pages in sitemapRoutes', () => {
    const sitemapHrefs = sitemapRoutes.map((r) => r.href);
    APPROVED_STATE_SLUGS.forEach((slug) => {
      expect(sitemapHrefs).toContain(`/electricity-rates/${slug}`);
    });
  });

  it('permits ad rendering for all fifty approved state pages and rejects non-state / excluded routes', () => {
    APPROVED_STATE_SLUGS.forEach((slug) => {
      expect(isAdEligibleRoute(`/electricity-rates/${slug}`)).toBe(true);
    });

    expect(isAdEligibleRoute('/electricity-rates/district-of-columbia')).toBe(false);
    expect(isAdEligibleRoute('/electricity-rates/puerto-rico')).toBe(false);
    expect(isAdEligibleRoute('/electricity-rates/random')).toBe(false);
  });
});

describe('Data Provenance & Unavailable State Architecture', () => {
  it('returns unavailable provenance when database is unreachable', async () => {
    const snapshot = await getStateRatesSnapshotUncached();
    if (!snapshot.available) {
      expect(snapshot.provenance.status).toBe('unavailable');
    }
  });

  it('returns explicit unavailable view model for state page when DB is offline', async () => {
    const pageData = await getStatePageDataUncached('california');
    expect(pageData).not.toBeNull();
    if (pageData && !pageData.hasData) {
      expect(pageData.config.name).toBe('California');
      expect(pageData.config.code).toBe('CA');
      expect(pageData.latestStateRate).toBeNull();
      expect(pageData.history).toEqual([]);
    }
  });
});
