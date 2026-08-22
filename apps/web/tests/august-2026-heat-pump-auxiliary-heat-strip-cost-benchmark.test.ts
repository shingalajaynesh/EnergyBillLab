import { describe, expect, it } from 'vitest';

import { august2026HeatPumpAuxiliaryHeatStripCostBenchmark } from '../src/content/insights/articles/august-2026-heat-pump-auxiliary-heat-strip-cost-benchmark';
import {
  getInsightsByCategory,
  getInsightBySlug,
  getPublishedInsights,
} from '../src/content/insights';
import { validateInsightRecord } from '../src/lib/insights-validation';

describe('August 2026 Heat Pump Auxiliary Electric Resistance Heat Strip Benchmark Insight', () => {
  it('1. passes full automated registry record validation', () => {
    const result = validateInsightRecord(august2026HeatPumpAuxiliaryHeatStripCostBenchmark);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('2. is registered in the global insights registry', () => {
    const found = getInsightBySlug('august-2026-heat-pump-auxiliary-heat-strip-cost-benchmark');
    expect(found).toBeDefined();
    expect(found?.id).toBe('august-2026-heat-pump-auxiliary-heat-strip-cost-benchmark');
  });

  it('3. is included in published insights', () => {
    const published = getPublishedInsights('2026-08-22T00:00:00.000Z');
    const found = published.find(
      (item) => item.slug === 'august-2026-heat-pump-auxiliary-heat-strip-cost-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.status).toBe('published');
  });

  it('4. activates home-energy-costs category with published articles', () => {
    const costInsights = getInsightsByCategory('home-energy-costs', '2026-08-22T00:00:00.000Z');
    expect(costInsights.length).toBeGreaterThanOrEqual(7);
  });

  it('5. adheres to strict author and privacy boundaries', () => {
    const record = august2026HeatPumpAuxiliaryHeatStripCostBenchmark;
    expect(record.authorName).toBe('Jaynesh Shingala');
    const jsonStr = JSON.stringify(record).toLowerCase();
    expect(jsonStr).not.toContain('founder');
    expect(jsonStr).not.toContain('software engineer');
    expect(jsonStr).not.toContain('surat');
    expect(jsonStr).not.toContain('gujarat');
    expect(jsonStr).not.toContain('india');
  });

  it('6. contains valid sources with official URLs', () => {
    const record = august2026HeatPumpAuxiliaryHeatStripCostBenchmark;
    expect(record.sources.length).toBeGreaterThanOrEqual(3);
    for (const src of record.sources) {
      expect(src.url.startsWith('https://')).toBe(true);
      expect(src.url).not.toContain('utm_source');
    }
  });

  it('7. contains valid related routes that exist in routing schema', () => {
    const record = august2026HeatPumpAuxiliaryHeatStripCostBenchmark;
    expect(record.relatedRoutes.length).toBeGreaterThanOrEqual(3);
    for (const route of record.relatedRoutes) {
      expect(route.startsWith('/')).toBe(true);
    }
  });
});
