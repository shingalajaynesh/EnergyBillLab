# Production Appliance Energy Cost Calculator

The **Appliance Energy Cost Calculator** at `/tools/appliance-energy-cost-calculator` allows U.S. residential energy consumers to estimate the electricity consumption (kWh) and monetary operating cost (USD) of any household electrical device.

## Route

- **Canonical Path**: `/tools/appliance-energy-cost-calculator`
- **Sitemap Included**: Yes
- **Ad Eligible**: Yes (substantive publisher content, methodology notes, and worked examples)

## Core Calculation Formula

All calculations are executed by the pure `@energy-bill-lab/calculation-engine` package:

```text
kWh = (Watts × Hours Used per Day × Days × Duty Cycle %) ÷ 1,000
Cost ($) = kWh × (Electricity Rate in ¢/kWh ÷ 100)
```

## Inputs & Boundaries

1. **Wattage (W)**: Range `1` to `50,000` Watts. Represents continuous active power draw.
2. **Hours per Day**: Range `0` to `24` hours. Supports decimals (e.g. 0.5 hrs).
3. **Period (Days)**: Range `1` to `365` days (default 30 days).
4. **Electricity Rate (¢/kWh)**: Range `0.1` to `500.0` ¢/kWh (default 16.50¢/kWh). Can be overridden manually or selected from official U.S. EIA residential state averages.
5. **Duty Cycle (%)**: Range `0%` to `100%` (default 100%). Represents active draw percentage for cycling appliances (refrigerators, AC compressors, thermostats).

## Preset Benchmarks

- **Space Heater**: 1,500W @ 100% duty cycle
- **Window Air Conditioner**: 1,000W @ 50% duty cycle
- **Refrigerator**: 150W @ 33% duty cycle
- **Clothes Dryer**: 3,000W @ 100% duty cycle
- **Electric Oven**: 2,400W @ 75% duty cycle
- **Dishwasher**: 1,200W @ 100% duty cycle
- **Desktop PC**: 200W @ 100% duty cycle
- **55" LED TV**: 100W @ 100% duty cycle
- **LED Light Bulb**: 10W @ 100% duty cycle

## Accessibility & Privacy

- **WCAG 2.2 AA Compliance**: Touch targets ≥ 44px, labeled inputs, unit addons, logical tab order.
- **ARIA Live Announcements**: Results updates announced dynamically via `aria-live="polite"`.
- **Privacy-Safe Analytics**: Pushes coarse neutral event tags (`appliance_calculation_completed`, `preset_used`, `cost_band`) to `window.dataLayer`. Zero user inputs, financial metrics, or wattage figures are collected or transmitted.
