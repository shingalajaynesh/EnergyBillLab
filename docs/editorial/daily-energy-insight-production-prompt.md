Continue development of the existing EnergyBillLab.com monorepo.

# Daily Energy Insight Production Task

Research, select, create, validate, and prepare exactly ONE high-quality,
data-driven Energy Insight for EnergyBillLab.

This is a reusable daily publishing prompt.

Use the current system date as today’s date.
Search the current internet during every run.
Do not rely on remembered current data.
Use current primary sources and the latest verified project data.

Do not force an article when no safe, useful, non-duplicate topic is available.

# Primary Goal

Create one Insight that can attract qualified U.S. household-energy traffic by
turning official data into:

- a clear answer;
- an original calculation;
- an original comparison;
- a useful table or chart;
- practical household-cost meaning;
- links to EnergyBillLab tools and permanent resources.

The Insight must help a real user understand or make a household-energy
decision.

Do not create an article merely to maintain a daily publishing count.

# Read Before Working

Read and follow:

- `.ai/BRAIN.md`
- `.ai/ACTIVE_TASK.md`
- `docs/editorial/insights-publishing-system.md`
- `docs/editorial/topic-research-template.md`
- `apps/web/src/content/insights/types.ts`
- `apps/web/src/content/insights/registry.ts`
- all existing modules under:
  `apps/web/src/content/insights/articles/`
- existing Guides registry
- existing state-page registry
- existing calculator routes
- existing Research reports
- current sitemap implementation
- metadata and structured-data helpers
- analytics helpers
- relevant tests

Treat `.ai/BRAIN.md` as the project constitution.

Actual current source code is the source of truth.

Do not weaken, bypass, duplicate, or remove the existing Insights validation
system.

# Current Architecture

Preserve:

- TypeScript
- pnpm
- Turborepo
- Next.js App Router
- Ant Design
- NestJS API
- Neon PostgreSQL
- Drizzle ORM
- Vercel web deployment
- Render API deployment

Do not add:

- WordPress
- an external CMS
- a second database
- unnecessary dependencies
- a new analytics provider
- a separate blog framework
- MDX unless it already exists and is required by the current architecture

# Protected Files

Do not modify:

- `packages/database/src/clients/db-client.ts`
- `apps/web/package.json`
- `turbo.json`
- `vercel.json`
- `render.yaml`

Do not change:

- PostgreSQL SSL behavior
- EIA importer architecture
- advisory locking
- transaction handling
- cache-revalidation architecture
- existing calculator formulas without a proven bug
- canonical-host policy
- favicon and social assets
- robots crawler policy
- publisher privacy policy
- existing state or guide route inventory

# Git Restrictions

Do not run Git write commands.

Do not run:

- `git add`
- `git commit`
- `git push`
- `git pull`
- `git merge`
- `git rebase`
- `git reset`
- `git restore`
- `git checkout`
- `git clean`
- `git stash`
- `git tag`

Leave all changes unstaged.

# Canonical Host

Use only:

https://energybilllab.com

Do not generate production metadata containing:

- `www.energybilllab.com`
- `http://energybilllab.com`
- localhost
- Vercel preview domains
- duplicate canonical URLs

# Daily Workflow

Complete the following phases in order.

Do not begin writing until topic research and conflict validation are complete.

---

# Phase 1 — Inspect Current Publishing State

Determine:

1. How many eligible published Insights currently exist.
2. How many draft launch Insights exist.
3. Which categories already have content.
4. Which canonical topics and intent fingerprints are already registered.
5. Which articles are scheduled, archived, noindex, or published.
6. Whether the first-three launch threshold has already been reached.
7. Which reporting periods are currently available in the project database.
8. Which existing pages are receiving Search Console demand, when current
   analytics exports are available.

Do not assume the registry is empty.

Do not overwrite or recreate an existing Insight.

# First-Three Launch Rule

Apply this bootstrap policy:

## Before three launch-ready Insights exist

Create one Insight as:

```text
status: draft
```

The draft must still pass all content, data, citation, metadata, privacy, and
validation requirements.

Do not add the draft to:

- sitemap
- primary navigation
- homepage Latest Insights
- category indexing

## When the third launch-ready draft is completed

Review all three drafts together.

Publish all three in the same implementation only when:

