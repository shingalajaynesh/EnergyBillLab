import { describe, expect, it } from 'vitest';
import { ApplianceCalculationError, calculateApplianceCost } from '../calculate-appliance-cost';

describe('calculateApplianceCost', () => {
  it('calculates energy consumption and cost correctly for standard 1500W appliance', () => {
    // Worked example from prompt: 1500W, 2 hrs/day, 30 days, 16 c/kWh, 50% duty cycle
    const result = calculateApplianceCost({
      wattage: 1500,
      hoursPerDay: 2,
      days: 30,
      rateCentsPerKwh: 16,
      dutyCyclePercent: 50,
    });

    // Effective watts = 1500 * 0.5 = 750 W
    // Daily kWh = 750 * 2 / 1000 = 1.5 kWh
    // Period kWh = 1.5 * 30 = 45 kWh
    // Period Cost = 45 * 0.16 = $7.20
    expect(result.effectiveWatts).toBe(750);
    expect(result.dailyKwh).toBe(1.5);
    expect(result.periodKwh).toBe(45);
    expect(result.periodCostUsd).toBe(7.2);
    expect(result.monthlyCostUsd).toBe(7.2);
    expect(result.annualKwh).toBe(547.5);
    expect(result.annualCostUsd).toBe(87.6);
  });

  it('calculates 100% duty cycle baseline correctly', () => {
    // 100W bulb, 10 hours/day, 30 days, 20 c/kWh, 100% duty cycle
    const result = calculateApplianceCost({
      wattage: 100,
      hoursPerDay: 10,
      days: 30,
      rateCentsPerKwh: 20,
      dutyCyclePercent: 100,
    });

    // Daily kWh = 100 * 10 / 1000 = 1 kWh
    // Period kWh = 30 kWh
    // Period cost = 30 * $0.20 = $6.00
    expect(result.dailyKwh).toBe(1);
    expect(result.periodKwh).toBe(30);
    expect(result.periodCostUsd).toBe(6);
  });

  it('handles 0% duty cycle or 0 hours per day gracefully', () => {
    const zeroDuty = calculateApplianceCost({
      wattage: 1000,
      hoursPerDay: 5,
      days: 30,
      rateCentsPerKwh: 16.5,
      dutyCyclePercent: 0,
    });
    expect(zeroDuty.dailyKwh).toBe(0);
    expect(zeroDuty.periodCostUsd).toBe(0);

    const zeroHours = calculateApplianceCost({
      wattage: 1000,
      hoursPerDay: 0,
      days: 30,
      rateCentsPerKwh: 16.5,
      dutyCyclePercent: 100,
    });
    expect(zeroHours.dailyKwh).toBe(0);
    expect(zeroHours.periodCostUsd).toBe(0);
  });

  it('throws ApplianceCalculationError for invalid inputs', () => {
    expect(() =>
      calculateApplianceCost({
        wattage: -100,
        hoursPerDay: 5,
        days: 30,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(ApplianceCalculationError);

    expect(() =>
      calculateApplianceCost({
        wattage: 1000,
        hoursPerDay: 25,
        days: 30,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(ApplianceCalculationError);

    expect(() =>
      calculateApplianceCost({
        wattage: 1000,
        hoursPerDay: 5,
        days: 0,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(ApplianceCalculationError);

    expect(() =>
      calculateApplianceCost({
        wattage: 1000,
        hoursPerDay: 5,
        days: 30,
        rateCentsPerKwh: -5,
      }),
    ).toThrow(ApplianceCalculationError);

    expect(() =>
      calculateApplianceCost({
        wattage: 1000,
        hoursPerDay: 5,
        days: 30,
        rateCentsPerKwh: 16,
        dutyCyclePercent: 120,
      }),
    ).toThrow(ApplianceCalculationError);
  });
});
