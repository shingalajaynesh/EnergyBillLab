import { describe, expect, it } from 'vitest';

import { calculateStateComparison } from '../calculate-state-comparison';

describe('calculateStateComparison', () => {
  it('correctly calculates electricity and gas differences between California and Texas', () => {
    const result = calculateStateComparison({
      stateA: {
        name: 'California',
        code: 'CA',
        slug: 'california',
        electricityRateCentsPerKwh: 32.5,
        gasPriceDollarsPerTherm: 1.85,
        gasPriceDollarsPerMcf: 19.18,
      },
      stateB: {
        name: 'Texas',
        code: 'TX',
        slug: 'texas',
        electricityRateCentsPerKwh: 14.8,
        gasPriceDollarsPerTherm: 1.25,
        gasPriceDollarsPerMcf: 12.96,
      },
      monthlyKwhBaseline: 900,
      monthlyThermsBaseline: 60,
    });

    expect(result.electricity.rateStateA).toBe(32.5);
    expect(result.electricity.rateStateB).toBe(14.8);
    expect(result.electricity.monthlyBillStateA).toBeCloseTo(292.5, 2);
    expect(result.electricity.monthlyBillStateB).toBeCloseTo(133.2, 2);
    expect(result.electricity.cheaperState).toBe('stateB');
    expect(result.electricity.cheaperStateName).toBe('Texas');
    expect(result.electricity.annualBillDifference).toBeCloseTo((292.5 - 133.2) * 12, 1);

    expect(result.naturalGas.available).toBe(true);
    expect(result.naturalGas.cheaperState).toBe('stateB');
    expect(result.naturalGas.monthlyGasBillStateA).toBeCloseTo(111.0, 1);
    expect(result.naturalGas.monthlyGasBillStateB).toBeCloseTo(75.0, 1);

    expect(result.totalHouseholdCombined.cheaperState).toBe('stateB');
    expect(result.appliances.length).toBe(5);

    // Verify EV charging comparison (1,000 miles)
    const evItem = result.appliances.find((a) => a.id === 'ev_home_charging');
    expect(evItem).toBeDefined();
    expect(evItem?.stateACost).toBeCloseTo((333 * 32.5) / 100, 1); // CA: ~$108.2
    expect(evItem?.stateBCost).toBeCloseTo((333 * 14.8) / 100, 1); // TX: ~$49.3
    expect(evItem?.cheaperState).toBe('stateB');
  });

  it('handles states without natural gas data gracefully', () => {
    const result = calculateStateComparison({
      stateA: {
        name: 'Hawaii',
        code: 'HI',
        slug: 'hawaii',
        electricityRateCentsPerKwh: 43.2,
      },
      stateB: {
        name: 'Washington',
        code: 'WA',
        slug: 'washington',
        electricityRateCentsPerKwh: 11.5,
      },
    });

    expect(result.naturalGas.available).toBe(false);
    expect(result.electricity.cheaperState).toBe('stateB');
    expect(result.summaryVerdict).toContain(
      'Hawaii electricity rates are 275.7% higher than in Washington',
    );
  });
});
