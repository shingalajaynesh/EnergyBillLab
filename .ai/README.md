# AI Instructions

The `.ai` directory contains agent-facing instructions, active task context, historical prompts, architecture decisions, and audit records for Energy Bill Lab.

## Authority

`AGENTS.md` is the universal root entry point. `.ai/BRAIN.md` is the highest-authority long-form engineering constitution. If task instructions conflict with `.ai/BRAIN.md`, agents must stop and report the conflict.

## Reading Order

1. `AGENTS.md`
2. `.ai/BRAIN.md`
3. `.ai/PROJECT_PLAN.md`
4. `.ai/ACTIVE_TASK.md`
5. Relevant ADR files in `.ai/decisions/`
6. Relevant application or product documentation in `docs/`
7. Existing implementation

## Permanent Rules And Active Tasks

Permanent rules live in `.ai/BRAIN.md` and architecture decisions. Sequencing and product direction live in `.ai/PROJECT_PLAN.md`. `.ai/ACTIVE_TASK.md` describes the current implementation task, or states that no implementation task is active.

## Completed Scope & Audits

- 5 Launch Calculators + 5 Expansion Appliance Calculators
- 10 State Electricity Rate Pages (backed by Neon PostgreSQL EIA monthly rate data)
- 5 Problem-Solving Energy Guides
- Production readiness, SEO, AdSense, backup/rollback, and analytics privacy documentation in `docs/`

## Completed Prompts

Completed prompts live in `.ai/prompts/completed/` and are historical records. They must not be executed again. Agents may read them only to understand why existing code was introduced.

## Architecture Decisions

Architecture decisions are recorded as ADRs in `.ai/decisions/`. Create or update an ADR only when the project makes or revises a durable architecture decision.
