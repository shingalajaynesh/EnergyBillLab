# Production Electricity-Rate State Pages Architecture & Design System

## Overview

Energy Bill Lab provides dedicated, SEO-optimized, accessible state-level electricity rate pages for U.S. residential energy consumers. Every displayed rate is backed by official U.S. Energy Information Administration (EIA) Form 861M Monthly Retail Sales data stored within the project's PostgreSQL read database.

Canonical Route Pattern:
`/electricity-rates/[state]`

Hub Route Pattern:
`/electricity-rates`

## Approved Published States (30)

### Batch 1 (10 States)

1. `california` (CA)
2. `texas` (TX)
3. `florida` (FL)
4. `new-york` (NY)
5. `pennsylvania` (PA)
6. `illinois` (IL)
7. `ohio` (OH)
8. `georgia` (GA)
9. `north-carolina` (NC)
10. `michigan` (MI)

### Batch 2 (10 States — Growth Phase 1)

11. `arizona` (AZ)
12. `virginia` (VA)
13. `washington` (WA)
14. `new-jersey` (NJ)
15. `massachusetts` (MA)
16. `tennessee` (TN)
17. `indiana` (IN)
18. `missouri` (MO)
19. `maryland` (MD)
20. `wisconsin` (WI)

### Batch 3 (10 States — Growth Phase 2)

21. `colorado` (CO)
22. `minnesota` (MN)
23. `south-carolina` (SC)
24. `alabama` (AL)
25. `louisiana` (LA)
26. `kentucky` (KY)
27. `oregon` (OR)
28. `oklahoma` (OK)
29. `connecticut` (CT)
30. `iowa` (IA)

Any request to an unapproved state slug returns Next.js `notFound()`.

## Rate Data Provenance Architecture

All state rate models require explicit data provenance:

```ts
export type RateDataProvenance =
  | {
      status: 'live_database';
      sourcePeriod: string;
      sourceName: string;
    }
  | {
      status: 'bundled_snapshot';
      sourcePeriod: string;
      sourceName: string;
      snapshotGeneratedAt: string;
    }
  | {
      status: 'unavailable';
    };
```

### Database-First & Fallback Rules

1. **Primary Source**: The PostgreSQL database (`electricity_retail_sales_monthly`) is the sole production source of truth.
2. **No Silent Hardcoded Fallbacks**: When PostgreSQL is disconnected, empty, or unreachable, the application returns `status: 'unavailable'`.
3. **No Numerical Claims When Unavailable**: Public state pages and rates hub do not render numerical rate values, fake averages, or `0` when provenance is `unavailable`.
4. **Calculators & Manual Entry**: When state data is unavailable, calculator forms display _"State averages are temporarily unavailable — please enter your utility rate below"_. Manual numeric rate inputs remain fully functional.
5. **No Manufactured History**: Missing periods are never filled with zero or static values; historical changes are only computed across verified consecutive calendar months.

## Visual Design System & Hierarchy

- **Container Standard**: Wrapped in shared `<PageContainer>` with maximum editorial width `1180px` (`padding: 0 24px` on desktop, `0 18px` on mobile).
- **Design Tokens**: Standardized on `--ebl-primary` (`#176b5b`), `--ebl-primary-strong` (`#104c41`), `--ebl-surface` (`#ffffff`), `--ebl-surface-muted` (`#f6f8f7`), `--ebl-border-subtle` (`#eaecf0`), and `--ebl-text` (`#182230`).
- **Interactive State Cards**: Hover elevation with `border-color: #176b5b; box-shadow: 0 6px 16px rgba(16, 24, 40, 0.07); transform: translateY(-1px)` and 44px+ tap targets.
- **National Benchmark Panel**: Structured summary panel featuring tabular rate figures, period badges, and clear explanatory text.
- **User-Facing Fallback Panel**: Designed status card (`DataUnavailablePanel`) displaying clear product language without technical database error terms, featuring direct CTA buttons to the Electricity Bill Analyzer and Appliance Cost Calculator.

## Data Model & Calculation Rules

- **Latest State Rate**: Derived from `electricity_retail_sales_monthly` where `sector = 'RES'`.
- **National Comparison**: Compared against `US` national average rate (`differenceCents = stateRate - nationalRate`).
- **Period Mismatch Protection**: Discloses mismatched reporting periods if state and national data update dates differ.
- **Household Energy Charges**: Computed for 500, 800, 1,000, and 1,500 kWh baselines ($kWh \times \text{rate} / 100$). Disclosed as energy-only charges excluding fixed utility customer fees and local taxes.
- **24-Month Historical Trend**: HTML data table displaying month-over-month rate changes.
- **Missing-Period Gap Protection**: `isConsecutiveCalendarMonth()` prevents false zero-interpolation across missing EIA reporting periods, displaying missing months as "Not reported".

## Caching & Performance

- **Server Components**: All state pages are rendered server-side. Zero client-side API fetches to EIA or external services.
- **Next.js Caching**: `getStatePageData()` utilizes `unstable_cache` with a 24-hour revalidation window (`revalidate: 86400`) and tag `eia-residential-rates`.
- **Static Generation**: `generateStaticParams()` prerenders all 10 approved state pages at build time (`pnpm build:web`).

## Accessibility & SEO

- **WCAG 2.2 AA**: Accessible HTML captions, `aria-describedby` table disclaimers, text directional indicators ("above national average", "below national average").
- **Structured Data**: `BreadcrumbList` and `WebPage` JSON-LD schemas.
- **AdSense Eligibility**: Dynamic allowlist in `ADS_ALLOWED_ROUTES` explicitly permits only the 10 approved state routes.
