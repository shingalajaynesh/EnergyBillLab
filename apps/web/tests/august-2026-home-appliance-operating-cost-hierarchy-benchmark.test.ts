import { describe, expect, it } from 'vitest';

import { august2026HomeApplianceOperatingCostHierarchyBenchmark } from '../src/content/insights/articles/august-2026-home-appliance-operating-cost-hierarchy-benchmark';
import {
  getInsightsByCategory,
  getInsightBySlug,
  getPublishedInsights,
} from '../src/content/insights';
import { validateInsightRecord } from '../src/lib/insights-validation';

describe('August 2026 Home Appliance Operating Cost Hierarchy Insight', () => {
  it('1. passes full automated registry record validation', () => {
    const result = validateInsightRecord(august2026HomeApplianceOperatingCostHierarchyBenchmark);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('2. is registered in the global insights registry', () => {
    const found = getInsightBySlug('august-2026-home-appliance-operating-cost-hierarchy-benchmark');
    expect(found).toBeDefined();
    expect(found?.id).toBe(
      'insight-2026-08-04-august-appliance-operating-cost-hierarchy-benchmark',
    );
  });

  it('3. is included in published insights', () => {
    const published = getPublishedInsights('2026-08-04T12:00:00.000Z');
    const found = published.find(
      (item) => item.slug === 'august-2026-home-appliance-operating-cost-hierarchy-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.status).toBe('published');
  });

  it('4. activates appliances category with published articles', () => {
    const applianceInsights = getInsightsByCategory('appliances', '2026-08-04T12:00:00.000Z');
    expect(applianceInsights.length).toBeGreaterThanOrEqual(1);
  });

  it('5. adheres to strict author and privacy boundaries', () => {
    const record = august2026HomeApplianceOperatingCostHierarchyBenchmark;
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
    const record = august2026HomeApplianceOperatingCostHierarchyBenchmark;
    expect(record.sources.length).toBeGreaterThanOrEqual(2);
    for (const src of record.sources) {
      expect(src.url.startsWith('https://')).toBe(true);
      expect(src.url).not.toContain('utm_source');
    }
  });

  it('7. contains valid internal links to permanent resources', () => {
    const record = august2026HomeApplianceOperatingCostHierarchyBenchmark;
    expect(record.relatedRoutes).toContain('/tools/appliance-energy-cost-calculator');
    expect(record.relatedRoutes).toContain('/tools/ac-cost-calculator');
    expect(record.relatedRoutes).toContain('/appliances');
    expect(record.relatedRoutes).toContain('/electricity-rates');
  });

  it('8. provides original analytical calculations for 10 top home appliances', () => {
    const record = august2026HomeApplianceOperatingCostHierarchyBenchmark;
    expect(record.summary).toContain('630 kWh');
    expect(record.summary).toContain('$116.17/month');
    expect(record.summary).toContain('405 kWh');
    expect(record.summary).toContain('$74.68/month');
    expect(record.practicalExample).toContain('$327.80 at the U.S. national average rate');
    expect(record.practicalExample).toContain('$575.96 per month');
  });
});
