import { date, integer, jsonb, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const dataImportRuns = pgTable('data_import_runs', {
  id: varchar('id', { length: 64 }).primaryKey(),
  source: varchar('source', { length: 20 }).notNull(),
  dataset: varchar('dataset', { length: 100 }).notNull(),
  importType: varchar('import_type', { length: 30 }).notNull(), // 'backfill' | 'incremental' | 'manual' | 'verification'
  status: varchar('status', { length: 20 }).notNull(), // 'running' | 'succeeded' | 'partial' | 'failed'
  requestedStartPeriod: date('requested_start_period'),
  requestedEndPeriod: date('requested_end_period'),
  sourceTotalRows: integer('source_total_rows'),
  fetchedRows: integer('fetched_rows'),
  validatedRows: integer('validated_rows'),
  insertedRows: integer('inserted_rows'),
  updatedRows: integer('updated_rows'),
  unchangedRows: integer('unchanged_rows'),
  rejectedRows: integer('rejected_rows'),
  startedAt: timestamp('started_at', { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  errorCode: varchar('error_code', { length: 50 }),
  errorSummary: text('error_summary'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type DataImportRun = typeof dataImportRuns.$inferSelect;
export type NewDataImportRun = typeof dataImportRuns.$inferInsert;
