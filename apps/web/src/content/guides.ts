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
  datePublished: string;
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
    datePublished: '2026-07-23',
    category: 'Electric Bill Diagnostics',
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
    datePublished: '2026-07-23',
    category: 'Electric Bill Diagnostics',
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
    datePublished: '2026-07-23',
    category: 'Electric Bill Diagnostics',
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
    datePublished: '2026-07-23',
    category: 'Electric Bill Diagnostics',
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
    datePublished: '2026-07-23',
    category: 'Electric Bill Diagnostics',
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
  'how-much-electricity-does-a-refrigerator-use': {
    slug: 'how-much-electricity-does-a-refrigerator-use',
    href: '/guides/how-much-electricity-does-a-refrigerator-use',
    title: 'How Much Electricity Does a Refrigerator Use? Wattage & kWh Guide',
    h1Title: 'How Much Electricity Does a Refrigerator Use?',
    breadcrumbLabel: 'Refrigerator Electricity Use',
    description:
      'Calculate refrigerator electricity consumption (kWh) and monthly operating cost using EnergyGuide annual ratings, compressor duty cycles, and rated power draw.',
    eyebrow: 'Refrigerator Energy Guide',
    updatedAt: '2026-07-24',
    datePublished: '2026-07-24',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/refrigerator-cost-calculator',
    primaryCalculatorLabel: 'Refrigerator Cost Calculator',
    primaryCalculatorDescription:
      'Estimate monthly refrigerator operating costs using compressor duty cycle or annual EnergyGuide kWh rating.',
    actionLabel: 'Calculate refrigerator energy cost',
    summaryTakeaways: [
      'A typical modern residential refrigerator consumes 350 to 600 kWh annually, costing approximately $5 to $9 per month at average U.S. electricity rates.',
      'Refrigerators remain plugged in 24 hours a day, but the cooling compressor cycles on and off at a typical 30% to 40% duty cycle.',
      'Annual EnergyGuide kWh ratings represent standardized baseline testing; when calculating costs from annual kWh, duty cycle must not be applied a second time.',
      'Secondary refrigerators running in unconditioned garages or basements can draw up to 50% more electricity during hot summer months.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Estimating Refrigerator Energy Consumption & Operating Costs',
        topic: 'Annual kWh baselines, compressor duty cycles, and temperature settings',
        url: 'https://www.energy.gov/energysaver/refrigerators',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Certified Refrigerator Energy Specifications & Savings',
        topic: 'Standard vs ENERGY STAR annual kWh consumption benchmarks',
        url: 'https://www.energystar.gov/products/appliances/refrigerators',
      },
      {
        organization: 'Federal Trade Commission (FTC)',
        title: 'EnergyGuide Labeling Requirements for Home Refrigeration',
        topic: 'Standardized annual kWh rating methodology and testing baselines',
        url: 'https://www.ftc.gov/business-guidance/resources/energyguide-labels',
      },
    ],
    relatedRoutes: [
      '/tools/refrigerator-cost-calculator',
      '/guides/how-much-electricity-do-household-appliances-use',
      '/appliances',
      '/tools/appliance-energy-cost-calculator',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-does-it-cost-to-run-an-electric-clothes-dryer': {
    slug: 'how-much-does-it-cost-to-run-an-electric-clothes-dryer',
    href: '/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer',
    title: 'How Much Does It Cost to Run an Electric Clothes Dryer?',
    h1Title: 'How Much Does It Cost to Run an Electric Clothes Dryer?',
    breadcrumbLabel: 'Electric Clothes Dryer Cost',
    description:
      'Calculate 240V electric clothes dryer cost per load, weekly spending, and annual electricity consumption based on rated wattage and laundry frequency.',
    eyebrow: 'Electric Dryer Cost Guide',
    updatedAt: '2026-07-24',
    datePublished: '2026-07-24',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/clothes-dryer-cost-calculator',
    primaryCalculatorLabel: 'Clothes Dryer Cost Calculator',
    primaryCalculatorDescription:
      'Calculate electric dryer energy cost per load, weekly spending, and annual kWh consumption.',
    actionLabel: 'Calculate clothes dryer cost',
    summaryTakeaways: [
      'Standard residential electric dryers draw 1,800 to 5,000 Watts of electric power, consuming about 2.25 to 3.75 kWh per typical 45-minute drying load.',
      'At average U.S. electricity rates (16.5¢/kWh), drying one load costs approximately $0.37 to $0.62 in electricity.',
      'Running 5 laundry loads per week consumes ~16 to 25 kWh weekly ($110 to $160+ per year in electricity alone).',
      'This guide and matching calculator cover electric dryers only; natural gas dryers require separate gas fuel rate modeling.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Residential Clothes Dryer Energy Efficiency Standards',
        topic: 'Electric dryer wattage ratings, cycle durations, and load energy draw',
        url: 'https://www.energy.gov/energysaver/laundry',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Certified Electric Clothes Dryer Energy Consumption Data',
        topic: 'Combined Energy Factor (CEF) metrics and automatic moisture sensor savings',
        url: 'https://www.energystar.gov/products/appliances/clothes_dryers',
      },
    ],
    relatedRoutes: [
      '/tools/clothes-dryer-cost-calculator',
      '/guides/how-much-electricity-do-household-appliances-use',
      '/appliances',
      '/tools/appliance-energy-cost-calculator',
      '/methodology',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-does-it-cost-to-run-an-electric-water-heater': {
    slug: 'how-much-does-it-cost-to-run-an-electric-water-heater',
    href: '/guides/how-much-does-it-cost-to-run-an-electric-water-heater',
    title: 'How Much Does It Cost to Run an Electric Water Heater?',
    h1Title: 'How Much Does It Cost to Run an Electric Water Heater?',
    breadcrumbLabel: 'Electric Water Heater Cost',
    description:
      'Calculate electric resistance tank water heating costs per day, month, and year using element wattage, active heating hours, and utility rates.',
    eyebrow: 'Water Heater Cost Guide',
    updatedAt: '2026-07-24',
    datePublished: '2026-07-24',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/electric-water-heater-cost-calculator',
    primaryCalculatorLabel: 'Electric Water Heater Cost Calculator',
    primaryCalculatorDescription:
      'Estimate monthly electric resistance water heater costs using heating element wattage and daily active runtime.',
    actionLabel: 'Calculate water heater cost',
    summaryTakeaways: [
      'Standard residential electric resistance water heaters draw 4,500 Watts per heating element and operate actively for 2.5 to 4 hours per day.',
      'A typical family electric tank water heater consumes 11 to 18 kWh daily, adding $55 to $90+ to monthly electric statements.',
      'Most dual-element electric tank water heaters energize only one element at a time; default active element count is 1 unless verified on equipment specs.',
      'This guide covers electric-resistance tank water heaters only; heat-pump water heaters use a separate heat-recovery COP model.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Estimating Electric Water Heater Energy Use & Operating Costs',
        topic: 'Element wattage ratings, standby thermal losses, and usage baselines',
        url: 'https://www.energy.gov/energysaver/water-heating',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Water Heater Efficiency & Energy Consumption Standards',
        topic: 'Electric resistance vs heat pump water heater energy consumption',
        url: 'https://www.energystar.gov/products/water_heaters',
      },
    ],
    relatedRoutes: [
      '/tools/electric-water-heater-cost-calculator',
      '/guides/how-much-electricity-do-household-appliances-use',
      '/appliances',
      '/tools/appliance-energy-cost-calculator',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-does-it-cost-to-run-a-pool-pump': {
    slug: 'how-much-does-it-cost-to-run-a-pool-pump',
    href: '/guides/how-much-does-it-cost-to-run-a-pool-pump',
    title: 'How Much Does It Cost to Run a Pool Pump? Daily & Seasonal Guide',
    h1Title: 'How Much Does It Cost to Run a Pool Pump?',
    breadcrumbLabel: 'Pool Pump Cost',
    description:
      'Calculate residential pool pump electricity costs per day, month, and season based on electrical input Watts, filtration hours per day, and utility rates.',
    eyebrow: 'Pool Pump Cost Guide',
    updatedAt: '2026-07-24',
    datePublished: '2026-07-24',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/pool-pump-cost-calculator',
    primaryCalculatorLabel: 'Pool Pump Cost Calculator',
    primaryCalculatorDescription:
      'Calculate daily, monthly, and seasonal pool pump filtration costs based on electrical input power in Watts.',
    actionLabel: 'Calculate pool pump cost',
    summaryTakeaways: [
      'Single-speed pool pumps draw 1,200 to 2,000 Watts of electrical power, consuming 9.6 to 16 kWh daily during an 8-hour summer filtration schedule.',
      'Running a single-speed pool pump 8 hours daily adds $45 to $80+ per month during pool season at standard utility rates.',
      'Motor horsepower (HP) must not be converted directly to electrical watts without factoring in motor electrical efficiency and service factor.',
      'Variable-speed pool pumps running at lower RPM draw significantly fewer Watts for longer durations, lowering total filtration kWh consumption.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Pool Pump Energy Efficiency Standards & Operating Guidelines',
        topic: 'Pool pump wattage ratings, filtration hours, and variable-speed efficiency',
        url: 'https://www.energy.gov/energysaver/swimming-pool-treatment',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Certified Pool Pump Energy Consumption & Utility Savings',
        topic: 'ENERGY STAR variable-speed pool pump energy baselines',
        url: 'https://www.energystar.gov/products/other/pool_pumps',
      },
    ],
    relatedRoutes: [
      '/tools/pool-pump-cost-calculator',
      '/guides/how-much-electricity-do-household-appliances-use',
      '/appliances',
      '/electricity-rates/california',
      '/electricity-rates/florida',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-does-it-cost-to-run-a-dehumidifier': {
    slug: 'how-much-does-it-cost-to-run-a-dehumidifier',
    href: '/guides/how-much-does-it-cost-to-run-a-dehumidifier',
    title: 'How Much Does It Cost to Run a Dehumidifier? Wattage & Runtime Guide',
    h1Title: 'How Much Does It Cost to Run a Dehumidifier?',
    breadcrumbLabel: 'Dehumidifier Cost',
    description:
      'Calculate basement and room dehumidifier electricity costs per day, month, and season based on rated wattage, humidistat duty cycle, and utility rates.',
    eyebrow: 'Dehumidifier Cost Guide',
    updatedAt: '2026-07-24',
    datePublished: '2026-07-24',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/dehumidifier-cost-calculator',
    primaryCalculatorLabel: 'Dehumidifier Cost Calculator',
    primaryCalculatorDescription:
      'Estimate monthly dehumidifier electricity costs using compressor wattage and humidistat duty cycle percentage.',
    actionLabel: 'Calculate dehumidifier cost',
    summaryTakeaways: [
      'Portable dehumidifiers draw 300 to 700 Watts of power, consuming approximately 3.6 to 8.4 kWh daily when operating at a 50% humidistat duty cycle.',
      'Running a 500W basement dehumidifier at 50% duty cycle adds $18 to $35 per month to electric statements during humid months.',
      'Dehumidifier pint capacity measures moisture removal rate (pints/24hr), not electrical power draw; energy cost is derived from electrical wattage and compressor duty cycle.',
      'Setting humidistat target to 50% relative humidity prevents excessive compressor cycling while maintaining comfortable moisture control.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Dehumidifier Energy Efficiency Standards & Moisture Removal',
        topic: 'Dehumidifier wattage ratings, Integrated Energy Factor (IEF), and duty cycles',
        url: 'https://www.energy.gov/energysaver/dehumidifiers',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Certified Dehumidifier Product Specifications & Energy Savings',
        topic: 'ENERGY STAR basement and room dehumidifier energy baselines',
        url: 'https://www.energystar.gov/products/appliances/dehumidifiers',
      },
    ],
    relatedRoutes: [
      '/tools/dehumidifier-cost-calculator',
      '/guides/how-much-electricity-do-household-appliances-use',
      '/appliances',
      '/tools/appliance-energy-cost-calculator',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-to-calculate-electricity-cost-per-kwh-from-your-bill': {
    slug: 'how-to-calculate-electricity-cost-per-kwh-from-your-bill',
    href: '/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill',
    title: 'How to Calculate Electricity Cost per kWh From Your Bill',
    h1Title: 'How to Calculate Your Effective Electricity Cost per kWh',
    breadcrumbLabel: 'Calculate Cost per kWh',
    description:
      'Learn how to calculate your effective all-in electricity rate per kWh from your monthly electric bill, including supply, delivery, riders, and fixed customer fees.',
    eyebrow: 'Electric Bill Rate Calculation Guide',
    updatedAt: '2026-07-26',
    datePublished: '2026-07-26',
    category: 'Electric Bill Diagnostics',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Calculate your exact effective rate per kWh and compare two monthly statements with our Electricity Bill Analyzer.',
    actionLabel: 'Calculate your effective rate',
    summaryTakeaways: [
      'Your effective all-in cost per kWh equals your total bill dollar amount divided by total kilowatt-hours (kWh) consumed.',
      'Base generation supply rates do not include delivery, transmission, fixed customer account fees, and local utility taxes.',
      'A consumer with 800 kWh usage and a $160.00 total bill pays an effective all-in rate of $0.20 per kWh (20.00 ¢/kWh).',
      'Calculating your effective rate allows you to accurately estimate appliance operating costs on your local electric statement.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        topic: 'Statewide residential average electricity revenue and sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Understanding Your Electricity Bill',
        topic: 'Electricity bill charges, rate structures, and fixed fees',
        url: 'https://www.energy.gov/energysaver/understanding-your-electricity-bill',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/why-is-my-electric-bill-so-high',
      '/guides/electricity-supply-charge-vs-delivery-charge',
      '/guides/why-is-my-electric-bill-high-when-usage-is-low',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'why-is-my-electric-bill-high-when-usage-is-low': {
    slug: 'why-is-my-electric-bill-high-when-usage-is-low',
    href: '/guides/why-is-my-electric-bill-high-when-usage-is-low',
    title: 'Why Is My Electric Bill High When Usage Is Low? Key Causes',
    h1Title: 'Why Is My Electric Bill High When Usage Is Low?',
    breadcrumbLabel: 'High Bill Low Usage',
    description:
      'Understand why your electric bill remains high despite lower energy consumption, including fixed customer fees, utility rate increases, fuel surcharges, and estimated meter reads.',
    eyebrow: 'Electric Bill Diagnostic Guide',
    updatedAt: '2026-07-26',
    datePublished: '2026-07-26',
    category: 'Electric Bill Diagnostics',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Separate dollar changes caused by utility rate adjustments from consumption changes using our Bill Analyzer.',
    actionLabel: 'Analyze bill charges',
    summaryTakeaways: [
      'Fixed monthly customer account fees must be paid regardless of how few kilowatt-hours you consume.',
      'Utility base rate hikes, transmission adjustments, and fuel supply riders increase your per-kWh cost even when usage drops.',
      'An estimated meter reading (marked "E") followed by an actual reading (marked "A") can create unexpected catch-up bill adjustments.',
      'Tiered pricing structures and seasonal rate shifts change your per-kWh rate across different months.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Factors Affecting Electricity Prices',
        topic: 'Utility base rates, fuel riders, and fixed account charges',
        url: 'https://www.eia.gov/energyexplained/electricity/prices-and-factors-affecting-prices.php',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Understanding Utility Billing Adjustments',
        topic: 'Meter reading reconciliation and seasonal tariff shifts',
        url: 'https://www.energystar.gov/',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/why-is-my-electric-bill-so-high',
      '/guides/how-billing-cycle-length-affects-electricity-bills',
      '/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill',
      '/methodology',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'electricity-supply-charge-vs-delivery-charge': {
    slug: 'electricity-supply-charge-vs-delivery-charge',
    href: '/guides/electricity-supply-charge-vs-delivery-charge',
    title: 'Electricity Supply Charge vs. Delivery Charge Explained',
    h1Title: 'Electricity Supply Charge vs. Delivery Charge: Key Differences',
    breadcrumbLabel: 'Supply vs Delivery',
    description:
      'Discover the difference between electricity supply charges (energy generation) and delivery charges (transmission, distribution grid maintenance, and poles).',
    eyebrow: 'Electric Bill Breakdown Guide',
    updatedAt: '2026-07-26',
    datePublished: '2026-07-26',
    category: 'Electric Bill Diagnostics',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Break down your total bill into supply, delivery, and effective per-kWh rate metrics.',
    actionLabel: 'Dissect your electric bill',
    summaryTakeaways: [
      'Supply charges pay for generating electricity at power plants (natural gas, nuclear, wind, solar, coal).',
      'Delivery charges pay for transporting electricity over transmission lines, substations, and local power poles.',
      'In deregulated retail choice states, you can choose your supply provider while your local utility always handles delivery.',
      'Both supply and delivery charges contain per-kWh variable rates and fixed monthly account fees.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Electricity Market Restructuring & Industry Operations',
        topic: 'Generation supply versus utility distribution grid delivery',
        url: 'https://www.eia.gov/energyexplained/electricity/',
      },
      {
        organization: 'Federal Energy Regulatory Commission (FERC)',
        title: 'Electric Power Markets & Transmission Pricing',
        topic: 'Wholesale generation supply and interstate transmission pricing',
        url: 'https://www.ferc.gov/',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill',
      '/electricity-rates',
      '/data-sources',
      '/methodology',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'kw-vs-kwh-explained': {
    slug: 'kw-vs-kwh-explained',
    href: '/guides/kw-vs-kwh-explained',
    title: 'kW vs. kWh Explained: Power Capacity vs. Energy Consumption',
    h1Title: 'kW vs. kWh Explained: What Is the Difference?',
    breadcrumbLabel: 'kW vs. kWh Explained',
    description:
      'Understand the difference between kilowatts (kW) of electrical power demand and kilowatt-hours (kWh) of total energy consumption on your electric bill.',
    eyebrow: 'Energy Fundamentals Guide',
    updatedAt: '2026-07-26',
    datePublished: '2026-07-26',
    category: 'Energy Fundamentals',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Convert appliance wattage (kW) into daily, monthly, and annual energy consumption (kWh) and operating cost.',
    actionLabel: 'Calculate kWh consumption',
    summaryTakeaways: [
      'Kilowatt (kW) measures power capacity or instantaneous electrical demand (how fast energy is drawn).',
      'Kilowatt-hour (kWh) measures total energy consumed over a period of time (kWh = kW × hours).',
      'Analogy: kW is like speedometer speed (MPH), while kWh is like total distance traveled (miles).',
      'Utilities bill residential customers primarily for total energy (kWh), though some tariffs include demand charges (kW).',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Energy Basics: Watts, Kilowatts, and Kilowatt-Hours',
        topic: 'Electrical power units, energy measurement formulas, and consumption conversion',
        url: 'https://www.energy.gov/energysaver/energy-saver',
      },
      {
        organization: 'National Institute of Standards and Technology (NIST)',
        title: 'Guide for the Use of the International System of Units (SI)',
        topic: 'Standard units of electrical power (Watt) and energy (Joule / kWh)',
        url: 'https://www.nist.gov/',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/guides/how-much-electricity-do-household-appliances-use',
      '/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill',
      '/methodology',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-billing-cycle-length-affects-electricity-bills': {
    slug: 'how-billing-cycle-length-affects-electricity-bills',
    href: '/guides/how-billing-cycle-length-affects-electricity-bills',
    title: 'How Billing Cycle Length Affects Monthly Electricity Bills',
    h1Title: 'How Billing Cycle Length Affects Your Electricity Bill',
    breadcrumbLabel: 'Billing Cycle Length',
    description:
      'Learn how variations in utility billing days (28 to 35 days) inflate total monthly electric bills without changes in daily household energy habits.',
    eyebrow: 'Electric Bill Billing Cycle Guide',
    updatedAt: '2026-07-26',
    datePublished: '2026-07-26',
    category: 'Electric Bill Diagnostics',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Normalize billing cycle days to compare daily energy usage (kWh/day) accurately across statements.',
    actionLabel: 'Normalize billing cycle days',
    summaryTakeaways: [
      'Utility billing cycles vary between 28 and 35 days depending on weekends, holidays, and meter reader routes.',
      'A 34-day billing statement contains 21.4% more days than a 28-day statement, increasing total bill cost accordingly.',
      'To evaluate actual consumption shifts, always calculate daily energy usage (kWh per day = Total kWh ÷ Billing Days).',
      'Tiered rate structures can push extra billing days into higher-cost per-kWh tiers.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Understanding Electric Utility Metering & Billing Cycles',
        topic: 'Utility billing cycle variations, meter reading schedules, and daily normalization',
        url: 'https://www.eia.gov/',
      },
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'How to Read Your Monthly Utility Statement',
        topic: 'Daily usage averages, billing cycle days, and statement comparisons',
        url: 'https://www.energy.gov/energysaver/understanding-your-electricity-bill',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/why-is-my-electric-bill-so-high',
      '/guides/why-is-my-electric-bill-high-when-usage-is-low',
      '/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill',
      '/methodology',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-a-dishwasher-use': {
    slug: 'how-much-electricity-does-a-dishwasher-use',
    href: '/guides/how-much-electricity-does-a-dishwasher-use',
    title: 'How Much Electricity Does a Dishwasher Use? Wattage & Cost',
    h1Title: 'How Much Electricity Does a Dishwasher Use?',
    breadcrumbLabel: 'Dishwasher Electricity Use',
    description:
      'Calculate dishwasher electricity consumption (kWh) and operating cost based on heating element wattage, wash cycle duration, and air-dry settings.',
    eyebrow: 'Dishwasher Energy Guide',
    updatedAt: '2026-07-26',
    datePublished: '2026-07-26',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Calculate monthly and annual dishwasher operating costs using customized wattage and load frequency.',
    actionLabel: 'Calculate dishwasher cost',
    summaryTakeaways: [
      'Standard dishwashers draw 1,200 to 1,800 Watts during active wash cycles, consuming 1.2 to 2.4 kWh per load.',
      'Over 70% to 80% of dishwasher energy is used by the internal electric heating element to heat water.',
      'Using "Eco Mode" or turning off "Heated Dry" reduces dishwasher electricity consumption by 30% to 50% per load.',
      'Running one load daily costs $0.18 to $0.72 per day depending on local electricity rates (15¢ to 30¢ per kWh).',
    ],
    sections: [],
    sources: [
      {
        organization: 'ENERGY STAR',
        title: 'Certified Dishwashers Energy & Water Savings Criteria',
        topic: 'Dishwasher annual kWh baselines, water heating energy split, and heated dry draw',
        url: 'https://www.energystar.gov/products/appliances/dishwashers',
      },
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Estimating Appliance Energy Use: Dishwashers',
        topic: 'Dishwasher wattage ranges, heating element draw, and cycle energy calculations',
        url: 'https://www.energy.gov/energysaver/estimating-appliance-and-home-electronic-energy-use',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/guides/how-much-electricity-do-household-appliances-use',
      '/guides/how-much-electricity-does-a-washing-machine-use',
      '/appliances',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-a-washing-machine-use': {
    slug: 'how-much-electricity-does-a-washing-machine-use',
    href: '/guides/how-much-electricity-does-a-washing-machine-use',
    title: 'How Much Electricity Does a Washing Machine Use? Cost Guide',
    h1Title: 'How Much Electricity Does a Washing Machine Use?',
    breadcrumbLabel: 'Washing Machine Electricity Use',
    description:
      'Discover washing machine power consumption (kWh per load), motor wattage, hot vs. cold water energy impact, and monthly operating costs.',
    eyebrow: 'Washing Machine Energy Guide',
    updatedAt: '2026-07-26',
    datePublished: '2026-07-26',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Estimate clothes washer electricity costs per wash load, month, and year with transparent wattage inputs.',
    actionLabel: 'Calculate washer cost',
    summaryTakeaways: [
      'Washing machine motors draw 400 to 1,400 Watts, consuming 0.3 to 0.6 kWh per load for cold-water washes.',
      'Washing with hot water increases total energy consumption to 1.5–2.5 kWh per load because electric water heating uses 85% to 90% of total wash energy.',
      'Washing clothes in cold water saves up to $40 to $80 per year for typical households.',
      'Running 5 loads per week costs $0.30 to $2.25 per week depending on water temperature and electricity rates (15¢ to 30¢ per kWh).',
    ],
    sections: [],
    sources: [
      {
        organization: 'ENERGY STAR',
        title: 'Clothes Washers Key Product Criteria',
        topic: 'Washing machine energy factor, cold water savings, and annual kWh standards',
        url: 'https://www.energystar.gov/products/appliances/clothes_washers',
      },
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Laundry Energy Efficiency Tips & Hot Water Energy Split',
        topic: 'Motor power draw, water heater energy share, and cold water wash benefits',
        url: 'https://www.energy.gov/energysaver/laundry',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/tools/clothes-dryer-cost-calculator',
      '/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer',
      '/guides/how-much-electricity-does-a-dishwasher-use',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-does-it-cost-to-run-an-electric-oven': {
    slug: 'how-much-does-it-cost-to-run-an-electric-oven',
    href: '/guides/how-much-does-it-cost-to-run-an-electric-oven',
    title: 'How Much Does It Cost to Run an Electric Oven? Wattage & Cost',
    h1Title: 'How Much Does It Cost to Run an Electric Oven?',
    breadcrumbLabel: 'Electric Oven Cost',
    description:
      'Calculate electric oven and cooktop power draw (2,000W–5,000W), thermostat duty cycle, preheat consumption, and hourly cooking costs.',
    eyebrow: 'Electric Oven Cost Guide',
    updatedAt: '2026-07-26',
    datePublished: '2026-07-26',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Calculate electric oven and stovetop operating costs per hour, month, and year.',
    actionLabel: 'Calculate oven cost',
    summaryTakeaways: [
      'Electric ovens draw 2,000 to 5,000 Watts when elements are active, consuming 1.5 to 3.0 kWh per hour of baking.',
      'Because the thermostat cycles heating elements on and off (50% to 60% duty cycle), average power draw is less than maximum rated wattage.',
      'Preheating an oven to 350°F consumes approximately 0.5 to 0.8 kWh before cooking begins.',
      'Baking for 1 hour costs $0.23 to $0.90 depending on element wattage, thermostat duty cycle, and local electricity rates (15¢ to 30¢ per kWh).',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Estimating Appliance Energy Use: Electric Ovens & Stoves',
        topic:
          'Electric oven wattage ratings, thermostat cycling duty cycles, and energy calculations',
        url: 'https://www.energy.gov/energysaver/estimating-appliance-and-home-electronic-energy-use',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Commercial & Residential Kitchen Energy Efficiency',
        topic: 'Convection oven energy savings, preheat consumption, and thermal efficiency',
        url: 'https://www.energystar.gov/',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/guides/how-much-electricity-do-household-appliances-use',
      '/guides/how-much-electricity-does-a-dishwasher-use',
      '/appliances',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-a-ceiling-fan-use': {
    slug: 'how-much-electricity-does-a-ceiling-fan-use',
    href: '/guides/how-much-electricity-does-a-ceiling-fan-use',
    title: 'How Much Electricity Does a Ceiling Fan Use? Wattage & Cost',
    h1Title: 'How Much Electricity Does a Ceiling Fan Use?',
    breadcrumbLabel: 'Ceiling Fan Electricity Use',
    description:
      'Find out how much electricity ceiling fans use (15W–75W), AC vs. DC motor costs, 24/7 operating expenses, and air conditioning savings.',
    eyebrow: 'Ceiling Fan Energy Guide',
    updatedAt: '2026-07-26',
    datePublished: '2026-07-26',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Calculate daily, monthly, and annual ceiling fan operating costs across speed settings.',
    actionLabel: 'Calculate ceiling fan cost',
    summaryTakeaways: [
      'Standard AC ceiling fans draw 50 to 75 Watts on high speed, while high-efficiency DC motor fans draw only 15 to 30 Watts.',
      'Running a 50W ceiling fan for 12 hours daily consumes 0.6 kWh per day, costing about $0.09 to $0.18 per day ($2.70 to $5.40/month).',
      'Ceiling fans cool people via wind-chill effect, not rooms; turn off fans when leaving a room to avoid wasting electricity.',
      'Using a ceiling fan allows you to raise your air conditioner thermostat by 4°F with no loss in comfort, saving 10% to 15% on cooling bills.',
    ],
    sections: [],
    sources: [
      {
        organization: 'ENERGY STAR',
        title: 'Ceiling Fans Key Product Criteria',
        topic: 'Ceiling fan CFM efficiency, AC vs DC motor power draw, and energy standards',
        url: 'https://www.energystar.gov/products/lighting_fans/ceiling_fans',
      },
      {
        organization: 'U.S. Department of Energy (DOE)',
        title: 'Using Ceiling Fans for Summer Cooling & Winter Heating',
        topic: 'Wind-chill effect, thermostat adjustment savings, and seasonal fan rotation',
        url: 'https://www.energy.gov/energysaver/using-ceiling-fans-cooling-and-heating',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/tools/ac-cost-calculator',
      '/guides/how-much-does-it-cost-to-run-an-air-conditioner',
      '/appliances',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-a-gaming-pc-use': {
    slug: 'how-much-electricity-does-a-gaming-pc-use',
    href: '/guides/how-much-electricity-does-a-gaming-pc-use',
    title: 'How Much Electricity Does a Gaming PC Use? Wattage & Cost',
    h1Title: 'How Much Electricity Does a Gaming PC Use?',
    breadcrumbLabel: 'Gaming PC Electricity Use',
    description:
      'Discover gaming PC power consumption (300W–850W active load), GPU/CPU draw, monitor power, idle power usage, and monthly electric bill impact.',
    eyebrow: 'Gaming PC Energy Guide',
    updatedAt: '2026-07-26',
    datePublished: '2026-07-26',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Calculate daily, monthly, and annual gaming desktop operating costs based on system wattage and gaming hours.',
    actionLabel: 'Calculate gaming PC cost',
    summaryTakeaways: [
      'A mid-to-high-end gaming PC draws 300 to 600 Watts during active gaming (GPU + CPU load), plus 30 to 60 Watts for a gaming monitor.',
      'During web browsing or idle tasks, a desktop PC draws only 50 to 100 Watts.',
      'Gaming for 4 hours daily at 500W system load consumes 2.0 kWh per day (60 kWh per month).',
      'Running a gaming rig for 4 hours daily costs $9.00 to $18.00 per month depending on local electricity rates (15¢ to 30¢ per kWh).',
    ],
    sections: [],
    sources: [
      {
        organization: 'Lawrence Berkeley National Laboratory (LBNL)',
        title: 'Taming the Energy Use of Gaming Computers',
        topic: 'Gaming desktop energy measurements, GPU/CPU power draw, and annual kWh baselines',
        url: 'https://www.lbl.gov/',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Computers & Monitors Energy Efficiency Specifications',
        topic:
          'Power supply 80 Plus efficiency ratings, idle power limits, and desktop PC baselines',
        url: 'https://www.energystar.gov/products/office_equipment/computers',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/guides/how-much-electricity-do-household-appliances-use',
      '/guides/kw-vs-kwh-explained',
      '/appliances',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
};

export const guideSlugs = Object.keys(energyGuides);

export const GUIDE_ROUTES = guideSlugs.map((slug) => `/guides/${slug}` as const);
