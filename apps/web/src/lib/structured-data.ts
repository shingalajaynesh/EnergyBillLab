import { getSiteUrl, SITE_NAME } from './site';

export function createWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: getSiteUrl('/'),
  };
}

export function createOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: getSiteUrl('/'),
    logo: getSiteUrl('/icon.png'),
  };
}

export function serializeStructuredData(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function createBreadcrumbStructuredData(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getSiteUrl(item.path),
    })),
  };
}

export function createReportStructuredData({
  title,
  description,
  path,
  datePublished,
  dateModified,
  reportingPeriod,
}: {
  dateModified: string;
  datePublished: string;
  description: string;
  path: string;
  reportingPeriod: string;
  title: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: title,
    description,
    url: getSiteUrl(path),
    datePublished,
    dateModified,
    spatialCoverage: {
      '@type': 'Place',
      name: 'United States',
    },
    variableMeasured: 'Residential Electricity Price (cents per kWh)',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: getSiteUrl('/'),
      logo: getSiteUrl('/icon.png'),
    },
    author: {
      '@type': 'Person',
      name: 'Jaynesh Shingala',
    },
    sourceOrganization: {
      '@type': 'GovernmentOrganization',
      name: 'U.S. Energy Information Administration (EIA)',
    },
    temporalCoverage: reportingPeriod,
  };
}

export function createInsightArticleStructuredData({
  category,
  dateModified,
  datePublished,
  description,
  image,
  path,
  title,
}: {
  category?: string;
  dateModified?: string | null;
  datePublished: string;
  description: string;
  image?: string;
  path: string;
  title: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getSiteUrl(path),
    },
    url: getSiteUrl(path),
    datePublished,
    dateModified: dateModified || datePublished,
    articleSection: category,
    image: image ? getSiteUrl(image) : getSiteUrl('/opengraph-image.png'),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: getSiteUrl('/'),
      logo: getSiteUrl('/icon.png'),
    },
    author: {
      '@type': 'Person',
      name: 'Jaynesh Shingala',
      url: getSiteUrl('/authors/jaynesh-shingala'),
    },
  };
}

export function createWebApplicationStructuredData({
  name,
  description,
  path,
  applicationCategory = 'UtilityApplication',
}: {
  applicationCategory?: string;
  description: string;
  name: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: getSiteUrl(path),
    applicationCategory,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: getSiteUrl('/'),
      logo: getSiteUrl('/icon.png'),
    },
    creator: {
      '@type': 'Person',
      name: 'Jaynesh Shingala',
      url: getSiteUrl('/authors/jaynesh-shingala'),
    },
  };
}

export function createDatasetStructuredData({
  name,
  description,
  path,
  spatialCoverage = 'United States',
  temporalCoverage,
  variableMeasured = 'Residential Electricity Price (cents per kWh)',
}: {
  description: string;
  name: string;
  path: string;
  spatialCoverage?: string;
  temporalCoverage?: string;
  variableMeasured?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name,
    description,
    url: getSiteUrl(path),
    spatialCoverage: {
      '@type': 'Place',
      name: spatialCoverage,
    },
    temporalCoverage: temporalCoverage || '2024/2026',
    variableMeasured,
    isAccessibleForFree: true,
    creator: {
      '@type': 'Organization',
      name: 'U.S. Energy Information Administration (EIA)',
      url: 'https://www.eia.gov',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: getSiteUrl('/'),
      logo: getSiteUrl('/icon.png'),
    },
  };
}

export function createPersonStructuredData({
  name = 'Jaynesh Shingala',
  url = '/authors/jaynesh-shingala',
  jobTitle = 'Software Engineer & Energy Data Analyst',
  description = 'Jaynesh Shingala is a software engineer, energy data analyst, and the publisher of Energy Bill Lab, focusing on transparent calculation engines and U.S. utility rate modeling.',
  sameAs = [],
}: {
  description?: string;
  jobTitle?: string;
  name?: string;
  sameAs?: string[];
  url?: string;
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: getSiteUrl(url),
    jobTitle,
    description,
    worksFor: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: getSiteUrl('/'),
    },
    sameAs,
  };
}

export function createFaqStructuredData(faqs: Array<{ answer: string; question: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

