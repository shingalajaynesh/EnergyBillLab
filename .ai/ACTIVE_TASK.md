# Active Task

## Current Task

- Phase: Guide Expansion Batch 3
- Status: Complete & Verified (Awaiting User Review / Deployment)
- Scope Completed & Verified:
  1. Published Exactly 10 New Source-Reviewed Guides (Total 30 Published Guides):
     - `/guides/how-much-electricity-does-a-microwave-use`
     - `/guides/how-much-electricity-does-an-air-fryer-use`
     - `/guides/how-much-electricity-does-a-television-use`
     - `/guides/how-much-electricity-does-a-wifi-router-use`
     - `/guides/how-much-electricity-does-a-laptop-use`
     - `/guides/how-much-electricity-does-an-electric-kettle-use`
     - `/guides/how-much-electricity-does-an-induction-cooktop-use`
     - `/guides/how-much-electricity-does-a-window-air-conditioner-use`
     - `/guides/what-is-vampire-power-and-how-much-does-it-cost`
     - `/guides/heat-pump-vs-electric-resistance-heating-cost`
  2. Total Guide Count: Exactly 30 published guides (10 Batch 1 + 10 Batch 2 + 10 Batch 3).
  3. Inventory Integrity: 50 state reports remain 50, 10 calculators remain 10, research reports remain unchanged. Do not create Guide Batch 4.
  4. Single Canonical Guide Registry Architecture: `energyGuides` dictionary in `apps/web/src/content/guides.ts` is the sole manually maintained registry. `GUIDE_ROUTES`, `publicRoutes`, `sitemapRoutes`, and `STATIC_ADS_ALLOWED_ROUTES` derive dynamically. Zero hardcoded duplicate lists exist.
  5. Content Standards & Editorial Trust Rules: Direct answer near top, transparent energy formula, worked cost examples, low/typical/high scenarios, assumptions & limitations, calculator CTA, related guides, methodology link, data sources link, consumer disclaimer, reviewed dates (`2026-07-26`), primary sources (U.S. DOE, ENERGY STAR, U.S. EIA, LBNL, NIST). Exact numerical values labeled as illustrative calculation assumptions or typical manufacturer benchmarks.
  6. Accessibility: Implemented and reviewed toward WCAG 2.2 AA (heading hierarchy H1->H2->H3, table captions, scoped headers, local table scrolling, focus states).
  7. Automated Tests (`apps/web/tests/guides.test.ts` & `routes.test.ts`):
     - Exactly 30 unique guide slugs in canonical registry
     - Exactly 10 Batch 3 guide slugs exist
     - `GUIDE_ROUTES` contains exactly 30 routes
     - Every guide appears once in `publicRoutes` and `sitemapRoutes`
     - Every published guide is deliberately ad-eligible
     - Unknown guide routes are not ad-eligible
     - Every related-guide link resolves to a valid public route
  8. Quality Gate Execution Results:
     - `pnpm format:check` — PASSED (Prettier compliant)
     - `pnpm typecheck` — PASSED (0 errors across 9 packages)
     - `pnpm lint` — PASSED (10/10 tasks)
     - `pnpm test` — PASSED (19 test files, 104 tests passed)
     - `pnpm --filter=@energy-bill-lab/web test` — PASSED
     - `pnpm --filter=@energy-bill-lab/database test` — PASSED
     - `pnpm --filter=@energy-bill-lab/api test` — PASSED
     - `pnpm build:web` — PASSED (112 static pages prerendered)
     - `pnpm build:api` — PASSED
  9. Protected Files Unchanged: `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` remain 100% untouched (0 diff).
- Strict Git Rules: Read-only commands used by agent. All changes remain unstaged in working tree.
- Suggested Commit: `feat(guides): publish third household energy guide batch`
- Final Recommendation: `Review and deploy Guide Batch 3 (30 total guides live). Monitor search impressions, guide traffic, and calculator conversions in Google Search Console to select Batch 4 topics based on actual user demand.`
