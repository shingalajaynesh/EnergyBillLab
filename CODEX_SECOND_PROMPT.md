# Second Prompt — Design System, Trust Pages, and SEO Foundation

You are continuing development of EnergyBillLab.com after the Phase 0 foundation commit.

## Current repository state

Existing commits:

- `5679a39` — existing Phase 0 monorepo scaffold
- `9b81386 chore(repo): establish Energy Bill Lab foundation`

The previous task already validated installation, formatting, type checking, linting, tests, the Next.js production build, and the API production build. Do not recreate the monorepo, replace the shell, or start calculator implementation.

## Mandatory reading and inspection

Before editing:

1. Read `BRAIN.md` completely.
2. Read `PROJECT_PLAN.md` completely, especially the design system, information architecture, SEO, AdSense readiness, and Days 4–9 sections.
3. Inspect `git status`, recent commits, and the complete diff of `9b81386`.
4. Audit existing theme tokens, App Router metadata, header, footer, navigation, page layout, error pages, route files, CSS Modules, SEO files, and legal/trust content.
5. Search before creating anything. Extend existing implementations instead of introducing alternatives.

## Security gate — perform before feature work

An ignored local `.env` may contain a real Neon credential.

- Never print, copy, summarize, expose, stage, or commit any secret value.
- Verify that local environment files are ignored.
- Run a repository-history check to determine whether any `.env` file or credential-shaped value was ever committed.
- Report only whether tracked exposure was found; never display the secret.
- Ensure safe `.env.example` files contain placeholders only.
- Do not attempt to rotate credentials automatically. State clearly in the final report that the repository owner must rotate the Neon credential manually because it was visible to an AI coding environment.

If a secret is found in Git history, stop feature work and report the affected file/commit without reproducing the value.

## Objective

Complete the professional public design-system, trust, legal, route, accessibility, and SEO foundation required before calculator development.

The result must feel like a serious U.S. consumer data utility built by an experienced product team. It must not look like an AI-generated landing page, SaaS template, startup marketing page, or generic blog.

## Approved visual direction

Use only:

- Ant Design components where an accessible product component is useful
- Ant Design theme tokens as the central visual source of truth
- CSS Modules for product-specific layout and styling
- semantic HTML
- Ant Design Icons only when an icon genuinely improves comprehension

Do not add another UI library, Tailwind, Bootstrap, shadcn, Material UI, Chakra, Mantine, styled-components, or a utility CSS framework.

Avoid:

- gradients and gradient text
- glassmorphism
- glow effects
- oversized rounded cards
- excessive shadows
- floating decorative blobs
- fake dashboards
- fake testimonials
- invented ratings or user counts
- emoji icons
- unnecessary animations
- a huge empty hero
- repetitive card grids
- generic AI copy

The design should use restrained borders, controlled spacing, clear type hierarchy, high information density where appropriate, and excellent mobile behavior.

## Required implementation

Implement only missing or incomplete work in these areas.

### 1. Shared design system

Establish or complete `packages/design-system` as the single source of truth for:

- Ant Design theme configuration
- semantic brand and product tokens
- typography scale
- spacing scale
- border radius policy
- control heights
- border and surface hierarchy
- status colors
- chart palette preparation
- responsive layout constants when useful

Do not create unnecessary wrappers for basic Ant Design controls. Product-level reusable components are allowed only when they encode a repeated product rule.

### 2. Product-level layout components

Audit and implement only what is needed from:

- `PageContainer`
- `PageHeader`
- `EditorialByline`
- `LastUpdated`
- `DataSourceNote`
- `RelatedLinks`
- accessible `EmptyState`
- accessible `ErrorState`

Keep Server Components by default. Add client boundaries only where browser interaction is required.

### 3. Navigation and route registry

Create one typed source of truth for public navigation and footer links. Do not duplicate labels and paths in multiple components.

Required public routes:

- `/`
- `/tools`
- `/electricity-rates`
- `/appliances`
- `/guides`
- `/comparisons`
- `/methodology`
- `/data-sources`
- `/about`
- `/contact`
- `/editorial-policy`
- `/privacy`
- `/terms`
- `/disclaimer`
- `/accessibility`

Do not create individual calculator, state, appliance, guide, or comparison detail pages in this task.

Hub routes must not pretend that unpublished tools or articles already exist. If a hub has no published entries yet, provide a useful, honest explanation of the planned category and link to genuinely available pages. Do not publish “coming soon” filler lists.

### 4. Trust, policy, and legal content

Create production-quality, plain-English pages that accurately reflect the current product.

Requirements:

