# Active Task

## Current Task

- Phase: Energy Insights Publishing System & Governance Infrastructure
- Date: July 30, 2026
- Status:
  - PASS - scalable Insights infrastructure completed locally and initial batch publication prepared
  - PASS - first launch Insight prepared and included in the initial published batch
  - PASS - second launch Insight prepared and included in the initial published batch
  - PASS - third launch Insight prepared and initial three-Insight batch marked `published`
  - PASS - first post-launch daily Insight prepared and marked `published`
  - PASS - Insights trust section converted into a compact secondary layout
  - PASS - Phase 1 Natural Gas Data, Rate Explanation, and Household Cost Tools completed locally
  - PENDING - production deployment and browser verification
- Scope & Governance Completed:
  1. **Phase 1 Natural Gas Expansion:** Completed official EIA natural gas dataset discovery, database schemas (`natural_gas_geographies`, `natural_gas_residential_prices_monthly`), `NaturalGasImportService` with advisory lock `987654322`, and data queries.
  2. **Calculation Engine:** Added `calculateNaturalGasBill` and `calculateGasFurnaceCost` formulas to `@energy-bill-lab/calculation-engine`.
  3. **Public Routes:** Implemented `/natural-gas-rates` national hub, `/tools/natural-gas-bill-calculator`, and `/tools/gas-furnace-cost-calculator`.
  4. **State-Page Governance:** Preserved state-page policy; no 50 state natural-gas routes (`/natural-gas-rates/[state]`) published in Phase 1.
  5. **Protected Files Unchanged:** `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` have 0 diff.
  6. **Strict Git Rules:** Zero Git write commands executed; all changes remain unstaged in working tree.
- Suggested Commit: `feat(natural-gas): add residential price data and cost tools`
