import { describe, expect, it } from 'vitest';
import { getRouteByHref } from '@/lib/routes';
import { calculateStateComparison } from '@energy-bill-lab/calculation-engine';

describe('State-to-State Rate Comparator Feature & Routes', () => {
  it('registers /compare-states in public routes and sitemap', () => {
    const route = getRouteByHref('/compare-states');
    expect(route).toBeDefined();
    expect(route?.label).toBe('Compare States');
    expect(route?.group).toBe('research');
    expect(route?.sitemap).toBe(true);
  });

  it('calculates full side-by-side comparison across states and appliances', () => {
    const comparison = calculateStateComparison({
      stateA: {
        name: 'New York',
        code: 'NY',
        slug: 'new-york',
        electricityRateCentsPerKwh: 23.4,
        gasPriceDollarsPerTherm: 1.65,
      },
      stateB: {
        name: 'North Carolina',
        code: 'NC',
        slug: 'north-carolina',
        electricityRateCentsPerKwh: 14.2,
        gasPriceDollarsPerTherm: 1.35,
      },
      monthlyKwhBaseline: 1000,
      monthlyThermsBaseline: 50,
    });

    expect(comparison.electricity.rateStateA).toBe(23.4);
    expect(comparison.electricity.rateStateB).toBe(14.2);
    expect(comparison.electricity.monthlyBillStateA).toBe(234);
    expect(comparison.electricity.monthlyBillStateB).toBe(142);
    expect(comparison.electricity.cheaperState).toBe('stateB');
    expect(comparison.electricity.cheaperStateName).toBe('North Carolina');
    expect(comparison.electricity.annualBillDifference).toBeCloseTo((234 - 142) * 12, 1);

    expect(comparison.appliances.length).toBe(5);
    const acItem = comparison.appliances.find((a) => a.id === 'central_ac');
    expect(acItem).toBeDefined();
    expect(acItem?.stateACost).toBeCloseTo((600 * 23.4) / 100, 1);
    expect(acItem?.stateBCost).toBeCloseTo((600 * 14.2) / 100, 1);
    expect(acItem?.cheaperState).toBe('stateB');
  });
});
