import { describe, expect, it } from 'vitest';
import nextConfig from '../next.config';
import sitemap from '../src/app/sitemap';

describe('Sitemap Exact Inventory & Accounting Gate', () => {
  it('enumerates, categorizes, and validates every single sitemap URL', async () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    // 1. Verify duplicates
    const uniqueUrls = Array.from(new Set(urls));
    expect(uniqueUrls.length).toBe(urls.length);

    // 2. Classify each URL into exactly ONE mutually exclusive category
    const categorized = {
      homepage: [] as string[],
      trustAndLegal: [] as string[],
      author: [] as string[],
      sectionHubs: [] as string[],
      electricityStatePages: [] as string[],
      electricityMap: [] as string[],
      tools: [] as string[],
      guides: [] as string[],
      researchReport: [] as string[],
      insights: [] as string[],
      other: [] as string[],
    };

    const trustAndLegalPaths = [
      '/about',
      '/accessibility',
      '/contact',
      '/cookies',
      '/data-sources',
      '/disclaimer',
      '/editorial-policy',
      '/methodology',
      '/privacy',
      '/terms',
    ];

    const sectionHubPaths = [
      '/appliances',
      '/compare-states',
      '/comparisons',
      '/electricity-rates',
      '/guides',
      '/insights',
    ];

    for (const url of uniqueUrls) {
      const path = url.replace('https://energybilllab.com', '') || '/';

      if (path === '/') {
        categorized.homepage.push(url);
      } else if (trustAndLegalPaths.includes(path)) {
        categorized.trustAndLegal.push(url);
      } else if (path.startsWith('/authors/')) {
        categorized.author.push(url);
      } else if (path === '/electricity-rates/map') {
        categorized.electricityMap.push(url);
      } else if (path.startsWith('/electricity-rates/')) {
        categorized.electricityStatePages.push(url);
      } else if (sectionHubPaths.includes(path)) {
        categorized.sectionHubs.push(url);
      } else if (
        path === '/tools' ||
        path.startsWith('/tools/') ||
        path === '/electricity-bill-analyzer'
      ) {
        categorized.tools.push(url);
      } else if (path.startsWith('/guides/')) {
        categorized.guides.push(url);
      } else if (path === '/research/us-residential-electricity-rate-report') {
        categorized.researchReport.push(url);
      } else if (path.startsWith('/insights/')) {
        categorized.insights.push(url);
      } else {
        categorized.other.push(url);
      }
    }

    const counts = {
      homepage: categorized.homepage.length,
      trustAndLegal: categorized.trustAndLegal.length,
      author: categorized.author.length,
      sectionHubs: categorized.sectionHubs.length,
      electricityStatePages: categorized.electricityStatePages.length,
      electricityMap: categorized.electricityMap.length,
      tools: categorized.tools.length,
      guides: categorized.guides.length,
      researchReport: categorized.researchReport.length,
      insights: categorized.insights.length,
      other: categorized.other.length,
    };

    const sumCategories = Object.values(counts).reduce((a, b) => a + b, 0);

    console.log('--- SITEMAP CATEGORY COUNTS ---');
    console.log(JSON.stringify(counts, null, 2));
    console.log('Total URLs:', uniqueUrls.length);
    console.log('Sum Categories:', sumCategories);

    expect(counts.homepage).toBe(1);
    expect(counts.trustAndLegal).toBe(10);
    expect(counts.author).toBe(1);
    expect(counts.sectionHubs).toBe(6);
    expect(counts.electricityStatePages).toBe(50);
    expect(counts.electricityMap).toBe(1);
    expect(counts.tools).toBe(16);
    expect(counts.guides).toBe(50);
    expect(counts.researchReport).toBe(1);
    expect(counts.insights).toBe(23);
    expect(counts.other).toBe(0);

    expect(sumCategories).toBe(uniqueUrls.length);
    expect(uniqueUrls.length).toBe(159);

    // 3. Verify zero redirect sources are in sitemap
    const redirects = await (
      nextConfig as {
        redirects?: () => Promise<
          Array<{ source: string; destination: string; permanent: boolean }>
        >;
      }
    ).redirects!();

    const redirectSources = redirects.map((r) => `https://energybilllab.com${r.source}`);
    const redirectsInSitemap = uniqueUrls.filter((u) => redirectSources.includes(u));
    expect(redirectsInSitemap).toHaveLength(0);

    // 4. Verify no noindex routes in sitemap
    const noindexPaths = [
      'https://energybilllab.com/research',
      'https://energybilllab.com/insights/july-2026-summer-wholesale-electricity-price-forecast',
    ];
    for (const nip of noindexPaths) {
      expect(uniqueUrls).not.toContain(nip);
    }
    expect(uniqueUrls.some((u) => u.includes('/insights/category/'))).toBe(false);
    expect(uniqueUrls.some((u) => u.includes('/insights/page/'))).toBe(false);
  });
});

