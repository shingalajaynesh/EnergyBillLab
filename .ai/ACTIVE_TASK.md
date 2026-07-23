# Active Task

## Current Task

- Status: Completed (Ready for review)
- Phase: Fix State Rates Data Integrity & Provenance Architecture
- Completed Actions:
  - Removed all hardcoded rate fallback constants (`FALLBACK_EIA_RATES`) to prevent presenting static figures as live EIA data when PostgreSQL is offline.
  - Implemented explicit `RateDataProvenance` model (`live_database` | `bundled_snapshot` | `unavailable`) across `get-state-rates.ts` and `get-state-page-data.ts`.
  - Configured state rates hub (`/electricity-rates`) and state reports (`/electricity-rates/[state]`) to suppress numerical rate claims and render `<DataUnavailablePanel>` when provenance is `unavailable`.
  - Updated calculator pages and state rate selectors to display _"State averages are temporarily unavailable — please enter your utility rate below"_ while maintaining 100% manual input functionality.
  - Added unit tests for provenance statuses, database failure returns, state page unavailable view models, and gap detection.
  - Documentation updated in `docs/product/electricity-rate-state-pages.md`, `docs/operations/rate-data-fallbacks.md`, and `docs/data-sources/eia-electricity-rates.md`.
- Strict Git Restriction: Read-only Git commands only. All changes remain unstaged in working tree for repository owner review.
- Suggested Commit: `fix(state-rates): prevent stale fallback rate claims`

## Last Completed Task

- Phase: Redesign Electricity Rates Hub and State Reports
- Status: Completed and verified
