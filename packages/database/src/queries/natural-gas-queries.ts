import { and, desc, eq, sql } from 'drizzle-orm';

import type { DatabaseInstance } from '../clients/db-client';
import { naturalGasGeographies, naturalGasResidentialPricesMonthly } from '../schema';

export type NaturalGasRateDTO = {
  code: string;
  name: string;
  type: string;
  period: string;
  priceDollarsPerMcf: number;
  priceDollarsPerTherm: number;
  conversionMethod: string;
  conversionAssumptions: string;
  source: string;
  sourceDataset: string;
  importedAt?: string;
};

export type NaturalGasDataStatusDTO = {
  source: string;
  dataset: string;
  latestAvailablePeriod: string | null;
  lastSuccessfulImportAt: string | null;
  geographyCount: number;
  status: 'available' | 'unavailable';
};

interface SqlGasRow extends Record<string, unknown> {
  code: string;
  name: string;
  type: string;
  period: string;
  priceDollarsPerMcf: string | number;
  priceDollarsPerTherm: string | number;
  conversionMethod: string;
  conversionAssumptions: string;
  source: string;
  sourceDataset: string;
  importedAt?: string | Date | null;
}

export async function getLatestNationalNaturalGasRate(
  db: DatabaseInstance,
): Promise<NaturalGasRateDTO | null> {
  try {
    const rows = await db
      .select({
        code: naturalGasGeographies.code,
        name: naturalGasGeographies.name,
        type: naturalGasGeographies.type,
        period: naturalGasResidentialPricesMonthly.period,
        priceDollarsPerMcf: naturalGasResidentialPricesMonthly.priceDollarsPerMcf,
        priceDollarsPerTherm: naturalGasResidentialPricesMonthly.priceDollarsPerTherm,
        conversionMethod: naturalGasResidentialPricesMonthly.conversionMethod,
        conversionAssumptions: naturalGasResidentialPricesMonthly.conversionAssumptions,
        source: naturalGasResidentialPricesMonthly.source,
        sourceDataset: naturalGasResidentialPricesMonthly.sourceDataset,
        importedAt: naturalGasResidentialPricesMonthly.importedAt,
      })
      .from(naturalGasResidentialPricesMonthly)
      .innerJoin(
        naturalGasGeographies,
        eq(naturalGasResidentialPricesMonthly.geographyCode, naturalGasGeographies.code),
      )
      .where(
        and(
          eq(naturalGasGeographies.code, 'US'),
          eq(naturalGasResidentialPricesMonthly.sector, 'RES'),
        ),
      )
      .orderBy(desc(naturalGasResidentialPricesMonthly.period))
      .limit(1);

    if (rows.length === 0 || !rows[0]) return null;
    const r = rows[0];

    return {
      code: r.code,
      name: r.name,
      type: r.type,
      period: String(r.period),
      priceDollarsPerMcf: parseFloat(String(r.priceDollarsPerMcf)),
      priceDollarsPerTherm: parseFloat(String(r.priceDollarsPerTherm)),
      conversionMethod: String(r.conversionMethod || 'EIA_HEAT_CONTENT_1036_BTU'),
      conversionAssumptions: String(
        r.conversionAssumptions ||
          '1 Mcf = 1,036,000 Btu = 10.36 therms (1036 Btu/cu ft average heat content)',
      ),
      source: r.source,
      sourceDataset: r.sourceDataset,
      importedAt: r.importedAt ? new Date(r.importedAt).toISOString() : undefined,
    };
  } catch {
    return null;
  }
}

export async function getLatestNaturalGasRatesForAllStates(
  db: DatabaseInstance,
): Promise<Record<string, NaturalGasRateDTO>> {
  try {
    const rows = await db.execute<SqlGasRow>(sql`
      SELECT DISTINCT ON (g.code)
        g.code,
        g.name,
        g.type,
        r.period::text as period,
        r.price_dollars_per_mcf as "priceDollarsPerMcf",
        r.price_dollars_per_therm as "priceDollarsPerTherm",
        r.conversion_method as "conversionMethod",
        r.conversion_assumptions as "conversionAssumptions",
        r.source,
        r.source_dataset as "sourceDataset",
        r.imported_at as "importedAt"
      FROM natural_gas_geographies g
      INNER JOIN natural_gas_residential_prices_monthly r ON r.geography_code = g.code
      WHERE r.sector = 'RES'
      ORDER BY g.code, r.period DESC
    `);

    const result: Record<string, NaturalGasRateDTO> = {};
    const rawList = Array.isArray(rows.rows) ? rows.rows : (rows as unknown as SqlGasRow[]);

    for (const r of rawList) {
      result[r.code] = {
        code: String(r.code),
        name: String(r.name),
        type: String(r.type),
        period: String(r.period),
        priceDollarsPerMcf: parseFloat(String(r.priceDollarsPerMcf)),
        priceDollarsPerTherm: parseFloat(String(r.priceDollarsPerTherm)),
        conversionMethod: String(r.conversionMethod || 'EIA_HEAT_CONTENT_1036_BTU'),
        conversionAssumptions: String(
          r.conversionAssumptions ||
            '1 Mcf = 1,036,000 Btu = 10.36 therms (1036 Btu/cu ft average heat content)',
        ),
        source: String(r.source),
        sourceDataset: String(r.sourceDataset),
        importedAt: r.importedAt ? new Date(r.importedAt).toISOString() : undefined,
      };
    }

    return result;
  } catch {
    return {};
  }
}

