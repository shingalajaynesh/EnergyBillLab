import { boolean, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const electricityGeographies = pgTable('electricity_geographies', {
  code: varchar('code', { length: 10 }).primaryKey(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  kind: varchar('kind', { length: 20 }).notNull(), // 'state' | 'district' | 'national'
  isActive: boolean('is_active').default(true).notNull(),
  displayOrder: integer('display_order').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type ElectricityGeography = typeof electricityGeographies.$inferSelect;
export type NewElectricityGeography = typeof electricityGeographies.$inferInsert;
