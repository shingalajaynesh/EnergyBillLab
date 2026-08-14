import type { VisualBarItem } from '@/components/technical-visual-card';

export interface GuideVisualConfig {
  badge?: string;
  badgeType?: 'primary' | 'success' | 'neutral';
  footerNote?: string;
  items: VisualBarItem[];
  subtitle?: string;
  title: string;
}

export const GUIDE_VISUAL_CONFIGS: Record<string, GuideVisualConfig> = {
  'why-is-my-electric-bill-so-high': {
    title: 'Where Electricity Goes in a Typical U.S. Home',
    subtitle: 'U.S. Energy Information Administration (EIA) residential end-use consumption breakdown',
    badge: 'End-Use Shares',
    badgeType: 'primary',
    items: [
      {
        label: 'Heating & Air Conditioning (HVAC)',
        displayValue: '46% of total electricity',
        value: 46,
        color: 'danger',
        subLabel: 'Largest single driver of summer heatwave and winter cold-snap bill spikes',
      },
      {
        label: 'Water Heating (Electric Water Heater)',
        displayValue: '18% of total electricity',
        value: 18,
        color: 'warning',
        subLabel: 'Continuous thermal standby loss + daily family shower recovery',
      },
      {
        label: 'Major Appliances (Refrigeration, Dryer, Washer)',
        displayValue: '14% of total electricity',
        value: 14,
        color: 'primary',
        subLabel: 'Electric clothes drying (5 kW) and constant 24/7 refrigeration baseload',
      },
      {
        label: 'Lighting & Electronics (TVs, PCs, Plug Loads)',
        displayValue: '12% of total electricity',
        value: 12,
        color: 'primary',
        subLabel: 'Vampire standby power, entertainment setups, and smart home devices',
      },
      {
        label: 'Other Miscellaneous Plug Loads',
        displayValue: '10% of total electricity',
        value: 10,
        color: 'neutral',
        subLabel: 'Small kitchen appliances, chargers, routers, and power adapters',
      },
    ],
    footerNote:
      'Diagnostic Takeaway: Over 64% of total household electricity is consumed by heating, cooling, and water heating alone.',
  },

  'how-much-electricity-do-household-appliances-use': {
    title: 'Major Home Appliance Monthly Electricity Consumption & Cost',
    subtitle: 'Typical monthly kWh usage and operating cost at national average 18.44¢/kWh',
    badge: 'Appliance Matrix',
    badgeType: 'primary',
    items: [
      {
        label: 'Central Air Conditioner (3-Ton, 8h/day summer)',
        displayValue: '$87.47 / mo',
        value: 87.47,
        color: 'danger',
        subLabel: '474 kWh/mo · High summer compressor and blower motor load',
      },
      {
        label: 'Electric Water Heater (50-Gal, 4-person family)',
        displayValue: '$53.78 / mo',
        value: 53.78,
        color: 'danger',
        subLabel: '292 kWh/mo · Continuous thermal recovery and standby loss',
      },
      {
        label: 'Electric Clothes Dryer (24 loads/month @ 3 kWh)',
        displayValue: '$13.28 / mo',
        value: 13.28,
        color: 'warning',
        subLabel: '72 kWh/mo · 5,000W heating element cycling',
      },
      {
        label: 'Standard Refrigerator (ENERGY STAR, 24/7 operation)',
        displayValue: '$6.15 / mo',
        value: 6.15,
        color: 'primary',
        subLabel: '33.3 kWh/mo · Efficient modern variable-speed compressor',
      },
      {
        label: 'LED Lighting & Electronics (Whole Home)',
        displayValue: '$9.22 / mo',
        value: 9.22,
        color: 'success',
        highlight: true,
        badge: 'Efficient',
        subLabel: '50 kWh/mo · Low-draw solid-state lighting throughout home',
      },
    ],
    footerNote:
      'Rule of Thumb: Appliances with heating elements and large compressors consume 80%+ of household appliance power.',
  },

  'how-much-does-it-cost-to-run-an-air-conditioner': {
    title: 'Air Conditioner Monthly Operating Cost Benchmarks',
    subtitle: 'Monthly electricity cost across common AC unit sizes and efficiency ratings at 16.5¢/kWh',
    badge: 'Cooling Breakdown',
    badgeType: 'primary',
    items: [
      {
        label: 'Central AC 3-Ton (36,000 BTU @ 3,272W, 9h/day, 60% cycle)',
        displayValue: '$87.47 / mo',
        value: 87.47,
        color: 'danger',
        subLabel: '530.1 kWh/month · Cools whole single-family home',
      },
      {
        label: 'Ductless Mini-Split (18,000 BTU @ 1,440W, 10h/day, 50% cycle)',
        displayValue: '$35.64 / mo',
        value: 35.64,
        color: 'primary',
        subLabel: '216.0 kWh/month · Inverter variable-speed multi-zone efficiency',
      },
      {
        label: 'Living Room Window AC (12,000 BTU @ 1,200W, 8h/day, 65% cycle)',
        displayValue: '$30.89 / mo',
        value: 30.89,
        color: 'warning',
        subLabel: '187.2 kWh/month · Medium living area cooling',
      },
      {
        label: 'Bedroom Window AC (6,000 BTU @ 545W, 8h/day, 60% cycle)',
        displayValue: '$12.95 / mo',
        value: 12.95,
        color: 'success',
        highlight: true,
        badge: 'Zone Cooling',
        subLabel: '78.5 kWh/month · Single bedroom overnight cooling',
      },
    ],
    footerNote:
      'Efficiency Tip: Upgrading from an older 10 SEER central AC to an ENERGY STAR 16+ SEER2 unit saves 35% to 45% on seasonal cooling bills.',
  },

  'how-much-does-it-cost-to-run-a-space-heater': {
    title: 'Space Heater Monthly Electricity Cost Benchmarks',
    subtitle: 'Estimated 30-day electric bill impact based on run time and wattage settings at 16.5¢/kWh',
    badge: 'High-Power Draw',
    badgeType: 'primary',
    items: [
      {
        label: 'Two 1,500W Heaters (8h/day, 75% thermostat cycle)',
        displayValue: '$89.10 / mo',
        value: 89.1,
        color: 'danger',
        subLabel: '540 kWh/month · Multi-room supplemental heating burden',
      },
      {
        label: 'Single 1,500W Heater (12h/day continuous high)',
        displayValue: '$89.10 / mo',
        value: 89.1,
        color: 'danger',
        subLabel: '540 kWh/month · Running continuously as primary heat source',
      },
      {
        label: 'Single 1,500W Heater (8h/day, 75% thermostat cycle)',
        displayValue: '$44.55 / mo',
        value: 44.55,
        color: 'warning',
        subLabel: '270 kWh/month · Standard overnight bedroom supplemental heat',
      },
      {
        label: 'Single 1,500W Heater (4h/day continuous high)',
        displayValue: '$29.70 / mo',
        value: 29.7,
        color: 'primary',
        subLabel: '180 kWh/month · Evening living room space heating',
      },
      {
        label: 'Single 750W Low Setting (4h/day continuous low)',
        displayValue: '$14.85 / mo',
        value: 14.85,
        color: 'success',
        highlight: true,
        badge: 'Eco Setting',
        subLabel: '90 kWh/month · Low-power localized desk heating',
      },
    ],
    footerNote:
      'Cost Reality: Running two 1,500W space heaters draws 3.0 kW—more continuous electrical power than a central heat pump warming an entire home.',
  },

  'how-much-does-it-cost-to-charge-an-ev-at-home': {
    title: 'EV Home Charging Session Cost (20% to 80% Charge)',
    subtitle: 'Grid electricity cost per charging session across vehicle classes at 16.5¢/kWh',
    badge: 'EV vs Gas Benchmark',
    badgeType: 'primary',
    items: [
      {
        label: 'Full-Size Truck (131 kWh Battery · 89.3 kWh Grid Draw)',
        displayValue: '$14.74 / charge',
        value: 14.74,
        color: 'warning',
        subLabel: '6.1¢ per mile · Adds ~180 miles of highway driving range',
      },
      {
        label: 'Long-Range SUV (75 kWh Battery · 51.1 kWh Grid Draw)',
        displayValue: '$8.44 / charge',
        value: 8.44,
        color: 'primary',
        subLabel: '4.7¢ per mile · Adds ~180-200 miles of driving range',
      },
      {
        label: 'Standard Sedan (60 kWh Battery · 40.9 kWh Grid Draw)',
        displayValue: '$6.75 / charge',
        value: 6.75,
        color: 'primary',
        subLabel: '4.5¢ per mile · Adds ~160-180 miles of commuter range',
      },
      {
        label: 'Compact EV (40 kWh Battery · 27.3 kWh Grid Draw)',
        displayValue: '$4.50 / charge',
        value: 4.5,
        color: 'success',
        highlight: true,
        badge: 'Lowest Cost',
        subLabel: '4.5¢ per mile · Adds ~100-120 miles of city driving range',
      },
    ],
    footerNote:
      'Fuel Cost Comparison: Driving an EV at 4.5¢–4.7¢ per mile is equivalent to paying $1.35 to $1.41 per gallon in a 30-MPG gasoline vehicle.',
  },

  'how-much-electricity-does-a-refrigerator-use': {
    title: 'Refrigerator Annual Operating Cost by Era & Style',
    subtitle: 'Estimated annual kWh draw and operating cost at 18.44¢/kWh',
    badge: 'Continuous Baseload',
    badgeType: 'primary',
    items: [
      {
        label: 'Vintage 1990s Refrigerator (1,200 kWh/yr)',
        displayValue: '$221.28 / yr',
        value: 221.28,
        color: 'danger',
        subLabel: 'Typical secondary unit left plugged into unconditioned garage',
      },
      {
        label: 'Standard Side-by-Side with Ice Maker (700 kWh/yr)',
        displayValue: '$129.08 / yr',
        value: 129.08,
        color: 'warning',
        subLabel: 'Dual evaporators and through-door ice dispenser heating loops',
      },
      {
        label: 'Modern French Door (580 kWh/yr)',
        displayValue: '$106.95 / yr',
        value: 106.95,
        color: 'primary',
        subLabel: 'Standard modern bottom-freezer kitchen refrigerator',
      },
      {
        label: 'ENERGY STAR Most Efficient Top-Freezer (340 kWh/yr)',
        displayValue: '$62.70 / yr',
        value: 62.7,
        color: 'success',
        highlight: true,
        badge: 'Lowest Draw',
        subLabel: 'Saves $158.58/yr compared to older garage refrigerators',
      },
    ],
    footerNote:
      'Baseload Fact: Refrigerators run 24 hours a day, 365 days a year, making efficiency upgrades a permanent baseline bill reducer.',
  },

  'how-much-does-it-cost-to-run-an-electric-clothes-dryer': {
    title: 'Clothes Dryer Operating Cost per Load and Year',
    subtitle: 'Calculated for 283 annual drying cycles at national average 18.44¢/kWh',
    badge: 'Drying Tech Comparison',
    badgeType: 'primary',
    items: [
      {
        label: 'Standard Vented Electric Dryer (3.0 kWh / load)',
        displayValue: '$0.55/load · $156/yr',
        value: 156.0,
        color: 'danger',
        subLabel: '5,000W heating coil expelling heated air outside',
      },
      {
        label: 'ENERGY STAR Sensor-Dry Electric (2.3 kWh / load)',
        displayValue: '$0.42/load · $120/yr',
        value: 120.0,
        color: 'warning',
        subLabel: 'Automatic moisture sensor terminates cycle when laundry is dry',
      },
      {
        label: 'Ventless Heat Pump Dryer (1.2 kWh / load)',
        displayValue: '$0.22/load · $62/yr',
        value: 62.0,
        color: 'success',
        highlight: true,
        badge: '60% Savings',
        subLabel: 'Refrigeration cycle recycles latent heat in closed loop',
      },
    ],
    footerNote:
      'Moisture Sensor Tip: Cleaning the moisture sensor bars inside the drum prevents over-drying and reduces cycle runtime.',
  },

  'how-much-does-it-cost-to-run-an-electric-water-heater': {
    title: 'Electric Water Heater Annual Cost: Resistance vs Hybrid Heat Pump',
    subtitle: 'Annual operating cost for a family of 4 (64 gallons hot water daily at 18.44¢/kWh)',
    badge: '72% Bill Cut',
    badgeType: 'success',
    items: [
      {
        label: 'Standard 50-Gal Electric Resistance (4,000 kWh/yr)',
        displayValue: '$737.60 / yr',
        value: 737.6,
        color: 'danger',
        subLabel: '4,500W dual resistance heating elements operating at UEF 0.92',
      },
      {
        label: 'High-Efficiency Electric Resistance (3,500 kWh/yr)',
        displayValue: '$645.40 / yr',
        value: 645.4,
        color: 'warning',
        subLabel: 'Extra tank foam insulation reducing thermal standby loss',
      },
      {
        label: 'ENERGY STAR Hybrid Heat Pump Water Heater (1,100 kWh/yr)',
        displayValue: '$202.84 / yr',
        value: 202.84,
        color: 'success',
        highlight: true,
        badge: 'Saves $534.76/yr',
        subLabel: 'UEF 3.75+ heat pump extracts ambient room heat to warm water',
      },
    ],
    footerNote:
      'Payback: A hybrid heat pump water heater typically pays for its purchase price difference within 2 to 3 years of operation.',
  },

  'how-much-does-it-cost-to-run-a-pool-pump': {
    title: 'Pool Pump Seasonal Operating Cost Comparison',
    subtitle: 'Estimated 20-week summer pool season electricity expense at 16.5¢/kWh',
    badge: '80% Savings Potential',
    badgeType: 'success',
    items: [
      {
        label: '1.5 HP Single-Speed (1,800W, 8h/day)',
        displayValue: '$332.64',
        value: 332.64,
        color: 'danger',
        subLabel: '14.4 kWh/day · High turbulent pipe friction & constant full RPM',
      },
      {
        label: '1.0 HP Single-Speed (1,200W, 8h/day)',
        displayValue: '$221.76',
        value: 221.76,
        color: 'warning',
        subLabel: '9.6 kWh/day · Standard baseline single-speed motor',
      },
      {
        label: 'Variable Speed @ Medium RPM (450W, 12h/day)',
        displayValue: '$124.74',
        value: 124.74,
        color: 'primary',
        subLabel: '5.4 kWh/day · 62.5% seasonal savings vs. 1.5 HP baseline',
      },
      {
        label: 'Variable Speed @ Low RPM (180W, 16h/day)',
        displayValue: '$66.53',
        value: 66.53,
        color: 'success',
        highlight: true,
        badge: 'Best Efficiency',
        subLabel: '2.88 kWh/day · 80.0% seasonal savings via Pump Affinity Law',
      },
    ],
    footerNote:
      'Physics Fact: Power varies with the cube of motor speed. Reducing pump RPM by 50% lowers motor shaft power demand by 87.5%.',
  },

  'how-much-does-it-cost-to-run-a-dehumidifier': {
    title: 'Dehumidifier Monthly Cost: Duty Cycle & Efficiency Impact',
    subtitle: '50-pint basement dehumidifier electricity cost across operating modes at 18.44¢/kWh',
    badge: 'Basement Humidity',
    badgeType: 'primary',
    items: [
      {
        label: 'Continuous 24/7 Run (550W @ 30% Relative Humidity setting)',
        displayValue: '$73.02 / mo',
        value: 73.02,
        color: 'danger',
        subLabel: '396 kWh/mo · Compressor never cycles off attempting impossible dryness',
      },
      {
        label: 'Standard 12h/day Cycling (550W @ 50% RH setting)',
        displayValue: '$36.51 / mo',
        value: 36.51,
        color: 'warning',
        subLabel: '198 kWh/mo · Proper mold-prevention setting with cycling',
      },
      {
        label: 'ENERGY STAR Most Efficient (420W @ 50% RH setting)',
        displayValue: '$27.88 / mo',
        value: 27.88,
        color: 'success',
        highlight: true,
        badge: '23.6% Savings',
        subLabel: '151.2 kWh/mo · High Integrated Energy Factor (IEF ≥ 1.90 L/kWh)',
      },
    ],
    footerNote:
      'Humidistat Tip: Setting target relative humidity to 50% instead of 30% prevents mold while cutting electricity cost in half.',
  },

  'how-to-calculate-electricity-cost-per-kwh-from-your-bill': {
    title: 'Electric Bill Breakdown: Generation vs Delivery vs Fixed Fees',
    subtitle: 'Components of an all-in effective electricity rate on a $184.40 statement (1,000 kWh)',
    badge: 'All-In Rate Anatomy',
    badgeType: 'primary',
    items: [
      {
        label: 'Electricity Generation / Supply Charge',
        displayValue: '9.50¢ / kWh (51.5%)',
        value: 9.5,
        color: 'primary',
        subLabel: 'Cost of fuel and power plants producing electricity',
      },
      {
        label: 'Transmission & Distribution Delivery Charge',
        displayValue: '6.50¢ / kWh (35.2%)',
        value: 6.5,
        color: 'warning',
        subLabel: 'Poles, wires, substations, and line maintenance',
      },
      {
        label: 'Riders, Environmental Mandates & Local Taxes',
        displayValue: '2.44¢ / kWh (13.3%)',
        value: 2.44,
        color: 'danger',
        subLabel: 'State regulatory surcharges, franchise fees, and local sales tax',
      },
    ],
    footerNote:
      'Formula: True All-In Rate (¢/kWh) = (Total Bill Amount in USD ÷ Total Billing kWh) × 100 = 18.44¢/kWh.',
  },

  'why-is-my-electric-bill-high-when-usage-is-low': {
    title: 'Why Low-Usage Bills Can Still Be Surprisingly High',
    subtitle: 'Cost drivers on a low-usage 250 kWh statement during mild shoulder months',
    badge: 'Bill Mechanics',
    badgeType: 'primary',
    items: [
      {
        label: 'Fixed Customer Connection Charge ($18.00 base fee)',
        displayValue: '7.20¢ / kWh effective share',
        value: 7.2,
        color: 'danger',
        subLabel: 'Fixed monthly fee is spread across few kWh, inflating per-kWh rate',
      },
      {
        label: 'Volumetric Delivery Charges (250 kWh @ 6.5¢)',
        displayValue: '6.50¢ / kWh',
        value: 6.5,
        color: 'warning',
        subLabel: 'Standard distribution fee for grid delivery',
      },
      {
        label: 'Energy Supply Commodity Charge (250 kWh @ 9.5¢)',
        displayValue: '9.50¢ / kWh',
        value: 9.5,
        color: 'primary',
        subLabel: 'Actual cost of electricity consumed ($23.75 total)',
      },
    ],
    footerNote:
      'Fixed Fee Impact: On low-usage months, fixed customer charges can make your effective rate appear 30%–50% higher.',
  },

  'electricity-supply-charge-vs-delivery-charge': {
    title: 'Supply Charge vs Delivery Charge Split on Electric Bills',
    subtitle: 'How utility monopolies split power generation from grid transmission',
    badge: 'Unbundled Tariffs',
    badgeType: 'primary',
    items: [
      {
        label: 'Electricity Supply (Competitive Generation Market)',
        displayValue: '55% of Total Bill',
        value: 55,
        color: 'primary',
        subLabel: 'Power plants generating electrons (eligible for choice in deregulated states)',
      },
      {
        label: 'Electricity Delivery (Regulated Utility Monopoly)',
        displayValue: '35% of Total Bill',
        value: 35,
        color: 'warning',
        subLabel: 'Transmission lines, neighborhood transformers, and meter infrastructure',
      },
      {
        label: 'Public Benefit Riders & Local Taxes',
        displayValue: '10% of Total Bill',
        value: 10,
        color: 'neutral',
        subLabel: 'Energy efficiency funds, low-income assistance, and state fees',
      },
    ],
    footerNote:
      'Deregulated Markets: You can switch your supplier for the 55% supply portion, but the delivery utility remains unchanged.',
  },

  'kw-vs-kwh-explained': {
    title: 'kW (Power Speed) vs kWh (Energy Volume) Explained',
    subtitle: 'How appliance wattage rate translates into billed energy consumption over time',
    badge: 'Core Physics',
    badgeType: 'primary',
    items: [
      {
        label: '1,500W Space Heater Running for 10 Hours',
        displayValue: '1.5 kW × 10h = 15.0 kWh',
        value: 15.0,
        color: 'danger',
        subLabel: 'Continuous high power draw equals significant energy volume ($2.77)',
      },
      {
        label: '3,000W Central AC Running for 2 Hours',
        displayValue: '3.0 kW × 2h = 6.0 kWh',
        value: 6.0,
        color: 'warning',
        subLabel: 'Higher power speed but shorter runtime equals moderate energy ($1.11)',
      },
      {
        label: '100W TV Running for 10 Hours',
        displayValue: '0.1 kW × 10h = 1.0 kWh',
        value: 1.0,
        color: 'success',
        highlight: true,
        badge: 'Low Energy',
        subLabel: 'Low power draw equals negligible billing impact ($0.18)',
      },
    ],
    footerNote:
      'Speed vs Odometer Analogy: kW is like speed (miles per hour); kWh is like total distance traveled (miles on odometer).',
  },

  'how-billing-cycle-length-affects-electricity-bills': {
    title: 'Billing Cycle Length Impact on Total Monthly Statements',
    subtitle: 'How calendar drift in utility meter read schedules alters total billed cost (30 kWh/day usage)',
    badge: 'Cycle Days Impact',
    badgeType: 'primary',
    items: [
      {
        label: '34-Day Extended Cycle (1,020 kWh consumed)',
        displayValue: '$188.09 / statement',
        value: 188.09,
        color: 'danger',
        subLabel: '6 extra billing days increases statement by +21.4% with zero change in daily habits',
      },
      {
        label: '30-Day Standard Cycle (900 kWh consumed)',
        displayValue: '$165.96 / statement',
        value: 165.96,
        color: 'warning',
        subLabel: 'Standard monthly baseline billing duration',
      },
      {
        label: '28-Day Short Cycle (840 kWh consumed)',
        displayValue: '$154.90 / statement',
        value: 154.9,
        color: 'success',
        highlight: true,
        badge: 'Fewer Days',
        subLabel: 'Shorter billing window creates appearance of lower electricity usage',
      },
    ],
    footerNote:
      'Normalized Metric: Always calculate kWh per day (Total kWh ÷ Billing Days) to compare true month-over-month energy use.',
  },

  'how-much-electricity-does-a-dishwasher-use': {
    title: 'Dishwasher Electricity Consumption: Wash Cycle vs Heated Dry',
    subtitle: 'Electrical breakdown per wash load at national average 18.44¢/kWh',
    badge: 'Cycle Breakdown',
    badgeType: 'primary',
    items: [
      {
        label: 'Pots & Pans Heavy Cycle + Heated Dry (2.0 kWh / load)',
        displayValue: '$0.37 / load · $79/yr',
        value: 79.0,
        color: 'danger',
        subLabel: 'Water heating to 140°F + 800W heating element baking dishes dry',
      },
      {
        label: 'Normal Wash Cycle + Heated Dry (1.3 kWh / load)',
        displayValue: '$0.24 / load · $51/yr',
        value: 51.0,
        color: 'warning',
        subLabel: 'Standard baseline dishwasher cycle (215 loads/year)',
      },
      {
        label: 'ENERGY STAR Normal Wash + Air Dry (0.85 kWh / load)',
        displayValue: '$0.16 / load · $34/yr',
        value: 34.0,
        color: 'success',
        highlight: true,
        badge: '52% Savings',
        subLabel: 'Condensation natural air dry cuts electricity consumption in half',
      },
    ],
    footerNote:
      'Heated Dry Tip: Opening the dishwasher door slightly after washing provides spotless natural air drying with zero heater draw.',
  },

  'how-much-electricity-does-a-washing-machine-use': {
    title: 'Washing Machine Energy: Water Temperature Comparison',
    subtitle: 'Total electricity used per wash load (including water heater draw at 18.44¢/kWh)',
    badge: 'Cold Water ROI',
    badgeType: 'success',
    items: [
      {
        label: 'Hot Water Wash / Warm Rinse (4.5 kWh total / load)',
        displayValue: '$0.83 / load · $249/yr',
        value: 249.0,
        color: 'danger',
        subLabel: '90% of electricity is used by the water heater to heat 25 gallons of water',
      },
      {
        label: 'Warm Water Wash / Cold Rinse (2.0 kWh total / load)',
        displayValue: '$0.37 / load · $111/yr',
        value: 111.0,
        color: 'warning',
        subLabel: 'Standard mixed temperature cycle across 300 annual loads',
      },
      {
        label: 'Cold Water Wash (0.35 kWh total / load)',
        displayValue: '$0.06 / load · $19/yr',
        value: 19.0,
        color: 'success',
        highlight: true,
        badge: '92% Savings',
        subLabel: 'Motor-only electric draw saves $230/year with modern cold detergents',
      },
    ],
    footerNote:
      'Detergent Science: Modern laundry enzymes are formulated specifically for cold water, making hot water washing unnecessary for most loads.',
  },

  'how-much-does-it-cost-to-run-an-electric-oven': {
    title: 'Electric Cooking Operating Cost: Oven vs Range vs Microwave',
    subtitle: 'Electricity cost to cook a standard 1-hour family meal at 18.44¢/kWh',
    badge: 'Cooking Efficiency',
    badgeType: 'primary',
    items: [
      {
        label: 'Electric Oven Preheating & Baking @ 375°F (3,000W for 1 hour)',
        displayValue: '$0.46 / meal · $13.80/mo',
        value: 13.8,
        color: 'danger',
        subLabel: '2.5 kWh/use · Heating large 5.0 cu.ft. insulated steel cavity',
      },
      {
        label: 'Electric Range Stovetop Burner (1,500W for 45 min)',
        displayValue: '$0.21 / meal · $6.30/mo',
        value: 6.3,
        color: 'warning',
        subLabel: '1.13 kWh/use · Direct pan contact cooking on stovetop',
      },
      {
        label: 'Air Fryer / Convection Countertop Oven (1,500W for 25 min)',
        displayValue: '$0.12 / meal · $3.60/mo',
        value: 3.6,
        color: 'primary',
        subLabel: '0.63 kWh/use · Compact chamber with rapid convection air circulation',
      },
      {
        label: 'Microwave Oven (1,200W for 10 min)',
        displayValue: '$0.04 / meal · $1.20/mo',
        value: 1.2,
        color: 'success',
        highlight: true,
        badge: 'Lowest Cooking Draw',
        subLabel: '0.20 kWh/use · Directly excites water molecules in food',
      },
    ],
    footerNote:
      'Kitchen Tip: Countertop air fryers and toaster ovens use 70% less electricity than heating a full-size kitchen oven for small meals.',
  },

  'how-much-electricity-does-a-ceiling-fan-use': {
    title: 'Ceiling Fan vs Air Conditioner Cooling Cost Comparison',
    subtitle: 'Operating cost per hour and month to achieve perceived comfort at 18.44¢/kWh',
    badge: 'Wind Chill Effect',
    badgeType: 'success',
    items: [
      {
        label: 'Central Air Conditioner (3,500 Watts continuous)',
        displayValue: '$0.65 / hour ($156/mo)',
        value: 156.0,
        color: 'danger',
        subLabel: 'Compressor extracts thermal heat energy from indoor air',
      },
      {
        label: 'Window Air Conditioner (1,200 Watts)',
        displayValue: '$0.22 / hour ($53/mo)',
        value: 53.0,
        color: 'warning',
        subLabel: 'Single room cooling compressor unit',
      },
      {
        label: 'Standard AC-Motor Ceiling Fan (75 Watts on High)',
        displayValue: '$0.014 / hour ($3.32/mo)',
        value: 3.32,
        color: 'primary',
        subLabel: 'Moves air to create 4°F evaporative skin cooling sensation',
      },
      {
        label: 'Modern DC-Motor Ceiling Fan (25 Watts on High)',
        displayValue: '$0.005 / hour ($1.11/mo)',
        value: 1.11,
        color: 'success',
        highlight: true,
        badge: '98% Less Power',
        subLabel: 'Brushless DC motor draws 65% less power than standard fan motors',
      },
    ],
    footerNote:
      'Thermostat Trick: Running a ceiling fan lets you raise your AC thermostat by 4°F with zero loss in comfort, saving 12% on AC cooling bills.',
  },

  'how-much-electricity-does-a-gaming-pc-use': {
    title: 'Gaming PC vs Standard Laptop Electricity Draw & Cost',
    subtitle: 'Estimated power draw during active 4-hour daily gaming sessions at 18.44¢/kWh',
    badge: 'Hardware Power',
    badgeType: 'primary',
    items: [
      {
        label: 'High-End RTX 4090 Gaming Rig (650W active load + monitor)',
        displayValue: '$14.38 / mo ($172/yr)',
        value: 14.38,
        color: 'danger',
        subLabel: '2.6 kWh/day · High-power GPU and overclocked multi-core CPU',
      },
      {
        label: 'Mid-Range Gaming Desktop (350W active load)',
        displayValue: '$7.74 / mo ($93/yr)',
        value: 7.74,
        color: 'warning',
        subLabel: '1.4 kWh/day · 1080p/1440p gaming configuration',
      },
      {
        label: 'Gaming Laptop (180W peak charging & load)',
        displayValue: '$3.98 / mo ($48/yr)',
        value: 3.98,
        color: 'primary',
        subLabel: '0.72 kWh/day · Mobile power-constrained components',
      },
      {
        label: 'Standard Office Laptop / M-Series MacBook (30W average)',
        displayValue: '$0.66 / mo ($8/yr)',
        value: 0.66,
        color: 'success',
        highlight: true,
        badge: 'Ultra-Efficient',
        subLabel: '0.12 kWh/day · ARM architecture power efficiency',
      },
    ],
    footerNote:
      'Heat Output: A 650W gaming PC exhausts 2,200 BTU of heat per hour into your room, increasing bedroom air conditioning demand.',
  },

  'how-much-electricity-does-a-microwave-use': {
    title: 'Microwave Energy Consumption by Daily Cooking Usage',
    subtitle: 'Monthly electricity cost for a 1,200W microwave at 18.44¢/kWh',
    badge: 'Quick Heating',
    badgeType: 'success',
    items: [
      {
        label: 'Heavy Daily Use (30 minutes total daily runtime)',
        displayValue: '$3.32 / mo ($40/yr)',
        value: 3.32,
        color: 'primary',
        subLabel: '18 kWh/mo · Multiple family meal reheats and defrost cycles',
      },
      {
        label: 'Moderate Daily Use (15 minutes total daily runtime)',
        displayValue: '$1.66 / mo ($20/yr)',
        value: 1.66,
        color: 'success',
        subLabel: '9 kWh/mo · Typical household lunch and dinner reheating',
      },
      {
        label: 'Microwave Digital Clock Standby Draw (3 Watts always on)',
        displayValue: '$0.40 / mo ($4.85/yr)',
        value: 0.4,
        color: 'neutral',
        subLabel: '2.16 kWh/mo · Continuous clock display and keypad controller standby',
      },
    ],
    footerNote:
      'Efficiency Winner: Microwaves cook 4x faster than ovens while consuming 75% less electricity per meal.',
  },

  'how-much-electricity-does-an-air-fryer-use': {
    title: 'Air Fryer vs Traditional Kitchen Oven Electricity Comparison',
    subtitle: 'Cost comparison across 30 days of cooking dinner (18.44¢/kWh)',
    badge: 'Convection Savings',
    badgeType: 'success',
    items: [
      {
        label: 'Traditional Electric Oven (1 hour daily @ 3,000W)',
        displayValue: '$16.60 / mo ($199/yr)',
        value: 16.6,
        color: 'danger',
        subLabel: '90 kWh/mo · Must heat full 5 cu.ft. steel oven cavity and surrounding air',
      },
      {
        label: 'Large Countertop Air Fryer (25 min daily @ 1,700W)',
        displayValue: '$3.92 / mo ($47/yr)',
        value: 3.92,
        color: 'success',
        highlight: true,
        badge: '76% Savings',
        subLabel: '21.25 kWh/mo · Compact 6-quart basket heats in seconds',
      },
      {
        label: 'Compact Air Fryer (20 min daily @ 1,200W)',
        displayValue: '$2.21 / mo ($27/yr)',
        value: 2.21,
        color: 'success',
        subLabel: '12 kWh/mo · Small 3-quart basket for 1-2 person meals',
      },
    ],
    footerNote:
      'Savings Impact: Using an air fryer instead of your oven for daily dinners saves over $150/year in electricity and keeps the kitchen cooler.',
  },

  'how-much-electricity-does-a-television-use': {
    title: 'Television Annual Electricity Cost by Display Technology & Size',
    subtitle: 'Annual operating cost based on 5 hours daily viewing at 18.44¢/kWh',
    badge: 'Display Technology',
    badgeType: 'primary',
    items: [
      {
        label: 'Older 65" Plasma Television (350 Watts)',
        displayValue: '$117.78 / yr',
        value: 117.78,
        color: 'danger',
        subLabel: '638.8 kWh/yr · High heat emission and individual gas cell discharge',
      },
      {
        label: 'Modern 75" 4K OLED Television (180 Watts)',
        displayValue: '$60.57 / yr',
        value: 60.57,
        color: 'warning',
        subLabel: '328.5 kWh/yr · Self-lit organic pixels with deep blacks',
      },
      {
        label: 'Modern 55" 4K QLED / Mini-LED (100 Watts)',
        displayValue: '$33.65 / yr',
        value: 33.65,
        color: 'primary',
        subLabel: '182.5 kWh/yr · Efficient LED backlight array',
      },
      {
        label: 'Standard 43" 1080p LED TV (45 Watts)',
        displayValue: '$15.14 / yr',
        value: 15.14,
        color: 'success',
        highlight: true,
        badge: 'Lowest Draw',
        subLabel: '82.1 kWh/yr · Low power edge-lit LED display',
      },
    ],
    footerNote:
      'Settings Tip: Disabling "Quick Start" standby mode reduces television phantom power draw from 15 Watts down to less than 0.5 Watts.',
  },

  'how-much-electricity-does-a-wifi-router-use': {
    title: 'Wi-Fi Router 24/7 Annual Operating Cost & Power Draw',
    subtitle: 'Annual continuous baseload electricity cost at 18.44¢/kWh',
    badge: 'Always-On Device',
    badgeType: 'primary',
    items: [
      {
        label: 'Multi-Node Wi-Fi 7 Mesh System (3 units @ 35W total)',
        displayValue: '$56.54 / yr',
        value: 56.54,
        color: 'warning',
        subLabel: '306.6 kWh/yr · 3 router pods broadcasting on multiple wireless bands',
      },
      {
        label: 'High-Performance Wi-Fi 6 Gaming Router (15 Watts)',
        displayValue: '$24.23 / yr',
        value: 24.23,
        color: 'primary',
        subLabel: '131.4 kWh/yr · Tri-band processing and active signal amplification',
      },
      {
        label: 'Standard ISP Gateway Modem/Router Combo (10 Watts)',
        displayValue: '$16.15 / yr',
        value: 16.15,
        color: 'primary',
        subLabel: '87.6 kWh/yr · Standard residential cable/fiber modem router',
      },
      {
        label: 'Compact Basic Wi-Fi Router (5 Watts)',
        displayValue: '$8.08 / yr',
        value: 8.08,
        color: 'success',
        highlight: true,
        badge: 'Low Baseload',
        subLabel: '43.8 kWh/yr · Dual-band basic wireless access point',
      },
    ],
    footerNote:
      'Continuous Load: Because Wi-Fi routers run 8,760 hours per year without interruption, every 10 Watts of draw costs ~$16.15/year.',
  },

  'how-much-electricity-does-a-laptop-use': {
    title: 'Laptop Annual Electricity Cost: Work vs Desktop PC',
    subtitle: 'Calculated for 8 hours daily work use at 18.44¢/kWh',
    badge: 'Workstation Comparison',
    badgeType: 'success',
    items: [
      {
        label: 'Desktop Workstation + Dual Monitors (250W average draw)',
        displayValue: '$134.61 / yr ($11.22/mo)',
        value: 134.61,
        color: 'danger',
        subLabel: '730 kWh/yr · Power supply losses, cooling fans, and external monitors',
      },
      {
        label: 'High-Performance Mobile Workstation Laptop (80W under load)',
        displayValue: '$43.08 / yr ($3.59/mo)',
        value: 43.08,
        color: 'warning',
        subLabel: '233.6 kWh/yr · Dedicated mobile GPU rendering and compiling',
      },
      {
        label: 'Standard Windows Productivity Laptop (35W average)',
        displayValue: '$18.85 / yr ($1.57/mo)',
        value: 18.85,
        color: 'primary',
        subLabel: '102.2 kWh/yr · General web browsing, spreadsheets, and video calls',
      },
      {
        label: 'Apple Silicon MacBook Air / Pro (15W average)',
        displayValue: '$8.08 / yr ($0.67/mo)',
        value: 8.08,
        color: 'success',
        highlight: true,
        badge: '94% Savings vs PC',
        subLabel: '43.8 kWh/yr · Ultra-efficient ARM unified memory architecture',
      },
    ],
    footerNote:
      'Telecommuting Fact: Working from an efficient laptop rather than a desktop tower saves over $120/year in direct electricity expenses.',
  },

  'how-much-electricity-does-an-electric-kettle-use': {
    title: 'Electric Kettle vs Stovetop Water Boiling Efficiency',
    subtitle: 'Cost and time to boil 1 Liter of water at 18.44¢/kWh',
    badge: 'Thermal Directness',
    badgeType: 'success',
    items: [
      {
        label: 'Gas Stovetop Burner (40% thermal efficiency · 8 minutes)',
        displayValue: '$0.035 / boil · 800 BTU',
        value: 3.5,
        color: 'danger',
        subLabel: '60% of heat escapes around the kettle into kitchen ambient air',
      },
      {
        label: 'Electric Coil Stovetop (70% efficiency · 6 minutes)',
        displayValue: '$0.028 / boil · 0.15 kWh',
        value: 2.8,
        color: 'warning',
        subLabel: 'Must heat metal burner element and kettle bottom first',
      },
      {
        label: 'Electric Kettle Submerged Element (85% efficiency · 3.5 min)',
        displayValue: '$0.021 / boil · 0.11 kWh',
        value: 2.1,
        color: 'primary',
        subLabel: 'Heating coil is immersed directly in the water inside insulated jug',
      },
      {
        label: 'Induction Cooktop (90% magnetic efficiency · 2.5 min)',
        displayValue: '$0.018 / boil · 0.10 kWh',
        value: 1.8,
        color: 'success',
        highlight: true,
        badge: 'Fastest & Greenest',
        subLabel: 'Magnetic eddy currents heat the pot base directly with zero stray heat',
      },
    ],
    footerNote:
      'Boiling Tip: Only boil the exact amount of water you need; boiling a full kettle for a single cup doubles energy consumption.',
  },

  'how-much-electricity-does-an-induction-cooktop-use': {
    title: 'Induction Cooktop vs Electric Radiant vs Gas Efficiency',
    subtitle: 'Thermal transfer efficiency and energy lost to ambient kitchen air',
    badge: '90% Efficiency',
    badgeType: 'success',
    items: [
      {
        label: 'Natural Gas Burner (40% transferred to pot · 60% lost)',
        displayValue: '40% Efficient (60% heat wasted)',
        value: 40,
        color: 'danger',
        subLabel: 'Exhausts combustion gases and intense ambient heat into the home',
      },
      {
        label: 'Electric Radiant Glass Cooktop (74% transferred to pot)',
        displayValue: '74% Efficient (26% heat wasted)',
        value: 74,
        color: 'warning',
        subLabel: 'Heat must conduct through ceramic glass top into pan bottom',
      },
      {
        label: 'Magnetic Induction Cooktop (90% transferred to pot)',
        displayValue: '90% Efficient (10% heat wasted)',
        value: 90,
        color: 'success',
        highlight: true,
        badge: 'Top Cooking Tech',
        subLabel: 'Electromagnetic field induces heat directly in ferrous cookware',
      },
    ],
    footerNote:
      'AC Synergy: Induction cooking emits negligible ambient waste heat, significantly lowering summer kitchen air conditioning load.',
  },

  'how-much-electricity-does-a-window-air-conditioner-use': {
    title: 'Window AC Monthly Cost by Room Size & Sizing (BTU)',
    subtitle: 'Estimated monthly cost based on 8 hours daily run at 65% duty cycle (18.44¢/kWh)',
    badge: 'Room Sizing Guide',
    badgeType: 'primary',
    items: [
      {
        label: 'Large Living Area (18,000 BTU @ 1,500W · 550+ sq ft)',
        displayValue: '$43.15 / mo',
        value: 43.15,
        color: 'danger',
        subLabel: '234 kWh/mo · Heavy-duty 240V window unit',
      },
      {
        label: 'Medium Living Room (12,000 BTU @ 1,050W · 350-450 sq ft)',
        displayValue: '$30.20 / mo',
        value: 30.2,
        color: 'warning',
        subLabel: '163.8 kWh/mo · Standard living room 120V air conditioner',
      },
      {
        label: 'Medium Bedroom (8,000 BTU @ 670W · 250-350 sq ft)',
        displayValue: '$19.27 / mo',
        value: 19.27,
        color: 'primary',
        subLabel: '104.5 kWh/mo · Master bedroom window cooling',
      },
      {
        label: 'Small Bedroom (5,000 BTU @ 450W · 100-150 sq ft)',
        displayValue: '$12.94 / mo',
        value: 12.94,
        color: 'success',
        highlight: true,
        badge: 'Compact Cooling',
        subLabel: '70.2 kWh/mo · Low-power quiet overnight bedroom cooling',
      },
    ],
    footerNote:
      'Inverter Window ACs: Upgrading to an inverter variable-speed window AC cuts electricity draw by an additional 35% and maintains whisper-quiet operation.',
  },

  'what-is-vampire-power-and-how-much-does-it-cost': {
    title: 'Phantom Vampire Power Draw by Common Household Devices',
    subtitle: 'Continuous standby electricity draw and annual cost when devices are "turned off"',
    badge: 'Hidden Drain',
    badgeType: 'primary',
    items: [
      {
        label: 'Cable/Satellite DVR Set-Top Box (25W continuous standby)',
        displayValue: '$40.38 / yr',
        value: 40.38,
        color: 'danger',
        subLabel: '219 kWh/yr · Constantly downloading program guides and maintaining tuner state',
      },
      {
        label: 'Gaming Console on "Instant On" Standby (15W standby)',
        displayValue: '$24.23 / yr',
        value: 24.23,
        color: 'warning',
        subLabel: '131.4 kWh/yr · Background updates and remote wake listening mode',
      },
      {
        label: 'Smart Speaker / Display (4W continuous listening)',
        displayValue: '$6.46 / yr',
        value: 6.46,
        color: 'primary',
        subLabel: '35 kWh/yr · Constant microphone array and Wi-Fi connection',
      },
      {
        label: 'Laptop / Phone Charger plugged in without device (0.5W)',
        displayValue: '$0.81 / yr',
        value: 0.81,
        color: 'success',
        highlight: true,
        badge: 'Negligible',
        subLabel: '4.38 kWh/yr · Modern switched-mode power supplies draw negligible idle power',
      },
    ],
    footerNote:
      'Smart Strip Solution: Using smart power strips that cut power to peripheral devices when your TV or computer sleeps eliminates ~$100/yr in phantom load.',
  },

  'heat-pump-vs-electric-resistance-heating-cost': {
    title: 'Heating Efficiency: Heat Pump vs Electric Resistance vs Gas',
    subtitle: 'Coefficient of Performance (COP) and cost to generate 1,000,000 BTU (MMBtu) of heat',
    badge: 'COP Multiplier',
    badgeType: 'success',
    items: [
      {
        label: 'Electric Resistance Baseboards / Space Heaters (COP = 1.0)',
        displayValue: '$54.04 / MMBtu',
        value: 54.04,
        color: 'danger',
        subLabel: '100% efficient · 1 kWh of electricity generates 3,412 BTU of heat',
      },
      {
        label: 'Standard 80% AFUE Gas Furnace ($16.14/Mcf gas rate)',
        displayValue: '$19.45 / MMBtu',
        value: 19.45,
        color: 'warning',
        subLabel: 'Standard residential gas furnace heating cost',
      },
      {
        label: 'Standard Air-Source Heat Pump (COP = 3.0 @ 47°F outdoor)',
        displayValue: '$18.01 / MMBtu',
        value: 18.01,
        color: 'primary',
        subLabel: '300% efficient · Moves 3 units of ambient outdoor heat per unit of power',
      },
      {
        label: 'Cold-Climate Inverter Heat Pump (COP = 3.8+)',
        displayValue: '$14.22 / MMBtu',
        value: 14.22,
        color: 'success',
        highlight: true,
        badge: '73.7% Savings vs Resistance',
        subLabel: 'Delivers high efficiency even when outdoor temperatures drop below 20°F',
      },
    ],
    footerNote:
      'Physics Breakdown: Heat pumps do not create heat through electrical resistance; they use refrigerant compression to move existing outdoor heat indoors.',
  },

  'how-much-electricity-does-central-air-conditioning-use': {
    title: 'Central Air Conditioner Electricity Draw by System Tonnage',
    subtitle: 'Hourly and monthly electricity consumption at standard 14.3 SEER2 rating (18.44¢/kWh)',
    badge: 'Cooling Capacity',
    badgeType: 'primary',
    items: [
      {
        label: '5-Ton Central AC System (60,000 BTU @ 4,195W draw)',
        displayValue: '$185.00 / mo',
        value: 185.0,
        color: 'danger',
        subLabel: '1,006 kWh/mo · Large 3,000+ sq.ft. home cooling load',
      },
      {
        label: '4-Ton Central AC System (48,000 BTU @ 3,356W draw)',
        displayValue: '$148.00 / mo',
        value: 148.0,
        color: 'warning',
        subLabel: '805 kWh/mo · Standard 2,400 sq.ft. two-story home',
      },
      {
        label: '3-Ton Central AC System (36,000 BTU @ 2,517W draw)',
        displayValue: '$111.00 / mo',
        value: 111.0,
        color: 'primary',
        subLabel: '604 kWh/mo · Standard 1,800 sq.ft. single-family home',
      },
      {
        label: '2-Ton Central AC System (24,000 BTU @ 1,678W draw)',
        displayValue: '$74.00 / mo',
        value: 74.0,
        color: 'success',
        highlight: true,
        badge: 'Compact Home',
        subLabel: '402 kWh/mo · Efficient small 1,200 sq.ft. home or townhome',
      },
    ],
    footerNote:
      'Airflow Importance: Dirty air filters increase blower fan electrical load by 15% and starve the evaporator coil of air, reducing cooling capacity.',
  },

  'how-much-electricity-does-a-portable-air-conditioner-use': {
    title: 'Portable AC vs Window AC Energy Efficiency Comparison',
    subtitle: 'Electricity cost for 8 hours daily cooling in a 250 sq ft room (18.44¢/kWh)',
    badge: 'Single vs Dual Hose',
    badgeType: 'primary',
    items: [
      {
        label: 'Single-Hose Portable AC (10,000 BTU @ 1,200W · CEER 6.5)',
        displayValue: '$42.49 / mo ($170/season)',
        value: 42.49,
        color: 'danger',
        subLabel: 'Creates negative air pressure pulling hot outdoor air into the room through cracks',
      },
      {
        label: 'Dual-Hose Inverter Portable AC (10,000 BTU @ 850W · CEER 9.0)',
        displayValue: '$30.10 / mo ($120/season)',
        value: 30.1,
        color: 'warning',
        subLabel: 'Dedicated intake hose prevents negative room pressure infiltration',
      },
      {
        label: 'Standard Window AC (8,000 BTU @ 670W · CEER 12.0)',
        displayValue: '$23.72 / mo ($95/season)',
        value: 23.72,
        color: 'success',
        highlight: true,
        badge: '44% Less Electricity',
        subLabel: 'Compressor and heat exhaust remain outside the window envelope',
      },
    ],
    footerNote:
      'Physics Disadvantage: Single-hose portable ACs blow conditioned room air outside to cool the condenser, pulling hot outdoor air back into the house.',
  },

  'how-much-electricity-does-a-ductless-mini-split-use': {
    title: 'Ductless Mini-Split vs Central AC Seasonal Efficiency',
    subtitle: 'Seasonal cooling and heating operating cost comparison (18.44¢/kWh)',
    badge: 'Zoned Inverter Tech',
    badgeType: 'success',
    items: [
      {
        label: 'Ducted Central AC System with Duct Losses (14.3 SEER2)',
        displayValue: '$557.00 / season',
        value: 557.0,
        color: 'danger',
        subLabel: '20% to 30% of cooling energy is lost through duct thermal leakage in hot attics',
      },
      {
        label: 'Standard Ductless Mini-Split (20 SEER2 Rating)',
        displayValue: '$398.00 / season',
        value: 398.0,
        color: 'primary',
        subLabel: 'Zero ductwork losses + variable-speed inverter compressor matching exact load',
      },
      {
        label: 'Ultra-High Efficiency Multi-Zone Mini-Split (28+ SEER2)',
        displayValue: '$284.00 / season',
        value: 284.0,
        color: 'success',
        highlight: true,
        badge: '49% Savings vs Central',
        subLabel: 'Individual room thermostat control cools only occupied living spaces',
      },
    ],
    footerNote:
      'Duct Loss Truth: According to DOE estimates, conditioned air ducts running through unconditioned attics lose 25%–40% of their heating and cooling energy.',
  },

  'how-much-electricity-does-a-heat-pump-use': {
    title: 'Heat Pump Electricity Consumption: Cooling vs Heating Mode',
    subtitle: 'Estimated monthly kWh consumption across seasons for a 3-ton heat pump (18.44¢/kWh)',
    badge: 'Year-Round HVAC',
    badgeType: 'primary',
    items: [
      {
        label: 'Winter Heating Mode with Auxiliary Heat Strips (COP = 1.8)',
        displayValue: '$221.28 / mo (1,200 kWh)',
        value: 221.28,
        color: 'danger',
        subLabel: '10 kW emergency resistance heat strips cycling during sub-freezing weather',
      },
      {
        label: 'Summer Cooling Mode (16 SEER2 · 700 kWh/mo)',
        displayValue: '$129.08 / mo',
        value: 129.08,
        color: 'warning',
        subLabel: 'Standard whole-home summer mechanical air conditioning load',
      },
      {
        label: 'Spring/Fall Mild Heating Mode (COP = 3.5 · 400 kWh/mo)',
        displayValue: '$73.76 / mo',
        value: 73.76,
        color: 'success',
        highlight: true,
        badge: 'Peak COP Efficiency',
        subLabel: 'Extracts 3.5x more heat from mild outdoor air than electricity consumed',
      },
    ],
    footerNote:
      'Auxiliary Heat Alert: If your thermostat displays "AUX HEAT" frequently during mild 40°F weather, your heat pump compressor requires servicing.',
  },

  'how-much-electricity-does-an-electric-furnace-use': {
    title: 'Electric Furnace vs Heat Pump Heating Electricity Demand',
    subtitle: 'Hourly power draw and monthly winter electricity bill impact (18.44¢/kWh)',
    badge: 'Immense Heating Draw',
    badgeType: 'primary',
    items: [
      {
        label: '20 kW Electric Furnace (Full capacity active in cold climate)',
        displayValue: '$3.69 / hour ($553/mo)',
        value: 553.0,
        color: 'danger',
        subLabel: '20,000 Watts continuous draw · 3,000 kWh/month severe winter bill shock',
      },
      {
        label: '15 kW Electric Furnace (Moderate home heating demand)',
        displayValue: '$2.77 / hour ($415/mo)',
        value: 415.0,
        color: 'danger',
        subLabel: '15,000 Watts continuous draw · 2,250 kWh/month',
      },
      {
        label: 'Inverter Heat Pump System (3.5 kW electrical draw warming same home)',
        displayValue: '$0.65 / hour ($145/mo)',
        value: 145.0,
        color: 'success',
        highlight: true,
        badge: '73.8% Bill Reduction',
        subLabel: 'Thermodynamic refrigeration cycle delivers equivalent 20 kW thermal heating',
      },
    ],
    footerNote:
      'Electrical Load Fact: A 20 kW electric furnace draws 83 Amps at 240V—often requiring a dedicated 100-Amp circuit breaker in your electrical panel.',
  },

  'how-much-electricity-does-electric-baseboard-heating-use': {
    title: 'Electric Baseboard Heating Cost by Room Size & Wattage',
    subtitle: 'Monthly electricity cost per room at 8 hours daily runtime (18.44¢/kWh)',
    badge: 'Resistance Heating',
    badgeType: 'primary',
    items: [
      {
        label: 'Large Living Area (2,500W 8-ft baseboard heater)',
        displayValue: '$110.64 / mo',
        value: 110.64,
        color: 'danger',
        subLabel: '600 kWh/mo per individual room heating circuit',
      },
      {
        label: 'Master Bedroom (1,500W 5-ft baseboard heater)',
        displayValue: '$66.38 / mo',
        value: 66.38,
        color: 'warning',
        subLabel: '360 kWh/mo · Standard bedroom heating load',
      },
      {
        label: 'Small Bedroom / Office (1,000W 4-ft baseboard heater)',
        displayValue: '$44.26 / mo',
        value: 44.26,
        color: 'primary',
        subLabel: '240 kWh/mo · Supplemental room heating',
      },
      {
        label: 'Bathroom (500W 2-ft baseboard heater)',
        displayValue: '$22.13 / mo',
        value: 22.13,
        color: 'success',
        highlight: true,
        badge: 'Small Zone',
        subLabel: '120 kWh/mo · Low-power morning heating',
      },
    ],
    footerNote:
      'Whole-Home Cost: Heating an entire 4-bedroom home exclusively with electric baseboards commonly results in $500–$800 monthly winter electric bills.',
  },

  'how-much-can-a-smart-thermostat-save': {
    title: 'Smart Thermostat Energy Savings Breakdown',
    subtitle: 'Annual household heating and cooling bill reductions verified by EPA and Energy Star',
    badge: '8%–12% Annual Cut',
    badgeType: 'success',
    items: [
      {
        label: 'Unmanaged Manual Thermostat (Constant 70°F heating / 72°F cooling)',
        displayValue: '$1,250 / yr HVAC baseline',
        value: 1250.0,
        color: 'danger',
        subLabel: 'Heats and cools empty home during work hours and overnight sleep',
      },
      {
        label: 'Basic Programmable Thermostat with Fixed Schedules',
        displayValue: '$1,160 / yr ($90 saved)',
        value: 1160.0,
        color: 'warning',
        subLabel: '7.2% savings · Requires manual programming and schedule adherence',
      },
      {
        label: 'ENERGY STAR Smart Thermostat (Geofencing + Learning)',
        displayValue: '$1,110 / yr ($140 saved)',
        value: 1110.0,
        color: 'success',
        highlight: true,
        badge: '11.2% Savings',
        subLabel: 'Automatically setbacks temperature when occupants leave; pre-cools before peak TOU',
      },
    ],
    footerNote:
      'Utility Rebates: Most electric and gas utilities offer instant $50 to $100 rebates on ENERGY STAR smart thermostats, making payback nearly immediate.',
  },

  'should-you-turn-off-the-air-conditioner-when-away': {
    title: 'AC Setback Strategy: Turn Off vs 78°F Setback vs Constant 72°F',
    subtitle: 'Daily electricity consumption during an 8-hour workday in 92°F summer weather',
    badge: 'Thermodynamic Proof',
    badgeType: 'success',
    items: [
      {
        label: 'Leaving AC Running Constant @ 72°F All Day',
        displayValue: '28.5 kWh / day ($5.25)',
        value: 28.5,
        color: 'danger',
        subLabel: 'Continuous compressor cycling against highest indoor-outdoor temperature difference',
      },
      {
        label: 'Smart Setback: Raising Thermostat to 78°F While Away',
        displayValue: '21.5 kWh / day ($3.96)',
        value: 21.5,
        color: 'success',
        highlight: true,
        badge: '24.5% Savings',
        subLabel: 'Reduces heat transfer through walls during hottest hours; quick recovery in evening',
      },
      {
        label: 'Turning AC Completely Off (Indoor Temp Reaches 86°F)',
        displayValue: '20.2 kWh / day ($3.72)',
        value: 20.2,
        color: 'warning',
        subLabel: 'Slightly lower energy, but high indoor humidity can cause wall condensation and long recovery',
      },
    ],
    footerNote:
      'Thermodynamic Fact: Heat flows faster when temperature difference is higher. Keeping a house at 72°F all day pulls significantly more heat inside than letting it drift to 78°F.',
  },

  'how-air-leaks-increase-your-energy-bill': {
    title: 'Top Air Infiltration Sources & Heating/Cooling Bill Impact',
    subtitle: 'Where conditioned air escapes in a typical unsealed single-family home',
    badge: 'Draft Leakage',
    badgeType: 'primary',
    items: [
      {
        label: 'Air Ducts in Unconditioned Attics / Crawlspaces',
        displayValue: '35% of total air leakage',
        value: 35,
        color: 'danger',
        subLabel: 'Disconnects and duct seam leaks blow conditioned air directly into attic',
      },
      {
        label: 'Attic Hatch & Ceiling Penetrations (Recessed Lights, Wiring)',
        displayValue: '25% of total air leakage',
        value: 25,
        color: 'danger',
        subLabel: 'Stack effect pushes warm heated air up into cold attic',
      },
      {
        label: 'Floors, Foundation Sill Plates & Wall Baseboards',
        displayValue: '20% of total air leakage',
        value: 20,
        color: 'warning',
        subLabel: 'Cold outdoor air is sucked in along crawlspace and basement perimeter',
      },
      {
        label: 'Windows and Exterior Doors',
        displayValue: '15% of total air leakage',
        value: 15,
        color: 'primary',
        subLabel: 'Worn weatherstripping and door sweeps allow draft infiltration',
      },
      {
        label: 'Plumbing and Electrical Wire Wall Penetrations',
        displayValue: '5% of total air leakage',
        value: 5,
        color: 'neutral',
        subLabel: 'Unsealed pipe penetrations under kitchen and bathroom sinks',
      },
    ],
    footerNote:
      'Air Sealing ROI: Professional air sealing and caulking costs under $500 in materials and cuts heating/cooling bills by 15% immediately.',
  },

  'how-attic-insulation-affects-your-energy-bill': {
    title: 'Attic Insulation R-Value vs Annual HVAC Energy Cost',
    subtitle: 'Annual heating and cooling cost for a 2,000 sq ft home across insulation levels (18.44¢/kWh)',
    badge: 'Thermal Barrier',
    badgeType: 'success',
    items: [
      {
        label: 'Poor / Degraded Attic Insulation (R-11 · 3.5 inches fiberglass)',
        displayValue: '$1,650 / yr HVAC expense',
        value: 1650.0,
        color: 'danger',
        subLabel: 'Severe conductive heat transfer through attic ceiling drywall',
      },
      {
        label: 'Moderate Older Insulation (R-30 · 9 inches cellulose)',
        displayValue: '$1,320 / yr ($330 saved)',
        value: 1320.0,
        color: 'warning',
        subLabel: 'Standard 1990s building code baseline',
      },
      {
        label: 'DOE Recommended Attic Insulation (R-49 to R-60 · 16-18 inches)',
        displayValue: '$1,070 / yr ($580 saved)',
        value: 1070.0,
        color: 'success',
        highlight: true,
        badge: '35% Bill Reduction',
        subLabel: 'Stops 95%+ of ceiling conductive heat gain and loss year-round',
      },
    ],
    footerNote:
      'Tax Credits: Upgrading attic insulation qualifies for the 30% Federal Section 25C Energy Efficient Home Improvement Credit (up to $1,200).',
  },

  'how-to-read-an-electric-bill-line-by-line': {
    title: 'Electric Bill Line-Item Dollar Distribution ($184.40 Statement)',
    subtitle: 'Line-by-line breakdown of a typical 1,000 kWh monthly utility bill',
    badge: 'Statement Anatomy',
    badgeType: 'primary',
    items: [
      {
        label: 'Generation / Supply Energy Charge (1,000 kWh @ 9.50¢)',
        displayValue: '$95.00 (51.5%)',
        value: 95.0,
        color: 'primary',
        subLabel: 'Actual cost of electricity commodity produced by power plants',
      },
      {
        label: 'Distribution & Grid Delivery Tariff (1,000 kWh @ 5.00¢)',
        displayValue: '$50.00 (27.1%)',
        value: 50.0,
        color: 'warning',
        subLabel: 'Maintaining local neighborhood utility poles, wires, and transformers',
      },
      {
        label: 'Transmission Reliability Charge (1,000 kWh @ 1.50¢)',
        displayValue: '$15.00 (8.1%)',
        value: 15.0,
        color: 'neutral',
        subLabel: 'High-voltage cross-state transmission lines and grid operators',
      },
      {
        label: 'Fixed Monthly Basic Service Fee',
        displayValue: '$15.00 (8.1%)',
        value: 15.0,
        color: 'danger',
        subLabel: 'Customer accounting, metering, and billing administrative fee',
      },
      {
        label: 'State Mandates, Clean Energy Surcharges & Sales Tax',
        displayValue: '$9.40 (5.1%)',
        value: 9.4,
        color: 'neutral',
        subLabel: 'Public benefit riders, energy efficiency funds, and municipal sales taxes',
      },
    ],
    footerNote:
      'Audit Tip: Checking your bill line-by-line lets you spot erroneous estimated meter reads, expiring introductory supply rates, and rate tier changes.',
  },

  'what-is-a-time-of-use-electricity-rate': {
    title: 'Time-of-Use (TOU) Rate Spread: On-Peak vs Super-Off-Peak',
    subtitle: 'Cost per kilowatt-hour across daily time periods under typical TOU tariffs',
    badge: '3.75x Rate Difference',
    badgeType: 'primary',
    items: [
      {
        label: 'On-Peak Summer Window (4 PM – 9 PM Weekdays)',
        displayValue: '45.00¢ / kWh',
        value: 45.0,
        color: 'danger',
        subLabel: 'Grid stress hours when expensive peaker power plants fire up',
      },
      {
        label: 'Mid-Peak Shoulder Hours (9 AM – 4 PM & 9 PM – Midnight)',
        displayValue: '22.00¢ / kWh',
        value: 22.0,
        color: 'warning',
        subLabel: 'Normal daytime commercial and residential load hours',
      },
      {
        label: 'Flat Standard Tiered Rate (Comparison Baseline)',
        displayValue: '18.44¢ / kWh',
        value: 18.44,
        color: 'primary',
        subLabel: 'Non-varying standard utility rate all hours of day',
      },
      {
        label: 'Super-Off-Peak Overnight (Midnight – 6 AM)',
        displayValue: '12.00¢ / kWh',
        value: 12.0,
        color: 'success',
        highlight: true,
        badge: 'Lowest Rate',
        subLabel: 'Low grid demand hours with excess wind, hydro, and baseload power',
      },
    ],
    footerNote:
      'Load Shifting Strategy: Running EV charging, dryers, and dishwashers overnight captures the 12¢ rate while avoiding 45¢ peak hours.',
  },

  'peak-vs-off-peak-electricity-hours-explained': {
    title: 'Peak vs Off-Peak Appliance Operating Cost Comparison',
    subtitle: 'Cost to run household appliances during Peak (45¢/kWh) vs Off-Peak (12¢/kWh) hours',
    badge: 'Shift & Save',
    badgeType: 'success',
    items: [
      {
        label: 'EV Full Charge Session (50 kWh battery top-up)',
        displayValue: '$22.50 On-Peak vs $6.00 Off-Peak',
        value: 22.5,
        color: 'danger',
        subLabel: 'Saves $16.50 per charge session by setting car timer for 1 AM',
      },
      {
        label: 'Electric Clothes Dryer (3.0 kWh load)',
        displayValue: '$1.35 On-Peak vs $0.36 Off-Peak',
        value: 1.35,
        color: 'warning',
        subLabel: 'Saves $0.99 per laundry load by drying in morning or late night',
      },
      {
        label: 'Dishwasher Heated Wash Cycle (1.5 kWh load)',
        displayValue: '$0.68 On-Peak vs $0.18 Off-Peak',
        value: 0.68,
        color: 'primary',
        subLabel: 'Saves $0.50 per load using delayed-start button',
      },
      {
        label: 'Pool Pump Daily Filtration Run (15 kWh/day)',
        displayValue: '$6.75 On-Peak vs $1.80 Off-Peak',
        value: 6.75,
        color: 'success',
        highlight: true,
        badge: '$148/mo Saved',
        subLabel: 'Running filtration pump from 11 PM to 7 AM cuts pool electricity bill by 73%',
      },
    ],
    footerNote:
      'Automation Tip: Modern appliances have delay-start timers that make load shifting completely automated and effortless.',
  },

  'fixed-vs-variable-electricity-rates': {
    title: 'Fixed Rate vs Variable Rate Electricity Contracts Compared',
    subtitle: 'Price risk vs stability over 12-month seasonal utility billing periods',
    badge: 'Contract Risk',
    badgeType: 'primary',
    items: [
      {
        label: 'Variable Rate During Extreme Heatwave / Winter Storm',
        displayValue: 'Up to 35.00¢–50.00¢ / kWh',
        value: 50.0,
        color: 'danger',
        subLabel: 'Uncapped exposure to wholesale spot market price surges',
      },
      {
        label: 'Variable Rate During Mild Spring / Fall Shoulder Months',
        displayValue: '14.50¢ / kWh',
        value: 14.5,
        color: 'warning',
        subLabel: 'Low wholesale commodity price months',
      },
      {
        label: 'Fixed 12-Month Contract Rate',
        displayValue: '17.50¢ / kWh (Guaranteed)',
        value: 17.5,
        color: 'success',
        highlight: true,
        badge: 'Predictable Budget',
        subLabel: 'Guaranteed rate shields households from extreme summer and winter rate spikes',
      },
    ],
    footerNote:
      'Fine Print Alert: Variable contracts often start with an attractive low teaser rate that automatically escalates after 30–90 days.',
  },

  'what-is-a-demand-charge-on-an-electric-bill': {
    title: 'Demand Charge ($/kW Peak) vs Energy Charge ($/kWh Volume)',
    subtitle: 'How instantaneous power spikes vs total consumption determine utility bills',
    badge: 'Peak Demand kW',
    badgeType: 'primary',
    items: [
      {
        label: 'Simultaneous Spike: AC + EV + Dryer + Stove (18 kW 15-min Peak)',
        displayValue: '$270.00 Demand Charge ($15/kW)',
        value: 270.0,
        color: 'danger',
        subLabel: 'Running heavy appliances simultaneously sets a massive peak kW penalty',
      },
      {
        label: 'Staggered Usage: Same Energy Used Separately (6 kW Peak)',
        displayValue: '$90.00 Demand Charge ($15/kW)',
        value: 90.0,
        color: 'success',
        highlight: true,
        badge: '$180/mo Saved',
        subLabel: 'Staggering appliance runtimes uses the exact same kWh but cuts demand charge by 66%',
      },
      {
        label: 'Standard Volumetric Energy Charge (1,000 kWh @ 12¢/kWh)',
        displayValue: '$120.00 Energy Charge',
        value: 120.0,
        color: 'primary',
        subLabel: 'Standard volumetric charge for total electricity consumed',
      },
    ],
    footerNote:
      'Demand Charge Rule: Demand charges measure the highest 15-minute average power draw (kW) recorded during the entire billing month.',
  },

  'estimated-vs-actual-meter-reading': {
    title: 'Estimated vs Actual Meter Reading: Catch-Up Charge Mechanics',
    subtitle: 'How 2 months of under-estimated utility meter reads trigger a massive 3rd month catch-up bill',
    badge: 'Billing Discrepancy',
    badgeType: 'primary',
    items: [
      {
        label: 'Month 3: Actual Read Catch-Up Statement (1,600 kWh billed)',
        displayValue: '$295.04 (Catch-Up Spike)',
        value: 295.04,
        color: 'danger',
        subLabel: 'Billed for true usage + 600 kWh accumulated under-billing from Months 1 & 2',
      },
      {
        label: 'Month 2: Estimated Statement (700 kWh estimated vs 1,000 actual)',
        displayValue: '$129.08 (Under-Billed)',
        value: 129.08,
        color: 'warning',
        subLabel: 'Utility algorithm underestimated winter space heater heating load',
      },
      {
        label: 'Month 1: Estimated Statement (700 kWh estimated vs 1,000 actual)',
        displayValue: '$129.08 (Under-Billed)',
        value: 129.08,
        color: 'warning',
        subLabel: 'Utility estimated usage based on mild previous year weather',
      },
      {
        label: 'True Consistent Monthly Usage (1,000 kWh actual each month)',
        displayValue: '$184.40 / month True Cost',
        value: 184.4,
        color: 'success',
        highlight: true,
        badge: 'Actual Average',
        subLabel: 'True steady consumption without artificial billing fluctuations',
      },
    ],
    footerNote:
      'Statement Check: Look for the letter "E" or word "ESTIMATED" next to the meter reading on your electric bill.',
  },

  'how-budget-billing-works': {
    title: 'Budget Billing (Equal Pay) vs Actual Variable Billing',
    subtitle: 'How utility 12-month rolling average payment plans smooth seasonal bill spikes',
    badge: 'Bill Leveling',
    badgeType: 'primary',
    items: [
      {
        label: 'August Heatwave on Actual Billing (1,500 kWh used)',
        displayValue: '$276.60 (Summer Spike)',
        value: 276.6,
        color: 'danger',
        subLabel: 'High air conditioning load creates severe cash flow shock on actual billing',
      },
      {
        label: 'Budget Billing Levelized Monthly Payment (All 12 Months)',
        displayValue: '$165.78 / month (Fixed Pay)',
        value: 165.78,
        color: 'success',
        highlight: true,
        badge: 'Predictable',
        subLabel: 'Rolling 12-month average distributes summer cooling and winter heating costs evenly',
      },
      {
        label: 'April Mild Spring on Actual Billing (550 kWh used)',
        displayValue: '$101.42 (Shoulder Low)',
        value: 101.42,
        color: 'primary',
        subLabel: 'Low natural spring consumption builds credit reserve for summer',
      },
    ],
    footerNote:
      'Annual Settlement: Budget billing does not reduce your total energy cost; utilities conduct an annual true-up adjustment for differences.',
  },

  'why-electricity-rates-change': {
    title: 'Primary Drivers of Residential Utility Electricity Rate Changes',
    subtitle: 'Factors driving year-over-year electricity price inflation according to EIA data',
    badge: 'Rate Drivers',
    badgeType: 'primary',
    items: [
      {
        label: 'Grid Infrastructure Modernization & Wildfire Hardening',
        displayValue: '40% of Rate Growth',
        value: 40,
        color: 'danger',
        subLabel: 'Replacing aging transmission lines, smart metering, and buried power lines',
      },
      {
        label: 'Natural Gas & Generation Fuel Market Volatility',
        displayValue: '30% of Rate Growth',
        value: 30,
        color: 'warning',
        subLabel: 'Natural gas power plant fuel commodity price swings passed via fuel riders',
      },
      {
        label: 'Clean Energy Transition & Renewable Mandates',
        displayValue: '18% of Rate Growth',
        value: 18,
        color: 'primary',
        subLabel: 'Capital investment in utility-scale solar, wind, and battery storage projects',
      },
      {
        label: 'Extreme Weather & Grid Reliability Reserve Margins',
        displayValue: '12% of Rate Growth',
        value: 12,
        color: 'neutral',
        subLabel: 'Capacity payments and grid winterization standards',
      },
    ],
    footerNote:
      'Regulatory Process: Investor-owned utilities must file formal General Rate Cases (GRC) with state Public Utility Commissions to raise base rates.',
  },

  'fuel-adjustment-charges-and-utility-riders-explained': {
    title: 'Fuel Adjustment Clause (FAC) Rider Fluctuations on Bills',
    subtitle: 'How monthly fuel surcharges alter customer bills above base tariff rates',
    badge: 'Pass-Through Riders',
    badgeType: 'primary',
    items: [
      {
        label: 'High Gas Price Spike Month (+4.5¢/kWh fuel adjustment surcharge)',
        displayValue: '$229.40 / mo (22.94¢ effective)',
        value: 229.4,
        color: 'danger',
        subLabel: 'Utility passes through elevated natural gas generation costs dollar-for-dollar',
      },
      {
        label: 'Normal Benchmark Month (+1.5¢/kWh fuel adjustment rider)',
        displayValue: '$184.40 / mo (18.44¢ effective)',
        value: 184.4,
        color: 'primary',
        subLabel: 'Standard fuel surcharge baseline on 1,000 kWh consumption',
      },
      {
        label: 'Base Electric Tariff (Excluding All Surcharges & Riders)',
        displayValue: '$150.00 / mo (15.00¢ base rate)',
        value: 150.0,
        color: 'success',
        highlight: true,
        badge: 'Base Rate',
        subLabel: 'Approved fixed base rate for grid operation and capital return',
      },
    ],
    footerNote:
      'No Utility Profit: Utilities are legally prohibited from marking up fuel adjustment riders for profit; they are strict pass-through costs.',
  },

  'how-net-metering-affects-your-electric-bill': {
    title: 'Solar Net Metering: NEM 1.0/2.0 vs NEM 3.0 Net Billing Bill Impact',
    subtitle: 'Monthly electric bill for a 6 kW solar system producing 800 kWh on 1,000 kWh home load',
    badge: 'Solar Policy',
    badgeType: 'primary',
    items: [
      {
        label: 'Grid-Only Household (No Solar · 1,000 kWh grid import)',
        displayValue: '$184.40 / mo',
        value: 184.4,
        color: 'danger',
        subLabel: 'Full retail electricity purchase from utility grid',
      },
      {
        label: 'NEM 3.0 Net Billing Standalone Solar (Wholesale export credit)',
        displayValue: '$88.50 / mo ($95.90 saved)',
        value: 88.5,
        color: 'warning',
        subLabel: 'Exports credited at wholesale avoided cost (~6.8¢/kWh) plus grid interconnection fee',
      },
      {
        label: 'NEM 3.0 Net Billing + 10 kWh Battery Storage',
        displayValue: '$36.88 / mo ($147.52 saved)',
        value: 36.88,
        color: 'primary',
        subLabel: 'Stores daytime solar generation to avoid expensive evening grid electricity',
      },
      {
        label: 'Legacy NEM 1.0 / 2.0 (1:1 Full Retail Net Metering Credit)',
        displayValue: '$36.88 / mo ($147.52 saved)',
        value: 36.88,
        color: 'success',
        highlight: true,
        badge: 'Full 1:1 Credit',
        subLabel: 'Every 1 kWh exported earns full 18.44¢ retail credit offsetting consumption',
      },
    ],
    footerNote:
      'NEM 3.0 Rule: Under Net Billing, pairing home battery storage increases financial solar savings by 65% compared to solar-only installations.',
  },
};
