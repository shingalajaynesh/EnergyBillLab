# Energy Bill Lab — Detailed Build and Launch Plan

**Domain:** EnergyBillLab.com  
**Planning horizon:** 90 days  
**Primary milestone:** production-quality, AdSense-ready public utility site  
**Revenue stretch goal:** ₹50,000/month after meaningful U.S. traffic develops  
**Important:** AdSense approval, rankings, traffic, RPM, and revenue cannot be guaranteed.

---

## 1. Executive architecture decision

Build a public-first utility and content product, not a login-first SaaS.

### Final stack

| Area | Decision |
|---|---|
| Monorepo | pnpm + Turborepo |
| Frontend | Next.js App Router + TypeScript |
| UI | Ant Design + Ant Design tokens + CSS Modules |
| Charts | Ant Design Charts / `@ant-design/plots` |
| Backend | NestJS with Fastify adapter |
| Database | Neon PostgreSQL |
| ORM | Drizzle ORM |
| Validation | Zod/shared contracts |
| Frontend hosting | Vercel |
| API/jobs hosting | Render |
| Cache | Vercel ISR/CDN + Redis-compatible application cache + PostgreSQL snapshots |
| Authentication | None for public MVP; Clerk later for admin/saved reports |
| Media | Local optimized assets; Cloudinary only for dynamic uploads/video |
| Monitoring | Sentry plus platform logs |

### Why this architecture

- Next.js serves crawlable, fast public pages.
- Ant Design provides a consistent enterprise component system.
- PostgreSQL fits state rates, monthly snapshots, appliances, sources, and auditability.
- A Render API supports scheduled imports and admin operations without forcing every public request through a live backend.
- Vercel ISR and cached data keep public pages fast and resilient.
- Avoiding public authentication reduces friction and dynamic-rendering cost.

---

## 2. Product scope for launch

### Core promise

The user enters bill and usage information and receives an understandable explanation of likely cost drivers, effective rate, usage change, state comparison, and next steps.

### Five launch calculators

1. Electricity Bill Analyzer
2. Appliance Energy Cost Calculator
3. Air Conditioner Cost Calculator
4. Space Heater Cost Calculator
5. EV Home Charging Cost Calculator

### Trust and policy pages

1. About
2. Contact
3. Methodology
4. Data Sources
5. Editorial Policy
6. Privacy Policy
7. Terms
8. Disclaimer
9. Accessibility

### Initial editorial pages

1. Why Is My Electric Bill So High?
2. Why Did My Electric Bill Double?
3. Electric Bill Higher With the Same Usage
4. High Electric Bill in Summer
5. High Electric Bill in Winter
6. High Electric Bill in an Apartment
7. Estimated Meter Reading Explained
8. Electric Bill Fixed Charges Explained
9. Time-of-Use Electricity Rates Explained
10. Phantom Power Cost and Detection

### Initial state pages

1. California
2. Texas
3. Florida
4. New York
5. Pennsylvania
6. Illinois
7. Ohio
8. Georgia
9. North Carolina
10. Arizona

---

## 3. Information architecture

### Header navigation

- Bill Analyzer
- Calculators
- Electricity Rates
- Appliances
- Guides
- About

### Footer groups

**Tools**
- Bill Analyzer
- Appliance Calculator
- AC Calculator
- Heater Calculator
- EV Charging Calculator

**Research**
- Electricity Rates
- Data Sources
- Methodology
- Editorial Policy

**Company**
- About
- Contact
- Accessibility

**Legal**
- Privacy
- Terms
- Disclaimer

### URL rules

- All public slugs are lowercase and kebab-case.
- Published slugs remain stable.
- Use 301 redirects when a slug must change.
- Do not create duplicate routes for synonyms.
- State pages use one canonical pattern: `/electricity-rates/[state]`.
- Calculator pages use `/tools/[tool-slug]`.

---

## 4. Data model

### Core tables

#### `states`

- `id`
- `code`
- `name`
- `slug`
- `region`
- `is_published`
- timestamps

#### `electricity_rate_snapshots`

- `id`
- `state_id`
- `period_year`
- `period_month`
- `sector`
- `rate_cents_per_kwh`
- `source_id`
- `source_published_at`
- `fetched_at`
- `import_run_id`
- `quality_status`
- timestamps

Unique constraint:

```text
(state_id, period_year, period_month, sector, source_id)
```

#### `appliances`

- `id`
- `slug`
- `name`
- `category`
- `typical_watts_min`
- `typical_watts_default`
- `typical_watts_max`
- `duty_cycle_default`
- `source_id`
- `is_published`
- timestamps

