# EIA Data Ingestion Operations

This document describes the automated GitHub Actions synchronization workflow, manual terminal/CLI import workflow, and Vercel cache revalidation procedure for updating U.S. EIA residential electricity rates.

---

## Supported Import Architecture

EIA electricity rate updates are supported through two primary mechanisms:

1. **Automated Daily GitHub Actions Sync**:
   - Workflow: `.github/workflows/eia-sync.yml`
   - Schedule: Daily at `06:00 UTC` (`cron: '0 6 * * *'`) and manual `workflow_dispatch`.
   - Action: Sends an authenticated POST request with `x-sync-secret` header to `/api/v1/electricity-rate-import/sync`.
   - Idempotence: Returns `no_update` (HTTP 200) if the database already holds the latest available EIA period; automatically ingests and triggers Vercel cache revalidation when a new complete 52-geography period is published.

2. **Manual Terminal/CLI Import**:
   - Executed locally by the project owner using npm/pnpm workspace scripts.

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

1. **Import Trigger**: Triggered automatically via `.github/workflows/eia-sync.yml` or manually via CLI.
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

The EIA importer requires the following environment variables:

### API Server (`apps/api/.env` / Render environment)

- `DATABASE_URL`: Neon PostgreSQL connection string.
- `EIA_API_KEY`: Official U.S. EIA API key.
- `EIA_SYNC_SECRET`: Secret token used to authenticate sync endpoint requests.
- `ENERGY_DATA_REVALIDATION_SECRET`: Secret token matching Vercel `ENERGY_DATA_REVALIDATION_SECRET`.
- `ENERGY_DATA_REVALIDATION_URL`: `https://energybilllab.com/api/internal/revalidate-energy-data`
- `ENERGY_DATA_PRODUCTION_BASE_URL`: `https://energybilllab.com`

### GitHub Actions Secrets

- `EIA_SYNC_SECRET`: Secret token passed in `x-sync-secret` header.
- `API_SYNC_URL`: URL to the sync endpoint (defaults to `https://energybilllab.com/api/v1/electricity-rate-import/sync` or Render API URL).
