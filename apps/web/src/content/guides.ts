import type { PublicRouteHref } from '@/lib/routes';

export type GuideSource = {
  organization: string;
  title: string;
  url: string;
  topic: string;
};

export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export type GuideDefinition = {
  slug: string;
  href: PublicRouteHref;
  title: string;
  h1Title: string;
  breadcrumbLabel: string;
  description: string;
  eyebrow: string;
  updatedAt: string;
  category: string;
  primaryCalculatorHref: PublicRouteHref;
  primaryCalculatorLabel: string;
  primaryCalculatorDescription: string;
  actionLabel: string;
  summaryTakeaways: string[];
  sections: GuideSection[];
  sources: GuideSource[];
  relatedRoutes: PublicRouteHref[];
  sitemapEligible: boolean;
  adEligible: boolean;
};

export const energyGuides: Record<string, GuideDefinition> = {
  'why-is-my-electric-bill-so-high': {
    slug: 'why-is-my-electric-bill-so-high',
    href: '/guides/why-is-my-electric-bill-so-high',
    title: 'Why Is My Electric Bill So High? Diagnostic Checklist & Causes',
    h1Title: 'Why Is My Electric Bill So High? 10 Causes & Diagnostic Checklist',
    breadcrumbLabel: 'Why Is My Bill High?',
    description:
      'Diagnose sudden electric bill increases by separating kilowatt-hour usage spikes, rate adjustments, billing cycle days, seasonal HVAC loads, and utility charges.',
    eyebrow: 'Electric Bill Diagnostic Guide',
    updatedAt: '2026-07-23',
    category: 'Bill Analysis',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Normalize billing cycle days, isolate per-kWh rate changes, and calculate exact usage differences with our Bill Analyzer.',
    actionLabel: 'Analyze my electricity bill',
    summaryTakeaways: [
      'Dissect bill spikes into three core variables: billing period length (days), total kWh consumption, and effective all-in cost per kWh.',
      'Seasonal heating (space heaters, heat pumps) and cooling (air conditioning) account for over 50% of typical home electricity consumption according to U.S. EIA estimates.',
      'Utility billing cycles vary between 28 and 35 days; a 3-day longer billing cycle adds ~10% to your total bill without any change in daily habits.',
      'Check whether your meter reading says "Estimated" (E) instead of "Actual" (A), which can trigger sudden catch-up adjustments on subsequent statements.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Electricity Explained: Factors Affecting Electricity Prices',
        topic: 'Generation fuel costs, transmission delivery riders, and seasonal pricing',
        url: 'https://www.eia.gov/energyexplained/electricity/prices-and-factors-affecting-prices.php',
      },
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Understanding Household Energy Use & Billing Adjustments',
        topic: 'Seasonal HVAC loads, thermal envelope losses, and standby power draw',
        url: 'https://www.energy.gov/energysaver/understanding-your-electricity-bill',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Where Does My Money Go? Typical Household Energy Split',
        topic: 'Percentage breakdowns for heating, cooling, water heating, and appliances',
        url: 'https://www.energystar.gov/products/where_does_my_money_go',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/tools/appliance-energy-cost-calculator',
      '/tools/ac-cost-calculator',
      '/tools/space-heater-cost-calculator',
      '/electricity-rates',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-do-household-appliances-use': {
    slug: 'how-much-electricity-do-household-appliances-use',
    href: '/guides/how-much-electricity-do-household-appliances-use',
    title: 'How Much Electricity Do Household Appliances Use? Wattage & Cost Guide',
    h1Title: 'How Much Electricity Do Household Appliances Use?',
    breadcrumbLabel: 'Appliance Electricity Use',
    description:
      'Learn how appliance wattage, daily runtime, and compressor duty cycles determine kilowatt-hour (kWh) consumption and monthly electricity costs.',
    eyebrow: 'Appliance Consumption Benchmark',
    updatedAt: '2026-07-23',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Enter any appliance wattage, daily usage hours, and your electricity rate to calculate hourly, daily, monthly, and annual operating costs.',
    actionLabel: 'Estimate appliance electricity cost',
    summaryTakeaways: [
      'Kilowatt-hours (kWh) are calculated by multiplying input Watts by daily runtime hours and duty cycle percentage, then dividing by 1,000.',
      'Two appliances with the exact same 1,500W rating can have wildly different monthly costs: a space heater running 8 hours continuously uses 360 kWh/month, while a toaster running 3 minutes daily uses only 2.25 kWh/month.',
      'Cycling appliances (refrigerators, AC units, heat pumps) do not draw full rated wattage constantly; their effective power draw depends on compressor duty cycle.',
      'Standby power ("phantom load") from always-on electronics typically accounts for 5% to 10% of residential electricity consumption.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Estimating Appliance and Home Electronic Energy Use',
        topic: 'Appliance wattage ranges, measurement methods, and operating formulas',
        url: 'https://www.energy.gov/energysaver/estimating-appliance-and-home-electronic-energy-use',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Appliance Energy Consumption Benchmarks & Standards',
        topic: 'Annual kWh baselines for certified refrigerators, washers, and dryers',
        url: 'https://www.energystar.gov/products/appliances',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Residential Energy Consumption Survey (RECS)',
        topic: 'End-use energy intensity data for U.S. residential appliances',
        url: 'https://www.eia.gov/consumption/residential/',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/tools/ac-cost-calculator',
      '/tools/space-heater-cost-calculator',
      '/electricity-bill-analyzer',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-does-it-cost-to-run-an-air-conditioner': {
    slug: 'how-much-does-it-cost-to-run-an-air-conditioner',
    href: '/guides/how-much-does-it-cost-to-run-an-air-conditioner',
    title: 'How Much Does It Cost to Run an Air Conditioner? AC Power & Billing Guide',
    h1Title: 'How Much Does It Cost to Run an Air Conditioner?',
    breadcrumbLabel: 'Air Conditioner Cost',
    description:
      'Calculate air conditioner electricity cost (kWh) using cooling capacity (BTU/hr), EER/SEER efficiency, compressor duty cycle, and local utility rates.',
    eyebrow: 'Cooling Cost Guide',
    updatedAt: '2026-07-23',
    category: 'HVAC Cooling',
    primaryCalculatorHref: '/tools/ac-cost-calculator',
    primaryCalculatorLabel: 'Air Conditioner Cost Calculator',
    primaryCalculatorDescription:
      'Estimate monthly electricity charges for window ACs, portable units, mini-splits, and central air conditioning systems.',
    actionLabel: 'Calculate air-conditioner cost',
    summaryTakeaways: [
      'Electrical input watts are calculated by dividing cooling capacity (BTU/hr) by the Energy Efficiency Ratio (EER): Input Watts = BTU/hr ÷ EER.',
      'Central air conditioning systems (24,000 to 60,000 BTU/hr) draw 2,000W to 5,000W of electricity when active, making cooling the largest summer electricity expense.',
      'Compressor duty cycle varies based on outdoor temperature, thermostat setpoint, and building insulation; a compressor running at 70% duty cycle uses ~40% more electricity than one at 50% duty cycle.',
      'Setting your thermostat 2°F to 3°F higher during summer peak heat can reduce AC compressor runtime and lower cooling energy costs by 7% to 10%.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Central Air Conditioners & Room AC Efficiency Standards',
        topic: 'BTU capacity sizing, EER/SEER2 ratings, and energy calculation formulas',
        url: 'https://www.energy.gov/energysaver/central-air-conditioning',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Room Air Conditioner Sizing & Energy Savings Guide',
        topic: 'Cooling square footage baselines and efficiency certifications',
        url: 'https://www.energystar.gov/products/heating_cooling/air_conditioning_room',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Household Space Cooling Energy Consumption Data',
        topic: 'Regional summer electricity consumption benchmarks',
        url: 'https://www.eia.gov/todayinenergy/detail.php?id=53038',
      },
    ],
    relatedRoutes: [
      '/tools/ac-cost-calculator',
      '/guides/why-is-my-electric-bill-so-high',
      '/electricity-rates/california',
      '/electricity-rates/texas',
      '/electricity-rates/florida',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-does-it-cost-to-run-a-space-heater': {
    slug: 'how-much-does-it-cost-to-run-a-space-heater',
    href: '/guides/how-much-does-it-cost-to-run-a-space-heater',
    title: 'How Much Does It Cost to Run a Space Heater? Hourly & Monthly Breakdown',
    h1Title: 'How Much Does It Cost to Run a Space Heater?',
    breadcrumbLabel: 'Space Heater Cost',
    description:
      'Compare 750W vs 1,500W electric space heater operating costs, hourly kWh rates, thermostat duty cycles, and spot heating efficiency.',
    eyebrow: 'Heating Cost Guide',
    updatedAt: '2026-07-23',
    category: 'HVAC Heating',
    primaryCalculatorHref: '/tools/space-heater-cost-calculator',
    primaryCalculatorLabel: 'Space Heater Cost Calculator',
    primaryCalculatorDescription:
      'Determine hourly, daily, 30-day, and seasonal heating costs for ceramic, oil-filled, infrared, and fan-forced electric heaters.',
    actionLabel: 'Calculate space-heater cost',
    summaryTakeaways: [
      'All portable electric-resistance heaters (ceramic, oil-filled, infrared, fan-forced) convert 100% of electrical energy into heat energy: a 1,500W heater draws 1.5 kW of power when active.',
      'Running one 1,500W space heater continuously for 8 hours a day consumes 12 kWh daily (360 kWh per month), which can add $45 to $100+ to your monthly bill depending on local electricity rates.',
      'Thermostat-controlled space heaters cycle on and off when room temperature is reached, reducing effective duty cycle to 50%–75% and lowering total energy draw.',
      'Spot heating an occupied room with a space heater while lowering central furnace thermostat by 3°F to 5°F can reduce overall heating costs, but running multiple space heaters across a house is almost always more expensive than central heating.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Portable Electric Resistance Space Heater Energy Guide',
        topic: 'Wattage ratings, thermal output, safety guidelines, and operating costs',
        url: 'https://www.energy.gov/energysaver/portable-heaters',
      },
      {
        organization: 'U.S. Consumer Product Safety Commission (CPSC)',
        title: 'Space Heater Electrical Safety & Usage Standards',
        topic: 'Circuit load capacities, extension cord safety, and placement guidance',
        url: 'https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Space-Heater-Safety-Center',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Winter Fuels Outlook: Space Heating Energy Trends',
        topic: 'Residential electric heating price baselines across U.S. climate zones',
        url: 'https://www.eia.gov/outlooks/steo/special/supplements/2023/2023_winter_fuels.pdf',
      },
    ],
    relatedRoutes: [
      '/tools/space-heater-cost-calculator',
      '/guides/why-is-my-electric-bill-so-high',
      '/electricity-rates/pennsylvania',
      '/electricity-rates/new-york',
      '/electricity-rates/illinois',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-does-it-cost-to-charge-an-ev-at-home': {
    slug: 'how-much-does-it-cost-to-charge-an-ev-at-home',
    href: '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
    title: 'How Much Does It Cost to Charge an EV at Home? kWh, Efficiency & Rates',
    h1Title: 'How Much Does It Cost to Charge an EV at Home?',
    breadcrumbLabel: 'EV Home Charging Cost',
    description:
      'Calculate EV home charging costs per session, per mile, and per month based on battery kWh, state-of-charge, grid charging efficiency, and utility tariffs.',
    eyebrow: 'EV Home Charging Guide',
    updatedAt: '2026-07-23',
    category: 'Electric Vehicles',
    primaryCalculatorHref: '/tools/ev-home-charging-cost-calculator',
    primaryCalculatorLabel: 'EV Home Charging Calculator',
    primaryCalculatorDescription:
      'Estimate charging session costs, monthly electricity charges, grid efficiency losses, and cost per mile for Level 1 and Level 2 home charging.',
    actionLabel: 'Estimate home charging cost',
    summaryTakeaways: [
      'Grid energy required (kWh) is higher than battery energy added due to charging efficiency losses (Level 1: ~80-85% efficient; Level 2: ~88-92% efficient).',
      'To add 45 kWh of energy to an EV battery at 88% Level 2 charging efficiency, your electric meter measures 51.14 kWh of grid draw (45 ÷ 0.88).',
      'At the U.S. average residential rate of ~16.5¢/kWh, driving an EV costs approximately 4.5¢ to 5.5¢ per mile, compared to 12¢ to 16¢ per mile for a 28 MPG gasoline vehicle.',
      'Charging speed (Level 1 1.4 kW vs Level 2 7.2 kW) changes how fast your battery fills, but does not alter the utility price per kWh unless you use Time-of-Use (TOU) off-peak rates.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy (AFDC)',
        title: 'Alternative Fuels Data Center: Developing Infrastructure to Charge EVs',
        topic: 'Level 1 and Level 2 charging equipment efficiency, voltage, and loss factors',
        url: 'https://afdc.energy.gov/fuels/electricity_infrastructure.html',
      },
      {
        organization: 'U.S. Environmental Protection Agency (EPA)',
        title: 'Fuel Economy & Electric Vehicle Energy Consumption Data',
        topic: 'kWh per 100 miles efficiency benchmarks and mpge conversion factors',
        url: 'https://www.fueleconomy.gov/feg/evtech.shtml',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Electric Vehicle Energy Consumption & Residential Rate Data',
        topic: 'Impact of home EV charging on monthly residential electricity statements',
        url: 'https://www.eia.gov/environment/emissions/carbon_reporting/electric_vehicles.php',
      },
    ],
    relatedRoutes: [
      '/tools/ev-home-charging-cost-calculator',
      '/guides/how-much-electricity-do-household-appliances-use',
      '/electricity-rates/california',
      '/electricity-rates/texas',
      '/methodology',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
};

export const guideSlugs = Object.keys(energyGuides);
