# EIA Data Synchronization Operations

## Command Reference

Run the following CLI commands from the workspace root:

```bash
# 1. Verify EIA API metadata contract
pnpm data:eia:metadata

# 2. Dry-run incremental sync (does not write to DB)
pnpm data:eia:sync --dry-run

# 3. Execute incremental sync (upserts recent 12-month lookback)
pnpm data:eia:sync

# 4. Dry-run full historical backfill
pnpm data:eia:backfill --dry-run

# 5. Execute full historical backfill for specific date range
pnpm data:eia:backfill --start=2020-01 --end=2026-04
```

---

## Render Scheduled Cron Setup

To run automated daily syncs on Render:

- **Command**: `pnpm data:eia:sync`
- **Schedule**: `0 3 * * *` (3:00 AM UTC daily)
- **Environment Group**: Shared API Environment (`EIA_API_KEY`, `DATABASE_URL`)
