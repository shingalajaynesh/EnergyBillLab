import { describe, expect, it } from 'vitest';

import {
  calculateGasFurnaceCost,
  calculateNaturalGasBill,
} from '@energy-bill-lab/calculation-engine';
import { createPageMetadata } from '../src/lib/metadata';
import { isNaturalGasHubSitemapEligible, primaryNavigation, publicRoutes } from '../src/lib/routes';

import {
  buildHistoricalTrendRows,
  isNaturalGasDataVerified,
  type NaturalGasHubViewModel,
} from '../src/lib/server/get-natural-gas-data';

describe('Phase 1 Natural Gas Data & Tools Infrastructure', () => {
  it('1. desktop and mobile navigation expose Natural Gas Rates', () => {
    const route = primaryNavigation.find((r) => r.href === '/natural-gas-rates');
    expect(route).toBeDefined();
    expect(route?.label).toBe('Natural Gas Rates');
  });

  it('2. includes natural gas calculators in public route registry', () => {
    const billCalc = publicRoutes.find((r) => r.href === '/tools/natural-gas-bill-calculator');
    const furnaceCalc = publicRoutes.find((r) => r.href === '/tools/gas-furnace-cost-calculator');

    expect(billCalc).toBeDefined();
    expect(furnaceCalc).toBeDefined();
  });

  it('3. does not publish 50 state natural-gas routes in route registry', () => {
    const stateGasRoutes = publicRoutes.filter((r) => r.href.startsWith('/natural-gas-rates/'));
    expect(stateGasRoutes).toHaveLength(0);
  });

  it('4a. sitemap eligibility matrix (flag false + data exists -> false)', () => {
    delete process.env.NATURAL_GAS_LAUNCH_ENABLED;
    delete process.env.NATURAL_GAS_DATA_AVAILABLE;
    process.env.NATURAL_GAS_DATA_VERIFIED = 'true';

    expect(isNaturalGasHubSitemapEligible()).toBe(false);

    delete process.env.NATURAL_GAS_DATA_VERIFIED;
  });

  it('4b. sitemap eligibility matrix (flag true + no verified data -> false)', () => {
    process.env.NATURAL_GAS_LAUNCH_ENABLED = 'true';
    delete process.env.NATURAL_GAS_DATA_VERIFIED;

    expect(isNaturalGasHubSitemapEligible()).toBe(false);

    delete process.env.NATURAL_GAS_LAUNCH_ENABLED;
  });

  it('4c. sitemap eligibility matrix (flag true + verified data -> true)', () => {
    process.env.NATURAL_GAS_LAUNCH_ENABLED = 'true';
    process.env.NATURAL_GAS_DATA_VERIFIED = 'true';

    expect(isNaturalGasHubSitemapEligible()).toBe(true);

    delete process.env.NATURAL_GAS_LAUNCH_ENABLED;
    delete process.env.NATURAL_GAS_DATA_VERIFIED;
  });

  it('5. data verification helper strictly validates EIA national rate record', () => {
    expect(isNaturalGasDataVerified(null)).toBe(false);
    expect(isNaturalGasDataVerified({ hasData: false })).toBe(false);

    const invalidRate: NaturalGasHubViewModel = {
      hasData: true,
      isVerified: false,
      latestNationalRate: {
        code: 'US',
        name: 'United States',
        type: 'NATIONAL',
        period: '2026-04',
        priceDollarsPerMcf: -5,
        priceDollarsPerTherm: 0,
        conversionMethod: 'EIA_HEAT_CONTENT_1036_BTU',
        conversionAssumptions: '1 Mcf = 10.36 therms',
        source: 'EIA',
        sourceDataset: 'natural-gas/pri/sum',
      },
      history: [],
      trend: [],
      stateRates: {},
      latestSourceMonthFormatted: 'April 2026',
      dataStatusText: 'Status',
      comparisonCohort: {
        latestNationalPeriod: '2026-04',
        latestCommonPeriod: '2026-03',
        eligibleStatesCount: 43,
        eligibleStateCodes: ['TX', 'OH'],
        excludedStatesCount: 8,
        excludedStateCodes: ['CA', 'DC', 'FL', 'IN', 'MD', 'ME', 'NM', 'VA'],
        exclusionReason: 'Missing reporting data',
      },
    };

    expect(isNaturalGasDataVerified(invalidRate)).toBe(false);

    invalidRate.latestNationalRate!.priceDollarsPerMcf = 18.45;
    invalidRate.latestNationalRate!.priceDollarsPerTherm = 1.7809;
    expect(isNaturalGasDataVerified(invalidRate)).toBe(true);
  });

  it('6. historical trend calculation starts no earlier than June 2024', () => {
    const rawHistory = [
      {
        code: 'US',
        name: 'United States',
        type: 'NATIONAL',
        period: '2024-05-01',
        priceDollarsPerMcf: 15.0,
        priceDollarsPerTherm: 1.45,
        conversionMethod: 'EIA',
        conversionAssumptions: '10.36',
        source: 'EIA',
        sourceDataset: 'natural-gas',
      },
      {
        code: 'US',
        name: 'United States',
        type: 'NATIONAL',
        period: '2024-06-01',
        priceDollarsPerMcf: 16.0,
        priceDollarsPerTherm: 1.54,
        conversionMethod: 'EIA',
        conversionAssumptions: '10.36',
        source: 'EIA',
        sourceDataset: 'natural-gas',
      },
      {
        code: 'US',
        name: 'United States',
        type: 'NATIONAL',
        period: '2024-07-01',
        priceDollarsPerMcf: 17.6,
        priceDollarsPerTherm: 1.7,
        conversionMethod: 'EIA',
        conversionAssumptions: '10.36',
        source: 'EIA',
        sourceDataset: 'natural-gas',
      },
      {
        code: 'US',
        name: 'United States',
        type: 'NATIONAL',
        period: '2025-06-01',
        priceDollarsPerMcf: 19.2,
        priceDollarsPerTherm: 1.85,
        conversionMethod: 'EIA',
        conversionAssumptions: '10.36',
        source: 'EIA',
        sourceDataset: 'natural-gas',
      },
    ];

    const trend = buildHistoricalTrendRows(rawHistory);

    expect(trend.some((r) => r.period === '2024-05-01')).toBe(false);

    const june24 = trend.find((r) => r.period === '2024-06-01');
    const july24 = trend.find((r) => r.period === '2024-07-01');
    const june25 = trend.find((r) => r.period === '2025-06-01');

    expect(june24).toBeDefined();
    expect(july24?.momChangeDollarsPerMcf).toBe(1.6);
    expect(june25?.yoyChangeDollarsPerMcf).toBe(3.2);
    expect(june25?.yoyChangePercent).toBe(20.0);
  });

  it('7. metadata targets apex canonical domain https://energybilllab.com', () => {
    const meta = createPageMetadata({
      title: 'U.S. Residential Natural Gas Prices and Historical Trends',
      description: 'EIA natural gas rate data and cost tools.',
      path: '/natural-gas-rates',
    });

    expect(meta.alternates?.canonical).toBe('/natural-gas-rates');
  });

  it('8. calculates natural gas bill accurately', () => {
    const res = calculateNaturalGasBill({
      usage: 100,
      unit: 'therms',
      pricePerUnit: 1.75,
      fixedChargeUsd: 15,
      taxesAndFeesUsd: 10,
    });

    expect(res.usageChargeUsd).toBe(175.0);
    expect(res.totalBillUsd).toBe(200.0);
    expect(res.effectiveCostPerUnit).toBe(2.0);
  });

  it('9. calculates gas furnace operating costs for Mode A and Mode B', () => {
    const modeA = calculateGasFurnaceCost({
      mode: 'input_capacity',
      inputBtuPerHour: 100000,
      runtimeHoursPerDay: 5,
      days: 30,
      ratePerThermUsd: 1.5,
    });

    expect(modeA.thermsUsed).toBe(150);
    expect(modeA.totalUsageCostUsd).toBe(225.0);

    const modeB = calculateGasFurnaceCost({
      mode: 'heating_output',
      outputBtuPerHour: 80000,
      afuePercent: 80,
      runtimeHoursPerDay: 5,
      days: 30,
      ratePerThermUsd: 1.5,
    });

    expect(modeB.inputBtuPerHour).toBe(100000);
    expect(modeB.thermsUsed).toBe(150);
    expect(modeB.totalUsageCostUsd).toBe(225.0);
  });
});
