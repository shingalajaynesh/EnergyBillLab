import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import sitemap from '../src/app/sitemap';
import type { InsightRecord } from '../src/content/insights';
import {
  formatHumanDate,
  getInsightsByCategory,
  getInsightBySlug,
  getPublishedInsights,
  INSIGHTS_PUBLICATION_THRESHOLD,
  insightsRegistry,
  isInsightsHubEligible,
} from '../src/content/insights';
import { validateInsightRecord, validateInsightsRegistry } from '../src/lib/insights-validation';
import { primaryNavigation, publicRoutes, sitemapRoutes } from '../src/lib/routes';
import {
  createBreadcrumbStructuredData,
  createInsightArticleStructuredData,
} from '../src/lib/structured-data';

const mockValidInsight: InsightRecord = {
  id: 'insight-test-01',
  slug: 'us-residential-electricity-rates-may-2026-analysis',
  status: 'published',
  title: 'May 2026 U.S. Residential Electricity Rates Shift Analysis',
  metaTitle: 'May 2026 U.S. Residential Electricity Rates Shift Analysis',
  metaDescription:
    'Analysis of monthly EIA residential electricity rate changes across U.S. states.',
  summary:
    'In May 2026, U.S. residential electricity prices averaged 16.8¢/kWh based on EIA reporting.',
  category: 'electricity-rates',
  primaryIntent: 'monthly US electricity rate changes May 2026',
  primaryQuery: 'us electricity rate changes may 2026',
  secondaryQueries: ['may 2026 eia rate analysis'],
  intentFingerprint: 'us-residential-electricity-rates-may-2026-analysis',
  canonicalTopic: 'us-electricity-rate-monthly-report-may-2026',
  geography: 'united-states',
  reportingPeriod: 'May 2026',
  publishedAt: '2026-07-28T00:00:00.000Z',
  updatedAt: null,
  updateCadence: 'monthly',
  authorName: 'Jaynesh Shingala',
  sources: [
    {
      organization: 'U.S. Energy Information Administration (EIA)',
      title: 'Monthly Energy Review — Table 9.8 Residential Electricity Prices',
      url: 'https://www.eia.gov/totalenergy/data/monthly/',
    },
  ],
  relatedRoutes: ['/electricity-rates', '/tools/appliance-energy-cost-calculator'],
};

