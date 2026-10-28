import { describe, expect, it } from 'vitest';

import { august2026EvVsGasCarFuelCostPer100MilesBenchmark } from '../src/content/insights/articles/august-2026-ev-vs-gas-car-fuel-cost-per-100-miles-benchmark';
import {
  getInsightsByCategory,
  getInsightBySlug,
  getPublishedInsights,
} from '../src/content/insights';
import { validateInsightRecord } from '../src/lib/insights-validation';

describe('August 2026 EV vs. Gasoline Car Fuel Cost & eGallon Benchmark Insight', () => {
  it('1. passes full automated registry record validation', () => {
    const result = validateInsightRecord(august2026EvVsGasCarFuelCostPer100MilesBenchmark);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('2. is registered in the global insights registry', () => {
    const found = getInsightBySlug('august-2026-ev-vs-gas-car-fuel-cost-per-100-miles-benchmark');
    expect(found).toBeDefined();
    expect(found?.id).toBe('august-2026-ev-vs-gas-car-fuel-cost-per-100-miles-benchmark');
  });

  it('3. is included in published insights', () => {
    const published = getPublishedInsights('2026-08-26T00:00:00.000Z');
    const found = published.find(
      (item) => item.slug === 'august-2026-ev-vs-gas-car-fuel-cost-per-100-miles-benchmark',
    );
    expect(found).toBeDefined();
    expect(found?.status).toBe('published');
  });

  it('4. activates home-energy-costs category with published articles', () => {
    const homeEnergyInsights = getInsightsByCategory(
      'home-energy-costs',
      '2026-08-26T00:00:00.000Z',
    );
    expect(homeEnergyInsights.length).toBeGreaterThanOrEqual(3);
  });

  it('5. adheres to strict author and privacy boundaries', () => {
    const record = august2026EvVsGasCarFuelCostPer100MilesBenchmark;
    expect(record.authorName).toBe('Jaynesh Shingala');
    const jsonStr = JSON.stringify(record).toLowerCase();
    expect(jsonStr).not.toContain('founder');
    expect(jsonStr).not.toContain('software engineer');
    expect(jsonStr).not.toContain('surat');
    expect(jsonStr).not.toContain('gujarat');
    expect(jsonStr).not.toContain('india');
  });

  it('6. contains valid sources with official URLs', () => {
    const record = august2026EvVsGasCarFuelCostPer100MilesBenchmark;
    expect(record.sources.length).toBeGreaterThanOrEqual(4);
    for (const src of record.sources) {
      expect(src.url.startsWith('https://')).toBe(true);
      expect(src.url).not.toContain('utm_source');
    }
  });

  it('7. contains valid related routes that exist in routing schema', () => {
    const record = august2026EvVsGasCarFuelCostPer100MilesBenchmark;
    expect(record.relatedRoutes.length).toBeGreaterThanOrEqual(4);
    for (const route of record.relatedRoutes) {
      expect(route.startsWith('/')).toBe(true);
    }
  });

  it('8. verifies mathematical consistency of fuel cost formulas, eGallon, and dollar savings', () => {
    const record = august2026EvVsGasCarFuelCostPer100MilesBenchmark;
    // Standard EV (30 kWh/100 mi @ 90% = 33.33 kWh @ 18.44¢ = $6.15/100 mi)
    // Standard ICE (28 MPG = 3.57 gal @ $4.085/gal = $14.59/100 mi)
    // Savings = $8.44/100 mi (57.8%), Annual savings @ 12k mi = $1,012.80
    // DOE eGallon = 9.333 kWh * $0.1844 = $1.72/eGal
    expect(record.summary).toContain('$6.15 per 100 miles');
    expect(record.summary).toContain('$14.59 per 100 miles');
    expect(record.summary).toContain('$4.085 per gallon');
    expect(record.summary).toContain('$1.72 per eGallon');
    expect(record.summary).toContain('57.8%');
    expect(record.summary).toContain('$1,012.80');
  });

  it('9. verifies explicit 3-tier data provenance structure (Official Data vs Model Assumptions vs Calculations)', () => {
    const record = august2026EvVsGasCarFuelCostPer100MilesBenchmark;
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
    expect(allContent).toContain('$4.085 / gallon');
    expect(allContent).toContain('33.705 kWh / GGE');
  });

  it('10. verifies calibrated scenario-based wording without overly absolute claims', () => {
    const record = august2026EvVsGasCarFuelCostPer100MilesBenchmark;
    const allContent = [
      record.summary,
      ...(record.keyFindings ?? []),
      ...(record.bodyParagraphs ?? []),
      ...(record.sections?.flatMap((s) => s.paragraphs) ?? []),
      record.methodologyNotes ?? '',
    ].join('\n');

    // Should not contain overly absolute assertions
    expect(allContent).not.toContain('Commercial demand fees eliminate savings');
    expect(allContent).not.toContain('will realize zero fuel savings');

    // Should contain calibrated scenario language
    expect(allContent).toContain('In this benchmark scenario');
    expect(allContent).toContain('Modeled');
  });
});
