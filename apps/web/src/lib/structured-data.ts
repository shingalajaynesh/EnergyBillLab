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
    },
  };
}
