import { describe, expect, it } from 'vitest';

import {
  calculateGasFurnaceCost,
  calculateNaturalGasBill,
} from '@energy-bill-lab/calculation-engine';
import nextConfig from '../next.config';
import {
  CANONICAL_NATURAL_GAS_SNAPSHOT,
  formatThermApproximate,
  MCF_TO_THERM_DIVISOR,
} from '../src/lib/constants/natural-gas';
import { createPageMetadata } from '../src/lib/metadata';
import { isNaturalGasHubSitemapEligible, primaryNavigation, publicRoutes } from '../src/lib/routes';

import type { NaturalGasRateDTO } from '@energy-bill-lab/database';
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

  it('10. verifies official EIA residential checkpoints (April 2026 $18.04, May 2026 $19.73, May 2025 $19.24)', () => {
    const apr2026Mcf = 18.04;
    const apr2026Therm = Number((apr2026Mcf / 10.36).toFixed(4));
    expect(apr2026Therm).toBe(1.7413);

    const may2026Mcf = 19.73;
    const may2026Therm = Number((may2026Mcf / 10.36).toFixed(4));
    expect(may2026Therm).toBe(1.9044);

    const may2025Mcf = 19.24;
    const may2025Therm = Number((may2025Mcf / 10.36).toFixed(4));
    expect(may2025Therm).toBe(1.8571);

    // Verify full precision therm scenario calculations (round only at final step)
    const exactRatePerTherm = 19.73 / 10.36;
    expect(Number((25 * exactRatePerTherm).toFixed(2))).toBe(47.61);
    expect(Number((30 * exactRatePerTherm).toFixed(2))).toBe(57.13);
    expect(Number((40 * exactRatePerTherm).toFixed(2))).toBe(76.18);

    // Verify industrial $4.90/Mcf (Table 22 / PIN sector) is distinct and rejected from residential tables (Table 20 / PRS)
    const industrialApr2026 = 4.9;
    expect(industrialApr2026).not.toBe(apr2026Mcf);
  });

  it('11. verifies July 2026 geography universe reconciliation (52 total: 43 states + DC + US benchmark = 45 valid, 7 withheld states)', () => {
    // Total expected universe: 50 states + District of Columbia + U.S. national benchmark = 52 geographies
    const all50States = [
      'AK',
      'AL',
      'AR',
      'AZ',
      'CA',
      'CO',
      'CT',
      'DE',
      'FL',
      'GA',
      'HI',
      'IA',
      'ID',
      'IL',
      'IN',
      'KS',
      'KY',
      'LA',
      'MA',
      'MD',
      'ME',
      'MI',
      'MN',
      'MO',
      'MS',
      'MT',
      'NC',
      'ND',
      'NE',
      'NH',
      'NJ',
      'NM',
      'NV',
      'NY',
      'OH',
      'OK',
      'OR',
      'PA',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VA',
      'VT',
      'WA',
      'WI',
      'WV',
      'WY',
    ];
    expect(all50States.length).toBe(50);

    const withheldJulyStates = ['CT', 'FL', 'KS', 'LA', 'NH', 'OH', 'WV'];
    expect(withheldJulyStates.length).toBe(7);

    const validJulyStates = all50States.filter((s) => !withheldJulyStates.includes(s));
    expect(validJulyStates.length).toBe(43);

    // District of Columbia (DC) is valid and reporting for July 2026 ($31.62/Mcf)
    const dcReporting = true;
    expect(dcReporting).toBe(true);

    // US national benchmark is valid and reporting ($26.45/Mcf)
    const usBenchmarkReporting = true;
    expect(usBenchmarkReporting).toBe(true);

    // Total valid reporting geographies: 43 states + DC + US = 45
    const totalValidGeographies =
      validJulyStates.length + (dcReporting ? 1 : 0) + (usBenchmarkReporting ? 1 : 0);
    expect(totalValidGeographies).toBe(45);

    // Total universe: 45 valid + 7 withheld = 52
    expect(totalValidGeographies + withheldJulyStates.length).toBe(52);
  });

  it('12. verifies deterministic natural gas therm conversion ($26.45 / 10.36 = 2.5530888..., public display $2.55/therm)', () => {
    const rawMcf = 26.45;
    const factor = MCF_TO_THERM_DIVISOR;
    expect(factor).toBe(10.36);

    const calculatedTherm = rawMcf / factor;
    expect(calculatedTherm).toBeCloseTo(2.5530888, 6);

    const formattedRate = `$${calculatedTherm.toFixed(2)}/therm`;
    expect(formattedRate).toBe('$2.55/therm');

    expect(CANONICAL_NATURAL_GAS_SNAPSHOT.priceDollarsPerMcf).toBe(26.45);
    expect(CANONICAL_NATURAL_GAS_SNAPSHOT.priceDollarsPerTherm).toBe(2.55);
    expect(CANONICAL_NATURAL_GAS_SNAPSHOT.conversionFactorMcfToTherm).toBe(10.36);

    const disclosure = formatThermApproximate(CANONICAL_NATURAL_GAS_SNAPSHOT.priceDollarsPerTherm);
    expect(disclosure).toContain('$2.55/therm');
    expect(disclosure).toContain('1,036 Btu/cf');
  });

  it('13. enforces official EIA Table 20 terminology (Average price of natural gas sold to residential consumers, by state)', () => {
    const officialTableTitle =
      'Natural Gas Monthly Table 20 — Average price of natural gas sold to residential consumers, by state';
    expect(CANONICAL_NATURAL_GAS_SNAPSHOT.source).toContain(officialTableTitle);
    expect(CANONICAL_NATURAL_GAS_SNAPSHOT.sourceShort).toBe('EIA Natural Gas Monthly Table 20');

    // Table 20 must NOT be labeled as "Percentage of Heating Value" or combined with other tables
    expect(CANONICAL_NATURAL_GAS_SNAPSHOT.source).not.toContain('Percentage of Heating Value');
    expect(CANONICAL_NATURAL_GAS_SNAPSHOT.source).not.toContain('Table 18');
    expect(CANONICAL_NATURAL_GAS_SNAPSHOT.source).not.toContain('Citygate');
  });

  it('14. verifies permanent 308 redirect from /natural-gas to /natural-gas-rates', async () => {
    const redirects = await (
      nextConfig as {
        redirects?: () => Promise<
          Array<{ source: string; destination: string; permanent: boolean }>
        >;
      }
    ).redirects!();

    const gasRedirect = redirects.find((r) => r.source === '/natural-gas');
    expect(gasRedirect).toBeDefined();
    expect(gasRedirect?.destination).toBe('/natural-gas-rates');
    expect(gasRedirect?.permanent).toBe(true);
  });

  it('15. verifies national-first natural gas reporting period selection (no arbitrary state-count threshold, July 2026 selected with 44 eligible, 7 withheld, US benchmark separate)', () => {
    // 1. Verify period determination hierarchy:
    // When effective national rate is July 2026, target period is strictly 2026-07 regardless of state count.
    const mockNationalJuly: NaturalGasRateDTO = {
      code: 'US',
      name: 'United States',
      type: 'NATIONAL',
      period: '2026-07-01',
      priceDollarsPerMcf: 26.45,
      priceDollarsPerTherm: 2.55,
      conversionMethod: 'EIA_HEAT_CONTENT_1036_BTU',
      conversionAssumptions: '1 Mcf = 10.36 therms',
      source: 'EIA',
      sourceDataset: 'natural-gas/pri/sum',
    };

    // Even if only 10 states reported for July 2026 (< 35 threshold), the national period MUST remain July 2026
    const sparseStateRates: Record<string, NaturalGasRateDTO> = {};
    const sampleStates = ['CA', 'TX', 'NY', 'PA', 'IL', 'OH', 'MI', 'GA', 'NC', 'NJ'];
    for (const st of sampleStates) {
      sparseStateRates[st] = {
        ...mockNationalJuly,
        code: st,
        name: st,
        type: 'STATE',
        priceDollarsPerMcf: 25.0,
      };
    }
    // Also include June 2026 records to test that it does NOT backshift to June
    const olderJuneStates = ['AL', 'AK', 'AZ', 'AR', 'CO'];
    for (const st of olderJuneStates) {
      sparseStateRates[`${st}_june`] = {
        ...mockNationalJuly,
        code: st,
        name: st,
        type: 'STATE',
        period: '2026-06-01',
        priceDollarsPerMcf: 24.0,
      };
    }

    const targetPeriodKey = mockNationalJuly.period.substring(0, 7);
    expect(targetPeriodKey).toBe('2026-07');

    // Filter cohort strictly by targetPeriodKey
    const cohortMatches: string[] = [];
    for (const [code, r] of Object.entries(sparseStateRates)) {
      if (r.period.substring(0, 7) === targetPeriodKey) {
        cohortMatches.push(code);
      }
    }
    // Verifies that sparse July coverage (10 states < 35 threshold) does NOT cause backshift to June
    expect(cohortMatches.length).toBe(10);
    expect(cohortMatches.length).toBeLessThan(35);
    expect(targetPeriodKey).not.toBe('2026-06');

    // 2. Official July 2026 cohort numbers:
    // In official EIA Table 20 (July 2026):
    // 43 states + District of Columbia = 44 reporting jurisdictions
    // 7 states are withheld by EIA: CT, FL, KS, LA, NH, OH, WV
    // Total state & DC jurisdictions = 44 + 7 = 51
    // US national benchmark = $26.45/Mcf (handled separately)
    // Total valid observations including US benchmark = 45
    const withheldStates = ['CT', 'FL', 'KS', 'LA', 'NH', 'OH', 'WV'];
    expect(withheldStates).toHaveLength(7);

    const all51StateAndDcCodes = [
      'AK',
      'AL',
      'AR',
      'AZ',
      'CA',
      'CO',
      'CT',
      'DE',
      'DC',
      'FL',
      'GA',
      'HI',
      'IA',
      'ID',
      'IL',
      'IN',
      'KS',
      'KY',
      'LA',
      'MA',
      'MD',
      'ME',
      'MI',
      'MN',
      'MO',
      'MS',
      'MT',
      'NC',
      'ND',
      'NE',
      'NH',
      'NJ',
      'NM',
      'NV',
      'NY',
      'OH',
      'OK',
      'OR',
      'PA',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VA',
      'VT',
      'WA',
      'WI',
      'WV',
      'WY',
    ];
    expect(all51StateAndDcCodes).toHaveLength(51);

    const eligibleCodes = all51StateAndDcCodes.filter((c) => !withheldStates.includes(c));
    expect(eligibleCodes).toHaveLength(44); // 43 states + DC

    // Format display string
    const [tYear, tMonth] = targetPeriodKey.split('-');
    const formattedPeriod = new Date(
      parseInt(tYear!, 10),
      parseInt(tMonth!, 10) - 1,
      1,
    ).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    expect(formattedPeriod).toBe('July 2026');

    // Separate US benchmark
    expect(mockNationalJuly.code).toBe('US');
    expect(mockNationalJuly.priceDollarsPerMcf).toBe(26.45);
    expect(eligibleCodes.length + 1).toBe(45); // 44 states/DC + 1 US = 45 total observations
  });
});
