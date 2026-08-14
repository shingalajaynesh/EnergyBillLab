import type { InsightRecord } from '../types';

export const may2026HeatPumpWaterHeaterSavingsBenchmark: InsightRecord = {
  id: 'insight-2026-07-30-may-heat-pump-water-heater-savings-benchmark',
  slug: 'may-2026-heat-pump-water-heater-savings-benchmark',
  status: 'published',
  title: 'May 2026 Heat Pump Water Heater Savings Benchmark',
  metaTitle: 'May 2026 Heat Pump Water Heater Savings Benchmark',
  metaDescription:
    'ENERGY STAR heat pump water heater kWh savings translated with EIA May 2026 residential electricity prices.',
  summary:
    'At the EIA May 2026 U.S. residential average of 18.44 cents/kWh, ENERGY STAR heat pump water heater savings benchmarks translate to about $347 per year for a two-person household, $520 for three people, and $693 for four people. Those estimates reprice ENERGY STAR annual kWh savings with the May 2026 EIA residential electricity value, before local tariffs, taxes, and installation costs.',
  category: 'appliances',
  primaryIntent:
    'translate ENERGY STAR heat pump water heater kWh savings using May 2026 residential electricity prices',
  primaryQuery: 'may 2026 heat pump water heater savings benchmark',
  secondaryQueries: [
    'heat pump water heater savings at 18.44 cents per kwh',
    'energy star heat pump water heater annual kwh savings may 2026',
    'may 2026 residential electricity price heat pump water heater savings',
  ],
  intentFingerprint: 'may-2026-heat-pump-water-heater-electricity-savings-benchmark',
  canonicalTopic: 'may-2026-heat-pump-water-heater-savings-benchmark',
  geography: 'united-states',
  reportingPeriod: 'May 2026',
  publishedAt: '2026-07-26',
  updatedAt: null,
  updateCadence: 'one-time',
  authorName: 'Jaynesh Shingala',
  keyFindings: [
    'EIA reported the May 2026 U.S. residential average retail price at 18.44 cents/kWh, with the May 2026 issue released July 23, 2026.',
    'ENERGY STAR lists annual heat pump water heater electricity savings of 1,880 kWh for a two-person household, 2,820 kWh for three people, and 3,760 kWh for four people compared with a standard electric water heater.',
    'Repriced at 18.44 cents/kWh, those ENERGY STAR kWh savings model to about $347, $520, and $693 per year, respectively.',
    'ENERGY STAR states its published savings table assumes 14.6 cents/kWh, so the May 2026 EIA price increases the modeled four-person annual savings by about $144 before local bill details.',
  ],
  bodyParagraphs: [
    'A heat pump water heater does not need a new electricity-rate forecast to be evaluated. The practical question is how a current reporting-period residential electricity benchmark changes the dollar value of the kWh savings that ENERGY STAR already publishes for heat pump water heaters.',
    'EIA reported the May 2026 U.S. residential average retail price at 18.44 cents/kWh in the Electricity Monthly Update released July 23, 2026. ENERGY STAR lists heat pump water heater annual kWh savings by household size and states that its published dollar table assumes 14.6 cents/kWh.',
    'This Insight keeps those two pieces separate: ENERGY STAR supplies the appliance savings in kWh, and EIA supplies the May 2026 national residential electricity price. The result is a dated benchmark, not a local utility quote or a promise that one household will see the exact same bill reduction.',
  ],
  sections: [
    {
      heading: 'Original May 2026 savings table',
      paragraphs: [
        'Original comparison table: a two-person household with 1,880 kWh of ENERGY STAR annual savings models to about $346.67 at 18.44 cents/kWh. A three-person household with 2,820 kWh of savings models to about $520.01. A four-person household with 3,760 kWh of savings models to about $693.34.',
        'ENERGY STAR publishes rounded annual dollar savings of $270, $410, and $550 for those same household-size rows and states that the table assumes 14.6 cents/kWh. Repricing the kWh savings at the May 2026 EIA residential benchmark raises the modeled values by about $72, $108, and $144 per year.',
        'The calculation is intentionally simple: annual dollar value equals annual kWh savings multiplied by the residential price in dollars per kWh. This keeps the article focused on the electricity-use savings rather than installed cost, financing, tax filing, or state-specific rebate eligibility.',
      ],
    },
    {
      heading: 'Why the kWh savings matter more than the label',
      paragraphs: [
        'A standard electric resistance water heater converts electricity directly into heat. A heat pump water heater moves heat from surrounding air into the tank, so its electricity use can be much lower for the same hot-water service.',
        'ENERGY STAR says a certified heat pump water heater can save a household of four approximately $550 per year compared with a standard electric water heater under its published assumptions. Repricing the listed 3,760 kWh annual savings at the May 2026 EIA benchmark gives a higher modeled electricity value because the EIA reporting-period price is above the ENERGY STAR table assumption.',
        'That does not mean the equipment is right for every home. Installation cost, basement or garage temperature, available space, condensate drainage, noise, household hot-water demand, and local electric rates all affect the real decision.',
      ],
    },
    {
      heading: 'How incentives fit into the decision',
      paragraphs: [
        'ENERGY STAR lists a federal heat pump water heater tax credit page showing a 30% project-cost credit with a $2,000 maximum for products purchased and installed between January 1, 2023, and December 31, 2025. Because this article is written on July 30, 2026, that page should not be treated as proof of a new 2026 federal credit for a future purchase.',
        'ENERGY STAR also lists the Home Electrification and Appliances Rebate program for low-to-moderate income households, including a maximum heat pump water heater rebate amount of $1,750. The same page notes that states may restrict program eligibility and technology availability, so household decisions still require a state or utility program check.',
        'For EnergyBillLab purposes, incentives are a separate decision layer. The savings benchmark here answers the electricity-use question first: how much the ENERGY STAR kWh savings are worth when valued at the May 2026 EIA residential electricity price.',
      ],
    },
    {
      heading: 'Where this differs from the water heater calculator',
      paragraphs: [
        'The EnergyBillLab Electric Water Heater Cost Calculator models electric-resistance tank water heaters from element wattage, active daily heating hours, billing days, and local state rate inputs. It does not estimate heat pump water heater coefficient of performance or installed retrofit economics.',
        'This Insight is narrower. It uses ENERGY STAR annual kWh savings benchmarks for certified heat pump water heaters and converts them into May 2026 dollars. A household that wants its current electric-resistance tank cost should use the calculator; a household comparing a possible heat pump upgrade can use this article as a national savings benchmark before checking local quotes and incentives.',
      ],
    },
    {
      heading: 'Methodology and limits',
      paragraphs: [
        'This article uses EIA Electricity Monthly Update data for May 2026, released July 23, 2026, for the national residential average revenue per kWh. The unit is cents per kilowatthour, converted to dollars per kWh for cost math.',
        'The article uses ENERGY STAR heat pump water heater savings rows of 1,880, 2,820, and 3,760 annual kWh savings for two-, three-, and four-person households. It does not change ENERGY STAR kWh assumptions, does not estimate installation costs, and does not claim a payback period.',
        'The May 2026 EIA value is a national residential average, not a customer tariff. Results exclude fixed charges, taxes, riders, tiered rates, time-of-use rates, demand charges, installation cost, maintenance, rebates, and utility-specific delivery charges.',
      ],
    },
  ],
  practicalExample:
    'For a four-person household, ENERGY STAR lists 3,760 kWh of annual heat pump water heater savings compared with a standard electric water heater. At 18.44 cents/kWh, that models to about $693.34 per year before fixed charges, taxes, local tariff design, equipment cost, and installation details.',
  methodologyNotes:
    'Formula: annual modeled savings = annual ENERGY STAR kWh savings multiplied by $0.1844/kWh. Two-person row: 1,880 kWh * $0.1844 = $346.67. Three-person row: 2,820 kWh * $0.1844 = $520.01. Four-person row: 3,760 kWh * $0.1844 = $693.34. Difference from ENERGY STAR table assumption uses 18.44 - 14.6 = 3.84 cents/kWh.',
  sources: [
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Electricity Monthly Update: May 2026',
      url: 'https://www.eia.gov/electricity/monthly/update/',
      topic:
        'May 2026 residential average revenue per kWh, release date, next release date, and reporting-period context.',
    },
    {
      organization: 'ENERGY STAR',
      title: 'Save More with ENERGY STAR Certified Heat Pump Water Heaters',
      url: 'https://www.energystar.gov/products/heat_pump_water_heaters/benefits-savings',
      topic:
        'Heat pump water heater annual kWh savings by household size and the 14.6 cents/kWh table assumption.',
    },
    {
      organization: 'ENERGY STAR',
      title: 'Heat Pump Water Heaters Tax Credit',
      url: 'https://www.energystar.gov/about/federal-tax-credits/heat-pump-water-heaters',
      topic:
        'Heat pump water heater tax credit amount, eligibility window, and household eligibility notes.',
    },
    {
      organization: 'ENERGY STAR',
      title: 'Home Electrification and Appliances Rebate Program',
      url: 'https://www.energystar.gov/partner-resources/state-and-tribal-rebate-programs/hear-program',
      topic: 'HEAR heat pump water heater rebate maximum and state-level eligibility caveats.',
    },
  ],
  relatedRoutes: [
    '/tools/electric-water-heater-cost-calculator',
    '/guides/how-much-does-it-cost-to-run-an-electric-water-heater',
    '/tools/appliance-energy-cost-calculator',
    '/guides/how-much-electricity-do-household-appliances-use',
    '/electricity-bill-analyzer',
    '/electricity-rates',
    '/data-sources',
    '/methodology',
  ],
};
