# Active Task

## Current Task

- Phase: Energy Insights Publishing System & Governance Infrastructure
- Date: July 30, 2026
- Status:
  - PASS - scalable Insights infrastructure completed locally and initial batch publication prepared
  - PASS - first launch Insight prepared and included in the initial published batch
  - PASS - second launch Insight prepared and included in the initial published batch
  - PASS - third launch Insight prepared and initial three-Insight batch marked `published`
  - PASS - first post-launch daily Insight prepared and marked `published`
  - PASS - Insights trust section converted into a compact secondary layout
  - PENDING - production deployment and browser verification
- Scope & Governance Completed:
  1. **Initial Published Batch:** Established infrastructure, typed schemas, intent fingerprinting, validation rules, URL routing, metadata, structured data, documentation, and test suite before publishing the first three source-checked Insights together.
  2. **Content Model & Registry:** Created typed `InsightRecord` and `InsightCategory` taxonomy in `apps/web/src/content/insights.ts` with registered draft handling.
  3. **Deterministic Validation System:** Created `apps/web/src/lib/insights-validation.ts` enforcing duplicate prevention for slugs, article IDs, canonical topics, normalized intent fingerprints, titles, and canonical URLs against existing Guides, States, Calculators, Research, and Comparisons.
  4. **Authorship & Privacy Bounds:** Strictly enforced author as `Jaynesh Shingala`, with corrections channel `shingala.jaynesh@gmail.com`. Blocked all credential titles, job descriptions, and geographic locations.
  5. **Apex Host Canonical URLs:** All Insight URLs map to `https://energybilllab.com/insights/[slug]`.
  6. **Hub & Route Architecture:** Implemented `/insights`, `/insights/[slug]`, `/insights/category/[category]`, and `/insights/page/[page]`.
  7. **Empty-State & Sitemap Governance:** The sitemap count remains unchanged while no Insights are published. The `/insights` hub renders a restrained internal development-ready message with `noindex, follow` metadata. It remains excluded from primary navigation and homepage promotion until the threshold of at least 3 published Insights is met.
  8. **Editorial Governance & Templates:** Created `docs/editorial/insights-publishing-system.md` and `docs/editorial/topic-research-template.md`. Updated `.ai/BRAIN.md` constitution.
  9. **Protected Files Unchanged:** `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` have 0 diff.
  10. **Strict Git Rules:** Zero Git write commands executed; all changes remain unstaged in working tree.
  11. **First Launch Insight:** Created one source-checked May 2026 residential electricity price bill-impact Insight.
  12. **Second Launch Insight:** Created one source-checked May 2026 cooling demand and residential electricity sales Insight.
  13. **Third Launch Insight:** Created one source-checked April 2026 residential natural gas price and heating-cost Insight.
  14. **Initial Batch Publication:** Marked all three launch Insights as `published` together after confirming distinct intents and preserving category archive noindex behavior until category-level thresholds are met.
  15. **First Daily Insight:** Created one source-checked May 2026 EV home charging cost benchmark Insight using EIA residential price data plus DOE/AFDC EV charging context.
  16. **Compact Trust Links Layout:** Simplified the bottom trust section on `/insights` from 4 oversized rectangular cards to a compact secondary layout with heading "How we source and review our data", a short description, and inline semantic links with dot separators and mobile flex wrapping. Replaced "U.S. Rate Benchmarks" with "U.S. Electricity-Rate Report".
- Suggested Commit: `style(insights): simplify data trust links section`
