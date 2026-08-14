import { describe, expect, it } from 'vitest';

import { august2026SwimmingPoolPumpKwhOperatingCostBenchmark } from '../src/content/insights/articles/august-2026-swimming-pool-pump-kwh-operating-cost-benchmark';
import {
  getInsightsByCategory,
  getInsightBySlug,
  getPublishedInsights,
} from '../src/content/insights';
import { validateInsightRecord } from '../src/lib/insights-validation';

describe('August 2026 Swimming Pool Pump kWh Consumption & Operating Cost Benchmark Insight', () => {
  it('1. passes full automated registry record validation', () => {
    const result = validateInsightRecord(august2026SwimmingPoolPumpKwhOperatingCostBenchmark);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('2. is registered in the global insights registry', () => {
    const found = getInsightBySlug('august-2026-swimming-pool-pump-kwh-operating-cost-benchmark');
    expect(found).toBeDefined();
    expect(found?.id).toBe('august-2026-swimming-pool-pump-kwh-operating-cost-benchmark');
  });

  it('3. is included in published insights', () => {
    const published = getPublishedInsights('2026-08-16T00:00:00.000Z');
    const found = published.find(
      (item) => item.slug === 'august-2026-swimming-pool-pump-kwh-operating-cost-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.status).toBe('published');
  });

  it('4. activates appliances category with published articles', () => {
    const applianceInsights = getInsightsByCategory('appliances', '2026-08-16T00:00:00.000Z');
    expect(applianceInsights.length).toBeGreaterThanOrEqual(3);
  });

  it('5. adheres to strict author and privacy boundaries', () => {
    const record = august2026SwimmingPoolPumpKwhOperatingCostBenchmark;
    expect(record.authorName).toBe('Jaynesh Shingala');
    const jsonStr = JSON.stringify(record);
    expect(jsonStr).not.toContain('founder');
    expect(jsonStr).not.toContain('software engineer');
    expect(jsonStr).not.toContain('surat');
    expect(jsonStr).not.toContain('gujarat');
    expect(jsonStr).not.toContain('india');
  });

  it('6. contains valid sources with official URLs', () => {
    const record = august2026SwimmingPoolPumpKwhOperatingCostBenchmark;
    expect(record.sources.length).toBeGreaterThanOrEqual(3);
    for (const src of record.sources) {
      expect(src.url.startsWith('https://')).toBe(true);
      expect(src.url).not.toContain('utm_source');
    }
  });

  it('7. contains valid related routes that exist in routing schema', () => {
    const record = august2026SwimmingPoolPumpKwhOperatingCostBenchmark;
    expect(record.relatedRoutes.length).toBeGreaterThanOrEqual(3);
    for (const route of record.relatedRoutes) {
      expect(route.startsWith('/')).toBe(true);
    }
  });
});
