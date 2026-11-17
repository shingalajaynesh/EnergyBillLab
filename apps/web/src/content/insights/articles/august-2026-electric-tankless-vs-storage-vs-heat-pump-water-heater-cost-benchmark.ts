import { HISTORICAL_ELECTRICITY_BENCHMARKS } from '@/lib/constants/electricity';

import type { InsightRecord } from '../types';

const rate = HISTORICAL_ELECTRICITY_BENCHMARKS['2026-05']!.priceCentsPerKwh / 100;
export const WATER_HEATER_COST_EXAMPLES = [
  { label: 'Electric resistance storage', annualKwh: 3700 },
  { label: 'Electric tankless', annualKwh: 3250 },
  { label: 'Heat pump storage', annualKwh: 1000 },
].map((example) => ({ ...example, annualCost: example.annualKwh * rate }));

const [resistance, tankless, heatPump] = WATER_HEATER_COST_EXAMPLES;
const heatPumpSavings = resistance!.annualCost - heatPump!.annualCost;
const tanklessSavings = resistance!.annualCost - tankless!.annualCost;

export const august2026ElectricTanklessVsStorageVsHeatPumpWaterHeaterCostBenchmark: InsightRecord =
  {
    id: 'august-2026-electric-tankless-vs-storage-vs-heat-pump-water-heater-cost-benchmark',
    slug: 'august-2026-electric-tankless-vs-storage-vs-heat-pump-water-heater-cost-benchmark',
    title:
      'Electric Tankless, Storage, or Heat Pump Water Heater: Compare Running Costs and Quotes',
    metaTitle: 'Electric Tankless vs. Storage vs. Heat Pump Water Heater Cost',
    metaDescription:
      'Use estimated annual kWh and installed quotes to compare three electric water heater options. See how to calculate a five-year break-even price.',
    status: 'published',
    publishedAt: '2026-08-27',
    updatedAt: '2026-11-17',
    category: 'appliances',
    canonicalTopic:
      'august-2026-electric-tankless-vs-storage-vs-heat-pump-water-heater-cost-benchmark',
    intentFingerprint: 'electric-tankless-vs-storage-vs-heat-pump-water-heater-cost-benchmark-2026',
    primaryIntent:
      'Compare annual energy estimates and determine how much extra an electric water heater could cost upfront before savings disappear.',
    primaryQuery: 'electric tankless vs storage vs heat pump water heater cost',
    secondaryQueries: [
      'heat pump water heater payback',
      'compare electric water heater installation quotes',
    ],
    geography: 'united-states',
    reportingPeriod: 'May 2026 electricity',
    authorName: 'Jaynesh Shingala',
    updateCadence: 'annual',
    noindex: false,
    summary: `At 18.44¢/kWh, an illustrative 3,700 kWh resistance tank costs $${resistance!.annualCost.toFixed(2)} per year. An illustrative 1,000 kWh heat pump costs $${heatPump!.annualCost.toFixed(2)} per year. That difference covers about $2,490 in extra installation cost over five years if usage and rates stay constant. Substitute annual electricity estimates for the models on your quotes.`,
    keyFindings: [
      'Compare the models on their ability to meet your hot water demand before comparing cost. Energy labels are based on standardized usage patterns.',
      'Annual kWh estimates affect operating cost. The power and installation requirements affect which models can fit your home and what they cost to install.',
    ],
    sections: [
      {
        heading: 'Convert annual electricity use into dollars',
        paragraphs: [
          'Look for annual kWh on the product’s EnergyGuide label or ask the installer for an estimate. Similar-use models make for a better comparison. For tankless units, discuss the water flow and temperature rise you need when several fixtures run together.',
          'The three annual kWh figures below are hypothetical inputs that show the calculation. They are not measured results or claims about a particular product. Multiply the estimated annual kWh by your marginal electricity rate.',
          '| Example equipment | Assumed annual electricity | Modeled cost at 18.44¢/kWh |',
          '| :--- | ---: | ---: |',
          ...WATER_HEATER_COST_EXAMPLES.map(
            ({ label, annualKwh, annualCost }) =>
              `| ${label} | ${annualKwh.toLocaleString('en-US')} kWh | $${annualCost.toFixed(2)} |`,
          ),
        ],
      },
      {
        heading: 'Compare the quote premium with the annual savings',
        paragraphs: [
          'Subtract the full installed cost of the baseline unit from the quote for the alternative. Divide that premium by the expected annual electricity savings for simple payback. Include any electrical, plumbing, or other work required by the quote and subtract incentives you have confirmed.',
          `The tankless example saves $${tanklessSavings.toFixed(2)} per year relative to resistance storage. That covers only $${(tanklessSavings * 5).toFixed(2)} of extra upfront cost over five years under the stated assumptions.`,
          'Confirm that the installer has covered the parts of the job specific to each unit. For tankless, ask about the service load and flow at your coldest inlet temperature. For a heat pump, ask about the manufacturer’s room and air requirements, condensate drainage, and use of backup heat. Have a qualified installer assess electrical requirements for the exact model and home.',
        ],
      },
    ],
    practicalExample: `If the heat pump quote is $1,500 above the resistance tank quote, divide $1,500 by $${heatPumpSavings.toFixed(2)} in example annual savings. Simple payback is about ${(1500 / heatPumpSavings).toFixed(1)} years at the stated rate. Use your own installed quotes and annual kWh estimates before buying.`,
    methodologyNotes:
      'The electricity price is the EIA national residential average for May 2026. Energy-use values are scenario inputs. The comparison assumes a constant rate and annual kWh and excludes maintenance, financing, and future price changes. It does not provide wiring, circuit, or service sizing guidance.',
    sources: [
      {
        organization: 'U.S. Energy Information Administration',
        title: 'Electric Power Monthly, Table 5.3',
        topic: 'May 2026 national residential electricity price',
        url: 'https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_3',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Water heater product criteria',
        topic: 'Efficiency ratings and draw patterns',
        url: 'https://www.energystar.gov/products/water_heaters/residential_water_heaters_key_product_criteria',
      },
      {
        organization: 'ENERGY STAR',
        title: 'Heat pump water heater design considerations',
        topic: 'Model-specific installation and operating requirements',
        url: 'https://www.energystar.gov/partner-resources/residential_new/educational_resources/sup_program_guidance/heat_pump_water_heater_guide/design_considerations',
      },
      {
        organization: 'U.S. Department of Energy',
        title: 'Measure Guideline: Transitioning to a Tankless Water Heater',
        topic: 'Simultaneous flow and inlet temperature considerations',
        url: 'https://www1.eere.energy.gov/buildings/publications/pdfs/building_america/measure_guide_tanklesswh.pdf',
      },
    ],
    relatedRoutes: [
      '/tools/electric-water-heater-cost-calculator',
      '/tools/appliance-energy-cost-calculator',
      '/electricity-rates',
      '/guides/how-much-does-it-cost-to-run-an-electric-water-heater',
      '/guides/kw-vs-kwh-explained',
    ],
  };
