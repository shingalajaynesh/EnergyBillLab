import { describe, expect, it } from 'vitest';
import { calculateRefrigeratorAnnualKwhCost } from '@energy-bill-lab/calculation-engine';

import {
  applianceBenchmarks,
  getBenchmarksByApplianceType,
} from '../src/content/appliance-benchmarks';
import { createDehumidifierAnalyticsPayload } from '../src/features/dehumidifier-calculator/lib/dehumidifier-analytics';
import { dehumidifierSchema } from '../src/features/dehumidifier-calculator/schemas/dehumidifier-schema';
import { createDryerAnalyticsPayload } from '../src/features/dryer-calculator/lib/dryer-analytics';
import {
  DEFAULT_DRYER_FORM_VALUES,
  dryerSchema,
} from '../src/features/dryer-calculator/schemas/dryer-schema';
import { createPoolPumpAnalyticsPayload } from '../src/features/pool-pump-calculator/lib/pool-pump-analytics';
import { poolPumpSchema } from '../src/features/pool-pump-calculator/schemas/pool-pump-schema';
import { createRefrigeratorAnalyticsPayload } from '../src/features/refrigerator-calculator/lib/refrigerator-analytics';
import { refrigeratorSchema } from '../src/features/refrigerator-calculator/schemas/refrigerator-schema';
import { createWaterHeaterAnalyticsPayload } from '../src/features/water-heater-calculator/lib/water-heater-analytics';
import {
  DEFAULT_WATER_HEATER_FORM_VALUES,
  waterHeaterSchema,
} from '../src/features/water-heater-calculator/schemas/water-heater-schema';
import { ADS_ALLOWED_ROUTES } from '../src/lib/ad-eligibility';
import { publicRoutes, sitemapRoutes } from '../src/lib/routes';

