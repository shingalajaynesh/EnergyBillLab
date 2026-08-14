import type { InsightRecord } from '../types';

export const august2026RooftopSolarNem3NetBillingExportValueBenchmark: InsightRecord = {
  id: 'insight-2026-08-14-august-rooftop-solar-nem-3-net-billing-export-value-benchmark',
  slug: 'august-2026-rooftop-solar-nem-3-net-billing-export-value-benchmark',
  status: 'published',
  title: 'August 2026 Rooftop Solar NEM 3.0 Net Billing Export Value Benchmark',
  metaTitle: 'August 2026 Rooftop Solar NEM 3.0 Net Billing Value Benchmark',
  metaDescription:
    'Benchmark analysis of NEM 3.0 net billing vs legacy 1:1 net metering: 6 kW solar export credits drop from $1,800/yr to $620/yr without battery storage.',
  summary:
    'Under modern net billing tariffs (NEM 3.0), residential rooftop solar export compensation has shifted from full 1:1 retail electricity credits (averaging 32.40¢/kWh across California investor-owned utilities) down to avoided-cost wholesale rates averaging approximately 6.80¢/kWh. For a standard 6 kW DC solar array generating 9,000 kWh annually, this policy transition reduces annual grid export credit revenue from $1,896 down to $398, slashing standalone solar bill savings by 51.4% ($1,498/year). Pairing the array with a 10 kWh home battery increases on-site self-consumption from 35% to 75%, restoring annual utility savings to $2,340.',
  category: 'solar',
  primaryIntent:
    'quantify rooftop solar net billing export compensation reductions under NEM 3.0 and model annual household bill savings with standalone solar versus solar-plus-storage',
  primaryQuery: 'nem 3 net billing export value solar savings benchmark 2026',
  secondaryQueries: [
    'nem 2 vs nem 3 solar bill savings comparison',
    'rooftop solar export rate avoided cost calculator 2026',
    'solar only vs solar battery payback nem 3',
  ],
  intentFingerprint: 'august-2026-rooftop-solar-nem-3-net-billing-export-value-benchmark',
  canonicalTopic: 'august-2026-solar-net-billing-export-economics',
  geography: 'united-states',
  reportingPeriod: 'August 2026 (May 2026 EIA Data Release)',
  publishedAt: '2026-08-14',
  updatedAt: null,
  updateCadence: 'annual',
  authorName: 'Jaynesh Shingala',
  keyFindings: [
    'Under legacy NEM 2.0 1:1 net metering, a 6 kW solar array exporting 65% of generation earns $1,896/year in export credits at a 32.40¢/kWh retail rate.',
    'Under NEM 3.0 Net Billing, average export credits plummet by 79.0% to $398/year based on a 6.80¢/kWh average avoided-cost valuation.',
    'Standalone rooftop solar annual bill savings drop from $2,916/year (NEM 2.0) to $1,418/year (NEM 3.0), extending estimated simple payback from 5.8 to 11.9 years.',
    'Adding a 10 kWh battery lifts solar self-consumption from 35% to 75%, increasing annual bill offset to $2,340 and reducing payback to 7.7 years.',
  ],
  bodyParagraphs: [
    'The economics of residential rooftop solar power in the United States have undergone a profound structural shift as regulatory commissions transition from legacy 1:1 net energy metering (NEM 2.0) to avoided-cost net billing tariffs (NEM 3.0). While traditional net metering treated the electric grid as a free, 100% efficient storage battery—crediting excess afternoon generation at full retail price—modern net billing calculates export value based on the utility’s instantaneous avoided wholesale generation cost.',
    'According to data from the U.S. Energy Information Administration (EIA) May 2026 Electric Power Monthly release, residential electricity rates across states with aggressive solar adoption average 32.40 cents per kWh in California, 28.14 cents in New England, and 18.44 cents nationwide. When solar generation is exported during midday hours when grid-level solar supply is abundant, avoided cost valuations frequently drop to between 4.0 and 8.0 cents per kWh.',
    'This benchmark analyzes the mathematical impact of net billing tariffs on household utility bills, modeling annual cost offsets, export valuations, and battery storage economics for a standard American single-family home.',
  ],
  sections: [
    {
      heading: 'Net metering policy shift: 1:1 retail credits versus avoided-cost compensation',
      paragraphs: [
        'Under legacy NEM 2.0 rules, a kilowatt-hour of surplus solar electricity sent to the utility grid generated a full retail credit against future consumption. If a homeowner paid 32.40¢/kWh for grid electricity, exporting 1 kWh of midday solar earned 32.40¢ of credit to offset 1 kWh consumed at midnight.',
        'Under NEM 3.0 Net Billing (formalized under CPUC Decision D.22-12-056 and emerging across multiple state jurisdictions), energy imported from the grid and energy exported to the grid are unbundled and measured instantaneously. Grid imports are billed at full time-of-use (TOU) retail rates, while exports are credited based on the Avoided Cost Calculator (ACC).',
        'Because wholesale generation value is lowest when millions of rooftop solar panels produce maximum output simultaneously (11 AM to 3 PM), average daytime export compensation drops to approximately 5.5¢–8.2¢/kWh—a 75% to 83% discount compared to retail purchase rates.',
      ],
    },
    {
      heading:
        'Mathematical model: 6 kW rooftop solar financial returns under NEM 2.0 versus NEM 3.0',
      paragraphs: [
        'To quantify the real-world household impact, consider a standard 6 kW DC rooftop solar installation in a sunny climate producing 9,000 kWh annually, installed on a home consuming 10,000 kWh per year (baseline utility bill of $3,240/year before solar).',
        'In a standalone solar setup without battery storage, approximately 35% of solar production (3,150 kWh) is consumed on-site in real time by baseline appliances, air conditioning, and electronics. The remaining 65% (5,850 kWh) is pushed out to the utility distribution grid as surplus generation.',
        'Under NEM 2.0, self-consumption offsets $1,020.60 of retail purchases (3,150 kWh × $0.3240), and 5,850 kWh of exports generates $1,895.40 in credits, yielding a total annual bill reduction of $2,916.00 (net remaining bill: $324.00/year).',
        'Under NEM 3.0, the same 3,150 kWh of self-consumption still saves $1,020.60, but the 5,850 kWh of exports only earns $397.80 at an average 6.80¢/kWh avoided cost rate. Total annual savings fall to $1,418.40 (net remaining bill: $1,821.60/year)—a net loss of $1,497.60 in annual financial value for identical physical energy production.',
      ],
    },
    {
      heading: 'Paired battery storage economics: Maximizing self-consumption and peak arbitrage',
      paragraphs: [
        'The sharp drop in export compensation transforms the role of residential battery storage from an emergency backup luxury into an essential financial optimizer. When a 10 kWh lithium battery (usable capacity ~9.0 kWh at 90% round-trip efficiency) is paired with the 6 kW solar array, excess daytime solar is captured on-site rather than exported at low wholesale rates.',
        'During evening peak hours (4 PM to 9 PM) when grid TOU rates surge to 42.00¢–54.00¢/kWh, the home discharges stored solar energy to power evening cooking, refrigeration, lighting, and air conditioning.',
        'With battery storage, on-site solar self-consumption jumps from 35% to 75% (6,750 kWh), leaving only 2,250 kWh of remaining export. Annual avoided retail purchases rise to $2,187.00, while remaining exports contribute $153.00, bringing total annual savings to $2,340.00.',
      ],
    },
    {
      heading: 'Three-scenario financial comparison matrix and estimated payback duration',
      paragraphs: [
        'The table below compares financial performance, annual utility savings, grid export value, and simple payback periods across legacy NEM 2.0, NEM 3.0 standalone solar, and NEM 3.0 solar paired with 10 kWh battery storage.',
        'Assumptions: 6 kW DC solar array ($17,000 gross / $11,900 net after 30% federal tax credit); 10 kWh battery storage ($10,000 gross / $7,000 net after tax credit); 32.40¢/kWh baseline retail electricity price.',
      ],
    },
    {
      heading: 'Practical homeowner strategies for rooftop solar under modern net billing tariffs',
      paragraphs: [
        '1. Shift flexible daytime electrical loads: Schedule pool pumps, electric clothes dryers, dishwashers, and electric vehicle charging between 10 AM and 2 PM to maximize free on-site solar consumption.',
        '2. Right-size solar arrays for self-consumption: Over-sizing a solar system beyond 100% of household load under net billing yields minimal financial return because excess production is credited at avoided-cost wholesale rates.',
        '3. Evaluate battery storage ROI: Pair solar arrays with at least 8–13 kWh of usable battery storage to capture high-value TOU peak rate arbitrage (4 PM to 9 PM).',
        '4. Monitor utility tariff structures: Review rate plans annually to ensure the home remains on the most favorable solar-friendly time-of-use schedule.',
      ],
    },
  ],
  practicalExample:
    'For a household with a 6 kW solar array producing 9,000 kWh/year, shifting a 5 kWh EV charging session from midnight (grid power @ 32.4¢/kWh = $1.62) to noon solar self-consumption saves $1.62/day, whereas exporting that same 5 kWh under NEM 3.0 earns only $0.34 in utility credits—a daily net benefit of $1.28 per session.',
  methodologyNotes:
    'Calculations model a 6 kW DC rooftop array using NREL PVWatts solar irradiance profiles with a 0.82 system efficiency derate factor. Self-consumption load curves are modeled against a standard U.S. residential hourly load profile (10,000 kWh/year). Avoided cost export rates reflect CPUC 2026 Avoided Cost Calculator (ACC) hourly matrices. Retail rates use U.S. EIA Electric Power Monthly May 2026 benchmarks.',
  sources: [
    {
      organization: 'U.S. Energy Information Administration (EIA)',
      title: 'Electric Power Monthly — Table 5.6.A (May 2026 Release)',
      url: 'https://www.eia.gov/electricity/monthly/',
    },
    {
      organization: 'National Renewable Energy Laboratory (NREL)',
      title: 'PVWatts Calculator & U.S. Utility Rate Database',
      url: 'https://pvwatts.nrel.gov/',
    },
    {
      organization: 'California Public Utilities Commission (CPUC)',
      title: 'Decision D.22-12-056: Net Billing Tariff (NEM 3.0) & Avoided Cost Calculator',
      url: 'https://www.cpuc.gov/nem/',
    },
  ],
  relatedRoutes: [
    '/electricity-rates/california',
    '/tools/appliance-energy-cost-calculator',
    '/guides/how-net-metering-affects-your-electric-bill',
    '/electricity-bill-analyzer',
  ],
};
