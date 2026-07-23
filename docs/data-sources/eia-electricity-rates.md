# U.S. EIA Electricity Rates Data Source Documentation

## Source Description

Energy Bill Lab integrates official Monthly Retail Sales of Electricity from Form EIA-861M, published by the U.S. Energy Information Administration (EIA).

## Data Schema & Processing

- **Sector**: `RES` (Residential).
- **Geographies**: 50 U.S. States + District of Columbia + U.S. National Average (`US`).
- **Metrics**: Average residential retail price (cents per kWh), revenue (million USD), sales (million kWh), customer count.
- **Source Period Format**: `YYYY-MM` (e.g. `2026-03` -> `March 2026`).

## Verification & Integrity Rules

- **Database Primary**: Database records populated by the NestJS API ingestion worker represent the verified production baseline.
- **Provenance Labeling**: Every rate metric rendered on state reports indicates its exact source period (e.g. _"Verified database rate for March 2026"_).
- **Stale Data Prevention**: No rate is labeled "live" or "latest" unless backed by a live database query.