- all three have distinct primary intents;
- all three pass registry validation;
- all sources remain current;
- all dates and reporting periods are correct;
- all internal links exist;
- no article conflicts with a Guide, calculator, state page, or Research report;
- tests and production builds pass.

Set publication timestamps using explicit ISO 8601 UTC timestamps, for example:

```text
2026-07-30T12:00:00Z
```

Do not use timezone-ambiguous dates.

When the first three are published together, verify:

- three article routes become public;
- `/insights` becomes eligible;
- `/insights` becomes indexable;
- the primary navigation contains one Insights link;
- Latest Energy Insights appears on the homepage;
- the relevant category becomes indexable only when its own threshold is met;
- sitemap totals change according to actual eligibility rules.

## After the first three are published

Each daily run may publish one new Insight immediately when every quality gate
passes.

Do not publish incomplete articles.

---

# Phase 2 — Collect Current Topic Evidence

Search the current internet every run.

Search official sources first.

## Priority Primary Sources

Use, where relevant:

1. U.S. Energy Information Administration
2. U.S. Department of Energy
3. National Renewable Energy Laboratory
4. ENERGY STAR
5. Federal Energy Regulatory Commission
6. state public utility commissions
7. state government energy programs
8. official utility tariffs or program documentation
9. official grid operators
10. primary academic research

Remove tracking parameters from final source URLs.

Do not use ChatGPT-generated summaries as sources.

Do not use random blogs as the primary support for numerical, regulatory,
technical, or market claims.

## Current Topics to Research

Search for useful developments in:

- residential electricity rates
- monthly EIA electricity data
- state electricity-rate changes
- household electricity costs
- natural-gas residential prices
- heating costs
- appliance operating costs
- air-conditioning costs
- electric water heating
- EV home charging
- rooftop solar generation
- solar payback assumptions
- net-metering changes
- battery backup capacity
- battery runtime
- time-of-use electricity rates
- utility supplier choice
- state assistance and efficiency programs
- seasonal household-energy patterns

Do not expand into unrelated EIA topics such as:

- crude-oil trading
- refinery operations
- industrial fuel markets
- international petroleum exports
- commercial power-plant operations

unless the topic has a direct and practical U.S. household-energy connection.

# Analytics Evidence

When recent Search Console, GA4, or Clarity exports are available, inspect them.

Prioritize:

- queries already receiving impressions;
- pages near positions 5–30;
- pages with impressions but low CTR;
- calculators receiving early demand;
- state pages showing clear user interest;
- recurring household-energy questions;
- content gaps visible from search queries.

Keep platform metrics separate.

Do not combine:

- Search Console clicks
- GA4 users
- Clarity sessions

as though they are one measurement.

Do not invent search volume.

Do not claim a keyword has high volume unless a trustworthy data source proves
it.

# Topic Candidate List

Generate internally at least 5 candidate topics.

For every candidate, evaluate:

- user problem;
- primary intent;
- freshness;
- Search Console evidence;
- official data availability;
- original-value opportunity;
- commercial or decision intent;
- relationship to existing tools;
- risk of cannibalization;
- risk of becoming stale;
- ongoing maintenance burden.

Score candidates using this model:

```text
Demand evidence:        0–5
Original-value potential: 0–5
Primary-source quality: 0–5
Tool/internal-link value: 0–5
Household usefulness:   0–5
Freshness opportunity:  0–5
Cannibalization risk:   subtract 0–5
Staleness risk:         subtract 0–5
```

Do not expose fake precision.

The score supports editorial judgment; it does not replace it.

Select exactly one topic with the strongest combined evidence.

---

# Phase 3 — Content-Type and Conflict Decision

Before approving the selected topic, determine who owns its primary intent.

## Guide owns the intent when:

- the question is evergreen;
- the answer is primarily educational or troubleshooting;
- it does not depend on a reporting period.

Result:

```text
UPDATE GUIDE
```

Do not create an Insight.

## State page owns the intent when:

- the primary query is a current state electricity rate;
- the user wants a cost-per-kWh value;
- the page already covers history and regulatory context.

Result:

```text
UPDATE STATE PAGE
```

Do not create an Insight targeting a synonym.

## Calculator owns the intent when:

- the main value is a user-specific calculation;
- user inputs determine the answer.

Result:

```text
BUILD OR IMPROVE CALCULATOR
```

## Research owns the intent when:

- it is a permanent national report;
- it includes a complete dataset;
- a downloadable CSV is central;
- extensive methodology is required.

