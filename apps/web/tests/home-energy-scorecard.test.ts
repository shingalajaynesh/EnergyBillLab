import { describe, expect, it } from 'vitest';
import { getRouteByHref } from '@/lib/routes';
import { homeEnergyAuditSchema } from '@/features/home-energy-scorecard/schemas/home-energy-schema';
import { calculateHomeEnergyScore } from '@energy-bill-lab/calculation-engine';

describe('Home Energy Scorecard Feature Integration', () => {
  it('registers /tools/home-energy-scorecard in the public routes registry with valid metadata', () => {
    const route = getRouteByHref('/tools/home-energy-scorecard');
    expect(route).toBeDefined();
    expect(route?.group).toBe('tools');
    expect(route?.sitemap).toBe(true);
    expect(route?.label).toBe('Home Energy Scorecard');
  });

  it('validates form input correctly using Zod schema', () => {
    const validData = {
      squareFootage: 2400,
      yearBuiltTier: '2006_2015',
      climateZone: 'cold',
      insulationLevel: 'high_r38_r49',
      heatingType: 'heat_pump_standard',
      coolingType: 'central_standard_seer14',
      waterHeaterType: 'heat_pump_hybrid',
      windowType: 'double_low_e',
      electricityRateCentsPerKwh: 17.5,
      gasPriceDollarsPerTherm: 1.45,
    };

    const parsed = homeEnergyAuditSchema.safeParse(validData);
    expect(parsed.success).toBe(true);
  });

  it('rejects out-of-range form values', () => {
    const invalidData = {
      squareFootage: 100, // < 400
      yearBuiltTier: 'invalid_tier',
      climateZone: 'cold',
      insulationLevel: 'high_r38_r49',
      heatingType: 'heat_pump_standard',
      coolingType: 'central_standard_seer14',
      waterHeaterType: 'heat_pump_hybrid',
      windowType: 'double_low_e',
      electricityRateCentsPerKwh: -5,
    };

    const parsed = homeEnergyAuditSchema.safeParse(invalidData);
    expect(parsed.success).toBe(false);
  });

  it('executes full calculation and generates an efficiency grade and retrofit roadmap', () => {
    const output = calculateHomeEnergyScore({
      squareFootage: 2000,
      yearBuiltTier: '1975_1990',
      climateZone: 'moderate',
      insulationLevel: 'average_batt',
      heatingType: 'gas_standard_80',
      coolingType: 'central_old_seer10',
      waterHeaterType: 'electric_tank',
      windowType: 'single_pane',
      electricityRateCentsPerKwh: 16.5,
      gasPriceDollarsPerTherm: 1.40,
    });

    expect(output.score).toBeGreaterThan(0);
    expect(output.letterGrade).toBeDefined();
    expect(output.estimatedAnnualTotalCostDollars).toBeGreaterThan(500);
    expect(output.estimatedAnnualWasteDollars).toBeGreaterThan(0);
    expect(output.retrofitRoadmap.length).toBeGreaterThan(0);
  });
});
