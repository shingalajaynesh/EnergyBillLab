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

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      description,
      siteName: SITE_NAME,
      title,
      type: 'website',
      url,
    },
    twitter: {
      card: 'summary',
      description,
      title,
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
