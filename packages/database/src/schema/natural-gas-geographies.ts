import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const naturalGasGeographies = pgTable('natural_gas_geographies', {
  code: varchar('code', { length: 10 }).primaryKey(), // 'US' or 2-letter state code 'CA', 'TX', etc.
  name: varchar('name', { length: 100 }).notNull(),
  type: varchar('type', { length: 20 }).notNull(), // 'national' | 'state'
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type NaturalGasGeography = typeof naturalGasGeographies.$inferSelect;
export type NewNaturalGasGeography = typeof naturalGasGeographies.$inferInsert;
