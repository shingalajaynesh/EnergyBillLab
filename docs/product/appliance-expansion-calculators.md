# Production Appliance Expansion Calculators

This document details the 5 expansion appliance cost calculators added to EnergyBillLab.com.

## Routes & Boundaries

1. **Refrigerator Cost Calculator**: `/tools/refrigerator-cost-calculator`
2. **Clothes Dryer Cost Calculator**: `/tools/clothes-dryer-cost-calculator`
3. **Electric Water Heater Cost Calculator**: `/tools/electric-water-heater-cost-calculator`
4. **Pool Pump Cost Calculator**: `/tools/pool-pump-cost-calculator`
5. **Dehumidifier Cost Calculator**: `/tools/dehumidifier-cost-calculator`

## Core Formulas & Scope Guardrails

### 1. Refrigerator Cost Calculator

- **Modes**:
  - Wattage Mode: `kWh = (Watts × Hours per Day × Days × Duty Cycle %) ÷ 1,000`
  - EnergyGuide Mode: `kWh = (Annual kWh ÷ 365) × Days` (Duty cycle forced to 100% to prevent double-scaling)
- **Scope**: Electric compression refrigerators.

### 2. Clothes Dryer Cost Calculator

- **Formula**: `kWh = (Watts × (Minutes per Load / 60) × Loads per Week × Weeks) ÷ 1,000`
- **Scope**: Electric dryers only. Gas dryer fuel calculations are excluded.

### 3. Electric Water Heater Cost Calculator

- **Formula**: `kWh = (Element Watts × Active Elements × Hours per Day × Days × Duty Cycle %) ÷ 1,000`
- **Default Active Elements**: 1.
- **Scope**: Electric-resistance tank water heaters only. Heat-pump models excluded.

### 4. Pool Pump Cost Calculator

- **Formula**: `kWh = (Input Watts × Hours per Day × (Days per Week / 7) × (Weeks × 7)) ÷ 1,000`
- **Scope**: Primary input power in Watts required. Horsepower without efficiency derivation excluded.

### 5. Dehumidifier Cost Calculator

- **Formula**: `kWh = (Watts × Hours per Day × Days × Duty Cycle %) ÷ 1,000`
- **Scope**: Electrical wattage and duty cycle model primary. Pint rating energy derivation excluded.

## UI & Accessibility Design System

- **Compact Input Badges**: All numeric inputs use Ant Design `<Space.Compact>` with visual, non-focusable unit badges (`NumberInputWithUnit`), avoiding deprecated `addonAfter`.
- **Electricity Rate Format**: Primary display remains `18.83 ¢/kWh` (never `$18.83/kWh`).
- **Footer & Layout**: Global `min-height: 100dvh` flex layout ensures consistent main-to-footer spacing (`clamp(48px, 6vw, 72px)`).
