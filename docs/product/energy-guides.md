# Energy Bill Lab — Problem-Solving Energy Guides

## Overview

Energy Bill Lab publishes deep, source-backed energy problem-solving guides designed to help U.S. households understand utility bill spikes, appliance power draw, HVAC cooling costs, space heater runtime, and home EV charging expenses.

Each guide directly supports one of the five core launch calculators:

1. **Why Is My Electric Bill So High?** (`/guides/why-is-my-electric-bill-so-high`) $\rightarrow$ Primary CTA: `/electricity-bill-analyzer`
2. **How Much Electricity Do Household Appliances Use?** (`/guides/how-much-electricity-do-household-appliances-use`) $\rightarrow$ Primary CTA: `/tools/appliance-energy-cost-calculator`
3. **How Much Does It Cost to Run an Air Conditioner?** (`/guides/how-much-does-it-cost-to-run-an-air-conditioner`) $\rightarrow$ Primary CTA: `/tools/ac-cost-calculator`
4. **How Much Does It Cost to Run a Space Heater?** (`/guides/how-much-does-it-cost-to-run-a-space-heater`) $\rightarrow$ Primary CTA: `/tools/space-heater-cost-calculator`
5. **How Much Does It Cost to Charge an EV at Home?** (`/guides/how-much-does-it-cost-to-charge-an-ev-at-home`) $\rightarrow$ Primary CTA: `/tools/ev-home-charging-cost-calculator`

---

## Guide Article Visual Architecture

- **Reading Width**: Reading column max-width constrained to 780px for comfortable reading with full-width table overflow wrappers.
- **Brand Color Palette**: Built on Energy Bill Lab brand teal tokens (`var(--ebl-primary, #176b5b)`, `var(--ebl-primary-strong, #104c41)`), avoiding bright blue gradients.
- **Restrained Typography**: Natural H1/H2 heading sizes without hardcoded numeric prefixes.
- **Table Semantics**: 100% valid semantic HTML tables featuring `<table aria-label="...">`, `<caption>`, `<thead>`, `<tbody>`, and `<th scope="col">` scopes. No raw attribute text inside table bodies.
- **Natural CTAs**: Clear contextual action labels ("Analyze my electricity bill", "Estimate appliance electricity cost", etc.) pointing to primary tools.

---

## Guides Hub Architecture

- **Location**: `/guides` (`apps/web/src/app/guides/page.tsx`)
- **Information Architecture**: Separates the 5 editorial problem guides into an "Energy Problem Guides" card grid, with a distinct, compact "Use a Calculator" section below.

---

## Footer Linking Strategy

- **Hub Links**: Footer groups link to primary hubs (`Tools`, `Learn`, `Company`, `Legal`) rather than listing every state report and guide article individually.
- **Compact Height**: Reduced vertical footprint with balanced column widths, keyboard focus rings, and mobile touch targets.

---

## Editorial & Research Standards

- **First-Party & Government Sources**: Primary claims are attributed to official sources including U.S. EIA, U.S. DOE, ENERGY STAR, EPA, and AFDC.
- **Shared Calculation Engine**: All worked examples are generated dynamically using `@energy-bill-lab/calculation-engine`.
- **Server Components**: All guide pages are 100% server-rendered static HTML with JSON-LD structured data schemas (`BreadcrumbList` + `Article`).
