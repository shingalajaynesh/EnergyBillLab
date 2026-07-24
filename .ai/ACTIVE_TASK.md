# Active Task

## Current Task

- Phase: Final Review of the First Five Appliance-Expansion Calculators
- Status: Completed (Formula, source, mobile UX, accessibility, analytics privacy, and production review of the 5 expansion calculators verified — No active implementation task)
- Verified Scope:
  - 5 expansion calculators (`/tools/refrigerator-cost-calculator`, `/tools/clothes-dryer-cost-calculator`, `/tools/electric-water-heater-cost-calculator`, `/tools/pool-pump-cost-calculator`, `/tools/dehumidifier-cost-calculator`)
  - 5 launch calculators + 10 state pages + 5 guides + trust & legal pages
- Audit Results:
  - **Shared Formula**: `calculateApplianceCost` is authoritative pure calculation engine function; 0 duplicated client arithmetic.
  - **Appliance Scope Alignments**: Electric dryers only, electric resistance water heaters only (active elements default = 1), wattage-based pool pump model, wattage/duty-cycle dehumidifier model, refrigerator annual-kWh mode duty-cycle forced to 100%.
  - **Unit Input Accessibility**: `NumberInputWithUnit` uses `aria-hidden="true"` unit badges with explicit text unit names in form labels.
  - **Header & Footer Spacing**: Scoped `.siteMain` layout padding (`clamp(48px, 6vw, 72px)`); guide header eyebrow styled as refined category badge.
  - **Rate Display**: Formatted rates consistently use `18.83 ¢/kWh` (never `$18.83/kWh`).
  - **Analytics Privacy**: 100% dataLayer compliance; zero raw inputs, rates, or bill amounts sent.
  - **Protected Files**: `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` remain 100% untouched.
- Test & Build Results:
  - 16 test files / 76 unit tests passed cleanly (`pnpm test`).
  - Next.js Web Build prerendered 46/46 static pages cleanly (`pnpm build:web`).
  - 0 `addonAfter` or `addonBefore` deprecation warnings in calculator form code.
- Strict Git Rules: Read-only Git commands only. All changes remain unstaged in working tree.
- Suggested Commit: `fix(appliances): complete formula source UX and privacy review`
