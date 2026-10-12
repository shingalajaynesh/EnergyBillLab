import { describe, expect, it } from 'vitest';

import { classifyRouteAdEligibility, isAdEligibleRoute } from '../src/lib/ad-eligibility';

describe('AdSense Route Eligibility & Value Governance', () => {
  it('strictly excludes legal and compliance pages', () => {
    const legalPages = ['/privacy', '/terms', '/cookies', '/disclaimer'];
    for (const page of legalPages) {
      expect(isAdEligibleRoute(page)).toBe(false);
      expect(classifyRouteAdEligibility(page).classification).toBe('ineligible_legal');
    }
  });

  it('strictly excludes contact and accessibility pages', () => {
    expect(isAdEligibleRoute('/contact')).toBe(false);
    expect(isAdEligibleRoute('/accessibility')).toBe(false);
    expect(classifyRouteAdEligibility('/contact').classification).toBe('ineligible_contact');
  });

  it('strictly excludes pure navigation/directory hubs', () => {
    const directoryHubs = [
      '/tools',
      '/guides',
      '/research',
      '/insights',
      '/comparisons',
      '/appliances',
      '/insights/category/electricity-rates',
      '/insights/category/natural-gas',
      '/insights/category/cooling-heating',
    ];
    for (const hub of directoryHubs) {
      expect(isAdEligibleRoute(hub)).toBe(false);
      expect(classifyRouteAdEligibility(hub).classification).toBe('ineligible_navigation_hub');
    }
  });

  it('strictly excludes raw download / CSV routes', () => {
    const csvRoute = '/research/us-residential-electricity-rate-report/csv';
    expect(isAdEligibleRoute(csvRoute)).toBe(false);
    expect(classifyRouteAdEligibility(csvRoute).classification).toBe('ineligible_download');
  });

  it('confirms eligibility for substantive publisher content and ineligibility for research/insights before launch review', () => {
    expect(isAdEligibleRoute('/')).toBe(true);
    expect(isAdEligibleRoute('/tools/ac-cost-calculator')).toBe(true);
    expect(isAdEligibleRoute('/electricity-rates/california')).toBe(true);
    expect(isAdEligibleRoute('/electricity-rates/north-carolina')).toBe(true);
    expect(isAdEligibleRoute('/guides/how-to-read-an-electric-bill-line-by-line')).toBe(true);
    expect(isAdEligibleRoute('/research/us-residential-electricity-rate-report')).toBe(false);
  });
});
