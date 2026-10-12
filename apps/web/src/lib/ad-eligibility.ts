import { PUBLISHED_STATE_ROUTES } from '@/config/published-states';
import { GUIDE_ROUTES } from '@/content/guides';

/**
 * Centralized Google AdSense Route-Level Ad Eligibility System
 *
 * Enforces Google Publisher Policies regarding screens without publisher content,
 * dead-end utility routes, policy pages, and non-content areas.
 */

export const CORE_STATIC_ADS_ALLOWED_ROUTES = [
  '/',
  '/electricity-bill-analyzer',
  '/tools/appliance-energy-cost-calculator',
  '/tools/ac-cost-calculator',
  '/tools/space-heater-cost-calculator',
  '/tools/ev-home-charging-cost-calculator',
  '/tools/refrigerator-cost-calculator',
  '/tools/clothes-dryer-cost-calculator',
  '/tools/electric-water-heater-cost-calculator',
  '/tools/pool-pump-cost-calculator',
  '/tools/dehumidifier-cost-calculator',
  '/electricity-rates',
  '/methodology',
  '/data-sources',
  '/editorial-policy',
] as const;

export const STATIC_ADS_ALLOWED_ROUTES = [
  ...CORE_STATIC_ADS_ALLOWED_ROUTES,
  ...GUIDE_ROUTES,
] as const;

export const ADS_ALLOWED_ROUTES = [
  ...STATIC_ADS_ALLOWED_ROUTES,
  ...PUBLISHED_STATE_ROUTES,
] as const;

export type AllowedAdRoute = (typeof ADS_ALLOWED_ROUTES)[number];

export type RouteAdClassification =
  | 'eligible_home'
  | 'eligible_tool'
  | 'eligible_guide'
  | 'eligible_state_report'
  | 'ineligible_legal'
  | 'ineligible_contact'
  | 'ineligible_navigation_hub'
  | 'ineligible_download'
  | 'ineligible_error';

/**
 * Checks if a given route path is eligible to render advertisements.
 * Defaults to false for unknown, private, legal, or transactional routes.
 *
 * @param path The route path string (e.g., '/electricity-bill-analyzer')
 * @returns boolean True if ad rendering is permitted, false otherwise.
 */
export function isAdEligibleRoute(path: string | null | undefined): boolean {
  if (!path) return false;

  // Strip query parameters and trailing slashes for canonical path evaluation
  const cleanPath = path.split('?')[0]?.split('#')[0]?.replace(/\/$/, '') || '/';

  return (
    (STATIC_ADS_ALLOWED_ROUTES as readonly string[]).includes(cleanPath) ||
    (PUBLISHED_STATE_ROUTES as readonly string[]).includes(cleanPath)
  );
}

export function classifyRouteAdEligibility(pathname: string): {
  classification: RouteAdClassification;
  isEligible: boolean;
  reason: string;
} {
  const cleanPath = pathname.split('?')[0]?.split('#')[0]?.replace(/\/$/, '') || '/';
  const isEligible = isAdEligibleRoute(cleanPath);

  if (isEligible) {
    if (cleanPath === '/') {
      return {
        classification: 'eligible_home',
        isEligible: true,
        reason: 'Homepage with rich interactive tools and live national rate benchmarks.',
      };
    }
    if (cleanPath.startsWith('/tools/')) {
      return {
        classification: 'eligible_tool',
        isEligible: true,
        reason:
          'Substantive engineering calculator with detailed methodology and mathematical formulas.',
      };
    }
    if (cleanPath.startsWith('/electricity-rates/')) {
      return {
        classification: 'eligible_state_report',
        isEligible: true,
        reason:
          'Comprehensive state-level empirical electricity rate analysis and bill impact data.',
      };
    }
    if (cleanPath.startsWith('/guides/')) {
      return {
        classification: 'eligible_guide',
        isEligible: true,
        reason: 'Comprehensive, illustrated consumer energy education guide.',
      };
    }
  }

  // Handle ineligible categories
  if (cleanPath.includes('/csv')) {
    return {
      classification: 'ineligible_download',
      isEligible: false,
      reason: 'Raw data / CSV endpoint: strictly excluded from ad monetization.',
    };
  }

  if (
    cleanPath === '/privacy' ||
    cleanPath === '/terms' ||
    cleanPath === '/cookies' ||
    cleanPath === '/disclaimer'
  ) {
    return {
      classification: 'ineligible_legal',
      isEligible: false,
      reason: 'Policy-prohibited: ads must never appear on legal, terms, or privacy pages.',
    };
  }

  if (cleanPath === '/contact' || cleanPath === '/accessibility') {
    return {
      classification: 'ineligible_contact',
      isEligible: false,
      reason: 'Policy-prohibited: ads must not appear on utility contact/accessibility screens.',
    };
  }

  if (
    ['/tools', '/guides', '/research', '/insights', '/comparisons', '/appliances'].includes(
      cleanPath,
    ) ||
    cleanPath.startsWith('/insights/category/')
  ) {
    return {
      classification: 'ineligible_navigation_hub',
      isEligible: false,
      reason:
        'Directory/hub page: contains primarily navigation cards without substantive publisher prose.',
    };
  }

  return {
    classification: 'ineligible_error',
    isEligible: false,
    reason: 'Unclassified route: conservatively blocked from ad units until verified.',
  };
}
