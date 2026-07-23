import { describe, expect, it } from 'vitest';
import {
  calculateSpaceHeaterCost,
  SpaceHeaterCalculationError,
} from '../calculate-space-heater-cost';

describe('calculateSpaceHeaterCost', () => {
  it('calculates space heater cost correctly for worked example (1,500W, 4 hrs, 30 days, 80% duty, 16 c/kWh)', () => {
    // 1500W, qty 1, 4 hrs/day, 30 days, 16 c/kWh, 80% duty
    const result = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      quantity: 1,
      hoursPerDay: 4,
      days: 30,
      rateCentsPerKwh: 16,
      dutyCyclePercent: 80,
    });

    // Total Rated = 1500 W
    // Effective Watts = 1500 * 0.8 = 1200 W
    // Hourly kWh = 1200 / 1000 = 1.2 kWh/hr
    // Daily kWh = 1.2 * 4 = 4.8 kWh/day
    // Period kWh = 4.8 * 30 = 144 kWh
    // Period Cost = 144 * $0.16 = $23.04
    expect(result.totalRatedWatts).toBe(1500);
    expect(result.effectiveWatts).toBe(1200);
    expect(result.hourlyKwh).toBe(1.2);
    expect(result.dailyKwh).toBe(4.8);
    expect(result.periodKwh).toBe(144);
    expect(result.periodCostUsd).toBe(23.04);
    expect(result.monthlyCostUsd).toBe(23.04);
    expect(result.annualCostUsd).toBe(280.32);
  });

  it('calculates cost correctly for multiple heaters (Two 1,500W heaters)', () => {
    const result = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      quantity: 2,
      hoursPerDay: 4,
      days: 30,
      rateCentsPerKwh: 16,
      dutyCyclePercent: 80,
    });

    // Total Rated = 3000 W
    // Effective Watts = 3000 * 0.8 = 2400 W
    // Period kWh = 2400 * 4 * 30 / 1000 = 288 kWh
    // Period Cost = 288 * $0.16 = $46.08
    expect(result.totalRatedWatts).toBe(3000);
    expect(result.effectiveWatts).toBe(2400);
    expect(result.periodKwh).toBe(288);
    expect(result.periodCostUsd).toBe(46.08);
  });

  it('generates valid scenarios for runtime, power setting, quantity, and duty cycle', () => {
    const result = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      quantity: 2,
      hoursPerDay: 4,
      days: 30,
      rateCentsPerKwh: 16,
      dutyCyclePercent: 80,
    });

    expect(result.scenarios.length).toBe(5);

    // Base Scenario
    expect(result.scenarios[0]?.periodCostUsd).toBe(46.08);
    expect(result.scenarios[0]?.differenceUsd).toBe(0);

    // Reduce runtime by 1 hr/day (3 hrs/day instead of 4)
    // 2400W * 3 * 30 / 1000 = 216 kWh -> $34.56 -> Diff = -$11.52
    expect(result.scenarios[1]?.periodCostUsd).toBe(34.56);
    expect(result.scenarios[1]?.differenceUsd).toBe(-11.52);

    // Switch to 750W low setting
    // (750 * 2 * 0.8) = 1200W * 4 * 30 / 1000 = 144 kWh -> $23.04 -> Diff = -$23.04
    expect(result.scenarios[2]?.periodCostUsd).toBe(23.04);
    expect(result.scenarios[2]?.differenceUsd).toBe(-23.04);

    // Reduce quantity to 1
    // (1500 * 1 * 0.8) = 1200W * 4 * 30 / 1000 = 144 kWh -> $23.04 -> Diff = -$23.04
    expect(result.scenarios[3]?.periodCostUsd).toBe(23.04);
    expect(result.scenarios[3]?.differenceUsd).toBe(-23.04);
  });

  it('throws SpaceHeaterCalculationError for invalid boundary inputs', () => {
    expect(() =>
      calculateSpaceHeaterCost({
        heaterWatts: -100,
        quantity: 1,
        hoursPerDay: 4,
        days: 30,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(SpaceHeaterCalculationError);

    expect(() =>
      calculateSpaceHeaterCost({
        heaterWatts: 1500,
        quantity: 0,
        hoursPerDay: 4,
        days: 30,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(SpaceHeaterCalculationError);

    expect(() =>
      calculateSpaceHeaterCost({
        heaterWatts: 1500,
        quantity: 1,
        hoursPerDay: 25,
        days: 30,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(SpaceHeaterCalculationError);

    expect(() =>
      calculateSpaceHeaterCost({
        heaterWatts: 1500,
        quantity: 1,
        hoursPerDay: 4,
        days: 30,
        rateCentsPerKwh: 16,
        dutyCyclePercent: 110,
      }),
    ).toThrow(SpaceHeaterCalculationError);
  });
});
