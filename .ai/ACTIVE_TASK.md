# Active Task

## Current Task

- Phase: Appliance Expansion Calculator Hardening & Scope Correction
- Status: In Progress (Correcting Ant Design deprecation warnings, appliance scope boundaries, guide header date presentation, and global main-to-footer spacing)
- Verified Scope:
  - 5 expansion calculators implemented and corrected (`/tools/refrigerator-cost-calculator`, `/tools/clothes-dryer-cost-calculator`, `/tools/electric-water-heater-cost-calculator`, `/tools/pool-pump-cost-calculator`, `/tools/dehumidifier-cost-calculator`)
  - 5 launch calculators + 10 state pages + 5 guides + trust pages
- Corrective Fixes:
  - **Ant Design InputNumber Deprecation**: Migrated all form fields across repository to `NumberInputWithUnit` using `Space.Compact`.
  - **PostgreSQL SSL Warning**: Documented as accepted non-fatal driver warning; database client configuration intentionally unchanged.
  - **Appliance Scope Alignments**: Electric dryers only (no gas fuel cost), electric resistance water heaters only (default active elements = 1; no heat pump model), pool pump electrical input wattage primary, dehumidifier wattage/duty-cycle primary model (no pint/IEF energy derivation), refrigerator annual-kWh mode duty-cycle safety.
  - **Guide Header Formatting**: Restrained Title Case eyebrow, reduced H1 title size, deterministic human-readable date presentation (`Updated July 23, 2026`) with machine-readable ISO `<time dateTime="...">`.
  - **Global Main/Footer Spacing**: `body` flex column layout with `min-height: 100dvh`, `main` flex child with `clamp(48px, 6vw, 72px)` bottom padding.
  - **Electricity Rate Display**: Preserved primary `18.83 ¢/kWh` formatting.
- Strict Git Rules: Read-only Git commands only. All changes remain unstaged in working tree.
- Suggested Commit: `fix(appliances): correct calculator scope warnings and global spacing`
