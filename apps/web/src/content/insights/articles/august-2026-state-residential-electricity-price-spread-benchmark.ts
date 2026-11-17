import type { InsightRecord } from '../types';

export const MAY_2026_SPREAD_EXAMPLES = [
  {
    name: 'Hawaii',
    cents: 52,
  },
  {
    name: 'California',
    cents: 33.25,
  },
  {
    name: 'Texas',
    cents: 16.44,
  },
  {
    name: 'Washington',
    cents: 14.95,
  },
  {
    name: 'Idaho',
    cents: 12.35,
  },
];

export const august2026StateResidentialElectricityPriceSpreadBenchmark: InsightRecord = {
  id: 'insight-2026-08-01-august-state-electricity-price-spread-benchmark',
  slug: 'august-2026-state-residential-electricity-price-spread-benchmark',
  status: 'published',
  title: 'State Electricity Price Differences (May 2026 EIA Benchmark)',
  metaTitle: 'U.S. State Electricity Price Spread & Cost Disparity Report (EIA Benchmark)',
  metaDescription:
    'Compare the cost of the same 1,000 kWh using verified May 2026 state electricity averages from Idaho to Hawaii.',
  summary:
    'May 2026 EIA data show a 4.21x nationwide spread across the 50 states, from 12.35¢/kWh in Idaho to 52.00¢/kWh in Hawaii. At 1,000 kWh, the modeled cost difference is $396.50. The highest rate among contiguous states was 33.25¢/kWh in California.',
  category: 'electricity-rates',
  primaryIntent:
    'explain U.S. state electricity rate spread and regional price disparities using EIA benchmarks',
  primaryQuery: 'us state electricity rate spread comparison eia data',
  secondaryQueries: [
    'highest and lowest electricity rates by state',
    'state electricity price gap eia data',
    'regional residential electricity cost disparity per kwh',
  ],
  intentFingerprint: 'august-2026-state-residential-electricity-price-spread-benchmark',
  canonicalTopic: 'august-2026-state-residential-electricity-price-spread',
  geography: 'united-states',
  reportingPeriod: 'May 2026',
  publishedAt: '2026-07-30',
  updatedAt: '2026-11-17',
  updateCadence: 'one-time',
  authorName: 'Jaynesh Shingala',
  keyFindings: [
    'Idaho had the lowest residential rate among the 50 states in the May 2026 table, and Hawaii had the highest. California had the highest rate in the contiguous states.',
    'Washington was 14.95¢/kWh. Texas was 16.44¢/kWh. The same usage can produce different costs depending on where and when electricity is purchased.',
  ],
  sections: [
    {
      heading: 'What the same 1,000 kWh would cost',
      paragraphs: [
        'These rates come from the May 2026 residential column of EIA Electric Power Monthly Table 5.6.A. We compared all 50 states to identify the extremes. The selected benchmarks below illustrate the spread.',
        '| Geography | May 2026 residential rate | Modeled cost at 1,000 kWh |',
        '| :--- | ---: | ---: |',
        ...MAY_2026_SPREAD_EXAMPLES.map(
          ({ name, cents }) =>
            `| ${name} | ${cents.toFixed(2)}¢/kWh | $${(cents * 10).toFixed(2)} |`,
        ),
      ],
    },
    {
      heading: 'Apply the comparison to your usage',
      paragraphs: [
        'Multiply your kWh by the rate in cents and divide by 100. For an actual household comparison, use the rates and fees in the utility plans you are considering.',
        'EIA’s statewide averages are based on utility revenue divided by sales. The modeled costs apply those averages uniformly. They do not reconstruct a household’s individual bill or predict future prices.',
      ],
    },
  ],
  practicalExample:
    'At 500 kWh, the same May averages imply $61.75 in Idaho and $260.00 in Hawaii, a gap of $198.25. The gap scales with usage in this comparison. Your actual bill depends on the plan and rate period.',
  sources: [
    {
      organization: 'U.S. Energy Information Administration',
      title: 'July 2026 Electric Power Monthly archive, Table 5.6.A',
      url: 'https://www.eia.gov/electricity/monthly/archive/july2026.zip',
      topic: 'All 50 May 2026 state rates from the residential column of Table_5_06_A.xlsx',
    },
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Electric Power Monthly, Table 5.3',
      url: 'https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_3',
      topic: 'Monthly national residential price series',
    },
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Electricity prices and factors affecting prices',
      url: 'https://www.eia.gov/energyexplained/electricity/prices-and-factors-affecting-prices.php',
      topic: 'Why electricity prices vary by customer class, location, and time',
    },
  ],
  relatedRoutes: [
    '/electricity-rates',
    '/research/us-residential-electricity-rate-report',
    '/electricity-bill-analyzer',
    '/tools/appliance-energy-cost-calculator',
    '/data-sources',
    '/methodology',
  ],
};