describe('Appliance Expansion Batch Tests', () => {
  const newRoutes = [
    '/tools/refrigerator-cost-calculator',
    '/tools/clothes-dryer-cost-calculator',
    '/tools/electric-water-heater-cost-calculator',
    '/tools/pool-pump-cost-calculator',
    '/tools/dehumidifier-cost-calculator',
  ] as const;

  it('registers all 5 new appliance routes in publicRoutes and sitemapRoutes', () => {
    for (const href of newRoutes) {
      const publicEntry = publicRoutes.find((r) => r.href === href);
      expect(publicEntry).toBeDefined();
      expect(publicEntry?.sitemap).toBe(true);

      const sitemapEntry = sitemapRoutes.find((r) => r.href === href);
      expect(sitemapEntry).toBeDefined();
    }
  });

  it('includes all 5 new routes in ADS_ALLOWED_ROUTES', () => {
    for (const href of newRoutes) {
      expect((ADS_ALLOWED_ROUTES as readonly string[]).includes(href)).toBe(true);
    }
  });

  it('validates schema inputs for all 5 calculators correctly', () => {
    expect(
      refrigeratorSchema.safeParse({
        mode: 'wattage',
        wattage: 150,
        hoursPerDay: 24,
        dutyCyclePercent: 35,
        annualKwh: 450,
        days: 30,
        rateCentsPerKwh: 16.5,
      }).success,
    ).toBe(true);

    expect(
      dryerSchema.safeParse({
        wattage: 4500,
        minutesPerLoad: 45,
        loadsPerWeek: 4,
        weeks: 4.33,
        rateCentsPerKwh: 16.5,
        dutyCyclePercent: 100,
      }).success,
    ).toBe(true);

    expect(
      waterHeaterSchema.safeParse({
        elementWatts: 4500,
        activeElements: 1,
        hoursPerDay: 3,
        days: 30,
        rateCentsPerKwh: 16.5,
        dutyCyclePercent: 100,
      }).success,
    ).toBe(true);

    expect(
      poolPumpSchema.safeParse({
        wattage: 1500,
        hoursPerDay: 8,
        daysPerWeek: 7,
        weeks: 4.33,
        rateCentsPerKwh: 16.5,
        dutyCyclePercent: 100,
      }).success,
    ).toBe(true);

    expect(
      dehumidifierSchema.safeParse({
        wattage: 500,
        hoursPerDay: 12,
        dutyCyclePercent: 50,
        days: 30,
        rateCentsPerKwh: 16.5,
      }).success,
    ).toBe(true);
  });

  it('ensures analytics payload builders do not transmit raw numerical inputs or PII', () => {
    const payloads = [
      createRefrigeratorAnalyticsPayload({
        event: 'refrigerator_calculation_completed',
        mode: 'wattage',
        hasPreset: true,
        hasCustomRate: true,
        costBand: 'LOW',
      }),
      createDryerAnalyticsPayload({
        event: 'dryer_calculation_completed',
        hasPreset: true,
        hasCustomRate: false,
        costBand: 'MEDIUM',
      }),
      createWaterHeaterAnalyticsPayload({
        event: 'water_heater_calculation_completed',
        hasPreset: false,
        hasCustomRate: true,
        costBand: 'HIGH',
      }),
      createPoolPumpAnalyticsPayload({
        event: 'pool_pump_calculation_completed',
        hasPreset: true,
        costBand: 'HIGH',
      }),
      createDehumidifierAnalyticsPayload({
        event: 'dehumidifier_calculation_completed',
        hasPreset: false,
        costBand: 'LOW',
      }),
    ];

    for (const payload of payloads) {
      const stringified = JSON.stringify(payload);
      expect(stringified).not.toContain('150');
      expect(stringified).not.toContain('16.5');
      expect(stringified).not.toContain('California');
    }
  });

  it('verifies typed appliance benchmark registry entries', () => {
    expect(applianceBenchmarks.length).toBeGreaterThanOrEqual(8);
    expect(getBenchmarksByApplianceType('refrigerator').length).toBeGreaterThanOrEqual(3);
    expect(getBenchmarksByApplianceType('clothes-dryer').length).toBeGreaterThanOrEqual(2);
    expect(getBenchmarksByApplianceType('electric-water-heater').length).toBeGreaterThanOrEqual(1);
    expect(getBenchmarksByApplianceType('pool-pump').length).toBeGreaterThanOrEqual(1);
    expect(getBenchmarksByApplianceType('dehumidifier').length).toBeGreaterThanOrEqual(1);
  });

  it('verifies refrigerator annual-kWh mode does not apply duty cycle twice', () => {
    const result = calculateRefrigeratorAnnualKwhCost({
      annualKwh: 365,
      days: 30,
      rateCentsPerKwh: 10,
    });
    // 365 kWh/year = 1 kWh/day. For 30 days, periodKwh = 30 kWh. Cost = 30 * $0.10 = $3.00
    expect(result.dailyKwh).toBe(1);
    expect(result.periodKwh).toBe(30);
    expect(result.periodCostUsd).toBe(3.0);
    expect(result.dutyCyclePercentUsed).toBe(100);
  });

  it('verifies water heater default active elements count is 1', () => {
    expect(DEFAULT_WATER_HEATER_FORM_VALUES.activeElements).toBe(1);
  });

  it('verifies dryer calculator has electric scope only with no gas fuel parameters', () => {
    expect(DEFAULT_DRYER_FORM_VALUES.wattage).toBeGreaterThan(0);
    expect((DEFAULT_DRYER_FORM_VALUES as Record<string, unknown>).gasTherms).toBeUndefined();
    expect((DEFAULT_DRYER_FORM_VALUES as Record<string, unknown>).fuelType).toBeUndefined();
  });

  it('verifies water heater calculator schema has no heat-pump COP parameter', () => {
    expect((DEFAULT_WATER_HEATER_FORM_VALUES as Record<string, unknown>).cop).toBeUndefined();
    expect((DEFAULT_WATER_HEATER_FORM_VALUES as Record<string, unknown>).mode).toBeUndefined();
  });
});
