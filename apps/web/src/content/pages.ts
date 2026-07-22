import type { PublicRouteHref } from '@/lib/routes';

export type ContentSection = {
  heading: string;
  paragraphs: string[];
};

export type ContentPage = {
  description: string;
  path: PublicRouteHref;
  title: string;
  updatedAt: string;
  sections: ContentSection[];
  related: PublicRouteHref[];
};

export const contentPages = {
  '/about': {
    title: 'About Energy Bill Lab',
    description:
      'Learn what Energy Bill Lab is building: public, transparent home-energy tools for U.S. residents.',
    path: '/about',
    updatedAt: '2026-07-22',
    related: ['/methodology', '/data-sources', '/editorial-policy'],
    sections: [
      {
        heading: 'Purpose',
        paragraphs: [
          'Energy Bill Lab is a public-first home-energy information site for U.S. residents. The goal is to help homeowners, renters, apartment residents, and EV owners understand why bills change and what practical steps may reduce costs.',
          'The site is being built around transparent calculators, sourced rate data, and plain-English explanations. Public tools should remain usable without creating an account.',
        ],
      },
      {
        heading: 'Current status',
        paragraphs: [
          'This foundation release establishes the public design, route, trust, and SEO structure before calculator logic is added.',
          'Energy Bill Lab does not claim to be a utility, financial adviser, legal adviser, or certified energy-audit provider.',
        ],
      },
    ],
  },
  '/contact': {
    title: 'Contact Energy Bill Lab',
    description:
      'Contact information and configuration status for Energy Bill Lab feedback and accessibility reports.',
    path: '/contact',
    updatedAt: '2026-07-22',
    related: ['/about', '/accessibility', '/privacy'],
    sections: [
      {
        heading: 'Contact channel',
        paragraphs: [
          'Energy Bill Lab uses a configured public contact channel rather than invented addresses or phone numbers.',
          'When a contact email is configured, use it for source corrections, accessibility feedback, and general site questions.',
        ],
      },
      {
        heading: 'What to include',
        paragraphs: [
          'For corrections, include the page URL, the issue, and any official source that supports the correction.',
          'Do not send utility account numbers, full street addresses, payment information, or private billing documents through general contact email.',
        ],
      },
    ],
  },
  '/methodology': {
    title: 'Methodology',
    description:
      'How Energy Bill Lab will explain formulas, assumptions, source dates, and limitations for energy-cost estimates.',
    path: '/methodology',
    updatedAt: '2026-07-22',
    related: ['/data-sources', '/disclaimer', '/tools'],
    sections: [
      {
        heading: 'Estimate-first, not prediction-first',
        paragraphs: [
          'Energy Bill Lab calculations are informational estimates. They are intended to help users understand cost drivers, not to predict a utility bill exactly.',
          'Actual bills can change because of taxes, riders, fuel adjustments, fixed fees, tiered rates, demand charges, weather, occupancy, appliance condition, billing-cycle length, and household behavior.',
        ],
      },
      {
        heading: 'Formula transparency',
        paragraphs: [
          'Each calculator will show its formula, input units, assumptions, warnings, rounding behavior, and the source of any default rate or appliance value used.',
          'Calculator implementation is intentionally not part of this release. Formula logic will live in the shared calculation-engine package in a later phase.',
        ],
      },
    ],
  },
  '/data-sources': {
    title: 'Data Sources',
    description:
      'The public and official data-source approach planned for Energy Bill Lab rate and appliance information.',
    path: '/data-sources',
    updatedAt: '2026-07-22',
    related: ['/methodology', '/electricity-rates', '/editorial-policy'],
    sections: [
      {
        heading: 'Planned source approach',
        paragraphs: [
          'Energy Bill Lab will prefer official public datasets for electricity-rate information, including U.S. Energy Information Administration data where appropriate.',
          'Published data pages must identify the source, dataset or URL, geographic scope, unit, publication date when available, and the date Energy Bill Lab last validated the snapshot.',
        ],
      },
      {
        heading: 'No fabricated fallback values',
        paragraphs: [
          'If an upstream import fails, the product should keep the last validated snapshot and show its update date. It should not replace valid information with empty, partial, or invented values.',
          'This release does not include database tables, EIA ingestion, or live rate snapshots.',
        ],
      },
    ],
  },
  '/editorial-policy': {
    title: 'Editorial Policy',
    description:
      'Energy Bill Lab editorial rules for useful, sourced, transparent home-energy content.',
    path: '/editorial-policy',
    updatedAt: '2026-07-22',
    related: ['/methodology', '/data-sources', '/about'],
    sections: [
      {
        heading: 'People-first content',
        paragraphs: [
          'Energy Bill Lab content must answer a real user problem. Pages should explain what a reader can do with the information, what assumptions matter, and where the data came from.',
          'The site must not publish mass-produced pages that simply swap place names, copied policy text, fake expertise, fake testimonials, or unsupported statistics.',
        ],
      },
      {
        heading: 'Review expectations',
        paragraphs: [
          'Before publication, calculator and data pages should receive source checks, formula checks, mobile review, accessibility review, and a final status decision.',
          'When an error is found, corrections should favor clarity: update the page, preserve source dates, and avoid silently changing public meaning.',
        ],
      },
    ],
  },
  '/privacy': {
    title: 'Privacy Policy',
    description:
      'How Energy Bill Lab approaches privacy, cookies, analytics, advertising readiness, and data minimization.',
    path: '/privacy',
    updatedAt: '2026-07-22',
    related: ['/terms', '/disclaimer', '/contact'],
    sections: [
      {
        heading: 'Data minimization',
        paragraphs: [
          'Energy Bill Lab is designed so core public calculators can work without a login. Calculator inputs should not be stored by default.',
          'If analytics or platform services are added, the site should avoid sending raw bill amounts, addresses, utility account numbers, uploaded bill content, or other sensitive user inputs.',
        ],
      },
      {
        heading: 'Cookies and third parties',
        paragraphs: [
          'Hosting, security, analytics, consent, and advertising services may use cookies, identifiers, logs, or similar technologies when configured.',
          'Advertising is not implemented by this release. If advertising is configured later, this page must be updated to describe relevant third-party advertising, cookies, user choices, and region-specific consent behavior.',
        ],
      },
    ],
  },
  '/terms': {
    title: 'Terms of Use',
    description: 'Terms for using Energy Bill Lab informational pages and future public tools.',
    path: '/terms',
    updatedAt: '2026-07-22',
    related: ['/privacy', '/disclaimer', '/methodology'],
    sections: [
      {
        heading: 'Informational use',
        paragraphs: [
          'Energy Bill Lab provides informational content and estimates for general home-energy education. It is not a substitute for utility billing documents, professional advice, legal advice, or financial advice.',
          'Users remain responsible for checking utility tariffs, account-specific fees, local rules, and professional guidance where needed.',
        ],
      },
      {
        heading: 'Availability and changes',
        paragraphs: [
          'Public pages may change as formulas, data sources, and editorial review improve.',
          'Energy Bill Lab should keep public content accessible where practical, but no website can guarantee uninterrupted availability.',
        ],
      },
    ],
  },
  '/disclaimer': {
    title: 'Disclaimer',
    description:
      'Important limitations on Energy Bill Lab estimates, source data, and informational content.',
    path: '/disclaimer',
    updatedAt: '2026-07-22',
    related: ['/methodology', '/data-sources', '/terms'],
    sections: [
      {
        heading: 'Estimates have limits',
        paragraphs: [
          'Energy Bill Lab estimates are not utility bill predictions. They are simplified calculations intended to help explain possible cost drivers.',
          'Taxes, riders, fixed fees, weather, tiers, time-of-use plans, demand charges, fuel adjustments, utility-specific fees, and appliance behavior can all affect actual charges.',
        ],
      },
      {
        heading: 'No professional certification claim',
        paragraphs: [
          'Energy Bill Lab does not represent itself as a utility, licensed energy auditor, financial adviser, legal adviser, or government agency.',
          'For account-specific billing disputes, users should contact their utility or a qualified local professional.',
        ],
      },
    ],
  },
  '/accessibility': {
    title: 'Accessibility',
    description:
      'Energy Bill Lab accessibility goals, keyboard support, readable content, and feedback path.',
    path: '/accessibility',
    updatedAt: '2026-07-22',
    related: ['/contact', '/about', '/privacy'],
    sections: [
      {
        heading: 'Accessibility target',
        paragraphs: [
          'Energy Bill Lab targets WCAG 2.2 AA for public pages and tools. The product should support keyboard navigation, visible focus states, semantic headings, readable contrast, and useful labels.',
          'Future calculators should provide visible form labels, clear error messages, and text explanations for charts or visual summaries.',
        ],
      },
      {
        heading: 'Feedback',
        paragraphs: [
          'Accessibility feedback should use the configured contact channel when one is available.',
          'If no contact email is configured, the site should avoid inventing one and make the missing configuration clear before publication.',
        ],
      },
    ],
  },
} satisfies Partial<Record<PublicRouteHref, ContentPage>>;
