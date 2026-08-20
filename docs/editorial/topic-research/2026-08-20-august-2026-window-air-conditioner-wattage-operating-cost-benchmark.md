# Energy Insight Topic Research Record

## 1. Topic Identification

- **Research Date**: 2026-08-20
- **Proposed Title**: August 2026 Window Air Conditioner Wattage & Hourly Operating Cost Benchmark: 5,000 to 15,000 BTU Electricity Costs & Zone-Cooling Savings
- **Primary Intent**: Quantify the hourly, daily, and monthly electricity costs to operate residential window air conditioners across capacity tiers (5,000 BTU, 8,000 BTU, 10,000 BTU, 12,000 BTU, and 15,000 BTU), isolate continuous peak wattage vs thermodynamic compressor cycling duty cycles (50% to 70%), evaluate Combined Energy Efficiency Ratio (CEER) standards and inverter variable-speed compressor savings, model state-level electricity rate spreads under May 2026 EIA data releases (18.44¢/kWh national average), and calculate overnight bedroom zone-cooling savings versus whole-home central AC.
- **Primary Query**: `window air conditioner cost per hour`
- **Secondary Queries**:
  - `how much does it cost to run a window ac unit per hour`
  - `window ac wattage 5000 8000 12000 btu electricity cost`
  - `window air conditioner electricity cost per month`
  - `inverter window ac electricity savings`
  - `running window ac at night vs central air cost`
- **Canonical Topic**: `august-2026-window-air-conditioner-wattage-operating-cost-benchmark`
- **Intent Fingerprint**: `august-2026-window-air-conditioner-wattage-hourly-cost-benchmark`
- **Target Reader**: U.S. homeowners, apartment renters, and families evaluating the electric bill impact of running window air conditioners, selecting the right BTU capacity and CEER efficiency rating, and using supplemental room cooling to avoid high central AC bills.
- **Geography**: `united-states` (National average plus state benchmarks for Washington, Texas, Florida, Pennsylvania, New York, California, and Hawaii).
- **Reporting Period**: August 2026 (May 2026 EIA Electricity Releases)
- **Category**: `appliances`
- **Update Cadence**: `monthly`

---

## 2. Intent Ownership & Conflict Audit

- **Guides Conflict**: Checked `/guides/high-electric-bill-in-summer` and general cooling guides. Guides offer evergreen conceptual explanations of summer heat gain, air filter maintenance, and whole-home thermostat strategies. This Insight provides an August 2026 empirical engineering and economic benchmark modeling window AC plug-in wattages, duty cycle power partitioning, CEER efficiency curves, state utility rate matrices, and room-level zone-cooling economics under May 2026 EIA data (18.44¢/kWh).
- **State Pages Conflict**: Checked `/electricity-rates/california`, `/electricity-rates/texas`, `/electricity-rates/florida`, and `/electricity-rates/new-york`. State pages document statewide average retail rates and utility territories. This Insight analyzes the electrical equipment efficiency of window cooling hardware.
- **Calculators Conflict**: Checked `/tools/ac-cost-calculator`. The calculator provides an interactive, user-input tool for custom room dimensions and personal utility rates. This Insight provides fixed benchmark comparisons, empirical compressor duty cycle breakdowns, and multi-tier capacity analysis.
- **Insights Conflict**: Audited all 27 existing Insight articles. While `august-2026-central-air-conditioner-seer2-cooling-cost-benchmark` examined whole-home 3-ton central AC SEER2 ratings, `august-2026-summer-thermostat-setting-cooling-cost-benchmark` examined central setpoints, and `august-2026-ductless-mini-split-heat-pump-operating-cost-benchmark` examined ductless heat pumps, no existing Insight analyzes window air conditioners, CEER efficiency standards, plug-in wattage draws, hourly running costs, and supplemental bedroom zoning savings vs central AC.
- **Decision**: `APPROVE AS NEW INSIGHT`

---

## 3. Primary Source Verification

1. **U.S. Energy Information Administration (EIA)**:
   - Dataset: _Electric Power Monthly (May 2026 Data Release)_, Table 5.6.A (Average Price of Electricity to Ultimate Customers by End-Use Sector).
   - URL: https://www.eia.gov/electricity/monthly/
   - Verification: U.S. residential national average rate is 18.44¢/kWh; state rates include WA (11.52¢), TX (15.50¢), FL (15.82¢), PA (19.26¢), NY (24.80¢), CA (32.40¢), and HI (52.00¢).
