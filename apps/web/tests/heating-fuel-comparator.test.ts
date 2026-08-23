import { describe, expect, it } from 'vitest';
import { getRouteByHref } from '@/lib/routes';
import { heatingFuelComparatorSchema } from '@/features/heating-fuel-comparator/schemas/heating-fuel-schema';
import { calculateHeatingFuelComparison } from '@energy-bill-lab/calculation-engine';

describe('Heating Fuel & Heat Pump Breakeven Feature Integration', () => {
  it('registers /tools/heating-fuel-comparator in the public routes registry', () => {
    const route = getRouteByHref('/tools/heating-fuel-comparator');
    expect(route).toBeDefined();
    expect(route?.group).toBe('tools');
    expect(route?.sitemap).toBe(true);
    expect(route?.label).toBe('Heating Fuel Comparator');
  });

  it('validates form input correctly using Zod schema', () => {
    const validData = {
      electricityRateCentsPerKwh: 16.5,
      naturalGasDollarsPerTherm: 1.35,
      heatingOilDollarsPerGallon: 3.85,
      propaneDollarsPerGallon: 2.95,
      annualHeatingDemandMbtu: 50,
    };

    const parsed = heatingFuelComparatorSchema.safeParse(validData);
    expect(parsed.success).toBe(true);
  });

  it('calculates MMBtu delivered costs and thermal balance point', () => {
    const output = calculateHeatingFuelComparison({
      electricityRateCentsPerKwh: 16.0,
      naturalGasDollarsPerTherm: 1.4,
      annualHeatingDemandMbtu: 60,
    });

    expect(output.fuels.length).toBe(7);
    expect(output.lowestCostFuel).toBeDefined();
    expect(output.thermalBalancePoint.crossoverTempF).toBeDefined();
  });
});
