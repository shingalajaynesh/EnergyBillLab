# Active Task

## Current Task

- Phase: Automated Monthly EIA Import, Production Cache Revalidation, and Live Publication Verification
- Target Reporting Period: May 2026 (`2026-05`)
- Status: Architecture Complete & Verified (Awaiting Vercel Deployment & Secret Configuration)
- Scope Completed & Verified:
  1. Production CLI Importer:
     - Implemented `pnpm --filter=@energy-bill-lab/api eia:sync-latest`.
     - Integrated with `EiaClientService`, `ElectricityRateImportService`, PostgreSQL advisory locking (`987654321`), single database transaction, `data_import_runs` logging, and cache revalidation.
  2. Protected Revalidation API Route:
     - Route handler: `apps/web/src/app/api/internal/revalidate-energy-data/route.ts`.
     - Authenticates via `ENERGY_DATA_REVALIDATION_SECRET` header (`x-revalidation-secret`).
     - Revalidates Next.js cache tags (`eia-residential-rates`, `state-page-data`) and static paths (`/`, `/electricity-rates`, 50 state pages, `/research`, CSV endpoint, `/electricity-bill-analyzer`, 9 calculators).
  3. Status Semantics & Modes:
     - Implemented `no-op`, `import-and-publish`, and `publish-recovery` modes.
     - `data_import_runs` marked `succeeded` ONLY when publication verification passes.
  4. Quality Gate & Unit Tests:
     - `pnpm format:check` — PASSED
     - `pnpm typecheck` — PASSED
     - `pnpm lint` — PASSED
     - `pnpm test` — PASSED
     - `pnpm --filter=@energy-bill-lab/web test` — PASSED
     - `pnpm --filter=@energy-bill-lab/database test` — PASSED
     - `pnpm --filter=@energy-bill-lab/api test` — PASSED
     - `pnpm build:web` — PASSED
     - `pnpm build:api` — PASSED
  5. Protected Files Unchanged: `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` remain 100% untouched (0 diff).
- Suggested Commit: `feat(data): automate EIA refresh and production revalidation`
