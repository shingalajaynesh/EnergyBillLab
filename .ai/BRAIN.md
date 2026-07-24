# Energy Bill Lab — Engineering Constitution

**Project:** EnergyBillLab.com  
**Document:** `BRAIN.md`  
**Status:** Mandatory and authoritative  
**Audience:** Human developers, ChatGPT Codex, Claude, Gemini, Antigravity, code-review agents, design agents, and future maintainers  
**Last updated:** 2026-07-24 (State Coverage Batch 5: All 50 States Published)

---

## 1. Purpose of this file

This file is the permanent engineering constitution for Energy Bill Lab. Every human or AI agent must read this file before inspecting, planning, generating, modifying, reviewing, or deleting code.

This document takes priority over temporary prompts, AI suggestions, convenience shortcuts, visual trends, and personal coding preferences. If a requested change conflicts with this file, the agent must stop, explain the conflict, and propose the smallest compliant alternative.

The goal is not to generate code quickly. The goal is to build a trustworthy, fast, maintainable, search-friendly U.S. home-energy website that could be operated for years by a professional engineering team.

---

## 2. Product mission

Energy Bill Lab helps U.S. residents understand why their electricity or home-energy bill is high, estimate appliance operating costs, compare state electricity rates, and identify practical ways to reduce expenses.

The product must provide original utility through calculators, transparent formulas, official data, clear methodology, state-specific comparisons, and useful explanations. It must not become a generic AI-written blog, a collection of copied calculators, or a thin programmatic SEO site.

### Primary user promise

> Understand your energy bill, identify what changed, and find realistic ways to save.

### Primary audience

- U.S. homeowners
- U.S. renters
- Apartment residents
- EV owners
- People comparing heating, cooling, or appliance costs
- People searching for state electricity rates

---

## 3. Non-negotiable product principles

1. **Public-first:** Core calculators and information must work without login.
2. **Speed-first:** Public pages must not depend on a live Render API call when cached or static data can serve the answer.
3. **Evidence-first:** Important claims and rate data must identify the source and data date.
4. **Calculation transparency:** Every calculator must explain its formula, assumptions, units, and limitations.
5. **People-first content:** Content must solve a real user problem and add original value.
6. **No AI slop:** No generic filler, fabricated statistics, repetitive introductions, fake expertise, or mass-produced state pages.
7. **Mobile-first:** Every workflow must be easy to complete on a mobile device.
8. **No deceptive monetization:** Ads must never resemble controls, results, navigation, or download actions.
9. **Maintainability over novelty:** Prefer boring, documented, tested architecture over fashionable complexity.
10. **One source of truth:** Shared calculations, schemas, tokens, constants, and route metadata must not be duplicated.

---

## 4. Final technology decisions

These are approved defaults. Do not replace them without a written Architecture Decision Record.

### 4.1 Repository model

Use a TypeScript monorepo managed with:

- `pnpm`
- Turborepo
- strict TypeScript
- shared ESLint and Prettier configuration

### 4.2 Frontend

- Next.js App Router
- React
- TypeScript
- Ant Design as the only general UI component library
- Ant Design theme tokens
- CSS Modules for custom page-level styling
- Ant Design Icons
- Ant Design Charts or `@ant-design/plots` for charts
- Zod for validation and shared contracts

### 4.3 Backend

- Node.js
- NestJS modular monolith
- Fastify adapter
- REST API under `/api/v1`
- OpenAPI documentation for internal development
- Zod or DTO validation at every external boundary

Do not create microservices. A modular monolith is the required architecture until traffic, staffing, or operational evidence proves a real need to split services.

### 4.4 Database

Use **Neon PostgreSQL** with **Drizzle ORM** and version-controlled migrations.

PostgreSQL is selected because the product contains structured, relational, time-series-like data:

- states
- utilities
- residential electricity rates
- monthly source snapshots
- appliances
- calculator assumptions
- content records
- citations and source dates
- authors
- data imports
- audit logs

Use `numeric` or integer minor units for money and rates where precision matters. Never use JavaScript floating-point values as the authoritative stored representation for financial calculations.

MongoDB is not approved for the primary database. JSONB may be used inside PostgreSQL for genuinely flexible metadata, but it must not replace a clear relational schema.

