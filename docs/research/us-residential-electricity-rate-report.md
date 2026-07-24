# U.S. Residential Electricity-Rate Report Technical & Methodology Documentation

## Overview

The U.S. Residential Electricity-Rate Report (`/research/us-residential-electricity-rate-report`) is an original data synthesis published by Energy Bill Lab. It compiles monthly retail electricity sales data for the residential sector (`RES`) from the U.S. Energy Information Administration (EIA) Form EIA-861M dataset.

---

## Core Data Architecture & Rules

### 1. Common Reporting Period Principle

To prevent reporting bias caused by asynchronous state data updates, all national benchmarks, rankings, and high/low rate spreads are evaluated for **one common EIA reporting period** (the latest calendar month where validated state records exist).

### 2. Full Precision & Deterministic Calculation

- All calculations retain full double-precision floating-point arithmetic internally.
- `monthlyChangeCents = currentRateCents - previousMonthRateCents`
- `monthlyChangePercent = (monthlyChangeCents / previousMonthRateCents) * 100`
- `annualChangeCents = currentRateCents - sameMonthPreviousYearRateCents`
- `annualChangePercent = (annualChangeCents / sameMonthPreviousYearRateCents) * 100`
- `householdEnergyChargeUsd = (kwh * rateCentsPerKwh) / 100`

### 3. Missing Data Integrity

If a state record for the previous month or previous year is missing, the corresponding change value remains `null` and is rendered as `"Not reported"`. Missing values are **never** interpolated or set to zero.

### 4. Database vs. Editorial Coverage Separation

- **Database Scope:** Analyzes all validated U.S. state records stored in PostgreSQL for national ranking tables.
- **Editorial Scope:** Links state names only for the 20 editorially published state pages (`/electricity-rates/california`, `/electricity-rates/texas`, etc.). States without an editorial page are rendered as plaintext without broken links.

---

## Technical CSV Export Endpoint

- **Route:** `/research/us-residential-electricity-rate-report/csv`
- **Format:** `text/csv; charset=utf-8`
- **Security:** Exposes only public report metrics (State Code, State Name, Residential Rate ¢/kWh, Monthly Change, Annual Change, Source Dataset). Zero internal database keys, server credentials, or raw operational metadata are exposed.
