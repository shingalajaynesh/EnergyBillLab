# Production Air Conditioner Cost Calculator

The **Air Conditioner Cost Calculator** at `/tools/ac-cost-calculator` allows U.S. residential consumers to estimate the electricity consumption (kWh) and operating cost (USD) of any room air conditioner, portable AC, ductless mini-split, or central cooling system.

## Route

- **Canonical Path**: `/tools/ac-cost-calculator`
- **Sitemap Included**: Yes
- **Ad Eligible**: Yes (substantive publisher content, BTU/EER explanations, cost scenario tables, and worked examples)

## Supported Calculation Modes

1. **Capacity & Efficiency Mode (`capacity_eer`)**:
   - `Input Watts = Cooling Capacity (BTU/hr) ÷ EER Rating`
   - Converts BTU/hr and EER (BTU/Wh) directly into electrical power input.
2. **Direct Wattage Mode (`wattage`)**:
   - Accepts direct electrical input power rating in Watts.

## Core Formula

```text
kWh = (Input Watts × Hours Used per Day × Days × Duty Cycle %) ÷ 1,000
Cost ($) = kWh × (Electricity Rate in ¢/kWh ÷ 100)
```

## Inputs & Boundaries

1. **Calculation Mode**: `capacity_eer` vs `wattage`
2. **AC Type**: `window`, `portable`, `minisplit`, `central`, `custom`
3. **Cooling Capacity**: `1,000` to `120,000` BTU/hr (12,000 BTU = 1 Ton)
4. **EER Rating**: `1.0` to `40.0` BTU/Wh
5. **Wattage**: `10` to `20,000` Watts
6. **Hours per Day**: `0` to `24` hours
7. **Period (Days)**: `1` to `365` days (default 30 days)
8. **Electricity Rate**: `0.1` to `500.0` ¢/kWh (manual input or official EIA state average)
9. **Duty Cycle**: `0%` to `100%` (default 60% active compressor draw)

## Cost Reduction Scenarios

The calculator generates a scenario comparison table:

- **Base Estimate**: Current user parameters.
- **Reduce Runtime**: Cost impact of operating 1 hour less per day.
- **Lower Duty Cycle**: Cost impact of a 10% lower compressor duty cycle (e.g. thermostat set 2°F higher).

## Accessibility & Privacy

- **WCAG 2.2 AA Compliance**: Labeled inputs, mode radio buttons, 44px touch targets.
- **ARIA Live Announcements**: Results updates announced dynamically via `aria-live="polite"`.
- **Privacy-Safe Analytics**: Pushes coarse neutral event tags (`ac_calculation_completed`, `calculation_method`, `cost_band`) to `window.dataLayer`. Zero user inputs, BTU, EER, or financial values are collected.
