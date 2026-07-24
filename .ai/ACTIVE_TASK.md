# Active Task

## Current Task

- Phase: Research Phase: First Original U.S. Residential Electricity-Rate Report
- Status: Completed (Hardened Data & Export Integrity)
- Scope Completed:
  1. Research Hub & Report Routes: Published `/research` (Research Hub) and `/research/us-residential-electricity-rate-report` (First National Electricity-Rate Report). Registered routes in `publicRoutes` and `sitemapRoutes`.
  2. Single Common Reporting Period Enforcement: Evaluated all 50 canonical U.S. state residential rate records and national averages strictly for one common EIA reporting period (`2026-04`). DC and non-state territories explicitly excluded from 50 state rankings.
  3. Server-Side Typed Report Model: Implemented `getNationalRateReportUncached()` in `apps/web/src/lib/server/get-national-rate-report.ts` computing state rankings, month-over-month rate movements, 12-month annual shifts, and normalized 500–1,500 kWh household energy charge benchmarks ($kWh \times \text{rate} / 100$).
  4. Full Database vs Editorial Scope: Analyzed all 50 U.S. states in PostgreSQL while linking only the 20 editorially published state pages (`/electricity-rates/california`, etc.). Non-editorial states display clean plaintext badges.
  5. Missing Data Integrity: Missing reporting periods remain `null` or "Not reported", never converted to zero or interpolated.
  6. Technical CSV Export: Created `/research/us-residential-electricity-rate-report/csv/route.ts` with exact header schema, UTF-8 charset, attachment headers, 50-state coverage, and identical cache revalidation window.
  7. Report Structured Data: Added `Report` JSON-LD schema with canonical URL, publisher, author, EIA attribution, temporal coverage, spatial coverage, and measured variable.
  8. Internal Ethical Outreach Kit: Created `docs/growth/electricity-rate-report-outreach-kit.md` with 5 targeted pitch templates (journalists, finance writers, researchers, public libraries, data corrections) and strict non-negotiable boundaries.
  9. Technical & Data Documentation: Updated `docs/research/us-residential-electricity-rate-report.md`, `docs/growth/state-coverage-and-authority.md`, `docs/operations/production-readiness.md`.
  10. Deliberate Ad Ineligibility: Left research report routes out of `ADS_ALLOWED_ROUTES` pending manual production review.
  11. Protected Files: `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, `render.yaml` remain 100% untouched.
- Strict Git Rules: Read-only commands used by agent. All changes remain unstaged in working tree.
- Suggested Commit: `fix(research): harden national report data and export integrity`
