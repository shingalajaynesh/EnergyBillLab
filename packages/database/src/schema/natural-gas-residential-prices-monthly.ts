import {
  bigserial,
  date,
  index,
  numeric,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

import { naturalGasGeographies } from './natural-gas-geographies';

export const naturalGasResidentialPricesMonthly = pgTable(
  'natural_gas_residential_prices_monthly',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    geographyCode: varchar('geography_code', { length: 10 })
      .notNull()
      .references(() => naturalGasGeographies.code),
    period: date('period').notNull(), // First day of billing month YYYY-MM-01
    sector: varchar('sector', { length: 10 }).default('RES').notNull(),
    priceDollarsPerMcf: numeric('price_dollars_per_mcf', { precision: 10, scale: 4 }).notNull(),
    priceDollarsPerTherm: numeric('price_dollars_per_therm', {
      precision: 10,
      scale: 4,
    }).notNull(), // Estimated conversion: priceDollarsPerMcf / 10.36
    conversionMethod: varchar('conversion_method', { length: 50 }).default(
      'EIA_HEAT_CONTENT_1036_BTU',
    ),
    conversionAssumptions: varchar('conversion_assumptions', { length: 255 }).default(
      '1 Mcf = 1,036,000 Btu = 10.36 therms (1036 Btu/cu ft average heat content)',
    ),
    source: varchar('source', { length: 20 }).default('EIA').notNull(),
    sourceDataset: varchar('source_dataset', { length: 100 })
      .default('natural-gas/pri/sum')
      .notNull(),
    importRunId: varchar('import_run_id', { length: 64 }),
    importedAt: timestamp('imported_at', { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('ng_geography_period_sector_unique_idx').on(
      table.geographyCode,
      table.period,
      table.sector,
    ),
    index('ng_geography_period_idx').on(table.geographyCode, table.period),
    index('ng_period_desc_idx').on(table.period),
    index('ng_import_run_id_idx').on(table.importRunId),
  ],
);

export type NaturalGasResidentialPricesMonthly =
  typeof naturalGasResidentialPricesMonthly.$inferSelect;
export type NewNaturalGasResidentialPricesMonthly =
  typeof naturalGasResidentialPricesMonthly.$inferInsert;
