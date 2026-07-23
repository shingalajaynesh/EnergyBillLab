import { describe, expect, it } from 'vitest';
import { AcCalculationError, calculateAcCost } from '../calculate-ac-cost';

describe('calculateAcCost', () => {
  it('calculates AC cost correctly in direct wattage mode (Worked Example)', () => {
    // 1000W AC, 8 hrs/day, 30 days, 16 c/kWh, 60% duty cycle
    const result = calculateAcCost({
      mode: 'wattage',
      wattage: 1000,
      hoursPerDay: 8,
      days: 30,
      rateCentsPerKwh: 16,
      dutyCyclePercent: 60,
    });

    // Effective Watts = 1000 * 0.6 = 600 W
    // Hourly kWh = 600 / 1000 = 0.6 kWh/hr
    // Daily kWh = 0.6 * 8 = 4.8 kWh/day
    // Period kWh = 4.8 * 30 = 144 kWh
    // Period Cost = 144 * $0.16 = $23.04
    expect(result.inputWatts).toBe(1000);
    expect(result.effectiveWatts).toBe(600);
    expect(result.hourlyKwh).toBe(0.6);
    expect(result.dailyKwh).toBe(4.8);
    expect(result.periodKwh).toBe(144);
    expect(result.periodCostUsd).toBe(23.04);
    expect(result.monthlyCostUsd).toBe(23.04);
    expect(result.annualCostUsd).toBe(280.32);
  });

  it('calculates AC cost correctly in BTU/EER capacity mode (Worked Example)', () => {
    // 12,000 BTU unit, EER 12.0 -> Input Watts = 12000 / 12 = 1000 W
    const result = calculateAcCost({
      mode: 'capacity_eer',
      coolingCapacityBtu: 12000,
      eer: 12.0,
      hoursPerDay: 8,
      days: 30,
      rateCentsPerKwh: 16,
      dutyCyclePercent: 60,
    });

    expect(result.inputWatts).toBe(1000);
    expect(result.derivedBtu).toBe(12000);
    expect(result.derivedTons).toBe(1); // 12000 / 12000 = 1 Ton
    expect(result.periodKwh).toBe(144);
    expect(result.periodCostUsd).toBe(23.04);
  });

  it('generated accurate cost reduction scenarios', () => {
    const result = calculateAcCost({
      mode: 'wattage',
      wattage: 1000,
      hoursPerDay: 8,
      days: 30,
      rateCentsPerKwh: 16,
      dutyCyclePercent: 60,
    });

    expect(result.scenarios.length).toBe(3);

    // Base Scenario
    expect(result.scenarios[0]?.periodCostUsd).toBe(23.04);
    expect(result.scenarios[0]?.differenceUsd).toBe(0);

    // Reduce runtime by 1 hr/day (7 hrs/day instead of 8)
    // 600W * 7 * 30 / 1000 = 126 kWh -> $20.16 -> Diff = -$2.88
    expect(result.scenarios[1]?.periodCostUsd).toBe(20.16);
    expect(result.scenarios[1]?.differenceUsd).toBe(-2.88);

    // Lower duty cycle by 10% (50% instead of 60%)
    // 500W * 8 * 30 / 1000 = 120 kWh -> $19.20 -> Diff = -$3.84
    expect(result.scenarios[2]?.periodCostUsd).toBe(19.2);
    expect(result.scenarios[2]?.differenceUsd).toBe(-3.84);
  });

  it('throws AcCalculationError for invalid inputs', () => {
    expect(() =>
      calculateAcCost({
        mode: 'wattage',
        wattage: -500,
        hoursPerDay: 8,
        days: 30,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(AcCalculationError);

    expect(() =>
      calculateAcCost({
        mode: 'capacity_eer',
        coolingCapacityBtu: 0,
        eer: 10,
        hoursPerDay: 8,
        days: 30,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(AcCalculationError);

    expect(() =>
      calculateAcCost({
        mode: 'capacity_eer',
        coolingCapacityBtu: 12000,
        eer: -5,
        hoursPerDay: 8,
        days: 30,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(AcCalculationError);

    expect(() =>
      calculateAcCost({
        mode: 'wattage',
        wattage: 1000,
        hoursPerDay: 25,
        days: 30,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(AcCalculationError);
  });
});
