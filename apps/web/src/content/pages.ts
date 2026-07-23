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
    updatedAt: '2026-07-23',
    related: ['/methodology', '/data-sources', '/editorial-policy'],
    sections: [
      {
        heading: 'Purpose',
        paragraphs: [
          'Energy Bill Lab is a public-first home-energy information site for U.S. residents. The goal is to help homeowners, renters, apartment residents, and EV owners understand why bills change and what practical steps may reduce costs.',
          'The site is built around transparent calculators, sourced rate data, and plain-English explanations. Public tools remain freely usable without requiring account creation or personal identity submission.',
        ],
      },
      {
        heading: 'Product principles',
        paragraphs: [
          'Energy Bill Lab provides interactive calculators, verified state benchmarks, and transparent formulas to help households evaluate energy usage.',
          'Energy Bill Lab does not claim to be a utility provider, financial adviser, legal adviser, or certified energy-audit firm.',
        ],
      },
    ],
  },
  '/contact': {
    title: 'Contact Energy Bill Lab',
    description:
      'Contact information for Energy Bill Lab feedback, source corrections, and accessibility reports.',
    path: '/contact',
    updatedAt: '2026-07-23',
    related: ['/about', '/accessibility', '/privacy'],
    sections: [
      {
        heading: 'Contact channel',
        paragraphs: [
          'For source corrections, accessibility feedback, data questions, or general site inquiries, contact the Energy Bill Lab team at support@energybilllab.com.',
          'Our editorial team reviews source correction requests against official public datasets including U.S. EIA reports.',
        ],
      },
      {
        heading: 'What to include',
        paragraphs: [
          'For corrections, include the page URL, the specific issue, and any official source that supports the correction.',
          'Do not send utility account numbers, full street addresses, payment information, or private billing documents through general email.',
        ],
      },
    ],
  },
  '/methodology': {
    title: 'Methodology',
    description:
      'How Energy Bill Lab explains formulas, assumptions, source dates, and limitations for energy-cost estimates.',
    path: '/methodology',
    updatedAt: '2026-07-23',
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
          'Each calculator displays its formula, input units, assumptions, warnings, rounding behavior, and the source of any default rate or appliance value used.',
          'Calculations use explicit unit conversions, decimal-safe arithmetic, and deterministic rounding formulas documented transparently on each tool page.',
        ],
      },
    ],
  },
  '/data-sources': {
    title: 'Data Sources',
    description:
      'Public and official data sources used for Energy Bill Lab rate benchmarks and appliance reference data.',
    path: '/data-sources',
    updatedAt: '2026-07-23',
    related: ['/methodology', '/electricity-rates', '/editorial-policy'],
    sections: [
      {
        heading: 'Official source standards',
        paragraphs: [
          'Energy Bill Lab uses official public datasets for electricity-rate information, primarily U.S. Energy Information Administration (EIA) Form EIA-861M monthly retail sales reports.',
          'Published rate pages identify the primary source, dataset name, geographic scope, unit, publication date, and the date Energy Bill Lab validated the snapshot.',
        ],
      },
      {
        heading: 'Data validation & integrity',
        paragraphs: [
          'If an upstream import fails, the product maintains the last validated snapshot and displays its update date. It does not replace valid information with empty, partial, or invented values.',
          'Rate benchmarks are periodically synchronized to ensure accuracy while preserving historical comparison baselines.',
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
    related: ['/cookies', '/terms', '/disclaimer', '/contact'],
    sections: [
      {
        heading: 'Data minimization',
        paragraphs: [
          'Energy Bill Lab is designed so core public calculators work without user login or account registration. Calculator inputs are processed locally in your browser for estimation purposes and are not sold, rented, or linked to personal identities.',
          'The website avoids capturing sensitive personal inputs such as utility account numbers, full street addresses, SSNs, or uploaded financial documents.',
        ],
      },
      {
        heading: 'Analytics and performance tools',
        paragraphs: [
          'Energy Bill Lab uses privacy-respecting measurement platforms to analyze site usage and monitor technical performance.',
          'These systems include Google Tag Manager (GTM) for tag orchestration, Google Analytics 4 (GA4) for aggregated traffic patterns, Microsoft Clarity for session behavior visualization, Vercel Analytics for privacy-first pageview metrics, and Vercel Speed Insights for Core Web Vitals performance monitoring.',
        ],
      },
      {
        heading: 'Advertising and Google AdSense',
        paragraphs: [
          'Energy Bill Lab integrates Google AdSense verification and advertising services. Third-party vendors, including Google, use cookies or device identifiers to serve ads based on a user’s prior visits to this or other websites.',
          'Google’s use of advertising cookies enables it and its partners to serve ads to users based on their visit to Energy Bill Lab and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings (www.google.com/settings/ads) or through www.aboutads.info.',
        ],
      },
      {
        heading: 'Consent and regional rights',
        paragraphs: [
          'For visitors residing in the European Economic Area (EEA), United Kingdom, or Switzerland, consent for personalized advertising and cookies is requested via Google Privacy & Messaging or certified Consent Management Platforms (CMP) in accordance with the ePrivacy Directive and GDPR.',
          'Visitors in California and other U.S. states with consumer privacy laws have rights regarding the collection and use of technical identifiers. Energy Bill Lab does not sell personal information.',
        ],
      },
    ],
  },
  '/cookies': {
    title: 'Cookie Policy',
    description:
      'Detailed overview of cookies, local storage, analytics trackers, and consent controls at Energy Bill Lab.',
    path: '/cookies',
    updatedAt: '2026-07-22',
    related: ['/privacy', '/terms', '/disclaimer'],
    sections: [
      {
        heading: 'What are cookies?',
        paragraphs: [
          'Cookies are small text files placed on your device by websites you visit. They help sites remember preferences, understand how pages perform, and deliver secure functionality.',
          'Energy Bill Lab uses cookies, browser local storage, and similar technologies to improve performance, analyze aggregate visitor behavior, and manage advertising tags.',
        ],
      },
      {
        heading: 'Categories of technologies used',
        paragraphs: [
          'Essential & Performance: Hosting and delivery services (such as Vercel Speed Insights and Vercel Analytics) collect anonymized technical performance data to maintain fast load times.',
          'Analytics & Insights: Google Analytics 4 and Microsoft Clarity (orchestrated via Google Tag Manager) collect aggregated usage metrics such as pages viewed, device type, and referral sources.',
          'Advertising & Verification: Google AdSense scripts and cookies allow verification of publisher status and serving of non-intrusive advertisements.',
        ],
      },
      {
        heading: 'Managing your choices',
        paragraphs: [
          'You can control or disable cookies through your browser settings. Most modern browsers allow you to block third-party cookies, delete existing cookies, or receive a warning before a cookie is stored.',
          'For European Economic Area (EEA) and UK visitors, ad consent settings can be managed at any time via the consent banner choices. You may also opt out of targeted advertising network cookies at www.aboutads.info or www.youronlinechoices.eu.',
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
    updatedAt: '2026-07-23',
    related: ['/contact', '/about', '/privacy'],
    sections: [
      {
        heading: 'Accessibility target',
        paragraphs: [
          'Energy Bill Lab targets WCAG 2.2 AA standards for public pages and interactive tools. The site supports keyboard navigation, visible focus indicators, semantic heading structures, readable color contrast, and descriptive ARIA labels.',
          'All calculator components provide visible form labels, accessible error announcements, and clear text descriptions for analytical summaries.',
        ],
      },
      {
        heading: 'Feedback & assistance',
        paragraphs: [
          'We welcome feedback on the accessibility of Energy Bill Lab. If you encounter an accessibility barrier or require assistance, email our support team at support@energybilllab.com.',
          'Please describe the nature of the issue and the web page URL so we can address it promptly.',
        ],
      },
    ],
  },
} satisfies Partial<Record<PublicRouteHref, ContentPage>>;
