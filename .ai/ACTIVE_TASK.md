# Active Task

## Current Task

- Phase: Energy Insights Publishing System & Governance Infrastructure
- Date: July 30, 2026
- Status:
  - PASS — scalable Insights infrastructure completed locally with zero articles published
  - PENDING — future editorial topic research, production deployment, and live browser verification
- Scope & Governance Completed:
  1. **Zero Published Articles:** Established infrastructure, typed schemas, intent fingerprinting, validation rules, URL routing, metadata, structured data, documentation, and test suite without publishing any Insight article, placeholder, or demo record.
  2. **Content Model & Registry:** Created typed `InsightRecord` and `InsightCategory` taxonomy in `apps/web/src/content/insights.ts` with empty `insightsRegistry = []`.
  3. **Deterministic Validation System:** Created `apps/web/src/lib/insights-validation.ts` enforcing duplicate prevention for slugs, article IDs, canonical topics, normalized intent fingerprints, titles, and canonical URLs against existing Guides, States, Calculators, Research, and Comparisons.
  4. **Authorship & Privacy Bounds:** Strictly enforced author as `Jaynesh Shingala`, with corrections channel `shingala.jaynesh@gmail.com`. Blocked all credential titles, job descriptions, and geographic locations (Surat/Gujarat/India).
  5. **Apex Host Canonical URLs:** All Insight URLs map to `https://energybilllab.com/insights/[slug]`.
  6. **Hub & Route Architecture:** Implemented `/insights`, `/insights/[slug]`, `/insights/category/[category]`, and `/insights/page/[page]`.
  7. **Empty-State & Sitemap Governance:** The sitemap count remains unchanged (110 routes). The empty `/insights` hub renders a restrained internal development-ready message with `noindex, follow` metadata. Excluded from primary navigation and homepage promotion until the threshold of at least 3 published Insights is met.
  8. **Editorial Governance & Templates:** Created `docs/editorial/insights-publishing-system.md` and `docs/editorial/topic-research-template.md`. Updated `.ai/BRAIN.md` constitution.
  9. **Protected Files Unchanged:** `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` have 0 diff.
  10. **Strict Git Rules:** Zero Git write commands executed; all changes remain unstaged in working tree.
- Suggested Commit: `feat(insights): add scalable data-driven publishing framework`