#### `data_sources`

- `id`
- `name`
- `publisher`
- `dataset_name`
- `source_url`
- `methodology_url`
- `license_notes`
- `update_frequency`
- `is_active`
- timestamps

#### `import_runs`

- `id`
- `source_id`
- `status`
- `started_at`
- `completed_at`
- `records_received`
- `records_inserted`
- `records_updated`
- `records_rejected`
- `error_summary`

#### `content_pages`

- `id`
- `slug`
- `content_type`
- `title`
- `description`
- `status`
- `author_id`
- `reviewer_id`
- `published_at`
- `updated_at`
- `canonical_path`
- `source_reviewed_at`

Do not build a full database CMS on day one unless needed. Editorial content can initially live in typed MDX or structured content files. Add database publishing only when workflow volume justifies it.

#### `authors`

- `id`
- `name`
- `role`
- `bio`
- `profile_slug`
- `is_active`

#### `audit_logs`

- `id`
- `actor_id`
- `action`
- `entity_type`
- `entity_id`
- `before_json`
- `after_json`
- `created_at`

---

## 5. Calculation specifications

### 5.1 Appliance cost

Base formula:

```text
kWh = watts × hours_per_day × days × duty_cycle / 1000
cost = kWh × electricity_rate
```

Return:

- hourly cost
- daily kWh and cost
- monthly kWh and cost
- annual kWh and cost
- rate used
- duty cycle
- assumptions

### 5.2 Bill analyzer

Inputs:

- state
- current bill amount
- previous bill amount
- current kWh
- previous kWh
- current billing days
- previous billing days
- known fixed fees, optional

Derived values:

- effective rate for each period
- daily normalized usage
- daily normalized cost
- bill percentage change
- usage percentage change
- rate/effective-cost percentage change
- estimated effect of added usage
- estimated effect of rate/fixed-charge change
- comparison with latest validated state residential rate

The result must say “estimate” and explain that taxes, tiers, riders, demand charges, fuel adjustments, and utility-specific fees can change the actual bill.

### 5.3 AC calculator

Inputs:

- AC type
- wattage or capacity
- efficiency input where available
- hours per day
- days per month
- duty cycle
- state or custom rate

Return cost ranges when the user provides approximate equipment data.

### 5.4 Space-heater calculator

Inputs:

- wattage
- quantity
- hours per day
- days
- rate

Warn when the user compares spot heating with whole-home heating because they serve different areas.

### 5.5 EV charging calculator

Inputs:

- battery capacity
- starting charge percentage
- target charge percentage
- charging efficiency
- electricity rate
- miles driven, optional
- vehicle efficiency, optional

Return:

- grid kWh required
- charge cost
- cost per mile when possible
- monthly estimate when mileage is provided

---

## 6. Design system plan

### Brand direction

Energy Bill Lab should feel like a modern, independent data utility: serious, neutral, simple, and approachable.

### Design tokens

Define centrally:

- brand primary
- text hierarchy
- success, warning, and error colors
- border colors
- surface colors
- spacing scale
- border radii
- typography scale
- control heights
- chart palette
- motion durations

Do not scatter raw colors, arbitrary spacing, and one-off shadows throughout CSS.

### Core reusable components

Build only product-level abstractions:

- `AppHeader`
- `AppFooter`
- `PageContainer`
- `PageHeader`
- `CalculatorShell`
- `CalculatorFormSection`
- `CalculatorResultSummary`
- `AssumptionsPanel`
- `DataSourceNote`
- `LastUpdated`
- `MetricValue`
- `StateRateSummary`
- `RelatedLinks`
- `EditorialByline`
- `EmptyState`
- `ErrorState`

Do not create wrappers such as `AppButton`, `AppInput`, or `AppTypography` unless a real repeated product rule requires them.

### Homepage layout

1. Compact header
2. Direct problem-focused headline
3. Bill Analyzer visible above or immediately below fold
4. Trusted-data explanation
5. Popular calculator links
6. State electricity-rate snapshot
7. Common bill-increase causes
8. Methodology and official source explanation
9. Latest guides
10. Trust footer

No decorative hero illustration should delay or visually overpower the primary calculator.

---

## 7. Caching and data-refresh plan

### Data ingestion flow

```text
Scheduled Render job
    -> fetch official source
    -> validate response schema
    -> normalize units and geography
    -> stage records
    -> run quality checks
    -> transactionally upsert valid records
    -> invalidate Redis keys
    -> trigger Vercel revalidation webhook
    -> log import result
```