Result:

```text
UPDATE RESEARCH REPORT
```

## Insight owns the intent when:

- the article is dated;
- it explains a trend, change, comparison, ranking, or new finding;
- it is tied to a reporting period;
- it provides original interpretation;
- it links to permanent tools and reference pages.

Result:

```text
APPROVE AS NEW INSIGHT
```

# Required Conflict Audit

Compare the topic against:

- all Guides;
- all 50 state pages;
- all calculators;
- all Research reports;
- appliance content;
- comparison routes;
- all published Insights;
- all drafts;
- all scheduled Insights;
- all archived Insights;
- canonical topics;
- intent fingerprints;
- normalized titles;
- primary queries;
- secondary queries.

Reject a new article when it is merely a wording variation.

Examples that normally share one intent:

```text
Ohio electricity rates
Ohio electric rates
Ohio energy rates
Electricity rates in Ohio
Ohio cost per kWh
```

These belong to the Ohio state page.

Likewise:

```text
Why is my electricity bill high?
Why is my power bill high?
Why did my energy bill increase?
Reasons for a high electric bill
```

These normally belong to one authoritative Guide.

# Valid Decisions

Use exactly one:

- `APPROVE AS NEW INSIGHT`
- `UPDATE EXISTING INSIGHT`
- `UPDATE GUIDE`
- `UPDATE STATE PAGE`
- `BUILD OR IMPROVE CALCULATOR`
- `ADD TO RESEARCH REPORT`
- `REJECT AS DUPLICATE`
- `DEFER FOR INSUFFICIENT DATA`

The daily goal does not override the correct decision.

When the correct decision is not `APPROVE AS NEW INSIGHT`, do not force a new
article.

---

# Phase 4 — Complete the Topic Research Record

Complete the repository topic-research template.

Record:

```text
Research date:
Proposed title:
Primary intent:
Primary query:
Secondary queries:
Canonical topic:
Intent fingerprint:
Target reader:
Geography:
Reporting period:
Content-type decision:
Existing-page conflicts:
Existing Insight conflicts:
Search Console evidence:
Current web-search evidence:
Primary sources:
Source publication dates:
Original calculation:
Original comparison:
Original chart or table:
Practical household example:
Internal links:
Update cadence:
Staleness risk:
Required future update:
Final decision:
```

Store the research record according to the established editorial documentation
structure.

Do not add raw local `file:///` links.

Do not add private API keys or database credentials.

---

# Phase 5 — Data Verification

Before writing, verify:

- exact dataset;
- reporting period;
- sector;
- geography;
- unit;
- common-period consistency;
- whether data is preliminary or final;
- missing-data treatment;
- whether values are observed or modeled;
- whether the project database agrees with the source;
- whether the article is an archived period report or continuously updated
  resource.

Do not silently update database records during a content-writing task.

When the project database is stale:

- do not pretend it is current;
- do not mix fresh web data with stale application data;
- report the conflict;
- stop publication when the conflict affects the central article conclusion.

# EIA Rules

When using EIA data:

- identify the exact dataset;
- identify residential sector;
- show the reporting period;
- show the unit;
- preserve the common-period rule;
- do not interpolate missing values;
- do not mix months in one ranking;
- do not silently substitute an older period;
- do not call a monthly value an annual average;
- do not describe a state average as a customer’s utility tariff;
- do not call delayed monthly data real-time;
- link to the exact official source.

# Natural-Gas Rules

For natural-gas content:

- distinguish residential, commercial, citygate, wholesale, and industrial
  prices;
- distinguish dollars per thousand cubic feet from dollars per therm;
- state conversion assumptions;
- account for appliance efficiency when comparing useful heat;
- distinguish the commodity price from the final delivered household bill;
- do not use a state average as a utility quote.

# Solar Rules

For solar content:

- distinguish capacity from generation;
- distinguish utility-scale from small-scale or rooftop solar;
- do not use statewide generation as a homeowner production estimate;
- use an appropriate NREL model for household production estimates;
- state system size, orientation, shading, losses, and location assumptions;
- state whether incentives and net metering are included;
- distinguish gross savings from net savings;
- do not promise payback.

# Battery Rules

For battery content:

