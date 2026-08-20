# Active Task

## Current Task

- Phase: Daily Energy Insight Production Task
- Date: August 20, 2026
- Status:
  - PASS - scalable Insights infrastructure completed locally and initial batch publication prepared
  - PASS - first launch Insight prepared and included in the initial published batch
  - PASS - second launch Insight prepared and included in the initial published batch
  - PASS - third launch Insight prepared and initial three-Insight batch marked `published`
  - PASS - first post-launch daily Insight prepared and marked `published`
  - PASS - Insights trust section converted into a compact secondary layout
  - PASS - Phase 1 Natural Gas Data, Rate Explanation, and Household Cost Tools completed locally
  - PASS - August 1, 2026 Daily Insight "August 2026 Time-of-Use Peak Rate Spread & Appliance Load-Shifting Savings Benchmark" completed, validated, and marked `published`
  - PASS - August 3, 2026 Daily Insight "August 2026 U.S. Census Division Residential Electricity Rate Breakdown" completed, validated, and marked `published`
  - PASS - August 4, 2026 Daily Insight "August 2026 Home Appliance Operating Cost Hierarchy & Monthly Expense Benchmark" completed, validated, and marked `published`
  - PASS - August 5, 2026 Daily Insight "August 2026 Residential Natural Gas vs. Electric Heating Cost-per-MMBtu & AFUE Efficiency Benchmark" completed, validated, and marked `published`
  - PASS - August 6, 2026 Daily Insight "August 2026 Portable Electric Space Heater Operating Cost & Wattage Benchmark" completed, validated, and marked `published`
  - PASS - August 7, 2026 Daily Insight "August 2026 Electric Clothes Dryer kWh Consumption & Monthly Operating Cost Benchmark" completed, validated, and marked `published`
  - PASS - August 10, 2026 Daily Insight "August 2026 Residential Refrigerator kWh Consumption & Annual Operating Cost Benchmark" completed, validated, and marked `published`
  - PASS - August 11, 2026 Daily Insight "August 2026 Electric Dishwasher kWh Consumption & Heated Dry vs. Air-Dry Operating Cost Benchmark" completed, validated, and marked `published`
  - PASS - August 12, 2026 Daily Insight "August 2026 Electric Clothes Washer kWh Consumption & Hot vs. Cold Water Wash Operating Cost Benchmark" completed, validated, and marked `published`
  - PASS - August 13, 2026 Daily Insight "August 2026 Electric Dehumidifier kWh Consumption & Humidity Control Operating Cost Benchmark" completed, validated, and marked `published`
  - PASS - August 14, 2026 Daily Insight "August 2026 Rooftop Solar NEM 3.0 Net Billing Export Value Benchmark" completed, validated, and marked `published`
  - PASS - August 15, 2026 Daily Insight "August 2026 Swimming Pool Pump kWh Consumption & Variable-Speed Operating Cost Benchmark" completed, validated, and marked `published`
  - PASS - August 16, 2026 Daily Insight "August 2026 Induction vs. Electric Radiant vs. Gas Cooktop Energy Cost & Efficiency Benchmark" completed, validated, and marked `published`
  - PASS - August 17, 2026 Daily Insight "August 2026 Ductless Mini-Split Heat Pump Operating Cost: Monthly Electricity & Efficiency Benchmark" completed, validated, and marked `published`
  - PASS - August 18, 2026 Daily Insight "August 2026 Summer Thermostat Setting Financial Curve: 72°F vs. 75°F vs. 78°F Air Conditioning Cost Benchmark" completed, validated, and marked `published`
  - PASS - August 19, 2026 Daily Insight "August 2026 Electric Vehicle Home Charging Efficiency Benchmark: Level 1 (120V) vs. Level 2 (240V) Energy Losses & Annual Electricity Cost" completed, validated, and marked `published`
  - PASS - August 20, 2026 Daily Insight "August 2026 Window Air Conditioner Wattage & Hourly Operating Cost Benchmark: 5,000 to 15,000 BTU Electricity Costs & Zone-Cooling Savings" completed, validated, and marked `published`
  - PENDING - production deployment and browser verification
- Scope & Governance Completed:
  1. **Daily Insight Production:** Completed full research, conflict audit, calculation modeling, isolated article module creation, registry registration, visual card integration, and comprehensive test suite verification for the 28th published Insight (`august-2026-window-air-conditioner-wattage-operating-cost-benchmark`).
  2. **Original-Value Calculations:** Formulated exact hourly running costs ($\text{Cost} = [(\text{Watts} \times \text{Duty Cycle}) / 1,000] \times \text{Rate}$), modeled 5 cooling capacity tiers (5k BTU @ 450W / 248W cycling; 8k BTU @ 700W / 385W cycling; 10k BTU @ 875W / 481W cycling; 12k BTU @ 1,050W / 578W cycling; 15k BTU @ 1,400W / 770W cycling), and derived hourly, daily, and monthly expense matrices at the May 2026 EIA national average rate of 18.44¢/kWh.
  3. **State-Level Matrix & Inverter Economics:** Benchmarked 8k BTU running costs across 8 state rate benchmarks (WA @ $10.65/mo; TX @ $14.32/mo; FL @ $14.62/mo; National @ $17.04/mo; PA @ $17.80/mo; NY @ $22.92/mo; CA @ $29.94/mo; HI @ $48.05/mo). Modeled variable-speed inverter compressor efficiency (15.0 CEER vs 11.4 CEER), proving a 28.6% seasonal electricity reduction ($21.90/summer savings; up to $38.49/season in CA).
  4. **Overnight Zone-Cooling vs Central AC Arbitrage:** Modeled overnight 8-hour cooling of an occupied bedroom using an 8k BTU window AC ($17.04/mo) + relaxing central AC to 78°F ($26.55/mo) = $43.59/mo total vs running a 3.5-ton central AC at 72°F ($84.97/mo), demonstrating **$41.38/month (48.7%) in direct net savings** nationally ($72.71/mo in CA).
  5. **Protected Files Unchanged:** `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` have 0 diff.
  6. **Strict Git Rules:** Zero Git write commands executed; all changes remain unstaged in working tree.
- Suggested Commit: `content(insights): publish august 2026 window air conditioner wattage operating cost benchmark`
