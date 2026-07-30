# Natural Gas Data Import Operations Guide

**Document Version:** 1.0.0  
**Last Updated:** July 30, 2026

---

## 1. CLI Execution

To run a manual natural gas EIA sync via CLI:

```bash
# Full incremental sync
npx pnpm --filter=@energy-bill-lab/api start:cli:natural-gas

# Dry-run execution
npx pnpm --filter=@energy-bill-lab/api start:cli:natural-gas --dry-run

# Specific reporting period range
npx pnpm --filter=@energy-bill-lab/api start:cli:natural-gas --start 2026-01 --end 2026-04
```

---

## 2. Remote HTTP Sync Endpoint

Protected endpoint available for administrative or trigger syncs:

- **Endpoint:** `POST /api/v1/natural-gas-import/sync-latest`
- **Header:** `x-revalidation-secret: <ENERGY_DATA_REVALIDATION_SECRET>`
- **Advisory Lock ID:** `987654322` (Isolated from electricity sync lock `987654321`)

---

## 3. Operations & Advisory Lock Safety

- **Transaction Safety:** Data insertion runs within a PostgreSQL transaction. Failed transactions trigger automatic rollbacks.
- **Import Runs Logging:** Tracks execution duration, fetched rows, inserted rows, and errors in `data_import_runs` under `dataset = 'eia-natural-gas-residential-prices'`.