### 4.5 Authentication

**No public user login in the launch MVP.** Login adds friction, dynamic rendering, privacy obligations, and complexity without helping AdSense approval or initial organic traffic.

When authentication becomes necessary:

- Use Clerk for the admin panel and optional saved user reports.
- Keep public calculator routes anonymous and cacheable.
- Never require login to see a basic calculator result.
- Protect authorization on the server, not only in the UI.

Firebase Authentication is not approved for the initial web architecture. It may be reconsidered only if a future mobile application or Firebase-centered product requirement creates a strong reason.

### 4.6 Media

- Store brand assets, icons, diagrams, and small static illustrations in the repository.
- Use Next.js image optimization for local and remote images.
- Use Cloudinary only for dynamic uploads, admin-managed media, responsive transformations, or videos.
- Do not add Cloudinary merely to host a logo or ordinary static page images.
- Never expose Cloudinary secrets to the browser.

### 4.7 Hosting

- Frontend: Vercel
- API and scheduled data jobs: Render
- Database: Neon PostgreSQL
- DNS and security proxy: Cloudflare where useful
- Media: local assets first; Cloudinary when required
- Error monitoring: Sentry or an approved equivalent

The public website must remain useful if the Render API is temporarily unavailable. Frequently used rate data must be persisted and served through Vercel-cached pages or frontend data endpoints.

---

## 5. Required repository structure

```text
energy-bill-lab/
├── apps/
│   ├── web/                         # Next.js App Router application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── features/
│   │   │   ├── lib/
│   │   │   ├── styles/
│   │   │   └── content/
│   │   ├── public/
│   │   └── tests/
│   └── api/                         # NestJS + Fastify application
│       ├── src/
│       │   ├── modules/
│       │   ├── common/
│       │   ├── config/
│       │   └── jobs/
│       └── tests/
├── packages/
│   ├── calculation-engine/          # Pure formulas; no framework dependencies
│   ├── contracts/                   # Zod schemas and API types
│   ├── database/                    # Drizzle schema, client, migrations
│   ├── design-system/               # Ant Design tokens and approved wrappers
│   ├── eslint-config/
│   ├── typescript-config/
│   └── testing/
├── docs/
│   ├── architecture/
│   ├── decisions/
│   ├── data-sources/
│   ├── product/
│   └── runbooks/
├── BRAIN.md
├── PROJECT_PLAN.md
├── README.md
├── pnpm-workspace.yaml
└── turbo.json
```

Do not create miscellaneous dumping folders such as `helpers`, `common-utils`, `new-components`, `temp`, `old`, `backup`, `v2-final`, or `misc`.

---

## 6. Public route architecture

### 6.1 Core routes

```text
/
/tools
/tools/electricity-bill-analyzer
/tools/appliance-energy-cost-calculator
/tools/ac-cost-calculator
/tools/space-heater-cost-calculator
/tools/ev-home-charging-cost-calculator
/electricity-rates
/electricity-rates/[state]
/appliances
/appliances/[slug]
/guides
/guides/[slug]
/comparisons
/comparisons/[slug]
/methodology
/data-sources
/about
/contact
/editorial-policy
/privacy
/terms
/disclaimer
/accessibility
/sitemap
```

### 6.2 Admin routes

```text
/admin
/admin/content
/admin/appliances
/admin/rates
/admin/data-imports
/admin/sources
/admin/audit-log
```

All admin routes must be authenticated, authorized, excluded from the sitemap, and marked `noindex`.

### 6.3 API routes

```text
/api/v1/health
/api/v1/states
/api/v1/states/:stateCode/rates
/api/v1/appliances
/api/v1/calculations/electricity-bill
/api/v1/calculations/appliance-cost
/api/v1/calculations/ac-cost
/api/v1/calculations/space-heater-cost
/api/v1/calculations/ev-charging-cost
/api/v1/admin/imports
```

Version all externally consumed APIs. Do not expose database-shaped responses directly. Use response contracts.

---

## 7. Naming standards

### Files and folders

