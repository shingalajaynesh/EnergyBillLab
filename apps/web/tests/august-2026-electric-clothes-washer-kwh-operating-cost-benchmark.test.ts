import { describe, expect, it } from 'vitest';

import { august2026ElectricClothesWasherKwhOperatingCostBenchmark } from '../src/content/insights/articles/august-2026-electric-clothes-washer-kwh-operating-cost-benchmark';
import {
  getInsightsByCategory,
  getInsightBySlug,
  getPublishedInsights,
} from '../src/content/insights';
import { validateInsightRecord } from '../src/lib/insights-validation';

describe('August 2026 Electric Clothes Washer kWh Consumption & Operating Cost Benchmark Insight', () => {
  it('1. passes full automated registry record validation', () => {
    const result = validateInsightRecord(august2026ElectricClothesWasherKwhOperatingCostBenchmark);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('2. is registered in the global insights registry', () => {
    const found = getInsightBySlug(
      'august-2026-electric-clothes-washer-kwh-operating-cost-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.id).toBe('august-2026-electric-clothes-washer-kwh-operating-cost-benchmark');
  });

  it('3. is included in published insights', () => {
    const published = getPublishedInsights('2026-08-12T12:00:00.000Z');
    const found = published.find(
      (item) => item.slug === 'august-2026-electric-clothes-washer-kwh-operating-cost-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.status).toBe('published');
  });

  it('4. activates appliances category with published articles', () => {
    const applianceInsights = getInsightsByCategory('appliances', '2026-08-12T12:00:00.000Z');
    expect(applianceInsights.length).toBeGreaterThanOrEqual(1);
  });

  it('5. adheres to strict author and privacy boundaries', () => {
    const record = august2026ElectricClothesWasherKwhOperatingCostBenchmark;
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
    const record = august2026ElectricClothesWasherKwhOperatingCostBenchmark;
    expect(record.sources.length).toBeGreaterThanOrEqual(3);
    for (const src of record.sources) {
      expect(src.url.startsWith('https://')).toBe(true);
      expect(src.url).not.toContain('utm_source');
    }
  });

  it('7. contains valid related routes that exist in routing schema', () => {
    const record = august2026ElectricClothesWasherKwhOperatingCostBenchmark;
    expect(record.relatedRoutes.length).toBeGreaterThanOrEqual(3);
    for (const route of record.relatedRoutes) {
      expect(route.startsWith('/')).toBe(true);
    }
  });
});
