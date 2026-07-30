import {
  getLatestNationalNaturalGasRate,
  getLatestNaturalGasRatesForAllStates,
  getNationalNaturalGasHistory,
  getNaturalGasCommonPeriod,
  getNaturalGasDataStatus,
  getReadDatabaseClient,
  type NaturalGasRateDTO,
} from '@energy-bill-lab/database';

export type ComparisonCohortViewModel = {
  latestNationalPeriod: string | null;
  latestCommonPeriod: string | null;
  eligibleStatesCount: number;
  eligibleStateCodes: string[];
  excludedStatesCount: number;
  excludedStateCodes: string[];
  exclusionReason: string;
};

export type NaturalGasTrendRowDTO = NaturalGasRateDTO & {
  formattedMonth: string;
  momChangeDollarsPerMcf: number | null;
  momChangePercent: number | null;
  yoyChangeDollarsPerMcf: number | null;
  yoyChangePercent: number | null;
};

export type NaturalGasHubViewModel = {
  hasData: boolean;
  isVerified: boolean;
  latestNationalRate: NaturalGasRateDTO | null;
  history: NaturalGasRateDTO[];
  trend: NaturalGasTrendRowDTO[];
  stateRates: Record<string, NaturalGasRateDTO>;
  latestSourceMonthFormatted: string | null;
  dataStatusText: string;
  comparisonCohort: ComparisonCohortViewModel;
};

export function isNaturalGasDataVerified(
  data: Partial<NaturalGasHubViewModel> | null | undefined,
): boolean {
  if (!data || !data.hasData || !data.latestNationalRate) {
    return false;
  }

  const rate = data.latestNationalRate;

  const validPeriod = typeof rate.period === 'string' && /^\d{4}-\d{2}/.test(rate.period);
  const validMcf =
    typeof rate.priceDollarsPerMcf === 'number' &&
    Number.isFinite(rate.priceDollarsPerMcf) &&
    rate.priceDollarsPerMcf > 0;
  const validTherm =
    typeof rate.priceDollarsPerTherm === 'number' &&
    Number.isFinite(rate.priceDollarsPerTherm) &&
    rate.priceDollarsPerTherm > 0;
  const validSource = rate.source === 'EIA';

  return validPeriod && validMcf && validTherm && validSource;
}

export function buildHistoricalTrendRows(history: NaturalGasRateDTO[]): NaturalGasTrendRowDTO[] {
  // Filter history starting no earlier than 2024-06
  const filtered = history.filter((r) => r.period >= '2024-06');

  // Sort chronological ascending (oldest to newest) to populate map and compute changes
  const chronological = [...filtered].sort((a, b) => a.period.localeCompare(b.period));

  const periodMap = new Map<string, NaturalGasRateDTO>();
  for (const r of chronological) {
    const periodKey = r.period.substring(0, 7); // "YYYY-MM"
    periodMap.set(periodKey, r);
  }

  const result: NaturalGasTrendRowDTO[] = [];

  for (const curr of chronological) {
    const periodKey = curr.period.substring(0, 7);
    const parts = periodKey.split('-');
    const year = parseInt(parts[0] || '0', 10);
    const month = parseInt(parts[1] || '0', 10);

    let formattedMonth = periodKey;
    if (year > 0 && month > 0) {
      const dateObj = new Date(year, month - 1, 1);
      formattedMonth = dateObj.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
    }

    // MoM previous period key
    let prevPeriodKey: string;
    if (month === 1) {
      prevPeriodKey = `${year - 1}-12`;
    } else {
      prevPeriodKey = `${year}-${String(month - 1).padStart(2, '0')}`;
    }

    // YoY previous period key
    const yoyPeriodKey = `${year - 1}-${String(month).padStart(2, '0')}`;

    const prevRow = periodMap.get(prevPeriodKey);
    const yoyRow = periodMap.get(yoyPeriodKey);

    let momChangeDollarsPerMcf: number | null = null;
    let momChangePercent: number | null = null;
    if (prevRow && prevRow.priceDollarsPerMcf > 0) {
      const diff = curr.priceDollarsPerMcf - prevRow.priceDollarsPerMcf;
      momChangeDollarsPerMcf = Number(diff.toFixed(4));
      momChangePercent = Number(((diff / prevRow.priceDollarsPerMcf) * 100).toFixed(2));
    }

    let yoyChangeDollarsPerMcf: number | null = null;
    let yoyChangePercent: number | null = null;
    if (yoyRow && yoyRow.priceDollarsPerMcf > 0) {
      const diff = curr.priceDollarsPerMcf - yoyRow.priceDollarsPerMcf;
      yoyChangeDollarsPerMcf = Number(diff.toFixed(4));
      yoyChangePercent = Number(((diff / yoyRow.priceDollarsPerMcf) * 100).toFixed(2));
    }

    result.push({
      ...curr,
      formattedMonth,
      momChangeDollarsPerMcf,
      momChangePercent,
      yoyChangeDollarsPerMcf,
      yoyChangePercent,
    });
  }

  // Return newest first (descending) for display
  return result.sort((a, b) => b.period.localeCompare(a.period));
}

