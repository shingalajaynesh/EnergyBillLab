import { describe, expect, it } from 'vitest';

import { august2026NaturalGasVsElectricHeatingCostPerMmtuBenchmark } from '../src/content/insights/articles/august-2026-natural-gas-vs-electric-heating-cost-per-mmbtu-benchmark';
import {
  getInsightsByCategory,
  getInsightBySlug,
  getPublishedInsights,
} from '../src/content/insights';
import { validateInsightRecord } from '../src/lib/insights-validation';

describe('August 2026 Natural Gas vs. Electric Heating Cost-per-MMBtu Insight', () => {
  it('1. passes full automated registry record validation', () => {
    const result = validateInsightRecord(august2026NaturalGasVsElectricHeatingCostPerMmtuBenchmark);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('2. is registered in the global insights registry', () => {
    const found = getInsightBySlug(
      'august-2026-natural-gas-vs-electric-heating-cost-per-mmbtu-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.id).toBe(
      'insight-2026-08-05-august-natural-gas-vs-electric-heating-cost-per-mmbtu-benchmark',
    );
  });

  it('3. is included in published insights', () => {
    const published = getPublishedInsights('2026-08-05T12:00:00.000Z');
    const found = published.find(
      (item) =>
        item.slug === 'august-2026-natural-gas-vs-electric-heating-cost-per-mmbtu-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.status).toBe('published');
  });

  it('4. activates natural-gas category with at least 3 published articles', () => {
    const naturalGasInsights = getInsightsByCategory('natural-gas', '2026-08-05T12:00:00.000Z');
    expect(naturalGasInsights.length).toBeGreaterThanOrEqual(3);
  });

  it('5. adheres to strict author and privacy boundaries', () => {
    const record = august2026NaturalGasVsElectricHeatingCostPerMmtuBenchmark;
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
    const record = august2026NaturalGasVsElectricHeatingCostPerMmtuBenchmark;
    expect(record.sources.length).toBeGreaterThanOrEqual(2);
    for (const src of record.sources) {
      expect(src.url.startsWith('https://')).toBe(true);
      expect(src.url).not.toContain('utm_source');
    }
  });

  it('7. contains valid internal links to permanent resources', () => {
    const record = august2026NaturalGasVsElectricHeatingCostPerMmtuBenchmark;
    expect(record.relatedRoutes).toContain('/tools/space-heater-cost-calculator');
    expect(record.relatedRoutes).toContain('/tools/electricity-bill-analyzer');
    expect(record.relatedRoutes).toContain('/electricity-rates');
    expect(record.relatedRoutes).toContain('/guides');
  });

  it('8. provides original analytical calculations for delivered thermal heating cost per MMBtu', () => {
    const record = august2026NaturalGasVsElectricHeatingCostPerMmtuBenchmark;
    expect(record.summary).toContain('$54.04');
    expect(record.summary).toContain('179.6%');
    expect(record.summary).toContain('$19.33/MMBtu');
    expect(record.summary).toContain('$18.01 per MMBtu');
    expect(record.practicalExample).toContain('$2,702.00 annually');
    expect(record.practicalExample).toContain('$966.50');
    expect(record.practicalExample).toContain('$900.50');
  });
});
