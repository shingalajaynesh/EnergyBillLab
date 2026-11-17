import type { InsightRecord } from '../types';

export const SOLAR_CREDIT_EXAMPLES = [
  { label: 'On-site use', formula: '300 kWh × $0.30', value: 300 * 0.3 },
  { label: 'Export credit', formula: '400 kWh × $0.05', value: 400 * 0.05 },
];

export const august2026RooftopSolarNem3NetBillingExportValueBenchmark: InsightRecord = {
  id: 'insight-2026-08-14-august-rooftop-solar-nem-3-net-billing-export-value-benchmark',
  slug: 'august-2026-rooftop-solar-nem-3-net-billing-export-value-benchmark',
  status: 'published',
  title: 'August 2026 Rooftop Solar NEM 3.0 Net Billing Export Value Benchmark',
  metaTitle: 'August 2026 Rooftop Solar NEM 3.0 Net Billing Value Benchmark',
  metaDescription:
    'Understand how California’s Net Billing Tariff treats on-site use and exports. Use an example to estimate the value of shifting solar into a battery.',
  summary:
    'Under California’s Net Billing Tariff, the value of exported solar electricity depends on when it goes to the grid. In an illustrative month, using 300 kWh on site at 30¢/kWh avoids $90 in purchases. Exporting 400 kWh at an assumed average of 5¢/kWh earns $20 in credits.',
  category: 'solar',
  primaryIntent:
    'Explain how to estimate the value of on-site solar use, grid exports, and battery storage under net billing.',
  primaryQuery: 'nem 3 net billing export value solar savings benchmark 2026',
  secondaryQueries: [
    'nem 2 vs nem 3 solar bill savings comparison',
    'rooftop solar export rate avoided cost calculator 2026',
    'solar only vs solar battery payback nem 3',
  ],
  intentFingerprint: 'august-2026-rooftop-solar-nem-3-net-billing-export-value-benchmark',
  canonicalTopic: 'august-2026-solar-net-billing-export-economics',
  geography: 'united-states',
  reportingPeriod: null,
  publishedAt: '2026-08-14',
  updatedAt: '2026-11-17',
  updateCadence: 'annual',
  authorName: 'Jaynesh Shingala',
  keyFindings: [
    'The California Public Utilities Commission says Net Billing Tariff export credits reflect the value of the energy at the time it is exported. The examples below use assumed rates.',
    'Solar electricity used in the home can avoid purchases at the applicable import price. Exports should be valued at the export price for their hours.',
  ],
  sections: [
    {
      heading: 'Separate on-site use from exports',
      paragraphs: [
        'The CPUC guidance covers large investor-owned utilities in California. Check the tariff you qualify for, since program rules can differ by utility and enrollment date.',
        'In this example, 300 kWh is used on site and 400 kWh is exported in one month. Assume the household avoids 30¢/kWh when it uses solar on site and earns an average modeled credit of 5¢/kWh for its exports.',
        '| Component | Model | Monthly energy value |',
        '| :--- | :--- | ---: |',
        ...SOLAR_CREDIT_EXAMPLES.map(
          ({ label, formula, value }) => `| ${label} | ${formula} | $${value.toFixed(2)} |`,
        ),
        'The two components total $110. This is the modeled energy value before charges that remain on the bill. The example export rate is not a California-wide average.',
      ],
    },
    {
      heading: 'Estimate the value of shifting one kWh into a battery',
      paragraphs: [
        'At 90% round-trip efficiency, storing 1 kWh leaves 0.9 kWh for later use. If it offsets a purchase at 30¢/kWh, the value is 27¢. Subtract the 5¢ credit you gave up by not exporting the original kWh. In this example, the net benefit is 22¢ before battery costs.',
        'Actual battery value depends on your hourly loads, import and export prices, usable capacity, and system limits. Use the utility’s tariff and installer analysis to compare bids.',
      ],
    },
  ],
  methodologyNotes:
    'The scenario values are hypothetical and cover energy charges only. The example does not assume any tax credit. The IRS says the federal Residential Clean Energy Credit is unavailable for property placed in service after December 31, 2025. Check current rules for your own project.',
  sources: [
    {
      organization: 'California Public Utilities Commission',
      title: 'Net Energy Metering and Net Billing',
      url: 'https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/demand-side-management/customer-generation/net-energy-metering-and-net-billing',
      topic: 'California retail net billing and export compensation rules',
    },
    {
      organization: 'Internal Revenue Service',
      title: 'Residential Clean Energy Credit',
      url: 'https://www.irs.gov/credits-deductions/residential-clean-energy-credit',
      topic: 'Federal residential credit end date',
    },
    {
      organization: 'National Laboratory of the Rockies',
      title: 'Annual Technology Baseline: Residential Battery Storage',
      url: 'https://atb.nlr.gov/electricity/2024b/residential_battery_storage',
      topic: 'Modeling residential battery energy losses and operating assumptions',
    },
  ],
  relatedRoutes: [
    '/electricity-rates/california',
    '/tools/appliance-energy-cost-calculator',
    '/guides/how-net-metering-affects-your-electric-bill',
    '/electricity-bill-analyzer',
  ],
};