### Cache keys

Use explicit versioned keys:

```text
ebl:v1:rates:state:{stateCode}:latest
ebl:v1:rates:state:{stateCode}:history:{years}
ebl:v1:appliance:{slug}
ebl:v1:aggregate:national-latest
```

### Revalidation

- A validated rate import triggers state page and rate-index revalidation.
- Content publish triggers only affected route and sitemap revalidation.
- Never purge the full production cache for a one-page update.

### Resilience

- Public page generation reads the database snapshot, not the upstream source.
- If Render is down, existing Vercel pages continue serving.
- If Redis is down, API falls back to PostgreSQL with conservative rate limiting.
- If a new import fails validation, old validated data remains active.

---

## 8. API module plan

```text
modules/
├── health/
├── states/
├── electricity-rates/
├── appliances/
├── calculations/
├── data-sources/
├── imports/
├── cache/
├── auth/
├── admin/
└── audit/
```

### API behavior

- All responses use documented contracts.
- Errors have stable error codes.
- Do not expose raw internal errors.
- GET endpoints that serve public reference data support caching.
- Calculation endpoints should normally be unnecessary for pure client-side formulas; use the shared calculation package directly in the web app when no secret or server data is required.
- Use the API when authoritative server data, imports, admin actions, or protected operations are involved.

---

## 9. SEO implementation plan

### Global

- Metadata base set to canonical production domain.
- Correct canonical tags.
- Dynamic metadata for state, appliance, guide, and comparison pages.
- XML sitemap separated by content type if volume grows.
- `robots.txt` permits public pages and blocks non-public utility paths.
- Structured data validated before deployment.
- Breadcrumbs on nested pages.

### Structured data candidates

Use only when accurate:

- `WebSite`
- `Organization`
- `BreadcrumbList`
- `Article` for genuine editorial guides
- `FAQPage` only when visible FAQs are substantial and appropriate
- Web application schema only when it accurately describes the tool

Do not add review stars, ratings, pricing, or author credentials that do not exist.

### Internal linking

Every page must link naturally to:

- the most relevant calculator
- methodology or data source when relevant
- two to four closely related pages
- a parent hub

Avoid massive keyword-heavy footer link blocks.

---

## 10. AdSense review readiness plan

### Critical technical checks

- Production domain returns HTTPS 200.
- `www` and apex redirect consistently to one canonical host.
- Verification code or meta tag is present exactly as configured.
- `/ads.txt` returns plain text and 200 when configured.
- Main pages are not blocked by robots or `noindex`.
- No authentication wall.
- No staging password.
- No placeholder routes.
- No broken calculator.
- No internal test text or fake sample content visible.
- Privacy page accurately describes analytics, cookies, advertising, and choices.
- Consent messaging is configured for relevant jurisdictions.

### Content checks

- Each indexable page has clear publisher content.
- Calculators include explanation, formula, assumptions, and examples.
- State pages contain unique state-specific data and analysis.
- Guides use original organization and practical examples.
- Sources and update dates are visible.
- About and editorial responsibility are clear.

### During active review

- Keep the site stable and reachable.
- Continue improving quality, but do not deploy half-finished redesigns.
- Do not remove verification.
- Do not delete and re-add the site merely because review is slow.
- Do not add aggressive third-party ad formats.

---

## 11. Thirty-day execution plan

The dates below assume work starts immediately. Adjust calendar dates while keeping sequence and quality gates.

### Days 1–3: Repository and architecture foundation

Deliver:

- monorepo structure
- Next.js web app
- NestJS/Fastify API
- shared TypeScript, lint, and formatting configuration
- CI pipeline
- environment validation
- health endpoints
- initial README
- BRAIN and project plan committed

Quality gate:

- install succeeds
- typecheck succeeds
- lint succeeds
- test command succeeds
- production builds succeed

### Days 4–6: Design system and application shell

Deliver:

- Ant Design SSR integration
- theme tokens
- global reset and typography
- header and footer
- page container and headers
- responsive navigation
- error and 404 pages
- initial homepage shell

Quality gate:

- no style flash
- no hydration warning
- keyboard navigation works
- mobile header works

### Days 7–9: Trust, legal, and SEO foundation

Deliver:

- About
- Contact
- Methodology
- Data Sources
- Editorial Policy
- Privacy
- Terms
- Disclaimer
- Accessibility
- metadata system
- robots
- sitemap
- canonical redirects

Quality gate:

- all pages contain real project-specific text
- no template placeholders
- canonical host consistent
- pages included or excluded from sitemap correctly

