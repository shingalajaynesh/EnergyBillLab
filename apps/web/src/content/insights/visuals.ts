import type { VisualBarItem } from '@/components/technical-visual-card';

export interface InsightVisualConfig {
  badge?: string;
  badgeType?: 'primary' | 'success' | 'neutral';
  footerNote?: string;
  items: VisualBarItem[];
  subtitle?: string;
  title: string;
}

export const INSIGHT_VISUAL_CONFIGS: Record<string, InsightVisualConfig> = {
  'august-2026-swimming-pool-pump-kwh-operating-cost-benchmark': {
    title: 'Pool Pump Monthly Operating Cost & Electricity Draw Benchmark',
    subtitle: 'Calculated for a 24,000-gallon pool at national average electricity rate of 18.44¢/kWh',
    badge: '68%–72% Savings',
    badgeType: 'success',
    items: [
      {
        label: '1.5 HP Single-Speed Induction Motor (10h/day @ 1,750W)',
        displayValue: '$96.81/mo',
        value: 96.81,
        color: 'danger',
        subLabel: '525.0 kWh/month · Constant full-speed 3,450 RPM turbulent pipe friction',
      },
      {
        label: '1.5 HP Dual-Speed Motor (20h/day @ 440W Low Speed)',
        displayValue: '$48.68/mo',
        value: 48.68,
        color: 'warning',
        subLabel: '264.0 kWh/month · 1,725 RPM low-speed turnover operation',
      },
      {
        label: 'ENERGY STAR Variable-Speed Standard (20h/day @ 275W)',
        displayValue: '$30.43/mo',
        value: 30.43,
        color: 'primary',
        subLabel: '165.0 kWh/month · Permanent magnet motor low-flow filtration',
      },
      {
        label: 'Variable-Speed Optimized Dual-Schedule (16h Eco + 2h High)',
        displayValue: '$26.55/mo',
        value: 26.55,
        color: 'success',
        highlight: true,
        badge: 'Lowest Bill Impact',
        subLabel: '144.0 kWh/month · 72.6% electricity savings ($70.26/mo saved)',
      },
    ],
    footerNote:
      'Fluid Dynamics Law: Power decreases with the cube of motor speed. Reducing RPM by 50% cuts theoretical shaft power demand by 87.5%.',
  },

  'august-2026-rooftop-solar-nem-3-net-billing-export-value-benchmark': {
    title: 'Rooftop Solar Annual Utility Bill Savings by Tariff Structure',
    subtitle: 'Annual bill reduction for a 6 kW solar system (9,000 kWh/yr) on a 10,000 kWh/yr household',
    badge: 'NEM 3.0 Economics',
    badgeType: 'primary',
    items: [
      {
        label: 'Legacy NEM 2.0 (1:1 Net Metering @ 32.4¢/kWh credit)',
        displayValue: '$2,916/yr',
        value: 2916,
        color: 'primary',
        subLabel: 'Full retail credit for 5,850 kWh exported + 3,150 kWh self-consumed',
      },
      {
        label: 'NEM 3.0 Net Billing + 10 kWh Battery Storage',
        displayValue: '$2,340/yr',
        value: 2340,
        color: 'success',
        highlight: true,
        badge: 'Storage Optimized',
        subLabel: '75% on-site self-consumption (6,750 kWh) avoids high evening TOU retail rates',
      },
      {
        label: 'NEM 3.0 Standalone Solar (No Battery Storage)',
        displayValue: '$1,418/yr',
        value: 1418,
        color: 'danger',
        subLabel: 'Exports credited at wholesale avoided cost (~6.8¢/kWh) · 51.4% savings reduction',
      },
    ],
    footerNote:
      'Tariff Shift: Net billing credits excess solar exports at wholesale avoided-cost rates, making paired battery storage essential for financial ROI.',
  },

  'august-2026-electric-dehumidifier-kwh-operating-cost-benchmark': {
    title: '50-Pint Basement Dehumidifier Monthly Electricity Cost Benchmark',
    subtitle: 'Calculated across duty cycles and efficiency ratings at U.S. average 18.44¢/kWh',
    badge: 'Duty Cycle Impact',
    badgeType: 'primary',
    items: [
      {
        label: 'Standard 50-Pint Dehumidifier (Continuous 24/7 Run @ 550W)',
        displayValue: '$73.02/mo',
        value: 73.02,
        color: 'danger',
        subLabel: '396.0 kWh/month · Continuous operation caused by humidistat set to 30% RH',
      },
      {
        label: 'Standard 50-Pint Dehumidifier (12h/day Cycle @ 550W)',
        displayValue: '$36.51/mo',
        value: 36.51,
        color: 'warning',
        subLabel: '198.0 kWh/month · Moderate summer basement humidity control (50% RH target)',
      },
      {
        label: 'ENERGY STAR Most Efficient 50-Pint (12h/day Cycle @ 420W)',
        displayValue: '$27.88/mo',
        value: 27.88,
        color: 'success',
        highlight: true,
        badge: '23.6% Savings',
        subLabel: '151.2 kWh/month · High Integrated Energy Factor (IEF ≥ 1.90 L/kWh)',
      },
    ],
    footerNote:
      'Humidistat Tip: Setting target relative humidity to 50% instead of 30% prevents mold while cutting compressor run time and power draw in half.',
  },

  'august-2026-central-air-conditioner-seer2-cooling-cost-benchmark': {
    title: 'Central Air Conditioner Seasonal Cooling Cost by SEER2 Rating',
    subtitle: 'Estimated seasonal electricity expense for a 3-ton central AC system (1,200 cooling hours)',
    badge: 'Efficiency Curve',
    badgeType: 'primary',
    items: [
      {
        label: 'Legacy 10 SEER Central AC (3,600 Watts input draw)',
        displayValue: '$796/season',
        value: 796,
        color: 'danger',
        subLabel: '4,320 kWh/season · Older pre-2006 residential cooling systems',
      },
      {
        label: 'Federal Minimum 14.3 SEER2 (2,517 Watts input draw)',
        displayValue: '$557/season',
        value: 557,
        color: 'warning',
        subLabel: '3,020 kWh/season · Standard baseline replacement unit',
      },
      {
        label: 'ENERGY STAR 18.0 SEER2 (2,000 Watts input draw)',
        displayValue: '$442/season',
        value: 442,
        color: 'primary',
        subLabel: '2,400 kWh/season · Two-stage high-efficiency compressor',
      },
      {
        label: 'Ultra-Efficient 22.0 SEER2 Inverter (1,636 Watts input draw)',
        displayValue: '$362/season',
        value: 362,
        color: 'success',
        highlight: true,
        badge: 'Lowest Operating Cost',
        subLabel: '1,963 kWh/season · Variable-speed inverter compressor technology',
      },
    ],
    footerNote:
      'SEER2 Formula: Seasonal cooling cost = (36,000 BTU × 1,200 hrs ÷ SEER2 ÷ 1,000) × Electricity Rate.',
  },

  'august-2026-portable-electric-space-heater-operating-cost-benchmark': {
    title: 'Portable Electric Space Heater Daily & Monthly Operating Cost',
    subtitle: 'Calculated at 1,500 Watts continuous draw at U.S. average electricity rate of 18.44¢/kWh',
    badge: '1,500W Power Draw',
    badgeType: 'primary',
    items: [
      {
        label: 'Continuous 16 Hours / Day High Heat (1,500W)',
        displayValue: '$132.77/mo',
        value: 132.77,
        color: 'danger',
        subLabel: '24.0 kWh/day (720 kWh/mo) · Severe winter bill spike burden',
      },
      {
        label: 'Active 8 Hours / Day High Heat (1,500W)',
        displayValue: '$66.38/mo',
        value: 66.38,
        color: 'warning',
        subLabel: '12.0 kWh/day (360 kWh/mo) · Overnight bedroom heating',
      },
      {
        label: 'Thermostat Cycling 8 Hours / Day (50% Duty Cycle @ 750W Effective)',
        displayValue: '$33.19/mo',
        value: 33.19,
        color: 'primary',
        subLabel: '6.0 kWh/day (180 kWh/mo) · Cycling on/off maintaining room temp',
      },
      {
        label: 'Localized 4 Hours / Day Low Setting (750W)',
        displayValue: '$16.60/mo',
        value: 16.60,
        color: 'success',
        highlight: true,
        badge: 'Eco Use',
        subLabel: '3.0 kWh/day (90 kWh/mo) · Short evening desk/foot warming',
      },
    ],
    footerNote:
      'Efficiency Reality: All electric resistance space heaters operate at 100% efficiency (1W = 3.412 BTU), regardless of whether they are ceramic, oil-filled, or infrared.',
  },
};
