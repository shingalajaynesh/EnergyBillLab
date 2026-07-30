# Natural Gas Data Platform Architecture

**Document Version:** 1.0.0  
**Phase:** Phase 1 (Natural Gas Data, Rate Explanation, and Household Cost Tools)  
**Last Updated:** July 30, 2026

---

## 1. Overview

Energy Bill Lab expands from electricity data into a multi-fuel household energy intelligence platform. Phase 1 integrates official U.S. Energy Information Administration (EIA) monthly residential natural gas retail prices, therm unit conversions, a national natural gas hub (`/natural-gas-rates`), and two interactive cost tools (`/tools/natural-gas-bill-calculator` and `/tools/gas-furnace-cost-calculator`).

---

## 2. Official EIA Data Source & Unit Rules

### Source Dataset

- **Publisher:** U.S. Energy Information Administration (EIA)
- **API Endpoint:** `/v2/natural-gas/pri/sum/data/`
- **Frequency:** Monthly
- **Process Facet:** `PRS` (Price of Natural Gas Delivered to Residential Consumers)
- **Source Unit:** `$/MCF` (Dollars per Thousand Cubic Feet)

### Therm Conversion Baseline

1 Mcf = 1,000 cubic feet. Based on official EIA heat content benchmarks, natural gas delivered to residential consumers averages **1,036 Btu per cubic foot** (1,036,000 Btu per Mcf).

Since **1 therm = 100,000 Btu**, the standard conversion divisor is:
$$\text{Price per Therm (\$/therm)} = \frac{\text{Price per Mcf (\$/Mcf)}}{10.36}$$

---

## 3. Database Schema

- **`natural_gas_geographies`**: Geography registry containing codes (`US` for national, 2-letter state codes for 50 states + DC), names, and types (`national` | `state`).
- **`natural_gas_residential_prices_monthly`**: Monthly rate snapshots.
  - `geography_code`: Foreign key to `natural_gas_geographies.code`.
  - `period`: `date` (`YYYY-MM-01`).
  - `sector`: `RES`.
  - `price_dollars_per_mcf`: `numeric(10,4)`.
  - `price_dollars_per_therm`: `numeric(10,4)` (estimated conversion).
  - `conversion_method`: `EIA_HEAT_CONTENT_1036_BTU`.
  - `import_run_id`: Links to `data_import_runs`.
  - `uniqueIndex`: `(geography_code, period, sector)`.

---

## 4. Calculator Formulas

### Natural Gas Bill Calculator

$$\text{Usage Charge (\$) } = \text{Usage} \times \text{Price per Unit}$$
$$\text{Total Monthly Bill (\$) } = \text{Usage Charge} + \text{Fixed Account Charge} + \text{Taxes \& Fees}$$

### Gas Furnace Operating Cost Calculator

- **Mode A (Input Capacity):**
  $$\text{Therms Used} = \frac{\text{Input Btu/hr} \times \text{Runtime Hours}}{100,000}$$
- **Mode B (Heating Output + AFUE %):**
  $$\text{Input Btu/hr} = \frac{\text{Heating Output Btu/hr}}{\text{AFUE \%} / 100}$$
  $$\text{Therms Used} = \frac{\text{Input Btu/hr} \times \text{Runtime Hours}}{100,000}$$
- **Usage Cost:**
  $$\text{Total Heating Cost (\$) } = \text{Therms Used} \times \text{Rate per Therm (\$/therm)}$$

---

## 5. Non-Negotiable Governance Rules

1. **No State Pages Published in Phase 1:** State natural gas data availability is rendered as a reference directory on `/natural-gas-rates`. 50 state natural gas routes (`/natural-gas-rates/[state]`) will only be published in Phase 2.
2. **No Data Fabrication:** Missing state records are never interpolated, copied from adjacent states, or populated with national averages.
3. **No Real-Time Claims:** EIA monthly data is delayed by 60–90 days. Content explicitly uses _"Latest available EIA residential natural-gas price"_ and avoids terms like _"live rates"_.
4. **Apex Host Policy:** All URLs, metadata, sitemap entries, and structured data target `https://energybilllab.com`.
