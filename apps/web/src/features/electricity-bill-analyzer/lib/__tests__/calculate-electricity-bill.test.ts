import { describe, expect, it } from 'vitest';

import { calculateElectricityBill } from '../calculate-electricity-bill';

describe('calculateElectricityBill', () => {
  it('calculates current-only metrics correctly', () => {
    const result = calculateElectricityBill({
      currentBill: 180.0,
      currentKwh: 1200,
      currentDays: 30,
    });

    expect(result.current.allInEffectiveCostPerKwh).toBeCloseTo(0.15, 3);
    expect(result.current.dailyUsageKwh).toBe(40);
    expect(result.current.estimated30DayUsageKwh).toBe(1200);
    expect(result.current.estimated30DayCost).toBe(180.0);
    expect(result.comparison).toBeUndefined();
  });

  it('calculates equal-duration comparison with exact cents reconciliation', () => {
    const result = calculateElectricityBill({
      previousBill: 120.0,
      previousKwh: 1000,
      previousDays: 30,
      currentBill: 180.0,
      currentKwh: 1200,
      currentDays: 30,
    });

    expect(result.comparison).toBeDefined();
    const comp = result.comparison!;

    expect(comp.previousAllInEffectiveCostPerKwh).toBeCloseTo(0.12, 3);
    expect(result.current.allInEffectiveCostPerKwh).toBeCloseTo(0.15, 3);
    expect(comp.billChangeDollar).toBe(60.0);
    expect(comp.normalizedKwhDifference).toBe(200);
    expect(comp.estimatedUsageEffectDollar).toBe(24.0); // 200 kWh * $0.12/kWh = $24.00
    expect(comp.estimatedRateFeeOtherEffectDollar).toBe(36.0); // $60.00 - $24.00 = $36.00
    expect(comp.reconciliationReconciles).toBe(true);
    expect(comp.estimatedUsageEffectDollar + comp.estimatedRateFeeOtherEffectDollar).toBe(
      comp.billChangeDollar,
    );
  });

  it('handles different billing period lengths correctly with day normalization', () => {
    const result = calculateElectricityBill({
      previousBill: 120.0,
      previousKwh: 900,
      previousDays: 30, // 30 kWh/day
      currentBill: 150.0,
      currentKwh: 1050,
      currentDays: 35, // 30 kWh/day
    });

    expect(result.comparison).toBeDefined();
    const comp = result.comparison!;

    expect(comp.previousDailyUsageKwh).toBe(30);
    expect(comp.adjustedExpectedCurrentKwh).toBe(1050); // 30 * 35 = 1050
    expect(comp.normalizedKwhDifference).toBe(0); // 1050 - 1050 = 0
    expect(comp.estimatedUsageEffectDollar).toBe(0.0);
    expect(comp.estimatedRateFeeOtherEffectDollar).toBe(30.0); // $150 - $120 = $30
    expect(comp.reconciliationReconciles).toBe(true);
    expect(comp.classification).toBe('RATE_FEE_PRIMARY');
  });

  it('handles opposing factors (usage decreases while bill increases)', () => {
    const result = calculateElectricityBill({
      previousBill: 100.0,
      previousKwh: 1000,
      previousDays: 30, // $0.10/kWh
      currentBill: 130.0,
      currentKwh: 900,
      currentDays: 30, // $0.144/kWh
    });

    expect(result.comparison).toBeDefined();
    const comp = result.comparison!;

    expect(comp.billChangeDollar).toBe(30.0);
    expect(comp.normalizedKwhDifference).toBe(-100);
    expect(comp.estimatedUsageEffectDollar).toBe(-10.0); // -100 kWh * $0.10/kWh = -$10.00
    expect(comp.estimatedRateFeeOtherEffectDollar).toBe(40.0); // $30 - (-$10) = $40.00
    expect(comp.reconciliationReconciles).toBe(true);
    expect(comp.classification).toBe('RATE_FEE_PRIMARY');
  });

  it('calculates detailed mode variable rate when line items are provided', () => {
    const result = calculateElectricityBill({
      currentBill: 180.0,
      currentKwh: 1200,
      currentDays: 30,
      currentFixedCharge: 15.0,
      currentTaxesAndFees: 15.0,
      currentCredits: 10.0,
    });

    // Known non-energy = 15 + 15 - 10 = $20.00
    // Variable subtotal = $180 - $20 = $160.00
    // Variable cost/kWh = $160 / 1200 = $0.1333/kWh
    expect(result.current.variableSubtotal).toBe(160.0);
    expect(result.current.estimatedVariableCostPerKwh).toBeCloseTo(0.1333, 4);
  });
});
