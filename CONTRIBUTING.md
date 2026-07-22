# Contributing

## Branches

Use short branch names:

- `feat/<short-description>`
- `fix/<short-description>`
- `chore/<short-description>`
- `docs/<short-description>`
- `refactor/<short-description>`

## Commits

Use Conventional Commits:

```text
type(scope): concise description
```

Examples:

```text
feat(web): add electricity bill analyzer
fix(api): handle missing state rate
docs(repo): clarify local setup
chore(repo): standardize repository structure
```

## Starting A Task

Read `AGENTS.md`, `.ai/BRAIN.md`, `.ai/PROJECT_PLAN.md`, and `.ai/ACTIVE_TASK.md`. Audit the affected implementation before editing. Search for existing routes, components, schemas, helpers, scripts, and documentation that already solve part of the request.

## Scope Control

Make one coherent change. Do not mix features, refactors, dependency changes, and documentation rewrites unless the task requires them together. Never create duplicate modules or a second source of truth.

## Tests And Documentation

Update or add focused tests for changed behavior. Update documentation when architecture, setup, deployment, environment variables, or repository structure changes.

## Required Validation

Run the required task checks from the root:

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
pnpm build:web
pnpm build:api
```

## Pull Requests

Pull requests should explain the problem, approach, files changed, tests run, behavior impact, SEO/accessibility/performance impact when relevant, risks, and rollback notes.

## Secrets

Never commit real `.env` files, credentials, tokens, screenshots with secrets, or secret-bearing URLs. Keep examples as placeholders only. Values beginning with `NEXT_PUBLIC_` are visible to browser code.

## Generated Files

Do not stage build output, caches, `node_modules`, `.next`, `dist`, `.turbo`, or TypeScript build info files.

## Dependencies

Add dependencies only when existing code or platform APIs cannot reasonably solve the problem. Document why the dependency is needed and keep the lockfile change tied to the dependency change.

## Dead Code

After replacing or moving code, search for old imports, old filenames, unused exports, duplicate configuration, stale prompt references, and broken documentation links. Remove only code proven obsolete by the current change.
