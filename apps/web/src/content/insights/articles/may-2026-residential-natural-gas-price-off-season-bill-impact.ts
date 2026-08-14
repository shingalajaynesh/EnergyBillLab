import type { InsightRecord } from '../types';

export const may2026ResidentialNaturalGasPriceOffSeasonBillImpact: InsightRecord = {
  id: 'insight-2026-08-01-may-residential-natural-gas-off-season-bill-impact',
  slug: 'may-2026-residential-natural-gas-price-off-season-bill-impact',
  status: 'published',
  title: 'May 2026 U.S. Residential Natural Gas Price & Off-Season Bill Impact',
  metaTitle: 'May 2026 U.S. Residential Natural Gas Price & Off-Season Bill Impact',
  metaDescription:
    'EIA residential natural gas data analyzed: $19.83/Mcf ($1.9141/therm) average delivered price creates a $57.42 monthly off-season baseline expense.',
  summary:
    'The U.S. Energy Information Administration (EIA) reported the May 2026 national average delivered residential natural gas price at $19.83 per thousand cubic feet (Mcf), equivalent to an estimated $1.9141 per therm based on the EIA average heat-content conversion of 1,036 Btu per cubic foot (10.36 therms per Mcf). During off-season summer months when space heating is dormant, typical household gas usage drops to 25–40 therms for water heating and cooking, modeling a total delivered baseline of $47.85 to $76.56 per month based on aggregate national EIA delivered rates.',
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
    'EIA reported the May 2026 U.S. residential average delivered retail natural gas price at $19.83 per Mcf (estimated $1.9141 per therm).',
    'Off-season summer gas consumption (water heating and cooking) averages 30 therms per month, modeling a $57.42 monthly delivered baseline.',
    'May 2026 residential natural gas prices rose 3.1% year-over-year compared to May 2025 ($19.24/Mcf), adding about $1.71 to a 30-therm monthly bill.',
    'Winter space heating increases monthly usage by 3x to 5x (100–150 therms), expanding monthly delivered costs to $191.41–$287.11 at May rate levels.',
  ],
  bodyParagraphs: [
    'The U.S. Energy Information Administration (EIA) Natural Gas Monthly report provides official price benchmarks for May 2026, recording the national average delivered residential natural gas price at $19.83 per thousand cubic feet (Mcf). Converting Mcf volume to energy units yields an estimated delivered price of $1.9141 per therm based on the EIA average heat-content conversion of 1,036 Btu per cubic foot (10.36 therms per Mcf).',
    'EIA residential natural gas prices represent the total average delivered price paid by end-use residential consumers, encompassing commodity, pipeline transmission, local utility distribution, demand charges, and taxes. They are aggregate national benchmarks rather than individual utility tariff quotes.',
    'During warmer late-spring and summer months, household natural gas consumption experiences a dramatic shift. While winter heating drives monthly usage to 100–150 therms or more, summer usage drops to a baseline of 25–40 therms dedicated primarily to domestic water heating, clothes drying, and gas cooking.',
  ],
  sections: [
    {
      heading: 'Understanding EIA delivered prices vs. utility tariff line items',
      paragraphs: [
        'Natural gas billing structures vary across local utilities. While the EIA reports retail data in dollars per thousand cubic feet ($/Mcf), most local gas utilities bill residential customers in therms or hundred cubic feet (CCF).',
        'One Mcf equals 1,000 cubic feet of natural gas and contains approximately 1.036 MMBtu, or 10.36 therms of energy content based on national average heat-content standards. Dividing the EIA May 2026 residential benchmark of $19.83/Mcf by 10.36 therms yields an estimated average delivered price of $1.9141 per therm ($1.91 per therm rounded for display).',
        'Because the EIA residential benchmark already represents an all-in average delivered rate paid by residential end users, consumers evaluating local gas bills should compare their total all-in cost per therm (bill total divided by therms) rather than layering additional generic tax or delivery estimates on top of the EIA figure.',
      ],
    },
    {
      heading: 'Modeled off-season vs. winter heating household costs',
      paragraphs: [
        'Applying May 2026 price benchmarks across seasonal usage patterns illustrates the financial impact of space heating versus water heating and cooking. Household usage scenarios represent illustrative modeled scenarios calculated using full precision internally ($19.83 / 10.36 therms) with final values rounded to the nearest cent.',
        'In May 2026, an off-season household using 30 therms per month for water heating and cooking incurs a modeled delivered energy cost of $57.42 (30 therms * $1.9141/therm). Compared to the May 2025 residential benchmark of $19.24/Mcf ($1.8571/therm), the 3.1% year-over-year price increase adds approximately $1.71 per month.',
        'During winter heating months, a household consuming 120 therms incurs a modeled delivered cost of $229.69 at May 2026 rates—an increase of $172.27 per month over off-season baseline usage.',
      ],
    },
    {
      heading: 'Fixed customer charges vs. variable energy consumption',
      paragraphs: [
        'An individual utility bill contains fixed customer charges (typically $12.00 to $25.00/month) alongside volumetric rates. The EIA national benchmark aggregates total residential revenue divided by total residential sales volume across all utilities.',
        'When a household consumes only 25 therms in summer ($47.85 modeled delivered cost), fixed customer service fees represent a larger proportion of total monthly out-of-pocket utility expense. Understanding this structure prevents homeowners from misinterpreting summer bills as higher per-unit energy rates.',
        'Homeowners considering electric heat pump water heaters can compare their 30-therm off-season gas bill ($57.42 delivered cost) against modeled heat pump electricity consumption (roughly 150 kWh/month, or $27.66 at national 18.44¢/kWh rates) to estimate operating savings.',
      ],
    },
    {
      heading: 'Methodology and limits',
      paragraphs: [
        'Data sourced from EIA Natural Gas Monthly report for May 2026 residential retail sales (PRS process code, EPG0 product code). Estimated therm conversions apply the EIA U.S. average heat-content conversion of 1,036 Btu per cubic foot (10.36 therms per Mcf). Full internal precision ($19.83 / 10.36 = $1.91409266/therm) is applied before final rounding.',
        'Off-season scenario models: 25 therms = $47.85; 30 therms = $57.42; 40 therms = $76.56. Winter scenario models: 100 therms = $191.41; 120 therms = $229.69; 150 therms = $287.11.',
        'Calculations represent illustrative national average benchmark scenarios. Individual customer bills vary based on local utility tariffs, weather, home insulation, and specific state delivery charges.',
      ],
    },
  ],
  practicalExample:
    'A household consuming 30 therms of natural gas in May 2026 for water heating and cooking incurs a modeled delivered cost of $57.42 at the EIA national average rate of $19.83/Mcf ($1.9141 per therm)—a $1.71 monthly increase compared to May 2025 ($19.24/Mcf) based on aggregate national EIA delivered rates.',
  methodologyNotes:
    'Formula: Delivered Cost = Therms * ($19.83 / 10.36) = Therms * $1.91409266/therm. Display price per therm = $1.91/therm. Year-over-year comparison derived from EIA May 2025 residential benchmark ($19.24/Mcf, +3.1%). All scenario dollar amounts use full internal precision and are rounded to the nearest cent at the final presentation step.',
  sources: [
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Natural Gas Monthly — Residential Natural Gas Prices May 2026 (PRS)',
      url: 'https://www.eia.gov/naturalgas/monthly/',
      topic:
        'Official May 2026 residential natural gas retail prices per Mcf (PRS process, EPG0 product), historic trends, and sales volumes.',
    },
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Natural Gas Explained — Household Consumption & Units',
      url: 'https://www.eia.gov/energyexplained/natural-gas/use-of-natural-gas.php',
      topic: 'Natural gas heat content conversions (1 Mcf = 10.36 therms) and end-use breakdowns.',
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