- Folders: `kebab-case`
- General files: `kebab-case.ts`
- React components: `component-name.tsx`; exported component uses `PascalCase`
- Tests: `component-name.test.tsx`, `service-name.spec.ts`
- CSS Modules: `component-name.module.css`
- Database migrations: timestamp plus descriptive kebab or snake name

### Code symbols

- Components and classes: `PascalCase`
- Functions and variables: `camelCase`
- Boolean variables: `is`, `has`, `can`, or `should` prefix
- Constants: `UPPER_SNAKE_CASE`
- Hooks: `useXxx`
- Zod schemas: `XxxSchema`
- Inferred types: `XxxInput`, `XxxOutput`, or domain-specific nouns
- Database tables and columns: `snake_case`
- Environment variables: `UPPER_SNAKE_CASE`

### URL slugs

- Lowercase
- Kebab-case
- Human-readable
- Stable after publication
- No dates unless the date is essential to the page
- No file extensions
- No meaningless IDs on public content routes

---

## 8. Ant Design-only UI rule

Ant Design is the only approved general component library.

### Allowed

- Ant Design components
- Ant Design Icons
- Ant Design theme tokens
- CSS Modules
- Semantic HTML
- Small custom components built from semantic HTML when Ant Design has no appropriate component
- Ant Design Charts for data visualization

### Not allowed

- Tailwind CSS
- Bootstrap
- Material UI
- Chakra UI
- shadcn/ui
- Radix-based full component systems
- Mantine
- multiple competing design systems
- copied theme templates
- page-builder CSS

### Component discipline

- Use Ant Design components for forms, inputs, buttons, alerts, tables, tooltips, drawers, modals, menus, pagination, skeletons, tabs, and feedback.
- Do not rebuild an Ant Design component in custom CSS.
- Wrap Ant Design components only when the wrapper creates a stable product abstraction used in multiple places.
- Do not build a wrapper around every Ant Design component.
- Use one primary action per section.
- Use modal dialogs only for short, interruptive decisions. Use pages or drawers for substantial workflows.

### Next.js integration

Use the official Ant Design Next.js App Router integration and SSR style registry. Avoid hydration mismatches, style flashes, and server/client module misuse. Server Components are the default. Add `'use client'` only at the smallest interactive boundary.

---

## 9. Visual design rules: professional, not “AI-looking”

The site must look like a serious consumer-finance utility and data product, not a generic AI landing page.

### Desired visual qualities

- Calm
- Trustworthy
- Precise
- Data-led
- Spacious but not empty
- Professional U.S. utility-product aesthetic
- Clear hierarchy
- Strong typography
- Restraint
- High information density where useful

### Prohibited visual patterns

- Large purple-blue gradient blobs
- Glassmorphism
- Neon glow
- Excessive gradients
- Every card having a large radius and shadow
- Floating decorative orbs
- Generic AI sparkles
- Emoji as product icons
- Cartoon mascots without a product reason
- Fake testimonials
- Fake user counters
- Repeated three-card feature sections
- Oversized hero text that pushes the tool below the fold
- Unnecessary animation
- Parallax
- Autoplay video
- Infinite animated backgrounds
- Generic slogans such as “Unlock the power of energy intelligence”
- Repeating the same icon-in-circle pattern across the page

### Layout rules

- The primary calculator must appear in or immediately after the first viewport.
- Content width must be deliberate: narrow for reading, wider for data tables and calculators.
- Use a consistent spacing scale defined through design tokens.
- Cards are used only when content needs a visual container.
- Avoid nesting cards inside cards.
- Use borders and spacing before shadows.
- Shadows must be subtle and rare.
- Desktop and mobile must feel intentionally designed, not merely responsive.

### Typography

- Use a highly readable, performance-conscious font strategy.
- Prefer a self-hosted or Next.js-optimized font.
- Use a limited type scale.
- Avoid all-caps paragraphs.
- Use tabular numbers for prices, rates, and calculator results.

---

## 10. Performance constitution

Performance is a product feature and an SEO requirement.

### Core targets

- LCP: 2.5 seconds or less at the 75th percentile
- INP: 200 milliseconds or less at the 75th percentile
- CLS: 0.1 or less at the 75th percentile
- Cached API p95: under 300 ms
- Uncached internal API p95 target: under 800 ms
- Public content pages should serve cached or statically generated HTML whenever possible

