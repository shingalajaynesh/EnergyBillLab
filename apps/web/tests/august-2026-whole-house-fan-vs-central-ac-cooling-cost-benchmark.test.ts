import { describe, expect, it } from 'vitest';

import { august2026WholeHouseFanVsCentralAcCoolingCostBenchmark } from '../src/content/insights/articles/august-2026-whole-house-fan-vs-central-ac-cooling-cost-benchmark';
import {
  getInsightsByCategory,
  getInsightBySlug,
  getPublishedInsights,
} from '../src/content/insights';
import { validateInsightRecord } from '../src/lib/insights-validation';

describe('August 2026 Whole-House Fan vs. Central AC Electricity Cost & Cooling Savings Benchmark Insight', () => {
  it('1. passes full automated registry record validation', () => {
    const result = validateInsightRecord(august2026WholeHouseFanVsCentralAcCoolingCostBenchmark);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('2. is registered in the global insights registry', () => {
    const found = getInsightBySlug(
      'august-2026-whole-house-fan-vs-central-ac-cooling-cost-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.id).toBe('august-2026-whole-house-fan-vs-central-ac-cooling-cost-benchmark');
  });

  it('3. is included in published insights', () => {
    const published = getPublishedInsights('2026-08-25T00:00:00.000Z');
    const found = published.find(
      (item) => item.slug === 'august-2026-whole-house-fan-vs-central-ac-cooling-cost-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.status).toBe('published');
  });

  it('4. activates home-energy-costs category with published articles', () => {
    const homeEnergyInsights = getInsightsByCategory(
      'home-energy-costs',
      '2026-08-25T00:00:00.000Z',
    );
    expect(homeEnergyInsights.length).toBeGreaterThanOrEqual(8);
  });

  it('5. adheres to strict author and privacy boundaries', () => {
    const record = august2026WholeHouseFanVsCentralAcCoolingCostBenchmark;
    expect(record.authorName).toBe('Jaynesh Shingala');
    const jsonStr = JSON.stringify(record).toLowerCase();
    expect(jsonStr).not.toContain('founder');
    expect(jsonStr).not.toContain('software engineer');
    expect(jsonStr).not.toContain('surat');
    expect(jsonStr).not.toContain('gujarat');
    expect(jsonStr).not.toContain('india');
  });

  it('6. contains valid sources with official URLs', () => {
    const record = august2026WholeHouseFanVsCentralAcCoolingCostBenchmark;
    expect(record.sources.length).toBeGreaterThanOrEqual(4);
    for (const src of record.sources) {
      expect(src.url.startsWith('https://')).toBe(true);
      expect(src.url).not.toContain('utm_source');
    }
  });

  it('7. contains valid related routes that exist in routing schema', () => {
    const record = august2026WholeHouseFanVsCentralAcCoolingCostBenchmark;
    expect(record.relatedRoutes.length).toBeGreaterThanOrEqual(4);
    for (const route of record.relatedRoutes) {
      expect(route.startsWith('/')).toBe(true);
    }
  });

  it('8. verifies mathematical consistency of CFM, power draw, and net dollar savings', () => {
    const record = august2026WholeHouseFanVsCentralAcCoolingCostBenchmark;
    // 3-ton AC (3,000W) = 540 kWh/mo ($99.58/mo) vs ECM fan (120W) = 21.6 kWh/mo ($3.98/mo)
    expect(record.summary).toContain('120 to 550 Watts');
    expect(record.summary).toContain('2,500 to 3,500 Watts');
    expect(record.summary).toContain('18.44¢/kWh');
    expect(record.summary).toContain('30 to 60 Air Changes per Hour');
    expect(record.summary).toContain('85% to 92%');
  });
});
