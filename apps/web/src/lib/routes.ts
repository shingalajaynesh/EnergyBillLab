export type RouteGroup = 'tools' | 'research' | 'company' | 'legal';

export type PublicRoute = {
  description: string;
  group: RouteGroup;
  href: `/${string}`;
  label: string;
  nav?: boolean;
  sitemap?: boolean;
};

export const publicRoutes = [
  {
    description: 'Independent home energy tools, calculators, and transparent rate methodology.',
    group: 'company',
    href: '/',
    label: 'Home',
    sitemap: true,
  },
  {
    description:
      'Public energy cost tools and calculators for electricity bills and appliance usage.',
    group: 'tools',
    href: '/tools',
    label: 'Tools',
    nav: true,
    sitemap: true,
  },
  {
    description:
      'Compare two billing periods, normalize usage by billing days, estimate your all-in cost per kWh, and understand bill changes.',
    group: 'tools',
    href: '/electricity-bill-analyzer',
    label: 'Electricity Bill Analyzer',
    sitemap: true,
  },
  {
    description:
      'Estimate the electricity usage and operating cost of any household appliance based on wattage, usage hours, and duty cycle.',
    group: 'tools',
    href: '/tools/appliance-energy-cost-calculator',
    label: 'Appliance Energy Cost Calculator',
    sitemap: true,
  },
  {
    description:
      'Estimate air conditioner electricity usage (kWh) and operating cost using cooling capacity (BTU/hr), EER efficiency, wattage, and duty cycle.',
    group: 'tools',
    href: '/tools/ac-cost-calculator',
    label: 'Air Conditioner Cost Calculator',
    sitemap: true,
  },
  {
    description:
      'Estimate electricity usage (kWh) and operating costs for one or more electric space heaters based on wattage, quantity, runtime, and duty cycle.',
    group: 'tools',
    href: '/tools/space-heater-cost-calculator',
    label: 'Space Heater Cost Calculator',
    sitemap: true,
  },
  {
    description:
      'Calculate EV home charging electricity usage (kWh), grid charging losses, session costs, and cost per mile based on battery capacity, SoC, charging efficiency, and utility rates.',
    group: 'tools',
    href: '/tools/ev-home-charging-cost-calculator',
    label: 'EV Home Charging Cost Calculator',
    sitemap: true,
  },
  {
    description:
      'Calculate monthly and annual electricity costs for your refrigerator using rated power, compressor cycling percentage, or official EnergyGuide annual kWh benchmarks.',
    group: 'tools',
    href: '/tools/refrigerator-cost-calculator',
    label: 'Refrigerator Cost Calculator',
    sitemap: true,
  },
  {
    description:
      'Calculate electric clothes dryer electricity cost per laundry load, weekly spending, and annual kWh consumption based on element wattage, cycle length, and local utility rates.',
    group: 'tools',
    href: '/tools/clothes-dryer-cost-calculator',
    label: 'Clothes Dryer Cost Calculator',
    sitemap: true,
  },
  {
    description:
      'Calculate monthly and annual electricity costs for electric-resistance water heaters using element wattage ratings, active daily heating hours, and local state utility rates.',
    group: 'tools',
    href: '/tools/electric-water-heater-cost-calculator',
    label: 'Electric Water Heater Cost Calculator',
    sitemap: true,
  },
  {
    description:
      'Calculate daily, monthly, and seasonal electricity costs for residential pool pumps using electrical input wattage, filtration schedule hours, and utility power rates.',
    group: 'tools',
    href: '/tools/pool-pump-cost-calculator',
    label: 'Pool Pump Cost Calculator',
    sitemap: true,
  },
  {
    description:
      'Calculate monthly and annual electricity costs for basement and room dehumidifiers using compressor wattage, humidistat cycling duty cycle, and local utility electricity rates.',
    group: 'tools',
    href: '/tools/dehumidifier-cost-calculator',
    label: 'Dehumidifier Cost Calculator',
    sitemap: true,
  },
  {
    description:
      'Original, source-led research reports analyzing U.S. residential electricity rates and household energy trends.',
    group: 'research',
    href: '/research',
    label: 'Research',
    nav: true,
    sitemap: true,
  },
  {
    description:
      'National U.S. residential electricity rate report analyzing state rankings, monthly price shifts, and household energy charge benchmarks.',
    group: 'research',
    href: '/research/us-residential-electricity-rate-report',
    label: 'U.S. Residential Electricity-Rate Report',
    sitemap: true,
  },
  {
    description:
      'Residential electricity rate benchmarks and U.S. state averages with EIA source attribution.',
    group: 'research',
    href: '/electricity-rates',
    label: 'Electricity Rates',
    nav: true,
    sitemap: true,
  },
  {
    description:
      'California residential electricity rates, average monthly energy bills, and EIA trends.',
    group: 'research',
    href: '/electricity-rates/california',
    label: 'California Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Texas residential electricity rates, ERCOT grid context, and monthly power costs.',
    group: 'research',
    href: '/electricity-rates/texas',
    label: 'Texas Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Florida residential electricity rates, utility fuel adjustments, and monthly AC costs.',
    group: 'research',
    href: '/electricity-rates/florida',
    label: 'Florida Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'New York residential electricity rates, NYC vs Upstate drivers, and EIA benchmarks.',
    group: 'research',
    href: '/electricity-rates/new-york',
    label: 'New York Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Pennsylvania residential electricity rates, PAPUC Shop for Power context, and trends.',
    group: 'research',
    href: '/electricity-rates/pennsylvania',
    label: 'Pennsylvania Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Illinois residential electricity rates, ComEd and Ameren supply charges, and nuclear data.',
    group: 'research',
    href: '/electricity-rates/illinois',
    label: 'Illinois Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Ohio residential electricity rates, PUCO Choice benchmarks, and monthly power costs.',
    group: 'research',
    href: '/electricity-rates/ohio',
    label: 'Ohio Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Georgia residential electricity rates, Georgia Power baseline tariffs, and Vogtle data.',
    group: 'research',
    href: '/electricity-rates/georgia',
    label: 'Georgia Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'North Carolina residential electricity rates, Duke Energy tariffs, and solar growth.',
    group: 'research',
    href: '/electricity-rates/north-carolina',
    label: 'North Carolina Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Michigan residential electricity rates, DTE and Consumers Energy tariffs, and EIA trends.',
    group: 'research',
    href: '/electricity-rates/michigan',
    label: 'Michigan Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Arizona residential electricity rates, average monthly AC bills, and ACC tariffs.',
    group: 'research',
    href: '/electricity-rates/arizona',
    label: 'Arizona Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Virginia residential electricity rates, Dominion Energy tariffs, and VCEA targets.',
    group: 'research',
    href: '/electricity-rates/virginia',
    label: 'Virginia Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Washington residential electricity rates, hydroelectric benchmarks, and CETA rules.',
    group: 'research',
    href: '/electricity-rates/washington',
    label: 'Washington Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'New Jersey residential electricity rates, BGS auction benchmarks, and BPU context.',
    group: 'research',
    href: '/electricity-rates/new-jersey',
    label: 'New Jersey Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Massachusetts residential electricity rates, ISO New England drivers, and DPU tariffs.',
    group: 'research',
    href: '/electricity-rates/massachusetts',
    label: 'Massachusetts Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Tennessee residential electricity rates, TVA wholesale power benchmarks, and LPC context.',
    group: 'research',
    href: '/electricity-rates/tennessee',
    label: 'Tennessee Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Indiana residential electricity rates, IURC utility regulation, and generation data.',
    group: 'research',
    href: '/electricity-rates/indiana',
    label: 'Indiana Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Missouri residential electricity rates, Ameren and Evergy tariffs, and MPSC rules.',
    group: 'research',
    href: '/electricity-rates/missouri',
    label: 'Missouri Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Maryland residential electricity rates, Maryland PSC choice benchmarks, and PJM context.',
    group: 'research',
    href: '/electricity-rates/maryland',
    label: 'Maryland Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Wisconsin residential electricity rates, PSCW regulated tariffs, and We Energies data.',
    group: 'research',
    href: '/electricity-rates/wisconsin',
    label: 'Wisconsin Electricity Rates',
    sitemap: true,
  },
  {
    description:
      'Appliance power consumption data, typical wattage benchmarks, and operating cost guides.',
    group: 'research',
    href: '/appliances',
    label: 'Appliances',
    nav: true,
    sitemap: true,
  },
  {
    description:
      'Practical guides for diagnosing high electric bills, seasonal spikes, and utility statement charges.',
    group: 'research',
    href: '/guides',
    label: 'Guides',
    nav: true,
    sitemap: true,
  },
  {
    description:
      'Diagnose sudden electric bill increases by separating kWh usage spikes, rate adjustments, and billing cycle length.',
    group: 'research',
    href: '/guides/why-is-my-electric-bill-so-high',
    label: 'Why Is My Electric Bill So High?',
    sitemap: true,
  },
  {
    description:
      'Understand household appliance wattage, daily runtime, compressor duty cycles, and monthly kWh costs.',
    group: 'research',
    href: '/guides/how-much-electricity-do-household-appliances-use',
    label: 'How Much Electricity Do Household Appliances Use?',
    sitemap: true,
  },
  {
    description:
      'Calculate air conditioner electricity cost (kWh) using cooling capacity (BTU/hr), EER/SEER efficiency, and duty cycles.',
    group: 'research',
    href: '/guides/how-much-does-it-cost-to-run-an-air-conditioner',
    label: 'How Much Does It Cost to Run an Air Conditioner?',
    sitemap: true,
  },
  {
    description:
      'Compare 750W vs 1,500W electric space heater operating costs, hourly kWh rates, and thermostat duty cycles.',
    group: 'research',
    href: '/guides/how-much-does-it-cost-to-run-a-space-heater',
    label: 'How Much Does It Cost to Run a Space Heater?',
    sitemap: true,
  },
  {
    description:
      'Calculate EV home charging costs per session, per mile, and per month based on battery kWh and charging efficiency.',
    group: 'research',
    href: '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
    label: 'How Much Does It Cost to Charge an EV at Home?',
    sitemap: true,
  },
  {
    description:
      'Calculate refrigerator electricity consumption (kWh) and monthly operating cost using EnergyGuide annual ratings, compressor duty cycles, and rated power draw.',
    group: 'research',
    href: '/guides/how-much-electricity-does-a-refrigerator-use',
    label: 'How Much Electricity Does a Refrigerator Use?',
    sitemap: true,
  },
  {
    description:
      'Calculate 240V electric clothes dryer cost per load, weekly spending, and annual electricity consumption based on rated wattage and laundry frequency.',
    group: 'research',
    href: '/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer',
    label: 'How Much Does It Cost to Run an Electric Clothes Dryer?',
    sitemap: true,
  },
  {
    description:
      'Calculate electric resistance tank water heating costs per day, month, and year using element wattage, active heating hours, and utility rates.',
    group: 'research',
    href: '/guides/how-much-does-it-cost-to-run-an-electric-water-heater',
    label: 'How Much Does It Cost to Run an Electric Water Heater?',
    sitemap: true,
  },
  {
    description:
      'Calculate residential pool pump electricity costs per day, month, and season based on electrical input Watts, filtration hours per day, and utility rates.',
    group: 'research',
    href: '/guides/how-much-does-it-cost-to-run-a-pool-pump',
    label: 'How Much Does It Cost to Run a Pool Pump?',
    sitemap: true,
  },
  {
    description:
      'Calculate basement and room dehumidifier electricity costs per day, month, and season based on rated wattage, humidistat duty cycle, and utility rates.',
    group: 'research',
    href: '/guides/how-much-does-it-cost-to-run-a-dehumidifier',
    label: 'How Much Does It Cost to Run a Dehumidifier?',
    sitemap: true,
  },
  {
    description: 'Energy cost comparisons, rate benchmarks, and appliance efficiency evaluations.',
    group: 'research',
    href: '/comparisons',
    label: 'Comparisons',
    nav: true,
    sitemap: true,
  },
  {
    description:
      'Transparent formulas, calculation assumptions, and estimate limitations at Energy Bill Lab.',
    group: 'research',
    href: '/methodology',
    label: 'Methodology',
    sitemap: true,
  },
  {
    description:
      'Official U.S. EIA datasets, utility benchmarks, and state energy data sources used by Energy Bill Lab.',
    group: 'research',
    href: '/data-sources',
    label: 'Data Sources',
    sitemap: true,
  },
  {
    description:
      'About Energy Bill Lab: transparent home-energy tools and consumer utility guidance.',
    group: 'company',
    href: '/about',
    label: 'About',
    nav: true,
    sitemap: true,
  },
  {
    description: 'Contact Energy Bill Lab for source corrections, feedback, and site inquiries.',
    group: 'company',
    href: '/contact',
    label: 'Contact',
    sitemap: true,
  },
  {
    description: 'Editorial standards for calculations, sources, and reviewed content.',
    group: 'research',
    href: '/editorial-policy',
    label: 'Editorial Policy',
    sitemap: true,
  },
  {
    description: 'How Energy Bill Lab handles privacy, cookies, and third-party services.',
    group: 'legal',
    href: '/privacy',
    label: 'Privacy',
    sitemap: true,
  },
  {
    description: 'Information about cookies, local storage, analytics, and consent management.',
    group: 'legal',
    href: '/cookies',
    label: 'Cookies',
    sitemap: true,
  },
  {
    description: 'Terms for using Energy Bill Lab informational pages and tools.',
    group: 'legal',
    href: '/terms',
    label: 'Terms',
    sitemap: true,
  },
  {
    description: 'Important limits on estimates, data, and informational content.',
    group: 'legal',
    href: '/disclaimer',
    label: 'Disclaimer',
    sitemap: true,
  },
  {
    description: 'Accessibility commitment and feedback information for Energy Bill Lab.',
    group: 'company',
    href: '/accessibility',
    label: 'Accessibility',
    sitemap: true,
  },
] as const satisfies readonly PublicRoute[];

