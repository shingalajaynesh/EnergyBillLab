import { describe, expect, it } from 'vitest';
import { calculateHomeEnergyScore } from '../calculate-home-energy-score';

describe('calculateHomeEnergyScore', () => {
  it('correctly grades a highly efficient modern home as A or A+', () => {
    const result = calculateHomeEnergyScore({
      squareFootage: 2200,
      yearBuiltTier: '2016_plus',
      climateZone: 'moderate',
      insulationLevel: 'air_sealed_super',
      heatingType: 'heat_pump_inverter',
      coolingType: 'heat_pump_seer2_16',
      waterHeaterType: 'heat_pump_hybrid',
      windowType: 'triple_pane',
      electricityRateCentsPerKwh: 16.5,
    });

    expect(result.score).toBeGreaterThanOrEqual(85);
    expect(['A', 'A+']).toContain(result.letterGrade);
    expect(result.componentScores.envelope.status).toBe('good');
    expect(result.componentScores.heating.status).toBe('good');
    expect(result.componentScores.waterHeating.status).toBe('good');
    expect(result.estimatedAnnualWasteDollars).toBeLessThan(400);
  });

  it('correctly grades an older uninsulated drafty home with resistance heat as D or F', () => {
    const result = calculateHomeEnergyScore({
      squareFootage: 1800,
      yearBuiltTier: 'pre_1975',
      climateZone: 'cold',
      insulationLevel: 'poor_uninsulated',
      heatingType: 'electric_resistance',
      coolingType: 'window_units',
      waterHeaterType: 'electric_tank',
      windowType: 'single_pane',
      electricityRateCentsPerKwh: 18.0,
    });

    expect(result.score).toBeLessThanOrEqual(50);
    expect(['D', 'F']).toContain(result.letterGrade);
    expect(result.componentScores.envelope.status).toBe('poor');
    expect(result.componentScores.heating.status).toBe('poor');
    expect(result.componentScores.windows.status).toBe('poor');
    expect(result.estimatedAnnualWasteDollars).toBeGreaterThan(600);
    expect(result.retrofitRoadmap.length).toBeGreaterThan(2);

    // Verify attic insulation and heat pump upgrades are recommended
    const upgradeIds = result.retrofitRoadmap.map((r) => r.id);
    expect(upgradeIds).toContain('attic_insulation');
    expect(upgradeIds).toContain('inverter_heat_pump');
    expect(upgradeIds).toContain('heat_pump_water_heater');
  });

  it('produces plausible energy consumption scaling with square footage', () => {
    const smallHome = calculateHomeEnergyScore({
      squareFootage: 1000,
      yearBuiltTier: '1991_2005',
      climateZone: 'moderate',
      insulationLevel: 'average_batt',
      heatingType: 'gas_standard_80',
      coolingType: 'central_standard_seer14',
      waterHeaterType: 'gas_tank',
      windowType: 'double_clear',
      electricityRateCentsPerKwh: 15.0,
      gasPriceDollarsPerTherm: 1.40,
    });

    const largeHome = calculateHomeEnergyScore({
      squareFootage: 3500,
      yearBuiltTier: '1991_2005',
      climateZone: 'moderate',
      insulationLevel: 'average_batt',
      heatingType: 'gas_standard_80',
      coolingType: 'central_standard_seer14',
      waterHeaterType: 'gas_tank',
      windowType: 'double_clear',
      electricityRateCentsPerKwh: 15.0,
      gasPriceDollarsPerTherm: 1.40,
    });

    expect(largeHome.estimatedAnnualTotalCostDollars).toBeGreaterThan(
      smallHome.estimatedAnnualTotalCostDollars * 1.5,
    );
  });
});
