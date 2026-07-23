# Production EV Home Charging Cost Calculator

The **EV Home Charging Cost Calculator** at `/tools/ev-home-charging-cost-calculator` enables U.S. electric vehicle owners to estimate grid electricity consumption (kWh), charging losses, session costs (USD), and optional cost-per-mile driving metrics.

## Route

- **Canonical Path**: `/tools/ev-home-charging-cost-calculator`
- **Sitemap Included**: Yes
- **Ad Eligible**: Yes (substantive publisher content, AC-to-DC charging loss explanations, Level 1 vs Level 2 comparisons, worked examples, and electrical safety guidance)

## Core Formulas

### 1. Charging Session Energy & Cost

```text
batteryPercentAdded = targetChargePercent - startingChargePercent
batteryEnergyAddedKwh = batteryCapacityKwh × (batteryPercentAdded ÷ 100)
gridEnergyRequiredKwh = batteryEnergyAddedKwh ÷ (chargingEfficiencyPercent ÷ 100)
chargingLossKwh = gridEnergyRequiredKwh - batteryEnergyAddedKwh
chargeCostUsd = gridEnergyRequiredKwh × (Electricity Rate in ¢/kWh ÷ 100)
```

### 2. Optional Driving Efficiency & Cost per Mile

```text
drivingBatteryKwh = milesDriven ÷ milesPerKwh
drivingGridKwh = drivingBatteryKwh ÷ (chargingEfficiencyPercent ÷ 100)
drivingCostUsd = drivingGridKwh × (Electricity Rate in ¢/kWh ÷ 100)
costPerMileUsd = drivingCostUsd ÷ milesDriven
```

## Inputs & Boundaries

1. **Usable Battery Capacity**: `5` to `300` kWh
2. **Starting SoC**: `0%` to `99%`
3. **Target SoC**: `1%` to `100%` (must be > starting SoC)
4. **Charging Efficiency**: `50%` to `100%` (default 88%-90% AC-to-DC conversion)
5. **Electricity Rate**: `0.1` to `500.0` ¢/kWh (manual input or official EIA state average)
6. **Optional Driving Distance**: `1` to `50,000` miles
7. **Optional Driving Efficiency**: `0.5` to `10.0` miles/kWh

## Cost Reduction Scenarios

The calculator generates a scenario comparison table:

- **Base Charging Session**: Current user parameters.
- **Off-Peak EV Tariff**: Charging at a 30% discounted off-peak rate.
- **Optimal Level 2 Efficiency**: High-efficiency 92% Level 2 charging.
- **Charge to 80% SoC**: Charging to 80% target SoC for daily battery health conservation.

## Accessibility & Privacy

- **WCAG 2.2 AA Compliance**: Fully labeled form inputs, 44px touch targets, clear field associations.
- **ARIA Live Announcements**: Results updates announced dynamically via `aria-live="polite"`.
- **Privacy-Safe Analytics**: Pushes coarse neutral event tags (`ev_calculation_completed`, `charge_range_band`, `result_cost_band`) to `window.dataLayer`. Zero user inputs, financial values, or battery capacities are collected.
