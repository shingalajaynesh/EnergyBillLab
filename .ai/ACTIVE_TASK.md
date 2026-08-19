# Active Task

## Current Task

- Phase: Daily Energy Insight Production Task
- Date: August 19, 2026
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
  - PENDING - production deployment and browser verification
- Scope & Governance Completed:
  1. **Daily Insight Production:** Completed full research, conflict audit, calculation modeling, isolated article module creation, registry registration, visual card integration, and comprehensive test suite verification for the 27th published Insight (`august-2026-ev-home-charging-efficiency-losses-benchmark`).
  2. **Original-Value Calculations:** Derived power partitioning ($P_{\text{grid}} = P_{\text{battery}} + P_{\text{aux}} + P_{\text{loss}}$), continuous ~250W auxiliary parasitic baseload (BMS, telematics, coolant pumps), wall-to-battery charging efficiencies (Level 1 @ 82.5% vs Level 2 32A @ 91.0% vs Level 2 48A @ 92.0%), annual grid draw ($4,363.6\text{ kWh/yr}$ vs $3,956.0\text{ kWh/yr}$ for 12,000 miles), and annual electricity costs ($804.65/yr vs $729.49/yr at May 2026 EIA national rate 18.44¢/kWh). Demonstrated Level 2 avoids 407.6 kWh/year of grid waste ($75.16/year direct savings).
  3. **State-Level Matrix & TOU Compounding:** Benchmarked annual efficiency savings across 8 state rates (WA @ $46.95/yr; TX @ $63.17/yr; FL @ $64.48/yr; National @ $75.16/yr; PA @ $78.51/yr; NY @ $101.08/yr; CA @ $132.06/yr; HI @ $211.95/yr). Modeled 30 kWh session duration and BMS awake time (25.25h on Level 1 wasting 6.31 kWh auxiliary power vs 4.29h on Level 2 wasting 1.07 kWh). Modeled TOU window capture arbitrage ($4.62/session on Level 2 in overnight super-off-peak vs $10.01/session on Level 1 spilling into peak rates; $646.80/year annual TOU savings).
  4. **Protected Files Unchanged:** `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` have 0 diff.
  5. **Strict Git Rules:** Zero Git write commands executed; all changes remain unstaged in working tree.
- Suggested Commit: `content(insights): publish august 2026 ev home charging efficiency losses benchmark`
