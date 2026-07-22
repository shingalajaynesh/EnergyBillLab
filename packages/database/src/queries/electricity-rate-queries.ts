import { and, desc, eq, sql } from 'drizzle-orm';

import type { DatabaseInstance } from '../clients/db-client';
import { VALID_GEOGRAPHY_CODES } from '../constants/us-geographies';
import { electricityGeographies, electricityRetailSalesMonthly } from '../schema';

export type StateRateDTO = {
  code: string;
  slug: string;
  name: string;
  kind: string;
  period: string;
  priceCentsPerKwh: number;
  revenueMillionUsd?: number;
  salesMillionKwh?: number;
  customers?: number;
  source: string;
  sourceDataset: string;
  importedAt?: string;
};

export type RateDataStatusDTO = {
  source: string;
  dataset: string;
  latestAvailablePeriod: string | null;
  lastSuccessfulImportAt: string | null;
  geographyCount: number;
  status: 'available' | 'unavailable';
};

interface SqlRateRow extends Record<string, unknown> {
  code: string;
  slug: string;
  name: string;
  kind: string;
  period: string;
  priceCentsPerKwh: string;
  revenueMillionUsd?: string | null;
  salesMillionKwh?: string | null;
  customers?: string | number | null;
  source: string;
  sourceDataset: string;
  importedAt?: string | Date | null;
}

export async function getLatestResidentialRateByStateCode(
  db: DatabaseInstance,
  stateCode: string,
): Promise<StateRateDTO | null> {
  const normalizedCode = stateCode.toUpperCase();
  if (!VALID_GEOGRAPHY_CODES.has(normalizedCode)) {
    return null;
  }

  const rows = await db
    .select({
      code: electricityGeographies.code,
      slug: electricityGeographies.slug,
      name: electricityGeographies.name,
      kind: electricityGeographies.kind,
      period: electricityRetailSalesMonthly.period,
      priceCentsPerKwh: electricityRetailSalesMonthly.priceCentsPerKwh,
      revenueMillionUsd: electricityRetailSalesMonthly.revenueMillionUsd,
      salesMillionKwh: electricityRetailSalesMonthly.salesMillionKwh,
      customers: electricityRetailSalesMonthly.customers,
      source: electricityRetailSalesMonthly.source,
      sourceDataset: electricityRetailSalesMonthly.sourceDataset,
      importedAt: electricityRetailSalesMonthly.importedAt,
    })
    .from(electricityRetailSalesMonthly)
    .innerJoin(
      electricityGeographies,
      eq(electricityRetailSalesMonthly.geographyCode, electricityGeographies.code),
    )
    .where(
      and(
        eq(electricityGeographies.code, normalizedCode),
        eq(electricityRetailSalesMonthly.sector, 'RES'),
      ),
    )
    .orderBy(desc(electricityRetailSalesMonthly.period))
    .limit(1);

  if (rows.length === 0) return null;
  const r = rows[0];
  if (!r) return null;

  return {
    code: r.code,
    slug: r.slug,
    name: r.name,
    kind: r.kind,
    period: String(r.period),
    priceCentsPerKwh: parseFloat(r.priceCentsPerKwh),
    revenueMillionUsd: r.revenueMillionUsd ? parseFloat(r.revenueMillionUsd) : undefined,
    salesMillionKwh: r.salesMillionKwh ? parseFloat(r.salesMillionKwh) : undefined,
    customers: r.customers ?? undefined,
    source: r.source,
    sourceDataset: r.sourceDataset,
    importedAt: r.importedAt ? new Date(r.importedAt).toISOString() : undefined,
  };
}

export async function getLatestResidentialRatesForAllStates(
  db: DatabaseInstance,
): Promise<Record<string, StateRateDTO>> {
  const rows = await db.execute<SqlRateRow>(sql`
    SELECT DISTINCT ON (g.code)
      g.code,
      g.slug,
      g.name,
      g.kind,
      r.period::text as period,
      r.price_cents_per_kwh as "priceCentsPerKwh",
      r.revenue_million_usd as "revenueMillionUsd",
      r.sales_million_kwh as "salesMillionKwh",
      r.customers,
      r.source,
      r.source_dataset as "sourceDataset",
      r.imported_at as "importedAt"
    FROM electricity_geographies g
    INNER JOIN electricity_retail_sales_monthly r ON r.geography_code = g.code
    WHERE r.sector = 'RES' AND g.is_active = true
    ORDER BY g.code, r.period DESC
  `);

  const result: Record<string, StateRateDTO> = {};
  const rawList = Array.isArray(rows.rows) ? rows.rows : (rows as unknown as SqlRateRow[]);

  for (const r of rawList) {
    result[r.code] = {
      code: r.code,
      slug: r.slug,
      name: r.name,
      kind: r.kind,
      period: r.period,
      priceCentsPerKwh: parseFloat(r.priceCentsPerKwh),
      revenueMillionUsd: r.revenueMillionUsd ? parseFloat(r.revenueMillionUsd) : undefined,
      salesMillionKwh: r.salesMillionKwh ? parseFloat(r.salesMillionKwh) : undefined,
      customers: r.customers ? Number(r.customers) : undefined,
      source: r.source,
      sourceDataset: r.sourceDataset,
      importedAt: r.importedAt ? new Date(r.importedAt).toISOString() : undefined,
    };
  }

  return result;
}

