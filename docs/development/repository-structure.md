# Repository Structure

See the root `README.md` for the quick orientation.

## Top-Level Directories

- `.ai/`: agent instructions, active task context, historical prompts, ADRs, and audits.
- `.github/`: CI workflows.
- `apps/`: deployable applications.
- `packages/`: reusable workspace packages with package exports.
- `docs/`: human-facing project documentation.

Do not create vague dumping grounds such as `misc`, `temp`, `old`, `backup`, or `common-files`.

## Web Features

New public web routes belong in `apps/web/src/app`. Reusable presentational components belong in `apps/web/src/components`. Structured editorial content belongs in `apps/web/src/content`. Framework-independent helpers belong in `apps/web/src/lib`.

Create `apps/web/src/features/<feature-name>/` only when a real feature owns multiple components, hooks, schemas, or tests.

## API Modules

API domain code belongs in `apps/api/src/modules`. Cross-cutting API concerns belong in `apps/api/src/common` when they exist. Environment and application configuration belongs in `apps/api/src/config`. External infrastructure adapters belong in `apps/api/src/infrastructure` when implemented.

## Shared Packages

Use `packages/` only for code with a clear responsibility and real consumers. Applications must not import internal files from another application.

## Documentation And AI Prompts

Human-facing documentation belongs in `docs/`. AI prompts and agent rules belong in `.ai/`. Completed prompts in `.ai/prompts/completed/` are historical records and must not be executed again.

## Architecture Decisions

Architecture decisions are stored in `.ai/decisions/`. Human-readable architecture summaries can live in `docs/architecture/`.

## SEO And AdSense Documentation

SEO and AdSense notes belong in `docs/seo-adsense/`. Route and metadata implementation stays in `apps/web/src`.

## Infrastructure Files

Keep configuration close to the scope it controls. Root deployment configuration belongs at the repository root when the platform builds from the monorepo root. Platform notes belong in `docs/operations/`.
