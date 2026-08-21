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
  // 1. Pool Pump Benchmark
  'august-2026-swimming-pool-pump-kwh-operating-cost-benchmark': {
    title: 'Pool Pump Monthly Operating Cost & Electricity Draw Benchmark',
    subtitle:
      'Calculated for a 24,000-gallon pool at national average electricity rate of 18.44¢/kWh',
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

  // 2. Rooftop Solar NEM 3.0 Benchmark
  'august-2026-rooftop-solar-nem-3-net-billing-export-value-benchmark': {
    title: 'Rooftop Solar Annual Utility Bill Savings by Tariff Structure',
    subtitle:
      'Annual bill reduction for a 6 kW solar system (9,000 kWh/yr) on a 10,000 kWh/yr household',
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
        subLabel:
          'Exports credited at wholesale avoided cost (~6.8¢/kWh) · 51.4% savings reduction',
      },
    ],
    footerNote:
      'Tariff Shift: Net billing credits excess solar exports at wholesale avoided-cost rates, making paired battery storage essential for financial ROI.',
  },

  // 3. Dehumidifier Benchmark
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

  // 4. Central AC SEER2 Benchmark
  'august-2026-central-air-conditioner-seer2-cooling-cost-benchmark': {
    title: 'Central Air Conditioner Seasonal Cooling Cost by SEER2 Rating',
    subtitle:
      'Estimated seasonal electricity expense for a 3-ton central AC system (1,200 cooling hours)',
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

  // 5. Space Heater Benchmark
  'august-2026-portable-electric-space-heater-operating-cost-benchmark': {
    title: 'Portable Electric Space Heater Daily & Monthly Operating Cost',
    subtitle:
      'Calculated at 1,500 Watts continuous draw at U.S. average electricity rate of 18.44¢/kWh',
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
        value: 16.6,
        color: 'success',
        highlight: true,
        badge: 'Eco Use',
        subLabel: '3.0 kWh/day (90 kWh/mo) · Short evening desk/foot warming',
      },
    ],
    footerNote:
      'Efficiency Reality: All electric resistance space heaters operate at 100% efficiency (1W = 3.412 BTU), regardless of whether they are ceramic, oil-filled, or infrared.',
  },

  // 6. Clothes Dryer Benchmark
  'august-2026-electric-clothes-dryer-kwh-operating-cost-benchmark': {
    title: 'Electric Clothes Dryer Annual Operating Cost by Technology',
    subtitle: 'Calculated for 283 annual drying cycles at U.S. average 18.44¢/kWh',
    badge: 'Heat Pump Savings',
    badgeType: 'success',
    items: [
      {
        label: 'Standard Vented Electric Resistance Dryer (3.0 kWh/cycle)',
        displayValue: '$156.56/yr',
        value: 156.56,
        color: 'danger',
        subLabel: '849.0 kWh/year · 5.0 kW heating element exhausting hot air outside',
      },
      {
        label: 'ENERGY STAR Standard Electric Dryer (2.4 kWh/cycle)',
        displayValue: '$125.24/yr',
        value: 125.24,
        color: 'warning',
        subLabel: '679.2 kWh/year · Advanced moisture sensor automatic cycle termination',
      },
      {
        label: 'Ventless Hybrid Heat Pump Dryer (1.2 kWh/cycle)',
        displayValue: '$62.62/yr',
        value: 62.62,
        color: 'success',
        highlight: true,
        badge: '60% Reduction',
        subLabel: '339.6 kWh/year · Closed-loop refrigerant heat exchange saves $93.94/yr',
      },
    ],
    footerNote:
      'Efficiency Tip: Heat pump dryers recycle latent heat in a closed loop, using less than half the energy of resistance dryers without needing an exterior wall vent.',
  },

  // 7. Refrigerator Benchmark
  'august-2026-refrigerator-kwh-annual-operating-cost-benchmark': {
    title: 'Refrigerator Annual Operating Cost by Configuration & Age',
    subtitle: 'Calculated across refrigerator configurations at U.S. average 18.44¢/kWh',
    badge: 'Baseload Cost',
    badgeType: 'primary',
    items: [
      {
        label: 'Pre-2000 Legacy Refrigerator (1,000+ kWh/year baseload)',
        displayValue: '$184.40/yr',
        value: 184.4,
        color: 'danger',
        subLabel: 'Common secondary refrigerator kept running in an unconditioned garage',
      },
      {
        label: 'Modern French Door with Through-Door Ice (680 kWh/year)',
        displayValue: '$125.39/yr',
        value: 125.39,
        color: 'warning',
        subLabel: 'Large capacity 26 cu.ft. French door with dual compressors',
      },
      {
        label: 'Standard Top-Freezer Baseline (450 kWh/year)',
        displayValue: '$82.98/yr',
        value: 82.98,
        color: 'primary',
        subLabel: 'Standard 18 cu.ft. top-mount freezer configuration',
      },
      {
        label: 'ENERGY STAR Most Efficient Top-Freezer (350 kWh/year)',
        displayValue: '$64.54/yr',
        value: 64.54,
        color: 'success',
        highlight: true,
        badge: 'Lowest Draw',
        subLabel: 'Inverter variable-speed compressor and vacuum insulated panels',
      },
    ],
    footerNote:
      'Garage Warning: Retaining an older 1990s refrigerator as a garage drink cooler costs over $180/year in continuous electricity baseload.',
  },

  // 8. Dishwasher Benchmark
  'august-2026-electric-dishwasher-kwh-operating-cost-benchmark': {
    title: 'Electric Dishwasher Annual Operating Cost by Cycle Setting',
    subtitle: 'Calculated for 215 annual wash loads at U.S. average 18.44¢/kWh',
    badge: 'Heated Dry Impact',
    badgeType: 'primary',
    items: [
      {
        label: 'Heavy Wash + Heated Dry Element (1.8 kWh/load)',
        displayValue: '$71.36/yr',
        value: 71.36,
        color: 'danger',
        subLabel: '387.0 kWh/year · 800W electric heating element active during dry cycle',
      },
      {
        label: 'Normal Wash + Heated Dry (1.3 kWh/load)',
        displayValue: '$51.54/yr',
        value: 51.54,
        color: 'warning',
        subLabel: '279.5 kWh/year · Standard baseline dishwasher cycle',
      },
      {
        label: 'ENERGY STAR Normal Wash + Air Dry / Condensation (0.85 kWh/load)',
        displayValue: '$33.70/yr',
        value: 33.7,
        color: 'success',
        highlight: true,
        badge: '52.8% Savings',
        subLabel: '182.8 kWh/year · Disabling heated dry saves $37.66/yr with zero clean-loss',
      },
    ],
    footerNote:
      'Actionable Tip: Turning off "Heated Dry" and allowing dishes to air-dry cuts dishwasher electrical consumption by up to 50% per load.',
  },

  // 9. Clothes Washer Benchmark
  'august-2026-electric-clothes-washer-kwh-operating-cost-benchmark': {
    title: 'Clothes Washer Annual Electricity Cost: Hot vs Cold Water',
    subtitle: 'Calculated for 300 annual wash cycles at U.S. average 18.44¢/kWh',
    badge: '90% Water Heating',
    badgeType: 'success',
    items: [
      {
        label: 'Hot Wash / Warm Rinse (4.5 kWh/load total including water heater)',
        displayValue: '$248.94/yr',
        value: 248.94,
        color: 'danger',
        subLabel: '1,350 kWh/year · 90% of electricity is consumed heating the wash water',
      },
      {
        label: 'Warm Wash / Cold Rinse (2.0 kWh/load total)',
        displayValue: '$110.64/yr',
        value: 110.64,
        color: 'warning',
        subLabel: '600 kWh/year · Mixed temperature standard cycle',
      },
      {
        label: 'Cold Water Wash on Front-Load Washer (0.35 kWh/load motor only)',
        displayValue: '$19.36/yr',
        value: 19.36,
        color: 'success',
        highlight: true,
        badge: '92% Bill Savings',
        subLabel:
          '105 kWh/year · Switching to cold water saves $229.58/year on electric water heating',
      },
    ],
    footerNote:
      'Thermal Fact: Over 90% of the electricity used in a hot wash goes to heating water in the water heater, not spinning the washer motor.',
  },

  // 10. Home Battery Storage Usable Capacity & Round-Trip Efficiency
  'august-2026-home-battery-storage-usable-capacity-round-trip-efficiency-benchmark': {
    title: '13.5 kWh Home Battery Usable Energy & AC Efficiency Delivery',
    subtitle:
      'Energy retained after Depth of Discharge (DoD) limits and AC round-trip conversion losses',
    badge: 'Efficiency Physics',
    badgeType: 'primary',
    items: [
      {
        label: 'Nominal Battery Cell Rating',
        displayValue: '13.50 kWh',
        value: 13.5,
        color: 'neutral',
        subLabel: '100% total theoretical electrochemical storage capacity',
      },
      {
        label: 'Usable DC Discharge Capacity (90% Depth of Discharge)',
        displayValue: '12.15 kWh',
        value: 12.15,
        color: 'warning',
        subLabel: '10% buffer retained by battery management system to prevent cell degradation',
      },
      {
        label: 'Delivered AC Household Electricity (88% Round-Trip Efficiency)',
        displayValue: '10.69 kWh',
        value: 10.69,
        color: 'success',
        highlight: true,
        badge: 'Real-World Output',
        subLabel:
          'Actual usable electricity available to power home circuits during outage or peak TOU',
      },
    ],
    footerNote:
      'Engineering Reality: Due to inverter AC-to-DC conversion and cell internal resistance, expect ~10.7 kWh of usable AC power from a 13.5 kWh battery.',
  },

  // 11. Natural Gas vs Electric Heating Cost Per MMBtu Benchmark
  'august-2026-natural-gas-vs-electric-heating-cost-per-mmbtu-benchmark': {
    title: 'Delivered Heating Cost per Million BTU (MMBtu) Benchmark',
    subtitle:
      'Calculated using May 2026 EIA rates: $16.14/Mcf natural gas vs 18.44¢/kWh electricity',
    badge: 'Heating Fuel Economics',
    badgeType: 'primary',
    items: [
      {
        label: 'Electric Baseboard / Space Heater (100% COP = 1.0)',
        displayValue: '$54.04 / MMBtu',
        value: 54.04,
        color: 'danger',
        subLabel: 'Direct resistance heating is 2.8x more expensive than gas furnace heating',
      },
      {
        label: 'Cold-Climate Heat Pump (COP = 2.5 @ 18.44¢/kWh)',
        displayValue: '$21.62 / MMBtu',
        value: 21.62,
        color: 'primary',
        subLabel: 'Transfers 2.5 units of heat per unit of electricity consumed',
      },
      {
        label: 'Standard 80% AFUE Gas Furnace ($16.14/Mcf)',
        displayValue: '$19.45 / MMBtu',
        value: 19.45,
        color: 'warning',
        subLabel: 'Standard baseline gas furnace operating cost',
      },
      {
        label: 'High-Efficiency 96% AFUE Condensing Gas Furnace ($16.14/Mcf)',
        displayValue: '$16.21 / MMBtu',
        value: 16.21,
        color: 'success',
        highlight: true,
        badge: 'Lowest Fuel Cost',
        subLabel: 'Condensing heat exchanger extracts latent heat from flue exhaust gases',
      },
    ],
    footerNote:
      'Fuel Metric: 1 Mcf natural gas contains ~1,037,000 BTU; 1 kWh electricity contains 3,412 BTU. Direct electric resistance is the most expensive heating method.',
  },

  // 12. Home Appliance Operating Cost Hierarchy Benchmark
  'august-2026-home-appliance-operating-cost-hierarchy-benchmark': {
    title: 'Top Residential Electricity Consumers: Annual Operating Cost Hierarchy',
    subtitle:
      'Annual electricity expense based on typical U.S. household operating patterns at 18.44¢/kWh',
    badge: 'Load Hierarchy',
    badgeType: 'primary',
    items: [
      {
        label: 'Central Air Conditioning (3-Ton, 3,000 kWh/yr)',
        displayValue: '$553.20/yr',
        value: 553.2,
        color: 'danger',
        subLabel: 'Dominant summer electricity consumer across southern and central states',
      },
      {
        label: 'Electric Water Heater (Standard 50-Gal Resistance, 3,500 kWh/yr)',
        displayValue: '$645.40/yr',
        value: 645.4,
        color: 'danger',
        subLabel: 'Highest continuous thermal load in all-electric homes',
      },
      {
        label: 'Single-Speed Pool Pump (525 kWh/mo for 5 summer months)',
        displayValue: '$484.05/yr',
        value: 484.05,
        color: 'warning',
        subLabel: '2,625 kWh/season of continuous high-speed water filtration',
      },
      {
        label: 'Electric Clothes Dryer (Standard Vented, 849 kWh/yr)',
        displayValue: '$156.56/yr',
        value: 156.56,
        color: 'primary',
        subLabel: '5,000W intermittent heating draw across 283 annual loads',
      },
      {
        label: 'Modern Refrigerator (ENERGY STAR 20 cu.ft., 400 kWh/yr)',
        displayValue: '$73.76/yr',
        value: 73.76,
        color: 'success',
        highlight: true,
        badge: 'Baseload',
        subLabel: '24/7 continuous automatic food refrigeration',
      },
    ],
    footerNote:
      'Consumption Pareto: Thermal heating, cooling, and water heating appliances account for over 75% of a typical home electricity bill.',
  },

  // 13. State Residential Electricity Price Spread Benchmark
  'august-2026-state-residential-electricity-price-spread-benchmark': {
    title: 'State Electricity Price Spread: Highest vs Lowest Rates (May 2026 EIA)',
    subtitle: 'Residential electricity rate per kilowatt-hour across top and bottom states',
    badge: '4.5x Rate Spread',
    badgeType: 'primary',
    items: [
      {
        label: 'Hawaii (Island Grid & Imported Petroleum)',
        displayValue: '52.00¢ / kWh',
        value: 52.0,
        color: 'danger',
        subLabel: '$520.00 per 1,000 kWh monthly electricity consumption',
      },
      {
        label: 'California (Grid Infrastructure & Wildfire Mitigation Tariffs)',
        displayValue: '32.40¢ / kWh',
        value: 32.4,
        color: 'danger',
        subLabel: '$324.00 per 1,000 kWh monthly electricity consumption',
      },
      {
        label: 'U.S. National Average (May 2026 EIA Release)',
        displayValue: '18.44¢ / kWh',
        value: 18.44,
        color: 'warning',
        subLabel: '$184.40 per 1,000 kWh monthly electricity consumption',
      },
      {
        label: 'Texas (Deregulated Competitive Generation)',
        displayValue: '15.50¢ / kWh',
        value: 15.5,
        color: 'primary',
        subLabel: '$155.00 per 1,000 kWh monthly electricity consumption',
      },
      {
        label: 'Washington (Pacific Northwest Hydroelectric Generation)',
        displayValue: '11.52¢ / kWh',
        value: 11.52,
        color: 'success',
        highlight: true,
        badge: 'Lowest Rate',
        subLabel: '$115.20 per 1,000 kWh monthly electricity consumption',
      },
    ],
    footerNote:
      'Geographic Disparity: A household consuming 1,000 kWh/month pays $404.80 more per month in Hawaii than in Washington State.',
  },

  // 14. Census Division Residential Electricity Rate Breakdown
  'august-2026-census-division-residential-electricity-rate-breakdown': {
    title: 'U.S. Census Division Residential Electricity Rates (May 2026 EIA)',
    subtitle: 'Average residential electricity price (¢/kWh) across the 9 U.S. Census Divisions',
    badge: 'Regional Benchmark',
    badgeType: 'primary',
    items: [
      {
        label: 'New England (CT, MA, ME, NH, RI, VT)',
        displayValue: '28.50¢ / kWh',
        value: 28.5,
        color: 'danger',
        subLabel: 'Highest regional rates due to pipeline constraints and winter LNG dependencies',
      },
      {
        label: 'Pacific Contiguous (CA, OR, WA)',
        displayValue: '24.10¢ / kWh',
        value: 24.1,
        color: 'danger',
        subLabel: 'Elevated by California utility tariffs offsetting low Northwest hydro rates',
      },
      {
        label: 'Middle Atlantic (NJ, NY, PA)',
        displayValue: '21.80¢ / kWh',
        value: 21.8,
        color: 'warning',
        subLabel: 'High transmission delivery charges and legacy infrastructure costs',
      },
      {
        label: 'U.S. National Average',
        displayValue: '18.44¢ / kWh',
        value: 18.44,
        color: 'primary',
        subLabel: 'Weighted national benchmark for 142M+ residential utility accounts',
      },
      {
        label: 'East South Central (AL, KY, MS, TN)',
        displayValue: '13.90¢ / kWh',
        value: 13.9,
        color: 'success',
        highlight: true,
        badge: 'Lowest Regional Cost',
        subLabel: 'Low-cost Tennessee Valley Authority hydro and nuclear generation resources',
      },
    ],
    footerNote: 'Source: U.S. EIA Electric Power Monthly Table 5.6.A (May 2026 data period).',
  },

  // 15. Time of Use Peak Rate Spread & Appliance Load Shifting Benchmark
  'august-2026-time-of-use-peak-rate-spread-appliance-load-shifting-benchmark': {
    title: 'Time-of-Use Rate Spread & Appliance Load Shifting Savings',
    subtitle: 'Cost to run high-draw appliances during Peak vs Off-Peak TOU pricing windows',
    badge: 'Load Shifting ROI',
    badgeType: 'success',
    items: [
      {
        label: 'Running EV + Dryer + Dishwasher During On-Peak Hours (45¢/kWh)',
        displayValue: '$18.00 / day',
        value: 18.0,
        color: 'danger',
        subLabel: '40 kWh daily consumption charged at premium 4 PM–9 PM peak rates',
      },
      {
        label: 'Running Same Appliances on Flat Standard Rate (18.44¢/kWh)',
        displayValue: '$7.38 / day',
        value: 7.38,
        color: 'warning',
        subLabel: '40 kWh daily consumption on non-time-varying flat rate',
      },
      {
        label: 'Shifting All Major Loads to Super-Off-Peak Hours (12¢/kWh)',
        displayValue: '$4.80 / day',
        value: 4.8,
        color: 'success',
        highlight: true,
        badge: '73.3% Savings',
        subLabel: 'Automating EV charging and dishwasher timers after 11 PM saves $13.20/day',
      },
    ],
    footerNote:
      'Automation Payback: Smart timer plugs and scheduled EV charging capture peak-to-off-peak rate spreads without requiring habit changes.',
  },

  // 16. May 2026 EV Home Charging Cost Benchmark
  'may-2026-ev-home-charging-cost-benchmark': {
    title: 'EV Home Charging Monthly Cost Benchmark (1,000 Miles/Month)',
    subtitle: 'Cost comparison across EV classes vs 30-MPG gas vehicle at $3.60/gal',
    badge: '70% Fuel Savings',
    badgeType: 'success',
    items: [
      {
        label: '30-MPG Gasoline Car (33.3 gal @ $3.60/gal)',
        displayValue: '$120.00/mo',
        value: 120.0,
        color: 'danger',
        subLabel: '12.0¢ per mile gasoline fuel cost baseline',
      },
      {
        label: 'Electric Pickup Truck (2.0 mi/kWh @ 18.44¢/kWh)',
        displayValue: '$92.20/mo',
        value: 92.2,
        color: 'warning',
        subLabel: '9.2¢ per mile · 500 kWh monthly grid draw',
      },
      {
        label: 'Electric SUV / Crossover (3.2 mi/kWh @ 18.44¢/kWh)',
        displayValue: '$57.63/mo',
        value: 57.63,
        color: 'primary',
        subLabel: '5.8¢ per mile · 312.5 kWh monthly grid draw',
      },
      {
        label: 'Efficient Electric Sedan (4.0 mi/kWh @ 18.44¢/kWh)',
        displayValue: '$46.10/mo',
        value: 46.1,
        color: 'success',
        highlight: true,
        badge: 'Lowest Operating Cost',
        subLabel: '4.6¢ per mile · 250 kWh monthly grid draw saves $73.90/mo vs gas',
      },
    ],
    footerNote:
      'Calculation: Monthly EV cost = (Miles ÷ Efficiency mi/kWh) × Electricity Rate. Driving an electric sedan costs ~62% less than fueling a 30-MPG gas car.',
  },

  // 17. May 2026 Heat Pump Water Heater Savings Benchmark
  'may-2026-heat-pump-water-heater-savings-benchmark': {
    title: 'Hybrid Heat Pump vs Standard Electric Water Heater Annual Cost',
    subtitle: 'Annual operating cost for a 4-person household (4,000 kWh baseline at 18.44¢/kWh)',
    badge: '72% Energy Cut',
    badgeType: 'success',
    items: [
      {
        label: 'Standard Electric Resistance Water Heater (UEF 0.92 · 4,000 kWh/yr)',
        displayValue: '$737.60/yr',
        value: 737.6,
        color: 'danger',
        subLabel: 'Direct resistance elements heat water with 1:1 electrical conversion',
      },
      {
        label: 'Standard Natural Gas Water Heater (0.64 UEF · 240 Therms/yr)',
        displayValue: '$387.36/yr',
        value: 387.36,
        color: 'warning',
        subLabel: 'Standard atmospheric vented natural gas water heater operating cost',
      },
      {
        label: 'ENERGY STAR Hybrid Heat Pump Water Heater (UEF 3.75 · 1,100 kWh/yr)',
        displayValue: '$202.84/yr',
        value: 202.84,
        color: 'success',
        highlight: true,
        badge: '$534.76/yr Saved',
        subLabel: 'Moves heat from ambient air into water tank with 375% thermodynamic efficiency',
      },
    ],
    footerNote:
      'Federal Tax Credit: The Inflation Reduction Act (Section 25C) provides up to a $2,000 tax credit for qualifying heat pump water heater installations.',
  },

  // 18. May 2026 Rooftop Solar Generation Retail Savings Benchmark
  'may-2026-rooftop-solar-generation-retail-savings-benchmark': {
    title: 'Rooftop Solar Monthly Generation Value by State Solar Insolation',
    subtitle: 'Monthly electricity bill offset for a standard 7 kW residential solar system',
    badge: 'Solar Production',
    badgeType: 'primary',
    items: [
      {
        label: 'California (1,150 kWh/mo generation @ 32.4¢/kWh retail)',
        displayValue: '$372.60/mo',
        value: 372.6,
        color: 'primary',
        subLabel: 'High solar irradiance combined with top-tier retail electricity rates',
      },
      {
        label: 'Texas (1,050 kWh/mo generation @ 15.5¢/kWh retail)',
        displayValue: '$162.75/mo',
        value: 162.75,
        color: 'warning',
        subLabel: 'High solar yield offset by lower wholesale generation tariffs',
      },
      {
        label: 'Florida (1,000 kWh/mo generation @ 15.82¢/kWh retail)',
        displayValue: '$158.20/mo',
        value: 158.2,
        color: 'warning',
        subLabel: 'Consistent sunshine offset by summer cloud cover and humidity',
      },
      {
        label: 'New York (850 kWh/mo generation @ 24.8¢/kWh retail)',
        displayValue: '$210.80/mo',
        value: 210.8,
        color: 'success',
        highlight: true,
        badge: 'High Value / kWh',
        subLabel:
          'Moderate solar yield creates high financial value due to 24.8¢/kWh electricity rates',
      },
    ],
    footerNote:
      'Solar Math: Financial value depends equally on solar insolation (kWh produced) and the utility retail rate avoided.',
  },

  // 19. May 2026 Residential Electricity Price Bill Impact
  'may-2026-residential-electricity-price-bill-impact': {
    title: 'Average U.S. Monthly Electric Bill Across Typical Usage Tiers',
    subtitle: 'Calculated using May 2026 EIA national average residential rate of 18.44¢/kWh',
    badge: 'EIA Rate Release',
    badgeType: 'primary',
    items: [
      {
        label: 'High-Demand Household (1,500 kWh/mo · Electric HVAC + EV)',
        displayValue: '$276.60/mo',
        value: 276.6,
        color: 'danger',
        subLabel: 'All-electric home with high summer cooling or winter heat pump demands',
      },
      {
        label: 'Average U.S. Household (899 kWh/mo EIA National Average)',
        displayValue: '$165.78/mo',
        value: 165.78,
        color: 'warning',
        subLabel: 'National average residential consumption baseline',
      },
      {
        label: 'Energy-Efficient Home / Apartment (500 kWh/mo)',
        displayValue: '$92.20/mo',
        value: 92.2,
        color: 'success',
        highlight: true,
        badge: 'Low Baseload',
        subLabel: 'Multi-family dwelling or highly insulated efficient single-family home',
      },
    ],
    footerNote:
      'Source: U.S. EIA Electric Power Monthly Table 5.6.A. Average residential price increased +2.4% year-over-year.',
  },

  // 20. May 2026 Cooling Demand Residential Sales
  'may-2026-cooling-demand-residential-sales': {
    title: 'Seasonal Cooling Demand (CDD) Impact on Monthly Electric Bills',
    subtitle: 'Monthly electricity bill increase as cooling degree days surge from May to August',
    badge: 'Summer Peak',
    badgeType: 'primary',
    items: [
      {
        label: 'Peak August Heatwave (1,400 kWh/mo · High AC Runtime)',
        displayValue: '$258.16/mo',
        value: 258.16,
        color: 'danger',
        subLabel:
          '+65% bill increase driven by 95°F+ outdoor temperatures and continuous AC cycling',
      },
      {
        label: 'Moderate July Summer (1,150 kWh/mo · Normal Cooling)',
        displayValue: '$212.06/mo',
        value: 212.06,
        color: 'warning',
        subLabel: 'Standard summer air conditioning load across single-family residences',
      },
      {
        label: 'Mild May Baseline (850 kWh/mo · Low AC Demand)',
        displayValue: '$156.74/mo',
        value: 156.74,
        color: 'success',
        highlight: true,
        badge: 'Baseline',
        subLabel: 'Spring shoulder season with minimal mechanical cooling requirements',
      },
    ],
    footerNote:
      'EIA Insight: Residential electricity sales surge over 30% nationally between May and August strictly due to air conditioning loads.',
  },

  // 21. April 2026 Residential Natural Gas Price Heating Cost
  'april-2026-residential-natural-gas-price-heating-cost': {
    title: 'Winter Space Heating Cost: Natural Gas vs Electric Resistance',
    subtitle: 'Monthly heating cost for 75 Therms of space heating demand (April 2026 EIA rates)',
    badge: 'Heating Fuel Comparison',
    badgeType: 'primary',
    items: [
      {
        label: 'Electric Resistance Baseboards (2,200 kWh equivalent @ 18.44¢/kWh)',
        displayValue: '$405.68/mo',
        value: 405.68,
        color: 'danger',
        subLabel: 'Direct resistance heating creates severe winter utility bill spikes',
      },
      {
        label: 'Standard 80% AFUE Gas Furnace ($16.14/Mcf)',
        displayValue: '$146.00/mo',
        value: 146.0,
        color: 'warning',
        subLabel: 'Standard natural gas heating expense across northern climate zones',
      },
      {
        label: 'High-Efficiency 96% AFUE Gas Furnace ($16.14/Mcf)',
        displayValue: '$121.60/mo',
        value: 121.6,
        color: 'success',
        highlight: true,
        badge: '69% Lower Than Electric',
        subLabel: 'Saves $284.08/mo compared to electric baseboard space heating',
      },
    ],
    footerNote:
      'Thermal Equivalence: 75 Therms of natural gas delivers ~7.5 MMBtu of heating output, equivalent to 2,200 kWh of electric resistance heat.',
  },

  // 22. May 2026 Residential Natural Gas Price Off-Season Bill Impact
  'may-2026-residential-natural-gas-price-off-season-bill-impact': {
    title: 'Summer Off-Season Natural Gas Bill: Fixed Customer Charge vs Usage',
    subtitle:
      'Monthly natural gas bill breakdown during low summer usage (20 Therms/mo for water/cooking)',
    badge: 'Fixed Charge Share',
    badgeType: 'primary',
    items: [
      {
        label: 'Total Summer Natural Gas Bill ($16.14/Mcf + $18.00 Fixed Charge)',
        displayValue: '$49.20/mo',
        value: 49.2,
        color: 'warning',
        subLabel: 'Total billing amount for 20 Therms of off-season hot water and cooking',
      },
      {
        label: 'Fixed Utility Customer Charge (Unavoidable Service Fee)',
        displayValue: '$18.00/mo',
        value: 18.0,
        color: 'danger',
        subLabel: '36.6% of the summer bill is a fixed connection fee with zero gas consumed',
      },
      {
        label: 'Volumetric Gas Commodity & Delivery Charge (20 Therms)',
        displayValue: '$31.20/mo',
        value: 31.2,
        color: 'primary',
        subLabel: 'Actual gas commodity and distribution volume consumed',
      },
    ],
    footerNote:
      'Bill Reality: During summer off-season months, fixed customer service charges make up 35% to 50% of residential gas statements.',
  },

  // 23. July 2026 Summer Wholesale Electricity Price Forecast
  'july-2026-summer-wholesale-electricity-price-forecast': {
    title: 'Summer Wholesale Power Price Forecast vs Retail Electricity Rates',
    subtitle:
      'Wholesale peak generation clearing prices vs residential retail customer tariff rates',
    badge: 'Wholesale vs Retail',
    badgeType: 'primary',
    items: [
      {
        label: 'ERCOT Texas Summer Extreme Scarcity Cap (Wholesale Ceiling)',
        displayValue: '$5,000 / MWh',
        value: 500.0,
        color: 'danger',
        subLabel:
          'Wholesale market cap triggered during severe grid reserve emergencies ($5.00/kWh)',
      },
      {
        label: 'PJM / NYISO On-Peak Wholesale Summer Average',
        displayValue: '$65.00 / MWh',
        value: 65.0,
        color: 'warning',
        subLabel: '6.5¢/kWh wholesale electricity generation commodity price',
      },
      {
        label: 'Average U.S. Residential Retail Customer Rate (All-In)',
        displayValue: '$184.40 / MWh',
        value: 184.4,
        color: 'primary',
        subLabel:
          '18.44¢/kWh retail rate includes generation, transmission, distribution, and taxes',
      },
    ],
    footerNote:
      'Retail Buffer: Regulated fixed retail tariffs protect residential consumers from volatile hourly wholesale electricity market price spikes.',
  },

  // 24. August 2026 Induction vs Electric Radiant vs Gas Cooktop Energy Cost Benchmark
  'august-2026-induction-vs-electric-vs-gas-cooktop-energy-cost-benchmark': {
    title: 'Cooktop Annual Operating Cost & Thermal Efficiency Benchmark',
    subtitle:
      'Annual energy expense for 1 hour of daily cooking at 18.44¢/kWh electricity and $1.44/therm natural gas',
    badge: 'Efficiency Matrix',
    badgeType: 'primary',
    items: [
      {
        label: 'Smooth Radiant Electric Range (74% efficiency · 588 kWh/yr)',
        displayValue: '$108.43/yr',
        value: 108.43,
        color: 'danger',
        subLabel: 'Intermittent surface conduction with 26% wasted thermal heat transfer',
      },
      {
        label: 'Induction Cooktop (85% efficiency · 511 kWh/yr)',
        displayValue: '$94.23/yr',
        value: 94.23,
        color: 'success',
        highlight: true,
        badge: 'Best Thermal Efficiency',
        subLabel: 'Direct electromagnetic pan heating saves 77 kWh/yr vs radiant electric',
      },
      {
        label: 'Standard Natural Gas Range (40% efficiency · 32.85 therms/yr)',
        displayValue: '$47.30/yr',
        value: 47.3,
        color: 'warning',
        subLabel: 'Low commodity fuel cost but 60% of combustion heat escapes into kitchen air',
      },
    ],
    footerNote:
      'Thermal Physics: Induction transfers 85% to 90% of energy directly into cookware, generating minimal ambient waste heat compared to 5,400 BTU/hr of waste heat from open gas flames.',
  },

  // 25. August 2026 Ductless Mini-Split Heat Pump Operating Cost Benchmark
  'august-2026-ductless-mini-split-heat-pump-operating-cost-benchmark': {
    title: 'Single-Zone (12,000 BTU) Monthly Heating & Cooling Cost Benchmark',
    subtitle:
      'Calculated for 8h cooling / 10h heating daily at May 2026 EIA national average electricity rate of 18.44¢/kWh',
    badge: '46%–51% Savings',
    badgeType: 'success',
    items: [
      {
        label: 'Electric Resistance Baseboard Heating (1.0 COP · 1,055 kWh/mo)',
        displayValue: '$194.56/mo',
        value: 194.56,
        color: 'danger',
        subLabel: '3,517W direct resistance heating with 0% thermodynamic multiplier',
      },
      {
        label: 'Standard Ducted Central Heat Pump (7.5 HSPF2 + 25% Duct Loss)',
        displayValue: '$118.02/mo',
        value: 118.02,
        color: 'warning',
        subLabel: '2,133W power draw · Attic air leakage and thermal conduction losses',
      },
      {
        label: 'Ductless Inverter Mini-Split Heating (10.5 HSPF2 · 343 kWh/mo)',
        displayValue: '$63.23/mo',
        value: 63.23,
        color: 'primary',
        subLabel: '1,143W power draw · Cold-climate variable speed compressor (3.08 COP)',
      },
      {
        label: 'Ductless Inverter Mini-Split Cooling (22 SEER2 · 131 kWh/mo)',
        displayValue: '$24.14/mo',
        value: 24.14,
        color: 'success',
        highlight: true,
        badge: 'Lowest Operating Cost',
        subLabel: '545W power draw · Direct room air delivery saves $25.38/mo vs central AC',
      },
    ],
    footerNote:
      'Thermodynamic Principle: Point-of-use inverter heat pumps eliminate 20% to 30% unconditioned attic duct losses while delivering 3+ units of heat per unit of electricity consumed.',
  },

  // 26. August 2026 Summer Thermostat Setting Cooling Cost Benchmark
  'august-2026-summer-thermostat-setting-cooling-cost-benchmark': {
    title: 'Summer Thermostat Setting Monthly AC Electricity Cost Benchmark',
    subtitle:
      'Calculated for a 3-ton (14.3 SEER2) central AC at May 2026 national average rate of 18.44¢/kWh',
    badge: '+$44.57/mo at 72°F',
    badgeType: 'primary',
    items: [
      {
        label: 'Setpoint 78°F (DOE / ENERGY STAR Recommended Baseline)',
        displayValue: '$83.53/mo',
        value: 83.53,
        color: 'success',
        highlight: true,
        badge: 'Lowest Bill',
        subLabel: '453.0 kWh/month · 6.0 hr/day runtime · Optimal balance of comfort & efficiency',
      },
      {
        label: 'Setpoint 75°F (Typical American Household Setpoint)',
        displayValue: '$101.64/mo',
        value: 101.64,
        color: 'primary',
        subLabel: '551.2 kWh/month · 7.3 hr/day runtime · +$18.11/mo (+21.7% increase vs 78°F)',
      },
      {
        label: 'Setpoint 72°F (Heavy Cooling Setting)',
        displayValue: '$128.10/mo',
        value: 128.1,
        color: 'warning',
        subLabel: '694.7 kWh/month · 9.2 hr/day runtime · +$44.57/mo (+53.4% increase vs 78°F)',
      },
      {
        label: 'Setpoint 70°F (Maximum Comfort / Over-Cooling Penalty)',
        displayValue: '$150.38/mo',
        value: 150.38,
        color: 'danger',
        subLabel: '815.5 kWh/month · 10.8 hr/day runtime · +$66.85/mo (+80.0% increase vs 78°F)',
      },
    ],
    footerNote:
      'Thermodynamic Law: Building heat gain is proportional to outdoor-indoor delta-T. Lowering thermostat setpoints increases cooling load by 3% to 5% per degree Fahrenheit.',
  },

  // 27. August 2026 EV Home Charging Efficiency Benchmark
  'august-2026-ev-home-charging-efficiency-losses-benchmark': {
    title: 'EV Home Charging Efficiency & Annual Grid Power Loss Benchmark',
    subtitle:
      'Calculated for 12,000 annual driving miles (3,600 kWh battery delivery) at May 2026 U.S. average 18.44¢/kWh',
    badge: '408 kWh/yr Saved',
    badgeType: 'success',
    items: [
      {
        label: 'Level 1 Standard (120V @ 12A / 1.44 kW · 82.5% Efficiency)',
        displayValue: '$804.65/yr',
        value: 804.65,
        color: 'danger',
        subLabel:
          '4,363.6 kWh grid draw · 763.6 kWh ($140.81/yr) wasted in 250W continuous auxiliary overhead',
      },
      {
        label: 'Level 2 Low-Power (240V @ 16A / 3.84 kW · 88.0% Efficiency)',
        displayValue: '$754.36/yr',
        value: 754.36,
        color: 'warning',
        subLabel:
          '4,090.9 kWh grid draw · 490.9 kWh ($90.52/yr) wasted in auxiliary and conversion losses',
      },
      {
        label: 'Level 2 Standard (240V @ 32A / 7.68 kW · 91.0% Efficiency)',
        displayValue: '$729.49/yr',
        value: 729.49,
        color: 'primary',
        subLabel:
          '3,956.0 kWh grid draw · 356.0 kWh ($65.65/yr) wasted · Fast 4.3h session minimizes BMS awake time',
      },
      {
        label: 'Level 2 High-Power (240V @ 48A / 11.52 kW · 92.0% Efficiency)',
        displayValue: '$721.56/yr',
        value: 721.56,
        color: 'success',
        highlight: true,
        badge: 'Highest Efficiency',
        subLabel:
          '3,913.0 kWh grid draw · 313.0 kWh ($57.72/yr) wasted · Saves $83.09/yr (450.6 kWh) vs Level 1',
      },
    ],
    footerNote:
      'Engineering Principle: Fixed auxiliary systems (BMS, telematics, coolant pumps) consume ~250W whenever the EV is awake. Fast 240V Level 2 charging minimizes total hours awake, cutting energy loss by more than half.',
  },

  // 28. August 2026 Window Air Conditioner Wattage & Hourly Operating Cost Benchmark
  'august-2026-window-air-conditioner-wattage-operating-cost-benchmark': {
    title: 'Window Air Conditioner Monthly Operating Cost Benchmark by BTU Capacity',
    subtitle:
      'Calculated for 8 hours/day operation (55% compressor duty cycle) at May 2026 U.S. average 18.44¢/kWh',
    badge: 'Room Cooling Economics',
    badgeType: 'primary',
    items: [
      {
        label: 'Heavy 15,000 BTU Living Area (770W effective / 184.8 kWh/mo)',
        displayValue: '$34.08/mo',
        value: 34.08,
        color: 'danger',
        subLabel: 'Cools 700–1,000 sq ft · 1,400W peak compressor draw (10.8 CEER)',
      },
      {
        label: 'Large 12,000 BTU Master Suite (578W effective / 138.6 kWh/mo)',
        displayValue: '$25.56/mo',
        value: 25.56,
        color: 'warning',
        subLabel: 'Cools 450–550 sq ft · 1,050W peak compressor draw (11.4 CEER)',
      },
      {
        label: 'Medium 8,000 BTU Bedroom Standard (385W effective / 92.4 kWh/mo)',
        displayValue: '$17.04/mo',
        value: 17.04,
        color: 'primary',
        subLabel: 'Cools 300–350 sq ft · 700W peak compressor draw (11.4 CEER)',
      },
      {
        label: 'Small 5,000 BTU Studio / Small Bedroom (248W effective / 59.4 kWh/mo)',
        displayValue: '$10.95/mo',
        value: 10.95,
        color: 'success',
        subLabel: 'Cools 100–250 sq ft · 450W peak compressor draw (11.0 CEER)',
      },
      {
        label: 'ENERGY STAR 8,000 BTU Inverter (275W effective / 66.0 kWh/mo)',
        displayValue: '$12.17/mo',
        value: 12.17,
        color: 'success',
        highlight: true,
        badge: 'Inverter Eco',
        subLabel: 'Cools 350 sq ft · Variable-speed inverter throttling (15.0 CEER) saves $4.87/mo',
      },
    ],
    footerNote:
      'Thermodynamic Zoning: Cooling only an occupied bedroom with an 8,000 BTU window unit overnight saves up to 50% compared to running whole-home central air conditioning.',
  },

  // 29. August 2026 Electric Water Heater Standby Heat Loss & Temperature Setpoint Benchmark
  'august-2026-electric-water-heater-standby-loss-temperature-setpoint-benchmark': {
    title: 'Electric Water Heater Annual Electricity Expense by Setpoint & Insulation',
    subtitle:
      'Calculated for a 50-gallon tank (60 gal/day hot water demand) at May 2026 EIA average of 18.44¢/kWh',
    badge: '19% Total Savings',
    badgeType: 'success',
    items: [
      {
        label: '140°F Factory Setting (Uninsulated Tank · 4,866 kWh/yr)',
        displayValue: '$897.19/yr',
        value: 897.19,
        color: 'danger',
        subLabel: '876 kWh/yr wasted in standby loss · Scald risk in 5 seconds',
      },
      {
        label: '140°F + R-10 Insulation Blanket (4,515 kWh/yr)',
        displayValue: '$832.57/yr',
        value: 832.57,
        color: 'warning',
        subLabel: '526 kWh/yr standby loss · Saves $64.62/yr via external thermal barrier',
      },
      {
        label: '120°F DOE Recommended Setting (Uninsulated Tank · 4,194 kWh/yr)',
        displayValue: '$773.35/yr',
        value: 773.35,
        color: 'primary',
        subLabel: '642 kWh/yr standby loss · Saves $123.84/yr with zero scald risk',
      },
      {
        label: '120°F + R-10 Blanket & Pipe Foam (3,938 kWh/yr)',
        displayValue: '$726.24/yr',
        value: 726.24,
        color: 'success',
        highlight: true,
        badge: 'Optimal Efficiency',
        subLabel: '387 kWh/yr standby loss · Saves $170.95/yr ($14.25/mo) vs factory baseline',
      },
    ],
    footerNote:
      'Thermodynamic Principle: Standby heat loss is proportional to delta-T (tank vs ambient temperature). Lowering setpoint from 140°F to 120°F reduces continuous heat transmission by 26.7% while eliminating tap scalding hazards.',
  },
};
