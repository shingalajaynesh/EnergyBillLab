# Energy Insights — Topic Research & Governance Record

**Topic:** August 2026 Electric Clothes Dryer kWh Consumption & Monthly Operating Cost Benchmark  
**Research Date:** August 7, 2026  
**Status:** Approved & Completed

---

```text
Proposed title: August 2026 Electric Clothes Dryer kWh Consumption & Monthly Operating Cost Benchmark
Primary intent: Benchmark energy consumption (kWh per load), per-load costs, and monthly operating expenses for residential electric clothes dryers across technology types and state electricity rates using August 2026 EIA data
Primary query: electric clothes dryer kWh operating cost
Secondary queries:
  - how much electricity does a clothes dryer use
  - electric dryer cost per load
  - clothes dryer monthly electric bill impact
  - heat pump dryer energy savings benchmark
Canonical topic: electric-clothes-dryer-operating-cost-benchmark
Intent fingerprint: electric-clothes-dryer-kwh-operating-cost-benchmark
Target reader: U.S. homeowners, laundry appliance buyers, and household energy managers evaluating laundry energy costs
Geography: United States (National, High/Low State Rate Comparison)
Reporting period: August 2026 / May 2026 EIA Data Release
Content type decision: APPROVE AS NEW INSIGHT
Existing page conflicts:
  - None (Appliance Energy Cost Calculator at /tools/appliance-energy-cost-calculator handles dynamic user inputs; this Insight provides a baseline benchmark dataset for clothes dryers across dryer types and load frequencies)
Search Console evidence: High recurring consumer search volume for clothes dryer electricity draw, cost per load, and heat pump dryer energy savings
Primary sources:
  - U.S. Energy Information Administration (Form EIA-861M May 2026 Residential Rate Release: 18.44¢/kWh national average)
  - U.S. Department of Energy (DOE Appliance and Equipment Standards Program for Clothes Dryers)
  - ENERGY STAR Program Requirements for Clothes Dryers (Combined Energy Factor CEF standards)
Original calculation:
  - Per-load kWh and cost calculations across 3 dryer technologies (Standard Vented 3.0 kWh/load, ENERGY STAR Sensor 2.4 kWh/load, Ventless Heat Pump 1.2 kWh/load)
  - Load frequency scaling matrix (3, 5, 8, and 12 loads/week) yielding monthly kWh and annual cost benchmarks
  - State-by-state monthly dryer operating cost matrix at 5 loads/week (HI @ $27.37/mo vs WA @ $7.49/mo)
  - Washer spin speed and moisture sensor energy waste breakpoint analysis
Original chart or table:
  - Clothes Dryer Technology Comparison Table (kWh per load, cost per load, monthly cost, annual cost)
  - Weekly Load Frequency Operating Cost Table (3 to 12 loads/week at national average rates)
  - State-Specific Electric Clothes Dryer Monthly Cost Benchmark Table
Practical example:
  - Running a standard electric dryer for 5 loads per week draws 65 kWh/month ($11.99/mo at national average rates), but in California (32.55¢/kWh) it costs $21.16/month ($253.89/year). Switching to a heat pump dryer cuts monthly usage to 26 kWh ($4.79/mo), saving $9.59/month in CA ($115.07/year).
Internal links:
  - /tools/appliance-energy-cost-calculator
  - /tools/electricity-bill-analyzer
  - /appliances
  - /electricity-rates
  - /guides/electric-bill-higher-with-same-usage
Update cadence: Monthly EIA rate refresh / Annual ENERGY STAR specification updates
Risk of becoming stale: Low (Core formulas stable; rates update with EIA releases)
Required future update: September 2026 EIA Rate Update
Decision: APPROVE AS NEW INSIGHT
```

---

## Decision Matrix & Approval Checklist

- [x] **No-Cannibalization Verification:** No existing Guide, State Page, or Calculator owns this intent.
- [x] **Original Analytical Value:** Includes technology comparison table, load frequency matrix, state monthly expense matrix, and washer spin speed moisture savings calculation.
- [x] **Data Source Verification:** Primary source (EIA Form EIA-861M May 2026 release) verified at 18.44¢/kWh national average.
- [x] **Authorship & Privacy:** Byline set strictly to `By Jaynesh Shingala` without prohibited credential titles or locations.
- [x] **Apex Host URL:** Canonical URL targets `https://energybilllab.com/insights/august-2026-electric-clothes-dryer-kwh-operating-cost-benchmark`.
