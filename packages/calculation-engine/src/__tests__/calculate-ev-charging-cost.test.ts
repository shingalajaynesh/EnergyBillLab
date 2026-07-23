import { describe, expect, it } from 'vitest';
import { calculateEvChargingCost, EvChargingCalculationError } from '../calculate-ev-charging-cost';

describe('calculateEvChargingCost', () => {
  it('calculates EV charging cost correctly for worked example (75 kWh, 20% to 80%, 90% efficiency, 16 c/kWh)', () => {
    const result = calculateEvChargingCost({
      batteryCapacityKwh: 75,
      startingChargePercent: 20,
      targetChargePercent: 80,
      chargingEfficiencyPercent: 90,
      rateCentsPerKwh: 16,
    });

    // Battery Percent Added = 60%
    // Battery Energy Added = 75 * 0.60 = 45.00 kWh
    // Grid Energy Required = 45.00 / 0.90 = 50.00 kWh
    // Charging Loss = 50.00 - 45.00 = 5.00 kWh
    // Charge Cost = 50.00 * $0.16 = $8.00
    expect(result.batteryPercentAdded).toBe(60);
    expect(result.batteryEnergyAddedKwh).toBe(45);
    expect(result.gridEnergyRequiredKwh).toBe(50);
    expect(result.chargingLossKwh).toBe(5);
    expect(result.chargeCostUsd).toBe(8);
  });

  it('calculates optional driving metrics correctly (30 miles @ 3.3 mi/kWh, 90% efficiency, 16 c/kWh)', () => {
    const result = calculateEvChargingCost({
      batteryCapacityKwh: 75,
      startingChargePercent: 20,
      targetChargePercent: 80,
      chargingEfficiencyPercent: 90,
      rateCentsPerKwh: 16,
      milesDriven: 30,
      milesPerKwh: 3.3,
    });

    expect(result.drivingMetrics).toBeDefined();
    // drivingBatteryKwh = 30 / 3.3 = 9.0909 kWh
    // drivingGridKwh = 9.0909 / 0.90 = 10.1010 kWh -> 10.10 kWh
    // drivingCostUsd = 10.1010 * $0.16 = $1.616 -> $1.62
    // costPerMileUsd = $1.616 / 30 = $0.0539 / mile
    // costPer100MilesUsd = $5.39 / 100 miles
    expect(result.drivingMetrics?.drivingGridKwh).toBe(10.1);
    expect(result.drivingMetrics?.drivingCostUsd).toBe(1.62);
    expect(result.drivingMetrics?.costPerMileUsd).toBe(0.0539);
    expect(result.drivingMetrics?.costPer100MilesUsd).toBe(5.39);
  });

  it('generates valid scenarios for base, off-peak rate, efficiency, and 80% SoC', () => {
    const result = calculateEvChargingCost({
      batteryCapacityKwh: 75,
      startingChargePercent: 20,
      targetChargePercent: 90,
      chargingEfficiencyPercent: 88,
      rateCentsPerKwh: 16,
    });

    expect(result.scenarios.length).toBe(4);

    // Base Scenario
    expect(result.scenarios[0]?.differenceUsd).toBe(0);

    // Off-peak rate scenario (30% off rate = 11.2¢/kWh)
    expect(result.scenarios[1]?.rateCentsPerKwh).toBeCloseTo(11.2, 1);
    expect(result.scenarios[1]?.differenceUsd).toBeLessThan(0);

    // Level 2 92% efficiency scenario
    expect(result.scenarios[2]?.chargingEfficiencyPercent).toBe(92);
    expect(result.scenarios[2]?.differenceUsd).toBeLessThan(0);

    // 80% target SoC scenario
    expect(result.scenarios[3]?.targetChargePercent).toBe(80);
    expect(result.scenarios[3]?.differenceUsd).toBeLessThan(0);
  });

  it('throws EvChargingCalculationError for invalid inputs or target <= start', () => {
    expect(() =>
      calculateEvChargingCost({
        batteryCapacityKwh: -50,
        startingChargePercent: 20,
        targetChargePercent: 80,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(EvChargingCalculationError);

    expect(() =>
      calculateEvChargingCost({
        batteryCapacityKwh: 75,
        startingChargePercent: 80,
        targetChargePercent: 80,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(EvChargingCalculationError);

    expect(() =>
      calculateEvChargingCost({
        batteryCapacityKwh: 75,
        startingChargePercent: 80,
        targetChargePercent: 70,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(EvChargingCalculationError);

    expect(() =>
      calculateEvChargingCost({
        batteryCapacityKwh: 75,
        startingChargePercent: 20,
        targetChargePercent: 80,
        chargingEfficiencyPercent: 40,
        rateCentsPerKwh: 16,
      }),
    ).toThrow(EvChargingCalculationError);
  });
});
