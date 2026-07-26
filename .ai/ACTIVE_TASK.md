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
  5. Search-Intent Separation: Reading an Electric Bill (line items & effective rate), Time-of-Use Rates (scheduled time pricing & load shifting), Peak vs Off-Peak Hours (grid demand windows & seasonal variations), Fixed vs Variable Rates (supply contracts & market volatility), Demand Charges (kW vs kWh peak interval billing), Estimated vs Actual Meter Reading (smart meters & true-up catch-up bills), Budget Billing (12-month payment smoothing & deferred balances), Why Electricity Rates Change (generation fuels, transmission grid, & rate cases), Fuel Adjustments & Riders (FAC, storm recovery fees, & regulatory surcharges), Net Metering & Solar Credits (imported vs exported kWh, California Net Billing Tariff / NEM 3.0, & minimum bills).
  6. Factual Verification & Reconciliation Audit:
     - **SCE TOU-D-PRIME:** Uses a 4 p.m.–9 p.m. time window, but price classification (on-peak vs mid-peak vs off-peak) varies by season and weekday/weekend status.
     - **Xcel Energy Minnesota:** On-peak period is 9 a.m. to 9 p.m. weekdays under the current Minnesota Residential Time of Day schedule.
     - **APS:** Current residential TOU plan uses a 4 p.m.–7 p.m. weekday on-peak period (excluding holidays).
     - **CPUC Net Billing Tariff:** Adopted through CPUC Decision D.22-12-056 within proceeding R.20-08-020 (transition date April 15, 2023).
     - **Git History Reconciliation:** Commit `f253b3a` (`feat(guides): publish fifth electricity billing guide batch`) was committed in Git history prior to this turn. All 10 Batch 5 page components are tracked in Git history, and current factual corrections remain unstaged modifications on top of `f253b3a`.
  7. Quality Gate Execution Results:
     - `pnpm format:check` — PASSED (Prettier compliant)
     - `pnpm typecheck` — PASSED (0 errors across 9 packages)
     - `pnpm lint` — PASSED (10/10 tasks)
     - `pnpm test` — PASSED (19 test files, 104 tests passed)
     - `pnpm --filter=@energy-bill-lab/web test` — PASSED
     - `pnpm --filter=@energy-bill-lab/database test` — PASSED
     - `pnpm --filter=@energy-bill-lab/api test` — PASSED
     - `pnpm build:web` — PASSED (The production web build passed. The final Next.js route table includes all 50 guide routes and 50 generated state paths.)
     - `pnpm build:api` — PASSED
     - `git diff --check` — PASSED (0 whitespace warnings)
  8. Protected Files Unchanged: `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` remain 100% untouched (0 diff).
- Git State: Factual correction pass modifications remain unstaged in working tree on top of commit `f253b3a`. No Git write commands were executed during this turn.
- Suggested Commit: `feat(guides): publish fifth electricity billing guide batch`
- Next Phase Shift: Shift from publishing new guides to improving existing pages with Search Console performance data, stronger internal links, richer comparison tools, and one new high-demand calculator.
