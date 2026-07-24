import { describe, expect, it } from 'vitest';

import { isAdEligibleRoute } from '@/lib/ad-eligibility';
import { createPageMetadata } from '@/lib/metadata';
import { getRouteByHref, sitemapRoutes } from '@/lib/routes';
import { getNationalRateReportUncached } from '@/lib/server/get-national-rate-report';

describe('U.S. Residential Electricity-Rate Report & Research Hub', () => {
  it('registers /research and /research/us-residential-electricity-rate-report routes', () => {
    const hubRoute = getRouteByHref('/research');
    const reportRoute = getRouteByHref('/research/us-residential-electricity-rate-report');

    expect(hubRoute).toBeDefined();
    expect(reportRoute).toBeDefined();

    expect(hubRoute?.group).toBe('research');
    expect(reportRoute?.group).toBe('research');

    expect(sitemapRoutes.some((r) => r.href === '/research')).toBe(true);
    expect(
      sitemapRoutes.some((r) => r.href === '/research/us-residential-electricity-rate-report'),
    ).toBe(true);
  });

  it('generates valid page metadata for research routes', () => {
    const hubMeta = createPageMetadata({
      title: 'Research Hub',
      description: 'U.S. residential energy research reports.',
      path: '/research',
    });

    const reportMeta = createPageMetadata({
      title: 'U.S. Residential Electricity-Rate Report',
      description: 'National residential rate benchmarks.',
      path: '/research/us-residential-electricity-rate-report',
    });

    expect(hubMeta.title).toBe('Research Hub');
    expect(reportMeta.title).toBe('U.S. Residential Electricity-Rate Report');

    expect(hubMeta.alternates?.canonical).toBe('/research');
    expect(reportMeta.alternates?.canonical).toBe(
      '/research/us-residential-electricity-rate-report',
    );
  });

  it('evaluates national rate report uncached gracefully', async () => {
    const report = await getNationalRateReportUncached();

    expect(report).toBeDefined();
    expect(typeof report.available).toBe('boolean');
    expect(typeof report.generatedAt).toBe('string');
    expect(Array.isArray(report.highestRates)).toBe(true);
    expect(Array.isArray(report.lowestRates)).toBe(true);
    expect(Array.isArray(report.householdExamples)).toBe(true);

    if (report.available) {
      expect(report.reportingPeriod).toBeTruthy();
      expect(report.reportingPeriodFormatted).toBeTruthy();
      expect(report.provenance.status).toBe('live_database');
      expect(report.statesIncludedCount).toBeGreaterThan(0);

      // Verify household calculations conversion (cents/kWh -> USD)
      if (report.nationalAverageCentsPerKwh !== null) {
        const ex1000 = report.householdExamples.find((e) => e.kwh === 1000);
        expect(ex1000).toBeDefined();
        if (ex1000 && ex1000.nationalCostUsd !== null) {
          expect(ex1000.nationalCostUsd).toBeCloseTo(
            (1000 * report.nationalAverageCentsPerKwh) / 100,
            2,
          );
        }
      }
    } else {
      expect(report.provenance.status).toBe('unavailable');
      expect(report.nationalAverageCentsPerKwh).toBeNull();
      expect(report.statesIncludedCount).toBe(0);
    }
  });

  it('keeps research report routes ineligible for ads until manual review', () => {
    expect(isAdEligibleRoute('/research')).toBe(false);
    expect(isAdEligibleRoute('/research/us-residential-electricity-rate-report')).toBe(false);
  });
});
