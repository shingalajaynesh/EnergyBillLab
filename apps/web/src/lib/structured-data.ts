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

export function createReportStructuredData({
  title,
  description,
  path,
  datePublished,
  dateModified,
  reportingPeriod,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  reportingPeriod: string;
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