### JavaScript budgets

- No page may import an entire library for one utility.
- Initial public-route JavaScript must be reviewed when it exceeds 220 KB compressed.
- A dependency that adds more than 20 KB compressed to a common route requires written justification.
- Charts, PDF export, and non-critical tools must be dynamically imported.
- Analytics and advertising scripts must load asynchronously and must not block primary content.

### Rendering rules

- Server Components by default.
- Client Components only for interactive calculator islands.
- Avoid global providers that force the entire application to become client-rendered.
- Do not fetch the same data independently in multiple components.
- Do not use a full-page spinner for ordinary navigation.
- Use localized skeletons only where the final layout dimensions are known.
- Avoid layout shift by reserving space for charts, images, and eventual ads.

### Asset rules

- Use SVG for simple diagrams and icons.
- Compress raster images.
- Serve responsive sizes.
- Avoid decorative images that do not improve understanding.
- Do not ship large videos on landing pages.

---

## 11. Caching architecture

Use a layered cache. Every cached value must have an owner, key format, TTL, invalidation rule, and fallback behavior.

### Layer 1: Browser and Vercel CDN

Use:

- Next.js static generation
- Incremental Static Regeneration
- route-level revalidation
- HTTP cache directives where appropriate
- immutable caching for versioned static assets

Suggested starting revalidation:

- Homepage rate summaries: 24 hours
- State electricity-rate pages: 24 hours
- Appliance reference pages: 7 days
- Evergreen guides: 7–30 days
- Legal pages: on deploy

### Layer 2: Application cache

Use a Redis-compatible managed cache behind a small cache interface for:

- hot state-rate lookups
- EIA response normalization
- expensive comparison aggregates
- request coalescing
- short-lived rate limits

No feature may directly depend on a vendor-specific Redis API outside the infrastructure adapter.

### Layer 3: PostgreSQL source snapshots

Persist normalized official data in PostgreSQL. The website must not call the upstream EIA API for every visitor.

Each imported record must include:

- source identifier
- source URL or dataset name
- source publication date when available
- fetch timestamp
- geographic scope
- sector
- unit
- value
- data quality status
- import run ID

### Failure behavior

If upstream data import fails:

1. Keep the last validated snapshot.
2. Display the last successful update date.
3. Log and alert the failure.
4. Never replace valid production data with empty or partial data.
5. Never show fabricated fallback numbers.

---

## 12. Data and calculation rules

### Pure calculation engine

All calculator formulas belong in `packages/calculation-engine` as pure TypeScript functions.

The calculation engine must:

- have no React dependency
- have no database dependency
- have no network calls
- accept explicit units
- return explicit units
- validate ranges
- expose assumptions
- return intermediate values needed for explanations
- use deterministic rounding rules
- be covered by unit tests

### Example calculation output

A calculator result should return more than a single total:

- energy consumption in kWh
- estimated hourly cost
- estimated daily cost
- estimated monthly cost
- estimated annual cost
- effective rate used
- rate source or custom-rate indicator
- assumptions
- warnings
- formula version

### Money and precision

- Use decimal-safe arithmetic for monetary and rate calculations.
- Store monetary values in integer minor units or PostgreSQL numeric types.
- Define rounding at the presentation boundary.
- Do not repeatedly round intermediate values.

### Validation

Every public input must define:

- minimum
- maximum
- unit
- default
- help text
- error message
- accessibility label

Reject impossible values and warn about unusual but technically possible values.

---

## 13. SEO and content engineering rules

### Technical SEO

Every indexable page must have:

- unique title
- useful meta description
- canonical URL
- one clear H1
- logical heading hierarchy
- crawlable HTML content
- breadcrumb where appropriate
- internal links
- Open Graph metadata
- valid structured data only when applicable
- published and updated dates for editorial content
- source and methodology links when data is used

Maintain:

- `robots.txt`
- XML sitemap index or sitemap
- canonical redirects
- clean 404 page
- redirect registry for changed slugs

### Programmatic pages

Programmatic generation is allowed only when each page has meaningful unique data and interpretation.

Do not publish all 50 state pages by swapping a state name. A state page must include state-specific:

