import type { PublicRouteHref } from '@/lib/routes';

export type InsightStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export type InsightCategory =
  | 'electricity-rates'
  | 'home-energy-costs'
  | 'appliances'
  | 'natural-gas'
  | 'solar'
  | 'battery-storage'
  | 'energy-markets'
  | 'data-updates';

export type InsightUpdateCadence = 'one-time' | 'monthly' | 'quarterly' | 'annual' | 'event-driven';

export type InsightSource = {
  organization: string;
  title: string;
  url: string;
  topic?: string;
};

export type InsightCategoryMeta = {
  description: string;
  name: string;
  slug: InsightCategory;
};

export const INSIGHT_CATEGORIES: Record<InsightCategory, InsightCategoryMeta> = {
  'electricity-rates': {
    slug: 'electricity-rates',
    name: 'Electricity Rates',
    description:
      'Monthly EIA residential price trends, state rankings, and utility tariff changes.',
  },
  'home-energy-costs': {
    slug: 'home-energy-costs',
    name: 'Home Energy Costs',
    description:
      'Household utility bill breakdowns, seasonal cost shifts, and heating/cooling economics.',
  },
  appliances: {
    slug: 'appliances',
    name: 'Appliances',
    description:
      'Wattage analysis, compressor duty cycle costs, and major appliance consumption reports.',
  },
  'natural-gas': {
    slug: 'natural-gas',
    name: 'Natural Gas',
    description:
      'Residential natural gas price data, heating fuel comparisons, and therm unit conversions.',
  },
  solar: {
    slug: 'solar',
    name: 'Solar Generation',
    description:
      'State rooftop vs. utility solar generation trends, net-metering economics, and production models.',
  },
  'battery-storage': {
    slug: 'battery-storage',
    name: 'Battery Storage',
    description:
      'Home battery usable capacity, round-trip efficiency, backup duration scenarios, and time-of-use rates.',
  },
  'energy-markets': {
    slug: 'energy-markets',
    name: 'Energy Markets',
    description:
      'Regional grid wholesale trends, capacity charges, and regulatory policy shifts affecting consumer bills.',
  },
  'data-updates': {
    slug: 'data-updates',
    name: 'Data Updates',
    description:
      'Official EIA dataset releases, benchmark methodology revisions, and EnergyBillLab index notes.',
  },
};

export interface InsightRecord {
  authorName: 'Jaynesh Shingala';
  bodyParagraphs?: string[];
  canonicalTopic: string;
  category: InsightCategory;
  featuredImage?: string;
  geography: 'united-states' | (string & {}) | null;
  id: string;
  intentFingerprint: string;
  keyFindings?: string[];
  metaDescription: string;
  metaTitle: string;
  methodologyNotes?: string;
  noindex?: boolean;
  practicalExample?: string;
  primaryIntent: string;
  primaryQuery: string;
  publishedAt: string;
  relatedRoutes: PublicRouteHref[];
  reportingPeriod: string | null;
  secondaryQueries: string[];
  sections?: { heading: string; paragraphs: string[] }[];
  slug: string;
  sourceIds?: string[];
  sources: InsightSource[];
  status: InsightStatus;
  summary: string;
  title: string;
  updateCadence: InsightUpdateCadence;
  updatedAt: string | null;
}

export type InsightTopicResearchRecord = {
  canonicalTopic: string;
  decision:
    | 'APPROVE AS NEW INSIGHT'
    | 'UPDATE EXISTING INSIGHT'
    | 'UPDATE GUIDE'
    | 'UPDATE STATE PAGE'
    | 'BUILD OR IMPROVE CALCULATOR'
    | 'ADD TO RESEARCH REPORT'
    | 'REJECT AS DUPLICATE'
    | 'DEFER FOR INSUFFICIENT DATA';
  existingPageConflicts: string[];
  geography: string;
  intentFingerprint: string;
  internalLinks: PublicRouteHref[];
  originalCalculation: string;
  originalChartOrTable: string;
  practicalExample: string;
  primaryIntent: string;
  primaryQuery: string;
  primarySources: string[];
  proposedTitle: string;
  reportingPeriod: string;
  riskOfBecomingStale: string;
  searchConsoleEvidence: string;
  secondaryQueries: string[];
  targetReader: string;
  updateCadence: InsightUpdateCadence;
};

export const INSIGHTS_PUBLICATION_THRESHOLD = 3;

export function formatHumanDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
