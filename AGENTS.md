# Agent Entry Point

All coding agents must start here before changing Energy Bill Lab.

1. Read `.ai/BRAIN.md`.
2. Read `.ai/PROJECT_PLAN.md`.
3. Read `.ai/ACTIVE_TASK.md`.
4. Audit existing code and documentation before editing.
5. Never implement from an old completed prompt.
6. Never expose secrets or inspect real environment values beyond ignore status.
7. Never replace working code without proving the need.
8. Never create duplicate implementations.
9. Run the required validation for the task.
10. Update documentation when architecture changes.
11. Strictly follow Git rules: read-only Git commands only. Never run git add, git commit, git push, etc. Leave all changes unstaged.

Completed prompts are historical records only.

# Strict Git Rules

You may inspect Git history and the working tree using read-only commands such as:

- `git status --short`
- `git diff`
- `git diff --staged`
- `git log --oneline -10`
- `git diff --check`

You must **NOT** run any Git write command (`git add`, `git commit`, `git push`, `git pull`, `git merge`, `git rebase`, `git reset`, `git restore`, `git checkout`, `git clean`, `git stash`, `git tag`).
Leave all intended changes unstaged in the working tree and provide a summary report with suggested commit message.
