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
      '/tools/appliance-energy-cost-calculator',
      '/appliances',
      '/electricity-rates',
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
      '/tools/appliance-energy-cost-calculator',
      '/appliances',
      '/electricity-rates',
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
  'how-much-electricity-does-a-microwave-use': {
    slug: 'how-much-electricity-does-a-microwave-use',
    href: '/guides/how-much-electricity-does-a-microwave-use',
    title: 'How Much Electricity Does a Microwave Use? (Watts, kWh & Cost)',
    h1Title: 'How Much Electricity Does a Microwave Use?',
    breadcrumbLabel: 'Microwave Electricity Cost',
    description:
      'Calculate microwave electricity consumption (kWh) and operating cost based on input wattage, cooking output, standby clock draw, and daily usage.',
    eyebrow: 'Microwave Energy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Calculate daily, monthly, and annual microwave operating costs based on wattage and cooking duration.',
    actionLabel: 'Calculate Microwave Energy Cost',
    summaryTakeaways: [
      'Residential microwaves typically consume 1,100W to 1,800W of electrical input power to generate 700W to 1,200W of cooking output.',
      'Because microwaves operate for short durations (5 to 15 minutes daily), monthly electricity costs remain low—typically $0.40 to $1.50.',
      'Digital microwave clocks draw 2W to 4W continuously, consuming ~1.5 to 3.0 kWh per month in standby power.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Estimating Appliance and Home Electronic Energy Use',
        topic: 'Microwave power consumption, standby clock power draw, and cooking efficiency',
        url: 'https://www.energy.gov/energysaver/estimating-appliance-and-home-electronic-energy-use',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Residential Kitchen Appliance Energy Efficiency Standards',
        topic: 'Standby power limits and kitchen electronics energy baselines',
        url: 'https://www.energystar.gov/products/appliances',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/guides/how-much-electricity-does-an-air-fryer-use',
      '/guides/how-much-does-it-cost-to-run-an-electric-oven',
      '/guides/what-is-vampire-power-and-how-much-does-it-cost',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-an-air-fryer-use': {
    slug: 'how-much-electricity-does-an-air-fryer-use',
    href: '/guides/how-much-electricity-does-an-air-fryer-use',
    title: 'How Much Electricity Does an Air Fryer Use? (Watts, Ovens & Cost)',
    h1Title: 'How Much Electricity Does an Air Fryer Use?',
    breadcrumbLabel: 'Air Fryer Electricity Cost',
    description:
      'Discover air fryer power consumption (1,400W–1,800W), thermostat duty cycles, cooking time impact, and energy comparisons with full-size electric ovens.',
    eyebrow: 'Air Fryer Energy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Calculate air fryer operating costs per meal and per month based on element wattage and cooking time.',
    actionLabel: 'Calculate Air Fryer Operating Cost',
    summaryTakeaways: [
      'Countertop air fryers operate at rated heating element capacities of 1,400W to 1,800W.',
      'Air fryers heat a compact 3 to 6-quart chamber rapidly, reducing preheating times to 2–3 minutes compared to 10–15 minutes for full-size ovens.',
      'While air fryers consume less energy for single-dish or small-portion meals, full-size electric ovens remain more efficient per serving when cooking multi-rack family meals.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Kitchen Appliance Energy Efficiency & Small Cooking Electronics',
        topic:
          'Small appliance heating elements, thermostat duty cycles, and cooking energy efficiency',
        url: 'https://www.energy.gov/energysaver/estimating-appliance-and-home-electronic-energy-use',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Commercial & Residential Cooking Equipment Energy Baselines',
        topic: 'Convection heating efficiency and compact cooking enclosure energy performance',
        url: 'https://www.energystar.gov/products/appliances',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/guides/how-much-does-it-cost-to-run-an-electric-oven',
      '/guides/how-much-electricity-does-a-microwave-use',
      '/guides/how-much-electricity-does-an-induction-cooktop-use',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-a-television-use': {
    slug: 'how-much-electricity-does-a-television-use',
    href: '/guides/how-much-electricity-does-a-television-use',
    title: 'How Much Electricity Does a TV Use? (Watts, OLED vs LED & Cost)',
    h1Title: 'How Much Electricity Does a Television Use?',
    breadcrumbLabel: 'TV Electricity Cost',
    description:
      'Calculate television electricity usage (kWh) and monthly cost based on screen size (32"-75"+), display technology (LED vs OLED), brightness settings, and standby power.',
    eyebrow: 'Television Energy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Calculate monthly television operating costs based on screen size, display technology, and viewing hours.',
    actionLabel: 'Calculate Television Electricity Cost',
    summaryTakeaways: [
      'Modern LED/LCD televisions draw 30W to 120W, while large 65"+ OLED televisions draw 100W to 220W depending on HDR brightness settings.',
      'Operating a TV for 4 hours daily consumes 4 to 25 kWh per month, costing between $0.80 and $5.00 depending on electric rates.',
      'Connected smart TVs draw 0.5W to 2.0W in standby mode to maintain network connections for quick wake and background updates.',
    ],
    sections: [],
    sources: [
      {
        organization: 'ENERGY STAR',
        title: 'Televisions Energy Efficiency Specification (Version 9.0)',
        topic:
          'On-mode power limits by screen area, HDR power consumption, and standby power requirements',
        url: 'https://www.energystar.gov/products/home_electronics/televisions',
      },
      {
        organization: 'U.S. Department of Energy',
        title: 'Home Electronics Energy Use Guide',
        topic:
          'Display power demand, ambient light sensors, and streaming media device energy consumption',
        url: 'https://www.energy.gov/energysaver/estimating-appliance-and-home-electronic-energy-use',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/guides/how-much-electricity-does-a-gaming-pc-use',
      '/guides/what-is-vampire-power-and-how-much-does-it-cost',
      '/guides/how-much-electricity-does-a-wifi-router-use',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-a-wifi-router-use': {
    slug: 'how-much-electricity-does-a-wifi-router-use',
    href: '/guides/how-much-electricity-does-a-wifi-router-use',
    title: 'How Much Electricity Does a Wi-Fi Router Use? (24/7 Cost & Watts)',
    h1Title: 'How Much Electricity Does a Wi-Fi Router Use?',
    breadcrumbLabel: 'Wi-Fi Router Electricity Cost',
    description:
      'Calculate 24/7 Wi-Fi router, modem, and mesh node electricity consumption (Watts, kWh) and annual operating costs across utility electric rates.',
    eyebrow: 'Wi-Fi Router Energy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Calculate continuous 24/7 router and mesh networking equipment operating costs.',
    actionLabel: 'Calculate Wi-Fi Router Operating Cost',
    summaryTakeaways: [
      'Standalone Wi-Fi routers and modem combos draw 5W to 15W continuously, operating 8,760 hours per year.',
      'A continuous 10W router setup consumes ~7.3 kWh per month (87.6 kWh per year), costing $13.00 to $26.00 annually depending on electric rates.',
      'Multi-node Wi-Fi mesh systems with 3 units draw 15W to 35W combined, multiplying annual continuous electricity costs.',
    ],
    sections: [],
    sources: [
      {
        organization: 'ENERGY STAR',
        title: 'Small Network Equipment Efficiency Specifications',
        topic:
          'Broadband modems, wireless routers, access points, and continuous network power draw',
        url: 'https://www.energystar.gov/products/certified-products/small-network-equipment',
      },
      {
        organization: 'Lawrence Berkeley National Laboratory',
        title: 'Home Network Equipment Energy Consumption Study',
        topic:
          'Continuous electrical draw of modems, routers, and mesh node network infrastructure',
        url: 'https://www.lbl.gov/',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/guides/how-much-electricity-does-a-laptop-use',
      '/guides/how-much-electricity-does-a-television-use',
      '/guides/what-is-vampire-power-and-how-much-does-it-cost',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-a-laptop-use': {
    slug: 'how-much-electricity-does-a-laptop-use',
    href: '/guides/how-much-electricity-does-a-laptop-use',
    title: 'How Much Electricity Does a Laptop Use? (Watts, Charging & Cost)',
    h1Title: 'How Much Electricity Does a Laptop Computer Use?',
    breadcrumbLabel: 'Laptop Electricity Cost',
    description:
      'Calculate laptop computer power consumption (15W–90W), charger wattage ratings, battery charging efficiency losses, and monthly operating costs.',
    eyebrow: 'Laptop Energy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Calculate laptop computer operating costs based on active power draw and work hours.',
    actionLabel: 'Calculate Laptop Electricity Cost',
    summaryTakeaways: [
      'Laptops draw 15W to 45W during typical office work and web browsing, ramping to 50W–90W under high processor or charging loads.',
      'A laptop used 8 hours daily for work consumes 4 to 12 kWh per month, costing between $0.80 and $2.40 monthly at average electric rates.',
      'Laptops consume 70% to 85% less power than desktop computers due to mobile-optimized processors, integrated displays, and power management.',
    ],
    sections: [],
    sources: [
      {
        organization: 'ENERGY STAR',
        title: 'Computers & Monitors Energy Efficiency Specifications',
        topic:
          'Notebook computer power limits, external power supply efficiency, and idle/active state power draw',
        url: 'https://www.energystar.gov/products/office_equipment/computers',
      },
      {
        organization: 'U.S. Department of Energy',
        title: 'Estimating Computer and Office Electronic Power Draw',
        topic:
          'Laptop charger rating vs. actual wall power consumption and battery charging efficiency',
        url: 'https://www.energy.gov/energysaver/estimating-appliance-and-home-electronic-energy-use',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/guides/how-much-electricity-does-a-gaming-pc-use',
      '/guides/how-much-electricity-does-a-wifi-router-use',
      '/guides/what-is-vampire-power-and-how-much-does-it-cost',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-an-electric-kettle-use': {
    slug: 'how-much-electricity-does-an-electric-kettle-use',
    href: '/guides/how-much-electricity-does-an-electric-kettle-use',
    title: 'How Much Electricity Does an Electric Kettle Use? (Watts & Cost)',
    h1Title: 'How Much Electricity Does an Electric Kettle Use?',
    breadcrumbLabel: 'Electric Kettle Electricity Cost',
    description:
      'Calculate electric kettle power consumption (1,200W–1,500W), short boiling runtime, overfilling energy waste, and cost per boil across utility rates.',
    eyebrow: 'Electric Kettle Energy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Calculate cost per boil and monthly operating expenses for electric kettles.',
    actionLabel: 'Calculate Electric Kettle Operating Cost',
    summaryTakeaways: [
      'Electric kettles operate at high power ratings of 1,200W to 1,500W but run for short periods (3 to 5 minutes per boil).',
      'Boiling 1 liter of water consumes approximately 0.08 to 0.11 kWh, costing $0.015 to $0.025 per boil at standard electric rates.',
      'Overfilling an electric kettle by heating 1.7L when only needing 250mL for one cup wastes up to 80% of the energy consumed during that boil.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Small Kitchen Appliance Power & Water Heating Energy',
        topic:
          'Electric resistance water heating element efficiency, thermal losses, and kettle power draw',
        url: 'https://www.energy.gov/energysaver/estimating-appliance-and-home-electronic-energy-use',
      },
      {
        organization: 'National Institute of Standards and Technology',
        title: 'Residential Water Heating and Energy Conversion Study',
        topic:
          'Specific heat capacity of water heating and small container thermal conversion rates',
        url: 'https://www.nist.gov/',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/guides/how-much-electricity-does-an-induction-cooktop-use',
      '/guides/how-much-electricity-does-a-microwave-use',
      '/guides/how-much-does-it-cost-to-run-an-electric-water-heater',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-an-induction-cooktop-use': {
    slug: 'how-much-electricity-does-an-induction-cooktop-use',
    href: '/guides/how-much-electricity-does-an-induction-cooktop-use',
    title: 'How Much Electricity Does an Induction Cooktop Use? (Watts & Cost)',
    h1Title: 'How Much Electricity Does an Induction Cooktop Use?',
    breadcrumbLabel: 'Induction Cooktop Electricity Cost',
    description:
      'Discover induction cooktop power ratings (1,400W–3,700W), power level cycling, magnetic pan heating efficiency, and hourly cooking costs.',
    eyebrow: 'Induction Cooktop Energy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/appliance-energy-cost-calculator',
    primaryCalculatorLabel: 'Appliance Energy Cost Calculator',
    primaryCalculatorDescription:
      'Calculate induction cooktop cooking costs based on burner power and daily cooking time.',
    actionLabel: 'Calculate Induction Cooktop Cost',
    summaryTakeaways: [
      'Induction cooktop burners operate at rated power capacities of 1,400W to 3,700W, cycling power output based on selected heat settings.',
      'Induction technology transfers electromagnetic energy directly to ferrous cookware, achieving higher heat transfer efficiency than radiant electric coils.',
      'A typical meal cooked on medium heat (1,500W for 30 minutes) consumes ~0.75 kWh, costing between $0.15 and $0.23 at average utility rates.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Residential Cooking Products Energy Conservation Standards',
        topic:
          'Electromagnetic induction heating efficiency, power level modulation, and cooking energy consumption',
        url: 'https://www.energy.gov/eere/buildings/appliance-and-equipment-standards-program',
      },
      {
        organization: 'Lawrence Berkeley National Laboratory',
        title: 'Induction vs Resistance Cooking Energy Performance Study',
        topic: 'Heat transfer efficiency to cookware and energy consumption comparisons',
        url: 'https://www.lbl.gov/',
      },
    ],
    relatedRoutes: [
      '/tools/appliance-energy-cost-calculator',
      '/guides/how-much-does-it-cost-to-run-an-electric-oven',
      '/guides/how-much-electricity-does-an-electric-kettle-use',
      '/guides/how-much-electricity-does-an-air-fryer-use',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-a-window-air-conditioner-use': {
    slug: 'how-much-electricity-does-a-window-air-conditioner-use',
    href: '/guides/how-much-electricity-does-a-window-air-conditioner-use',
    title: 'How Much Electricity Does a Window AC Use? (BTU, Watts & Cost)',
    h1Title: 'How Much Electricity Does a Window Air Conditioner Use?',
    breadcrumbLabel: 'Window AC Electricity Cost',
    description:
      'Calculate window air conditioner electricity usage (kWh) and monthly cooling cost based on BTU capacity (5,000–12,000), EER/CEER rating, and thermostat duty cycle.',
    eyebrow: 'Window AC Energy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Appliance Benchmarks',
    primaryCalculatorHref: '/tools/ac-cost-calculator',
    primaryCalculatorLabel: 'Air Conditioner Cost Calculator',
    primaryCalculatorDescription:
      'Estimate window air conditioner cooling expenses based on BTU capacity, CEER rating, and daily runtime.',
    actionLabel: 'Calculate Window AC Cooling Cost',
    summaryTakeaways: [
      'Small 5,000 BTU window AC units draw 450W to 550W, while large 12,000 BTU units draw 1,000W to 1,200W when the compressor is actively running.',
      'Operating an 8,000 BTU window unit for 8 hours daily at a 60% compressor duty cycle consumes ~3.5 kWh/day ($16.00 to $32.00 monthly).',
      'CEER (Combined Energy Efficiency Ratio) ratings of 12.0+ consume 10% to 15% less electricity than older units with EER ratings below 10.0.',
    ],
    sections: [],
    sources: [
      {
        organization: 'ENERGY STAR',
        title: 'Room Air Conditioners Energy Efficiency Specification',
        topic:
          'CEER efficiency baselines, cooling capacity in BTU/hr, and compressor energy limits',
        url: 'https://www.energystar.gov/products/heating_cooling/room_air_conditioners',
      },
      {
        organization: 'U.S. Department of Energy',
        title: 'Room Air Conditioner Energy Saver Guide',
        topic:
          'Sizing window AC units by room square footage, thermostat settings, and seasonal energy use',
        url: 'https://www.energy.gov/energysaver/room-air-conditioners',
      },
    ],
    relatedRoutes: [
      '/tools/ac-cost-calculator',
      '/guides/how-much-does-it-cost-to-run-an-air-conditioner',
      '/guides/how-much-electricity-does-a-ceiling-fan-use',
      '/guides/how-much-does-it-cost-to-run-a-space-heater',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'what-is-vampire-power-and-how-much-does-it-cost': {
    slug: 'what-is-vampire-power-and-how-much-does-it-cost',
    href: '/guides/what-is-vampire-power-and-how-much-does-it-cost',
    title: 'What Is Vampire Power & How Much Does It Cost? (Standby Usage)',
    h1Title: 'What Is Vampire Power and How Much Does It Cost?',
    breadcrumbLabel: 'Vampire Power & Standby Cost',
    description:
      'Understand standby power consumption (vampire load), continuous phantom power draw in household electronics, annual dollar costs, and smart power strip savings.',
    eyebrow: 'Standby Energy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Electric Bill Diagnostics',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Analyze your household electric statement to isolate continuous background standby power.',
    actionLabel: 'Analyze Your Household Electric Bill',
    summaryTakeaways: [
      'Vampire power (phantom load) is the electrical energy consumed by appliances and electronics while turned off or in standby mode.',
      'A typical U.S. household has 20 to 40 plugged-in devices drawing 1W to 15W continuously, accumulating 200 to 500 kWh annually ($30 to $100/year).',
      'Smart power strips auto-cut power to secondary electronics when primary devices (like TVs or computers) enter standby, eliminating continuous draw.',
    ],
    sections: [],
    sources: [
      {
        organization: 'Lawrence Berkeley National Laboratory',
        title: 'Standby Power Summary Data & Appliance Measurements',
        topic:
          'Empirical measurement of standby power draw across residential electronics and appliances',
        url: 'https://standby.lbl.gov/',
      },
      {
        organization: 'U.S. Department of Energy',
        title: 'Reducing Standby Power Losses in Home Electronics',
        topic:
          'Phantom loads, smart power strips, ENERGY STAR standby power requirements, and measurement tools',
        url: 'https://www.energy.gov/energysaver/low-power-mode-payoffs',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/how-much-electricity-does-a-television-use',
      '/guides/how-much-electricity-does-a-wifi-router-use',
      '/guides/how-much-electricity-does-a-microwave-use',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'heat-pump-vs-electric-resistance-heating-cost': {
    slug: 'heat-pump-vs-electric-resistance-heating-cost',
    href: '/guides/heat-pump-vs-electric-resistance-heating-cost',
    title: 'Heat Pump vs. Electric Resistance Heating Cost Comparison',
    h1Title: 'Heat Pump vs. Electric Resistance Heating: Cost & Efficiency Comparison',
    breadcrumbLabel: 'Heat Pump vs Resistance Heating',
    description:
      'Compare heat pump coefficient of performance (COP 2.0–4.0) with electric resistance heating (COP 1.0), outdoor temperature impacts, and heating bill savings.',
    eyebrow: 'Heating Technology Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Energy Fundamentals',
    primaryCalculatorHref: '/tools/space-heater-cost-calculator',
    primaryCalculatorLabel: 'Space Heater Cost Calculator',
    primaryCalculatorDescription:
      'Calculate heating operating expenses and compare heat pump COP efficiency with electric resistance.',
    actionLabel: 'Calculate Space Heater Operating Cost',
    summaryTakeaways: [
      'Heat pumps move existing heat from outdoor air rather than generating it from electrical resistance, achieving Coefficient of Performance (COP) ratings of 2.0 to 4.0.',
      'Electric resistance heaters (baseboards, space heaters, electric furnaces) convert 100% of electricity to heat (COP 1.0), consuming 2 to 3 times more electricity for equal heating output.',
      'In moderate climates, heat pumps reduce space heating electricity consumption by 50% to 60% compared to electric resistance heating.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Heat Pump Systems & Energy Efficiency Guide',
        topic:
          'Heat pump COP performance ratings, heating season performance factor (HSPF2), and resistance heating comparisons',
        url: 'https://www.energy.gov/energysaver/heat-pump-systems',
      },
      {
        organization: 'U.S. Energy Information Administration',
        title: 'Heating Fuel and Electricity Usage in U.S. Homes',
        topic:
          'Residential space heating energy consumption by heating fuel type and regional climate zones',
        url: 'https://www.eia.gov/consumption/residential/',
      },
    ],
    relatedRoutes: [
      '/tools/space-heater-cost-calculator',
      '/guides/how-much-does-it-cost-to-run-a-space-heater',
      '/guides/how-much-does-it-cost-to-run-an-air-conditioner',
      '/guides/how-much-does-it-cost-to-run-an-electric-water-heater',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-central-air-conditioning-use': {
    slug: 'how-much-electricity-does-central-air-conditioning-use',
    href: '/guides/how-much-electricity-does-central-air-conditioning-use',
    title: 'How Much Electricity Does Central Air Conditioning Use? (Watts, Tons & Cost)',
    h1Title: 'How Much Electricity Does Central Air Conditioning Use?',
    breadcrumbLabel: 'Central AC Electricity Usage',
    description:
      'Calculate central air conditioning power consumption (3,000W–5,000W), cooling tonnage (2.5–5.0 tons), SEER2 efficiency ratings, compressor duty cycles, and monthly electric bill impact.',
    eyebrow: 'Central Cooling Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Heating & Cooling Systems',
    primaryCalculatorHref: '/tools/ac-cost-calculator',
    primaryCalculatorLabel: 'Air Conditioner Cost Calculator',
    primaryCalculatorDescription:
      'Calculate central air conditioning operating costs based on system tonnage, SEER2 rating, and daily cooling runtime.',
    actionLabel: 'Calculate Central AC Operating Cost',
    summaryTakeaways: [
      'Central air conditioners draw 3,000W to 5,000W of electrical power (3.0 to 5.0 kW) depending on cooling capacity (2.5 to 5.0 tons / 30,000–60,000 BTU/hr).',
      'Running a 3.5-ton central AC for 8 hours daily at a 60% compressor duty cycle consumes ~17 to 24 kWh per day ($100 to $220 monthly depending on electric rates).',
      'Upgrading from SEER 10 or 13 to SEER2 16+ reduces central cooling energy consumption by 15% to 30%.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Central Air Conditioning Systems & Energy Efficiency Standards',
        topic:
          'Central AC wattage by tonnage, SEER2 efficiency standards, compressor duty cycles, and duct losses',
        url: 'https://www.energy.gov/energysaver/central-air-conditioning',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Central Air Conditioner Efficiency Specifications',
        topic:
          'SEER2 efficiency baselines, EER2 regional requirements, and variable-speed compressor performance',
        url: 'https://www.energystar.gov/products/heating_cooling/central_air_conditioners',
      },
    ],
    relatedRoutes: [
      '/tools/ac-cost-calculator',
      '/guides/how-much-does-it-cost-to-run-an-air-conditioner',
      '/guides/how-much-electricity-does-a-window-air-conditioner-use',
      '/guides/how-much-electricity-does-a-ductless-mini-split-use',
      '/guides/should-you-turn-off-the-air-conditioner-when-away',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-a-portable-air-conditioner-use': {
    slug: 'how-much-electricity-does-a-portable-air-conditioner-use',
    href: '/guides/how-much-electricity-does-a-portable-air-conditioner-use',
    title: 'How Much Electricity Does a Portable Air Conditioner Use? (Watts & SACC Cost)',
    h1Title: 'How Much Electricity Does a Portable Air Conditioner Use?',
    breadcrumbLabel: 'Portable AC Electricity Usage',
    description:
      'Discover portable air conditioner power consumption (900W–1,400W), DOE SACC cooling ratings, single-hose vs dual-hose efficiency, exhaust heat losses, and operating costs.',
    eyebrow: 'Portable Cooling Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Heating & Cooling Systems',
    primaryCalculatorHref: '/tools/ac-cost-calculator',
    primaryCalculatorLabel: 'Air Conditioner Cost Calculator',
    primaryCalculatorDescription:
      'Calculate portable air conditioner cooling costs based on rated wattage, SACC cooling capacity, and daily runtime.',
    actionLabel: 'Calculate Portable AC Operating Cost',
    summaryTakeaways: [
      'Portable air conditioners draw 900W to 1,400W of electrical power while operating.',
      'Single-hose portable AC units pull warm room air through the exhaust hose, creating negative air pressure that draws unconditioned outdoor air back into the room.',
      'Due to exhaust hose heat radiation and infiltration, portable units consume 15% to 30% more electricity per BTU of net cooling delivered than window AC units.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Portable Air Conditioner Energy Test Procedures & SACC Standards',
        topic:
          'Seasonally Adjusted Cooling Capacity (SACC), single-hose vs dual-hose infiltration heat loss, and power draw',
        url: 'https://www.energy.gov/eere/buildings/appliance-and-equipment-standards-program',
      },
      {
        organization: 'Federal Trade Commission',
        title: 'EnergyGuide Appliance Ratings for Portable Air Conditioners',
        topic:
          'Annual operating cost labels and comparative energy efficiency ratios for portable cooling',
        url: 'https://www.ftc.gov/legal-library/browse/rules/energy-water-use-labeling-consumer-information-under-energy-policy-conservation-act-energy-labeling-rule',
      },
    ],
    relatedRoutes: [
      '/tools/ac-cost-calculator',
      '/guides/how-much-electricity-does-a-window-air-conditioner-use',
      '/guides/how-much-does-it-cost-to-run-an-air-conditioner',
      '/guides/how-much-electricity-does-central-air-conditioning-use',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-a-ductless-mini-split-use': {
    slug: 'how-much-electricity-does-a-ductless-mini-split-use',
    href: '/guides/how-much-electricity-does-a-ductless-mini-split-use',
    title: 'How Much Electricity Does a Ductless Mini-Split Use? (Inverter Watts & Cost)',
    h1Title: 'How Much Electricity Does a Ductless Mini-Split Use?',
    breadcrumbLabel: 'Mini-Split Electricity Usage',
    description:
      'Calculate ductless mini-split heat pump power draw (200W idle modulation to 2,000W full load), variable-speed inverter efficiency (SEER2 18–30+), zone heating/cooling, and electric bill savings.',
    eyebrow: 'Mini-Split Energy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Heating & Cooling Systems',
    primaryCalculatorHref: '/tools/ac-cost-calculator',
    primaryCalculatorLabel: 'Air Conditioner Cost Calculator',
    primaryCalculatorDescription:
      'Estimate ductless mini-split cooling and heating operating costs based on inverter capacity and zone usage.',
    actionLabel: 'Calculate Mini-Split Operating Cost',
    summaryTakeaways: [
      'Ductless mini-split heat pumps use variable-speed inverter compressors that modulate power draw between 200W and 2,000W based on real-time room thermal load.',
      'High SEER2 (18 to 30+) and HSPF2 (9 to 12+) ratings allow ductless mini-splits to consume 25% to 40% less electricity than traditional ducted central systems.',
      'Zoned mini-split operation lets households heat or cool only occupied rooms, eliminating energy wasted conditioning empty space.',
    ],
    sections: [],
    sources: [
      {
        organization: 'ENERGY STAR',
        title: 'Ductless Mini-Split Heat Pump Efficiency Specifications',
        topic:
          'Variable-speed inverter compressor efficiency, SEER2 and HSPF2 ratings, and multi-zone heating/cooling performance',
        url: 'https://www.energystar.gov/products/heating_cooling/ductless_heating_cooling',
      },
      {
        organization: 'U.S. Department of Energy',
        title: 'Ductless Mini-Split Heat Pumps Energy Saver Guide',
        topic:
          'Inverter modulation benefits, ductless zone control savings, and cold-climate heating performance',
        url: 'https://www.energy.gov/energysaver/ductless-mini-split-heat-pumps',
      },
    ],
    relatedRoutes: [
      '/tools/ac-cost-calculator',
      '/tools/space-heater-cost-calculator',
      '/guides/how-much-electricity-does-a-heat-pump-use',
      '/guides/heat-pump-vs-electric-resistance-heating-cost',
      '/guides/how-much-electricity-does-central-air-conditioning-use',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-a-heat-pump-use': {
    slug: 'how-much-electricity-does-a-heat-pump-use',
    href: '/guides/how-much-electricity-does-a-heat-pump-use',
    title: 'How Much Electricity Does a Heat Pump Use? (Heating & Cooling kWh)',
    h1Title: 'How Much Electricity Does a Heat Pump Use?',
    breadcrumbLabel: 'Heat Pump Electricity Usage',
    description:
      'Calculate annual and monthly heat pump electricity usage (kWh) in heating and cooling modes, Coefficient of Performance (COP 2.0–4.0), defrost cycles, and backup auxiliary heat strip spikes.',
    eyebrow: 'Heat Pump Energy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Heating & Cooling Systems',
    primaryCalculatorHref: '/tools/space-heater-cost-calculator',
    primaryCalculatorLabel: 'Space Heater Cost Calculator',
    primaryCalculatorDescription:
      'Calculate seasonal heat pump heating and cooling operating costs based on system COP and outdoor temperature.',
    actionLabel: 'Calculate Heat Pump Operating Cost',
    summaryTakeaways: [
      'A residential air-source heat pump consumes 1,500W to 4,500W depending on mode, outdoor temperature, and compressor speed.',
      'In cooling mode, heat pumps function identically to central AC units (SEER2 15–22+). In heating mode, COP (2.0–4.0) delivers 2 to 4 times more thermal heat per kWh than electric resistance.',
      'When outdoor temperatures fall below the thermal balance point (e.g., <20°F), auxiliary electric resistance heat strips (5 kW to 10 kW) engage, temporarily tripling electrical power draw.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Heat Pump Systems Energy Efficiency & Seasonal Performance',
        topic:
          'Heating vs cooling kWh draw, Coefficient of Performance (COP), HSPF2 ratings, defrost cycles, and auxiliary heat strips',
        url: 'https://www.energy.gov/energysaver/heat-pump-systems',
      },
      {
        organization: 'U.S. Energy Information Administration',
        title: 'Residential Heating and Cooling Energy Consumption Survey',
        topic:
          'Annual kWh consumption for heat pump space heating and cooling by U.S. climate zone',
        url: 'https://www.eia.gov/consumption/residential/',
      },
    ],
    relatedRoutes: [
      '/tools/space-heater-cost-calculator',
      '/tools/ac-cost-calculator',
      '/guides/heat-pump-vs-electric-resistance-heating-cost',
      '/guides/how-much-electricity-does-a-ductless-mini-split-use',
      '/guides/how-much-electricity-does-an-electric-furnace-use',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-an-electric-furnace-use': {
    slug: 'how-much-electricity-does-an-electric-furnace-use',
    href: '/guides/how-much-electricity-does-an-electric-furnace-use',
    title: 'How Much Electricity Does an Electric Furnace Use? (kW, kWh & Cost)',
    h1Title: 'How Much Electricity Does an Electric Furnace Use?',
    breadcrumbLabel: 'Electric Furnace Usage',
    description:
      'Calculate electric furnace power draw (10 kW–25 kW), heating element staging, blower motor power, monthly winter kWh consumption (1,500–3,500 kWh), and operating costs.',
    eyebrow: 'Electric Furnace Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Heating & Cooling Systems',
    primaryCalculatorHref: '/tools/space-heater-cost-calculator',
    primaryCalculatorLabel: 'Space Heater Cost Calculator',
    primaryCalculatorDescription:
      'Calculate winter electric furnace operating costs based on heating capacity (kW) and daily runtime.',
    actionLabel: 'Calculate Electric Furnace Operating Cost',
    summaryTakeaways: [
      'Residential electric furnaces have high rated heating capacities between 10 kW and 25 kW (10,000W to 25,000W).',
      'Electric furnaces do not run continuously at maximum kW; multi-stage heating controls cycle heating elements on and off based on indoor thermostat demand.',
      'In cold winter climates, an electric furnace operating 5 to 8 hours daily at a 50% duty cycle consumes 1,500 to 3,000 kWh per month ($300 to $600+ monthly at 20 ¢/kWh).',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Electric Resistance Heating Systems & Furnaces',
        topic:
          'Electric furnace kW heating elements, blower motor energy draw, thermostat duty cycles, and winter heating loads',
        url: 'https://www.energy.gov/energysaver/electric-resistance-heating',
      },
      {
        organization: 'Building America Solution Center',
        title: 'Electric Furnace Staging & Space Heating System Sizing',
        topic:
          'Multi-stage heating controls, peak electrical demand, and thermal distribution efficiency',
        url: 'https://basc.pnnl.gov/',
      },
    ],
    relatedRoutes: [
      '/tools/space-heater-cost-calculator',
      '/guides/heat-pump-vs-electric-resistance-heating-cost',
      '/guides/how-much-electricity-does-electric-baseboard-heating-use',
      '/guides/how-much-electricity-does-a-heat-pump-use',
      '/guides/why-is-my-electric-bill-so-high',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-electricity-does-electric-baseboard-heating-use': {
    slug: 'how-much-electricity-does-electric-baseboard-heating-use',
    href: '/guides/how-much-electricity-does-electric-baseboard-heating-use',
    title: 'How Much Electricity Does Baseboard Heating Use? (Watts/ft & Cost)',
    h1Title: 'How Much Electricity Does Electric Baseboard Heating Use?',
    breadcrumbLabel: 'Baseboard Heating Usage',
    description:
      'Calculate electric baseboard heater power consumption (250 Watts per linear foot), room-by-room zone control, line-voltage thermostats, and winter monthly operating costs.',
    eyebrow: 'Baseboard Heating Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Heating & Cooling Systems',
    primaryCalculatorHref: '/tools/space-heater-cost-calculator',
    primaryCalculatorLabel: 'Space Heater Cost Calculator',
    primaryCalculatorDescription:
      'Calculate electric baseboard heater operating costs per room and per home based on heater length and daily runtime.',
    actionLabel: 'Calculate Baseboard Heating Cost',
    summaryTakeaways: [
      'Electric baseboard heaters draw approximately 250 Watts per linear foot of heater length (e.g., a 6-foot baseboard draws 1,500W).',
      'Baseboard heating utilizes individual room line-voltage thermostats, allowing room-by-room zone temperature control.',
      'Heating a 3-bedroom house with 8,000W of baseboard heaters operating 6 hours daily consumes ~1,440 kWh per month ($288/month at 20 ¢/kWh).',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Electric Baseboard Heaters & Zone Heating Guide',
        topic:
          'Wattage per linear foot (250W/ft), line-voltage thermostat operation, zone heating efficiency, and convective heat flow',
        url: 'https://www.energy.gov/energysaver/electric-resistance-heating',
      },
      {
        organization: 'National Renewable Energy Laboratory',
        title: 'Residential Zoned Electric Space Heating Study',
        topic:
          'Baseboard heater thermal delivery, room zoning energy impact, and heat loss dynamics',
        url: 'https://www.nrel.gov/',
      },
    ],
    relatedRoutes: [
      '/tools/space-heater-cost-calculator',
      '/guides/how-much-does-it-cost-to-run-a-space-heater',
      '/guides/heat-pump-vs-electric-resistance-heating-cost',
      '/guides/how-much-electricity-does-an-electric-furnace-use',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-much-can-a-smart-thermostat-save': {
    slug: 'how-much-can-a-smart-thermostat-save',
    href: '/guides/how-much-can-a-smart-thermostat-save',
    title: 'How Much Can a Smart Thermostat Save on Your Electric Bill?',
    h1Title: 'How Much Can a Smart Thermostat Save on Your Energy Bill?',
    breadcrumbLabel: 'Smart Thermostat Savings',
    description:
      'Discover smart thermostat energy savings (ENERGY STAR benchmarks: 8%–12% heating, 15% cooling), automated schedule setbacks, geofencing occupancy detection, and ROI payback periods.',
    eyebrow: 'Thermostat Energy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Home Efficiency & Envelope',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Analyze your household electric statement to estimate heating and cooling savings from smart thermostat setbacks.',
    actionLabel: 'Analyze Your Electric Bill',
    summaryTakeaways: [
      'According to ENERGY STAR research, certified smart thermostats save households an average of 8% to 12% on heating bills and 15% on cooling bills.',
      'Saving energy relies on automated temperature setbacks (setting the thermostat 7°F to 10°F back for 8 hours daily while asleep or away).',
      'Annual financial savings typically range from $50 to $180 depending on local utility rates, climate severity, and HVAC equipment type.',
    ],
    sections: [],
    sources: [
      {
        organization: 'ENERGY STAR',
        title: 'Smart Thermostats Energy Efficiency Specification & Savings Benchmarks',
        topic:
          'Independent energy savings field studies, 8%–12% heating / 15% cooling benchmarks, and occupancy detection algorithms',
        url: 'https://www.energystar.gov/products/heating_cooling/smart_thermostats',
      },
      {
        organization: 'U.S. Department of Energy',
        title: 'Thermostats Energy Saver Guide',
        topic:
          'Temperature setback calculations, 1% savings per degree setback for 8-hour periods, and HVAC compatibility',
        url: 'https://www.energy.gov/energysaver/thermostats',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/should-you-turn-off-the-air-conditioner-when-away',
      '/guides/how-much-electricity-does-central-air-conditioning-use',
      '/guides/how-much-electricity-does-a-heat-pump-use',
      '/guides/why-is-my-electric-bill-so-high',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'should-you-turn-off-the-air-conditioner-when-away': {
    slug: 'should-you-turn-off-the-air-conditioner-when-away',
    href: '/guides/should-you-turn-off-the-air-conditioner-when-away',
    title: 'Should You Turn Off the AC When Away? (Thermostat Setback Rules)',
    h1Title: 'Should You Turn Off the Air Conditioner When Away?',
    breadcrumbLabel: 'Turning Off AC When Away',
    description:
      'Learn whether to turn off your AC or raise the thermostat when away, short vs all-day absences, indoor humidity control, heat gain thermodynamics, and safe temperature limits (78°F–80°F).',
    eyebrow: 'AC Strategy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Home Efficiency & Envelope',
    primaryCalculatorHref: '/tools/ac-cost-calculator',
    primaryCalculatorLabel: 'Air Conditioner Cost Calculator',
    primaryCalculatorDescription:
      'Calculate air conditioner operating costs under continuous vs setback thermostat schedules.',
    actionLabel: 'Calculate AC Operating Cost',
    summaryTakeaways: [
      'For all-day absences (8+ hours), raising your thermostat by 7°F to 10°F (to 78°F–80°F) consumes less total electricity than leaving the AC running at 72°F all day.',
      'Heat gain physics shows that heat enters a home slower when indoor temperature is closer to outdoor temperature, reducing total daily thermal heat transfer.',
      'Completely turning off the AC in humid climates is not recommended because indoor humidity will rise, increasing risk of mold and forcing the AC to work harder during recovery.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Thermostat Setbacks & Air Conditioning Operating Efficiency',
        topic:
          'Thermostat setback thermodynamics, indoor heat gain transfer rates, and humidity control safety boundaries',
        url: 'https://www.energy.gov/energysaver/thermostats',
      },
      {
        organization: 'Building America Solution Center',
        title: 'HVAC Temperature Recovery & Indoor Relative Humidity Limits',
        topic:
          'Indoor moisture removal, compressor runtime during temperature recovery, and mold prevention guidelines',
        url: 'https://basc.pnnl.gov/',
      },
    ],
    relatedRoutes: [
      '/tools/ac-cost-calculator',
      '/guides/how-much-can-a-smart-thermostat-save',
      '/guides/how-much-electricity-does-central-air-conditioning-use',
      '/guides/how-much-does-it-cost-to-run-an-air-conditioner',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-air-leaks-increase-your-energy-bill': {
    slug: 'how-air-leaks-increase-your-energy-bill',
    href: '/guides/how-air-leaks-increase-your-energy-bill',
    title: 'How Air Leaks Increase Your Energy Bill (Sealing & Infiltration)',
    h1Title: 'How Air Leaks Increase Your Electric Bill',
    breadcrumbLabel: 'Air Leaks & Draft Costs',
    description:
      'Discover how air infiltration and exfiltration force HVAC systems to work harder, the stack effect in multi-story homes, leak locations, weatherstripping ROI, and blower door test benefits.',
    eyebrow: 'Air Sealing Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Home Efficiency & Envelope',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Analyze your household electric statement to estimate potential bill reductions from professional air sealing.',
    actionLabel: 'Analyze Your Electric Bill',
    summaryTakeaways: [
      'Unsealed air leaks around windows, doors, attic bypasses, and ductwork account for 15% to 30% of average home heating and cooling energy loss.',
      'The "stack effect" causes warm air to rise and escape through attic penetrations during winter, pulling cold outdoor air in through basement and ground-floor cracks.',
      'According to DOE estimates, professional air sealing and weatherstripping can reduce heating and cooling costs by 15% to 20%.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Air Sealing Your Home & Air Infiltration Reduction',
        topic:
          'Building envelope infiltration loss, stack effect physics, duct leakage, weatherstripping ROI, and blower door testing',
        url: 'https://www.energy.gov/energysaver/air-sealing-your-home',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Seal and Insulate Guide for Home Energy Efficiency',
        topic:
          'Attic air sealing locations, chimney bypasses, recessed light penetrations, and energy bill savings',
        url: 'https://www.energystar.gov/saveathome/seal_insulate',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/how-attic-insulation-affects-your-energy-bill',
      '/guides/why-is-my-electric-bill-high-when-usage-is-low',
      '/guides/why-is-my-electric-bill-so-high',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-attic-insulation-affects-your-energy-bill': {
    slug: 'how-attic-insulation-affects-your-energy-bill',
    href: '/guides/how-attic-insulation-affects-your-energy-bill',
    title: 'How Attic Insulation Affects Your Energy Bill (R-Value & Cost)',
    h1Title: 'How Attic Insulation Affects Your Energy Bill',
    breadcrumbLabel: 'Attic Insulation & R-Value',
    description:
      'Understand R-value thermal resistance (R-30 to R-60), climate zone insulation recommendations, air sealing before insulating, thermal bridging, and HVAC energy bill savings.',
    eyebrow: 'Insulation Energy Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Home Efficiency & Envelope',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Estimate monthly heating and cooling savings from upgrading attic insulation to recommended DOE R-values.',
    actionLabel: 'Analyze Your Electric Bill',
    summaryTakeaways: [
      'Attic insulation retards conductive thermal heat flow, keeping heat inside during winter and blocking attic heat from radiating into living spaces during summer.',
      'The Department of Energy recommends attic insulation levels between R-30 (10–14 inches) and R-60 (16–22 inches) depending on climate zone.',
      'Upgrading under-insulated attics (e.g., from R-11 to R-49) reduces home heating and cooling energy usage by an estimated 15% to 20%.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Attic Insulation Guide & Recommended R-Values by Climate Zone',
        topic:
          'R-value thermal resistance standards, climate zone recommendations (Zones 1–7), conductive heat transfer, and energy savings',
        url: 'https://www.energy.gov/energysaver/insulation',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Rule of Thumb for Insulation Depths & Air Sealing Requirements',
        topic:
          'Measuring existing insulation depth, air sealing attic floor penetrations prior to insulation, and ROI',
        url: 'https://www.energystar.gov/saveathome/seal_insulate',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/how-air-leaks-increase-your-energy-bill',
      '/guides/how-much-electricity-does-central-air-conditioning-use',
      '/guides/how-much-electricity-does-a-heat-pump-use',
      '/appliances',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-to-read-an-electric-bill-line-by-line': {
    slug: 'how-to-read-an-electric-bill-line-by-line',
    href: '/guides/how-to-read-an-electric-bill-line-by-line',
    title: 'How to Read an Electric Bill Line by Line: Line Item Guide',
    h1Title: 'How to Read an Electric Bill Line by Line',
    breadcrumbLabel: 'Reading Your Electric Bill',
    description:
      'Understand every section of your utility statement, including supply vs. delivery charges, customer fees, meter readings, billing cycles, riders, and taxes.',
    eyebrow: 'Utility Billing Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Electric Bill Diagnostics & Rates',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Upload or enter your statement line items to calculate your true effective cost per kWh.',
    actionLabel: 'Analyze Your Electric Bill',
    summaryTakeaways: [
      'Electric bills break down into supply (generation), delivery (transmission/distribution), fixed customer charges, riders, and government taxes.',
      'Supply charges pay for generating electricity, while delivery charges fund utility power lines, substations, and local grid maintenance.',
      'Calculating effective rate ($/kWh) requires dividing total eligible bill charges by total billed kilowatt-hours.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Energy Information Administration',
        title: 'Understanding Your Electric Utility Bill Components',
        topic: 'Residential electricity bill breakdown, supply vs delivery charges, and fixed fees',
        url: 'https://www.eia.gov/energyexplained/electricity/prices-and-factors-affecting-prices.php',
      },
      {
        organization: 'Federal Energy Regulatory Commission',
        title: 'Consumer Guide to Electric Power Distribution & Generation Charges',
        topic:
          'Transmission rates, wholesale electricity markets, and retail utility billing structures',
        url: 'https://www.ferc.gov/electric',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/electricity-supply-charge-vs-delivery-charge',
      '/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill',
      '/guides/how-billing-cycle-length-affects-electricity-bills',
      '/electricity-rates',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'what-is-a-time-of-use-electricity-rate': {
    slug: 'what-is-a-time-of-use-electricity-rate',
    href: '/guides/what-is-a-time-of-use-electricity-rate',
    title: 'What Is a Time-of-Use (TOU) Electricity Rate? Schedule & Savings',
    h1Title: 'What Is a Time-of-Use Electricity Rate?',
    breadcrumbLabel: 'Time-of-Use Rates',
    description:
      'Learn how time-of-use (TOU) utility tariffs charge varying electricity rates during peak, off-peak, and shoulder hours to incentivize off-peak load shifting.',
    eyebrow: 'Utility Rates Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Electric Bill Diagnostics & Rates',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Compare flat-rate vs. time-of-use monthly electric bill costs based on your appliance schedules.',
    actionLabel: 'Analyze TOU Rates',
    summaryTakeaways: [
      'Time-of-use (TOU) rates charge different kWh prices based on the time of day, day of the week, and season.',
      'Peak hours occur when grid electricity demand is highest (typically late afternoon to evening in summer), resulting in higher rates.',
      'Shifting major electricity usage (EV charging, laundry, dishwasher) to off-peak hours can lower monthly electricity costs.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Time-of-Use Rate Structures & Demand Response Programs',
        topic:
          'Time-variable electricity pricing, peak period schedules, and load shifting incentives',
        url: 'https://www.energy.gov/cmei/femp/demand-response-and-time-variable-pricing-programs',
      },
      {
        organization: 'National Renewable Energy Laboratory',
        title: 'Utility Rate Database & Time-of-Use Tariff Analysis',
        topic: 'Residential TOU schedules, seasonal rate variations, and smart meter interval data',
        url: 'https://www.nrel.gov/',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/peak-vs-off-peak-electricity-hours-explained',
      '/guides/fixed-vs-variable-electricity-rates',
      '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
      '/electricity-rates',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'peak-vs-off-peak-electricity-hours-explained': {
    slug: 'peak-vs-off-peak-electricity-hours-explained',
    href: '/guides/peak-vs-off-peak-electricity-hours-explained',
    title: 'Peak vs. Off-Peak Electricity Hours Explained: Hours & Savings',
    h1Title: 'Peak vs. Off-Peak Electricity Hours Explained',
    breadcrumbLabel: 'Peak vs. Off-Peak Hours',
    description:
      'Discover when utility peak electricity hours occur, how peak pricing works across winter and summer seasons, and how to shift heavy appliance usage off-peak.',
    eyebrow: 'Peak Hours Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Electric Bill Diagnostics & Rates',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Calculate potential monthly savings from shifting high-wattage appliance usage to off-peak hours.',
    actionLabel: 'Calculate Off-Peak Savings',
    summaryTakeaways: [
      'Peak hours are scheduled daily time windows when total utility grid demand reaches maximum levels.',
      'Peak period timing varies by region, season, and utility tariff—some utilities set late afternoon/evening summer windows or morning/evening winter windows, while others use different schedules.',
      'Off-peak hours (nights and weekends) offer lower electricity prices when grid capacity is underutilized.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Energy Information Administration',
        title: 'Daily and Seasonal Electricity Demand Profiles',
        topic: 'Grid peak demand curves, regional load profiles, and peak pricing mechanisms',
        url: 'https://www.eia.gov/todayinenergy/detail.php?id=42915',
      },
      {
        organization: 'Federal Energy Regulatory Commission',
        title: 'Demand Response & Time-Variable Rate Design in Regional Markets',
        topic: 'Peak hour definitions, critical peak pricing, and consumer demand elasticity',
        url: 'https://www.ferc.gov/electric',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/what-is-a-time-of-use-electricity-rate',
      '/guides/how-much-electricity-does-central-air-conditioning-use',
      '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
      '/electricity-rates',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'fixed-vs-variable-electricity-rates': {
    slug: 'fixed-vs-variable-electricity-rates',
    href: '/guides/fixed-vs-variable-electricity-rates',
    title: 'Fixed vs. Variable Electricity Rates: Which Is Better?',
    h1Title: 'Fixed vs. Variable Electricity Rates',
    breadcrumbLabel: 'Fixed vs. Variable Rates',
    description:
      'Compare fixed-rate supply plans vs. variable market electricity contracts, contract renewal terms, cancellation fees, and retail choice options.',
    eyebrow: 'Rate Selection Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Electric Bill Diagnostics & Rates',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Evaluate supply contract options by calculating bill impacts across fixed and variable rate scenarios.',
    actionLabel: 'Analyze Rate Plans',
    summaryTakeaways: [
      'Fixed-rate supply plans lock in a constant cost per kWh for the duration of a contract (typically 12 to 36 months).',
      'Variable-rate supply plans fluctuate monthly based on wholesale energy market prices, weather conditions, and utility adjustments.',
      'Delivery charges (utility distribution fees) remain separate and are regulated regardless of whether you choose a fixed or variable supply rate.',
    ],
    sections: [],
    sources: [
      {
        organization: 'Federal Trade Commission',
        title: 'Shopping for Competitive Retail Electricity Contracts',
        topic:
          'Retail choice, fixed vs variable supply plans, early termination fees, and contract terms',
        url: 'https://consumer.ftc.gov/articles/shopping-electricity-or-natural-gas',
      },
      {
        organization: 'U.S. Energy Information Administration',
        title: 'Retail Electricity Electricity Market Restructuring & Pricing',
        topic: 'Competitive supply markets, price volatility, and default utility service rates',
        url: 'https://www.eia.gov/electricity/policies/restructuring/restructure_app.html',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/electricity-supply-charge-vs-delivery-charge',
      '/guides/why-electricity-rates-change',
      '/electricity-rates',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'what-is-a-demand-charge-on-an-electric-bill': {
    slug: 'what-is-a-demand-charge-on-an-electric-bill',
    href: '/guides/what-is-a-demand-charge-on-an-electric-bill',
    title: 'What Is a Demand Charge on an Electric Bill? (kW vs. kWh)',
    h1Title: 'What Is a Demand Charge on an Electric Bill?',
    breadcrumbLabel: 'Demand Charges Explained',
    description:
      'Learn how electric demand charges ($/kW) bill for maximum 15-to-30-minute power spikes separately from total energy consumption (kWh).',
    eyebrow: 'Demand Charge Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Electric Bill Diagnostics & Rates',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Analyze your peak demand (kW) and energy consumption (kWh) to evaluate demand charge billing impacts.',
    actionLabel: 'Analyze Demand Charges',
    summaryTakeaways: [
      'Demand charges ($/kW) measure the maximum rate of electricity consumption over a short window (typically 15 to 30 minutes) during a billing cycle.',
      'Energy charges ($/kWh) measure total volume consumed over time, whereas demand charges measure peak grid capacity draw.',
      'While demand charges are standard for commercial customers, select residential tariffs and EV/electrification pilots also incorporate demand charges.',
    ],
    sections: [],
    sources: [
      {
        organization: 'National Renewable Energy Laboratory',
        title: 'Understanding Electric Utility Demand Charges',
        topic:
          'Peak demand kW measurement, 15-minute billing windows, and commercial/residential rate structures',
        url: 'https://www.nrel.gov/docs/fy17osti/68942.pdf',
      },
      {
        organization: 'U.S. Department of Energy',
        title: 'Demand Management & Load Management Strategies',
        topic: 'Peak power draw, coincidence factors, and electrification load controls',
        url: 'https://www.energy.gov/cmei/femp/demand-response-and-time-variable-pricing-programs',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/kw-vs-kwh-explained',
      '/guides/what-is-a-time-of-use-electricity-rate',
      '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
      '/electricity-rates',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'estimated-vs-actual-meter-reading': {
    slug: 'estimated-vs-actual-meter-reading',
    href: '/guides/estimated-vs-actual-meter-reading',
    title: 'Estimated vs. Actual Meter Reading: Why Bills Spike & Fixes',
    h1Title: 'Estimated vs. Actual Meter Reading',
    breadcrumbLabel: 'Estimated Meter Readings',
    description:
      'Understand the difference between actual meter readings and estimated utility statements, true-up bills, smart meter interval data, and meter access rules.',
    eyebrow: 'Meter Reading Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Electric Bill Diagnostics & Rates',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Identify whether an estimated meter reading caused a sudden electric bill increase or catch-up adjustment.',
    actionLabel: 'Analyze Meter Reading',
    summaryTakeaways: [
      'An actual meter reading records physical cumulative kWh from a smart meter or manual reader on your billing date.',
      'An estimated meter reading uses historical usage and weather patterns when physical or wireless meter access is interrupted.',
      'When an actual reading follows several estimated bills, a true-up adjustment occurs—which can trigger a sudden bill increase or credit.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Energy Information Administration',
        title: 'Smart Meter Deployment & Automated Metering Infrastructure (AMI)',
        topic:
          'Advanced metering infrastructure, interval data collection, and estimated billing practices',
        url: 'https://www.eia.gov/electricity/data/eia861/',
      },
      {
        organization: 'Federal Energy Regulatory Commission',
        title: 'Consumer Standards for Utility Meter Reading & Billing Accuracy',
        topic:
          'Meter reading access regulations, estimation algorithms, and customer dispute rights',
        url: 'https://www.ferc.gov/electric',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/why-is-my-electric-bill-so-high',
      '/guides/how-billing-cycle-length-affects-electricity-bills',
      '/guides/how-to-read-an-electric-bill-line-by-line',
      '/electricity-rates',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-budget-billing-works': {
    slug: 'how-budget-billing-works',
    href: '/guides/how-budget-billing-works',
    title: 'How Budget Billing Works: Equal Payment Plans Explained',
    h1Title: 'How Budget Billing Works',
    breadcrumbLabel: 'Budget Billing Guide',
    description:
      'Discover how utility budget billing (balanced payment plans) smooths seasonal heating and cooling electric bill spikes into predictable monthly amounts.',
    eyebrow: 'Budget Billing Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Electric Bill Diagnostics & Rates',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Calculate average annual monthly utility payments to compare against budget billing plan offers.',
    actionLabel: 'Calculate Average Monthly Spend',
    summaryTakeaways: [
      'Budget billing (levelized payment plans) calculates a fixed monthly bill based on your past 12 months of electricity usage.',
      'Budget billing does not reduce total kWh consumed or lower your electricity rate; it merely evens out summer and winter bill spikes.',
      'Utilities periodically recalculate monthly budget amounts and perform an annual true-up reconciliation for accumulated credits or debits.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Department of Energy',
        title: 'Managing Household Energy Expenses & Equal Payment Plans',
        topic:
          'Levelized billing methods, annual reconciliation, deferred balance accounts, and seasonal smoothing',
        url: 'https://www.energy.gov/energysaver/managing-your-utility-bills',
      },
      {
        organization: 'U.S. Energy Information Administration',
        title: 'Seasonal Variations in Residential Electricity Expenditures',
        topic:
          'Heating and cooling seasonal peak demand, expenditure fluctuations, and budget billing uptake',
        url: 'https://www.eia.gov/consumption/residential/',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/why-is-my-electric-bill-so-high',
      '/guides/how-to-read-an-electric-bill-line-by-line',
      '/electricity-rates',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'why-electricity-rates-change': {
    slug: 'why-electricity-rates-change',
    href: '/guides/why-electricity-rates-change',
    title: 'Why Electricity Rates Change: Causes of Price Increases',
    h1Title: 'Why Electricity Rates Change',
    breadcrumbLabel: 'Why Rates Change',
    description:
      'Learn why residential electricity rates increase, covering fuel costs, power grid investments, weather extremes, regulatory rate cases, and inflation.',
    eyebrow: 'Rate Drivers Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Electric Bill Diagnostics & Rates',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Determine whether your bill increase was caused by a rate increase ($/kWh) or higher energy consumption (kWh).',
    actionLabel: 'Analyze Rate Increases',
    summaryTakeaways: [
      'Electricity rate changes are driven by fuel generation costs (natural gas, coal), grid maintenance, regulatory approvals, and extreme weather.',
      'A rate increase ($/kWh rate change) is distinct from a usage increase (higher kWh volume drawn by HVAC or appliances).',
      'Regulated electric utilities must submit formal rate cases to state public utility commissions before raising base residential rates.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Energy Information Administration',
        title: 'Factors Affecting Electricity Prices & Cost Components',
        topic:
          'Fuel generation costs, transmission/distribution grid investments, regulatory rate cases, and taxes',
        url: 'https://www.eia.gov/energyexplained/electricity/prices-and-factors-affecting-prices.php',
      },
      {
        organization: 'Federal Energy Regulatory Commission',
        title: 'Electric Power Markets & Wholesale Cost Dynamics',
        topic:
          'Wholesale power market pricing, generation capacity markets, and transmission cost allocations',
        url: 'https://www.ferc.gov/electric',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/why-is-my-electric-bill-so-high',
      '/guides/fuel-adjustment-charges-and-utility-riders-explained',
      '/electricity-rates',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'fuel-adjustment-charges-and-utility-riders-explained': {
    slug: 'fuel-adjustment-charges-and-utility-riders-explained',
    href: '/guides/fuel-adjustment-charges-and-utility-riders-explained',
    title: 'Fuel Adjustment Charges & Utility Riders Explained: Line Items',
    h1Title: 'Fuel Adjustment Charges and Utility Riders Explained',
    breadcrumbLabel: 'Fuel Adjustments & Riders',
    description:
      'Understand variable line items on your electric bill, including fuel adjustment clauses (FAC), purchased power riders, storm recovery fees, and environmental charges.',
    eyebrow: 'Utility Riders Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Electric Bill Diagnostics & Rates',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Separate base energy charges from variable utility riders and fuel adjustment line items.',
    actionLabel: 'Analyze Utility Riders',
    summaryTakeaways: [
      'Fuel adjustment clauses (FAC) pass fluctuating fuel costs (such as natural gas or purchased power) directly to consumers without a full rate case.',
      'Utility riders are temporary or recurring line-item surcharges that fund specific projects, such as storm damage recovery, grid upgrades, or energy efficiency programs.',
      'Riders and fuel adjustments are regulated by state public utility commissions and adjust monthly or quarterly.',
    ],
    sections: [],
    sources: [
      {
        organization: 'U.S. Energy Information Administration',
        title: 'Fuel Cost Adjustment Clauses & Variable Utility Surcharges',
        topic:
          'Fuel adjustment clauses, purchased power adjustments, and state regulatory oversight',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        organization: 'Federal Energy Regulatory Commission',
        title: 'Transmission & Distribution Rider Cost Recovery Standards',
        topic:
          'Grid modernization riders, securitization bonds, and environmental compliance surcharges',
        url: 'https://www.ferc.gov/electric',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/how-to-read-an-electric-bill-line-by-line',
      '/guides/why-electricity-rates-change',
      '/electricity-rates',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
  'how-net-metering-affects-your-electric-bill': {
    slug: 'how-net-metering-affects-your-electric-bill',
    href: '/guides/how-net-metering-affects-your-electric-bill',
    title: 'How Net Metering Affects Your Electric Bill: Credits & Rules',
    h1Title: 'How Net Metering Affects Your Electric Bill',
    breadcrumbLabel: 'Net Metering & Solar Credits',
    description:
      "Learn how rooftop solar net metering (and state-specific tariffs like California's Net Billing Tariff, commonly called the Solar Billing Plan or NEM 3) calculates imported vs. exported kWh, bill credits, annual true-ups, minimum bills, and fixed customer fees.",
    eyebrow: 'Solar Billing Guide',
    datePublished: '2026-07-26',
    updatedAt: '2026-07-26',
    category: 'Electric Bill Diagnostics & Rates',
    primaryCalculatorHref: '/electricity-bill-analyzer',
    primaryCalculatorLabel: 'Electricity Bill Analyzer',
    primaryCalculatorDescription:
      'Analyze net grid energy consumption (Imported kWh − Exported kWh) and monthly utility minimum charges.',
    actionLabel: 'Analyze Solar Net Metering',
    summaryTakeaways: [
      'Net metering tracks the bi-directional flow of electricity: kWh imported from the grid minus surplus solar kWh exported back to the grid.',
      "Compensation structures vary by state and utility—ranging from classic 1:1 full retail rate credits to state-specific net-billing tariffs (such as California's Net Billing Tariff / NEM 3, which succeeded NEM 2.0 on April 15, 2023).",
      'Net metering does not eliminate all electric charges; solar customers still pay fixed monthly customer fees, grid interconnection charges, and minimum bills.',
    ],
    sections: [],
    sources: [
      {
        organization: 'California Public Utilities Commission',
        title: 'Net Billing Tariff Decision D.22-12-056 (Proceeding R.20-08-020)',
        topic:
          'Net Billing Tariff adopted via Decision D.22-12-056 in proceeding R.20-08-020, Solar Billing Plan rules, and April 15, 2023 transition',
        url: 'https://www.cpuc.ca.gov/nemrevisit',
      },
      {
        organization: 'National Renewable Energy Laboratory',
        title: 'Net Energy Metering (NEM) Policy & Compensation Models',
        topic:
          'Bi-directional metering, 1:1 retail credit, avoided cost compensation, and annual true-up rules',
        url: 'https://www.nrel.gov/state-local-tribal/net-metering.html',
      },
      {
        organization: 'U.S. Department of Energy',
        title: 'Homeowner Guide to Solar Net Metering & Utility Interconnection',
        topic:
          'Imported vs exported kWh, grid interconnection fees, minimum monthly bills, and TOU interaction',
        url: 'https://www.energy.gov/eere/solar/homeowners-guide-going-solar',
      },
    ],
    relatedRoutes: [
      '/electricity-bill-analyzer',
      '/guides/how-to-read-an-electric-bill-line-by-line',
      '/guides/what-is-a-time-of-use-electricity-rate',
      '/electricity-rates',
      '/data-sources',
    ],
    sitemapEligible: true,
    adEligible: true,
  },
};

export const guideSlugs = Object.keys(energyGuides);

export const GUIDE_ROUTES = guideSlugs.map((slug) => `/guides/${slug}` as const);
