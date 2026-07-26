# Active Task

## Current Task

- Phase: Guide Expansion Batch 4 — Heating, Cooling, and Home Efficiency
- Status: Complete & Verified (Awaiting User Review / Deployment)
- Scope Completed & Verified:
  1. Implemented Exactly 10 New Source-Reviewed Guides (Total 40 Guides Implemented in Repository):
     - `/guides/how-much-electricity-does-central-air-conditioning-use`
     - `/guides/how-much-electricity-does-a-portable-air-conditioner-use`
     - `/guides/how-much-electricity-does-a-ductless-mini-split-use`
     - `/guides/how-much-electricity-does-a-heat-pump-use`
     - `/guides/how-much-electricity-does-an-electric-furnace-use`
     - `/guides/how-much-electricity-does-electric-baseboard-heating-use`
     - `/guides/how-much-can-a-smart-thermostat-save`
     - `/guides/should-you-turn-off-the-air-conditioner-when-away`
     - `/guides/how-air-leaks-increase-your-energy-bill`
     - `/guides/how-attic-insulation-affects-your-energy-bill`
  2. Total Guide Inventory: Exactly 40 canonical guides implemented in the repository (10 Batch 1 + 10 Batch 2 + 10 Batch 3 + 10 Batch 4).
  3. Inventory Integrity: 50 state reports remain 50, 10 calculators remain 10, research report architecture remains unchanged. Do not create Guide Batch 5.
  4. Single Canonical Guide Registry Architecture: `energyGuides` dictionary in `apps/web/src/content/guides.ts` is the sole manually maintained registry. `GUIDE_ROUTES`, `publicRoutes`, `sitemapRoutes`, and `STATIC_ADS_ALLOWED_ROUTES` derive dynamically. Zero hardcoded duplicate lists exist.
  5. Content & Source Precision Audit:
     - Central AC: 20%–30% duct losses attributed to U.S. DOE Energy Saver; 60% compressor duty cycle explicitly labeled as an illustrative calculation assumption for peak summer demand.
     - Ductless Mini-Split: Inverter modulation (200W–1,500W) and SEER2 (18–30+) / HSPF2 (9–12+) ratings labeled as manufacturer performance specs; replaced "zero duct losses" with "avoids the distribution losses associated with central ductwork".
     - Electric Furnace: Monthly consumption (1,350–2,700 kWh) explicitly labeled as an illustrative calculation assumption.
     - Baseboard Heating: 250W per linear foot labeled as a standard manufacturer sizing specification.
     - Smart Thermostats: 8%–12% heating and 15% cooling savings attributed to independent field research evaluated by ENERGY STAR.
     - Air Sealing: 15%–20% energy bill reduction attributed to U.S. DOE & ENERGY STAR benchmarks.
     - Turning Off AC When Away: Explains that safe thermostat setbacks depend dynamically on climate, humidity, pets, health needs, construction, and HVAC equipment capacity (not presented as universally identical).
     - Attic Insulation: Recommended depths (10–22 inches for R-30 to R-60) attributed directly to U.S. DOE climate zone guidelines.
  6. Accessibility Framing: Implemented and reviewed toward WCAG 2.2 AA (heading structure H1->H2->H3, scoped table headers, local table scrolling wrappers). Unverified visual contrast and keyboard claims removed; Browser Review marked Skipped.
  7. Quality Gate Execution Results:
     - `pnpm format:check` — PASSED (Prettier compliant)
     - `pnpm typecheck` — PASSED (0 errors across 9 packages)
     - `pnpm lint` — PASSED (10/10 tasks)
     - `pnpm --filter=@energy-bill-lab/web test` — PASSED (19 test files, 104 tests)
     - `pnpm --filter=@energy-bill-lab/database test` — PASSED (2 test files, 11 tests)
     - `pnpm --filter=@energy-bill-lab/api test` — PASSED (1 test file, 3 tests)
     - `pnpm build:web` — PASSED (40 guide routes & 50 state paths prerendered)
     - `pnpm build:api` — PASSED
     - `git diff --check` — PASSED (0 whitespace warnings)
  8. Protected Files Unchanged: `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` remain 100% untouched (0 diff).
- Strict Git Rules: Read-only commands used by agent. All changes remain unstaged in working tree.
- Suggested Commit: `feat(guides): publish fourth home efficiency guide batch`
