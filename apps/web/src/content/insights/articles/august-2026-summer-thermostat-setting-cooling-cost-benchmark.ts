import { HISTORICAL_ELECTRICITY_BENCHMARKS } from '@/lib/constants/electricity';

import type { InsightRecord } from '../types';

const rate = HISTORICAL_ELECTRICITY_BENCHMARKS['2026-05']!.priceCentsPerKwh / 100;
export const THERMOSTAT_RUNTIME_EXAMPLES = [6, 4].map((hours) => {
  const kwh = hours * 2.5 * 30;
  return { hours, kwh, cost: kwh * rate };
});

export const august2026SummerThermostatSettingCoolingCostBenchmark: InsightRecord = {
  id: 'august-2026-summer-thermostat-setting-cooling-cost-benchmark',
  slug: 'august-2026-summer-thermostat-setting-cooling-cost-benchmark',
  title: 'What Does a Summer Thermostat Change Save? Compare AC Runtime',
  metaTitle: 'Summer Thermostat Cost Curve: 72°F vs 75°F vs 78°F AC Bill Benchmark | EnergyBillLab',
  metaDescription:
    'Compare measured AC runtime on similar days and estimate the cost difference using your electricity price.',
  status: 'published',
  publishedAt: '2026-08-18',
  updatedAt: '2026-11-17',
  category: 'home-energy-costs',
  canonicalTopic: 'august-2026-summer-thermostat-setting-cooling-cost-benchmark',
  intentFingerprint: 'august-2026-summer-thermostat-setting-cooling-cost-benchmark',
  primaryIntent:
    'Estimate cooling electricity savings using measured AC runtime or kWh after a change in thermostat setting.',
  primaryQuery: 'thermostat setting electricity cost 72 vs 75 vs 78 summer',
  secondaryQueries: [
    'how much does setting thermostat lower cost in summer',
    'ac electricity bill difference between 72 and 78 degrees',
    'cost per degree to lower thermostat in summer eia data',
    'summer thermostat setting financial curve electricity bill impact',
  ],
  geography: 'united-states',
  reportingPeriod: 'August 2026 (May 2026 EIA Electricity Releases)',
  authorName: 'Jaynesh Shingala',
  updateCadence: 'annual',
  noindex: false,
  summary:
    'In an example with a 2.5 kW air conditioner, cutting active cooling from six hours to four hours per day saves 150 kWh over 30 days. At 18.44¢/kWh, that is $27.66. Compare actual runtime or measured kWh under similar conditions to see what a thermostat change saves in your home.',
  keyFindings: [
    'Use measured kWh for variable-speed equipment. Runtime alone cannot tell you how much power the system used at each speed.',
    'Compare days with similar weather, humidity, occupancy, and cooling schedules. A temperature change does not imply a universal change in runtime.',
  ],
  sections: [
    {
      heading: 'Compare two similar sets of cooling days',
      paragraphs: [
        'Record your thermostat’s cooling runtime for several days at each comfortable setting. Check outdoor conditions and make a note of unusual loads such as guests or cooking. A warmer, more humid week can hide savings even when the setting changes.',
        'For fixed-speed equipment with a known active power draw, multiply its kW by the cooling hours. If you can measure system electricity directly, compare kWh instead. A seasonal SEER2 rating alone does not report active watts.',
      ],
    },
    {
      heading: 'Convert the difference to electricity cost',
      paragraphs: [
        'In this hypothetical example, a system draws 2.5 kW while cooling. It runs six hours per day in the first case and four in the second. The power and runtimes are assumptions that illustrate the math.',
        '| Measured-runtime scenario | 30-day energy | Cost at 18.44¢/kWh |',
        '| :--- | ---: | ---: |',
        ...THERMOSTAT_RUNTIME_EXAMPLES.map(
          ({ hours, kwh, cost }) =>
            `| ${hours} active hours per day | ${kwh} kWh | $${cost.toFixed(2)} |`,
        ),
        'On a time-of-use plan, compare electricity used in each price period. A lower total kWh does not tell you how much energy was avoided at the peak price.',
      ],
    },
  ],
  practicalExample:
    'The two-hour daily difference saves 5 kWh per day at 2.5 kW. If the pattern holds for 30 days, the difference is 150 kWh, or $27.66 at 18.44¢/kWh. Use a longer set of comparable days before extrapolating to a month.',
  methodologyNotes:
    'The electricity price is the EIA May 2026 national residential average. This comparison estimates electricity for the specified runtime and fixed power. It does not predict a house’s response to a thermostat setting, cooling comfort, or changes in indoor humidity.',
  sources: [
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Electric Power Monthly, Table 5.3',
      url: 'https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_3',
      topic: 'May 2026 national residential electricity price',
    },
    {
      organization: 'U.S. Department of Energy',
      title: 'Home Cooling',
      url: 'https://www.energy.gov/home-cooling',
      topic: 'Cooling approaches and the role of climate and humidity',
    },
    {
      organization: 'ENERGY STAR',
      title: 'Smart Thermostats',
      url: 'https://www.energystar.gov/products/smart_thermostats',
      topic: 'Thermostat scheduling and device features',
    },
  ],
  relatedRoutes: [
    '/tools/ac-cost-calculator',
    '/electricity-bill-analyzer',
    '/electricity-rates',
    '/guides/why-is-my-electric-bill-so-high-in-summer',
    '/guides/how-much-can-a-smart-thermostat-save',
    '/tools/appliance-energy-cost-calculator',
  ],
};
