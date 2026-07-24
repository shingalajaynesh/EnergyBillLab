import 'server-only';

import {
  getNationalReportRawData,
  getReadDatabaseClient,
  US_GEOGRAPHIES,
} from '@energy-bill-lab/database';
import { unstable_cache } from 'next/cache';

import { isApprovedStateSlug } from '@/config/published-states';
import { formatSourcePeriod } from '@/lib/server/get-state-page-data';
import type { RateDataProvenance } from '@/lib/server/get-state-rates';

export type StateRateRanking = {
  rank: number;
  code: string;
  name: string;
  slug: string;
  isPublished: boolean;
  priceCentsPerKwh: number;
  period: string;
  periodFormatted: string;
};

export type StateRateChange = {
  code: string;
  name: string;
  slug: string;
  isPublished: boolean;
  currentRateCents: number;
  previousRateCents: number;
  changeCents: number;
  changePercent: number;
  currentPeriod: string;
  previousPeriod: string;
};

export type HouseholdCostComparison = {
  kwh: number;
  label: string;
  nationalCostUsd: number | null;
  highestStateCostUsd: number | null;
  highestStateName: string | null;
  lowestStateCostUsd: number | null;
  lowestStateName: string | null;
};

export type NationalRateReportModel = {
  available: boolean;
  reportingPeriod: string | null;
  reportingPeriodFormatted: string | null;
  generatedAt: string;
  provenance: RateDataProvenance;
  nationalAverageCentsPerKwh: number | null;
  statesIncludedCount: number;
  statesExcluded: Array<{
    code: string;
    name: string;
    reason: string;
  }>;
  highestRates: StateRateRanking[];
  lowestRates: StateRateRanking[];
  largestMonthlyIncreases: StateRateChange[];
  largestMonthlyDecreases: StateRateChange[];
  largestAnnualIncreases: StateRateChange[];
  largestAnnualDecreases: StateRateChange[];
  householdExamples: HouseholdCostComparison[];
  rateSpreadCents: number | null;
  rateSpreadRatio: number | null;
};

