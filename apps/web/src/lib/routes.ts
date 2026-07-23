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
      'Residential electricity rate benchmarks and U.S. state averages with EIA source attribution.',
    group: 'research',
    href: '/electricity-rates',
    label: 'Electricity Rates',
    nav: true,
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
      links: publicRoutes.filter((route) => route.group === 'tools'),
    },
    {
      title: 'Research',
      links: publicRoutes.filter((route) => route.group === 'research'),
    },
    {
      title: 'Company',
      links: publicRoutes.filter((route) => route.group === 'company' && route.href !== '/'),
    },
    {
      title: 'Legal',
      links: publicRoutes.filter((route) => route.group === 'legal'),
    },
  ];
}
