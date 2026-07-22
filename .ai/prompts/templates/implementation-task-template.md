# Implementation Task Template

## Objective

Describe one measurable objective.

## Required Reading

1. `AGENTS.md`
2. `.ai/BRAIN.md`
3. `.ai/PROJECT_PLAN.md`
4. `.ai/ACTIVE_TASK.md`
5. Relevant ADRs and application READMEs

## Scope

### In Scope

- List exact allowed areas.

### Out Of Scope

- List prohibited areas.

## Required Audit

- Inspect existing implementation.
- Search for duplicate routes, components, helpers, schemas, scripts, and docs.
- Identify risks before editing.

## Validation

- `pnpm install --frozen-lockfile`
- `pnpm format:check`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm build:web`
- `pnpm build:api`

## Commit

Use one Conventional Commit message:

```text
type(scope): concise description
```
