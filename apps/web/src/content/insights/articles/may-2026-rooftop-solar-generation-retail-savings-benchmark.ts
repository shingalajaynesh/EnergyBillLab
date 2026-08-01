import type { InsightRecord } from '../types';

export const may2026RooftopSolarGenerationRetailSavingsBenchmark: InsightRecord = {
  id: 'insight-2026-07-31-may-rooftop-solar-generation-retail-savings-benchmark',
  slug: 'may-2026-rooftop-solar-generation-retail-savings-benchmark',
  status: 'published',
  title: 'May 2026 U.S. Small-Scale Solar Generation Benchmark & Household Bill Impact',
  metaTitle: 'May 2026 U.S. Small-Scale Solar Generation Benchmark & Household Savings',
  metaDescription:
    'EIA May 2026 small-scale solar data analyzed: 7,420 GWh rooftop generation translated into national retail displacement and household bill savings benchmarks.',
  summary:
    'U.S. small-scale solar systems produced 7,420 million kWh (7.42 TWh) in May 2026 based on EIA Electric Power Monthly reporting. Valued at the EIA May 2026 average residential electricity price of 18.44 cents/kWh, rooftop solar generation offset an estimated $1.37 billion in gross retail electricity purchases nationwide, with a typical 7 kW array producing 850 kWh displacing about $156.74 in monthly utility charges.',
  category: 'solar',
  primaryIntent:
    'explain May 2026 small-scale residential solar generation and retail displacement value',
  primaryQuery: 'rooftop solar generation trends May 2026',
  secondaryQueries: [
    'small scale solar generation eia May 2026',
    'rooftop solar monthly savings benchmark May 2026',
    'residential solar capacity additions May 2026',
  ],
  intentFingerprint: 'may-2026-us-small-scale-solar-generation-retail-savings-benchmark',
  canonicalTopic: 'may-2026-us-small-scale-solar-generation-benchmark',
  geography: 'united-states',
  reportingPeriod: 'May 2026',
  publishedAt: '2026-07-28T12:00:00.000Z',
  updatedAt: null,
  updateCadence: 'one-time',
  authorName: 'Jaynesh Shingala',
  keyFindings: [
    'EIA reported U.S. small-scale solar net generation reached 7,420 million kWh in May 2026, up 12.8% year-over-year for the first five months of 2026.',
    'Estimated small-scale solar summer capacity expanded by 6.66 GW nationwide between June 2025 and May 2026.',
    'Valued at the May 2026 residential rate of 18.44 cents/kWh, small-scale solar generation offset an estimated $1.37 billion in gross retail electricity purchases in May 2026.',
    'A typical 7 kW residential solar array producing 850 kWh in May displaced approximately $156.74 in gross monthly retail utility electricity charges before net-metering fees or minimum monthly grid connection charges.',
  ],
  bodyParagraphs: [
    'The release of the May 2026 EIA Electric Power Monthly provides a comprehensive snapshot of how rooftop solar panels and small-scale photovoltaic systems contribute to household electricity generation across the United States. In May 2026, small-scale solar systems produced 7,420 million kWh (7.42 TWh), marking a 12.8% year-over-year generation increase during the first five months of 2026 compared to the same period in 2025.',
    'During the same May 2026 reporting period, the EIA reported the average U.S. residential retail electricity price at 18.44 cents/kWh—a 6.2% increase over May 2025. Multiplying total small-scale generation by this retail rate reveals that customer-sited solar panels displaced an estimated $1.37 billion in gross retail electricity purchases across the U.S. residential power system during May 2026.',
    'This national economic benchmark matters because rooftop solar generation directly alters household electric bills by serving on-site appliances during daylight hours and exporting surplus electricity under utility net-metering rules. Understanding generation volume alongside retail prices helps homeowners separate total energy displacement from net utility bill savings.',
  ],
  sections: [
    {
      heading: 'Small-scale solar capacity and generation growth',
      paragraphs: [
        'The EIA defines small-scale solar as grid-connected photovoltaic systems with a total capacity under 1 megawatt (MW), which predominantly includes residential rooftop installations alongside small commercial solar systems. Between June 2025 and May 2026, U.S. energy providers and homeowners added an estimated 6.66 gigawatts (GW) of small-scale solar capacity.',
        'May represents a peak solar generation month across much of the United States due to high solar irradiance, longer daylight hours, and moderate temperatures that maintain PV panel operating efficiency before extreme summer heat sets in. In May 2026, small-scale solar generated 7,420 million kWh compared to 6,580 million kWh in May 2025, demonstrating steady growth in distributed clean energy production.',
        'While utility-scale solar generation also expanded rapidly (+21.6% YoY), small-scale customer-sited installations continue to play a pivotal role by generating power directly at the point of consumption, bypassing high-voltage transmission losses and relieving distribution substation congestion.',
      ],
    },
    {
      heading: 'Modeled household bill displacement scenarios',
      paragraphs: [
        'Translating national solar production into household utility impact requires framing typical rooftop system sizes against seasonal production benchmarks. National Renewable Energy Laboratory (NREL) modeling shows that a 7 kW AC residential rooftop solar array in a climate with average solar resource produces roughly 850 kWh during May.',
        'At the EIA May 2026 national average price of 18.44 cents/kWh, an 850 kWh monthly generation output achieves a gross retail electricity displacement of $156.74 ($0.1844 * 850 kWh). For a smaller 5 kW array producing 600 kWh in May, gross bill displacement models to $110.64. For a larger 10 kW system producing 1,200 kWh, gross displacement reaches $221.28.',
        'These calculations represent gross retail energy displacement—the full monetary value of electricity generated on-site that would otherwise be purchased from the electric utility at prevailing retail rates.',
      ],
    },
    {
      heading: 'Why net bill savings differ from gross displacement',
      paragraphs: [
        'Homeowners should distinguish between gross retail electricity displacement and net monthly bill savings. A solar array offsets utility charges in two ways: self-consumption (powering home loads directly) and grid exports (sending excess kWh to the local utility under net-metering or net-billing tariffs).',
        'In states with traditional 1:1 net energy metering (NEM), exported kWh are credited at full retail rates, keeping net savings close to gross displacement minus fixed customer charges. However, under newer net-billing frameworks such as California NEM 3.0 or non-bypassable charge structures, exported electricity is credited at instantaneous wholesale or avoided-cost values (often 4¢ to 8¢/kWh), while imported electricity is billed at full retail prices.',
        'Additionally, almost all electric utilities impose fixed monthly customer charges, meter fees, or minimum bill requirements (typically $10 to $25 per month) that cannot be offset by solar exports. Consequently, a household producing 850 kWh with $156.74 in gross generation value will see net bill reductions determined by their specific utility tariff structure.',
      ],
    },
    {
      heading: 'Methodology and limits',
      paragraphs: [
        'This benchmark utilizes official small-scale net generation data (Table 1.2.E) and small-scale summer capacity data (Table 6.1.B) from the EIA Electric Power Monthly, released July 23, 2026, for the May 2026 reporting period. Residential retail rate data (18.44¢/kWh) is sourced from EIA Monthly Energy Review Table 9.8.',
        'Gross national retail displacement ($1.37 Billion) is calculated as national small-scale generation GWh multiplied by $0.1844/kWh. Household scenarios use NREL PVWatts standard performance benchmarks for fixed-tilt 180-degree azimuth residential arrays assuming 14% total system losses.',
        'All monetary values are calculated with exact decimal precision and rounded to the nearest cent or million dollars at presentation. This benchmark does not predict individual solar savings, guarantee net-metering credit rates, account for shading or orientation defects, or model local time-of-use rate differentials.',
      ],
    },
  ],
  practicalExample:
    'A household with a 7 kW rooftop solar array producing 850 kWh during May sunny hours would displace about $156.74 in retail utility electricity charges at the national average rate of 18.44 cents/kWh, before accounting for local net metering export credits or fixed connection fees.',
  methodologyNotes:
    'Gross retail displacement = small-scale solar generation kWh * (May 2026 EIA residential average rate / 100). Household monthly savings = array monthly generation kWh * $0.1844/kWh. Solar generation figures sourced from EIA Electric Power Monthly Table 1.2.E (released July 23, 2026). Retail rate sourced from EIA Monthly Energy Review Table 9.8. All scenario costs rounded to the nearest cent after computation.',
  sources: [
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Electric Power Monthly: May 2026 (Released July 23, 2026)',
      url: 'https://www.eia.gov/electricity/monthly/',
      topic:
        'Table 1.2.E Net Generation from Renewable Sources: Residential Sector and Table 6.1.B Small Scale Solar Capacity.',
    },
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Monthly Energy Review — Table 9.8 Residential Electricity Prices',
      url: 'https://www.eia.gov/totalenergy/data/monthly/',
      topic: 'May 2026 average residential electricity price of 18.44 cents per kWh.',
    },
    {
      organization: 'National Renewable Energy Laboratory',
      title: 'PVWatts Calculator Architecture & Solar Production Data',
      url: 'https://pvwatts.nrel.gov/',
      topic:
        'Standard rooftop PV performance factors, AC capacity ratings, and seasonal insolating factors.',
    },
    {
      organization: 'U.S. Department of Energy',
      title: 'Solar Energy Technologies Office — Homeowner Solar Economics',
      url: 'https://www.energy.gov/eere/solar/homeowners-guide-going-solar',
      topic:
        'Rooftop solar generation guidance, net metering principles, and utility grid interconnection overview.',
    },
  ],
  relatedRoutes: [
    '/tools/appliance-energy-cost-calculator',
    '/electricity-rates',
    '/research/us-residential-electricity-rate-report',
    '/guides/why-is-my-electric-bill-so-high',
    '/data-sources',
    '/methodology',
  ],
};
