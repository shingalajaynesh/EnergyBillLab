import 'server-only';

import {
  getLatestResidentialRateByStateCode,
  getNationalResidentialRate,
  getReadDatabaseClient,
  getResidentialRateHistory,
  type StateRateDTO,
} from '@energy-bill-lab/database';
import { unstable_cache } from 'next/cache';

import { FIRST_TEN_STATES, type FirstTenStateConfig } from '@/config/first-ten-states';
import type { RateDataProvenance } from '@/lib/server/get-state-rates';

export type HouseholdCostExample = {
  kwh: number;
  label: string;
  monthlyEnergyCostUsd: number;
};

export type HistoryRowViewModel = {
  period: string;
  periodFormatted: string;
  priceCentsPerKwh: number;
  changeCents: number | null;
  isConsecutive: boolean;
};

export type StatePageViewModel = {
  slug: string;
  config: FirstTenStateConfig;
  hasData: boolean;
  provenance: RateDataProvenance;
  latestStateRate: StateRateDTO | null;
  latestNationalRate: StateRateDTO | null;
  differenceCents: number | null;
  percentageDifference: number | null;
  comparisonDirection: 'above' | 'below' | 'equal' | 'unavailable';
  comparisonDirectionText: string;
  isPeriodMatched: boolean;
  periodMismatchNotice: string | null;
  householdExamples: HouseholdCostExample[];
  history: HistoryRowViewModel[];
  latestSourceMonthFormatted: string | null;
  dataStatusText: string;
};

export function calculateHouseholdCostExamples(priceCentsPerKwh: number): HouseholdCostExample[] {
  const brackets = [
    { kwh: 500, label: '500 kWh / month (Apartment / Small Home)' },
    { kwh: 800, label: '800 kWh / month (Medium Home / Efficient Usage)' },
    { kwh: 1000, label: '1,000 kWh / month (Standard U.S. Household Baseline)' },
    { kwh: 1500, label: '1,500 kWh / month (Large Home / All-Electric / High AC)' },
  ];

  return brackets.map((b) => ({
    kwh: b.kwh,
    label: b.label,
    monthlyEnergyCostUsd: (b.kwh * priceCentsPerKwh) / 100,
  }));
}

export function normalizePeriodYearMonth(period: string): string {
  if (!period) return '';
  const match = period.match(/^(\d{4}-\d{2})/);
  return match ? match[1]! : period;
}

