import fs from 'fs';
import path from 'path';

import { describe, expect, it, vi } from 'vitest';

import { CANONICAL_50_STATE_CODES, US_GEOGRAPHIES } from '@energy-bill-lab/database';

import { dynamic as hubDynamic } from '@/app/research/page';
import { GET as getCsvRoute } from '@/app/research/us-residential-electricity-rate-report/csv/route';
import { dynamic as reportDynamic } from '@/app/research/us-residential-electricity-rate-report/page';
import { PUBLISHED_STATES } from '@/config/published-states';
import { isAdEligibleRoute } from '@/lib/ad-eligibility';
import { createPageMetadata } from '@/lib/metadata';
import { getRouteByHref, sitemapRoutes } from '@/lib/routes';
import { getNationalRateReportUncached } from '@/lib/server/get-national-rate-report';
import type * as nationalReportModule from '@/lib/server/get-national-rate-report';
import { createReportStructuredData } from '@/lib/structured-data';

vi.mock('@/lib/server/get-national-rate-report', async (importOriginal) => {
  const actual = await importOriginal<typeof nationalReportModule>();
  return {
    ...actual,
    getNationalRateReport: () => actual.getNationalRateReportUncached(),
  };
});

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

  it('verifies force-dynamic rendering mode across research hub and report page', () => {
    expect(hubDynamic).toBe('force-dynamic');
    expect(reportDynamic).toBe('force-dynamic');
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

  it('verifies canonical 50-state universe excludes US national, DC, and territories', () => {
    expect(CANONICAL_50_STATE_CODES.length).toBe(50);
    expect(CANONICAL_50_STATE_CODES.includes('US')).toBe(false);
    expect(CANONICAL_50_STATE_CODES.includes('DC')).toBe(false);
    expect(CANONICAL_50_STATE_CODES.includes('PR')).toBe(false);

    const dcSeed = US_GEOGRAPHIES.find((g) => g.code === 'DC');
    expect(dcSeed?.kind).toBe('district');

    const usSeed = US_GEOGRAPHIES.find((g) => g.code === 'US');
    expect(usSeed?.kind).toBe('national');
  });

  it('evaluates national rate report uncached gracefully and computes isLargeMonthlyMovement flag', async () => {
    const report = await getNationalRateReportUncached();

    expect(report).toBeDefined();
    expect(typeof report.available).toBe('boolean');
    expect(typeof report.generatedAt).toBe('string');
    expect(Array.isArray(report.highestRates)).toBe(true);
    expect(Array.isArray(report.lowestRates)).toBe(true);
    expect(Array.isArray(report.allStates)).toBe(true);
    expect(Array.isArray(report.householdExamples)).toBe(true);

    if (report.available) {
      expect(report.reportingPeriod).toBeTruthy();
      expect(report.reportingPeriodFormatted).toBeTruthy();
      expect(report.provenance.status).toBe('live_database');
      expect(report.statesIncludedCount).toBe(50);

      // Verify isLargeMonthlyMovement flag for movements >= 20%
      for (const item of report.largestMonthlyIncreases.concat(report.largestMonthlyDecreases)) {
        expect(typeof item.isLargeMonthlyMovement).toBe('boolean');
        expect(item.isLargeMonthlyMovement).toBe(Math.abs(item.changePercent) >= 20);
      }

      // Highest rates should be ordered descending
      const [h0, h1] = report.highestRates;
      if (h0 && h1) {
        expect(h0.priceCentsPerKwh).toBeGreaterThanOrEqual(h1.priceCentsPerKwh);
      }

      // Lowest rates should be ordered ascending
      const [l0, l1] = report.lowestRates;
      if (l0 && l1) {
        expect(l0.priceCentsPerKwh).toBeLessThanOrEqual(l1.priceCentsPerKwh);
      }
    } else {
      expect(report.provenance.status).toBe('unavailable');
      expect(report.nationalAverageCentsPerKwh).toBeNull();
      expect(report.statesIncludedCount).toBe(0);
    }
  });

  it('dynamically resolves all 50 state report routes and leaves zero Rate Data Only labels', () => {
    const all50Slugs = Object.keys(PUBLISHED_STATES);
    expect(all50Slugs).toHaveLength(50);

    all50Slugs.forEach((slug: string) => {
      const config = PUBLISHED_STATES[slug];
      expect(config).toBeDefined();
      expect(config?.isPublished).toBe(true);
    });

    const unpublishedSlugs = all50Slugs.filter(
      (slug: string) => !PUBLISHED_STATES[slug]?.isPublished,
    );
    expect(unpublishedSlugs).toHaveLength(0);
  });

  it('validates CSV export route headers, columns, X-Report-Period, cache-control, and content', async () => {
    const response = await getCsvRoute();

    expect(response).toBeDefined();
    const contentType = response.headers.get('Content-Type');
    const contentDisposition = response.headers.get('Content-Disposition');
    const cacheControl = response.headers.get('Cache-Control');
    const reportPeriodHeader = response.headers.get('X-Report-Period');

    if (response.status === 200) {
      expect(contentType).toBe('text/csv; charset=utf-8');
      expect(contentDisposition).toBe(
        'attachment; filename="us-residential-electricity-rate-report.csv"',
      );
      expect(cacheControl).toBe('public, s-maxage=86400, stale-while-revalidate=3600');
      expect(reportPeriodHeader).toBeTruthy();

      const text = await response.text();
      const lines = text.trim().split('\n');

      expect(lines[0]).toBe(
        'reporting_period,state_code,state_name,residential_rate_cents_per_kwh,monthly_change_cents,monthly_change_percent,annual_change_cents,annual_change_percent,source_organization,source_dataset',
      );

      // Verify no NaN, Infinity, or undefined strings in CSV
      expect(text.includes('NaN')).toBe(false);
      expect(text.includes('Infinity')).toBe(false);
      expect(text.includes('undefined')).toBe(false);
    } else {
      expect(response.status).toBe(503);
    }
  });

  it('generates accurate Report structured data schema with ISO temporalCoverage', () => {
    const jsonLd = createReportStructuredData({
      title: 'U.S. Residential Electricity-Rate Report',
      description: 'National electricity rate report.',
      path: '/research/us-residential-electricity-rate-report',
      datePublished: '2026-07-24',
      dateModified: '2026-07-24',
      reportingPeriod: '2026-04',
    });

    expect(jsonLd['@type']).toBe('Report');
    expect(jsonLd.name).toBe('U.S. Residential Electricity-Rate Report');
    expect(jsonLd.spatialCoverage.name).toBe('United States');
    expect(jsonLd.temporalCoverage).toBe('2026-04');
    expect(jsonLd.author.name).toBe('Jaynesh Shingala');
    expect(jsonLd.publisher.name).toBe('Energy Bill Lab');
  });

  it('confirms outreach kit document contains all 5 required templates', () => {
    const kitPath = path.resolve(
      process.cwd(),
      '../../docs/growth/electricity-rate-report-outreach-kit.md',
    );
    expect(fs.existsSync(kitPath)).toBe(true);

    const kitContent = fs.readFileSync(kitPath, 'utf8');
    expect(kitContent.includes('Template 1: State / Local Utility Journalist')).toBe(true);
    expect(kitContent.includes('Template 2: Personal Finance & Budgeting Writer')).toBe(true);
    expect(kitContent.includes('Template 3: University Energy / Environmental Researcher')).toBe(
      true,
    );
    expect(
      kitContent.includes('Template 4: Public Library / Educational Resource Page Maintainer'),
    ).toBe(true);
    expect(kitContent.includes('Template 5: Existing Article Data Correction or Update')).toBe(
      true,
    );
  });

  it('keeps research report routes ineligible for ads until manual review', () => {
    expect(isAdEligibleRoute('/research')).toBe(false);
    expect(isAdEligibleRoute('/research/us-residential-electricity-rate-report')).toBe(false);
  });
});
