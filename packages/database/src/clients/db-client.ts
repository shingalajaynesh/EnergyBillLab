import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from '../schema';

let runtimePool: Pool | null = null;
let readPool: Pool | null = null;

export function getDatabaseClient() {
  const connectionString = process.env.DATABASE_READ_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    return null;
  }

  if (!readPool) {
    readPool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }

  return drizzle(readPool, { schema });
}

export const getReadDatabaseClient = getDatabaseClient;

export function getWriteDatabaseClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    return null;
  }

  if (!runtimePool) {
    runtimePool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }

  return drizzle(runtimePool, { schema });
}

export type DbClient = ReturnType<typeof getDatabaseClient>;
export type DatabaseInstance = ReturnType<typeof drizzle<typeof schema>>;