export async function getResidentialRateHistory(
  db: DatabaseInstance,
  stateCode: string,
  months = 24,
): Promise<StateRateDTO[]> {
  const normalizedCode = stateCode.toUpperCase();
  if (!VALID_GEOGRAPHY_CODES.has(normalizedCode)) {
    return [];
  }

  const boundedMonths = Math.min(Math.max(1, months), 120);

  const rows = await db
    .select({
      code: electricityGeographies.code,
      slug: electricityGeographies.slug,
      name: electricityGeographies.name,
      kind: electricityGeographies.kind,
      period: electricityRetailSalesMonthly.period,
      priceCentsPerKwh: electricityRetailSalesMonthly.priceCentsPerKwh,
      revenueMillionUsd: electricityRetailSalesMonthly.revenueMillionUsd,
      salesMillionKwh: electricityRetailSalesMonthly.salesMillionKwh,
      customers: electricityRetailSalesMonthly.customers,
      source: electricityRetailSalesMonthly.source,
      sourceDataset: electricityRetailSalesMonthly.sourceDataset,
      importedAt: electricityRetailSalesMonthly.importedAt,
    })
    .from(electricityRetailSalesMonthly)
    .innerJoin(
      electricityGeographies,
      eq(electricityRetailSalesMonthly.geographyCode, electricityGeographies.code),
    )
    .where(
      and(
        eq(electricityGeographies.code, normalizedCode),
        eq(electricityRetailSalesMonthly.sector, 'RES'),
      ),
    )
    .orderBy(desc(electricityRetailSalesMonthly.period))
    .limit(boundedMonths);

  return rows.map((r) => ({
    code: r.code,
    slug: r.slug,
    name: r.name,
    kind: r.kind,
    period: String(r.period),
    priceCentsPerKwh: parseFloat(r.priceCentsPerKwh),
    revenueMillionUsd: r.revenueMillionUsd ? parseFloat(r.revenueMillionUsd) : undefined,
    salesMillionKwh: r.salesMillionKwh ? parseFloat(r.salesMillionKwh) : undefined,
    customers: r.customers ?? undefined,
    source: r.source,
    sourceDataset: r.sourceDataset,
    importedAt: r.importedAt ? new Date(r.importedAt).toISOString() : undefined,
  }));
}

export async function getNationalResidentialRate(
  db: DatabaseInstance,
): Promise<StateRateDTO | null> {
  return getLatestResidentialRateByStateCode(db, 'US');
}

export async function getElectricityRateDataStatus(
  db: DatabaseInstance,
): Promise<RateDataStatusDTO> {
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
      FROM electricity_retail_sales_monthly
      WHERE sector = 'RES'
    `);

    const rawRows = Array.isArray(stats.rows) ? stats.rows : (stats as unknown as StatusRow[]);
    const row = rawRows[0];
    const latestPeriod = row?.latestPeriod ? String(row.latestPeriod) : null;
    const lastImport = row?.lastImport ? new Date(row.lastImport).toISOString() : null;
    const count = row?.geographyCount ? Number(row.geographyCount) : 0;

    return {
      source: 'EIA',
      dataset: 'electricity/retail-sales',
      latestAvailablePeriod: latestPeriod,
      lastSuccessfulImportAt: lastImport,
      geographyCount: count,
      status: latestPeriod && count > 0 ? 'available' : 'unavailable',
    };
  } catch {
    return {
      source: 'EIA',
      dataset: 'electricity/retail-sales',
      latestAvailablePeriod: null,
      lastSuccessfulImportAt: null,
      geographyCount: 0,
      status: 'unavailable',
    };
  }
}
