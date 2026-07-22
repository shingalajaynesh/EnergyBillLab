# EIA Importer Technical Specification

## Overview

The EIA Importer resides inside `apps/api/src/modules/electricity-rate-import/` and ingests monthly residential electricity statistics from the **U.S. Energy Information Administration (EIA) API v2**.

---

## Technical Features

1. **PostgreSQL Advisory Locking**: Executes `SELECT pg_try_advisory_lock(987654321)` to prevent concurrent manual or scheduled import runs.
2. **Metadata Contract Verification**: Validates upstream JSON schema and response headers before committing writes.
3. **Idempotent Upsert**: Performs `ON CONFLICT (geography_code, period, sector) DO UPDATE` to gracefully absorb historical revisions.
4. **Configurable Lookback Window**: Defaults to a 12-month lookback window (`EIA_IMPORT_LOOKBACK_MONTHS=12`) during incremental syncs to capture source data updates.
5. **Exponential Backoff & Retry**: Retries transient 429, 500, 502, 503, 504 errors up to 3 times with jitter.

---

## Data Quality Report

Each run produces a structured `QualityReport`:

- `sourceTotalRows`, `fetchedRows`, `validatedRows`
- `insertedRows`, `updatedRows`, `unchangedRows`, `rejectedRows`
- `earliestPeriod`, `latestPeriod`, `geographyCount`
- Sanitized `issues` array categorized by severity (`info`, `warning`, `critical`).
