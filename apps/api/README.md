# API Application

`apps/api` is the NestJS with Fastify backend service for Energy Bill Lab.

## Responsibilities

- Versioned `/api/v1` API routes
- System health and database connectivity endpoints
- Terminal/CLI monthly U.S. EIA retail electricity sales data ingestion service (`pnpm --filter=@energy-bill-lab/api eia:sync-latest`)
- PostgreSQL (Neon) database schema sync, advisory locking (`987654321`), and data validation

## Important Paths

- Entry point: `src/main.ts`
- Environment validation: `src/config/env.ts`
- EIA importer module & CLI: `src/modules/electricity-rate-import/`
- API controllers & services: `src/modules/`

## Commands

Run from the repository root unless debugging the app directly:

```bash
pnpm build:api
pnpm --filter @energy-bill-lab/api typecheck
pnpm --filter @energy-bill-lab/api lint
pnpm --filter @energy-bill-lab/api test
pnpm --filter @energy-bill-lab/api eia:sync-latest
```
