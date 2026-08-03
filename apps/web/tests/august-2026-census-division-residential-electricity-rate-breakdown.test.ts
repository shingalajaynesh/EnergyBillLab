import { describe, expect, it } from 'vitest';

import { august2026CensusDivisionResidentialElectricityRateBreakdown } from '../src/content/insights/articles/august-2026-census-division-residential-electricity-rate-breakdown';
import {
  getInsightsByCategory,
  getInsightBySlug,
  getPublishedInsights,
} from '../src/content/insights';
import { validateInsightRecord } from '../src/lib/insights-validation';

describe('August 2026 U.S. Census Division Electricity Rate Breakdown Insight', () => {
  it('1. passes full automated registry record validation', () => {
    const result = validateInsightRecord(
      august2026CensusDivisionResidentialElectricityRateBreakdown,
    );
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('2. is registered in the global insights registry', () => {
    const found = getInsightBySlug(
      'august-2026-census-division-residential-electricity-rate-breakdown',
    );
    expect(found).toBeDefined();
    expect(found?.id).toBe('insight-2026-08-03-august-census-division-electricity-rate-breakdown');
  });

  it('3. is included in published insights', () => {
    const published = getPublishedInsights('2026-08-03T12:00:00.000Z');
    const found = published.find(
      (item) => item.slug === 'august-2026-census-division-residential-electricity-rate-breakdown',
    );
    expect(found).toBeDefined();
    expect(found?.status).toBe('published');
  });

  it('4. activates electricity-rates category with at least 3 published articles', () => {
    const electricityRatesInsights = getInsightsByCategory(
      'electricity-rates',
      '2026-08-03T12:00:00.000Z',
    );
    expect(electricityRatesInsights.length).toBeGreaterThanOrEqual(3);
  });

  it('5. adheres to strict author and privacy boundaries', () => {
    const record = august2026CensusDivisionResidentialElectricityRateBreakdown;
    expect(record.authorName).toBe('Jaynesh Shingala');
    const jsonStr = JSON.stringify(record);
    expect(jsonStr).not.toContain('Founder');
    expect(jsonStr).not.toContain('Engineer');
    expect(jsonStr).not.toContain('Analyst');
    expect(jsonStr).not.toContain('Surat');
    expect(jsonStr).not.toContain('Gujarat');
    expect(jsonStr).not.toContain('India');
  });

  it('6. contains valid sources with official URLs', () => {
    const record = august2026CensusDivisionResidentialElectricityRateBreakdown;
    expect(record.sources.length).toBeGreaterThanOrEqual(2);
    for (const src of record.sources) {
      expect(src.url.startsWith('https://')).toBe(true);
      expect(src.url).not.toContain('utm_source');
    }
  });

  it('7. contains valid internal links to permanent resources', () => {
    const record = august2026CensusDivisionResidentialElectricityRateBreakdown;
    expect(record.relatedRoutes).toContain('/electricity-rates');
    expect(record.relatedRoutes).toContain('/tools/electricity-bill-analyzer');
    expect(record.relatedRoutes).toContain('/research/us-residential-electricity-rate-report');
  });

  it('8. provides original analytical calculations for 1,000 kWh bill burdens across 9 Census Divisions', () => {
    const record = august2026CensusDivisionResidentialElectricityRateBreakdown;
    expect(record.summary).toContain('28.14 cents per kWh');
    expect(record.summary).toContain('14.75 cents per kWh');
    expect(record.summary).toContain('$281.40 per month');
    expect(record.summary).toContain('$147.50 per month');
    expect(record.practicalExample).toContain('$133.90 per month');
  });
});
