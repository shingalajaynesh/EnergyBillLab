# EIA Data Synchronization Operations

## Command Reference

Run the following CLI commands from the workspace root or API package:

```bash
# 1. Verify EIA API metadata contract
pnpm data:eia:metadata

# 2. Execute automated sync-latest pipeline (discovery -> DB import -> cache revalidation -> production verification)
pnpm --filter=@energy-bill-lab/api eia:sync-latest

# 3. Force revalidation & publication recovery mode
pnpm --filter=@energy-bill-lab/api eia:sync-latest --force-revalidate

# 4. Dry-run incremental sync (does not write to DB)
pnpm data:eia:sync --dry-run

# 5. Execute full historical backfill for specific date range
pnpm data:eia:backfill --start=2020-01 --end=2026-05
```

---

## Render Scheduled Cron Setup

To configure the automated monthly EIA sync pipeline on Render:

1. **Job Type:** Cron Job
2. **Name:** `energybilllab-eia-monthly-sync`
3. **Environment:** Node
4. **Schedule:** `30 6 * * *` (06:30 AM UTC daily)
5. **Command:** `npx pnpm --filter=@energy-bill-lab/api eia:sync-latest`
6. **Required Environment Variables:**
   - `DATABASE_URL`: PostgreSQL connection string (Neon / Render DB).
   - `EIA_API_KEY`: Official U.S. EIA API Key.
   - `ENERGY_DATA_REVALIDATION_SECRET`: Strong random secret token shared with Vercel environment.
   - `ENERGY_DATA_REVALIDATION_URL`: `https://energybilllab.com/api/internal/revalidate-energy-data`
   - `ENERGY_DATA_PRODUCTION_BASE_URL`: `https://energybilllab.com`

---

## Operations & Execution Modes

- **No-Op Mode:** Occurs when the EIA latest period equals or precedes the database period AND production is current. Exits cleanly with status `0`.
- **Import-and-Publish Mode:** Occurs when a new complete month is discovered. Executes database transaction, calls protected Vercel revalidation route, verifies production, and marks `data_import_runs` as `succeeded`.
- **Publish-Recovery Mode:** Occurs when the database contains the latest period but live production is stale. Skips database re-import, re-triggers Vercel cache revalidation, and verifies production.

---

## Manual Trigger Instructions

To manually run the sync pipeline from Render Dashboard:

1. Navigate to **Render Dashboard** $\rightarrow$ **Cron Jobs** $\rightarrow$ `energybilllab-eia-monthly-sync`.
2. Click **Trigger Run**.
3. View real-time output logs. If the run status is `succeeded`, verify live state pages and CSV on `https://energybilllab.com`.
