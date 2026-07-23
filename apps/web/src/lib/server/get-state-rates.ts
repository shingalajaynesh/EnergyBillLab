import 'server-only';

import {
  getLatestResidentialRatesForAllStates,
  getReadDatabaseClient,
  type StateRateDTO,
  US_GEOGRAPHIES,
} from '@energy-bill-lab/database';
import { unstable_cache } from 'next/cache';

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

  try {
    const db = getReadDatabaseClient();
    if (!db) {
      return {
        available: false,
        provenance: { status: 'unavailable' },
        rates: {},
        geographies,
      };
    }

    const rates = await getLatestResidentialRatesForAllStates(db);
    const available = Object.keys(rates).length > 0;
    const usRate = rates['US'] || Object.values(rates)[0];

    return {
      available,
      provenance:
        available && usRate
          ? {
              status: 'live_database',
              sourcePeriod: usRate.period,
              sourceName: 'U.S. EIA Form EIA-861M',
            }
          : { status: 'unavailable' },
      rates: available ? rates : {},
      geographies,
    };
  } catch {
    return {
      available: false,
      provenance: { status: 'unavailable' },
      rates: {},
      geographies,
    };
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
