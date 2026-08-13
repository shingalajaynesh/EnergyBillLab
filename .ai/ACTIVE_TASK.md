# Active Task

## Current Task

- Phase: Daily Energy Insight Production Task
- Date: August 13, 2026
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
  - PENDING - production deployment and browser verification
- Scope & Governance Completed:
  1. **Daily Insight Production:** Completed full research, conflict audit, calculation modeling, isolated article module creation, registry registration, and comprehensive test suite verification for the 21st published Insight (`august-2026-electric-dehumidifier-kwh-operating-cost-benchmark`).
  2. **Topic Research Record:** Saved to `docs/editorial/topic-research/2026-08-13-august-2026-electric-dehumidifier-kwh-operating-cost-benchmark.md`.
  3. **Original-Value Calculations:** Derived daily/monthly kWh and operating costs across 3 capacity sizes (30-pint @ 300W, 50-pint standard @ 550W, 50-pint ENERGY STAR @ 420W, 70-pint @ 750W) and 2 duty cycles (12-hr/day moderate @ 50% duty cycle vs. 24-hr/day continuous @ 100% duty cycle). Proved an ENERGY STAR 50-pint unit saves 46.8 kWh/month ($8.63/month nationally at 18.44¢/kWh, $15.16/month in CA at 32.40¢/kWh, $24.34/month in HI at 52.00¢/kWh) compared to a standard 50-pint unit, cutting summer humidity control expenses by 23.6%. Proved continuous 24/7 run-time doubles monthly power bills to $73.02 nationally and $205.92 in HI, demonstrating that calibrating humidistat to 50% RH saves $36.51/month ($109.53 over summer).
  4. **State-Level Monthly Matrix:** Benchmarked 50-pint dehumidifier monthly operating cost across state rate extremes (HI @ $102.96/mo, CA @ $64.15/mo, NY @ $59.26/mo vs TX @ $32.55/mo and WA @ $22.81/mo).
  5. **Protected Files Unchanged:** `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` have 0 diff.
  6. **Strict Git Rules:** Zero Git write commands executed; all changes remain unstaged in working tree.
- Suggested Commit: `content(insights): publish august 2026 electric dehumidifier kwh operating cost benchmark`
