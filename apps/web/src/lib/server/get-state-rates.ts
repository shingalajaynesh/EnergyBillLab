import 'server-only';

import {
  getLatestResidentialRatesForAllStates,
  getReadDatabaseClient,
  type StateRateDTO,
  US_GEOGRAPHIES,
} from '@energy-bill-lab/database';
import { unstable_cache } from 'next/cache';

export type StateRatesSnapshot = {
  available: boolean;
  rates: Record<string, StateRateDTO>;
  geographies: Array<{ code: string; name: string; slug: string }>;
};

async function fetchStateRatesFromDb(): Promise<StateRatesSnapshot> {
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
        rates: {},
        geographies,
      };
    }

    const rates = await getLatestResidentialRatesForAllStates(db);
    const available = Object.keys(rates).length > 0;

    return {
      available,
      rates,
      geographies,
    };
  } catch {
    return {
      available: false,
      rates: {},
      geographies,
    };
  }
}

export const getStateRatesSnapshot = unstable_cache(
  fetchStateRatesFromDb,
  ['eia-residential-rates-snapshot'],
  {
    revalidate: 86400, // 24 hours
    tags: ['eia-residential-rates'],
  },
);
