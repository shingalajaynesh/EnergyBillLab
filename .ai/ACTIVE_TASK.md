# Active Task

- **Phase**: U.S. Electricity Rate Data Foundation & State Comparison Integration
- **In-Scope Work**:
  - Mandatory calculator hardening audit (schema tests, component tests, live region accessibility, 44px mobile touch targets, performance wording correction).
  - Create server-only `@energy-bill-lab/database` package using `drizzle-orm`, `pg`, `drizzle-kit` with Neon connection support.
  - Implement Drizzle schema for `electricity_geographies`, `electricity_retail_sales_monthly`, and `data_import_runs`.
  - Create database migration and seed for 50 U.S. states + DC + National aggregate (`US`).
  - Build NestJS EIA v2 client (`/v2/electricity/retail-sales/data`, `sectorid=RES`, monthly frequency) with metadata verification, pagination, Zod response validation, retry with backoff, and unit tests.
  - Implement NestJS EIA import service with PostgreSQL advisory lock, idempotent upsert, lookback window (6-12 months), and data quality reporting.
  - Expose CLI data import commands (`data:eia:metadata`, `data:eia:backfill`, `data:eia:sync`, `data:eia:verify`).
  - Expose NestJS public read endpoints (`GET /v1/electricity-rates/states`, `GET /v1/electricity-rates/states/:stateCode/latest`, `GET /v1/electricity-rates/states/:stateCode/history`, `GET /v1/electricity-rates/national/latest`, `GET /v1/electricity-rates/status`) with Cache-Control headers.
  - Web Next.js server-side cached read models (via `unstable_cache` or static data loader directly querying database, no browser client fetch to Render API).
  - Optional State Selector & comparison UI integrated into `/electricity-bill-analyzer` with directional rate difference, percentage difference, current-usage estimated difference, source period, attribution, and caveats.
  - Graceful fallback when database/EIA data is unavailable.
  - Privacy-safe analytics (zero state codes/names, zero bill values sent).
  - Comprehensive documentation updates.
- **Out-of-Scope Work**:
  - State SEO pages (`/electricity-rates/california`, etc.).
  - City pages, utility-company pages, ZIP/address lookups.
  - Public HTTP import endpoint.
  - Fake state data.
  - Automatic production database migrations without explicit approval.
- **Expected Commit**: `feat(data): add EIA electricity rate foundation`

## Required Validation For Active Task

- `pnpm install --frozen-lockfile`
- `pnpm format:check`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm build:web`
- `pnpm build:api`
- `pnpm data:eia:metadata`
- `pnpm data:eia:backfill --dry-run`
- `pnpm data:eia:sync --dry-run`
- `pnpm data:eia:verify`
- `pnpm db:generate`
- `pnpm db:migrate` (against dev database)

## Last Completed Task

- **Phase**: U.S. Electricity Rate Data Foundation & State Comparison Integration
- **Commit**: `feat(data): add EIA electricity rate foundation`
- **Scope**: Built server-only `@energy-bill-lab/database` package using Drizzle ORM and PostgreSQL with schemas for geographies, monthly retail sales, and import runs; created NestJS EIA v2 client, importer with advisory locking and idempotent upserting, public read controller with HTTP cache headers, Next.js server-side cached data loader, State Selector dropdown, and StateComparisonCard UI displaying rate difference, percentage difference, usage estimate, source period, attribution, and caveats; added full documentation set and passed workspace validation.
