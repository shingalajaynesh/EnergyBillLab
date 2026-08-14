import type { MetadataRoute } from 'next';

import { energyGuides } from '@/content/guides';
import {
  getPublishedInsights,
  INSIGHT_CATEGORIES,
  INSIGHTS_PUBLICATION_THRESHOLD,
} from '@/content/insights';
import { contentPages } from '@/content/pages';
import { sitemapRoutes } from '@/lib/routes';
import { getSiteUrl } from '@/lib/site';

const DEFAULT_LAST_MODIFIED = new Date('2026-08-01T00:00:00.000Z');

function resolveRouteLastModified(href: string): Date {
  // Check if it's a guide
  if (href.startsWith('/guides/')) {
    const slug = href.replace('/guides/', '');
    const guide = energyGuides[slug];
    if (guide?.updatedAt) {
      return new Date(`${guide.updatedAt}T00:00:00.000Z`);
    }
  }

  // Check if it's a static content page
  const page = (contentPages as Record<string, { updatedAt?: string }>)[href];
  if (page?.updatedAt) {
    return new Date(`${page.updatedAt}T00:00:00.000Z`);
  }

  return DEFAULT_LAST_MODIFIED;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routeEntries = sitemapRoutes.map((route) => ({
    url: getSiteUrl(route.href),
    lastModified: resolveRouteLastModified(route.href),
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
      lastModified: DEFAULT_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

  return [...routeEntries, ...insightEntries, ...categoryEntries];
}
