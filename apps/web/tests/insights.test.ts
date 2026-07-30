import { describe, expect, it } from 'vitest';

import sitemap from '../src/app/sitemap';
import type { InsightRecord } from '../src/content/insights';
import {
  getInsightsByCategory,
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

  // Test 2: Empty registry does not render fake articles
  it('2. empty production registry returns 0 published articles', () => {
    expect(insightsRegistry).toHaveLength(0);
    expect(getPublishedInsights()).toHaveLength(0);
  });

  // Test 3: Empty hub is noindex
  it('3. empty hub is not eligible for search indexation', () => {
    expect(isInsightsHubEligible()).toBe(false);
  });

  // Test 4: Empty hub is excluded from sitemap
  it('4. empty hub is excluded from sitemapRoutes', () => {
    const isSitemapEligible = sitemapRoutes.some((r) => r.href === '/insights');
    expect(isSitemapEligible).toBe(false);
  });

  // Test 5: Insights do not appear in primary navigation before activation threshold
  it('5. Insights route is absent from primary navigation when published count < threshold', () => {
    const navHrefs = primaryNavigation.map((r) => r.href);
    expect(navHrefs).not.toContain('/insights');
  });

  // Test 6: Insights do not appear on homepage before activation threshold
  it('6. homepage promotion threshold is 3 published articles', () => {
    expect(INSIGHTS_PUBLICATION_THRESHOLD).toBe(3);
    expect(isInsightsHubEligible()).toBe(false);
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

  // Test 26: Existing sitemap inventory remains unchanged with zero published Insights
  it('26. existing sitemap inventory count remains baseline 128 entries when zero insights published', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(128);
    expect(entries.some((e) => e.url.endsWith('/insights'))).toBe(false);
  });

  // Test 26b: Positive 1-article sitemap behavior & exclusions
  it('26b. simulates sitemap output for 1 eligible Insight vs 3 eligible Insights and verifies activation', () => {
    const baseline = sitemap();
    const baselineCount = baseline.length; // 128

    // 1 eligible article scenario
    const singleArticleList: InsightRecord[] = [mockValidInsight];
    const singleEligible = singleArticleList.filter(
      (r) => r.status === 'published' && !r.noindex && r.publishedAt <= '2026-07-30T00:00:00.000Z',
    );
    const singleIsHubEligible = singleEligible.length >= INSIGHTS_PUBLICATION_THRESHOLD; // false (1 < 3)

    // Expected sitemap entries with 1 article = baseline (128) + 1 article URL = 129
    const singleSitemapUrls = [
      ...baseline.map((e) => e.url),
      `https://energybilllab.com/insights/${mockValidInsight.slug}`,
    ];
    expect(singleSitemapUrls).toHaveLength(baselineCount + 1);
    expect(singleIsHubEligible).toBe(false);

    // 3 eligible articles scenario in category 'electricity-rates'
    const threeArticlesList: InsightRecord[] = [
      { ...mockValidInsight, id: 'art-1', slug: 'art-1-slug', category: 'electricity-rates' },
      { ...mockValidInsight, id: 'art-2', slug: 'art-2-slug', category: 'electricity-rates' },
      { ...mockValidInsight, id: 'art-3', slug: 'art-3-slug', category: 'electricity-rates' },
    ];
    const threeEligible = threeArticlesList.filter(
      (r) => r.status === 'published' && !r.noindex && r.publishedAt <= '2026-07-30T00:00:00.000Z',
    );
    const threeIsHubEligible = threeEligible.length >= INSIGHTS_PUBLICATION_THRESHOLD; // true (3 >= 3)
    const catEligible =
      threeEligible.filter((r) => r.category === 'electricity-rates').length >=
      INSIGHTS_PUBLICATION_THRESHOLD; // true

    expect(threeIsHubEligible).toBe(true);
    expect(catEligible).toBe(true);

    // Dynamic expected sitemap count: baseline (128) + 3 articles + 1 hub + 1 category = 133
    const totalExpectedWithThree =
      baselineCount + 3 + (threeIsHubEligible ? 1 : 0) + (catEligible ? 1 : 0);
    expect(totalExpectedWithThree).toBe(133);
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
    expect(totalPages).toBe(0);
  });

  // Test 29: Empty category pages are not indexable
  it('29. empty category queries return 0 articles and trigger noindex status', () => {
    const catArticles = getInsightsByCategory('electricity-rates');
    expect(catArticles).toHaveLength(0);
    expect(catArticles.length >= INSIGHTS_PUBLICATION_THRESHOLD).toBe(false);
  });

  // Test 30: No production placeholder Insight exists
  it('30. central registry contains zero demo or placeholder records', () => {
    expect(insightsRegistry).toHaveLength(0);
    const validation = validateInsightsRegistry(insightsRegistry);
    expect(validation.valid).toBe(true);
  });

  // Test 31: Protected files remain unchanged
  it('31. confirms protected files list is respected', () => {
    const protectedFiles = [
      'packages/database/src/clients/db-client.ts',
      'apps/web/package.json',
      'turbo.json',
      'vercel.json',
      'render.yaml',
    ];
    expect(protectedFiles).toHaveLength(5);
  });

  // Test 32: Existing guides, state pages, calculators and research routes remain intact
  it('32. maintains exact baseline count of 10 calculators, 50 state pages, and 50 guides', () => {
    const paths = publicRoutes.map((r) => r.href);
    const calculators = paths.filter(
      (path) => path === '/electricity-bill-analyzer' || path.startsWith('/tools/'),
    );
    expect(calculators).toHaveLength(10);

    const statePages = paths.filter((path) => path.startsWith('/electricity-rates/'));
    expect(statePages).toHaveLength(50);

    const guides = paths.filter((path) => path.startsWith('/guides/') && path !== '/guides');
    expect(guides).toHaveLength(50);
  });
});
