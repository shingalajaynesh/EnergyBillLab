# Testing And Validation

See the root `README.md` for command summaries.

## Required Validation

Run these from the repository root for implementation tasks:

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
pnpm build:web
pnpm build:api
```

## Current Test Locations

- Web tests: `apps/web/tests/`
- API tests: add under `apps/api` when API behavior needs coverage.
- Package tests: add under the relevant package when package logic exists.

Do not add shallow snapshot tests just to increase test count. Test route registries, metadata helpers, calculation boundaries, API contracts, and other meaningful behavior.
