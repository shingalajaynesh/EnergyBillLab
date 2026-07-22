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
    description: 'A transparent overview of the Energy Bill Lab product direction.',
    group: 'company',
    href: '/',
    label: 'Home',
    sitemap: true,
  },
  {
    description: 'Planned public calculators for electricity bills and appliance costs.',
    group: 'tools',
    href: '/tools',
    label: 'Tools',
    nav: true,
    sitemap: true,
  },
  {
    description: 'How state electricity-rate pages will present sourced residential data.',
    group: 'research',
    href: '/electricity-rates',
    label: 'Electricity Rates',
    nav: true,
    sitemap: true,
  },
  {
    description: 'Planned appliance reference pages and energy-use explanations.',
    group: 'research',
    href: '/appliances',
    label: 'Appliances',
    nav: true,
    sitemap: true,
  },
  {
    description: 'Practical guides for understanding common home energy-bill problems.',
    group: 'research',
    href: '/guides',
    label: 'Guides',
    nav: true,
    sitemap: true,
  },
  {
    description: 'Planned comparisons for equipment, rates, and home energy decisions.',
    group: 'research',
    href: '/comparisons',
    label: 'Comparisons',
    sitemap: true,
  },
  {
    description: 'How Energy Bill Lab will calculate estimates and explain limitations.',
    group: 'research',
    href: '/methodology',
    label: 'Methodology',
    sitemap: true,
  },
  {
    description: 'Official and public data sources planned for rate and appliance content.',
    group: 'research',
    href: '/data-sources',
    label: 'Data Sources',
    sitemap: true,
  },
  {
    description: 'What Energy Bill Lab is building and how the site approaches trust.',
    group: 'company',
    href: '/about',
    label: 'About',
    nav: true,
    sitemap: true,
  },
  {
    description: 'How to contact Energy Bill Lab when a verified contact channel is configured.',
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