### Days 10–13: Database and official-data foundation

Deliver:

- Drizzle schema
- migrations
- seed states
- source registry
- import-run model
- first EIA rate importer
- validation and normalization
- last-known-good import behavior
- import tests

Quality gate:

- importer is idempotent
- malformed input cannot replace valid data
- state/month uniqueness enforced
- source date stored

### Days 14–17: Shared calculation engine

Deliver:

- unit utilities
- decimal-safe money utilities
- appliance cost formula
- bill comparison formula
- AC calculation model
- heater model
- EV charging model
- boundary tests
- public contracts

Quality gate:

- formula tests use known worked examples
- rounding behavior documented
- no framework dependency in calculation package

### Days 18–21: First two calculators

Deliver:

- Electricity Bill Analyzer
- Appliance Energy Cost Calculator
- result summaries
- assumptions panel
- source notes
- accessible validation
- mobile layout

Quality gate:

- results understandable without technical knowledge
- no full-page loading screen
- edge states handled
- calculator controls visually separated from future ad zones

### Days 22–24: Remaining three calculators

Deliver:

- AC Cost Calculator
- Space Heater Cost Calculator
- EV Home Charging Cost Calculator
- related-links system
- shareable URL state only if it does not expose sensitive data

Quality gate:

- all five calculators tested across required viewports
- no duplicate formula logic
- route metadata complete

### Days 25–27: First data and guide pages [COMPLETED]

Deliver:

- 40 state pages with real data [COMPLETED BATCH 1, 2, 3, 4]
- 5 high-intent problem guides minimum [COMPLETED]
- electricity-rates hub [COMPLETED]
- guides hub [COMPLETED]
- appliance hub [COMPLETED]
- state chart or table [COMPLETED]
- Guide/footer HTML validity and UI hardening [COMPLETED]

Quality gate:

- every state page has unique data and interpretation
- every guide links to a relevant calculator
- source dates visible
- no mass AI text
- 100% valid semantic table markup without raw attribute text
- footer restructured with concise hub links

### Next Planned Phase: Source, editorial-quality, SEO and real-browser review of the first five guides

### Days 28–30: Production and AdSense audit

Deliver:

- Core Web Vitals pass-oriented optimization
- accessibility audit
- broken-link audit
- content and source review
- analytics verification
- Search Console verification
- ads.txt verification when configured
- production monitoring
- backup and rollback runbook
- review-safe deployment

Quality gate:

- no critical errors
- no placeholder content
- no indexation blockers
- public calculators work without login
- production build and tests pass

---

## 12. Days 31–60 growth plan

### Product

- Add refrigerator, dryer, water-heater, pool-pump, and dehumidifier calculators.
- Add calculator comparison tables.
- Improve result explanations based on analytics.
- Add printable result view only after core performance remains healthy.

### Content

- Add 10–15 carefully reviewed state pages.
- Complete the first 10 problem guides.
- Publish two original data reports.
- Create one embeddable chart for outreach.

### Distribution

- Contact relevant local journalists and energy writers with original state data.
- Publish short educational videos based on calculators.
- Contribute useful answers to permitted communities without link spam.
- Use Search Console queries to improve pages already earning impressions.

### Technical

- Add controlled on-demand revalidation.
- Add stale-data alerts.
- Add import dashboard.
- Add performance budgets to CI.
- Add visual regression checks for core routes.

---

## 13. Days 61–90 growth and monetization plan

### Site scope

Target:

- 12–15 useful calculators
- 30–40 high-quality state pages
- 15–20 problem and comparison guides
- 4 original data reports

### Ad implementation after approval

Start conservatively:

- one ad after meaningful introductory publisher content
- one ad after the calculator result area, with safe spacing
- one in a long educational section

Do not place ads beside form controls, tabs, dropdowns, result-expansion buttons, or navigation.

### Optimization

- Measure U.S. share of traffic.
- Measure pages per session.
- Measure tool completion.
- Measure page RPM by route type.
- Improve pages with impressions but weak click-through rate.
- Consolidate thin or overlapping pages.
- Do not increase ad density before content and traffic quality are established.

---

## 14. Revenue planning

₹50,000/month is an outcome target, not an engineering milestone.

Illustrative traffic requirements:

| Page RPM assumption | Approximate monthly pageviews for ₹50,000 |
|---:|---:|
| ₹300 | 166,667 |
| ₹500 | 100,000 |
| ₹800 | 62,500 |
| ₹1,000 | 50,000 |

