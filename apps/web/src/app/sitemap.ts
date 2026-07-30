import type { MetadataRoute } from 'next';

import {
  getPublishedInsights,
  INSIGHT_CATEGORIES,
  INSIGHTS_PUBLICATION_THRESHOLD,
} from '@/content/insights';
import { sitemapRoutes } from '@/lib/routes';
import { getSiteUrl } from '@/lib/site';

const LAST_MODIFIED = new Date('2026-07-22T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const routeEntries = sitemapRoutes.map((route) => ({
    url: getSiteUrl(route.href),
    lastModified: LAST_MODIFIED,
    changeFrequency: route.href === '/' ? ('weekly' as const) : ('monthly' as const),
    priority: route.href === '/' ? 1 : 0.7,
  }));

  const publishedInsights = getPublishedInsights();

  const insightEntries = publishedInsights.map((article) => ({
    url: getSiteUrl(`/insights/${article.slug}`),
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const categoryEntries = Object.values(INSIGHT_CATEGORIES)
    .filter(
      (category) =>
        publishedInsights.filter((article) => article.category === category.slug).length >=
        INSIGHTS_PUBLICATION_THRESHOLD,
    )
    .map((category) => ({
      url: getSiteUrl(`/insights/category/${category.slug}`),
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

  return [...routeEntries, ...insightEntries, ...categoryEntries];
}