2. **U.S. Department of Energy (DOE)**:
   - Standard: _10 CFR Part 430 — Energy Conservation Program: Energy Conservation Standards for Room Air Conditioners_.
   - URL: https://www.energy.gov/eere/buildings/appliance-and-equipment-standards-program
   - Verification: Establishes federal minimum Combined Energy Efficiency Ratio (CEER) ratings ranging from 10.8 to 12.1 CEER depending on BTU cooling capacity and louvered vs non-louvered chassis.
3. **ENERGY STAR (U.S. EPA & DOE)**:
   - Standard: _ENERGY STAR Program Requirements for Room Air Conditioners (Version 4.2)_.
   - URL: https://www.energystar.gov/products/room_air_conditioners
   - Verification: ENERGY STAR certified room ACs deliver CEER ratings 9% to 35% higher than federal baselines, with variable-speed inverter models achieving CEER ratings of 15.0 or higher.
4. **National Renewable Energy Laboratory (NREL)**:
   - Resource: _Building America Research Benchmark Definition: Space Cooling and Room Air Conditioner Performance Curves_.
   - URL: https://www.nrel.gov/docs/fy14osti/60988.pdf
   - Verification: Field measurements confirm residential room AC compressors cycle between 50% and 70% duty cycle in conditioned rooms during typical summer conditions, reducing effective hourly electrical consumption below peak nameplate wattage.

---

## 4. Original Value Contribution

- **Original Calculation & Hourly Formula Derivation**:
  - Showed exact power and cost formulas:
    $$\text{Cost per Hour} = \left(\frac{\text{Input Watts} \times \text{Duty Cycle}}{1,000}\right) \times \text{Electricity Rate (\$/kWh)}$$
  - Modeled continuous peak nameplate draw vs realistic 55% cycling duty cycle across 5 standard capacity tiers:
    1. 5,000 BTU (450W peak / 248W cycling): 8.30¢/hr peak ($0.66/8h) vs 4.56¢/hr cycling ($0.36/8h; $10.95/month for 8h/day).
    2. 8,000 BTU (700W peak / 385W cycling): 12.91¢/hr peak ($1.03/8h) vs 7.10¢/hr cycling ($0.57/8h; $17.04/month for 8h/day).
    3. 10,000 BTU (875W peak / 481W cycling): 16.14¢/hr peak ($1.29/8h) vs 8.87¢/hr cycling ($0.71/8h; $21.29/month for 8h/day).
    4. 12,000 BTU (1,050W peak / 578W cycling): 19.36¢/hr peak ($1.55/8h) vs 10.65¢/hr cycling ($0.85/8h; $25.56/month for 8h/day).
    5. 15,000 BTU (1,400W peak / 770W cycling): 25.82¢/hr peak ($2.07/8h) vs 14.20¢/hr cycling ($1.14/8h; $34.08/month for 8h/day).
- **State-by-State Disparity Matrix (8,000 BTU Unit Running 8 Hours/Day @ 55% Duty Cycle = 92.4 kWh/month)**:
  - Modeled monthly costs across 8 state electricity rate benchmarks: WA ($10.65/mo), TX ($14.32/mo), FL ($14.62/mo), National ($17.04/mo), PA ($17.80/mo), NY ($22.92/mo), CA ($29.94/mo), and HI ($48.05/mo).
- **Inverter Variable-Speed vs Fixed-Speed Savings**:
  - For an 8,000 BTU unit operating 12 hours/day for 90 summer days (1,080 hours):
    - Standard Fixed-Speed (11.4 CEER · 385W average draw): 415.8 kWh = $76.67/summer.
    - Inverter Variable-Speed (15.0 CEER · 275W average draw): 297.0 kWh = $54.77/summer.
    - Direct Inverter Savings: 118.8 kWh (28.6% electricity reduction / $21.90/summer savings; up to $38.49/summer in CA).
- **Overnight Zone-Cooling Economics vs Whole-Home Central AC**:
  - Compared cooling a 300 sq ft bedroom at 72°F overnight (10 PM–6 AM) using an 8,000 BTU window unit (385W average draw = 92.4 kWh/mo = $17.04/mo) + relaxing central AC to 78°F ($26.55/mo) = **$43.59/month** total vs cooling the entire 2,200 sq ft house to 72°F using a 3.5-ton central AC (1,920W average draw = 460.8 kWh/mo = **$84.97/month**).
  - Supplemental bedroom zoning saves **$41.38/month (48.7% reduction)** nationally, and up to **$72.71/month** in California.

---

## 5. Final Decision

- **Decision**: `APPROVE AS NEW INSIGHT`