Actual RPM may be lower or higher. U.S. traffic, page intent, season, ad demand, viewability, device mix, policy status, and user engagement all affect revenue.

The engineering plan should optimize for usefulness, search visibility, repeatable data publishing, and multiple relevant pageviews per user—not ad clicks.

---

## 15. Team and AI-agent work method

### One task at a time

Each agent receives:

- one measurable objective
- allowed files or modules
- acceptance criteria
- tests required
- explicit out-of-scope items

### Required task lifecycle

1. Audit existing implementation.
2. Report findings.
3. Propose smallest compliant change.
4. Implement.
5. Run checks.
6. Remove newly obsolete code.
7. Review diff.
8. Commit one coherent change.
9. Report exact validation results.

### Suggested sequence of first commits

1. `chore(repo): establish Energy Bill Lab monorepo foundation`
2. `feat(design-system): add Ant Design tokens and application shell`
3. `feat(seo): add trust pages and crawlability foundation`
4. `feat(data): add electricity rate schema and import pipeline`
5. `feat(calculations): add shared energy calculation engine`
6. `feat(bill-analyzer): add electricity bill analysis workflow`
7. `feat(appliance-calculator): add appliance energy cost tool`

---

## 16. Decisions that must not be revisited casually

- Ant Design is the UI system.
- CSS Modules are the custom styling method.
- Neon PostgreSQL is the primary database.
- Drizzle manages schema and migrations.
- Public login is excluded from MVP.
- Clerk is the future auth default.
- Render API is not the required runtime path for cached public content.
- Official data is stored as validated snapshots.
- Calculations live in a pure shared package.
- Programmatic pages require unique value.
- No mass AI publishing.
- No microservices.

Any change requires an ADR that describes context, options, decision, consequences, migration, and rollback.

---

## 17. First production release acceptance checklist

### Repository

- clean git status
- no debug files
- no secrets
- no temporary folders
- documented environment variables

### Build quality

- typecheck passes
- lint passes
- unit tests pass
- integration tests pass
- production web build passes
- production API build passes

### UI

- Ant Design only
- no hydration warnings
- no broken responsive layouts
- clear loading, empty, and error states
- no AI-template visual patterns

### Performance

- critical content server-rendered or static
- images optimized
- charts lazy loaded
- no unnecessary client providers
- no blocking third-party script

### SEO

- canonical domain correct
- sitemap accessible
- robots accessible
- public pages indexable
- admin excluded
- unique titles and H1s
- structured data valid where used

### AdSense

- verification remains present
- ads.txt accessible when configured
- privacy disclosures accurate
- site public and navigable
- no placeholders
- no deceptive ad or button layout

### Operations

- monitoring enabled
- health checks work
- failed imports preserve old data
- rollback documented
- source update dates visible

---

## 18. Official references checked for this plan

These references must be rechecked before consequential implementation changes because platform guidance can change.

### Google AdSense and Search

- AdSense eligibility requirements: https://support.google.com/adsense/answer/9724?hl=en
- AdSense Program policies: https://support.google.com/adsense/answer/48182?hl=en
- Add and verify a site in AdSense: https://support.google.com/adsense/answer/12169212?hl=en
- Privacy and messaging: https://support.google.com/adsense/answer/10924669?hl=en
- Ads.txt guide: https://support.google.com/adsense/answer/12171612?hl=en
- Ad placement policies: https://support.google.com/adsense/answer/1346295?hl=en
- People-first content guidance: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Spam policies and scaled content abuse: https://developers.google.com/search/docs/essentials/spam-policies
- Guidance for generative AI content: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content

### Frontend, UI, and caching

- Ant Design with Next.js: https://ant.design/docs/react/use-with-next/
- Ant Design server-side rendering: https://ant.design/docs/react/server-side-rendering/
- Next.js App Router: https://nextjs.org/docs/app
- Next.js caching: https://nextjs.org/docs/app/getting-started/caching
- Next.js ISR: https://nextjs.org/docs/app/guides/incremental-static-regeneration
- Vercel CDN cache: https://vercel.com/docs/caching/cdn-cache

### Platform and data infrastructure

- Clerk Next.js App Router quickstart: https://clerk.com/docs/nextjs/getting-started/quickstart
- Firebase Authentication reference, evaluated but not selected for MVP: https://firebase.google.com/docs/auth/web/start
- Cloudinary upload documentation: https://cloudinary.com/documentation/upload_images
- Render web services: https://render.com/docs/web-services
- Drizzle with Neon: https://orm.drizzle.team/docs/connect-neon
