import 'server-only';

import {
  getLatestResidentialRatesForAllStates,
  getReadDatabaseClient,
  type StateRateDTO,
  US_GEOGRAPHIES,
} from '@energy-bill-lab/database';
import { unstable_cache } from 'next/cache';

import { BUNDLED_STATE_RATES_SNAPSHOT } from '@/lib/constants/state-rates-snapshot';

export type RateDataProvenance =
  | {
      status: 'live_database';
      sourcePeriod: string;
      sourceName: string;
    }
  | {
      status: 'bundled_snapshot';
      sourcePeriod: string;
      sourceName: string;
      snapshotGeneratedAt: string;
    }
  | {
      status: 'unavailable';
    };

export type StateRatesSnapshot = {
  available: boolean;
  provenance: RateDataProvenance;
  rates: Record<string, StateRateDTO>;
  geographies: Array<{ code: string; name: string; slug: string }>;
};

export async function getStateRatesSnapshotUncached(): Promise<StateRatesSnapshot> {
  const geographies = US_GEOGRAPHIES.filter((g) => g.kind === 'state' || g.kind === 'district').map(
    (g) => ({
      code: g.code,
      name: g.name,
      slug: g.slug,
    }),
  );

  const fallbackSnapshot: StateRatesSnapshot = {
    available: true,
    provenance: {
      status: 'bundled_snapshot',
      sourcePeriod: '2026-08',
      sourceName: 'U.S. EIA Electric Power Monthly Table 5.3 / 5.6.A (Form EIA-861M)',
      snapshotGeneratedAt: '2026-10-23',
    },
    rates: BUNDLED_STATE_RATES_SNAPSHOT,
    geographies,
  };

  try {
    const db = getReadDatabaseClient();
    if (!db) {
      return fallbackSnapshot;
    }

    const rates = await getLatestResidentialRatesForAllStates(db);
    const available = Object.keys(rates).length > 0;
    const usRate = rates['US'] || Object.values(rates)[0];

    // Priority 1: live database if available and current (period >= 2026-08)
    if (available && usRate && usRate.period >= '2026-08') {
      return {
        available: true,
        provenance: {
          status: 'live_database',
          sourcePeriod: usRate.period,
          sourceName: 'U.S. EIA Electric Power Monthly Table 5.3 / 5.6.A (Form EIA-861M)',
        },
        rates,
        geographies,
      };
    }

    // Priority 2: canonical verified offline fallback snapshot
    return fallbackSnapshot;
  } catch {
    return fallbackSnapshot;
  }
}

export const getStateRatesSnapshot = unstable_cache(
  getStateRatesSnapshotUncached,
  ['eia-residential-rates-snapshot'],
  {
    revalidate: 86400, // 24 hours
    tags: ['eia-residential-rates'],
  },
);
