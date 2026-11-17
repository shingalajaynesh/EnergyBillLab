import { HISTORICAL_ELECTRICITY_BENCHMARKS } from '@/lib/constants/electricity';

import type { InsightRecord } from '../types';

const homeRate = HISTORICAL_ELECTRICITY_BENCHMARKS['2026-05']!.priceCentsPerKwh / 100;
const gasolinePrice = 4.085;
const mpg = 28;
const batteryKwhPer100Miles = 30;
const chargingEfficiency = 0.9;
const gridKwhPer100Miles = batteryKwhPer100Miles / chargingEfficiency;
const gasCost = (100 / mpg) * gasolinePrice;
const homeCost = gridKwhPer100Miles * homeRate;
const publicRate = 0.45;
const mixedRate = homeRate * 0.8 + publicRate * 0.2;
const breakEvenCents = (gasCost / gridKwhPer100Miles) * 100;

export const EV_CHARGING_COST_EXAMPLES = [
  { label: 'All charging at home', cost: homeCost },
  { label: '80% home charging, 20% public charging by kWh', cost: gridKwhPer100Miles * mixedRate },
  { label: 'Gasoline at 28 MPG', cost: gasCost },
  { label: 'All charging at 45¢/kWh', cost: gridKwhPer100Miles * publicRate },
];

export const august2026EvVsGasCarFuelCostPer100MilesBenchmark: InsightRecord = {
  id: 'august-2026-ev-vs-gas-car-fuel-cost-per-100-miles-benchmark',
  slug: 'august-2026-ev-vs-gas-car-fuel-cost-per-100-miles-benchmark',
  title: 'EV vs. Gasoline Cost per 100 Miles: When Does Charging Break Even?',
  metaTitle: 'EV vs. Gasoline Cost per 100 Miles and Break-Even Rate',
  metaDescription:
    'Compare home charging, mixed charging, and gasoline for the same 100 miles. Calculate the electricity price at which the EV and gas car cost the same to fuel.',
  status: 'published',
  publishedAt: '2026-08-26',
  updatedAt: '2026-11-17',
  category: 'home-energy-costs',
  canonicalTopic: 'august-2026-ev-vs-gas-car-fuel-cost-per-100-miles-benchmark',
  intentFingerprint: 'ev-vs-gas-car-fuel-cost-per-100-miles-egallon-benchmark-2026',
  primaryIntent:
    'Compare fuel costs per 100 miles and calculate the charging price that makes an EV and gas car cost the same to fuel.',
  primaryQuery: 'ev vs gas car fuel cost per 100 miles',
  secondaryQueries: ['ev charging break-even price per kwh', 'home vs public charging gas cost'],
  geography: 'united-states',
  reportingPeriod: 'May 2026 electricity; August 24, 2026 gasoline',
  authorName: 'Jaynesh Shingala',
  updateCadence: 'annual',
  noindex: false,
  summary: `In this example, home charging costs $${homeCost.toFixed(2)} per 100 miles and a 28 MPG gasoline car costs $${gasCost.toFixed(2)} per 100 miles at $${gasolinePrice} per gallon. The EV uses 30 kWh of battery energy per 100 miles, or about 33.3 kWh at the wall. At roughly ${breakEvenCents.toFixed(1)}¢/kWh, the two fuel costs are equal.`,
  keyFindings: [
    'EIA supplies the historical national electricity and gasoline prices. Vehicle efficiency, charging efficiency, and the public charger price are scenario inputs.',
    'An EPA label or a charger reading already reflects electricity at the wall. Add a charging-loss adjustment only when starting with battery-side energy.',
  ],
  sections: [
    {
      heading: 'Compare the same 100 miles',
      paragraphs: [
        'Divide 100 miles by the gas car’s MPG, then multiply by the price per gallon. For an EV, multiply kWh drawn at the wall per 100 miles by the price per kWh.',
        'The example uses the May 2026 EIA residential average of 18.44¢/kWh and the EIA regular gasoline price of $4.085 per gallon for the week of August 24, 2026. These prices illustrate the calculation and come from different reporting periods.',
        '| Scenario | Fuel cost per 100 miles |',
        '| :--- | ---: |',
        ...EV_CHARGING_COST_EXAMPLES.map(({ label, cost }) => `| ${label} | $${cost.toFixed(2)} |`),
      ],
    },
    {
      heading: 'Find the charging price that breaks even',
      paragraphs: [
        `Divide the gasoline cost per 100 miles by the EV’s wall energy per 100 miles. For this pair, the threshold is about ${breakEvenCents.toFixed(1)}¢/kWh. A higher blended charging price makes electricity more expensive for that trip.`,
        'If you charge in several places, weight each price by the kWh purchased there. Include charging fees in your actual cost per 100 miles if the station bills separately for time, sessions, or parking.',
      ],
    },
  ],
  practicalExample:
    'If 80% of the electricity comes from home at 18.44¢/kWh and 20% from public charging at 45¢/kWh, the blended price is 23.75¢/kWh. The same EV costs about $7.92 per 100 miles under that mix. The percentage refers to energy bought, so use kWh from your charger receipts.',
  methodologyNotes:
    'The EV starts at 30 kWh of battery use per 100 miles and assumes 90% charging efficiency. EPA label consumption already accounts for charging losses. This is a fuel-cost comparison. Purchase price, insurance, maintenance, and charger installation are outside the calculation.',
  sources: [
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Weekly U.S. regular gasoline prices',
      url: 'https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=EMM_EPMR_PTE_NUS_DPG&f=W',
      topic: 'Regular gasoline price for the week of August 24, 2026',
    },
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Electric Power Monthly, Table 5.3',
      url: 'https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_3',
      topic: 'May 2026 U.S. residential electricity price',
    },
    {
      organization: 'U.S. Environmental Protection Agency',
      title: 'Fuel Economy and EV Range Testing',
      url: 'https://www.epa.gov/greenvehicles/fuel-economy-and-ev-range-testing',
      topic: 'Treatment of charging losses in fuel economy labels',
    },
  ],
  relatedRoutes: [
    '/tools/ev-home-charging-cost-calculator',
    '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
    '/guides/what-is-a-time-of-use-electricity-rate',
    '/electricity-rates',
  ],
};