- distinguish power in kW from energy in kWh;
- distinguish nominal from usable capacity;
- state depth-of-discharge assumptions;
- state round-trip efficiency;
- state backup load and inverter constraints;
- distinguish backup value from bill savings;
- define the tariff before modeling time-of-use savings;
- do not guarantee runtime or savings.

---

# Phase 6 — Original-Value Requirement

Do not publish an Insight that merely paraphrases an official source.

Every Insight must contain at least two meaningful original-value elements from
this list:

- original calculation;
- original ranking;
- original state comparison;
- original month-over-month comparison;
- original year-over-year comparison;
- original household-cost scenario;
- original chart;
- original table;
- transparent model;
- connection to an EnergyBillLab calculator;
- practical explanation of bill impact.

For a narrow data update, one exceptional original analysis plus one practical
example may be sufficient.

Do not manufacture findings merely to satisfy this rule.

---

# Phase 7 — Write the Insight

Create one isolated article module under:

```text
apps/web/src/content/insights/articles/
```

Use the current typed article model.

Do not store the full article in the central registry file.

Register the article through the established registry architecture.

Do not weaken automatic registry validation.

# Required Article Structure

Use applicable sections:

1. Breadcrumbs
2. Category
3. H1
4. Direct-answer opening
5. Key findings
6. By Jaynesh Shingala
7. Published date
8. Updated date when materially applicable
9. Reporting period
10. Main analysis
11. Original table, chart, comparison, or calculation
12. Practical household example
13. Methodology
14. Limitations
15. References and official data sources
16. Related tools and permanent resources
17. Corrections contact

Do not render empty sections.

# Opening

The first paragraph must directly answer the main question.

Target approximately 40–90 words.

Include, where relevant:

- central finding;
- reporting period;
- source;
- unit;
- practical meaning.

Do not begin with:

- “In today’s rapidly changing world…”
- “Energy costs are more important than ever…”
- “Have you ever wondered…”
- “When it comes to…”
- “In this comprehensive guide…”
- “In the modern era…”
- “As homeowners navigate…”

# Article Length

Use topic-appropriate depth:

```text
Short data update: 700–1,100 words
Standard Insight: 1,100–1,800 words
Major analysis: 1,500–2,500 words
```

Do not pad the article.

Do not reduce clarity to reach a word count.

# Writing Style

Use simple, professional U.S. English.

Requirements:

- two to four sentences per paragraph where practical;
- descriptive headings;
- define technical units;
- no emojis;
- no all-capital headings;
- no marketing hype;
- no excessive bold text;
- no repeated conclusions;
- no unnecessary jargon;
- no keyword stuffing;
- no invented quotations;
- no generic filler;
- no repetitive AI-style transitions.

# Prohibited or Restricted Claims

Do not call EnergyBillLab content:

- official;
- government-approved;
- certified;
- expert-approved;
- expert-reviewed.

Do not use these claims without direct proof and methodology:

- guaranteed;
- guaranteed savings;
- 100% accurate;
- perfectly accurate;
- risk-free;
- save thousands;
- cut your bill in half;
- always;
- never;
- cheapest;
- best;
- worst;
- biggest increase;
- most expensive;
- fastest-growing.

Use qualified wording:

- estimate;
- modeled result;
- latest available;
- based on;
- under these assumptions;
- reporting period;
- results vary;
- approximately.

# “Latest” Rule

Use `latest` only when:

- the reporting period is visible;
- the data is the newest verified period;
- the source was checked during this run;
- the text does not imply real-time data.

Preferred:

```text
Latest available EIA residential rate for the May 2026 reporting period
```

Avoid:

```text
Live electricity rate
Real-time electricity price
Current customer tariff
```

# Date Rules

Use absolute dates.

Use:

```text
July 30, 2026
May 2026
```

Avoid unsupported relative wording:

- today;
- yesterday;
- recently;
- last month;
- currently.

Use explicit ISO 8601 UTC timestamps in registry fields.

Change `updatedAt` only for substantive content changes.

---

# Phase 8 — Citations

Every important factual claim must have a nearby source.

A bottom references section alone is insufficient.

Add nearby sources for:

- electricity-rate values;
- rankings;
- percentages;
- appliance usage;
- solar assumptions;
- battery assumptions;
- natural-gas prices;
- regulatory structures;
- utility-choice programs;
- government assistance;
- efficiency standards;
- household consumption;
- environmental claims.

Use primary sources.

Do not cite a general homepage when a specific data or policy page exists.

