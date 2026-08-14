# Energy Insights Publishing System & Editorial Governance Manual

**Domain:** EnergyBillLab.com  
**Document:** `docs/editorial/insights-publishing-system.md`  
**Status:** Authoritative Editorial & Technical Governance Standard  
**Audience:** Technical Publisher, Editorial Agents, Code Reviewers, Search Engine Auditors

---

## 1. Mission and Core Purpose

The Energy Insights publishing system provides dated, evidence-based analyses of U.S. residential electricity rates, natural gas price shifts, household appliance operating costs, solar generation trends, and home battery storage economics.

Insights are designed to scale to 1,000+ future articles without:

- Keyword cannibalization
- Duplicate search intent
- Conflicting URLs
- Repeated generic filler
- Stale or unverified data claims
- Incorrect EIA dataset interpretations
- Thin archive pages
- Inconsistent article formatting
- Structured-data conflicts or fake author credentials
- Sitemap pollution
- Low-value mass publishing

---

## 2. Content-Type Decision Rules

Before any topic is approved, it must be classified into its proper content type:

### 2.1 Use a Guide when:

- The search intent is evergreen (troubleshooting, conceptual explanation).
- The core answer does not depend on a monthly or seasonal reporting period.
- The page is intended to remain useful for several years without major architectural changes.
- _Examples:_ "Why is my electric bill so high?", "What is a kilowatt-hour?", "How does an estimated meter reading work?".

### 2.2 Use a State Page when:

- The primary intent is the current residential electricity rate for a single U.S. state.
- The user seeks permanent state rate history, utility benchmarks, or regulatory context.
- The page is the permanent state resource (`/electricity-rates/[state]`).
- _Examples:_ "North Carolina electricity rates", "Ohio cost per kWh".

### 2.3 Use a Calculator when:

- The primary value is user-specific computation requiring user inputs.
- The output dynamically changes based on user values.
- _Examples:_ Appliance Energy Cost Calculator, AC Cost Calculator, EV Home Charging Cost Calculator.

### 2.4 Use Research when:

- The asset is a formal national report with downloadable CSV datasets, extensive methodology, and multi-state statistical rankings.
- _Example:_ U.S. Residential Electricity-Rate Report.

### 2.5 Use an Insight when:

- The content is dated and tied directly to an official reporting period (e.g., May 2026 EIA data release).
- The analysis interprets changes, rankings, state-to-national comparisons, or practical household impacts.
- The article provides original calculations, charts, tables, or scenario models.

---

## 3. Duplicate Prevention & Intent Governance

### 3.1 Intent Fingerprint (`intentFingerprint`)

Every proposed Insight must specify a normalized `intentFingerprint` representing real user search intent rather than superficial title wording.

- _Examples:_ `us-residential-electricity-rates-monthly-change`, `north-carolina-electricity-rate-2025-monthly-trend`, `electricity-rate-increase-household-bill-impact`.
- The central registry rejects duplicate intent fingerprints deterministically.

### 3.2 Canonical Topic (`canonicalTopic`)

Each Insight belongs to one `canonicalTopic`. If a topic already exists, editorial governance requires updating the existing article rather than spawning a duplicate URL.

---

## 4. URL & Slug Rules

- Apex host canonical URL pattern: `https://energybilllab.com/insights/[slug]`
- Slugs must be lowercase, ASCII characters, separated by hyphens, with no underscores, tracking parameters, or stop-word bloat.
- Dates in URLs (e.g. `/insights/us-residential-electricity-rates-may-2026`) are permitted **only** when the article is intentionally a period-specific archive report.
- Non-dated URLs (e.g. `/insights/states-with-highest-electricity-rates`) are used for continuously maintained resources.

---

## 5. Editorial Word-Range Guidance

- **Short Data Update:** 700–1,100 words (narrow data releases, single rate change).
- **Standard Insight:** 1,100–1,800 words (single state trend, appliance comparison, market explanation).
- **Major Data Analysis:** 1,500–2,500 words (national rankings, multi-state solar/gas/rate reports).
- Quality is evaluated on analytical accuracy, clarity, and direct answers—never artificial word padding.

---

## 6. Data Integrity & Domain Rules

### 6.1 EIA Data Rules

- Always state exact dataset, sector (Residential), geography, reporting period, and unit (`¢/kWh`).
- Distinguish preliminary from final EIA data.
- Never interpolate missing values or mix reporting periods in a single ranking.
- Distinguish retail price from utility tariff components (supply, delivery, fixed customer charge).

