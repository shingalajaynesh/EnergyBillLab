# Active Task

## Current Task

- Phase: Guide Expansion Batch 5 — Electricity Bills, Rates, and Metering
- Status: Complete & Verified (Awaiting User Review / Deployment)
- Scope Completed & Verified:
  1. Implemented Exactly 10 New Source-Reviewed Guides (Total 50 Guides Implemented in Repository):
     - `/guides/how-to-read-an-electric-bill-line-by-line`
     - `/guides/what-is-a-time-of-use-electricity-rate`
     - `/guides/peak-vs-off-peak-electricity-hours-explained`
     - `/guides/fixed-vs-variable-electricity-rates`
     - `/guides/what-is-a-demand-charge-on-an-electric-bill`
     - `/guides/estimated-vs-actual-meter-reading`
     - `/guides/how-budget-billing-works`
     - `/guides/why-electricity-rates-change`
     - `/guides/fuel-adjustment-charges-and-utility-riders-explained`
     - `/guides/how-net-metering-affects-your-electric-bill`
  2. Total Guide Inventory: Exactly 50 canonical guides implemented in the repository (10 Batch 1 + 10 Batch 2 + 10 Batch 3 + 10 Batch 4 + 10 Batch 5).
  3. Inventory Integrity: 50 state reports remain 50, 10 calculators remain 10, research report architecture remains unchanged. Do not create Guide Batch 6.
  4. Single Canonical Guide Registry Architecture: `energyGuides` dictionary in `apps/web/src/content/guides.ts` is the sole manually maintained registry. `GUIDE_ROUTES`, `publicRoutes`, `sitemapRoutes`, and `STATIC_ADS_ALLOWED_ROUTES` derive dynamically. Zero hardcoded duplicate lists exist.
  5. Search-Intent Separation: Reading an Electric Bill (line items & effective rate), Time-of-Use Rates (scheduled time pricing & load shifting), Peak vs Off-Peak Hours (grid demand windows & seasonal variations), Fixed vs Variable Rates (supply contracts & market volatility), Demand Charges (kW vs kWh peak interval billing), Estimated vs Actual Meter Reading (smart meters & true-up catch-up bills), Budget Billing (12-month payment smoothing & deferred balances), Why Electricity Rates Change (generation fuels, transmission grid, & rate cases), Fuel Adjustments & Riders (FAC, storm recovery fees, & regulatory surcharges), Net Metering & Solar Credits (imported vs exported kWh, NEM 1.0/2.0/3.0, & minimum bills).
  6. Formulas & Regulatory Classifications: Deterministic formulas included for Effective Rate, TOU Cost, Demand Charge, Meter Adjustment, and Net Metering. All exact values labeled as official tariff/regulator values, official national benchmarks, utility-specific examples, or illustrative calculation assumptions.
  7. Quality Gate Execution Results:
     - `pnpm format:check` — PASSED (Prettier compliant)
     - `pnpm typecheck` — PASSED (0 errors across 9 packages)
     - `pnpm lint` — PASSED (10/10 tasks)
     - `pnpm test` — PASSED (19 test files, 104 tests passed)
     - `pnpm --filter=@energy-bill-lab/web test` — PASSED
     - `pnpm --filter=@energy-bill-lab/database test` — PASSED
     - `pnpm --filter=@energy-bill-lab/api test` — PASSED
     - `pnpm build:web` — PASSED (50 guide routes & 50 state paths prerendered)
     - `pnpm build:api` — PASSED
     - `git diff --check` — PASSED (0 whitespace warnings)
  8. Protected Files Unchanged: `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` remain 100% untouched (0 diff).
- Strict Git Rules: Read-only commands used by agent. All changes remain unstaged in working tree.
- Suggested Commit: `feat(guides): publish fifth electricity billing guide batch`
- Next Phase Shift: Shift from publishing new guides to improving existing pages with Search Console performance data, stronger internal links, richer comparison tools, and one new high-demand calculator.
