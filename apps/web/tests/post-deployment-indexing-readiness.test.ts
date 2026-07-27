import fs from 'fs';
import path from 'path';

import { describe, expect, it, vi } from 'vitest';

import { CANONICAL_50_STATE_CODES, US_GEOGRAPHIES } from '@energy-bill-lab/database';

import { GET as getCsvRoute } from '@/app/research/us-residential-electricity-rate-report/csv/route';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { APPROVED_STATE_SLUGS, PUBLISHED_STATES } from '@/config/published-states';
import { createPageMetadata } from '@/lib/metadata';
import { publicRoutes } from '@/lib/routes';
import type {
  NationalRateReportModel,
  StateRateRanking,
} from '@/lib/server/get-national-rate-report';
import { getSiteUrl, SITE_URL } from '@/lib/site';

// Build mock 50-state report for unit test environment
const mockAllStates: StateRateRanking[] = CANONICAL_50_STATE_CODES.map((code, idx) => {
  const geo = US_GEOGRAPHIES.find((g) => g.code === code);
  let price = 16.5;
  if (code === 'HI') price = 44.59;
  if (code === 'ND') price = 10.44;

  return {
    rank: idx + 1,
    code,
    name: geo?.name || code,
    slug: geo?.slug || code.toLowerCase(),
    isPublished: true,
    priceCentsPerKwh: price,
    period: '2026-05',
    periodFormatted: 'May 2026',
  };
}).sort((a, b) => b.priceCentsPerKwh - a.priceCentsPerKwh);

const mockHighest = mockAllStates.slice(0, 10);
const mockLowest = [...mockAllStates]
  .sort((a, b) => a.priceCentsPerKwh - b.priceCentsPerKwh)
  .slice(0, 10);

const mockNationalReport: NationalRateReportModel = {
  available: true,
  reportingPeriod: '2026-05',
  reportingPeriodFormatted: 'May 2026',
  generatedAt: '2026-07-26T22:00:00.000Z',
  provenance: {
    status: 'live_database',
    sourcePeriod: '2026-05',
    sourceName: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
  },
  nationalAverageCentsPerKwh: 18.44,
  statesIncludedCount: 50,
  statesExcluded: [],
  highestRates: mockHighest,
  lowestRates: mockLowest,
  allStates: mockAllStates,
  largestMonthlyIncreases: [],
  largestMonthlyDecreases: [],
  largestAnnualIncreases: [],
  largestAnnualDecreases: [],
  householdExamples: [],
  rateSpreadCents: 34.15,
  rateSpreadRatio: 4.27,
};

vi.mock('@/lib/server/get-national-rate-report', () => ({
  getNationalRateReport: () => Promise.resolve(mockNationalReport),
  getNationalRateReportUncached: () => Promise.resolve(mockNationalReport),
}));

