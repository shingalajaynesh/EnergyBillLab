import type { InsightRecord } from '../types';

export const MAY_2026_REGIONAL_RATES = [
  {
    name: 'New England',
    cents: 28.14,
    priorYearCents: 29.21,
  },
  {
    name: 'Middle Atlantic',
    cents: 25.1,
    priorYearCents: 22.43,
  },
  {
    name: 'East North Central',
    cents: 20.76,
    priorYearCents: 18.23,
  },
  {
    name: 'West North Central',
    cents: 14.75,
    priorYearCents: 14.12,
  },
  {
    name: 'South Atlantic',
    cents: 16.14,
    priorYearCents: 15.27,
  },
  {
    name: 'East South Central',
    cents: 15.5,
    priorYearCents: 14.63,
  },
  {
    name: 'West South Central',
    cents: 15.72,
    priorYearCents: 14.85,
  },
  {
    name: 'Mountain',
    cents: 14.62,
    priorYearCents: 14.49,
  },
  {
    name: 'Pacific Contiguous',
    cents: 26.06,
    priorYearCents: 25.56,
  },
  {
    name: 'Pacific Noncontiguous',
    cents: 42.13,
    priorYearCents: 34.96,
  },
];

export const august2026CensusDivisionResidentialElectricityRateBreakdown: InsightRecord = {
  id: 'insight-2026-08-03-august-census-division-electricity-rate-breakdown',
  slug: 'august-2026-census-division-residential-electricity-rate-breakdown',
  status: 'published',
  title: 'August 2026 U.S. Census Division Residential Electricity Rate Breakdown',
  metaTitle: 'August 2026 U.S. Census Division Residential Electricity Rate Breakdown',
  metaDescription:
    'Compare the May 2026 EIA rates across Census regions, including the separate Pacific groups, and model the cost of 1,000 kWh.',
  summary:
    'For May 2026, EIA reported 14.62¢/kWh for the Mountain group, 28.14¢/kWh for New England, and 42.13¢/kWh for Pacific noncontiguous (Alaska and Hawaii). At the same 1,000 kWh, those prices imply $146.20, $281.40, and $421.30.',
  category: 'electricity-rates',
  primaryIntent:
    'explain regional residential electricity price variations across the nine U.S. Census Divisions and model 1,000 kWh monthly household bill burdens',
  primaryQuery: 'census division residential electricity rates 2026 breakdown',
  secondaryQueries: [
    'regional average cost per kwh census division 2026',
    'new england vs midwest electricity rate comparison 2026',
    'monthly 1000 kwh electric bill cost by census region',
  ],
  intentFingerprint: 'august-2026-census-division-residential-electricity-rate-breakdown',
  canonicalTopic: 'august-2026-census-division-electricity-rates',
  geography: 'united-states',
  reportingPeriod: 'May 2026',
  publishedAt: '2026-08-03',
  updatedAt: '2026-11-17',
  updateCadence: 'one-time',
  authorName: 'Jaynesh Shingala',
  keyFindings: [
    'EIA lists the Pacific contiguous and noncontiguous regions separately. The noncontiguous group combines Alaska and Hawaii. A single Pacific figure would require combining residential revenue and sales.',
    'The Mountain group had the lowest rate in the published regional rows at 14.62¢/kWh. Pacific noncontiguous had the highest at 42.13¢/kWh. New England was 28.14¢/kWh.',
  ],
  sections: [
    {
      heading: 'May 2026 rate comparison at equal usage',
      paragraphs: [
        'The table uses the residential columns of the archived EIA release. The last column applies the May 2026 price to the same 1,000 kWh in each group.',
        '| EIA region | May 2025 | May 2026 | Modeled price for 1,000 kWh |',
        '| :--- | ---: | ---: | ---: |',
        ...MAY_2026_REGIONAL_RATES.map(
          ({ name, cents, priorYearCents }) =>
            `| ${name} | ${priorYearCents.toFixed(2)}¢/kWh | ${cents.toFixed(2)}¢/kWh | $${(cents * 10).toFixed(2)} |`,
        ),
      ],
    },
    {
      heading: 'Use the region as a benchmark',
      paragraphs: [
        'The regional rate is revenue divided by sales across the included territories. Averaging the state rates with equal weights gives a different result.',
        'Keep usage constant to compare price differences. Use your own utility rate and fees to estimate an actual bill. The illustration does not project future prices or account for differences in heating and cooling use.',
      ],
    },
  ],
  practicalExample:
    'At 1,000 kWh, New England’s 28.14¢ average implies $281.40 and Mountain’s 14.62¢ average implies $146.20. The price difference is $135.20 for the same usage.',
  sources: [
    {
      organization: 'U.S. Energy Information Administration',
      title: 'July 2026 Electric Power Monthly archive, Table 5.6.A',
      url: 'https://www.eia.gov/electricity/monthly/archive/july2026.zip',
      topic: 'Residential prices by region in May 2026 and May 2025',
    },
    {
      organization: 'U.S. Census Bureau',
      title: 'Census Regions and Divisions of the United States',
      url: 'https://www2.census.gov/geo/pdfs/maps-data/maps/reference/us_regdiv.pdf',
      topic: 'Geographic definitions behind the regional comparison',
    },
  ],
  relatedRoutes: [
    '/electricity-rates',
    '/tools/electricity-bill-analyzer',
    '/research/us-residential-electricity-rate-report',
    '/electricity-rates/massachusetts',
    '/electricity-rates/ohio',
    '/data-sources',
    '/methodology',
  ],
};
