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

export type RawStateReportRow = {
  code: string;
  slug: string;
  name: string;
  kind: string;
  period: string;
  priceCentsPerKwh: string;
  previousMonthRateCents: string | null;
  previousMonthPeriod: string | null;
  previousYearRateCents: string | null;
  previousYearPeriod: string | null;
};

export async function getNationalReportRawData(db: DatabaseInstance): Promise<{
  commonPeriod: string | null;
  nationalAverageCentsPerKwh: number | null;
  rows: RawStateReportRow[];
}> {
  const periodQuery = await db.execute<{ period: string }>(sql`
    SELECT period::text as period
    FROM electricity_retail_sales_monthly
    WHERE sector = 'RES' AND geography_code = 'US'
    ORDER BY period DESC
    LIMIT 1
  `);

  const periodRows = Array.isArray(periodQuery.rows)
    ? periodQuery.rows
    : (periodQuery as unknown as Array<{ period: string }>);

  if (!periodRows || periodRows.length === 0 || !periodRows[0]?.period) {
    return { commonPeriod: null, nationalAverageCentsPerKwh: null, rows: [] };
  }

  const commonPeriod = String(periodRows[0].period);

  function getPrevMonthStr(periodYm: string): string | null {
    if (!/^\d{4}-\d{2}$/.test(periodYm)) return null;
    const [y, m] = periodYm.split('-').map(Number);
    if (!y || !m) return null;
    let prevY = y;
    let prevM = m - 1;
    if (prevM === 0) {
      prevM = 12;
      prevY = y - 1;
    }
    return `${prevY}-${String(prevM).padStart(2, '0')}`;
  }

  function getPrevYearStr(periodYm: string): string | null {
    if (!/^\d{4}-\d{2}$/.test(periodYm)) return null;
    const [y, m] = periodYm.split('-').map(Number);
    if (!y || !m) return null;
    return `${y - 1}-${String(m).padStart(2, '0')}`;
  }

  const prevMonthPeriod = getPrevMonthStr(commonPeriod);
  const prevYearPeriod = getPrevYearStr(commonPeriod);

  const rawStateRows = await db.execute<SqlRateRow>(sql`
    SELECT 
      g.code,
      g.slug,
      g.name,
      g.kind,
      curr.period::text as period,
      curr.price_cents_per_kwh as "priceCentsPerKwh",
      pm.price_cents_per_kwh as "previousMonthRateCents",
      pm.period::text as "previousMonthPeriod",
      py.price_cents_per_kwh as "previousYearRateCents",
      py.period::text as "previousYearPeriod"
    FROM electricity_geographies g
    INNER JOIN electricity_retail_sales_monthly curr 
      ON curr.geography_code = g.code AND curr.sector = 'RES' AND curr.period = ${commonPeriod}::date
    LEFT JOIN electricity_retail_sales_monthly pm 
      ON pm.geography_code = g.code AND pm.sector = 'RES' AND pm.period = ${prevMonthPeriod ? `${prevMonthPeriod}-01` : null}::date
    LEFT JOIN electricity_retail_sales_monthly py 
      ON py.geography_code = g.code AND py.sector = 'RES' AND py.period = ${prevYearPeriod ? `${prevYearPeriod}-01` : null}::date
    WHERE g.kind = 'state' AND g.is_active = true
    ORDER BY curr.price_cents_per_kwh DESC
  `);

  const rows = Array.isArray(rawStateRows.rows)
    ? rawStateRows.rows
    : (rawStateRows as unknown as SqlRateRow[]);

  const mappedRows: RawStateReportRow[] = rows.map((r) => ({
    code: r.code,
    slug: r.slug,
    name: r.name,
    kind: r.kind,
    period: String(r.period),
    priceCentsPerKwh: String(r.priceCentsPerKwh),
    previousMonthRateCents: r.previousMonthRateCents ? String(r.previousMonthRateCents) : null,
    previousMonthPeriod: r.previousMonthPeriod ? String(r.previousMonthPeriod) : null,
    previousYearRateCents: r.previousYearRateCents ? String(r.previousYearRateCents) : null,
    previousYearPeriod: r.previousYearPeriod ? String(r.previousYearPeriod) : null,
  }));

  const nationalQuery = await db.execute<{ priceCentsPerKwh: string }>(sql`
    SELECT price_cents_per_kwh as "priceCentsPerKwh"
    FROM electricity_retail_sales_monthly
    WHERE sector = 'RES' AND geography_code = 'US' AND period = ${commonPeriod}::date
    LIMIT 1
  `);
  const nationalRows = Array.isArray(nationalQuery.rows)
    ? nationalQuery.rows
    : (nationalQuery as unknown as Array<{ priceCentsPerKwh: string }>);
  const nationalAverageCentsPerKwh = nationalRows[0]?.priceCentsPerKwh
    ? parseFloat(nationalRows[0].priceCentsPerKwh)
    : null;

  return {
    commonPeriod,
    nationalAverageCentsPerKwh,
    rows: mappedRows,
  };
}
