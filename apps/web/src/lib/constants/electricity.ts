/**
 * Canonical Residential Electricity Source of Truth & Fallback Reference
 *
 * Source: U.S. Energy Information Administration (EIA)
 * National Benchmark: Electric Power Monthly Table 5.3 / Table ES1.A — U.S. Residential Average Retail Price
 * State-Level Benchmark: Electric Power Monthly Table 5.6.A — Average Price of Electricity to Ultimate Customers by End-Use Sector, by State
 * Underlying Survey / Monthly Series: Form EIA-861M / Retail Sales of Electricity
 * Direct URL: https://www.eia.gov/electricity/monthly/
 *
 * IMPORTANT RULES:
 * 1. National residential benchmark uses Electric Power Monthly Table 5.3 / ES1.A.
 * 2. State-level residential values use Electric Power Monthly Table 5.6.A.
 * 3. Underlying monthly survey is Form EIA-861M.
 * 4. Primary runtime source remains the validated database / API data.
 *    This module provides the canonical validated offline fallback.
 */

export interface CanonicalElectricitySnapshot {
  reportingPeriod: string;
  displayPeriod: string;
  reportingPeriodFormatted: string;
  eiaReleaseDate: string;
  releaseDate: string;
  source: string;
  sourceShort: string;
  sourceTable: string;
  sourceNationalTable: string;
  sourceStateTable: string;
  underlyingSurvey: string;
  sourceSurvey: string;
  sourceUrl: string;
  priceCentsPerKwh: number;
  priceDollarsPerKwh: number;
  validationDate: string;
  status: 'verified' | 'current' | 'fallback';
}

export const CANONICAL_ELECTRICITY_SNAPSHOT: CanonicalElectricitySnapshot = {
  reportingPeriod: '2026-08',
  displayPeriod: 'August 2026',
  reportingPeriodFormatted: 'August 2026',
  eiaReleaseDate: '2026-10-23',
  releaseDate: '2026-10-23',
  source:
    'U.S. Energy Information Administration (EIA) Electric Power Monthly Table 5.3 / ES1.A (National Residential Average) and Table 5.6.A (State Residential Retail Prices), Form EIA-861M',
  sourceShort: 'EIA Electric Power Monthly (Table 5.3 & 5.6.A)',
  sourceTable: 'Electric Power Monthly Table 5.3 / Table ES1.A & Table 5.6.A',
  sourceNationalTable: 'Electric Power Monthly Table 5.3 / Table ES1.A',
  sourceStateTable: 'Electric Power Monthly Table 5.6.A',
  underlyingSurvey: 'Form EIA-861M',
  sourceSurvey: 'Form EIA-861M',
  sourceUrl: 'https://www.eia.gov/electricity/monthly/',
  priceCentsPerKwh: 18.16,
  priceDollarsPerKwh: 0.1816,
  validationDate: '2026-10-23',
  status: 'verified',
};

export const DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH =
  CANONICAL_ELECTRICITY_SNAPSHOT.priceCentsPerKwh;

export const DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE = `U.S. residential benchmark — ${CANONICAL_ELECTRICITY_SNAPSHOT.displayPeriod} — U.S. EIA`;

export interface HistoricalElectricityBenchmark {
  period: string;
  formattedMonth: string;
  priceCentsPerKwh: number;
  releaseDate: string;
  notes?: string;
}

/**
 * Historical EIA National Residential Benchmarks
 * Sourced from Electric Power Monthly Table 5.3 / Table ES1.A
 */
export const HISTORICAL_ELECTRICITY_BENCHMARKS: Record<string, HistoricalElectricityBenchmark> = {
  '2026-08': {
    period: '2026-08',
    formattedMonth: 'August 2026',
    priceCentsPerKwh: 18.16,
    releaseDate: '2026-10-23',
    notes: 'Latest published EIA Electric Power Monthly release as of October 23, 2026.',
  },
  '2026-07': {
    period: '2026-07',
    formattedMonth: 'July 2026',
    priceCentsPerKwh: 18.31,
    releaseDate: '2026-09-24',
    notes: 'Published EIA Electric Power Monthly release for July 2026.',
  },
  '2026-06': {
    period: '2026-06',
    formattedMonth: 'June 2026',
    priceCentsPerKwh: 18.34,
    releaseDate: '2026-08-24',
  },
  '2026-05': {
    period: '2026-05',
    formattedMonth: 'May 2026',
    priceCentsPerKwh: 18.44,
    releaseDate: '2026-07-24',
    notes: 'Historical May 2026 benchmark used in August 2026 seasonal insights.',
  },
  '2026-04': {
    period: '2026-04',
    formattedMonth: 'April 2026',
    priceCentsPerKwh: 18.83,
    releaseDate: '2026-06-24',
  },
  '2026-03': {
    period: '2026-03',
    formattedMonth: 'March 2026',
    priceCentsPerKwh: 18.83,
    releaseDate: '2026-05-24',
  },
  '2026-02': {
    period: '2026-02',
    formattedMonth: 'February 2026',
    priceCentsPerKwh: 17.65,
    releaseDate: '2026-04-24',
  },
  '2026-01': {
    period: '2026-01',
    formattedMonth: 'January 2026',
    priceCentsPerKwh: 17.45,
    releaseDate: '2026-03-24',
  },
  '2025-07': {
    period: '2025-07',
    formattedMonth: 'July 2025',
    priceCentsPerKwh: 17.48,
    releaseDate: '2025-09-24',
    notes: 'Prior year benchmark for July YoY calculations.',
  },
};