- latest validated rate data
- historical trend
- data date
- examples
- seasonal or regional context where supported
- calculator defaults
- comparisons
- sources

### Content quality

Every content page must answer a real search intent. Remove filler. Do not target word count.

Prohibited:

- copied paragraphs
- lightly rewritten competitor pages
- fabricated author experience
- fake statistics
- unsupported superlatives
- keyword stuffing
- repetitive FAQ blocks generated only for SEO
- mass content publication without human review
- claims that a calculated estimate is a utility bill prediction

### Editorial review

Each published page needs:

- content owner
- technical reviewer for formulas or data
- source check
- broken-link check
- mobile review
- final publication status

---

## 14. AdSense and advertising rules

Google does not publish a guaranteed approval checklist, minimum article count, minimum traffic requirement, or mandatory list of “About/Contact/Terms” pages. Do not claim otherwise.

### Required or policy-critical items

- Original, useful, high-quality publisher content
- A site the publisher controls and can modify
- Compliance with Google Publisher Policies and AdSense Program Policies
- A privacy policy that accurately discloses cookies, identifiers, data collection, third-party advertising, and user choices
- Appropriate consent messaging for applicable regions
- AdSense verification code or approved verification method
- `ads.txt` at the root domain when configured, using the exact publisher line from AdSense

### Strong trust pages

Maintain these even when not individually guaranteed approval requirements:

- About
- Contact
- Methodology
- Data Sources
- Editorial Policy
- Privacy Policy
- Terms
- Disclaimer
- Accessibility

### While AdSense review is active

- Keep `https://energybilllab.com` publicly accessible.
- Do not place the core content behind login.
- Do not block Google crawlers from public content.
- Keep the AdSense verification method intact.
- Keep `/ads.txt` publicly accessible if it has been configured.
- Do not deploy blank, placeholder, “coming soon,” or broken pages.
- Continue improving content, but deploy only tested production changes.
- Do not repeatedly remove and re-add the site in AdSense.
- Monitor availability, 4xx/5xx errors, canonical behavior, and HTTPS redirects.

### Ad placement after approval

- Keep ads visually separate from calculators and controls.
- Never place an ad immediately beside a Calculate, Download, Next, Previous, dropdown, tab, or navigation control.
- Never style an ad to look like a result card.
- Never label ads as recommendations, resources, or tools.
- Reserve ad space to reduce layout shift.
- Publisher content must remain the clear primary value of the page.
- Do not ask users, friends, staff, or testers to click ads.
- Never test production ads by clicking them.
- Do not buy bot, exchange, incentivized, or low-quality traffic.

---

## 15. Privacy and security rules

### Data minimization

- Do not require personally identifiable information for calculators.
- Do not store calculator inputs by default.
- If analytics capture form interactions, do not send raw bill amounts, email addresses, addresses, utility account numbers, or uploaded bill content.
- Do not request a full street address when state or ZIP code is sufficient.

### Secrets

- No secrets in source control.
- No production credentials in screenshots, prompts, logs, or client bundles.
- Maintain `.env.example` with placeholders only.
- Validate required environment variables at startup.
- Rotate any exposed secret immediately.

### API protection

- Validate all inputs.
- Apply rate limiting to write, import, and expensive endpoints.
- Use security headers.
- Use strict CORS allowlists.
- Avoid exposing stack traces in production.
- Use parameterized database queries through Drizzle.
- Protect admin operations with server-side authorization and audit logs.

### Dependency safety

- Add dependencies only when the repository cannot reasonably solve the problem with existing code or platform APIs.
- Review package maintenance, license, size, and security posture.
- Pin or constrain production versions intentionally.
- Never install a package merely because an AI agent suggested it.

---

## 16. Multi-AI collaboration protocol

The repository may be edited by ChatGPT Codex, Claude, Gemini, Antigravity, and human developers. All agents must follow the same protocol.

### Before any change

1. Read `BRAIN.md`.
2. Read `PROJECT_PLAN.md` and relevant architecture decisions.
3. Inspect `git status`.
4. Inspect the affected route, feature, tests, contracts, and styles.
5. Search the repository for the requested feature, component, service, schema, and route.
6. Identify existing code that already solves all or part of the request.
7. State the intended scope and files before editing.
8. Preserve unrelated working behavior.

