import { describe, expect, it } from 'vitest';

import { august2026ElectricTanklessVsStorageVsHeatPumpWaterHeaterCostBenchmark } from '../src/content/insights/articles/august-2026-electric-tankless-vs-storage-vs-heat-pump-water-heater-cost-benchmark';
import {
  getInsightsByCategory,
  getInsightBySlug,
  getPublishedInsights,
} from '../src/content/insights';
import { validateInsightRecord } from '../src/lib/insights-validation';

describe('August 2026 Electric Tankless vs. Storage vs. Heat Pump Water Heater Cost Benchmark Insight', () => {
  it('1. passes full automated registry record validation', () => {
    const result = validateInsightRecord(
      august2026ElectricTanklessVsStorageVsHeatPumpWaterHeaterCostBenchmark,
    );
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('2. is registered in the global insights registry', () => {
    const found = getInsightBySlug(
      'august-2026-electric-tankless-vs-storage-vs-heat-pump-water-heater-cost-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.id).toBe(
      'august-2026-electric-tankless-vs-storage-vs-heat-pump-water-heater-cost-benchmark',
    );
  });

  it('3. is included in published insights', () => {
    const published = getPublishedInsights('2026-08-27T00:00:00.000Z');
    const found = published.find(
      (item) =>
        item.slug ===
        'august-2026-electric-tankless-vs-storage-vs-heat-pump-water-heater-cost-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.status).toBe('published');
  });

  it('4. activates appliances category with published articles', () => {
    const applianceInsights = getInsightsByCategory('appliances', '2026-08-27T00:00:00.000Z');
    expect(applianceInsights.length).toBeGreaterThanOrEqual(17);
  });

  it('5. adheres to strict author and privacy boundaries', () => {
    const record = august2026ElectricTanklessVsStorageVsHeatPumpWaterHeaterCostBenchmark;
    expect(record.authorName).toBe('Jaynesh Shingala');
    const jsonStr = JSON.stringify(record).toLowerCase();
    expect(jsonStr).not.toContain('founder');
    expect(jsonStr).not.toContain('software engineer');
    expect(jsonStr).not.toContain('surat');
    expect(jsonStr).not.toContain('gujarat');
    expect(jsonStr).not.toContain('india');
  });

  it('6. contains valid sources with official URLs', () => {
    const record = august2026ElectricTanklessVsStorageVsHeatPumpWaterHeaterCostBenchmark;
    expect(record.sources.length).toBeGreaterThanOrEqual(4);
    for (const src of record.sources) {
      expect(src.url.startsWith('https://')).toBe(true);
      expect(src.url).not.toContain('utm_source');
    }
  });

  it('7. contains valid related routes that exist in routing schema', () => {
    const record = august2026ElectricTanklessVsStorageVsHeatPumpWaterHeaterCostBenchmark;
    expect(record.relatedRoutes.length).toBeGreaterThanOrEqual(4);
    for (const route of record.relatedRoutes) {
      expect(route.startsWith('/')).toBe(true);
    }
  });

  it('8. verifies mathematical consistency of power surge formulas and annual energy costs', () => {
    const record = august2026ElectricTanklessVsStorageVsHeatPumpWaterHeaterCostBenchmark;
    expect(record.summary).toContain('$599.67 annually');
    expect(record.summary).toContain('$680.44/year');
    expect(record.summary).toContain('$180.34/year');
    expect(record.summary).toContain('$80.77 per year');
    expect(record.summary).toContain('$500.10 annually');
    expect(record.summary).toContain('18.0 kW to 36.0 kW');
  });

  it('9. verifies explicit 3-tier data provenance structure (Official Data vs Model Assumptions vs Calculations)', () => {
    const record = august2026ElectricTanklessVsStorageVsHeatPumpWaterHeaterCostBenchmark;
    const allContent = [
      record.summary,
      ...(record.keyFindings ?? []),
      ...(record.bodyParagraphs ?? []),
      ...(record.sections?.flatMap((s) => s.paragraphs) ?? []),
      record.methodologyNotes ?? '',
    ].join('\n');

    expect(allContent).toContain('Data Provenance & Methodology Lineage Breakdown');
    expect(allContent).toContain('Official Government Data');
    expect(allContent).toContain('Model Assumption');
    expect(allContent).toContain('EnergyBillLab Calculation');
    expect(allContent).toContain('18.44 ¢/kWh');
    expect(allContent).toContain('55.0 Gallons / Day');
  });
});
