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
      'Energy Bill Lab is an independent informational website published by Jaynesh Shingala.',
    path: '/about',
    updatedAt: '2026-07-24',
    related: [
      '/authors/jaynesh-shingala',
      '/methodology',
      '/data-sources',
      '/editorial-policy',
      '/contact',
    ],
    sections: [
      {
        heading: 'What Energy Bill Lab Does',
        paragraphs: [
          'Energy Bill Lab is a public-first home-energy utility website for U.S. residents. We publish transparent home-energy calculators, state electricity-rate benchmarks, and source-led explanations designed to help U.S. households understand electricity usage and costs.',
          'All core public calculators remain freely accessible without requiring user login, account registration, or personal identity submission.',
        ],
      },
      {
        heading: 'Who Creates & Maintains Energy Bill Lab',
        paragraphs: [
          'Energy Bill Lab is founded, engineered, and published by Jaynesh Shingala.',
          'Review the complete engineering credentials, calculation methodology responsibilities, and research portfolio on the Jaynesh Shingala Author Profile (/authors/jaynesh-shingala).',
          'For questions, corrections, or feedback, contact shingala.jaynesh@gmail.com.',
        ],
      },
      {
        heading: 'How Calculators & Data Are Built',
        paragraphs: [
          'Calculators are built using pure TypeScript formulas with explicit units, decimal-safe arithmetic, and deterministic rounding rules.',
          'Rate benchmarks are sourced directly from official U.S. Energy Information Administration (EIA) Form EIA-861M monthly retail sales reports, stored in a PostgreSQL database snapshot.',
        ],
      },
      {
        heading: 'Editorial Independence & Disclaimers',
        paragraphs: [
          'Energy Bill Lab is an independent educational site. We are not a utility company, energy supplier, government agency, licensed financial adviser, or substitute for an individual utility statement.',
          'Calculations represent informational estimates rather than binding utility bill predictions.',
        ],
      },
      {
        heading: 'Corrections & Transparency',
        paragraphs: [
          'We welcome source corrections, accessibility reports, and technical feedback. Factual correction requests are evaluated against official public data sources including the U.S. EIA, U.S. DOE, and ENERGY STAR.',
          'Direct all publisher and editorial inquiries to Jaynesh Shingala at shingala.jaynesh@gmail.com.',
        ],
      },
    ],
  },
  '/contact': {
    title: 'Contact Energy Bill Lab',
    description:
      'Contact Jaynesh Shingala for site feedback, source corrections, and accessibility inquiries.',
    path: '/contact',
    updatedAt: '2026-07-24',
    related: ['/about', '/accessibility', '/privacy', '/editorial-policy'],
    sections: [
      {
        heading: 'Publisher Contact Details',
        paragraphs: [
          'Energy Bill Lab is published by Jaynesh Shingala.',
          'For general questions, calculation corrections, data-source inquiries, accessibility issues, editorial corrections, media inquiries, or technical site feedback, email: shingala.jaynesh@gmail.com.',
        ],
      },
      {
        heading: 'Inquiry Categories',
        paragraphs: [
          '• General Questions: Feedback on calculators, tools, and site features.',
          '• Calculation & Data Corrections: Reporting discrepancies in formulas or official rate snapshots.',
          '• Accessibility Inquiries: Reporting screen-reader or keyboard navigation issues.',
          '• Media & Research: Inquiries regarding our published state rate benchmarks or methodologies.',
        ],
      },
      {
        heading: 'Correction Guidance',
        paragraphs: [
          'When submitting a correction request, please include: (1) The specific page URL, (2) A description of the issue, (3) The expected correction, and (4) A link to an official supporting dataset (e.g., U.S. EIA or state public utility commission) where applicable.',
          'Please do not send sensitive personal information such as utility account numbers, full street addresses, SSNs, or private payment documents.',
        ],
      },
    ],
  },
  '/methodology': {
    title: 'Methodology',
    description:
      'How Energy Bill Lab explains formulas, assumptions, source dates, and limitations for energy-cost estimates.',
    path: '/methodology',
    updatedAt: '2026-09-29',
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
        heading: '3-Tier Data Provenance Framework',
        paragraphs: [
          'To maintain mathematical defensibility and total transparency, all Energy Bill Lab benchmarks, tools, and research reports strictly categorize information into three distinct analytical tiers:',
          '1. Official Source Data: Primary empirical datasets collected by official government agencies and accredited standards organizations. For residential electricity, we source the national average from U.S. EIA Electric Power Monthly Table 5.3 / ES1.A and state benchmarks from Table 5.6.A (Form EIA-861M). For residential natural gas, we source prices exclusively from U.S. EIA Natural Gas Monthly Table 20 (Average price of natural gas sold to residential consumers, by state). Note: Table 20 reports delivered consumer prices, distinct from Table 18 (deliveries to all consumers), Table 19 (citygate), Table 21 (commercial), Table 22 (industrial), and Table 23 (electric power). Equipment ratings reference U.S. Department of Energy (DOE 10 CFR Part 430) and EPA ENERGY STAR criteria.',
          '2. EnergyBillLab Model Assumptions: Explicitly declared engineering and behavioral baseline parameters, such as equipment operating hours, seasonal heating/cooling degree days, appliance duty cycles, coefficient of performance (COP) baselines, water temperature differentials, and household floor area baselines.',
          '3. Derived Calculated Results: Mathematical outputs derived deterministically by applying decimal-safe formulas to the combination of official source inputs and declared model assumptions (e.g., annual kWh consumption totals, monthly operating cost comparisons, multi-state rate impact matrices, and 10-year Total Cost of Ownership lifecycle models).',
        ],
      },
      {
        heading: 'Standardized Heating Energy & Therm Conversions',
        paragraphs: [
          'Natural gas billing structures vary across local utilities. While the EIA reports retail data in dollars per thousand cubic feet ($/Mcf), most local gas utilities bill residential customers in therms or hundred cubic feet (Ccf).',
          'Standardized conversions on Energy Bill Lab use the EIA national average heat-content factor of approximately 1,036 Btu per cubic foot (10.36 therms per Mcf). Derived therm figures are explicit approximations (e.g., ≈ $2.33/therm using EIA average heat-content conversion of 1,036 Btu/cf) rather than an individual customer tariff, as local gas composition and billing factors vary.',
        ],
      },
      {
        heading: 'Validation Lag, Preliminary Data & Revisions Policy',
        paragraphs: [
          'We maintain a transparent distinction between three key dates: (1) Upstream EIA Release Date: when the EIA publishes raw monthly survey tables; (2) EnergyBillLab Import Date: when raw tables are ingested; and (3) EnergyBillLab Validation Date: when data passes automated schema, boundary, and editorial integrity gates.',
          'Initial EIA monthly figures are subject to subsequent revision by the agency. When revised tables are validated, historical records are updated accordingly. Dated analytical insights preserve the empirical snapshot available at publication, while live benchmark tools and calculators read from the latest validated dataset. Missing or withheld observations (marked as "W" or "--" by EIA) are preserved as unavailable and never interpolated or replaced with zero.',
        ],
      },
      {
        heading: 'Formula transparency & decimal-safe arithmetic',
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
    updatedAt: '2026-10-13',
    related: ['/methodology', '/electricity-rates', '/editorial-policy'],
    sections: [
      {
        heading: 'Official source standards',
        paragraphs: [
          'Energy Bill Lab uses official public datasets for energy rate benchmarks. Residential electricity rates are sourced from the U.S. Energy Information Administration (EIA) Electric Power Monthly Table 5.3 / ES1.A (national residential benchmark) and Table 5.6.A (state residential rates), based on Form EIA-861M monthly retail sales reports. Residential natural gas rates are sourced from EIA Natural Gas Monthly Table 20 (Average price of natural gas sold to residential consumers, by state).',
          'Published rate pages identify the primary source, dataset name, geographic scope, unit, publication date, and the date Energy Bill Lab validated the snapshot.',
        ],
      },
      {
        heading: 'Data validation & integrity',
        paragraphs: [
          'If an upstream import fails or is in transit, the product maintains the last validated snapshot and displays its update date. It does not replace valid information with empty, partial, or invented values.',
          'Data validation gates enforce geographical separation (50 states evaluated separately from the District of Columbia), sector isolation (residential sales isolated from commercial or industrial tariffs), and boundary checks against non-positive numbers.',
        ],
      },
      {
        heading: 'Data update history & snapshot log',
        paragraphs: [
          '• July 2026 Natural Gas Snapshot — EIA Release: September 30, 2026 | Imported: October 13, 2026 | Validated: October 13, 2026 | Deployed: October 13, 2026 | Records: 43 reporting states + District of Columbia ($31.62/Mcf) + U.S. national benchmark ($26.45/Mcf; 7 states withheld: CT, FL, KS, LA, NH, OH, WV) | Source: EIA Natural Gas Monthly Table 20 — Average price of natural gas sold to residential consumers (underlying survey: Form EIA-857; series N3010US3) | Status: Published Live Benchmark',
          '• July 2026 Electricity Snapshot — EIA Release: September 24, 2026 | Imported: September 25, 2026 | Validated: September 25, 2026 | Deployed: October 13, 2026 | Records: 50 states + District of Columbia (25.21 ¢/kWh) + U.S. national benchmark (18.31 ¢/kWh) | Source: Electric Power Monthly Table 5.3 / ES1.A & Table 5.6.A (Form EIA-861M) | Status: Published Live Benchmark',
          '• June 2026 Natural Gas Snapshot — EIA Release: August 31, 2026 | Imported: September 29, 2026 | Validated: September 29, 2026 | Records: 44 reporting states + District of Columbia ($27.28/Mcf) + U.S. national benchmark ($24.09/Mcf; 6 states withheld) | Source: Natural Gas Monthly Table 20 | Status: Superseded / Historical Archive',
          '• June 2026 Electricity Snapshot — EIA Release: August 24, 2026 | Imported: August 27, 2026 | Validated: August 27, 2026 | Records: 50 states + District of Columbia + U.S. national baseline (18.37 ¢/kWh) | Source: Electric Power Monthly Table 5.3 & Table 5.6.A | Status: Superseded / Historical Archive',
          '• May 2026 Natural Gas Snapshot — EIA Release: July 31, 2026 (Preliminary $19.83/Mcf); August 31, 2026 (Revised $19.73/Mcf) | Imported: August 2, 2026 | Validated: August 2, 2026 (Initial) / September 29, 2026 (Revised) | Records: 46 reporting states + District of Columbia ($22.01/Mcf) + U.S. benchmark ($19.73/Mcf; 4 states withheld) | Source: Natural Gas Monthly Table 20 | Status: Revised / Historical Archive',
          '• May 2026 Electricity Snapshot — EIA Release: July 24, 2026 | Imported: July 27, 2026 | Validated: July 27, 2026 | Records: 50 states + District of Columbia + U.S. national baseline (18.44 ¢/kWh) | Source: Electric Power Monthly Table 5.3 & Table 5.6.A | Status: Superseded / Historical Archive',
        ],
      },
    ],
  },
  '/editorial-policy': {
    title: 'Editorial Policy',
    description:
      'Energy Bill Lab editorial rules for useful, sourced, transparent home-energy content.',
    path: '/editorial-policy',
    updatedAt: '2026-07-24',
    related: ['/authors/jaynesh-shingala', '/methodology', '/data-sources', '/about', '/contact'],
    sections: [
      {
        heading: 'Ownership & Technical Publishing',
        paragraphs: [
          'Energy Bill Lab is owned and published by Jaynesh Shingala (contact: shingala.jaynesh@gmail.com).',
          'All published calculators, state rate reports, and educational guides undergo human technical review before publication.',
        ],
      },
      {
        heading: 'People-first content',
        paragraphs: [
          'Energy Bill Lab content must answer a real user problem. Pages should explain what a reader can do with the information, what assumptions matter, and where the data came from.',
          'The site must not publish mass-produced pages that simply swap place names, copied policy text, fake expertise, fake testimonials, or unsupported statistics.',
        ],
      },
      {
        heading: 'Review expectations & Corrections',
        paragraphs: [
          'Before publication, calculator and data pages receive source checks, formula checks, mobile review, accessibility review, and a final status decision.',
          'When an error is found, corrections favor clarity: update the page, preserve source dates, and document corrections transparently.',
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
          'Energy Bill Lab is implemented and reviewed toward WCAG 2.2 AA standards for public pages and interactive tools. The site supports keyboard navigation, visible focus indicators, semantic heading structures, readable color contrast, and descriptive ARIA labels.',
          'All calculator components provide visible form labels, accessible error announcements, and clear text descriptions for analytical summaries.',
        ],
      },
      {
        heading: 'Feedback & assistance',
        paragraphs: [
          'We welcome feedback on the accessibility of Energy Bill Lab. If you encounter an accessibility barrier or require assistance, email our publisher and editorial team at shingala.jaynesh@gmail.com.',
          'Please describe the nature of the issue and the web page URL so we can address it promptly within 48 hours.',
        ],
      },
    ],
  },
} satisfies Partial<Record<PublicRouteHref, ContentPage>>;
