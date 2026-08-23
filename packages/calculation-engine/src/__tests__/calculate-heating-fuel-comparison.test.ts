import { describe, expect, it } from 'vitest';
import { calculateHeatingFuelComparison } from '../calculate-heating-fuel-comparison';

describe('calculateHeatingFuelComparison', () => {
  it('correctly calculates cost per delivered MMBtu and ranks fuels', () => {
    const result = calculateHeatingFuelComparison({
      electricityRateCentsPerKwh: 15.0,
      naturalGasDollarsPerTherm: 1.2,
      annualHeatingDemandMbtu: 50,
    });

    expect(result.fuels.length).toBe(7);
    expect(result.lowestCostFuel).toBeDefined();
    expect(result.lowestCostFuel.rank).toBe(1);
    expect(result.lowestCostFuel.isLowest).toBe(true);

    // Natural Gas (96%) at $1.20/therm => ($1.20 * 10) / 0.96 = $12.50 / MMBtu
    const gasHigh = result.fuels.find((f) => f.fuelType === 'natural_gas_high');
    expect(gasHigh?.costPerMbtuDeliveredDollars).toBeCloseTo(12.5, 1);

    // Electric Resistance at 15¢/kWh => 0.15 * 293.071 = $43.96 / MMBtu
    const resistance = result.fuels.find((f) => f.fuelType === 'electric_resistance');
    expect(resistance?.costPerMbtuDeliveredDollars).toBeCloseTo(43.96, 1);

    // Inverter Heat Pump (COP 3.2) at 15¢/kWh => (0.15 * 293.071) / 3.2 = $13.74 / MMBtu
    const hpInverter = result.fuels.find((f) => f.fuelType === 'heat_pump_inverter');
    expect(hpInverter?.costPerMbtuDeliveredDollars).toBeCloseTo(13.74, 1);
  });

  it('determines plausible thermal balance crossover temperatures', () => {
    const result = calculateHeatingFuelComparison({
      electricityRateCentsPerKwh: 18.0,
      naturalGasDollarsPerTherm: 1.45,
    });

    expect(result.thermalBalancePoint.crossoverTempF).toBeDefined();
    expect(result.thermalBalancePoint.explanation).toContain('thermal economic balance point');
  });

  it('handles expensive electricity and cheap natural gas scenarios', () => {
    const result = calculateHeatingFuelComparison({
      electricityRateCentsPerKwh: 32.0, // High California/Hawaii electricity
      naturalGasDollarsPerTherm: 1.1, // Moderate gas
    });

    // Gas furnace should be significantly cheaper than heat pump
    const gasHigh = result.fuels.find((f) => f.fuelType === 'natural_gas_high');
    const hp = result.fuels.find((f) => f.fuelType === 'heat_pump_inverter');
    expect(gasHigh!.costPerMbtuDeliveredDollars).toBeLessThan(hp!.costPerMbtuDeliveredDollars);
  });
});