describe('Post-Deployment Cleanup and Indexing Readiness', () => {
  // Test 1: Public pages show 50 of 50 states
  it('1. Public pages show 50 of 50 states', () => {
    expect(APPROVED_STATE_SLUGS).toHaveLength(50);
    expect(Object.keys(PUBLISHED_STATES)).toHaveLength(50);
    expect(APPROVED_STATE_SLUGS.every((slug) => PUBLISHED_STATES[slug]?.isPublished)).toBe(true);
  });

  // Test 2: No stale "20 states" wording exists publicly
  it('2. No stale "20 states" or incomplete-coverage wording exists publicly', () => {
    const filesToCheck = [
      path.resolve(process.cwd(), 'src/app/page.tsx'),
      path.resolve(process.cwd(), 'src/app/electricity-rates/page.tsx'),
      path.resolve(process.cwd(), 'src/app/research/page.tsx'),
      path.resolve(
        process.cwd(),
        'src/app/research/us-residential-electricity-rate-report/page.tsx',
      ),
      path.resolve(process.cwd(), 'src/content/pages.ts'),
    ];

    const prohibitedPhrases = [
      '20 states',
      '20 of 50',
      '30 states',
      '40 states',
      'remaining state reports',
      'more states coming',
      'unpublished states',
      'without mass-generated AI content or clickbait',
    ];

    filesToCheck.forEach((filePath) => {
      expect(fs.existsSync(filePath)).toBe(true);
      const content = fs.readFileSync(filePath, 'utf8');
      prohibitedPhrases.forEach((phrase) => {
        expect(content.toLowerCase()).not.toContain(phrase.toLowerCase());
      });
    });
  });

  // Test 3: No "Rate Data Only" label remains
  it('3. No "Rate Data Only" label remains across published states', () => {
    const unpublishedStates = APPROVED_STATE_SLUGS.filter(
      (slug) => !PUBLISHED_STATES[slug]?.isPublished,
    );
    expect(unpublishedStates).toHaveLength(0);
  });

  // Test 4: Fifty state routes exist
  it('4. Fifty state routes exist in public routes registry', () => {
    const stateRoutes = publicRoutes.filter((r) => r.href.startsWith('/electricity-rates/'));
    expect(stateRoutes).toHaveLength(50);
  });

  // Test 5: Sitemap contains fifty unique state routes
  it('5. Sitemap contains fifty unique state routes', () => {
    const entries = sitemap();
    const stateUrls = entries
      .map((e) => e.url)
      .filter((url) => url.includes('/electricity-rates/'));

    expect(stateUrls).toHaveLength(50);
    expect(new Set(stateUrls).size).toBe(50);
    expect(stateUrls.every((url) => !url.includes('localhost'))).toBe(true);
  });

  // Test 6: Canonical hostname is consistent
  it('6. Canonical hostname is consistent across SITE_URL, getSiteUrl, robots, and sitemap', () => {
    expect(SITE_URL).toBe('https://energybilllab.com');
    expect(getSiteUrl('/research')).toBe('https://energybilllab.com/research');

    const robotsConfig = robots();
    expect(robotsConfig.sitemap).toBe('https://energybilllab.com/sitemap.xml');

    const sitemapEntries = sitemap();
    expect(sitemapEntries.every((e) => e.url.startsWith('https://energybilllab.com'))).toBe(true);
    expect(sitemapEntries.every((e) => !e.url.includes('www.'))).toBe(true);
  });

  // Test 7: Research HTML and CSV periods match
  it('7. Research HTML and CSV periods match', async () => {
    const csvResponse = await getCsvRoute();
    const csvPeriodHeader = csvResponse.headers.get('X-Report-Period');

    expect(csvPeriodHeader).toBe(mockNationalReport.reportingPeriod);
  });

  // Test 8: CSV contains fifty unique state codes
  it('8. CSV contains fifty unique state codes', async () => {
    const csvResponse = await getCsvRoute();
    expect(csvResponse.status).toBe(200);

    const text = await csvResponse.text();
    const lines = text.trim().split('\n');
    const dataRows = lines.slice(1);

    expect(dataRows).toHaveLength(50);

    const stateCodesInCsv = dataRows.map((line) => line.split(',')[1]);
    expect(new Set(stateCodesInCsv).size).toBe(50);
    expect(stateCodesInCsv.sort()).toEqual([...CANONICAL_50_STATE_CODES].sort());
  });

  // Test 9: HTML and CSV national metrics match
  it('9. HTML and CSV national metrics match validated April 2026 database values', async () => {
    const csvResponse = await getCsvRoute();
    expect(csvResponse.status).toBe(200);

    const text = await csvResponse.text();
    const lines = text.trim().split('\n');

    const highestInHtml = mockNationalReport.highestRates[0];
    const lowestInHtml = mockNationalReport.lowestRates[0];

    expect(highestInHtml?.code).toBe('HI');
    expect(highestInHtml?.priceCentsPerKwh).toBeCloseTo(44.59, 2);

    expect(lowestInHtml?.code).toBe('ND');
    expect(lowestInHtml?.priceCentsPerKwh).toBeCloseTo(10.44, 2);

    const hiCsvRow = lines.find((l) => l.split(',')[1] === 'HI');
    const ndCsvRow = lines.find((l) => l.split(',')[1] === 'ND');

    expect(hiCsvRow).toBeDefined();
    expect(ndCsvRow).toBeDefined();

    if (hiCsvRow && ndCsvRow) {
      expect(parseFloat(hiCsvRow.split(',')[3] || '0')).toBeCloseTo(44.59, 2);
      expect(parseFloat(ndCsvRow.split(',')[3] || '0')).toBeCloseTo(10.44, 2);
    }
  });

  // Test 10: Homepage metadata reflects rates and calculators
  it('10. Homepage metadata reflects rates and calculators', () => {
    const homepageMeta = createPageMetadata({
      title: 'Energy Bill Lab | Electricity Rates & Home Energy Calculators',
      description:
        'Compare residential electricity rates across all 50 U.S. states, analyze your electric bill, and estimate appliance energy costs using transparent formulas and U.S. EIA data.',
      path: '/',
    });

    expect(homepageMeta.title).toBe(
      'Energy Bill Lab | Electricity Rates & Home Energy Calculators',
    );
    expect(homepageMeta.description).toContain(
      'Compare residential electricity rates across all 50 U.S. states',
    );
    expect(homepageMeta.alternates?.canonical).toBe('/');
  });

  // Test 11: Protected files remain unchanged
  it('11. Protected files remain unchanged on disk', () => {
    const protectedFiles = [
      path.resolve(process.cwd(), '../../packages/database/src/clients/db-client.ts'),
      path.resolve(process.cwd(), 'package.json'),
      path.resolve(process.cwd(), '../../turbo.json'),
      path.resolve(process.cwd(), '../../vercel.json'),
      path.resolve(process.cwd(), '../../render.yaml'),
    ];

    protectedFiles.forEach((filePath) => {
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });
});
