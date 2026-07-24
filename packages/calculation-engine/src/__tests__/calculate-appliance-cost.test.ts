import { describe, expect, it } from 'vitest';
import {
  ApplianceCalculationError,
  calculateApplianceCost,
  calculateDryerCost,
  calculatePoolPumpCost,
  calculateRefrigeratorAnnualKwhCost,
  calculateWaterHeaterCost,
} from '../calculate-appliance-cost';

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

  it('calculates refrigerator annual EnergyGuide kWh conversion correctly', () => {
    // 600 kWh/yr at 16.5 c/kWh over 30 days
    const result = calculateRefrigeratorAnnualKwhCost({
      annualKwh: 600,
      days: 30,
      rateCentsPerKwh: 16.5,
    });

    expect(result.annualKwh).toBe(600);
    expect(result.annualCostUsd).toBe(99);
    expect(result.dailyKwh).toBeCloseTo(1.6438, 3);
  });

  it('calculates clothes dryer load-based operating costs correctly', () => {
    // 4000W dryer, 45 mins/load, 4 loads/week, 16.5 c/kWh
    const result = calculateDryerCost({
      wattage: 4000,
      minutesPerLoad: 45,
      loadsPerWeek: 4,
      weeks: 4.33,
      rateCentsPerKwh: 16.5,
    });

    // kWh/load = 4000 * 0.75 / 1000 = 3 kWh/load
    // cost/load = 3 kWh * $0.165 = $0.495 -> $0.50
    expect(result.kwhPerLoad).toBe(3);
    expect(result.costPerLoadUsd).toBe(0.5);
    expect(result.hoursPerLoad).toBe(0.75);
    expect(result.loadsPerWeekUsed).toBe(4);
  });

  it('calculates water heater costs with element count correctly', () => {
    // 4500W element, 1 active element, 3 hrs/day, 30 days, 16.5 c/kWh
    const result = calculateWaterHeaterCost({
      elementWatts: 4500,
      activeElements: 1,
      hoursPerDay: 3,
      days: 30,
      rateCentsPerKwh: 16.5,
    });

    // Daily kWh = 4.5 kW * 3 hrs = 13.5 kWh
    // 30-day kWh = 405 kWh
    // 30-day cost = 405 * $0.165 = $66.825 -> $66.83
    expect(result.dailyKwh).toBe(13.5);
    expect(result.periodKwh).toBe(405);
    expect(result.periodCostUsd).toBe(66.83);
  });

  it('calculates pool pump weekly normalized schedule correctly', () => {
    // 1500W pump, 8 hrs/day, 7 days/week, 4.33 weeks, 16.5 c/kWh
    const result = calculatePoolPumpCost({
      wattage: 1500,
      hoursPerDay: 8,
      daysPerWeek: 7,
      weeks: 4.33,
      rateCentsPerKwh: 16.5,
    });

    // Daily kWh = 1.5 * 8 = 12 kWh
    expect(result.dailyKwh).toBe(12);
  });
});
