# U.S. Residential Electricity-Rate Report Technical & Methodology Documentation

## Overview

The U.S. Residential Electricity-Rate Report (`/research/us-residential-electricity-rate-report`) is an original data synthesis published by Energy Bill Lab. It compiles monthly retail electricity sales data for the residential sector (`RES`) from the U.S. Energy Information Administration (EIA) Form EIA-861M dataset.

---

## Core Data Architecture & Rules

### 1. Canonical 50-State Universe

- Evaluates strictly the 50 U.S. states.
- Excludes `US` national average record, Washington, D.C. (`DC`), Puerto Rico (`PR`), territories, and regional aggregates from the state rankings.
- `DC` is tracked separately as a federal district and excluded from 50-state rate rankings.

### 2. Common Reporting Period & Selection Priority

To prevent reporting bias caused by asynchronous state data updates, all national benchmarks, rankings, and high/low rate spreads are evaluated for **one common EIA reporting period**.

- **Priority 1:** Newest period where all 50 canonical states and the national `US` average record are present and validated.
- **Priority 2:** If no 50-state period exists, the newest period meeting the 40-state minimum threshold.
- **Partial Import Guard:** A partial import with fewer states cannot replace the latest complete 50-state reporting month.
- **Missing State Disclosure:** Any state excluded from a period is explicitly listed in `statesExcluded` with reason.

### 3. HTML and CSV Consistency Strategy

- Both HTML report (`/research/us-residential-electricity-rate-report`) and CSV export (`/research/us-residential-electricity-rate-report/csv`) consume the exact same cached server model `getNationalRateReport()`.
- Shared `unstable_cache` revalidation window (24 hours).
- Guaranteed exact agreement on reporting period, included states, rates, MoM/YoY changes, and source metadata.

### 4. Precision & Missing Data Rules

- Full double precision floating point retained internally; rounded only at display boundaries.
- `monthlyChangeCents = currentRateCents - previousMonthRateCents` (immediately preceding calendar month `YYYY-MM-01`).
- `annualChangeCents = currentRateCents - sameMonthPreviousYearRateCents` (same calendar month in prior year `(YYYY-1)-MM-01`).
- Missing comparison periods remain `null` / `"Not reported"`, never converted to zero or interpolated.
- `householdEnergyChargeUsd = (kwh * rateCentsPerKwh) / 100` (energy charge estimate excluding fixed fees and local taxes).

### 5. Database vs. Editorial Scope Separation

- **Database Scope:** Analyzes all 50 U.S. state records stored in PostgreSQL for national ranking tables.
- **Editorial Scope:** Links state names only for the 20 editorially published state pages (`/electricity-rates/california`, etc.). States without an editorial page render a clean `"Data Only"` badge without broken links.

---

## Technical CSV Export Endpoint

- **Route:** `/research/us-residential-electricity-rate-report/csv`
- **Headers:** `Content-Type: text/csv; charset=utf-8`, `Content-Disposition: attachment; filename="us-residential-electricity-rate-report.csv"`, `Cache-Control: public, max-age=86400, s-maxage=86400`
- **Columns:** `reporting_period,state_code,state_name,residential_rate_cents_per_kwh,monthly_change_cents,monthly_change_percent,annual_change_cents,annual_change_percent,source_organization,source_dataset`
- **Security:** Zero internal database keys, server credentials, or raw operational metadata exposed.

---

## Structured Data Implementation

- Renders Schema.org `Report` JSON-LD object with `name`, `description`, `url`, `datePublished`, `dateModified`, `spatialCoverage` ("United States"), `variableMeasured`, `publisher` (Energy Bill Lab), `author` (Jaynesh Shingala), `sourceOrganization` (U.S. EIA), and `temporalCoverage`.
