/**
 * Canonical Natural Gas Source of Truth & Fallback Reference
 *
 * Source: U.S. Energy Information Administration (EIA)
 * Publication: Natural Gas Monthly Table 20 — Average price of natural gas sold to residential consumers, by state
 * Direct URL: https://www.eia.gov/dnav/ng/ng_pri_sum_dcu_nus_m.htm
 * Survey / Series: EIA-857 / N3010US3
 *
 * IMPORTANT RULES:
 * 1. Table 20 is the official EIA residential consumer price table (NOT Table 18, which is deliveries to all consumers).
 * 2. Primary runtime source remains the validated database / API data. This module provides the canonical validated offline fallback.
 * 3. Therm conversions are standardized using EIA's national average heat content:
 *    1 cubic foot ≈ 1,036 Btu -> 1 Mcf (1,000 cu ft) ≈ 1,036,000 Btu = 10.36 therms.
 *    This conversion must be labeled as approximate, because individual utility tariffs vary.
 */

export const MCF_TO_THERM_DIVISOR = 10.36;

export interface CanonicalNaturalGasSnapshot {
  reportingPeriod: string;
  reportingPeriodFormatted: string;
  releaseDate: string;
  source: string;
  sourceShort: string;
  sourceUrl: string;
  priceDollarsPerMcf: number;
  priceDollarsPerTherm: number;
  conversionFactorMcfToTherm: number;
  conversionAssumption: string;
  validationDate: string;
  approximateThermLabel: string;
}

export const CANONICAL_NATURAL_GAS_SNAPSHOT: CanonicalNaturalGasSnapshot = {
  reportingPeriod: '2026-07',
  reportingPeriodFormatted: 'July 2026',
  releaseDate: '2026-09-30',
  source:
    'U.S. Energy Information Administration (EIA) Natural Gas Monthly Table 20 — Average price of natural gas sold to residential consumers, by state',
  sourceShort: 'EIA Natural Gas Monthly Table 20',
  sourceUrl: 'https://www.eia.gov/dnav/ng/ng_pri_sum_dcu_nus_m.htm',
  priceDollarsPerMcf: 26.45,
  priceDollarsPerTherm: 2.55, // 26.45 / 10.36 = 2.5530888... ≈ $2.55/therm
  conversionFactorMcfToTherm: MCF_TO_THERM_DIVISOR,
  conversionAssumption:
    'Standard EIA heat-content conversion assumption of 1,036 Btu per cubic foot (1 Mcf ≈ 10.36 therms). Approximate comparison rate; actual utility billing heat factors vary.',
  validationDate: '2026-10-13',
  approximateThermLabel:
    "≈ $2.55/therm using EIA's 2026 average heat-content conversion of 1,036 Btu/cf",
};

export interface HistoricalNaturalGasBenchmark {
  period: string;
  formattedMonth: string;
  priceDollarsPerMcf: number;
  priceDollarsPerTherm: number;
  releaseDate: string;
  notes?: string;
}

/**
 * Historical EIA Table 20 National Residential Benchmarks
 * Sourced directly from EIA series N3010US3 (Electric & Natural Gas Monthly series)
 */
export const HISTORICAL_NATURAL_GAS_BENCHMARKS: Record<string, HistoricalNaturalGasBenchmark> = {
  '2026-07': {
    period: '2026-07',
    formattedMonth: 'July 2026',
    priceDollarsPerMcf: 26.45,
    priceDollarsPerTherm: 2.55,
    releaseDate: '2026-09-30',
    notes: 'Latest published EIA Natural Gas Monthly Table 20 release as of September 30, 2026.',
  },
  '2026-06': {
    period: '2026-06',
    formattedMonth: 'June 2026',
    priceDollarsPerMcf: 24.09,
    priceDollarsPerTherm: 2.33,
    releaseDate: '2026-08-31',
  },
  '2026-05': {
    period: '2026-05',
    formattedMonth: 'May 2026',
    priceDollarsPerMcf: 19.73,
    priceDollarsPerTherm: 1.9, // 19.73 / 10.36 = 1.9044...
    releaseDate: '2026-08-31',
    notes:
      'Official revised benchmark. Preliminary figure was $19.83/Mcf; revised to $19.73/Mcf in the August 31, 2026 EIA Natural Gas Monthly release.',
  },
  '2026-04': {
    period: '2026-04',
    formattedMonth: 'April 2026',
    priceDollarsPerMcf: 18.04,
    priceDollarsPerTherm: 1.74,
    releaseDate: '2026-08-31',
    notes: 'Revised from preliminary $18.17/Mcf.',
  },
  '2026-03': {
    period: '2026-03',
    formattedMonth: 'March 2026',
    priceDollarsPerMcf: 16.16,
    priceDollarsPerTherm: 1.56,
    releaseDate: '2026-08-31',
    notes: 'Revised from preliminary $16.25/Mcf.',
  },
  '2026-02': {
    period: '2026-02',
    formattedMonth: 'February 2026',
    priceDollarsPerMcf: 14.95,
    priceDollarsPerTherm: 1.44,
    releaseDate: '2026-08-31',
    notes: 'Revised from preliminary $15.06/Mcf.',
  },
  '2026-01': {
    period: '2026-01',
    formattedMonth: 'January 2026',
    priceDollarsPerMcf: 13.96,
    priceDollarsPerTherm: 1.35,
    releaseDate: '2026-08-31',
  },
  '2025-07': {
    period: '2025-07',
    formattedMonth: 'July 2025',
    priceDollarsPerMcf: 25.44,
    priceDollarsPerTherm: 2.46,
    releaseDate: '2025-09-30',
    notes: 'Historical July 2025 benchmark for YoY comparisons ($25.44/Mcf).',
  },
  '2025-05': {
    period: '2025-05',
    formattedMonth: 'May 2025',
    priceDollarsPerMcf: 19.24,
    priceDollarsPerTherm: 1.86,
    releaseDate: '2026-08-31',
    notes: 'Historical May 2025 benchmark for May YoY comparisons ($19.24/Mcf).',
  },
};

/**
 * Format a therm price with the required EIA heat-content caveat.
 */
export function formatThermApproximate(priceDollarsPerTherm: number): string {
  return `≈ $${priceDollarsPerTherm.toFixed(2)}/therm using EIA's 2026 average heat-content conversion of 1,036 Btu/cf`;
}
