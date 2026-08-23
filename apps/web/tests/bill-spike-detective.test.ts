import { describe, expect, it } from 'vitest';
import { getRouteByHref } from '@/lib/routes';
import { diagnosticFormSchema } from '@/features/bill-spike-detective/schemas/diagnostic-schema';
import { diagnoseBillSpike } from '@energy-bill-lab/calculation-engine';

describe('Bill Spike Detective Feature & Routes', () => {
  it('registers /tools/bill-spike-detective in public routes and sitemap', () => {
    const route = getRouteByHref('/tools/bill-spike-detective');
    expect(route).toBeDefined();
    expect(route?.label).toBe('Bill Spike Detective');
    expect(route?.group).toBe('tools');
    expect(route?.sitemap).toBe(true);
  });

  it('validates valid diagnostic form schema', () => {
    const validData = {
      currentBillAmount: 280,
      previousBillAmount: 150,
      currentKwh: 1400,
      previousKwh: 800,
      billingDaysCurrent: 30,
      billingDaysPrevious: 30,
      season: 'summer' as const,
      rateStructure: 'unknown' as const,
      equipment: ['central_ac', 'electric_water_heater'],
      events: ['heat_wave'],
    };

    const parsed = diagnosticFormSchema.safeParse(validData);
    expect(parsed.success).toBe(true);
  });

  it('rejects invalid negative bill amounts in schema', () => {
    const invalidData = {
      currentBillAmount: -50,
      previousBillAmount: 150,
      currentKwh: 1000,
      previousKwh: 800,
    };

    const parsed = diagnosticFormSchema.safeParse(invalidData);
    expect(parsed.success).toBe(false);
  });

  it('executes full diagnostic triage and produces ranked culprits and action items', () => {
    const result = diagnoseBillSpike({
      currentBillAmount: 310,
      previousBillAmount: 160,
      currentKwh: 1550,
      previousKwh: 850,
      billingDaysCurrent: 32,
      billingDaysPrevious: 29,
      season: 'summer',
      equipment: ['central_ac', 'pool_pump'],
      events: ['heat_wave', 'longer_billing_cycle'],
    });

    expect(result.primaryDriver).toBeDefined();
    expect(result.culprits.length).toBeGreaterThanOrEqual(2);
    expect(result.actionPlan.length).toBeGreaterThanOrEqual(2);
    expect(result.metrics.dollarChange).toBe(150);
    expect(result.metrics.kwhChange).toBe(700);
    expect(result.metrics.billingDaysDelta).toBe(3);
    expect(result.summaryVerdict).toContain('Your electric bill increased by $150.00');
  });
});