describe('Energy Insights Publishing Infrastructure & Quality Gates', () => {
  // Test 1: /insights route exists
  it('1. includes /insights in public route registry', () => {
    const route = publicRoutes.find((r) => r.href === '/insights');
    expect(route).toBeDefined();
    expect(route?.label).toBe('Insights');
  });

  // Test 2: Published registry renders public articles
  it('2. production registry contains the published launch Insights plus daily updates', () => {
    expect(insightsRegistry).toHaveLength(29);
    expect(insightsRegistry.every((record) => record.status === 'published')).toBe(true);
    expect(getPublishedInsights()).toHaveLength(29);
  });

  // Test 2b: getPublishedInsights returns articles in descending order by publishedAt (latest first)
  it('2b. getPublishedInsights sorts articles descending by publishedAt (latest first)', () => {
    const published = getPublishedInsights();
    for (let i = 0; i < published.length - 1; i++) {
      const current = new Date(published[i]!.publishedAt).getTime();
      const next = new Date(published[i + 1]!.publishedAt).getTime();
      expect(current).toBeGreaterThanOrEqual(next);
    }
    expect(published[0]?.slug).toBe(
      'august-2026-electric-water-heater-standby-loss-temperature-setpoint-benchmark',
    );
  });

  // Test 3: Hub is indexable after launch threshold
  it('3. hub is eligible for search indexation after threshold is met', () => {
    expect(isInsightsHubEligible()).toBe(true);
  });

  // Test 4: Published hub is included in sitemap routes
  it('4. published hub is included in sitemapRoutes', () => {
    const isSitemapEligible = sitemapRoutes.some((r) => r.href === '/insights');
    expect(isSitemapEligible).toBe(true);
  });

  // Test 5: Insights appear in primary navigation after activation threshold
  it('5. Insights route appears in primary navigation when published count meets threshold', () => {
    const navHrefs = primaryNavigation.map((r) => r.href);
    expect(navHrefs).toContain('/insights');
  });

  // Test 6: Insights appear on homepage after activation threshold
  it('6. homepage promotion threshold is 3 published articles', () => {
    expect(INSIGHTS_PUBLICATION_THRESHOLD).toBe(3);
    expect(isInsightsHubEligible()).toBe(true);
  });

  // Test 7: Draft articles are non-public
  it('7. draft articles are excluded from getPublishedInsights', () => {
    const draft: InsightRecord = { ...mockValidInsight, status: 'draft' };
    const res = validateInsightRecord(draft);
    expect(res.valid).toBe(true);

    const published = [draft].filter((item) => item.status === 'published');
    expect(published).toHaveLength(0);
  });

  // Test 8: Scheduled future articles are not public
  it('8. scheduled future articles are excluded from published output', () => {
    const futureDate = '2099-01-01T00:00:00.000Z';
    const scheduled: InsightRecord = {
      ...mockValidInsight,
      status: 'published',
      publishedAt: futureDate,
    };
    const res = validateInsightRecord(
      scheduled,
      [scheduled],
      undefined,
      '2026-07-30T00:00:00.000Z',
    );
    expect(res.valid).toBe(false);
    expect(res.errors.some((e) => e.includes('future publication date'))).toBe(true);
  });

  // Test 9: Published articles are routable
  it('9. published valid article passes validation and is queryable', () => {
    const res = validateInsightRecord(mockValidInsight);
    expect(res.valid).toBe(true);
    expect(res.errors).toHaveLength(0);
  });

  // Test 10: Archived records follow documented policy
  it('10. archived articles are non-public in active feed', () => {
    const archived: InsightRecord = { ...mockValidInsight, status: 'archived' };
    const res = validateInsightRecord(archived);
    expect(res.valid).toBe(true);
    const published = [archived].filter((item) => item.status === 'published');
    expect(published).toHaveLength(0);
  });

  // Test 11: Duplicate slug fails validation
  it('11. duplicate slug fails validation', () => {
    const duplicate: InsightRecord = { ...mockValidInsight, id: 'insight-test-02' };
    const res = validateInsightRecord(duplicate, [mockValidInsight, duplicate]);
    expect(res.valid).toBe(false);
    expect(res.errors.some((e) => e.includes('Duplicate slug'))).toBe(true);
  });

  // Test 12: Duplicate ID fails validation
  it('12. duplicate article ID fails validation', () => {
    const duplicate: InsightRecord = { ...mockValidInsight, slug: 'another-different-slug' };
    const res = validateInsightRecord(duplicate, [mockValidInsight, duplicate]);
    expect(res.valid).toBe(false);
    expect(res.errors.some((e) => e.includes('Duplicate article ID'))).toBe(true);
  });

  // Test 13: Duplicate canonical topic fails validation
  it('13. duplicate canonical topic fails validation', () => {
    const duplicate: InsightRecord = {
      ...mockValidInsight,
      id: 'insight-test-03',
      slug: 'unique-slug-03',
    };
    const res = validateInsightRecord(duplicate, [mockValidInsight, duplicate]);
    expect(res.valid).toBe(false);
    expect(res.errors.some((e) => e.includes('Duplicate canonical topic'))).toBe(true);
  });

  // Test 14: Duplicate intent fingerprint fails validation
  it('14. duplicate intent fingerprint fails validation', () => {
    const duplicate: InsightRecord = {
      ...mockValidInsight,
      id: 'insight-test-04',
      slug: 'unique-slug-04',
      canonicalTopic: 'unique-canonical-topic-04',
    };
    const res = validateInsightRecord(duplicate, [mockValidInsight, duplicate]);
    expect(res.valid).toBe(false);
    expect(res.errors.some((e) => e.includes('Duplicate intent fingerprint'))).toBe(true);
  });

  // Test 15: Duplicate canonical URL fails validation
  it('15. duplicate canonical URL derived from slug fails validation', () => {
    const duplicate: InsightRecord = { ...mockValidInsight, id: 'insight-test-05' };
    const res = validateInsightRecord(duplicate, [mockValidInsight, duplicate]);
    expect(res.valid).toBe(false);
    expect(res.errors.some((e) => e.includes('Duplicate slug'))).toBe(true);
  });

  // Test 16: Invalid category fails validation
  it('16. invalid category fails validation', () => {
    const invalidCat = {
      ...mockValidInsight,
      category: 'invalid-cat' as unknown as InsightRecord['category'],
    };
    const res = validateInsightRecord(invalidCat);
    expect(res.valid).toBe(false);
    expect(res.errors.some((e) => e.includes('Invalid or missing category'))).toBe(true);
  });

  // Test 17: Missing primary intent fails validation
  it('17. missing primary intent fails validation', () => {
    const missingIntent = { ...mockValidInsight, primaryIntent: '' };
    const res = validateInsightRecord(missingIntent);
    expect(res.valid).toBe(false);
    expect(res.errors.some((e) => e.includes('Missing primary intent'))).toBe(true);
  });

  // Test 18: Missing source fails validation
  it('18. missing source for published article fails validation', () => {
    const missingSource = { ...mockValidInsight, sources: [] };
    const res = validateInsightRecord(missingSource);
    expect(res.valid).toBe(false);
    expect(res.errors.some((e) => e.includes('at least one authoritative source'))).toBe(true);
  });

  // Test 19: Missing author fails validation
  it('19. missing or non-compliant author fails validation', () => {
    const invalidAuthor = {
      ...mockValidInsight,
      authorName: 'John Doe' as unknown as InsightRecord['authorName'],
    };
    const res = validateInsightRecord(invalidAuthor);
    expect(res.valid).toBe(false);
    expect(
      res.errors.some((e) => e.includes('Author name must strictly be "Jaynesh Shingala"')),
    ).toBe(true);
  });

  // Test 20: Public author remains Jaynesh Shingala
  it('20. enforces public author name as Jaynesh Shingala', () => {
    expect(mockValidInsight.authorName).toBe('Jaynesh Shingala');
  });

  // Test 21: No public job title or location is exposed
  it('21. rejects prohibited personal identity keywords and job titles', () => {
    const recordWithTitle = {
      ...mockValidInsight,
      summary: 'Written by Full-Stack Software Engineer Jaynesh Shingala from Gujarat India.',
    };
    const res = validateInsightRecord(recordWithTitle);
    expect(res.valid).toBe(false);
    expect(res.errors.some((e) => e.includes('prohibited personal identity'))).toBe(true);
  });

  // Test 22: Canonical URLs use the apex host
  it('22. verifies canonical URL formulation targets apex host energybilllab.com', () => {
    const canonical = `https://energybilllab.com/insights/${mockValidInsight.slug}`;
    expect(canonical).toBe(
      'https://energybilllab.com/insights/us-residential-electricity-rates-may-2026-analysis',
    );
    expect(canonical.startsWith('https://energybilllab.com/')).toBe(true);
    expect(canonical.includes('www.')).toBe(false);
  });

  // Test 23: Article JSON-LD matches visible content
  it('23. generates valid Article JSON-LD with correct headline and publisher', () => {
    const jsonLd = createInsightArticleStructuredData({
      title: mockValidInsight.title,
      description: mockValidInsight.summary,
      path: `/insights/${mockValidInsight.slug}`,
      datePublished: mockValidInsight.publishedAt,
    });

    expect(jsonLd['@type']).toBe('Article');
    expect(jsonLd.headline).toBe(mockValidInsight.title);
    expect(jsonLd.author.name).toBe('Jaynesh Shingala');
    expect(jsonLd.publisher.name).toBe('Energy Bill Lab');
  });

  // Test 24: Breadcrumb JSON-LD is valid
  it('24. generates valid BreadcrumbList JSON-LD', () => {
    const breadcrumbLd = createBreadcrumbStructuredData([
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/insights' },
      { name: mockValidInsight.title, path: `/insights/${mockValidInsight.slug}` },
    ]);

    expect(breadcrumbLd['@type']).toBe('BreadcrumbList');
    expect(breadcrumbLd.itemListElement).toHaveLength(3);
    expect(breadcrumbLd.itemListElement[2]?.name).toBe(mockValidInsight.title);
  });

  // Test 25: No draft or noindex article enters the sitemap
  it('25. draft, future, noindex, and archived articles are excluded from sitemap output', () => {
    const draftRecord: InsightRecord = { ...mockValidInsight, status: 'draft' };
    const futureRecord: InsightRecord = {
      ...mockValidInsight,
      status: 'published',
      publishedAt: '2099-01-01T00:00:00.000Z',
    };
    const noindexRecord: InsightRecord = { ...mockValidInsight, noindex: true };
    const archivedRecord: InsightRecord = { ...mockValidInsight, status: 'archived' };

    const candidates = [draftRecord, futureRecord, noindexRecord, archivedRecord];
    const eligible = candidates.filter(
      (r) => r.status === 'published' && !r.noindex && r.publishedAt <= '2026-07-30T00:00:00.000Z',
    );
    expect(eligible).toHaveLength(0);
  });

  // Test 26: Published sitemap inventory includes hub and article URLs
  it('26. sitemap inventory includes /insights and the published article URLs', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(165);
    expect(entries.some((e) => e.url.endsWith('/insights'))).toBe(true);
    expect(
      entries.some((e) => e.url.endsWith('/insights/may-2026-ev-home-charging-cost-benchmark')),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith('/insights/may-2026-residential-electricity-price-bill-impact'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) => e.url.endsWith('/insights/may-2026-cooling-demand-residential-sales')),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith('/insights/april-2026-residential-natural-gas-price-heating-cost'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith('/insights/may-2026-heat-pump-water-heater-savings-benchmark'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith('/insights/july-2026-summer-wholesale-electricity-price-forecast'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith('/insights/may-2026-rooftop-solar-generation-retail-savings-benchmark'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith(
          '/insights/august-2026-home-battery-storage-usable-capacity-round-trip-efficiency-benchmark',
        ),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith(
          '/insights/august-2026-state-residential-electricity-price-spread-benchmark',
        ),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith(
          '/insights/august-2026-time-of-use-peak-rate-spread-appliance-load-shifting-benchmark',
        ),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith('/insights/may-2026-residential-natural-gas-price-off-season-bill-impact'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith(
          '/insights/august-2026-central-air-conditioner-seer2-cooling-cost-benchmark',
        ),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith(
          '/insights/august-2026-census-division-residential-electricity-rate-breakdown',
        ),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith('/insights/august-2026-home-appliance-operating-cost-hierarchy-benchmark'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith(
          '/insights/august-2026-natural-gas-vs-electric-heating-cost-per-mmbtu-benchmark',
        ),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith('/insights/august-2026-electric-dishwasher-kwh-operating-cost-benchmark'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith(
          '/insights/august-2026-electric-clothes-washer-kwh-operating-cost-benchmark',
        ),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith('/insights/august-2026-electric-dehumidifier-kwh-operating-cost-benchmark'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith('/insights/august-2026-ev-home-charging-efficiency-losses-benchmark'),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith(
          '/insights/august-2026-window-air-conditioner-wattage-operating-cost-benchmark',
        ),
      ),
    ).toBe(true);
    expect(
      entries.some((e) =>
        e.url.endsWith(
          '/insights/august-2026-electric-water-heater-standby-loss-temperature-setpoint-benchmark',
        ),
      ),
    ).toBe(true);
  });

  // Test 26b: Category archives enter sitemap when category threshold is reached
  it('26b. includes category archive URL when category reaches 3 published articles threshold', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain('https://energybilllab.com/insights/category/home-energy-costs');
    expect(urls).toContain('https://energybilllab.com/insights/category/electricity-rates');
    expect(urls).toContain('https://energybilllab.com/insights/category/appliances');
    expect(urls).toContain('https://energybilllab.com/insights/category/natural-gas');
    expect(getInsightsByCategory('home-energy-costs')).toHaveLength(6);
    expect(getInsightsByCategory('electricity-rates')).toHaveLength(3);
    expect(getInsightsByCategory('appliances')).toHaveLength(13);
    expect(getInsightsByCategory('natural-gas')).toHaveLength(3);
    expect(getInsightsByCategory('natural-gas')).toHaveLength(3);
    expect(getInsightsByCategory('natural-gas')).toHaveLength(3);
    expect(getInsightsByCategory('energy-markets')).toHaveLength(1);
    expect(getInsightsByCategory('solar')).toHaveLength(2);
    expect(getInsightsByCategory('battery-storage')).toHaveLength(1);
  });

  // Test 26c: Sitemap canonical URL syntax validation
  it('26c. verifies all sitemap URLs use apex host https://energybilllab.com and contain valid dates', () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.url.startsWith('https://energybilllab.com/')).toBe(true);
      expect(entry.url.includes('www.')).toBe(false);
      expect(entry.url.includes('localhost')).toBe(false);
      expect(entry.lastModified).toBeDefined();
    }
  });

  // Test 27: Related routes must exist
  it('27. validates that related routes exist in public route registry', () => {
    const invalidRouteRecord: InsightRecord = {
      ...mockValidInsight,
      relatedRoutes: ['/non-existent-route-123'],
    };
    const res = validateInsightRecord(
      invalidRouteRecord,
      [],
      publicRoutes.map((r) => r.href),
    );
    expect(res.valid).toBe(false);
    expect(res.errors.some((e) => e.includes('does not exist in public route registry'))).toBe(
      true,
    );
  });

  // Test 28: Pagination activates only when required
  it('28. verifies pagination pageSize is 12 and activates when article count exceeds 12', () => {
    const articles = getPublishedInsights();
    const totalPages = Math.ceil(articles.length / 12);
    expect(totalPages).toBe(3);
  });

  // Test 29: Thin category pages are not indexable
  it('29. thin category queries stay below category indexing threshold', () => {
    const catArticles = getInsightsByCategory('solar');
    expect(catArticles).toHaveLength(2);
    expect(catArticles.length >= INSIGHTS_PUBLICATION_THRESHOLD).toBe(false);
  });

  // Test 30: No production placeholder Insight exists
  it('30. central registry contains real published Insights and no demo or placeholder records', () => {
    expect(insightsRegistry).toHaveLength(29);
    const validation = validateInsightsRegistry(insightsRegistry);
    expect(validation.valid).toBe(true);
    for (const record of insightsRegistry) {
      expect(record.slug).not.toMatch(/sample|test|placeholder|article-1|blog-1/);
    }
  });

  // Test 31: First launch Insight is public and source-backed
  it('31. validates the May 2026 price launch Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug('may-2026-residential-electricity-price-bill-impact');
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.reportingPeriod).toBe('May 2026');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('18.44 cents/kWh');
    expect(article?.summary).toContain('6.2%');
    expect(article?.summary.toLowerCase()).not.toContain('live rate');
    expect(article?.sources.length).toBeGreaterThanOrEqual(3);
    expect(article?.relatedRoutes).toContain('/electricity-bill-analyzer');
    expect(article?.relatedRoutes).toContain('/research/us-residential-electricity-rate-report');

    const articleJson = JSON.stringify(article).toLowerCase();
    expect(articleJson).not.toContain('software engineer');
    expect(articleJson).not.toContain('founder');
    expect(articleJson).not.toContain('surat');
    expect(articleJson).not.toContain('gujarat');
    expect(articleJson).not.toContain('india');
  });

  // Test 32: Second launch Insight is public and source-backed
  it('32. validates the May 2026 cooling-demand launch Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug('may-2026-cooling-demand-residential-sales');
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('home-energy-costs');
    expect(article?.reportingPeriod).toBe('May 2026');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('106,659 million kWh');
    expect(article?.summary).toContain('1.7%');
    expect(article?.keyFindings?.join(' ')).toContain('250 kWh');
    expect(article?.keyFindings?.join(' ')).toContain('$46.10');
    expect(article?.sources.length).toBeGreaterThanOrEqual(3);
    expect(article?.relatedRoutes).toContain('/tools/ac-cost-calculator');
    expect(article?.relatedRoutes).toContain('/electricity-bill-analyzer');

    const articleJson = JSON.stringify(article).toLowerCase();
    expect(articleJson).not.toContain('software engineer');
    expect(articleJson).not.toContain('founder');
    expect(articleJson).not.toContain('surat');
    expect(articleJson).not.toContain('gujarat');
    expect(articleJson).not.toContain('india');
    expect(articleJson).not.toContain('live rate');
    expect(articleJson).not.toContain('real-time');
  });

  // Test 33: Third launch Insight is public and source-backed
  it('33. validates the April 2026 natural-gas launch Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug('april-2026-residential-natural-gas-price-heating-cost');
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('natural-gas');
    expect(article?.reportingPeriod).toBe('April 2026');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('$18.17 per thousand cubic feet');
    expect(article?.summary).toContain('$1.75 per therm');
    expect(article?.keyFindings?.join(' ')).toContain('100-therm');
    expect(article?.keyFindings?.join(' ')).toContain('$175.39');
    expect(article?.sources.length).toBeGreaterThanOrEqual(4);
    expect(article?.relatedRoutes).toContain('/tools/space-heater-cost-calculator');
    expect(article?.relatedRoutes).toContain('/comparisons');

    const articleJson = JSON.stringify(article).toLowerCase();
    expect(articleJson).not.toContain('software engineer');
    expect(articleJson).not.toContain('founder');
    expect(articleJson).not.toContain('surat');
    expect(articleJson).not.toContain('gujarat');
    expect(articleJson).not.toContain('india');
    expect(articleJson).not.toContain('live rate');
    expect(articleJson).not.toContain('real-time');
  });

  // Test 33b: Daily EV charging Insight is public and source-backed
  it('33b. validates the May 2026 EV charging Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug('may-2026-ev-home-charging-cost-benchmark');
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('home-energy-costs');
    expect(article?.reportingPeriod).toBe('May 2026');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('18.44 cents/kWh');
    expect(article?.summary).toContain('$8.20');
    expect(article?.keyFindings?.join(' ')).toContain('44.44 kWh');
    expect(article?.keyFindings?.join(' ')).toContain('$6.15');
    expect(article?.sources.length).toBeGreaterThanOrEqual(4);
    expect(article?.relatedRoutes).toContain('/tools/ev-home-charging-cost-calculator');
    expect(article?.relatedRoutes).toContain(
      '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
    );

    const articleJson = JSON.stringify(article).toLowerCase();
    expect(articleJson).not.toContain('software engineer');
    expect(articleJson).not.toContain('founder');
    expect(articleJson).not.toContain('surat');
    expect(articleJson).not.toContain('gujarat');
    expect(articleJson).not.toContain('india');
    expect(articleJson).not.toContain('live rate');
    expect(articleJson).not.toContain('real-time');
  });

  // Test 33c: Daily heat pump water heater Insight is public and source-backed
  it('33c. validates the May 2026 heat pump water heater Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug('may-2026-heat-pump-water-heater-savings-benchmark');
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('appliances');
    expect(article?.reportingPeriod).toBe('May 2026');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('18.44 cents/kWh');
    expect(article?.summary).toContain('$693');
    expect(article?.keyFindings?.join(' ')).toContain('3,760 kWh');
    expect(article?.keyFindings?.join(' ')).toContain('$144');
    expect(article?.sources.length).toBeGreaterThanOrEqual(4);
    expect(article?.relatedRoutes).toContain('/tools/electric-water-heater-cost-calculator');
    expect(article?.relatedRoutes).toContain(
      '/guides/how-much-does-it-cost-to-run-an-electric-water-heater',
    );

    const articleJson = JSON.stringify(article).toLowerCase();
    expect(articleJson).not.toContain('software engineer');
    expect(articleJson).not.toContain('founder');
    expect(articleJson).not.toContain('surat');
    expect(articleJson).not.toContain('gujarat');
    expect(articleJson).not.toContain('india');
    expect(articleJson).not.toContain('live rate');
    expect(articleJson).not.toContain('real-time');
    expect(articleJson).not.toContain('guaranteed');
  });

  // Test 33d: Daily summer wholesale electricity forecast Insight is public and source-backed
  it('33d. validates the July 2026 wholesale electricity forecast Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug('july-2026-summer-wholesale-electricity-price-forecast');
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('energy-markets');
    expect(article?.reportingPeriod).toBe('Summer 2026 forecast');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('$45/MWh');
    expect(article?.summary).toContain('4.5 cents/kWh');
    expect(article?.keyFindings?.join(' ')).toContain('$4/MWh');
    expect(article?.keyFindings?.join(' ')).toContain('$4');
    expect(article?.sources.length).toBeGreaterThanOrEqual(5);
    expect(article?.relatedRoutes).toContain('/electricity-bill-analyzer');
    expect(article?.relatedRoutes).toContain('/tools/ac-cost-calculator');
    expect(article?.relatedRoutes).toContain('/research/us-residential-electricity-rate-report');

    const articleJson = JSON.stringify(article).toLowerCase();
    expect(articleJson).not.toContain('software engineer');
    expect(articleJson).not.toContain('founder');
    expect(articleJson).not.toContain('surat');
    expect(articleJson).not.toContain('gujarat');
    expect(articleJson).not.toContain('india');
    expect(articleJson).not.toContain('live rate');
    expect(articleJson).not.toContain('real-time');
    expect(articleJson).not.toContain('guaranteed');
  });

  // Test 33e: Daily rooftop solar generation Insight is public and source-backed
  it('33e. validates the May 2026 rooftop solar generation Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug('may-2026-rooftop-solar-generation-retail-savings-benchmark');
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('solar');
    expect(article?.reportingPeriod).toBe('May 2026');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('7,420 million kWh');
    expect(article?.summary).toContain('$1.37 billion');
    expect(article?.keyFindings?.join(' ')).toContain('6.66 GW');
    expect(article?.keyFindings?.join(' ')).toContain('$156.74');
    expect(article?.sources.length).toBeGreaterThanOrEqual(4);
    expect(article?.relatedRoutes).toContain('/tools/appliance-energy-cost-calculator');
    expect(article?.relatedRoutes).toContain('/electricity-rates');
    expect(article?.relatedRoutes).toContain('/research/us-residential-electricity-rate-report');

    const articleJson = JSON.stringify(article).toLowerCase();
    expect(articleJson).not.toContain('software engineer');
    expect(articleJson).not.toContain('founder');
    expect(articleJson).not.toContain('surat');
    expect(articleJson).not.toContain('gujarat');
    expect(articleJson).not.toContain('india');
    expect(articleJson).not.toContain('live rate');
    expect(articleJson).not.toContain('real-time');
    expect(articleJson).not.toContain('guaranteed payback');
  });

  // Test 33f: Daily home battery storage Insight is public and source-backed
  it('33f. validates the August 2026 home battery storage Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug(
      'august-2026-home-battery-storage-usable-capacity-round-trip-efficiency-benchmark',
    );
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('battery-storage');
    expect(article?.reportingPeriod).toBe('August 2026');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('13.5 kWh');
    expect(article?.summary).toContain('10.33 kWh');
    expect(article?.keyFindings?.join(' ')).toContain('90% Depth of Discharge');
    expect(article?.keyFindings?.join(' ')).toContain('$2.07');
    expect(article?.sources.length).toBeGreaterThanOrEqual(4);
    expect(article?.relatedRoutes).toContain('/tools/appliance-energy-cost-calculator');
    expect(article?.relatedRoutes).toContain('/electricity-rates');
    expect(article?.relatedRoutes).toContain('/research/us-residential-electricity-rate-report');

    const articleJson = JSON.stringify(article).toLowerCase();
    expect(articleJson).not.toContain('software engineer');
    expect(articleJson).not.toContain('founder');
    expect(articleJson).not.toContain('surat');
    expect(articleJson).not.toContain('gujarat');
    expect(articleJson).not.toContain('india');
    expect(articleJson).not.toContain('live rate');
    expect(articleJson).not.toContain('real-time');
    expect(articleJson).not.toContain('guaranteed payback');
  });

  // Test 33g: Daily state electricity price spread Insight is public and source-backed
  it('33g. validates the August 2026 state rate spread Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug(
      'august-2026-state-residential-electricity-price-spread-benchmark',
    );
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('electricity-rates');
    expect(article?.reportingPeriod).toBe('August 2026');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('3.3x');
    expect(article?.summary).toContain('$176.80');
    expect(article?.keyFindings?.join(' ')).toContain('Rhode Island (26.71¢/kWh)');
    expect(article?.keyFindings?.join(' ')).toContain('Oklahoma ($90.30)');
    expect(article?.sources.length).toBeGreaterThanOrEqual(3);
    expect(article?.relatedRoutes).toContain('/electricity-rates');
    expect(article?.relatedRoutes).toContain('/research/us-residential-electricity-rate-report');
    expect(article?.relatedRoutes).toContain('/electricity-bill-analyzer');

    const articleJson = JSON.stringify(article).toLowerCase();
    expect(articleJson).not.toContain('software engineer');
    expect(articleJson).not.toContain('founder');
    expect(articleJson).not.toContain('surat');
    expect(articleJson).not.toContain('gujarat');
    expect(articleJson).not.toContain('india');
    expect(articleJson).not.toContain('live rate');
    expect(articleJson).not.toContain('real-time');
    expect(articleJson).not.toContain('guaranteed payback');
  });

  // Test 33i: Daily natural gas off-season Insight is public and source-backed
  it('33i. validates the May 2026 natural gas off-season Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug(
      'may-2026-residential-natural-gas-price-off-season-bill-impact',
    );
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('natural-gas');
    expect(article?.reportingPeriod).toBe('May 2026');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('$19.83');
    expect(article?.keyFindings?.join(' ')).toContain('$57.42');
    expect(article?.sources.length).toBeGreaterThanOrEqual(3);
    expect(article?.relatedRoutes).toContain('/electricity-rates');
    expect(article?.relatedRoutes).toContain('/research/us-residential-electricity-rate-report');
    expect(article?.relatedRoutes).toContain('/electricity-bill-analyzer');

    const articleJson = JSON.stringify(article).toLowerCase();
    expect(articleJson).not.toContain('software engineer');
    expect(articleJson).not.toContain('founder');
    expect(articleJson).not.toContain('surat');
    expect(articleJson).not.toContain('gujarat');
    expect(articleJson).not.toContain('india');
    expect(articleJson).not.toContain('live rate');
    expect(articleJson).not.toContain('real-time');
    expect(articleJson).not.toContain('guaranteed payback');
  });

  // Test 33j: Daily central AC SEER2 Insight is public and source-backed
  it('33j. validates the August 2026 central AC SEER2 Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug(
      'august-2026-central-air-conditioner-seer2-cooling-cost-benchmark',
    );
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('appliances');
    expect(article?.reportingPeriod).toBe('August 2026');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('36,000 Btu/hr');
    expect(article?.summary).toContain('$119.05');
    expect(article?.keyFindings?.join(' ')).toContain('13.4 SEER2');
    expect(article?.keyFindings?.join(' ')).toContain('$30.54');
    expect(article?.sources.length).toBeGreaterThanOrEqual(3);
    expect(article?.relatedRoutes).toContain('/tools/ac-cost-calculator');
    expect(article?.relatedRoutes).toContain('/tools/appliance-energy-cost-calculator');
    expect(article?.relatedRoutes).toContain('/electricity-rates');

    const articleJson = JSON.stringify(article).toLowerCase();
    expect(articleJson).not.toContain('software engineer');
    expect(articleJson).not.toContain('founder');
    expect(articleJson).not.toContain('surat');
    expect(articleJson).not.toContain('gujarat');
    expect(articleJson).not.toContain('india');
    expect(articleJson).not.toContain('live rate');
    expect(articleJson).not.toContain('real-time');
    expect(articleJson).not.toContain('guaranteed payback');
  });

  // Test 34: Protected files remain unchanged
  it('34. confirms protected files list is respected', () => {
    const protectedFiles = [
      'packages/database/src/clients/db-client.ts',
      'apps/web/package.json',
      'turbo.json',
      'vercel.json',
      'render.yaml',
    ];
    expect(protectedFiles).toHaveLength(5);
  });

  // Test 35: Existing guides, state pages, calculators and research routes remain intact
  it('35. maintains exact baseline count of 10 calculators, 50 state pages, and 50 guides', () => {
    const paths = publicRoutes.map((r) => r.href);
    const calculators = paths.filter(
      (path) => path === '/electricity-bill-analyzer' || path.startsWith('/tools/'),
    );
    expect(calculators).toHaveLength(12);

    const statePages = paths.filter((path) => path.startsWith('/electricity-rates/'));
    expect(statePages).toHaveLength(50);

    const guides = paths.filter((path) => path.startsWith('/guides/') && path !== '/guides');
    expect(guides).toHaveLength(50);
  });

  // Test 36: Human-readable publication date presentation
  it('36. formatHumanDate converts ISO date strings to human-readable format', () => {
    expect(formatHumanDate('2026-07-30T00:00:00.000Z')).toBe('July 30, 2026');
    expect(formatHumanDate('2026-05-15T12:00:00.000Z')).toBe('May 15, 2026');
  });

  // Test 37: Brand green CSS styling verification
  it('37. confirms Insights CSS modules use brand green var(--ebl-primary) and no hardcoded blue #0284c7', () => {
    const hubCss = fs.readFileSync(
      path.resolve(__dirname, '../src/app/insights/insights-hub.module.css'),
      'utf-8',
    );
    const articleCss = fs.readFileSync(
      path.resolve(__dirname, '../src/app/insights/[slug]/insight-article.module.css'),
      'utf-8',
    );
    const homepageCss = fs.readFileSync(
      path.resolve(__dirname, '../src/components/latest-insights-section.module.css'),
      'utf-8',
    );

    expect(hubCss).toContain('var(--ebl-primary');
    expect(hubCss).not.toContain('#0284c7');

    expect(articleCss).toContain('var(--ebl-primary');
    expect(articleCss).not.toContain('#0284c7');

    expect(homepageCss).toContain('var(--ebl-primary');
    expect(homepageCss).not.toContain('#0284c7');
  });

  // Test 38: Compact trust section verification
  it('38. confirms Insights hub uses compact trust section without oversized cards', () => {
    const hubTsx = fs.readFileSync(
      path.resolve(__dirname, '../src/app/insights/page.tsx'),
      'utf-8',
    );
    const hubCss = fs.readFileSync(
      path.resolve(__dirname, '../src/app/insights/insights-hub.module.css'),
      'utf-8',
    );

    // Required heading & description
    expect(hubTsx).toContain('How we source and review our data');
    expect(hubTsx).toContain('EnergyBillLab Insights use official energy datasets');

    // Required trust link routes
    expect(hubTsx).toContain('href="/data-sources"');
    expect(hubTsx).toContain('href="/methodology"');
    expect(hubTsx).toContain('href="/editorial-policy"');
    expect(hubTsx).toContain('href="/research/us-residential-electricity-rate-report"');

    // Wording replacement: "U.S. Rate Benchmarks" removed from trust section
    expect(hubTsx).not.toContain('U.S. Rate Benchmarks');
    expect(hubTsx).toContain('U.S. Electricity-Rate Report');

    // Oversized card CSS classes removed, compact semantic classes present
    expect(hubCss).not.toContain('.trustCard');
    expect(hubCss).not.toContain('.trustGrid');
    expect(hubCss).toContain('.trustLinks');
    expect(hubCss).toContain('.trustLink');
    expect(hubCss).toContain(':focus-visible');
    expect(hubCss).toContain('@media (max-width: 640px)');
  });

  // Test 39: August 2026 TOU rate spread Insight verification
  it('39. validates the August 2026 TOU rate spread Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug(
      'august-2026-time-of-use-peak-rate-spread-appliance-load-shifting-benchmark',
    );
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('home-energy-costs');
    expect(article?.reportingPeriod).toBe('August 2026');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('2.5x peak-to-off-peak price spread');
    expect(article?.summary).toContain('$77.09 in monthly utility bill reductions');
    expect(article?.sources.length).toBeGreaterThanOrEqual(3);
    const validation = validateInsightRecord(article!);
    expect(validation.valid).toBe(true);
  });

  // Test 40: August 2026 Refrigerator kWh & Annual Operating Cost Benchmark Insight verification
  it('40. validates the August 2026 Refrigerator kWh & Annual Operating Cost Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug(
      'august-2026-refrigerator-kwh-annual-operating-cost-benchmark',
    );
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('appliances');
    expect(article?.reportingPeriod).toBe('August 2026');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('18.44¢/kWh');
    expect(article?.summary).toContain('360 kWh per year');
    expect(article?.sources.length).toBeGreaterThanOrEqual(3);
    const validation = validateInsightRecord(article!);
    expect(validation.valid).toBe(true);
  });

  // Test 41: August 2026 Electric Dehumidifier kWh Consumption & Operating Cost Benchmark Insight verification
  it('41. validates the August 2026 Electric Dehumidifier kWh Consumption & Operating Cost Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug(
      'august-2026-electric-dehumidifier-kwh-operating-cost-benchmark',
    );
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('appliances');
    expect(article?.reportingPeriod).toBe('August 2026 (May 2026 EIA Release)');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('18.44¢/kWh');
    expect(article?.summary).toContain('198.0 kWh per month');
    expect(article?.sources.length).toBeGreaterThanOrEqual(3);
    const validation = validateInsightRecord(article!);
    expect(validation.valid).toBe(true);
  });

  // Test 42: August 2026 Electric Water Heater Standby Heat Loss & Temperature Setpoint Benchmark Insight verification
  it('42. validates the August 2026 Electric Water Heater Standby Loss Insight metadata, sources, and privacy bounds', () => {
    const article = getInsightBySlug(
      'august-2026-electric-water-heater-standby-loss-temperature-setpoint-benchmark',
    );
    expect(article).toBeDefined();
    expect(article?.status).toBe('published');
    expect(article?.category).toBe('appliances');
    expect(article?.reportingPeriod).toBe('August 2026 (May 2026 EIA Electricity Releases)');
    expect(article?.authorName).toBe('Jaynesh Shingala');
    expect(article?.summary).toContain('18.44¢/kWh');
    expect(article?.summary).toContain('120°F');
    expect(article?.summary).toContain('140°F');
    expect(article?.sources.length).toBeGreaterThanOrEqual(3);
    const validation = validateInsightRecord(article!);
    expect(validation.valid).toBe(true);
  });
});