export type PublicRouteHref = (typeof publicRoutes)[number]['href'];
export type PublicRouteEntry = (typeof publicRoutes)[number];

export const primaryNavigation = publicRoutes.filter((route) => 'nav' in route && route.nav);
export const sitemapRoutes = publicRoutes.filter((route) => route.sitemap);

export function getRouteByHref(href: PublicRouteHref) {
  return publicRoutes.find((route) => route.href === href);
}

export function isPublicRoute(route: PublicRouteEntry | undefined): route is PublicRouteEntry {
  return Boolean(route);
}

export function getFooterGroups() {
  return [
    {
      title: 'Tools',
      links: [
        getRouteByHref('/electricity-bill-analyzer'),
        getRouteByHref('/tools/appliance-energy-cost-calculator'),
        getRouteByHref('/tools/ac-cost-calculator'),
        getRouteByHref('/tools/space-heater-cost-calculator'),
        getRouteByHref('/tools/ev-home-charging-cost-calculator'),
      ].filter(isPublicRoute),
    },
    {
      title: 'Learn',
      links: [
        getRouteByHref('/research'),
        getRouteByHref('/guides'),
        getRouteByHref('/appliances'),
        getRouteByHref('/comparisons'),
        getRouteByHref('/electricity-rates'),
      ].filter(isPublicRoute),
    },
    {
      title: 'Company',
      links: [
        getRouteByHref('/about'),
        getRouteByHref('/contact'),
        getRouteByHref('/methodology'),
        getRouteByHref('/data-sources'),
        getRouteByHref('/editorial-policy'),
        getRouteByHref('/accessibility'),
      ].filter(isPublicRoute),
    },
    {
      title: 'Legal',
      links: [
        getRouteByHref('/privacy'),
        getRouteByHref('/cookies'),
        getRouteByHref('/terms'),
        getRouteByHref('/disclaimer'),
      ].filter(isPublicRoute),
    },
  ];
}
