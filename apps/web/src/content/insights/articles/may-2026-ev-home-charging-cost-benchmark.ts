import type { InsightRecord } from '../types';

export const may2026EvHomeChargingCostBenchmark: InsightRecord = {
  id: 'insight-2026-07-30-may-ev-home-charging-cost-benchmark',
  slug: 'may-2026-ev-home-charging-cost-benchmark',
  status: 'published',
  title: 'May 2026 EV Home Charging Cost Benchmark',
  metaTitle: 'May 2026 EV Home Charging Cost Benchmark',
  metaDescription:
    'EIA May 2026 residential electricity price data translated into EV home charging session and driving-cost benchmarks.',
  summary:
    'At the EIA May 2026 U.S. residential average of 18.44 cents/kWh, adding 40 kWh to an EV battery models to about $8.20 from the electric meter when charging losses are estimated at 10%. A 30 kWh/100-mile EV benchmark works out to about $6.15 per 100 miles before utility fixed charges, taxes, riders, and time-of-use details.',
  category: 'home-energy-costs',
  primaryIntent: 'explain May 2026 U.S. residential electricity price EV home charging cost',
  primaryQuery: 'may 2026 ev home charging cost',
  secondaryQueries: [
    'ev home charging cost at 18.44 cents per kwh',
    'may 2026 eia residential electricity price ev charging',
    'electric vehicle cost per 100 miles residential electricity rate',
  ],
  intentFingerprint: 'may-2026-us-residential-electricity-price-ev-home-charging-cost-benchmark',
  canonicalTopic: 'may-2026-us-residential-electricity-price-ev-home-charging-benchmark',
  geography: 'united-states',
  reportingPeriod: 'May 2026',
  publishedAt: '2026-07-25',
  updatedAt: null,
  updateCadence: 'one-time',
  authorName: 'Jaynesh Shingala',
  keyFindings: [
    'EIA reported the May 2026 U.S. residential average retail price at 18.44 cents/kWh, 6.2% higher than May 2025.',
    'A 40 kWh EV battery-energy addition requires about 44.44 kWh at the meter when modeled with 90% charging efficiency.',
    'At 18.44 cents/kWh, that 40 kWh battery addition models to about $8.20 before fixed charges, taxes, riders, and time-of-use pricing.',
    'For driving cost, a 30 kWh/100-mile EV benchmark models to about $6.15 per 100 miles after applying the same 90% meter-to-battery assumption.',
  ],
  bodyParagraphs: [
    'The May 2026 residential electricity price update matters for EV owners because home charging is usually paid through the same household electric bill as appliances, cooling, and lighting. EIA reported the U.S. residential average revenue per kWh at 18.44 cents/kWh for May 2026, with the residential sector up 6.2% from May 2025.',
    'That EIA value is not a charger quote, a utility tariff, or an all-in bill price. It is a national average revenue-per-kWh measure calculated from utility retail revenue and sales volume. A household on a time-of-use plan, EV rider, municipal utility rate, or high fixed-charge tariff can land above or below the modeled benchmark.',
    'The practical EV charging step is to translate battery energy into meter energy. Because some electricity is lost between the wall outlet or Level 2 equipment and the vehicle battery, a 40 kWh battery addition requires more than 40 kWh at the electric meter.',
  ],
  sections: [
    {
      heading: 'Modeled charging session costs',
      paragraphs: [
        'This benchmark uses a 90% meter-to-battery efficiency assumption for simple household math. A 20 kWh battery-energy addition becomes 22.22 kWh at the meter and costs about $4.10 at 18.44 cents/kWh. A 40 kWh addition becomes 44.44 kWh and costs about $8.20. A 60 kWh addition becomes 66.67 kWh and costs about $12.29.',
        'The formula is meter kWh = battery kWh added divided by charging efficiency. Cost then equals meter kWh multiplied by $0.1844/kWh. The result is a benchmark for the energy-use portion of a charging event, not a prediction of a full household bill.',
        'Level 1 and Level 2 charging both happen at home for many drivers. The U.S. Department of Energy Alternative Fuels Data Center says Level 1 uses a standard 120 V outlet, while Level 2 uses 240 V equipment and can generally charge a depleted all-electric vehicle overnight.',
      ],
    },
    {
      heading: 'Modeled cost per 100 miles',
      paragraphs: [
        'AFDC describes kWh per 100 miles as a common fuel-economy metric for electric vehicles and notes that light-duty all-electric vehicles can use about 25 to 40 kWh to drive 100 miles, depending on vehicle and driving conditions.',
        'Using that range with the May 2026 residential price creates a useful driving-cost band. At 90% charging efficiency, a 25 kWh/100-mile EV draws about 27.78 kWh from the meter and costs about $5.12 per 100 miles. A 30 kWh/100-mile benchmark draws about 33.33 kWh and costs about $6.15. A 40 kWh/100-mile benchmark draws about 44.44 kWh and costs about $8.20.',
        'Drivers should compare this national benchmark with their own utility bill or EV time-of-use plan. Off-peak charging can lower the result, while high retail prices, demand charges, or charging during peak periods can raise it.',
      ],
    },
    {
      heading: 'Why the benchmark differs from a calculator result',
      paragraphs: [
        'This Insight uses one national EIA reporting-period price and a small set of scenarios so readers can understand the scale of May 2026 home charging costs. The EV Home Charging Cost Calculator remains the right tool for a household-specific result because it accepts battery size, starting charge, target charge, charging efficiency, local rate, and driving assumptions.',
        'The article also separates the battery-energy amount from the meter-energy amount. That distinction prevents a common undercount: multiplying battery kWh directly by the retail electricity price ignores charging losses and understates the amount billed by the utility meter.',
      ],
    },
    {
      heading: 'Methodology and limits',
      paragraphs: [
        "This article uses EIA's May 2026 Electricity Monthly Update, released July 23, 2026, for the national residential average revenue per kWh. It uses AFDC consumer guidance for home charging context and AFDC fuel-economy guidance for the 25 to 40 kWh/100-mile light-duty EV range.",
        'Charging efficiency is modeled at 90% for the main scenarios. DOE FEMP purchasing guidance includes 90%, 93%, and 97% on-mode efficiency examples for EV supply equipment, so the 90% assumption is a conservative household benchmark rather than a universal charger rating.',
        'All costs are rounded to the nearest cent at the presentation step. The analysis does not include fixed customer charges, taxes, utility riders, public charging prices, parking fees, gasoline comparisons, battery degradation, cold-weather efficiency changes, or state-specific tariffs.',
      ],
    },
  ],
  practicalExample:
    'A driver adding 40 kWh to the battery would draw about 44.44 kWh from the meter at 90% charging efficiency. At 18.44 cents/kWh, the modeled charging-session energy cost is about $8.20 before fixed charges, taxes, riders, and local tariff details.',
  methodologyNotes:
    'Formulas: meter kWh = battery kWh added / 0.90. Session cost = meter kWh * $0.1844/kWh. Cost per 100 miles = (vehicle kWh per 100 miles / 0.90) * $0.1844/kWh. Scenario values are rounded to the nearest cent only after calculation.',
  sources: [
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Electricity Monthly Update: May 2026',
      url: 'https://www.eia.gov/electricity/monthly/update/',
      topic:
        'May 2026 residential average revenue per kWh, year-over-year change, release date, and retail-sales context.',
    },
    {
      organization: 'U.S. Department of Energy Alternative Fuels Data Center',
      title: 'Electric Vehicles for Consumers',
      url: 'https://afdc.energy.gov/vehicles/electric-consumers',
      topic: 'Home Level 1 and Level 2 charging context and charging-location guidance.',
    },
    {
      organization: 'U.S. Department of Energy Alternative Fuels Data Center',
      title: 'Electric Vehicle Benefits and Considerations',
      url: 'https://afdc.energy.gov/fuels/electricity-benefits',
      topic: 'EV fuel-economy metrics and 25 to 40 kWh per 100 miles consumption range.',
    },
    {
      organization: 'U.S. Department of Energy',
      title: 'Purchasing Energy-Efficient Electric Vehicle Supply Equipment',
      url: 'https://www.energy.gov/cmei/femp/purchasing-energy-efficient-electric-vehicle-supply-equipment',
      topic: 'EV supply equipment efficiency examples used to frame the charging-loss assumption.',
    },
  ],
  relatedRoutes: [
    '/tools/ev-home-charging-cost-calculator',
    '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
    '/electricity-bill-analyzer',
    '/electricity-rates',
    '/research/us-residential-electricity-rate-report',
    '/guides/why-electricity-rates-change',
    '/data-sources',
    '/methodology',
  ],
};
