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
};

export const guideSlugs = Object.keys(energyGuides);
