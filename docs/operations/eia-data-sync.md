# EIA Data Ingestion Operations

This document describes the manual terminal/CLI import workflow and Vercel cache revalidation procedure for updating U.S. EIA residential electricity rates.

---

## Supported Import Architecture

EIA rate updates are executed manually from the owner's terminal using the workspace CLI commands. Automated remote triggers, GitHub Action workflows, and cron-based GitHub syncs are **not supported**.

### Execution Command Reference

Run from the repository root:

```bash
# 1. Execute safe CLI EIA sync-latest import
pnpm --filter=@energy-bill-lab/api eia:sync-latest

# 2. Force Vercel cache revalidation mode
pnpm --filter=@energy-bill-lab/api eia:sync-latest --force-revalidate

# 3. Dry-run EIA import (schema & period validation without database writes)
pnpm data:eia:sync --dry-run
```

---

## Operational Execution Sequence

1. **Terminal Import Execution**: Run `pnpm --filter=@energy-bill-lab/api eia:sync-latest` locally.
2. **Safety & Validation Gate**:
   - `EiaClientService` fetches the latest complete monthly dataset from U.S. EIA API v2.
   - Enforces geography validation (50 states + District of Columbia + U.S. national total = 52 records).
   - Acquires PostgreSQL advisory lock (`987654321`) and executes idempotent database upsert within a single transaction.
   - Logs import execution status to `data_import_runs`.
3. **Cache Revalidation**:
   - Calls the protected Vercel revalidation API endpoint (`/api/internal/revalidate-energy-data`) passing `x-revalidation-secret`.
   - Revalidates Next.js cache tags (`eia-residential-rates`, `state-page-data`) and static route paths.
4. **Data Update History Maintenance**:
   - Update the Data Update History log on the `/data-sources` page in `apps/web/src/content/pages.ts` detailing the new reporting period, import date, record count, and publication status.

---

## Environment Variable Requirements

The CLI importer requires the following environment variables in `apps/api/.env.local`:

- `DATABASE_URL`: Neon PostgreSQL connection string.
- `EIA_API_KEY`: Official U.S. EIA API key.
- `ENERGY_DATA_REVALIDATION_SECRET`: Secret token matching Vercel `ENERGY_DATA_REVALIDATION_SECRET`.
- `ENERGY_DATA_REVALIDATION_URL`: `https://energybilllab.com/api/internal/revalidate-energy-data`
- `ENERGY_DATA_PRODUCTION_BASE_URL`: `https://energybilllab.com`
