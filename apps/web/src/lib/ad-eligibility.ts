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