- no fabricated company history
- no fabricated editorial team
- no false claims of professional engineering, utility, financial, legal, or energy-auditor certification
- no invented address or phone number
- no copied policy templates
- no promise that estimates are exact
- no statement that AdSense or advertising is active unless it is actually configured
- no statement that cookies are absent if analytics or platform cookies may exist
- clearly explain calculations are informational estimates
- clearly describe official/public data sources and update dates
- clearly state that utility tariffs, taxes, riders, tiers, weather, fixed fees, and household behavior can change actual bills

For Contact, use only verified project contact information already present in environment/configuration or repository documentation. If none exists, use a clearly marked configuration value and fail safely rather than inventing an email address.

### 5. Homepage refinement

Refine the homepage into a trustworthy pre-calculator product introduction without implementing a fake analyzer.

It should include:

- direct problem-focused heading
- concise explanation of what Energy Bill Lab will calculate
- transparent statement that tools use estimates and sourced data
- clear links to Methodology and Data Sources
- explanation of the product categories
- no nonfunctional form controls
- no fake live statistics
- no fabricated “latest rate” data
- no decorative image dependency

The page should remain useful and honest before calculators are implemented.

### 6. SEO foundation

Implement or audit:

- production `metadataBase` using validated environment configuration
- canonical metadata
- title template and page-specific descriptions
- Open Graph and Twitter metadata using existing real assets only
- `robots.ts`
- `sitemap.ts`
- exclusion of internal/admin/API routes
- stable lowercase kebab-case URLs
- breadcrumb component/schema for nested future use
- valid `WebSite` and `Organization` structured data only with truthful fields
- no fake social profiles
- no FAQ, review, rating, or product schema in this task

Preserve existing AdSense verification and `/ads.txt` behavior exactly unless it is demonstrably broken. Never invent a publisher ID.

### 7. Accessibility

Ensure:

- skip-to-content link
- semantic landmarks
- one logical H1 per page
- keyboard-operable desktop and mobile navigation
- visible focus states
- adequate contrast
- correct active-navigation semantics
- reduced-motion respect where motion exists
- minimum practical mobile touch targets
- no icon-only action without an accessible name

### 8. Performance

- Server Components by default
- no homepage API request
- no Render dependency in the public critical path
- no large client-only navigation shell
- no full-page spinner
- no unnecessary font or image dependency
- no broad Ant Design imports if focused imports are already the established repository pattern
- preserve static rendering for eligible routes
- avoid CSS duplication and unused selectors

### 9. Testing

Add focused tests for important behavior introduced in this task, such as:

- navigation registry integrity and unique paths
- sitemap inclusion/exclusion
- metadata helpers
- structured-data serialization where applicable
- any shared utility with meaningful logic

Do not add shallow snapshot tests merely to increase test count.

## Change discipline

- Make the smallest coherent change.
- Do not reformat unrelated files.
- Do not update unrelated dependencies.
- Do not regenerate the lockfile unless dependency changes are necessary.
- Do not implement calculator formulas, databases, EIA ingestion, authentication, admin pages, Cloudinary, ads, analytics dashboards, newsletters, or user accounts.
- Do not delete a working implementation before the replacement is complete and validated.
- After implementation, search for imports, selectors, routes, and components made obsolete by this change. Remove only proven-unused code created obsolete by this task.

## Required pre-edit response

Before making changes, output exactly:

Repository findings:
- Existing implementation:
- Relevant files:
- Duplicate or overlapping code:
- Security/history check:
- Constraints:
- Risks:

Implementation scope:
- Will change:
- Will not change:

Then proceed without requesting confirmation unless destructive action, data loss, or unavailable credentials block safe completion.

## Required validation

Run all applicable checks from the repository root when possible:

- `pnpm install --frozen-lockfile` when the lockfile is already valid
- formatting check
- typecheck
- lint
- unit tests
- web production build
- API production build

If a root command fails because of the coding sandbox rather than repository code, capture the exact cause, run the underlying repository-defined command directly, and do not change project architecture merely to work around an agent environment.

Also inspect:

- `git status`
- final diff
- generated files
- dead imports
- duplicate route metadata
- accidental secret exposure

Do not claim any check passed unless it was actually run successfully.

## Commit

Create one clean commit only after validation:

`feat(web): add design system and trust foundation`

## Required final response

Completed:
- ...

Files changed:
- ...

Security:
- Local secret tracking/history result:
- Manual credential action required:

Validation:
- install:
- format:
- typecheck:
- lint:
- tests:
- web build:
- API build:

Performance/SEO/accessibility impact:
- ...

Removed obsolete code:
- ...

Risks or follow-up:
- ...

Commit created:
- `feat(web): add design system and trust foundation`

Do not begin database, official-data ingestion, or calculator implementation in this commit.
