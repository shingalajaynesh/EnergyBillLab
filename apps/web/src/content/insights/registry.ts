import { validateInsightsRegistry } from '@/lib/insights-validation';

import type { InsightCategory, InsightRecord } from './types';
import { INSIGHTS_PUBLICATION_THRESHOLD } from './types';

/**
 * Array of individual article modules imported from ./articles/
 * Currently 0 published articles during setup phase.
 */
const rawArticles: InsightRecord[] = [];

// Automatic Registry Validation at initialization time
const validation = validateInsightsRegistry(rawArticles);
if (!validation.valid) {
  throw new Error(`Energy Insights Registry Validation Failed:\n${validation.errors.join('\n')}`);
}

export const insightsRegistry: InsightRecord[] = rawArticles;

export function getPublishedInsights(now = new Date().toISOString()): InsightRecord[] {
  return insightsRegistry.filter((item) => {
    if (item.status !== 'published') return false;
    if (item.noindex) return false;
    if (item.publishedAt > now) return false;
    return true;
  });
}

export function getInsightBySlug(slug: string): InsightRecord | undefined {
  return insightsRegistry.find((item) => item.slug === slug);
}

export function getInsightsByCategory(
  category: InsightCategory,
  now = new Date().toISOString(),
): InsightRecord[] {
  return getPublishedInsights(now).filter((item) => item.category === category);
}

export function isInsightsHubEligible(now = new Date().toISOString()): boolean {
  return getPublishedInsights(now).length >= INSIGHTS_PUBLICATION_THRESHOLD;
}