### 6.2 Solar & Battery Rules

- Distinguish installed capacity (kW) from electricity generation (kWh).
- Distinguish utility-scale solar/storage from residential rooftop/home battery systems.
- State all modeling assumptions (system size, round-trip efficiency, depth of discharge, net metering tariff).
- Never claim guaranteed payback periods or guaranteed outage backup durations.

### 6.3 Natural-Gas Rules

- Identify EIA gas units ($/Mcf or $/therm) and state conversion assumptions.
- Account for appliance AFUE efficiency when comparing gas vs. electric heating economics.

---

## 7. Citation Hierarchy & Source Rules

Preferred source hierarchy:

1. U.S. Energy Information Administration (EIA)
2. U.S. Department of Energy (DOE)
3. National Renewable Energy Laboratory (NREL)
4. ENERGY STAR
5. Federal Energy Regulatory Commission (FERC)
6. State Public Utility Commissions (e.g., NCUC, PUCO, CPUC)
7. State government energy programs
8. Official utility tariffs & program rate schedules
9. Established academic research

Place source links adjacent to numerical values and regulatory claims. Remove tracking parameters (`utm_source`).

---

## 8. Authorship & Privacy Boundaries

- Visible Byline: `By Jaynesh Shingala`
- Contact / Corrections: `shingala.jaynesh@gmail.com`
- Minimal Person JSON-LD: `{"@type": "Person", "name": "Jaynesh Shingala"}`
- Prohibited: Do not expose job titles ("Founder", "Engineer", "Analyst"), degrees, Surat/Gujarat/India location, personal resume details, or create `reviewedBy` schemas referencing the author.

---

## 9. Activation & Governance Thresholds

- **Primary Navigation & Homepage Threshold:** `/insights` will NOT appear in `primaryNavigation` or homepage feature sections until **at least 3 published Insights** exist in `insightsRegistry`.
- **Sitemap Threshold:** Empty `/insights` hub is `noindex` and excluded from `sitemap.xml`. The sitemap inventory count remains unchanged (110 routes) until the first indexable Insight is published.
- **Category Threshold:** Category archives (`/insights/category/[category]`) require at least 3 published articles in that category before becoming indexable.

---

## 10. AdSense Safety & Ad Placement Rules

- Insights are authored for user value and educational transparency, not ad inventory bloat.
- Never place ads adjacent to calculator controls, download links, or navigation buttons.
- Never style ads to resemble result cards, data tables, or editorial recommendations.
- Keep primary content visible above the fold on mobile and desktop viewports.

---

## 11. Scheduled Publication Rules & Deployment Workflow

- All publication timestamps must use timezone-explicit ISO 8601 strings (e.g. `2026-08-01T12:00:00Z`).
- In statically generated Next.js builds, timestamp passage alone does **not** automatically make a scheduled article public in live production.
- Truthful publishing workflow:
  ```text
  Create article in apps/web/src/content/insights/articles/
  → run automatic validation (validateInsightsRegistry)
  → run test suite & typecheck
  → build production bundle (pnpm build:web)
  → deploy to Vercel / trigger revalidation webhook
  → verify live public availability
  ```

---

## 12. First-Article Launch Strategy

- The first launch must prepare and publish the **first three Insights together** as a single deployment unit.
- Publishing 3 Insights simultaneously ensures:
  1. `/insights` hub reaches the threshold and becomes indexable.
  2. Primary navigation link (`Insights`) activates.
  3. Homepage promotion section (`Latest Energy Insights`) activates.
  4. All 3 initial Insights link contextually to each other, to permanent calculators (`/tools/...`), state pages (`/electricity-rates/...`), and research reports.

---

## 13. Technical Visual Benchmark Cards System

- Every published and draft Insight must define a data-rich comparison configuration in `apps/web/src/content/insights/visuals.ts` (`INSIGHT_VISUAL_CONFIGS[slug]`).
- Visual cards render a lightweight, server-side accessible comparison bar chart (`TechnicalVisualCard`) with normalized scaling, status colors (`danger`, `warning`, `primary`, `success`), formatted values, sub-labels with calculation details, and an explanatory footnote.
- All configurations are automatically validated in unit tests (`apps/web/tests/technical-visual-card.test.ts`).
