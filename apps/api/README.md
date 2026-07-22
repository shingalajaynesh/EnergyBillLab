# API Application

`apps/api` is the NestJS with Fastify backend for Energy Bill Lab.

## Responsibilities

- Versioned `/api/v1` API routes
- Health endpoints
- Future data imports and backend jobs
- Future protected admin operations

## Important Paths

- Entry point: `src/main.ts`
- Environment validation: `src/config/env.ts`
- Modules: `src/modules/`

## Commands

Run from the repository root unless debugging the app directly:

```bash
pnpm build:api
pnpm --filter @energy-bill-lab/api typecheck
pnpm --filter @energy-bill-lab/api lint
pnpm --filter @energy-bill-lab/api test
```

Do not add database schemas, migrations, EIA ingestion, authentication, or admin features without an active task.