export async function getNationalNaturalGasHistory(
  db: DatabaseInstance,
  months = 24,
): Promise<NaturalGasRateDTO[]> {
  try {
    const boundedMonths = Math.min(Math.max(1, months), 120);

    const rows = await db
      .select({
        code: naturalGasGeographies.code,
        name: naturalGasGeographies.name,
        type: naturalGasGeographies.type,
        period: naturalGasResidentialPricesMonthly.period,
        priceDollarsPerMcf: naturalGasResidentialPricesMonthly.priceDollarsPerMcf,
        priceDollarsPerTherm: naturalGasResidentialPricesMonthly.priceDollarsPerTherm,
        conversionMethod: naturalGasResidentialPricesMonthly.conversionMethod,
        conversionAssumptions: naturalGasResidentialPricesMonthly.conversionAssumptions,
        source: naturalGasResidentialPricesMonthly.source,
        sourceDataset: naturalGasResidentialPricesMonthly.sourceDataset,
        importedAt: naturalGasResidentialPricesMonthly.importedAt,
      })
      .from(naturalGasResidentialPricesMonthly)
      .innerJoin(
        naturalGasGeographies,
        eq(naturalGasResidentialPricesMonthly.geographyCode, naturalGasGeographies.code),
      )
      .where(
        and(
          eq(naturalGasGeographies.code, 'US'),
          eq(naturalGasResidentialPricesMonthly.sector, 'RES'),
        ),
      )
      .orderBy(desc(naturalGasResidentialPricesMonthly.period))
      .limit(boundedMonths);

    return rows.map((r) => ({
      code: r.code,
      name: r.name,
      type: r.type,
      period: String(r.period),
      priceDollarsPerMcf: parseFloat(String(r.priceDollarsPerMcf)),
      priceDollarsPerTherm: parseFloat(String(r.priceDollarsPerTherm)),
      conversionMethod: String(r.conversionMethod || 'EIA_HEAT_CONTENT_1036_BTU'),
      conversionAssumptions: String(
        r.conversionAssumptions ||
          '1 Mcf = 1,036,000 Btu = 10.36 therms (1036 Btu/cu ft average heat content)',
      ),
      source: r.source,
      sourceDataset: r.sourceDataset,
      importedAt: r.importedAt ? new Date(r.importedAt).toISOString() : undefined,
    }));
  } catch {
    return [];
  }
}

export async function getNaturalGasDataStatus(
  db: DatabaseInstance,
): Promise<NaturalGasDataStatusDTO> {
  try {
    interface StatusRow extends Record<string, unknown> {
      latestPeriod?: string | null;
      lastImport?: Date | string | null;
      geographyCount?: string | number | null;
    }

    const stats = await db.execute<StatusRow>(sql`
      SELECT 
        MAX(period)::text as "latestPeriod",
        MAX(imported_at) as "lastImport",
        COUNT(DISTINCT geography_code) as "geographyCount"
      FROM natural_gas_residential_prices_monthly
      WHERE sector = 'RES'
    `);

    const rawRows = Array.isArray(stats.rows) ? stats.rows : (stats as unknown as StatusRow[]);
    const row = rawRows[0];
    const latestPeriod = row?.latestPeriod ? String(row.latestPeriod) : null;
    const lastImport = row?.lastImport ? new Date(row.lastImport).toISOString() : null;
    const count = row?.geographyCount ? Number(row.geographyCount) : 0;

    return {
      source: 'EIA',
      dataset: 'natural-gas/pri/sum',
      latestAvailablePeriod: latestPeriod,
      lastSuccessfulImportAt: lastImport,
      geographyCount: count,
      status: latestPeriod && count > 0 ? 'available' : 'unavailable',
    };
  } catch {
    return {
      source: 'EIA',
      dataset: 'natural-gas/pri/sum',
      latestAvailablePeriod: null,
      lastSuccessfulImportAt: null,
      geographyCount: 0,
      status: 'unavailable',
    };
  }
}

export async function getNaturalGasCommonPeriod(
  db: DatabaseInstance,
): Promise<{ latestNationalPeriod: string | null; latestCommonPeriod: string | null }> {
  try {
    interface PeriodRow extends Record<string, unknown> {
      period?: string | null;
      cnt?: string | number | null;
    }

    const nationalQuery = await db.execute<PeriodRow>(sql`
      SELECT period::text as period
      FROM natural_gas_residential_prices_monthly
      WHERE sector = 'RES' AND geography_code = 'US'
      ORDER BY period DESC
      LIMIT 1
    `);
    const natRows = Array.isArray(nationalQuery.rows)
      ? nationalQuery.rows
      : (nationalQuery as unknown as PeriodRow[]);
    const latestNationalPeriod = natRows[0]?.period ? String(natRows[0].period) : null;

    const commonQuery = await db.execute<PeriodRow>(sql`
      SELECT period::text as period, COUNT(DISTINCT geography_code) as cnt
      FROM natural_gas_residential_prices_monthly
      WHERE sector = 'RES' AND geography_code != 'US'
      GROUP BY period
      HAVING COUNT(DISTINCT geography_code) >= 45
      ORDER BY period DESC
      LIMIT 1
    `);
    const commRows = Array.isArray(commonQuery.rows)
      ? commonQuery.rows
      : (commonQuery as unknown as PeriodRow[]);
    const latestCommonPeriod = commRows[0]?.period
      ? String(commRows[0].period)
      : latestNationalPeriod;

    return {
      latestNationalPeriod,
      latestCommonPeriod,
    };
  } catch {
    return {
      latestNationalPeriod: null,
      latestCommonPeriod: null,
    };
  }
}
