# Energy Insight Topic Research Record

## 1. Topic Identification

- **Research Date**: 2026-08-14
- **Proposed Title**: August 2026 Rooftop Solar NEM 3.0 Net Billing Export Value Benchmark
- **Primary Intent**: Quantify the household financial return, annual bill offset, and export compensation difference between legacy 1:1 net metering (NEM 2.0) and modern net billing tariffs (NEM 3.0 / Avoided Cost Calculator) for a standard 6 kW residential rooftop solar array with and without 10 kWh battery storage.
- **Primary Query**: `nem 3 net billing export value solar savings benchmark 2026`
- **Secondary Queries**:
  - `nem 2 vs nem 3 solar bill savings comparison`
  - `rooftop solar export rate avoided cost calculator 2026`
  - `solar only vs solar battery payback nem 3`
- **Canonical Topic**: `august-2026-solar-net-billing-export-economics`
- **Intent Fingerprint**: `august-2026-rooftop-solar-nem-3-net-billing-export-value-benchmark`
- **Target Reader**: Homeowners evaluating residential rooftop solar installations, solar-plus-storage payback periods, and utility bill offset economics under modern net billing tariffs.
- **Geography**: `united-states` (Focus on California investor-owned utilities and states transitioning to avoided-cost solar tariffs).
- **Reporting Period**: August 2026 (May 2026 EIA Data Release)
- **Category**: `solar`
- **Update Cadence**: `annual`

---

## 2. Intent Ownership & Conflict Audit

- **Guides Conflict**: Checked `/guides/how-net-metering-affects-your-electric-bill`. The Guide provides evergreen conceptual definitions of billing mechanics. This Insight provides a dated August 2026 quantitative economic benchmark modeling explicit export rates and battery pairings.
- **State Pages Conflict**: Checked `/electricity-rates/california`. The state page covers historical retail prices and utility profiles. This Insight models hourly solar export values and self-consumption economics.
- **Calculators Conflict**: Checked `/tools/appliance-energy-cost-calculator` and `/electricity-bill-analyzer`. These provide generic consumption calculations. This Insight models generation-versus-grid export tariffs.
- **Insights Conflict**: Checked existing solar Insight `may-2026-rooftop-solar-generation-retail-savings-benchmark`. That article modeled top-line statewide generation numbers; this article models the granular hourly export compensation rate shifts and battery storage economics under NEM 3.0.
- **Decision**: `APPROVE AS NEW INSIGHT`

---

## 3. Primary Source Verification

1. **U.S. Energy Information Administration (EIA)**:
   - Dataset: _Electric Power Monthly (May 2026 Release)_, Table 5.6.A (Average Price of Electricity to Ultimate Customers).
   - URL: https://www.eia.gov/electricity/monthly/
2. **National Renewable Energy Laboratory (NREL)**:
   - Resource: _PVWatts Calculator & U.S. Utility Rate Database (URDB)_.
   - URL: https://pvwatts.nrel.gov/
3. **California Public Utilities Commission (CPUC)**:
   - Resource: _Decision D.22-12-056: Net Billing Tariff & Avoided Cost Calculator (ACC)_.
   - URL: https://www.cpuc.gov/nem/

---

## 4. Original Value Contribution

- **Original Calculation**: Modeled a standard 6 kW DC residential system producing 9,000 kWh annually against a 10,000 kWh/year household load profile. Calculated that without battery storage, self-consumption is ~35% (3,150 kWh) and grid export is ~65% (5,850 kWh). Under legacy 1:1 net metering (32.40¢/kWh retail rate), annual gross bill offset is $2,916 ($1,020 self-consumed + $1,896 export credit). Under NEM 3.0 avoided cost export rates (~6.80¢/kWh average export), annual bill offset drops to $1,418 ($1,020 self-consumed + $398 export credit)—a 51.4% reduction in annual savings ($1,498/year gap).
- **Paired Storage Model**: Adding a 10 kWh battery increases self-consumption to 75% (6,750 kWh), restoring annual bill savings to $2,340 ($2,187 self-consumed + $153 export credit), recovering 80.2% of legacy NEM 2.0 value.
- **Original Table**: 3-scenario financial matrix comparing system configuration, export compensation rate, annual utility bill savings, and estimated simple payback duration.

---

## 5. Final Decision

- **Decision**: `APPROVE AS NEW INSIGHT`
