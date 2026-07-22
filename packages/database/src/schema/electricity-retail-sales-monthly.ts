import {
  bigint,
  bigserial,
  date,
  index,
  numeric,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

import { electricityGeographies } from './electricity-geographies';

export const electricityRetailSalesMonthly = pgTable(
  'electricity_retail_sales_monthly',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    geographyCode: varchar('geography_code', { length: 10 })
      .notNull()
      .references(() => electricityGeographies.code),
    period: date('period').notNull(), // First day of billing month YYYY-MM-01
    sector: varchar('sector', { length: 10 }).default('RES').notNull(),
    priceCentsPerKwh: numeric('price_cents_per_kwh', { precision: 10, scale: 4 }).notNull(),
    revenueMillionUsd: numeric('revenue_million_usd', { precision: 12, scale: 4 }),
    salesMillionKwh: numeric('sales_million_kwh', { precision: 12, scale: 4 }),
    customers: bigint('customers', { mode: 'number' }),
    source: varchar('source', { length: 20 }).default('EIA').notNull(),
    sourceDataset: varchar('source_dataset', { length: 100 })
      .default('electricity/retail-sales')
      .notNull(),
    importRunId: varchar('import_run_id', { length: 64 }),
    importedAt: timestamp('imported_at', { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('geography_period_sector_unique_idx').on(
      table.geographyCode,
      table.period,
      table.sector,
    ),
    index('geography_period_idx').on(table.geographyCode, table.period),
    index('period_desc_idx').on(table.period),
    index('import_run_id_idx').on(table.importRunId),
  ],
);

export type ElectricityRetailSalesMonthly = typeof electricityRetailSalesMonthly.$inferSelect;
export type NewElectricityRetailSalesMonthly = typeof electricityRetailSalesMonthly.$inferInsert;
