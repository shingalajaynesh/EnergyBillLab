# Repository Structure Audit

## Previous Repository Structure Summary

Before this change, permanent AI instructions and completed implementation prompts lived at the repository root beside product code and configuration:

- `BRAIN.md`
- `PROJECT_PLAN.md`
- `CODEX_FIRST_PROMPT.md`
- `CODEX_SECOND_PROMPT.md`

The application and package boundaries were already mostly clear:

- `apps/web` contained the Next.js public site, trust pages, route registry, metadata helpers, sitemap, robots, components, content, and focused tests.
- `apps/api` contained the NestJS/Fastify API foundation and health module.
- `packages` contained shared workspace packages for design tokens, linting, TypeScript config, and future calculation, contract, database, and testing code.
- `docs` contained only placeholder `.gitkeep` files.

## Problems Found

- Long-form AI instructions were mixed with root configuration.
- Completed prompts remained at the root and could be mistaken for active tasks.
- No root `AGENTS.md` existed as a concise universal agent entry point.
- No `.ai/ACTIVE_TASK.md` existed to separate active work from historical prompts.
- Human-facing documentation was mostly absent.
- Empty docs folders used `.gitkeep` placeholders instead of useful documentation.
- Vercel deployment configuration existed in both root `vercel.json` and `apps/web/vercel.json`.

## Files Moved

- `BRAIN.md` -> `.ai/BRAIN.md`
- `PROJECT_PLAN.md` -> `.ai/PROJECT_PLAN.md`
- `CODEX_FIRST_PROMPT.md` -> `.ai/prompts/completed/001-foundation.md`
- `CODEX_SECOND_PROMPT.md` -> `.ai/prompts/completed/002-design-trust-seo.md`

## Files Renamed

The completed prompt files were renamed to numbered kebab-case historical prompt names.

## Files Deleted

- `apps/web/vercel.json`
- `docs/architecture/.gitkeep`
- `docs/data-sources/.gitkeep`
- `docs/decisions/.gitkeep`
- `docs/product/.gitkeep`
- `docs/runbooks/.gitkeep`

## Files Intentionally Left Unchanged

- Root package, pnpm, Turbo, TypeScript, ESLint, Prettier, and workspace configuration files.
- `apps/web` route, component, content, metadata, sitemap, robots, and test implementation.
- `apps/api` source and configuration.
- Package source files and package configuration.
- Tracked environment example files.
- Real local environment files, which remain ignored.
- Root `vercel.json`, which is the single tracked Vercel deployment config.

## Import Or Script Changes

No application imports or package scripts required changes. The moved prompt files were documentation-only and not referenced by build scripts.

## Documentation Changes

- Added `AGENTS.md`.
- Added `.ai/README.md`, `.ai/ACTIVE_TASK.md`, ADRs, a prompt template, and this audit.
- Rewrote the root `README.md`.
- Added `CONTRIBUTING.md`.
- Added documentation indexes and focused development, operations, architecture, product, and SEO/AdSense docs.
- Added `apps/web/README.md` and `apps/api/README.md`.

## Deployment Configuration Decision

The root `vercel.json` is retained and documented as the single Vercel deployment configuration. It contains no secrets and points Vercel to `pnpm build:web` with `apps/web/.next` as the output directory.

The app-level `apps/web/vercel.json` was removed because it duplicated the deployment concern with a different build command.

## Validation Results

- `pnpm install --frozen-lockfile`: passed.
- `pnpm format:check`: initially failed on archived completed prompts and one new docs file; passed after preserving completed prompts in `.prettierignore` and formatting the new docs file.
- `pnpm typecheck`: passed.
- `pnpm lint`: passed.
- `pnpm test`: passed.
- `pnpm build:web`: passed.
- `pnpm build:api`: passed.
- Stale reference scan for old prompt filenames and removed Vercel config: passed.
- Real environment file ignore check: passed.
- Final diff and staging review: completed before commit.

## Remaining Risks

- Markdown link validation depends on repository tooling; no dedicated Markdown link checker is currently configured.
- Future agents must keep `.ai/ACTIVE_TASK.md` current when new implementation tasks begin.

## Recommended Next Phase

Begin the next planned product phase only after a new active task is created. The likely next phase is database and official-data foundation if it remains the approved sequence.
