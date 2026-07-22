# Electricity Rate Data Platform Architecture

## Overview

The **Electricity Rate Data Platform** provides transparent, official U.S. residential energy price benchmarks for **EnergyBillLab.com**. It ingests, validates, stores, and serves monthly residential electricity sales and pricing data from the **U.S. Energy Information Administration (EIA) API v2**.

---

## Data Flow Diagram

```text
EIA API v2 (retail-sales/data)
  ↓
Render Scheduled Cron Job / CLI Importer (pnpm data:eia:sync)
  ↓
Validation & Quality Checks (Zod & Canon Allowlist)
  ↓
Neon PostgreSQL (@energy-bill-lab/database)
  ↓
Server-Only Parameterized Read Queries
  ├── NestJS Public Read API (GET /v1/electricity-rates/states)
  └── Next.js Cached Server Rendering (unstable_cache)
          ↓
    Minimal State Snapshot
          ↓
    Calculator Client Island (<CalculatorIsland />)
```

---

## Ownership Boundaries

1. **API Application (`apps/api`)**:
   - Manages EIA API key and HTTP requests.
   - Executes paginated data ingestion and validation.
   - Enforces PostgreSQL advisory locks during import runs.
   - Serves public JSON API endpoints with HTTP `Cache-Control` headers.

2. **Database Package (`packages/database`)**:
   - Server-only Drizzle ORM schema definitions.
   - Maintains connection pools for runtime (`DATABASE_URL`), read-only (`DATABASE_READ_URL`), and migrations (`DATABASE_MIGRATION_URL`).
   - Exports canonical 50 states + DC + US allowlist.
   - Serves reusable parameterized queries.

3. **Web Application (`apps/web`)**:
   - Directly executes server-side cached read queries (`unstable_cache` with tag `eia-residential-rates`).
   - Renders state selection and comparison cards inside the Electricity Bill Analyzer.
   - Gracefully falls back when database or EIA data is unconfigured or unavailable.
   - **Zero client-side API requests to Render or database credentials exposed to browsers.**

---

## Security & Privacy Boundaries

- **Server-Only API Key**: `EIA_API_KEY` exists strictly on the server/API.
- **Zero Browser Transmission**: No user-entered bill amounts, rates, or selected states leave the browser.
- **Privacy-Safe Analytics**: Selected states and bill numbers are omitted from GTM, GA4, and Clarity analytics events.
