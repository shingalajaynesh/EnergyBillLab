# Energy Bill Lab — Problem-Solving & Appliance Energy Guides

## Overview

Energy Bill Lab publishes deep, source-backed energy problem-solving and appliance benchmark guides designed to help U.S. households understand utility bill spikes, appliance power draw, HVAC cooling costs, space heater runtime, home EV charging expenses, and specific appliance energy consumption.

Each guide directly supports one of the ten core tools:

### Electric Bill Diagnostic Guides (5)

1. **Why Is My Electric Bill So High?** (`/guides/why-is-my-electric-bill-so-high`) $\rightarrow$ Primary CTA: `/electricity-bill-analyzer`
2. **How Much Electricity Do Household Appliances Use?** (`/guides/how-much-electricity-do-household-appliances-use`) $\rightarrow$ Primary CTA: `/tools/appliance-energy-cost-calculator`
3. **How Much Does It Cost to Run an Air Conditioner?** (`/guides/how-much-does-it-cost-to-run-an-air-conditioner`) $\rightarrow$ Primary CTA: `/tools/ac-cost-calculator`
4. **How Much Does It Cost to Run a Space Heater?** (`/guides/how-much-does-it-cost-to-run-a-space-heater`) $\rightarrow$ Primary CTA: `/tools/space-heater-cost-calculator`
5. **How Much Does It Cost to Charge an EV at Home?** (`/guides/how-much-does-it-cost-to-charge-an-ev-at-home`) $\rightarrow$ Primary CTA: `/tools/ev-home-charging-cost-calculator`

### Appliance-Specific Benchmark Guides (5)

6. **How Much Electricity Does a Refrigerator Use?** (`/guides/how-much-electricity-does-a-refrigerator-use`) $\rightarrow$ Primary CTA: `/tools/refrigerator-cost-calculator`
7. **How Much Does It Cost to Run an Electric Clothes Dryer?** (`/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer`) $\rightarrow$ Primary CTA: `/tools/clothes-dryer-cost-calculator`
8. **How Much Does It Cost to Run an Electric Water Heater?** (`/guides/how-much-does-it-cost-to-run-an-electric-water-heater`) $\rightarrow$ Primary CTA: `/tools/electric-water-heater-cost-calculator`
9. **How Much Does It Cost to Run a Pool Pump?** (`/guides/how-much-does-it-cost-to-run-a-pool-pump`) $\rightarrow$ Primary CTA: `/tools/pool-pump-cost-calculator`
10. **How Much Does It Cost to Run a Dehumidifier?** (`/guides/how-much-does-it-cost-to-run-a-dehumidifier`) $\rightarrow$ Primary CTA: `/tools/dehumidifier-cost-calculator`

---

## Guide Article Visual & Technical Architecture

- **Reading Width**: Reading column max-width constrained to 780px for comfortable reading with full-width table overflow wrappers.
- **Brand Color Palette**: Built on Energy Bill Lab brand teal tokens (`var(--ebl-primary, #176b5b)`, `var(--ebl-primary-strong, #104c41)`), avoiding bright blue gradients.
- **Restrained Typography**: Natural H1/H2 heading sizes without hardcoded numeric prefixes.
- **Table Semantics**: 100% valid semantic HTML tables featuring `<table aria-label="...">`, `<caption>`, `<thead>`, `<tbody>`, and `<th scope="col">` scopes. No raw attribute text inside table bodies.
- **Natural CTAs**: Clear contextual action labels ("Calculate refrigerator energy cost", "Calculate clothes dryer cost", etc.) pointing to primary tools.

---

## Guides Hub Architecture

- **Location**: `/guides` (`apps/web/src/app/guides/page.tsx`)
- **Information Architecture**: Categorizes all 10 guides into two distinct grids:
  1. "Electric Bill Diagnostic Guides"
  2. "Appliance Energy & Cost Guides"
- Followed by a compact "Use a Calculator" section linking to all 10 tools.

---

## Editorial & Research Standards

- **First-Party & Government Sources**: Primary claims are attributed to official sources including U.S. EIA, U.S. DOE, ENERGY STAR, EPA, and FTC EnergyGuide.
- **Shared Calculation Engine**: All worked examples are generated dynamically using `@energy-bill-lab/calculation-engine`.
- **Server Components**: All guide pages are 100% server-rendered static HTML with JSON-LD structured data schemas (`BreadcrumbList` + `Article`).
