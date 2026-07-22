# ADR-003: Platform Services

## Status

Accepted

## Context

Energy Bill Lab needs public static/cached pages, a backend for API and jobs, a relational data store, and later optional platform services without making public calculators depend on login or live upstream calls.

## Decision

The frontend runs on Vercel. The API and scheduled jobs run on Render. PostgreSQL is provided through Neon. Drizzle ORM is the planned database layer. Clerk is used only when authentication becomes necessary. Cloudinary is used only for dynamic media requirements. Public calculators must not require login. Official external data must be cached and stored instead of fetched per visitor request.

## Consequences

Public pages can remain fast and resilient while backend jobs handle imports and protected operations. Platform choices must not introduce secrets into source control or force dynamic rendering for public calculators.

## Rules

- Do not add public login for launch calculators.
- Do not fetch official external data per visitor request.
- Do not add Cloudinary for ordinary static assets.
- Do not commit credentials, project secrets, or secret-bearing URLs.
- Keep frontend and API deployment behavior documented separately.
