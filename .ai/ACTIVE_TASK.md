# Active Task

## Current Task

- Phase: Guide Experience, Footer Information Architecture, HTML Validity, and Repository Hygiene Hardening
- Status: Completed (All guide UI, footer IA, table markup, and hygiene hardening complete — No active implementation task)
- HTML Fixes:
  - Corrected malformed `<table>` JSX in all 5 guide pages (`/guides/why-is-my-electric-bill-so-high`, `/guides/how-much-electricity-do-household-appliances-use`, `/guides/how-much-does-it-cost-to-run-an-air-conditioner`, `/guides/how-much-does-it-cost-to-run-a-space-heater`, `/guides/how-much-does-it-cost-to-charge-an-ev-at-home`).
  - Moved `aria-label="..."` attribute inside `<table aria-label="...">` opening tag, resolving visible text rendering and Next.js hydration errors.
- Footer Redesign:
  - Redesigned `getFooterGroups()` in `apps/web/src/lib/routes.ts` to link to primary hubs (`Tools`, `Learn`, `Company`, `Legal`) instead of listing all 10 states and 5 guides individually.
  - Reduced vertical height, balanced column widths, added keyboard focus indicators, and improved responsive touch padding.
- Guides Hub Redesign:
  - Updated `apps/web/src/app/guides/page.tsx` with distinct visual hierarchy: "Energy Problem Guides" (5 editorial cards) separated from "Use a Calculator" (compact calculator links).
- Guide Design System:
  - Replaced bright blue hardcoded CTA styling (`#0284c7` / `#0369a1`) with Energy Bill Lab brand teal palette (`var(--ebl-primary, #176b5b)` and `#f0faf8`).
  - Restrained H1 typography, unified metadata headers, and used natural CTA action labels ("Analyze my electricity bill", etc.).
- Gitignore Hardening:
  - Expanded root `.gitignore` to cover build outputs (`.next/`, `.turbo/`, `dist/`), test results (`coverage/`, `test-results/`), logs (`*.log`), and OS files while explicitly preserving `.env.example`.
- Regression Tests:
  - Added unit test suite in `apps/web/tests/guides.test.ts` verifying table HTML validity, absence of raw `aria-label` text, table captions, scoped headers, footer hubs, and calculator link separation (62/62 tests passing).
- Skipped Checks: Real browser viewport visual rendering, responsive layout shifts, and mobile drawer animations skipped due to lack of automated Chromium browser engine session.
- Strict Git Rules: Read-only Git commands only. All changes remain unstaged in working tree for repository owner review.
- Suggested Commit: `fix(guides): harden guide UI footer and HTML structure`