Remove `utm_source` and other tracking parameters.

Do not fabricate citations.

Do not use long copied passages.

Paraphrase accurately.

# Source Record

For every source, record:

- organization;
- page or dataset title;
- URL;
- publication or update date when available;
- access date;
- reporting period;
- claim or calculation supported.

---

# Phase 9 — Tables, Charts, and Calculations

Every data table must include:

- descriptive caption;
- unit;
- reporting period;
- source;
- consistent precision;
- explanation of derived values;
- responsive behavior.

Every chart must include:

- descriptive title;
- reporting period;
- unit;
- source;
- accessible alt text;
- readable labels;
- mobile-safe presentation;
- no misleading axis;
- no unsupported precision.

Do not use a decorative chart.

Do not use color as the only way to communicate meaning.

# Practical Examples

State every assumption.

Example:

```text
At 1,000 kWh per month, a 1¢/kWh rate increase adds approximately $10 to the
energy portion of a monthly bill before fixed charges, taxes, and other fees.
```

Do not label one scenario as the average household bill unless the source and
calculation justify that description.

---

# Phase 10 — Internal Linking

Each Insight should normally include 3–8 useful internal links.

Link contextually to:

- one relevant calculator;
- one relevant Guide or state page;
- one relevant Research or data-source page;
- related Insights when they genuinely share context.

Do not add links merely because a page has Search Console impressions.

Do not use:

- “click here”;
- irrelevant state links;
- repeated exact-match anchor text;
- sitewide keyword-stuffed links;
- dozens of links in one section.

Verify every configured route exists.

---

# Phase 11 — Authorship and Privacy

The only permitted public personal identity details are:

```text
Jaynesh Shingala
shingala.jaynesh@gmail.com
```

Visible byline:

```text
By Jaynesh Shingala
```

Optional:

```text
Written and data-checked by Jaynesh Shingala
```

Do not represent this as independent review.

Do not publish:

- Founder and Technical Publisher;
- Software Engineer;
- Full-Stack Software Engineer;
- energy expert;
- energy analyst;
- Surat;
- Gujarat;
- India;
- employer history;
- education;
- phone number;
- address;
- résumé details;
- personal portrait.

Do not use the author as `reviewedBy`.

Corrections wording:

```text
Corrections or data questions:
shingala.jaynesh@gmail.com
```

---

# Phase 12 — Metadata and Structured Data

Every eligible Insight must have:

- unique title;
- unique meta title;
- unique meta description;
- canonical apex URL;
- Open Graph metadata;
- Twitter summary-large-image metadata;
- correct robots status;
- publication date;
- substantive modification date when applicable.

Structured data must include, where implemented:

- `Article`;
- `BreadcrumbList`;
- `Person`;
- `Organization`.

Minimal author schema:

```json
{
  "@type": "Person",
  "name": "Jaynesh Shingala"
}
```

Do not add:

- job title;
- address;
- fake credentials;
- ratings;
- reviews;
- awards;
- fake affiliations;
- unsupported profiles;
- fake reviewer data.

Structured data must match visible content.

---

# Phase 13 — Indexing and Status

Only eligible articles may enter the sitemap.

Eligible means:

- published;
- publication timestamp has passed;
- indexable;
- not archived;
- canonical;
- valid;
- not duplicated.

Exclude:

- drafts;
- future scheduled records;
- noindex articles;
- archived replacements;
- invalid records;
- preview routes.

# Daily Status Logic

## During first-three bootstrap

Set the new article to:

```text
draft
```

Do not change sitemap count.

## On the third launch-ready article

Validate and publish all three together when all quality gates pass.

## After launch threshold

Publish the single new Insight when all quality gates pass.

Do not publish merely because the article exists.

---

# Phase 14 — Tests

Add or update tests covering the new article.

At minimum verify:

1. Article record passes automatic registry validation.
2. ID is unique.
3. Slug is unique.
4. Canonical topic is unique.
5. Intent fingerprint is unique.
6. Normalized title is not duplicated.
7. Canonical URL uses the apex host.
8. Primary intent is present.
9. Sources are present.
10. Related routes exist.
11. Author is exactly Jaynesh Shingala.
12. No public job title or location is exposed.
13. Reporting period is accurate.
14. Monthly data is not mislabeled as annual data.
15. Units are correct.
16. Article route resolves only when status permits.
17. Draft status remains out of sitemap.
18. Published status enters sitemap correctly.
19. Future status remains inaccessible.
20. Structured data matches visible content.
21. Citations are rendered near important claims.
22. No prohibited placeholder content exists.
23. Existing guide, state, calculator, and research routes remain intact.
24. Protected files remain unchanged.