export function formatSourcePeriod(period: string): string {
  const ym = normalizePeriodYearMonth(period);
  if (!/^\d{4}-\d{2}$/.test(ym)) return period;
  const [yearStr, monthStr] = ym.split('-');
  const year = parseInt(yearStr || '0', 10);
  const month = parseInt(monthStr || '0', 10);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function isConsecutiveCalendarMonth(newerPeriod: string, olderPeriod: string): boolean {
  const ym1 = normalizePeriodYearMonth(newerPeriod);
  const ym2 = normalizePeriodYearMonth(olderPeriod);
  if (!/^\d{4}-\d{2}$/.test(ym1) || !/^\d{4}-\d{2}$/.test(ym2)) return false;
  const [y1, m1] = ym1.split('-').map(Number);
  const [y2, m2] = ym2.split('-').map(Number);
  if (!y1 || !m1 || !y2 || !m2) return false;

  const monthDiff = (y1 - y2) * 12 + (m1 - m2);
  return monthDiff === 1;
}

export async function getStatePageDataUncached(slug: string): Promise<StatePageViewModel | null> {
  const normalizedSlug = slug.toLowerCase();
  const config = FIRST_TEN_STATES[normalizedSlug];
  if (!config) return null;

  try {
    const db = getReadDatabaseClient();
    if (!db) {
      return createUnavailableStateViewModel(config);
    }

    const [latestStateRate, latestNationalRate, rawHistory] = await Promise.all([
      getLatestResidentialRateByStateCode(db, config.code),
      getNationalResidentialRate(db),
      getResidentialRateHistory(db, config.code, 25),
    ]);

    if (!latestStateRate) {
      return createUnavailableStateViewModel(config);
    }

    let differenceCents: number | null = null;
    let percentageDifference: number | null = null;
    let comparisonDirection: StatePageViewModel['comparisonDirection'] = 'unavailable';
    let comparisonDirectionText = 'Comparison data temporarily unavailable';
    let isPeriodMatched = true;
    let periodMismatchNotice: string | null = null;

    if (latestNationalRate && latestNationalRate.priceCentsPerKwh > 0) {
      differenceCents = latestStateRate.priceCentsPerKwh - latestNationalRate.priceCentsPerKwh;
      percentageDifference = (differenceCents / latestNationalRate.priceCentsPerKwh) * 100;

      if (Math.abs(differenceCents) < 0.01) {
        comparisonDirection = 'equal';
        comparisonDirectionText = 'approximately equal to the U.S. national average';
      } else if (differenceCents > 0) {
        comparisonDirection = 'above';
        comparisonDirectionText = `${Math.abs(percentageDifference).toFixed(1)}% above the U.S. national average`;
      } else {
        comparisonDirection = 'below';
        comparisonDirectionText = `${Math.abs(percentageDifference).toFixed(1)}% below the U.S. national average`;
      }

      if (latestStateRate.period !== latestNationalRate.period) {
        isPeriodMatched = false;
        periodMismatchNotice = `Note: ${config.name} state rate data is for ${formatSourcePeriod(latestStateRate.period)}, while the U.S. national benchmark is for ${formatSourcePeriod(latestNationalRate.period)}.`;
      }
    }

    const householdExamples = calculateHouseholdCostExamples(latestStateRate.priceCentsPerKwh);

    // Format historical trend rows (newest first; fetch 25 to provide baseline for row 24)
    const history: HistoryRowViewModel[] = rawHistory.slice(0, 24).map((item, idx) => {
      const prevItem = rawHistory[idx + 1];
      const isConsecutive = prevItem
        ? isConsecutiveCalendarMonth(item.period, prevItem.period)
        : false;
      const changeCents =
        isConsecutive && prevItem ? item.priceCentsPerKwh - prevItem.priceCentsPerKwh : null;

      return {
        period: item.period,
        periodFormatted: formatSourcePeriod(item.period),
        priceCentsPerKwh: item.priceCentsPerKwh,
        changeCents,
        isConsecutive,
      };
    });

    const latestSourceMonthFormatted = formatSourcePeriod(latestStateRate.period);

    return {
      slug: config.slug,
      config,
      hasData: true,
      provenance: {
        status: 'live_database',
        sourcePeriod: latestStateRate.period,
        sourceName: 'U.S. EIA Form EIA-861M',
      },
      latestStateRate,
      latestNationalRate,
      differenceCents,
      percentageDifference,
      comparisonDirection,
      comparisonDirectionText,
      isPeriodMatched,
      periodMismatchNotice,
      householdExamples,
      history,
      latestSourceMonthFormatted,
      dataStatusText: `Verified database rate for ${latestSourceMonthFormatted}.`,
    };
  } catch {
    return createUnavailableStateViewModel(config);
  }
}

function createUnavailableStateViewModel(config: FirstTenStateConfig): StatePageViewModel {
  return {
    slug: config.slug,
    config,
    hasData: false,
    provenance: { status: 'unavailable' },
    latestStateRate: null,
    latestNationalRate: null,
    differenceCents: null,
    percentageDifference: null,
    comparisonDirection: 'unavailable',
    comparisonDirectionText: 'Current state-rate data could not be loaded.',
    isPeriodMatched: false,
    periodMismatchNotice: null,
    householdExamples: [],
    history: [],
    latestSourceMonthFormatted: null,
    dataStatusText:
      'Current state-rate data could not be loaded. No estimated or placeholder rate is being displayed. You can continue using manual rate entry in our calculators.',
  };
}

export function getStatePageData(slug: string): Promise<StatePageViewModel | null> {
  return unstable_cache(
    () => getStatePageDataUncached(slug),
    ['state-page-data', slug.toLowerCase()],
    {
      revalidate: 86400, // 24 hours
      tags: ['eia-residential-rates', `state-rate-${slug.toLowerCase()}`],
    },
  )();
}
