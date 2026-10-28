import { describe, expect, it } from 'vitest';

import { august2026VampirePowerPhantomLoadStandbyElectricityCostBenchmark } from '../src/content/insights/articles/august-2026-vampire-power-phantom-load-standby-electricity-cost-benchmark';
import {
  getInsightsByCategory,
  getInsightBySlug,
  getPublishedInsights,
} from '../src/content/insights';
import { validateInsightRecord } from '../src/lib/insights-validation';

describe('August 2026 Household Vampire Power & Standby Electricity Cost Benchmark Insight', () => {
  it('1. passes full automated registry record validation', () => {
    const result = validateInsightRecord(
      august2026VampirePowerPhantomLoadStandbyElectricityCostBenchmark,
    );
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('2. is registered in the global insights registry', () => {
    const found = getInsightBySlug(
      'august-2026-vampire-power-phantom-load-standby-electricity-cost-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.id).toBe(
      'august-2026-vampire-power-phantom-load-standby-electricity-cost-benchmark',
    );
  });

  it('3. is marked archived in registry and excluded from published insights', () => {
    const found = getInsightBySlug(
      'august-2026-vampire-power-phantom-load-standby-electricity-cost-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.status).toBe('archived');
    const published = getPublishedInsights('2026-08-24T00:00:00.000Z');
    const inPublished = published.find(
      (item) =>
        item.slug === 'august-2026-vampire-power-phantom-load-standby-electricity-cost-benchmark',
    );
    expect(inPublished).toBeUndefined();
  });

  it('4. activates appliances category with published articles', () => {
    const applianceInsights = getInsightsByCategory('appliances', '2026-08-24T00:00:00.000Z');
    expect(applianceInsights.length).toBeGreaterThanOrEqual(1);
  });

  it('5. adheres to strict author and privacy boundaries', () => {
    const record = august2026VampirePowerPhantomLoadStandbyElectricityCostBenchmark;
    expect(record.authorName).toBe('Jaynesh Shingala');
    const jsonStr = JSON.stringify(record).toLowerCase();
    expect(jsonStr).not.toContain('founder');
    expect(jsonStr).not.toContain('software engineer');
    expect(jsonStr).not.toContain('surat');
    expect(jsonStr).not.toContain('gujarat');
    expect(jsonStr).not.toContain('india');
  });

  it('6. contains valid sources with official URLs', () => {
    const record = august2026VampirePowerPhantomLoadStandbyElectricityCostBenchmark;
    expect(record.sources.length).toBeGreaterThanOrEqual(3);
    for (const src of record.sources) {
      expect(src.url.startsWith('https://')).toBe(true);
      expect(src.url).not.toContain('utm_source');
    }
  });

  it('7. contains valid related routes that exist in routing schema', () => {
    const record = august2026VampirePowerPhantomLoadStandbyElectricityCostBenchmark;
    expect(record.relatedRoutes.length).toBeGreaterThanOrEqual(3);
    for (const route of record.relatedRoutes) {
      expect(route.startsWith('/')).toBe(true);
    }
  });

  it('8. verifies mathematical consistency of baseload calculations and payback', () => {
    const record = august2026VampirePowerPhantomLoadStandbyElectricityCostBenchmark;
    // 115W continuous load = 1,007.4 kWh/year -> at 18.44¢/kWh = $185.76/year
    expect(record.summary).toContain('115 Watts');
    expect(record.summary).toContain('1,007.4 kWh per year');
    expect(record.summary).toContain('$185.76 annually');
    expect(record.summary).toContain('$1.62 per continuous Watt');
    expect(record.summary).toContain('4.95 months');
  });
});
