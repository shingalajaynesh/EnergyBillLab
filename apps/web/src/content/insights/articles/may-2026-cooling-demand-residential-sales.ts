import type { InsightRecord } from '../types';

export const may2026CoolingDemandResidentialSales: InsightRecord = {
  id: 'insight-2026-07-30-may-cooling-demand-residential-sales',
  slug: 'may-2026-cooling-demand-residential-sales',
  status: 'published',
  title: 'May 2026 Cooling Demand and Home Electricity Sales',
  metaTitle: 'May 2026 Cooling Demand and Home Electricity Sales',
  metaDescription:
    'EIA May 2026 electricity sales and cooling-degree-day data translated into household AC cost scenarios.',
  summary:
    'EIA reported 106,659 million kWh of U.S. residential electricity sales in May 2026, up 1.7% from May 2025. The same May 2026 update said cooling degree-days increased in 38 states and the District of Columbia, making this a useful early-summer signal for households tracking air-conditioning-driven bill changes.',
  category: 'home-energy-costs',
  primaryIntent:
    'explain May 2026 U.S. residential electricity sales growth and cooling demand bill impact',
  primaryQuery: 'may 2026 residential electricity sales cooling demand',
  secondaryQueries: [
    'may 2026 eia residential electricity sales',
    'may 2026 cooling degree days electricity demand',
    'air conditioning electricity bill impact may 2026',
  ],
  intentFingerprint: 'may-2026-us-residential-electricity-sales-cooling-demand',
  canonicalTopic: 'may-2026-us-residential-electricity-sales-cooling-demand',
  geography: 'united-states',
  reportingPeriod: 'May 2026',
  publishedAt: '2026-07-23',
  updatedAt: null,
  updateCadence: 'one-time',
  authorName: 'Jaynesh Shingala',
  keyFindings: [
    'EIA reported U.S. residential electricity sales of 106,659 million kWh in May 2026, compared with 104,856 million kWh in May 2025.',
    'The residential sales increase was 1,803 million kWh year over year, while EIA also reported cooling degree-days increased in 38 states and the District of Columbia.',
    'At the May 2026 residential average price of 18.44 cents/kWh, an added 250 kWh of household cooling use models to about $46.10 before fixed charges, taxes, riders, and local tariff details.',
    'EIA identifies air conditioning as one of the three largest residential site-electricity end uses in 2020, so early cooling-season demand can matter even when a household changes few other habits.',
  ],
  bodyParagraphs: [
    'The May 2026 EIA Electricity Monthly Update points to a practical household warning sign: residential electricity sales rose as cooling demand expanded across much of the country. EIA reported 106,659 million kWh of residential sales in May 2026, up from 104,856 million kWh in May 2025, and said cooling degree-days increased in 38 states and the District of Columbia.',
    "Retail sales volumes are not the same thing as one household's meter reading, but they help show the direction of national electricity use. EIA explains that retail sales volumes are presented as a proxy for end-use electricity consumption, and its May 2026 end-use table places the residential sector at 18.44 cents/kWh for average revenues per kWh.",
    'For a household, the bill question is simple: how many additional cooling kWh did the meter record? At 18.44 cents/kWh, an extra 100 kWh models to $18.44, an extra 250 kWh models to $46.10, and an extra 500 kWh models to $92.20 before fixed charges and utility-specific bill components.',
  ],
  sections: [
    {
      heading: 'What changed in the May 2026 data',
      paragraphs: [
        "EIA's Electric Power Monthly table for May 2026 shows residential electricity sales of 106,659 million kWh in May 2026 and 104,856 million kWh in May 2025. The difference is 1,803 million kWh, or about 1.8 billion kWh of additional residential sales over the year-earlier month.",
        'The same EIA end-use update says residential sales increased 1.7% year over year. It also reports that state retail sales volume increased in 42 states, while cooling degree-days increased in 38 states and the District of Columbia. Cooling degree-days are not household meter readings, but they are a weather-demand signal: warmer conditions usually increase air-conditioning load.',
        "EIA's Energy Explained household electricity page identifies air conditioning, space heating, and water heating as the three largest categories of residential site-electricity consumption in 2020. That makes cooling load a logical place to check when May or early-summer bills rise.",
      ],
    },
    {
      heading: 'Original sales and revenue decomposition',
      paragraphs: [
        'Original comparison table: May 2025 residential sales were 104,856 million kWh, May 2026 residential sales were 106,659 million kWh, and the increase was 1,803 million kWh. Residential average price rose from 17.37 cents/kWh in May 2025 to 18.44 cents/kWh in May 2026.',
        'Using those EIA values, the sales-volume effect alone is roughly $313 million when the added 1,803 million kWh are valued at the May 2025 residential average price of 17.37 cents/kWh. The price effect is roughly $1.14 billion when the 1.07 cents/kWh price difference is applied to May 2026 residential sales volume.',
        'This decomposition is a modeled way to separate usage volume from price. It is not a utility accounting statement, and rounding in EIA-published values means the pieces will not exactly equal the reported revenue change.',
      ],
    },
    {
      heading: 'How this can show up on a household bill',
      paragraphs: [
        'A household that uses central air conditioning more often in May can see a bill increase even if the thermostat setting, appliances, and household size feel unchanged. The important bill variable is added kWh, not just the presence of warmer weather.',
        'At 18.44 cents/kWh, 100 added kWh costs about $18.44, 250 added kWh costs about $46.10, and 500 added kWh costs about $92.20 before fixed charges, taxes, riders, demand charges, and local tariff details. A home with poor insulation, leaky ducts, or a long AC runtime can move through those scenarios quickly during a warmer billing period.',
      ],
    },
    {
      heading: 'What to check before blaming the rate',
      paragraphs: [
        'Compare kWh per billing day between two bills. If usage per day rose, cooling runtime is part of the story. If usage per day stayed flat but the effective cents/kWh rose, the cause may be rate components, riders, taxes, or fixed charges.',
        'The EnergyBillLab AC calculator can estimate cooling kWh from system size, efficiency, runtime, and duty cycle. The Electricity Bill Analyzer can then separate usage change from effective-rate change across two billing periods.',
      ],
    },
    {
      heading: 'Methodology and limits',
      paragraphs: [
        'This article uses EIA May 2026 end-use data released July 23, 2026. The article uses residential-sector sales, revenue, and average price values from the May 2026 Electric Power Monthly table, plus cooling-degree-day and state retail-sales context from the EIA Electricity Monthly Update.',
        'The household cost scenarios use the May 2026 U.S. residential average price of 18.44 cents/kWh. Results are estimates. They do not include fixed charges, taxes, riders, tiered rates, time-of-use rates, demand charges, municipal fees, or utility-specific delivery charges.',
      ],
    },
  ],
  practicalExample:
    'If a household uses 250 extra kWh for cooling during a warmer May billing period, the modeled energy-use cost at 18.44 cents/kWh is about $46.10 before fixed charges, taxes, riders, demand charges, and local tariff details.',
  methodologyNotes:
    'Formula: modeled cooling cost = added cooling kWh multiplied by 0.1844 dollars/kWh. Sales-volume effect = (106,659 - 104,856) million kWh multiplied by $0.1737/kWh. Price effect = (18.44 - 17.37) cents/kWh converted to dollars and multiplied by 106,659 million kWh. Dollar figures are rounded for readability.',
  sources: [
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Electricity Monthly Update: End Use, May 2026',
      url: 'https://www.eia.gov/electricity/monthly/update/end-use.php',
      topic:
        'May 2026 residential retail sales, average revenues per kWh, state retail-sales context, and cooling-degree-day context.',
    },
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Electric Power Monthly Table ES1.A: Sales, Revenue, and Average Price',
      url: 'https://www.eia.gov/electricity/monthly/epm_table_grapher.php?from=article_link&t=epmt_es1a',
      topic:
        'May 2026 and May 2025 residential sales, revenue, and average price values by sector.',
    },
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Electricity use in homes',
      url: 'https://www.eia.gov/energyexplained/use-of-energy/electricity-use-in-homes.php',
      topic: 'Residential electricity end-use context for air conditioning and other major loads.',
    },
  ],
  relatedRoutes: [
    '/tools/ac-cost-calculator',
    '/electricity-bill-analyzer',
    '/guides/how-much-does-it-cost-to-run-an-air-conditioner',
    '/guides/why-is-my-electric-bill-so-high',
    '/guides/how-billing-cycle-length-affects-electricity-bills',
    '/electricity-rates',
    '/data-sources',
    '/methodology',
  ],
};