### During the change

- Make the smallest coherent change.
- Reuse or extend existing abstractions.
- Do not create duplicate utilities, components, schemas, routes, or API endpoints.
- Do not silently change public contracts.
- Do not rename broad areas unless the task requires it.
- Do not reformat unrelated files.
- Do not update the lockfile unless dependencies actually change.
- Do not change infrastructure, auth, database, or design-system choices without an ADR.
- Do not mix unrelated refactors with a feature change.

### Existing-feature rule

If a requested feature already exists:

1. Audit the existing implementation.
2. Decide whether to extend, fix, refactor, or replace it.
3. Prefer extension or focused refactoring when safe.
4. If replacement is required, build and test the replacement first.
5. Migrate every reference.
6. Remove obsolete code in the same change only after the replacement passes tests.
7. Never delete the working implementation first and leave the repository broken.

### Unused-code rule

After every change:

- run TypeScript checks
- run lint
- run relevant tests
- search for unused exports and dead imports
- remove code made obsolete by the current change
- do not delete unrelated dormant code without evidence and scope approval

### Conflict rule

When different AI agents propose different approaches, do not combine both. Use `BRAIN.md`, existing architecture, tests, and the smallest-change principle to choose one approach. Record an ADR for consequential decisions.

---

## 17. Git and change-management rules

### Branches

Use short-lived branches:

- `feat/...`
- `fix/...`
- `refactor/...`
- `chore/...`
- `content/...`

### Commits

Use Conventional Commits:

```text
feat(calculators): add appliance energy-cost engine
fix(seo): correct canonical URL for state pages
refactor(api): centralize electricity-rate contracts
chore(repo): establish monorepo quality gates
content(guides): publish high summer bill guide
```

A commit must represent one coherent purpose. Never use messages such as `changes`, `update`, `final`, `fixed`, or `work`.

### Pull request requirements

Every pull request must include:

- problem
- approach
- files or modules changed
- screenshots for UI changes
- tests run
- performance effect
- SEO effect
- accessibility effect
- migration or rollback notes
- risks and follow-up work

### Prohibited repository actions

- Force-pushing shared protected branches
- Committing directly to production without review
- Deleting migrations already applied to production
- Editing production data manually without an auditable process
- Silencing tests or lint rules to make a build pass
- Adding `any` to bypass type errors without documented justification
- Commenting out failing code instead of fixing or removing it

---

## 18. Testing strategy

### Unit tests

Required for:

- all calculation formulas
- unit conversions
- rate normalization
- money rounding
- validation boundaries
- cache-key generation

### Integration tests

Required for:

- API contracts
- database repositories
- data import idempotency
- cache invalidation
- admin authorization

### End-to-end tests

Required critical journeys:

1. Open electricity bill analyzer.
2. Enter valid data.
3. Receive an understandable result.
4. Change state or rate.
5. Share or revisit a result when supported.
6. Navigate to methodology and data source.
7. Use calculator on mobile viewport.

### Visual checks

For every major page, review at minimum:

- 360 × 800
- 390 × 844
- 768 × 1024
- 1366 × 768
- 1440 × 900
- 1920 × 1080

Use screenshot comparison for core pages after the design stabilizes.

---

## 19. Accessibility rules

- Meet WCAG 2.2 AA as the product target.
- All form controls require visible labels.
- Do not rely on color alone.
- Keyboard navigation must work.
- Focus states must remain visible.
- Charts require text summaries or accessible data tables.
- Error messages must identify the field and corrective action.
- Use semantic landmarks and headings.
- Respect reduced-motion preferences.
- Tooltips must not contain essential information unavailable elsewhere.

---

## 20. Logging, observability, and operations

### Structured logs

Logs must include:

- timestamp
- environment
- service
- request or job correlation ID
- event name
- severity
- safe context

Never log secrets, tokens, full user inputs, or sensitive uploaded content.

### Monitoring

Monitor:

- frontend availability
- API availability
- 5xx rate
- data import failures
- stale source data
- Core Web Vitals
- uncaught client errors
- database connection errors
- cache hit rate
- sitemap and robots accessibility
- ads.txt accessibility