export async function getNationalRateReportUncached(): Promise<NationalRateReportModel> {
  const generatedAt = new Date().toISOString();

  try {
    const db = getReadDatabaseClient();
    if (!db) {
      return createUnavailableReportModel(generatedAt);
    }

    const { commonPeriod, nationalAverageCentsPerKwh, rows } = await getNationalReportRawData(db);
    if (!commonPeriod || rows.length === 0) {
      return createUnavailableReportModel(generatedAt);
    }

    const commonPeriodFormatted = formatSourcePeriod(commonPeriod);

    // Process state rankings
    const stateList: Array<{
      code: string;
      name: string;
      slug: string;
      isPublished: boolean;
      priceCentsPerKwh: number;
      period: string;
      monthlyChangeCents: number | null;
      monthlyChangePercent: number | null;
      annualChangeCents: number | null;
      annualChangePercent: number | null;
      prevMonthPeriod: string | null;
      prevYearPeriod: string | null;
    }> = [];

    for (const r of rows) {
      const price = parseFloat(r.priceCentsPerKwh);
      if (isNaN(price)) continue;

      const slug = r.slug || r.code.toLowerCase();
      const isPublished = isApprovedStateSlug(slug);

      // Monthly change calculation
      let monthlyChangeCents: number | null = null;
      let monthlyChangePercent: number | null = null;
      if (r.previousMonthRateCents) {
        const pmRate = parseFloat(r.previousMonthRateCents);
        if (!isNaN(pmRate) && pmRate > 0) {
          monthlyChangeCents = price - pmRate;
          monthlyChangePercent = (monthlyChangeCents / pmRate) * 100;
        }
      }

      // Annual change calculation
      let annualChangeCents: number | null = null;
      let annualChangePercent: number | null = null;
      if (r.previousYearRateCents) {
        const pyRate = parseFloat(r.previousYearRateCents);
        if (!isNaN(pyRate) && pyRate > 0) {
          annualChangeCents = price - pyRate;
          annualChangePercent = (annualChangeCents / pyRate) * 100;
        }
      }

      stateList.push({
        code: r.code,
        name: r.name,
        slug,
        isPublished,
        priceCentsPerKwh: price,
        period: r.period,
        monthlyChangeCents,
        monthlyChangePercent,
        annualChangeCents,
        annualChangePercent,
        prevMonthPeriod: r.previousMonthPeriod || null,
        prevYearPeriod: r.previousYearPeriod || null,
      });
    }

    // Sort by rate descending for rankings
    const sortedDescending = [...stateList].sort((a, b) => b.priceCentsPerKwh - a.priceCentsPerKwh);
    const sortedAscending = [...stateList].sort((a, b) => a.priceCentsPerKwh - b.priceCentsPerKwh);

    const highestRates: StateRateRanking[] = sortedDescending.slice(0, 10).map((s, idx) => ({
      rank: idx + 1,
      code: s.code,
      name: s.name,
      slug: s.slug,
      isPublished: s.isPublished,
      priceCentsPerKwh: s.priceCentsPerKwh,
      period: s.period,
      periodFormatted: commonPeriodFormatted,
    }));

    const lowestRates: StateRateRanking[] = sortedAscending.slice(0, 10).map((s, idx) => ({
      rank: idx + 1,
      code: s.code,
      name: s.name,
      slug: s.slug,
      isPublished: s.isPublished,
      priceCentsPerKwh: s.priceCentsPerKwh,
      period: s.period,
      periodFormatted: commonPeriodFormatted,
    }));

    // Monthly change rankings (only states with valid monthly changes)
    const validMonthly = stateList.filter(
      (s) => s.monthlyChangeCents !== null && s.monthlyChangePercent !== null,
    );

    const largestMonthlyIncreases: StateRateChange[] = [...validMonthly]
      .sort((a, b) => (b.monthlyChangeCents || 0) - (a.monthlyChangeCents || 0))
      .filter((s) => (s.monthlyChangeCents || 0) > 0)
      .slice(0, 5)
      .map((s) => ({
        code: s.code,
        name: s.name,
        slug: s.slug,
        isPublished: s.isPublished,
        currentRateCents: s.priceCentsPerKwh,
        previousRateCents: s.priceCentsPerKwh - (s.monthlyChangeCents || 0),
        changeCents: s.monthlyChangeCents!,
        changePercent: s.monthlyChangePercent!,
        currentPeriod: commonPeriod,
        previousPeriod: s.prevMonthPeriod || '',
      }));

    const largestMonthlyDecreases: StateRateChange[] = [...validMonthly]
      .sort((a, b) => (a.monthlyChangeCents || 0) - (b.monthlyChangeCents || 0))
      .filter((s) => (s.monthlyChangeCents || 0) < 0)
      .slice(0, 5)
      .map((s) => ({
        code: s.code,
        name: s.name,
        slug: s.slug,
        isPublished: s.isPublished,
        currentRateCents: s.priceCentsPerKwh,
        previousRateCents: s.priceCentsPerKwh - (s.monthlyChangeCents || 0),
        changeCents: s.monthlyChangeCents!,
        changePercent: s.monthlyChangePercent!,
        currentPeriod: commonPeriod,
        previousPeriod: s.prevMonthPeriod || '',
      }));

    // Annual change rankings (only states with valid annual changes)
    const validAnnual = stateList.filter(
      (s) => s.annualChangeCents !== null && s.annualChangePercent !== null,
    );

    const largestAnnualIncreases: StateRateChange[] = [...validAnnual]
      .sort((a, b) => (b.annualChangeCents || 0) - (a.annualChangeCents || 0))
      .filter((s) => (s.annualChangeCents || 0) > 0)
      .slice(0, 5)
      .map((s) => ({
        code: s.code,
        name: s.name,
        slug: s.slug,
        isPublished: s.isPublished,
        currentRateCents: s.priceCentsPerKwh,
        previousRateCents: s.priceCentsPerKwh - (s.annualChangeCents || 0),
        changeCents: s.annualChangeCents!,
        changePercent: s.annualChangePercent!,
        currentPeriod: commonPeriod,
        previousPeriod: s.prevYearPeriod || '',
      }));

    const largestAnnualDecreases: StateRateChange[] = [...validAnnual]
      .sort((a, b) => (a.annualChangeCents || 0) - (b.annualChangeCents || 0))
      .filter((s) => (s.annualChangeCents || 0) < 0)
      .slice(0, 5)
      .map((s) => ({
        code: s.code,
        name: s.name,
        slug: s.slug,
        isPublished: s.isPublished,
        currentRateCents: s.priceCentsPerKwh,
        previousRateCents: s.priceCentsPerKwh - (s.annualChangeCents || 0),
        changeCents: s.annualChangeCents!,
        changePercent: s.annualChangePercent!,
        currentPeriod: commonPeriod,
        previousPeriod: s.prevYearPeriod || '',
      }));

    // Excluded states check (50 total U.S. states)
    const allStateGeographies = US_GEOGRAPHIES.filter((g) => g.kind === 'state');
    const includedCodes = new Set(stateList.map((s) => s.code));
    const statesExcluded: Array<{ code: string; name: string; reason: string }> = [];

    for (const g of allStateGeographies) {
      if (!includedCodes.has(g.code)) {
        statesExcluded.push({
          code: g.code,
          name: g.name,
          reason: `No validated residential rate reported by U.S. EIA for period ${commonPeriod}.`,
        });
      }
    }

    // High & Low state bounds for household cost calculations
    const highestState = sortedDescending[0] || null;
    const lowestState = sortedAscending[0] || null;

    const rateSpreadCents =
      highestState && lowestState
        ? highestState.priceCentsPerKwh - lowestState.priceCentsPerKwh
        : null;
    const rateSpreadRatio =
      highestState && lowestState && lowestState.priceCentsPerKwh > 0
        ? highestState.priceCentsPerKwh / lowestState.priceCentsPerKwh
        : null;

    const householdKwhLevels = [
      { kwh: 500, label: '500 kWh / month (Small Apartment / Low Usage)' },
      { kwh: 800, label: '800 kWh / month (Medium Home / Efficient Household)' },
      { kwh: 1000, label: '1,000 kWh / month (Standard U.S. Household Baseline)' },
      { kwh: 1500, label: '1,500 kWh / month (Large Home / All-Electric / High AC)' },
    ];

    const householdExamples: HouseholdCostComparison[] = householdKwhLevels.map((lvl) => ({
      kwh: lvl.kwh,
      label: lvl.label,
      nationalCostUsd: nationalAverageCentsPerKwh
        ? (lvl.kwh * nationalAverageCentsPerKwh) / 100
        : null,
      highestStateCostUsd: highestState ? (lvl.kwh * highestState.priceCentsPerKwh) / 100 : null,
      highestStateName: highestState ? highestState.name : null,
      lowestStateCostUsd: lowestState ? (lvl.kwh * lowestState.priceCentsPerKwh) / 100 : null,
      lowestStateName: lowestState ? lowestState.name : null,
    }));

    return {
      available: true,
      reportingPeriod: commonPeriod,
      reportingPeriodFormatted: commonPeriodFormatted,
      generatedAt,
      provenance: {
        status: 'live_database',
        sourcePeriod: commonPeriod,
        sourceName: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
      },
      nationalAverageCentsPerKwh,
      statesIncludedCount: stateList.length,
      statesExcluded,
      highestRates,
      lowestRates,
      largestMonthlyIncreases,
      largestMonthlyDecreases,
      largestAnnualIncreases,
      largestAnnualDecreases,
      householdExamples,
      rateSpreadCents,
      rateSpreadRatio,
    };
  } catch {
    return createUnavailableReportModel(generatedAt);
  }
}

function createUnavailableReportModel(generatedAt: string): NationalRateReportModel {
  return {
    available: false,
    reportingPeriod: null,
    reportingPeriodFormatted: null,
    generatedAt,
    provenance: { status: 'unavailable' },
    nationalAverageCentsPerKwh: null,
    statesIncludedCount: 0,
    statesExcluded: [],
    highestRates: [],
    lowestRates: [],
    largestMonthlyIncreases: [],
    largestMonthlyDecreases: [],
    largestAnnualIncreases: [],
    largestAnnualDecreases: [],
    householdExamples: [],
    rateSpreadCents: null,
    rateSpreadRatio: null,
  };
}

export const getNationalRateReport = unstable_cache(
  getNationalRateReportUncached,
  ['eia-national-rate-report'],
  {
    revalidate: 86400, // 24 hours
    tags: ['eia-national-rate-report'],
  },
);
