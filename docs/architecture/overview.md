# Architecture Overview

Energy Bill Lab is a TypeScript monorepo for a public U.S. home-energy utility product.

## Applications

- `apps/web`: Next.js App Router public website, trust pages, static route foundation, metadata, sitemap, robots, and future calculator UI.
- `apps/api`: NestJS with Fastify backend for versioned `/api/v1` endpoints and future scheduled jobs.

## Packages

- `packages/design-system`: Ant Design theme configuration and shared product tokens.
- `packages/calculation-engine`: future pure calculation formulas.
- `packages/contracts`: future shared Zod schemas and API contracts.
- `packages/database`: future Drizzle and Neon database code.
- `packages/eslint-config`: shared ESLint flat configs.
- `packages/typescript-config`: shared strict TypeScript configs.
- `packages/testing`: future shared test helpers.

See `.ai/decisions/` for durable architecture decisions.