Tests must inspect actual implementation behavior.

Do not write tests that only assert documentation text.

---

# Phase 15 — Browser Review

When browser tooling is available, review:

- Insight article desktop layout;
- mobile layout;
- H1;
- breadcrumbs;
- direct-answer box;
- table or chart;
- source links;
- focus states;
- internal links;
- horizontal overflow;
- console errors;
- hydration warnings;
- metadata;
- canonical URL.

When the article remains a draft and has no public route, use an approved local
fixture or preview mechanism without making the draft publicly indexable.

When browser tooling is unavailable, state exactly:

```text
Browser Review: Skipped
```

Do not claim visual, mobile, keyboard, console, or hydration review from source
inspection alone.

---

# Phase 16 — Validation Commands

After final edits, run:

```text
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test

pnpm --filter=@energy-bill-lab/web test
pnpm --filter=@energy-bill-lab/database test
pnpm --filter=@energy-bill-lab/api test

pnpm build:web
pnpm build:api
```

Run repository checks:

```text
git status --short
git diff --name-only
git diff --cached --name-only
git ls-files --others --exclude-standard
git diff --check
```

Verify protected files:

```text
git diff -- packages/database/src/clients/db-client.ts
git diff -- apps/web/package.json
git diff -- turbo.json
git diff -- vercel.json
git diff -- render.yaml
```

Run the final validation commands after the last source edit.

Do not report an earlier build as validation of later changes.

---

# Documentation Rules

Update only the relevant:

- topic-research record;
- publishing status or editorial log;
- `.ai/ACTIVE_TASK.md`, when needed.

Do not edit `.ai/BRAIN.md` during every daily article unless a genuine
constitutional rule changes.

Do not rewrite the entire Insights architecture documentation daily.

Do not add generated walkthrough files to production documentation unless the
repository intentionally tracks them.

---

# Required Final Report

Use these sections:

## Daily Decision

## Current Date

## Existing Insights Status

## Analytics Evidence

## Current Internet Research

## Candidate Topics Considered

## Selected Topic

## Content-Type Decision

## Conflict and Cannibalization Audit

## Topic Research Record

## Primary Sources

## Reporting Period and Units

## Original Value

## Article Created or Existing Page Updated

## Article Status

## Article Structure

## Calculations

## Charts and Tables

## Claim-Level Citations

## Internal Links

## Metadata

## Structured Data

## Privacy Verification

## Sitemap and Indexing Status

## First-Three Launch Status

## Tests

## Browser Review

## Build Results

## Git State

## Files Created

## Files Modified

## Protected-File Verification

## Remaining Risks

## Next Required Editorial Action

## Suggested Commit Message

# Required Final Decision

Use exactly one:

```text
DRAFTED — one launch Insight completed and held for the first-three release

PUBLISHED — one Insight completed, validated, and published

FIRST THREE PUBLISHED — three launch Insights validated and released together

UPDATED EXISTING PAGE — selected intent belonged to an existing permanent page

REJECTED — candidate topic duplicated an existing search intent

DEFERRED — reliable data or original value was insufficient

BLOCKED — a verified technical or data conflict prevented safe completion
```

# Required Honesty Statements

Include:

“The topic was checked against existing Guides, state pages, calculators,
Research reports, and Insights before content creation.”

“Current factual claims were verified using primary sources accessed during
this run.”

“The article was not published solely to satisfy a daily production target.”

“Production impact remains unverified until deployment and live validation.”

When applicable:

“The article remains a draft until the first-three launch threshold is
completed.”

# Suggested Commit Messages

For a draft:

```text
content(insights): prepare [concise-topic-name] analysis
```

For a published Insight:

```text
content(insights): publish [concise-topic-name] analysis
```

For the first batch:

```text
content(insights): launch initial energy insights collection
```

# Final Constraint

Complete exactly one editorial topic decision in this run.

Do not create multiple new Insights.

Do not create placeholder content.

Do not lower quality standards to meet the daily target.

Do not publish when data, citations, intent ownership, or original value remain
uncertain.
