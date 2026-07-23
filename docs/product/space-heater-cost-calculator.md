# Production Space Heater Cost Calculator

The **Space Heater Cost Calculator** at `/tools/space-heater-cost-calculator` allows U.S. residential consumers to estimate the electricity consumption (kWh) and operating cost (USD) of one or more electric space heaters.

## Route

- **Canonical Path**: `/tools/space-heater-cost-calculator`
- **Sitemap Included**: Yes
- **Ad Eligible**: Yes (substantive publisher content, quantity support, thermostat duty-cycle explanations, cost scenario tables, worked examples, and electrical safety guidance)

## Core Formula

```text
totalRatedWatts = heaterWatts × quantity
effectiveWatts = totalRatedWatts × (dutyCyclePercent ÷ 100)
kWh = (effectiveWatts × hoursPerDay × days) ÷ 1,000
Cost ($) = kWh × (Electricity Rate in ¢/kWh ÷ 100)
```

## Inputs & Boundaries

1. **Heater Wattage**: `10` to `10,000` Watts per heater
2. **Quantity**: `1` to `20` units (integer)
3. **Hours per Day**: `0` to `24` hours
4. **Period (Days)**: `1` to `365` days (default 30 days)
5. **Electricity Rate**: `0.1` to `500.0` ¢/kWh (manual input or official EIA state average)
6. **Thermostat Duty Cycle**: `0%` to `100%` (default 80% active element draw)

## Cost Reduction Scenarios

The calculator generates a scenario comparison table:

- **Base Estimate**: Current user parameters.
- **Reduce Runtime**: Cost impact of operating 1 hour less per day.
- **Switch to Low Setting**: Cost impact of operating at 750W low power setting (if current watts > 750W).
- **Reduce Quantity**: Cost impact of operating 1 fewer heater (if quantity > 1).
- **Lower Thermostat Duty Cycle**: Cost impact of a 20% lower thermostat duty cycle.

## Accessibility & Privacy

- **WCAG 2.2 AA Compliance**: Labeled inputs, quantity steppers, 44px touch targets.
- **ARIA Live Announcements**: Results updates announced dynamically via `aria-live="polite"`.
- **Privacy-Safe Analytics**: Pushes coarse neutral event tags (`heater_calculation_completed`, `multiple_heaters`, `cost_band`) to `window.dataLayer`. Zero user inputs or financial values are collected.
