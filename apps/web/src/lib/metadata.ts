import type { Metadata } from 'next';

import {
  BING_SITE_VERIFICATION,
  GOOGLE_SITE_VERIFICATION,
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from './site';

type PageMetadataInput = {
  description: string;
  path: `/${string}`;
  title: string;
};

export function createPageMetadata({ description, path, title }: PageMetadataInput): Metadata {
  const url = getSiteUrl(path);

  // If title already ends with ` | SITE_NAME`, strip it so Next.js `%s | SITE_NAME` template does not duplicate brand
  const brandSuffix = ` | ${SITE_NAME}`;
  const cleanTitle = title.endsWith(brandSuffix) ? title.slice(0, -brandSuffix.length) : title;

  const fullTitle = cleanTitle === SITE_NAME ? SITE_NAME : `${cleanTitle}${brandSuffix}`;

  return {
    title: cleanTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      description,
      siteName: SITE_NAME,
      title: fullTitle,
      type: 'website',
      url,
    },
    twitter: {
      card: 'summary',
      description,
      title: fullTitle,
    },
  };
}

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    alternates: {
      canonical: '/',
    },
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }],
      shortcut: '/favicon.ico',
      apple: '/icon.svg',
    },
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
      other: BING_SITE_VERIFICATION
        ? {
            'msvalidate.01': [BING_SITE_VERIFICATION],
          }
        : undefined,
    },
    openGraph: {
      description: SITE_DESCRIPTION,
      siteName: SITE_NAME,
      title: SITE_NAME,
      type: 'website',
      url: '/',
    },
    twitter: {
      card: 'summary',
      description: SITE_DESCRIPTION,
      title: SITE_NAME,
    },
  };
}
