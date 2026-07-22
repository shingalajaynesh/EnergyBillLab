# ADR-001: Monorepo Architecture

## Status

Accepted

## Context

Energy Bill Lab needs a public web application, a backend API, shared contracts, shared design tokens, and future calculation and data packages without duplicating logic across applications.

## Decision

The repository uses a pnpm and Turborepo TypeScript monorepo. `apps/web` is the public Next.js application. `apps/api` is the backend API. Reusable code belongs in `packages`. Shared contracts belong in shared packages instead of application internals. Deployment targets remain independent, and root scripts orchestrate workspace tasks.

## Consequences

The monorepo keeps shared code close to consumers and allows root-level validation. It also requires clear import boundaries and disciplined package ownership.

## Rules

- Applications must not import internal files from another application.
- Shared contracts must live in packages.
- Root scripts must run workspace validation and builds.
- Deployment configuration must identify whether it applies to the root, an application, or a platform.
- New packages require a clear owner, purpose, exports, and at least one real consumer.
