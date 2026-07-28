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

const DEFAULT_OG_IMAGE_ALT = 'Energy Bill Lab — U.S. Electricity Rates and Home Energy Calculators';

export function createPageMetadata({ description, path, title }: PageMetadataInput): Metadata {
  const url = getSiteUrl(path);

  // If title already ends with ` | SITE_NAME`, strip it so Next.js `%s | SITE_NAME` template does not duplicate brand
  const brandSuffix = ` | ${SITE_NAME}`;
  const cleanTitle = title.endsWith(brandSuffix) ? title.slice(0, -brandSuffix.length) : title;

  const fullTitle = cleanTitle === SITE_NAME ? SITE_NAME : `${cleanTitle}${brandSuffix}`;
  const ogImageUrl = getSiteUrl('/opengraph-image.png');
  const twitterImageUrl = getSiteUrl('/twitter-image.png');

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
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: DEFAULT_OG_IMAGE_ALT,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      description,
      title: fullTitle,
      images: [
        {
          url: twitterImageUrl,
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ],
    },
  };
}

export function createRootMetadata(): Metadata {
  const ogImageUrl = getSiteUrl('/opengraph-image.png');
  const twitterImageUrl = getSiteUrl('/twitter-image.png');

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
      url: getSiteUrl('/'),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: DEFAULT_OG_IMAGE_ALT,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      description: SITE_DESCRIPTION,
      title: SITE_NAME,
      images: [
        {
          url: twitterImageUrl,
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ],
    },
  };
}
