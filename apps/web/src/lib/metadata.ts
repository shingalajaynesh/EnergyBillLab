import type { Metadata } from 'next';

import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './site';

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