export async function getNaturalGasHubData(): Promise<NaturalGasHubViewModel> {
  const db = getReadDatabaseClient();

  const emptyCohort: ComparisonCohortViewModel = {
    latestNationalPeriod: null,
    latestCommonPeriod: null,
    eligibleStatesCount: 0,
    eligibleStateCodes: [],
    excludedStatesCount: 50,
    excludedStateCodes: [],
    exclusionReason: 'No verified database observations available.',
  };

  if (!db) {
    return {
      hasData: false,
      isVerified: false,
      latestNationalRate: null,
      history: [],
      trend: [],
      stateRates: {},
      latestSourceMonthFormatted: null,
      dataStatusText:
        'Official U.S. residential natural gas rate data is currently being synchronized. No estimated or placeholder rate metrics are displayed.',
      comparisonCohort: emptyCohort,
    };
  }

  try {
    const status = await getNaturalGasDataStatus(db);
    if (status.status !== 'available' || !status.latestAvailablePeriod) {
      return {
        hasData: false,
        isVerified: false,
        latestNationalRate: null,
        history: [],
        trend: [],
        stateRates: {},
        latestSourceMonthFormatted: null,
        dataStatusText:
          'Official U.S. residential natural gas rate dataset is initializing. No estimated or placeholder rate metrics are displayed.',
        comparisonCohort: emptyCohort,
      };
    }

    const [nationalRate, history, stateRates, commonPeriodInfo] = await Promise.all([
      getLatestNationalNaturalGasRate(db),
      getNationalNaturalGasHistory(db, 36),
      getLatestNaturalGasRatesForAllStates(db),
      getNaturalGasCommonPeriod(db),
    ]);

    let latestSourceMonthFormatted: string | null = null;
    if (nationalRate?.period) {
      const [yearStr, monthStr] = nationalRate.period.split('-');
      if (yearStr && monthStr) {
        const dateObj = new Date(parseInt(yearStr, 10), parseInt(monthStr, 10) - 1, 1);
        latestSourceMonthFormatted = dateObj.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        });
      }
    }

    const trend = buildHistoricalTrendRows(history);

    const allStateCodes = Object.keys(stateRates).filter((c) => c !== 'US');
    const commonPeriod = commonPeriodInfo.latestCommonPeriod || nationalRate?.period || null;

    const eligibleStateCodes = allStateCodes.filter(
      (code) => stateRates[code]?.period === commonPeriod,
    );
    const excludedStateCodes = allStateCodes.filter(
      (code) => stateRates[code]?.period !== commonPeriod,
    );

    const comparisonCohort: ComparisonCohortViewModel = {
      latestNationalPeriod: commonPeriodInfo.latestNationalPeriod || nationalRate?.period || null,
      latestCommonPeriod: commonPeriod,
      eligibleStatesCount: eligibleStateCodes.length,
      eligibleStateCodes,
      excludedStatesCount: excludedStateCodes.length,
      excludedStateCodes,
      exclusionReason:
        excludedStateCodes.length > 0
          ? `Missing verified residential natural gas price reporting for period ${commonPeriod}.`
          : 'All reporting states present for common period.',
    };

    const rawModel = {
      hasData: true,
      isVerified: false,
      latestNationalRate: nationalRate,
      history,
      trend,
      stateRates,
      latestSourceMonthFormatted,
      dataStatusText: latestSourceMonthFormatted
        ? `Based on U.S. Energy Information Administration (EIA) Form EIA-857 monthly data for ${latestSourceMonthFormatted}.`
        : 'Based on U.S. EIA monthly residential natural gas retail prices.',
      comparisonCohort,
    };

    rawModel.isVerified = isNaturalGasDataVerified(rawModel);

    return rawModel;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Failed to query natural gas hub data:', msg);

    return {
      hasData: false,
      isVerified: false,
      latestNationalRate: null,
      history: [],
      trend: [],
      stateRates: {},
      latestSourceMonthFormatted: null,
      dataStatusText:
        'Official natural gas rate data could not be retrieved. You can still use manual rate entries in our calculators.',
      comparisonCohort: emptyCohort,
    };
  }
}
