import type { MetadataRoute } from 'next';

import { sitemapRoutes } from '@/lib/routes';
import { getSiteUrl } from '@/lib/site';

const LAST_MODIFIED = new Date('2026-07-22T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map((route) => ({
    url: getSiteUrl(route.href),
    lastModified: LAST_MODIFIED,
    changeFrequency: route.href === '/' ? 'weekly' : 'monthly',
    priority: route.href === '/' ? 1 : 0.7,
  }));
}
