# Electricity Rate Data Fallback & Provenance Architecture

## Overview

Energy Bill Lab requires strict rate-data provenance for all displayed electricity rates across state reports, hubs, and calculator tool selectors. Hardcoded rate values copied into TypeScript files must never be silently presented as live or latest EIA data.

## Provenance Model

Every rate data result exposes a `RateDataProvenance` status:

```ts
export type RateDataProvenance =
  | {
      status: 'live_database';
      sourcePeriod: string;
      sourceName: string;
    }
  | {
      status: 'bundled_snapshot';
      sourcePeriod: string;
      sourceName: string;
      snapshotGeneratedAt: string;
    }
  | {
      status: 'unavailable';
    };
```

## Behavior Specifications

### 1. Database-First Primary Execution

- PostgreSQL (`electricity_retail_sales_monthly`) is the primary production database.
- Live database queries (`getLatestResidentialRatesForAllStates`, `getLatestResidentialRateByStateCode`) take precedence over all other paths.

### 2. Database Unavailable Behavior

- If PostgreSQL is offline, unseeded, or query execution fails, `status: 'unavailable'` is returned.
- Public state pages and rates hub do not render numerical state or national rates, fake averages, or zero values when provenance is `unavailable`.
- The redesigned `<DataUnavailablePanel>` is displayed, explaining that data is temporarily unavailable and pointing users to manual rate entry.
- Technical database error tracebacks or connection strings are strictly hidden from end users.

### 3. Calculator Tool Behavior

- State selectors in Appliance, AC, Space Heater, and EV Charging calculators check `snapshot.available`.
- If state rates are unavailable, state selectors display _"State averages are temporarily unavailable — please enter your utility rate below"_.
- Manual numeric rate inputs remain 100% operational. Default baseline inputs are clearly labeled as example baseline values.

### 4. Historical Trend Data Protection

- Historical 24-month trend tables are only built from verified consecutive database rows.
- Missing periods are never filled with zero or static values.
- Month-over-month rate changes are not calculated across non-consecutive periods.
