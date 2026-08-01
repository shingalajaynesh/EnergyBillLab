import type { InsightRecord } from '../types';

export const may2026ResidentialNaturalGasPriceOffSeasonBillImpact: InsightRecord = {
  id: 'insight-2026-08-01-may-residential-natural-gas-off-season-bill-impact',
  slug: 'may-2026-residential-natural-gas-price-off-season-bill-impact',
  status: 'published',
  title: 'May 2026 U.S. Residential Natural Gas Price & Off-Season Bill Impact',
  metaTitle: 'May 2026 U.S. Residential Natural Gas Price & Off-Season Bill Impact',
  metaDescription:
    'EIA May 2026 natural gas data analyzed: $19.24/Mcf ($1.86/therm) average residential price creates a $55.80 monthly off-season baseline for water heating and cooking.',
  summary:
    'The U.S. Energy Information Administration (EIA) reported the May 2026 national average residential natural gas price at $19.24 per thousand cubic feet (Mcf), equivalent to approximately $1.86 per therm based on 10.37 therms per Mcf. During off-season summer months when space heating is dormant, typical household gas usage drops to 25–40 therms for water heating and cooking, modeling an energy commodity baseline of $46.50 to $74.40 per month before fixed utility distribution charges and local taxes.',
  category: 'natural-gas',
  primaryIntent:
    'explain May 2026 EIA residential natural gas price per Mcf therm and off-season household bill impact',
  primaryQuery: 'may 2026 residential natural gas price per mcf therm',
  secondaryQueries: [
    'may 2026 eia residential natural gas price update',
    'how much does natural gas cost per therm may 2026',
    'off season summer natural gas bill benchmark',
  ],
  intentFingerprint: 'may-2026-us-residential-natural-gas-price-off-season-bill-impact',
  canonicalTopic: 'may-2026-us-residential-natural-gas-price-off-season-bill-impact',
  geography: 'united-states',
  reportingPeriod: 'May 2026',
  publishedAt: '2026-08-01T12:00:00.000Z',
  updatedAt: null,
  updateCadence: 'one-time',
  authorName: 'Jaynesh Shingala',
  keyFindings: [
    'EIA reported the May 2026 U.S. residential average retail natural gas price at $19.24 per Mcf ($1.86 per therm).',
    'Off-season summer gas consumption (water heating and cooking) averages 30 therms per month, modeling a $55.80 monthly commodity baseline.',
    'May 2026 natural gas prices rose 6.0% year-over-year compared to May 2025 ($18.15/Mcf), adding about $3.16 to an off-season monthly bill.',
    'Winter space heating increases monthly usage by 3x to 5x (100–150 therms), expanding monthly commodity costs to $186.00–$279.00 at May rate levels.',
  ],
  bodyParagraphs: [
    'The U.S. Energy Information Administration (EIA) Natural Gas Monthly report released in July 2026 provides official price benchmarks for May 2026, recording the national average residential natural gas price at $19.24 per thousand cubic feet (Mcf). Converting Mcf volume to energy units yields an effective rate of $1.86 per therm based on standard heat content (10.37 therms per Mcf).',
    'During warmer late-spring and summer months, household natural gas consumption experiences a dramatic shift. While winter heating drives monthly usage to 100–150 therms or more, summer usage drops to a baseline of 25–40 therms dedicated primarily to domestic water heating, clothes drying, and gas cooking.',
    'Understanding off-season natural gas prices helps consumers separate fixed utility meter fees from variable energy consumption, evaluate water heater upgrades, and establish an accurate baseline for winter heating cost comparisons.',
  ],
  sections: [
    {
      heading: 'Converting EIA Mcf pricing to therm utility bills',
      paragraphs: [
        'Natural gas billing structures vary across local utilities. While the EIA reports retail data in dollars per thousand cubic feet ($/Mcf), most local gas utilities bill residential customers in therms or hundred cubic feet (CCF).',
        'One Mcf equals 1,000 cubic feet of natural gas and contains approximately 1.037 MMBtu, or 10.37 therms of energy content. Dividing the EIA May 2026 residential benchmark of $19.24/Mcf by 10.37 therms yields an effective energy commodity price of $1.855 per therm ($1.86/therm rounded).',
        'Using a simplified 10 therms per Mcf approximation ($19.24 / 10 = $1.92/therm) provides a quick mental calculation for homeowners checking utility bill tariffs against official national averages.',
      ],
    },
    {
      heading: 'Modeled off-season vs. winter heating household costs',
      paragraphs: [
        'Applying May 2026 price benchmarks across seasonal usage patterns illustrates the financial impact of space heating versus water heating and cooking.',
        'In May 2026, an off-season household using 30 therms per month for water heating and cooking incurs a modeled commodity energy charge of $55.80 (30 therms * $1.86/therm). Compared to the implied May 2025 benchmark of $18.15/Mcf ($1.75/therm), the 6.0% year-over-year price increase adds approximately $3.16 per month.',
        'During winter heating months, a household consuming 120 therms incurs a modeled commodity charge of $223.20 at May 2026 rates—an increase of $167.40 per month over off-season baseline usage.',
      ],
    },
    {
      heading: 'Fixed customer charges vs. variable energy costs',
      paragraphs: [
        'A common source of confusion on summer gas bills is the high ratio of fixed fees to actual energy charges. Most gas utilities assess a monthly customer charge ($12.00 to $25.00) regardless of natural gas volume consumed.',
        'When a household consumes only 20 therms in summer ($37.20 energy charge), a $15.00 fixed customer fee represents nearly 29% of the total monthly bill. Recognizing that fixed distribution fees remain constant year-round prevents homeowners from misinterpreting summer bills as higher per-unit rates.',
        'Homeowners considering electric heat pump water heaters can compare their 30-therm off-season gas bill ($55.80 energy cost) against modeled heat pump electricity consumption (roughly 150 kWh/month, or $27.66 at national 18.44¢/kWh rates) to estimate operating savings.',
      ],
    },
    {
      heading: 'Methodology and limits',
      paragraphs: [
        'Data sourced from EIA Natural Gas Monthly report (released July 31, 2026) for May 2026 residential retail sales. Energy conversion assumes 1 Mcf = 10.37 therms (103,700 Btu per CCF standard pipeline heat content).',
        'Off-season scenario models: 25 therms = 2.41 Mcf * $19.24 = $46.50; 30 therms = 2.89 Mcf * $19.24 = $55.80; 40 therms = 3.86 Mcf * $19.24 = $74.40. Winter scenario models: 100 therms = $186.00; 120 therms = $223.20; 150 therms = $279.00.',
        'Calculations represent variable commodity energy costs only. Final customer bills vary based on utility-specific fixed monthly charges, pipeline distribution surcharges, municipal franchise fees, and local taxes.',
      ],
    },
  ],
  practicalExample:
    'A household consuming 30 therms of natural gas in May 2026 for water heating and cooking incurs a modeled commodity cost of $55.80 at $1.86 per therm ($19.24/Mcf)—a $3.16 monthly increase compared to May 2025 ($18.15/Mcf) before fixed customer service charges and taxes.',
  methodologyNotes:
    'Formula: Energy Charge = Volume in Mcf * $/Mcf = (Therms / 10.37) * $19.24. Effective price per therm = $19.24 / 10.37 = $1.8553/therm. Year-over-year comparison derived from EIA May 2025 benchmark ($18.15/Mcf, +6.0%). All scenario dollar amounts rounded to nearest cent at presentation.',
  sources: [
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Natural Gas Monthly — Residential Natural Gas Prices May 2026',
      url: 'https://www.eia.gov/naturalgas/monthly/',
      topic:
        'Official May 2026 residential natural gas retail prices per Mcf, historic trends, and sales volumes.',
    },
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Natural Gas Explained — Household Consumption & Units',
      url: 'https://www.eia.gov/energyexplained/natural-gas/use-of-natural-gas.php',
      topic: 'Natural gas heat content conversions (Mcf, MMBtu, therms) and end-use breakdowns.',
    },
    {
      organization: 'American Gas Association',
      title: 'Natural Gas Utility Customer Statistics & Seasonal Demand',
      url: 'https://www.aga.org/',
      topic: 'Residential customer usage profiles for water heating, cooking, and space heating.',
    },
  ],
  relatedRoutes: [
    '/electricity-rates',
    '/research/us-residential-electricity-rate-report',
    '/tools/appliance-energy-cost-calculator',
    '/electricity-bill-analyzer',
    '/data-sources',
    '/methodology',
  ],
};
