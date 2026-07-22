# Database Development & Schema Documentation

## Overview

Database operations in Energy Bill Lab are managed by the server-only `@energy-bill-lab/database` package built on **Drizzle ORM** and **PostgreSQL** (`pg`).

---

## Connection Roles & Environment Variables

- `DATABASE_URL`: Primary connection pool for API runtime read and write queries.
- `DATABASE_READ_URL`: Connection pool for Next.js server-side read queries (ideally a read-only PostgreSQL role).
- `DATABASE_MIGRATION_URL`: Direct migration connection string used by `drizzle-kit migrate`.

---

## Database Schemas

### 1. `electricity_geographies`

Contains the single canonical allowlist of 50 U.S. states, District of Columbia (`DC`), and the U.S. national aggregate (`US`).

### 2. `electricity_retail_sales_monthly`

Stores monthly residential electricity prices, revenues, sales, and customer counts from EIA v2.

- Unique Index: `(geography_code, period, sector)`
- Precision: `numeric(10, 4)` for exact cents per kWh.

### 3. `data_import_runs`

Tracks operational data quality reports, row counts, and status for backfill and incremental sync runs.

---

## Workflow Commands

```bash
# Generate SQL migration file
pnpm db:generate

# Apply migrations to development database
pnpm db:migrate
```