### Health endpoints

- `/api/v1/health/live`
- `/api/v1/health/ready`

Readiness must validate essential dependencies without causing expensive operations.

---

## 21. Definition of Done

A task is not done because the UI appears to work.

A task is done only when:

1. Requirements are satisfied.
2. Existing code was audited first.
3. No duplicate implementation was introduced.
4. Types pass.
5. Lint passes.
6. Relevant unit and integration tests pass.
7. Critical UI flow was manually tested.
8. Mobile layout was checked.
9. Accessibility impact was checked.
10. Performance impact was checked.
11. SEO metadata and crawlability were checked when applicable.
12. Error, empty, loading, and edge states are handled.
13. Obsolete code created by this change was removed.
14. Documentation was updated.
15. The commit message is specific and professional.
16. The final report identifies files changed, tests run, risks, and remaining work.

---

## 22. Required agent response format

At the beginning of a coding task, an agent must provide:

```text
Repository findings:
- Existing implementation:
- Relevant files:
- Constraints:
- Risks:

Implementation scope:
- Will change:
- Will not change:
```

After implementation, the agent must provide:

```text
Completed:
- ...

Files changed:
- ...

Validation:
- typecheck:
- lint:
- tests:
- build:

Performance/SEO/accessibility impact:
- ...

Removed obsolete code:
- ...

Risks or follow-up:
- ...

Suggested commit:
- type(scope): message
```

Never claim a command passed unless it was actually run successfully.

---

## 23. Immediate launch constraints

Until AdSense review and the launch MVP are complete:

- Do not add public login.
- Do not add user-generated content.
- Do not add comments.
- Do not add paid plans.
- Do not add a complex CMS unless publication volume proves it necessary.
- Do not add microservices.
- Do not add real-time sockets.
- Do not add AI chat.
- Do not add automated mass page generation.
- Do not add intrusive popups.
- Do not use Adsterra popunders, push notifications, or deceptive ad formats.
- Do not add features that delay the five core calculators and trustworthy content pages.

---

## 24. Approved MVP sequence

1. Repository and quality foundation [COMPLETED]
2. Design tokens and application shell [COMPLETED]
3. Legal, trust, and methodology pages [COMPLETED]
4. Data model and official data import foundation [COMPLETED]
5. Shared calculation engine [COMPLETED]
6. Electricity Bill Analyzer [COMPLETED]
7. Appliance Energy Cost Calculator [COMPLETED]
8. AC Cost Calculator [COMPLETED]
9. Space Heater Cost Calculator [COMPLETED]
10. EV Home Charging Calculator [COMPLETED]
11. First high-quality state pages (10 states) [COMPLETED]
12. First problem-solving guides (5 guides) [COMPLETED]
13. Guide/footer HTML validity, footer IA, and design hardening [COMPLETED]
    - PostgreSQL remains primary rate source with no hardcoded EIA fallback values.
    - Historical trend query fetches 25 periods and displays 24 so oldest row has prior-month baseline; missing periods are never converted to zero.
    - Footer links to primary hubs (`Tools`, `Learn`, `Company`, `Legal`) without listing all 10 states or 5 guides individually.
    - All 5 guide pages use semantic `<table aria-label="...">` markup with captions and scoped headers (`scope="col"`).
    - Guide CTA buttons use Energy Bill Lab brand teal palette (`var(--ebl-primary, #176b5b)`) instead of bright blue gradients.
14. Source, editorial-quality, SEO and real-browser review of the first five guides [PLANNED]
15. Search Console, analytics, monitoring, sitemap, robots, and ads.txt verification [PLANNED]
16. Production quality audit [PLANNED]
17. AdSense review monitoring and safe iteration [PLANNED]

---

## 25. Source-of-truth rule

When documentation, temporary prompts, code comments, and implementation disagree:

1. Production behavior and tests reveal current reality.
2. `BRAIN.md` defines mandatory direction.
3. Architecture Decision Records define approved exceptions.
4. `PROJECT_PLAN.md` defines sequencing.
5. Feature specifications define task-level behavior.
6. Code comments are lowest trust and must be corrected when stale.

This file may be changed only through an intentional architecture or governance update with a clear commit and review.
