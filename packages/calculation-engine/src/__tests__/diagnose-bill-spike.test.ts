import { describe, expect, it } from 'vitest';

import { diagnoseBillSpike } from '../diagnose-bill-spike';

describe('diagnoseBillSpike', () => {
  it('identifies AC cooling load as primary culprit during summer heat wave with AC equipment', () => {
    const result = diagnoseBillSpike({
      previousBillAmount: 140,
      currentBillAmount: 260,
      previousKwh: 800,
      currentKwh: 1450,
      billingDaysPrevious: 30,
      billingDaysCurrent: 30,
      season: 'summer',
      equipment: ['central_ac'],
      events: ['heat_wave'],
    });

    expect(result.culprits.length).toBeGreaterThan(0);
    const topCulprit = result.culprits[0]!;
    expect(topCulprit.id).toBe('cooling_runtime_surge');
    expect(topCulprit.probabilityScore).toBeGreaterThanOrEqual(80);
    expect(topCulprit.severity).toBe('high');
    expect(result.metrics.dollarChange).toBe(120);
    expect(result.metrics.kwhChange).toBe(650);
    expect(result.metrics.usageVsRateAttribution.usageSharePercent).toBeGreaterThan(70);
    expect(result.actionPlan.length).toBeGreaterThan(0);
    expect(result.relatedGuideSlugs).toContain('how-much-does-it-cost-to-run-an-air-conditioner');
  });

  it('identifies space heater / heat strip surge during winter cold snap', () => {
    const result = diagnoseBillSpike({
      previousBillAmount: 110,
      currentBillAmount: 235,
      previousKwh: 650,
      currentKwh: 1380,
      billingDaysPrevious: 30,
      billingDaysCurrent: 30,
      season: 'winter',
      equipment: ['space_heater', 'heat_pump'],
      events: ['cold_snap'],
    });

    expect(result.culprits.length).toBeGreaterThan(0);
    const topCulprit = result.culprits[0]!;
    expect(topCulprit.id).toBe('heating_resistance_surge');
    expect(topCulprit.probabilityScore).toBeGreaterThanOrEqual(80);
    expect(result.relatedGuideSlugs).toContain('how-much-does-it-cost-to-run-a-space-heater');
  });

  it('correctly calculates billing cycle day expansion impact', () => {
    const result = diagnoseBillSpike({
      previousBillAmount: 150,
      currentBillAmount: 185,
      previousKwh: 900,
      currentKwh: 1050,
      billingDaysPrevious: 28,
      billingDaysCurrent: 34, // 6 extra days
      season: 'shoulder',
      equipment: [],
      events: ['longer_billing_cycle'],
    });

    expect(result.metrics.billingDaysDelta).toBe(6);
    expect(result.metrics.billingDaysDollarImpact).toBeCloseTo(32.14, 1);
    const cycleCulprit = result.culprits.find((c) => c.id === 'longer_billing_cycle');
    expect(cycleCulprit).toBeDefined();
    expect(cycleCulprit?.severity).toBe('high');
  });

  it('detects rate tariff jump when usage is flat but bill increased significantly', () => {
    const result = diagnoseBillSpike({
      previousBillAmount: 150, // $150 for 1000 kWh = 15.0 c/kWh
      currentBillAmount: 200, // $200 for 1000 kWh = 20.0 c/kWh (+33.3%)
      previousKwh: 1000,
      currentKwh: 1000,
      billingDaysPrevious: 30,
      billingDaysCurrent: 30,
      season: 'shoulder',
      equipment: [],
      events: ['rate_increase'],
    });

    expect(result.metrics.effectiveRateChangePercent).toBeCloseTo(33.33, 1);
    expect(result.metrics.usageVsRateAttribution.rateSharePercent).toBe(100);
    const rateCulprit = result.culprits.find((c) => c.id === 'utility_rate_spike');
    expect(rateCulprit).toBeDefined();
    expect(rateCulprit?.severity).toBe('high');
  });

  it('handles estimated meter reading true-up flag with high probability', () => {
    const result = diagnoseBillSpike({
      previousBillAmount: 80,
      currentBillAmount: 290,
      previousKwh: 500,
      currentKwh: 1700,
      season: 'shoulder',
      equipment: [],
      events: ['estimated_meter_reading'],
    });

    const estCulprit = result.culprits.find((c) => c.id === 'estimated_meter_reconciliation');
    expect(estCulprit).toBeDefined();
    expect(estCulprit?.probabilityScore).toBe(85);
    expect(result.actionPlan.some((a) => a.id === 'utility_meter_audit')).toBe(true);
  });
});
