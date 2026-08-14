import type { InsightRecord } from '../types';

export const august2026HomeBatteryStorageUsableCapacityRoundTripEfficiencyBenchmark: InsightRecord =
  {
    id: 'insight-2026-08-01-august-home-battery-storage-usable-capacity-benchmark',
    slug: 'august-2026-home-battery-storage-usable-capacity-round-trip-efficiency-benchmark',
    status: 'published',
    title: 'August 2026 Home Battery Storage Usable Capacity & Round-Trip Efficiency Benchmark',
    metaTitle: 'August 2026 Home Battery Storage Usable Capacity & Efficiency Benchmark',
    metaDescription:
      'EIA and DOE technical benchmarks: nominal capacity vs usable kWh, 85% round-trip AC efficiency, and TOU peak shaving economics for home batteries.',
    summary:
      'Translating nameplate battery storage into household utility impact requires accounting for Depth of Discharge (DoD) and AC-to-AC round-trip efficiency (RTE). Under Department of Energy (DOE) and National Renewable Energy Laboratory (NREL) benchmarks, a typical 13.5 kWh nominal residential battery with 90% DoD provides 12.15 kWh of usable energy, delivering approximately 10.33 kWh of net AC electricity to household circuits at an 85% round-trip efficiency. Under a 20-cent/kWh time-of-use rate differential, daily peak shaving models to about $2.07 per cycle in net energy value.',
    category: 'battery-storage',
    primaryIntent:
      'explain residential home battery usable capacity round-trip efficiency and peak-shaving economics',
    primaryQuery: 'home battery storage usable capacity benchmark August 2026',
    secondaryQueries: [
      'residential battery usable capacity vs nominal kWh',
      'home battery round trip efficiency loss calculation',
      'battery storage time of use peak shaving savings benchmark',
    ],
    intentFingerprint:
      'august-2026-home-battery-storage-usable-capacity-round-trip-efficiency-benchmark',
    canonicalTopic: 'august-2026-home-battery-storage-usable-capacity-benchmark',
    geography: 'united-states',
    reportingPeriod: 'August 2026',
    publishedAt: '2026-07-29',
    updatedAt: null,
    updateCadence: 'one-time',
    authorName: 'Jaynesh Shingala',
    keyFindings: [
      'A 13.5 kWh nominal home battery rated at 90% Depth of Discharge (DoD) yields 12.15 kWh of usable capacity before round-trip conversion losses.',
      'Applying an 85% AC-to-AC round-trip efficiency benchmark reduces delivered household energy to approximately 10.33 kWh per full charge-discharge cycle.',
      'Under a 20-cent/kWh time-of-use (TOU) price spread (e.g., 15¢/kWh off-peak vs 35¢/kWh peak), a full 10.33 kWh peak discharge yields approximately $2.07 in daily net energy arbitrage value before standby losses and battery degradation.',
      'Continuous power output (kW) determines how many appliances a battery can run simultaneously, while energy capacity (kWh) dictates how many hours those appliances can operate.',
    ],
    bodyParagraphs: [
      'As U.S. homeowners increasingly adopt residential energy storage alongside rooftop solar or for emergency outage backup, understanding battery storage specifications requires looking beyond nameplate capacity numbers. Reports from the U.S. Energy Information Administration (EIA) and technical guidelines from the U.S. Department of Energy (DOE) emphasize that nominal energy storage capacity does not equal the net electricity delivered to household appliances.',
      'Two key technical factors govern real-world battery performance: Depth of Discharge (DoD) and AC-to-AC Round-Trip Efficiency (RTE). Depth of Discharge specifies the maximum percentage of a battery’s nominal capacity that can be safely used without accelerating cell degradation. Round-trip efficiency measures the percentage of electrical energy stored during charging that is successfully recovered during discharge after accounting for inverter conversion, transformer, and electrochemical heat losses.',
      'Establishing clear benchmarks for usable capacity and round-trip efficiency enables homeowners to accurately estimate backup duration during grid outages and evaluate daily energy arbitrage savings under utility Time-of-Use (TOU) electricity rate structures.',
    ],
    sections: [
      {
        heading: 'Deriving usable capacity and net AC delivered energy',
        paragraphs: [
          'Residential lithium-based battery systems—such as Lithium Iron Phosphate (LFP) or Nickel Manganese Cobalt (NMC) chemistries—are typically marketed by their nominal nameplate rating (e.g., 5 kWh, 10 kWh, 13.5 kWh, or 20 kWh). Modern residential storage management systems set Depth of Discharge limits between 80% and 95% to preserve battery lifespan.',
          'Using a 90% DoD benchmark, a 13.5 kWh nominal battery array provides 12.15 kWh of usable capacity (13.5 kWh * 0.90). However, drawing that energy through the system’s integrated inverter and AC power electronics introduces conversion losses. The DOE Federal Energy Management Program (FEMP) and NREL System Advisor Model (SAM) establish an 85% AC-to-AC round-trip efficiency benchmark for complete home storage systems.',
          'Multiplying usable capacity by 85% AC round-trip efficiency yields net delivered household electricity: 12.15 kWh * 0.85 = 10.3275 kWh (approximately 10.33 kWh). Thus, a 13.5 kWh nominal battery system delivers about 10.33 kWh of usable AC electricity to household circuits during a full discharge cycle.',
        ],
      },
      {
        heading: 'Continuous power output (kW) vs. energy storage (kWh)',
        paragraphs: [
          'Homeowners frequently confuse continuous power capability (measured in kilowatts, kW) with total energy capacity (measured in kilowatt-hours, kWh). Power (kW) represents the instantaneous rate of electrical flow, dictating how many heavy electrical loads—such as refrigerators, well pumps, or air conditioners—can run at the same instant.',
          'For example, a typical residential battery unit might provide 5.0 kW of continuous output power and 7.0 kW of peak surge power for short motor-starting events, paired with 13.5 kWh of nominal energy storage. If a household draws a steady 2.5 kW load (running a central refrigerator, LED lighting, television, and home office equipment), the battery’s 10.33 kWh net delivered energy will sustain that load for approximately 4.1 hours (10.33 kWh / 2.5 kW).',
          'Conversely, if high-wattage appliances draw a heavy 5.0 kW load continuously, the same battery will reach its discharge limit in roughly 2.1 hours (10.33 kWh / 5.0 kW). Managing backup duration requires controlling instantaneous kW demand as much as preserving kWh storage volume.',
        ],
      },
      {
        heading: 'Time-of-use peak shaving and rate arbitrage economics',
        paragraphs: [
          'In states with pronounced Time-of-Use (TOU) electricity rate tiers—such as California, Arizona, Texas, and New York—home batteries can be configured to automatically charge during inexpensive off-peak hours (or directly from rooftop solar panels) and discharge during expensive peak evening hours (typically 4:00 PM to 9:00 PM).',
          'Consider a utility tariff where off-peak electricity costs 15 cents/kWh and peak electricity costs 35 cents/kWh—creating a 20-cent/kWh peak-to-off-peak rate differential. Discharging 10.33 kWh of net delivered energy during the peak window offsets $3.62 in peak utility electricity purchases ($0.35 * 10.33 kWh). Accounting for the $1.55 cost of off-peak grid charging (12.15 kWh drawn from the grid at $0.15/kWh to store 10.33 kWh net) yields a net daily arbitrage value of $2.07 per cycle ($3.62 - $1.55).',
          'Over a full month of daily cycling, that modeled 20-cent rate spread generates approximately $62.10 in gross utility bill reductions ($2.07 * 30 days). However, homeowners must account for non-bypassable utility charges, annual battery capacity degradation (typically 2% to 3% per year), and fixed equipment installation costs when evaluating overall payback economics.',
        ],
      },
      {
        heading: 'Methodology and limits',
        paragraphs: [
          'This benchmark incorporates industry standards from the EIA Battery Storage Market Trends report (updated 2026), NREL System Advisor Model (SAM) storage specifications, and DOE FEMP technical guidelines. The May 2026 national residential electricity rate benchmark (18.44 cents/kWh) is sourced from EIA Monthly Energy Review Table 9.8.',
          'Usable capacity is calculated as Nominal Capacity * Depth of Discharge. Net Delivered AC Energy is calculated as Usable Capacity * AC-to-AC Round-Trip Efficiency. Net TOU Arbitrage Value = (Net Delivered kWh * Peak Rate) - (Usable Grid kWh Drawn * Off-Peak Rate). All monetary figures are calculated with exact decimal precision and rounded to the nearest cent at presentation.',
          'This analysis serves as an educational benchmark and does not guarantee specific outage backup hours, predict exact utility bill savings, promise financial return on investment, or model local utility grid interconnection fees.',
        ],
      },
    ],
    practicalExample:
      'A homeowner with a 13.5 kWh nominal battery array rated at 90% Depth of Discharge and 85% AC round-trip efficiency receives about 10.33 kWh of net AC output. Discharging that energy during a 4-hour peak window under a 20-cent/kWh TOU price differential saves approximately $2.07 per day ($62.10 per month) before standby losses and fixed utility fees.',
    methodologyNotes:
      'Formulas: Usable kWh = Nominal kWh * 0.90. Net AC kWh = Usable kWh * 0.85. Backup Hours = Net AC kWh / Continuous Load kW. Net TOU Arbitrage = (Net AC kWh * Peak Rate) - (Usable Grid kWh * Off-Peak Rate). Benchmarks derived from DOE FEMP guidelines, NREL SAM architecture, and EIA battery market reporting. Values rounded to nearest cent after computation.',
    sources: [
      {
        organization: 'U.S. Energy Information Administration',
        title: 'Battery Storage Market Trends & Monthly Generator Inventory (2026 Updates)',
        url: 'https://www.eia.gov/analysis/studies/electricity/batterystorage/',
        topic:
          'U.S. battery storage market trends, capacity additions, and generator inventory overview.',
      },
      {
        organization: 'U.S. Department of Energy',
        title: 'FEMP Federal Energy Management Program — Energy Storage Technical Guidance',
        url: 'https://www.energy.gov/femp/energy-storage-technology-procurement-guidance',
        topic:
          'Technical guidance on battery storage round-trip efficiency, depth of discharge, and performance benchmarks.',
      },
      {
        organization: 'National Renewable Energy Laboratory',
        title: 'System Advisor Model (SAM) — Battery Storage Model Specifications',
        url: 'https://sam.nrel.gov/battery-storage.html',
        topic:
          'AC-to-AC round-trip efficiency modeling, inverter conversion loss factors, and battery discharge performance.',
      },
      {
        organization: 'U.S. Energy Information Administration',
        title: 'Monthly Energy Review — Table 9.8 Residential Electricity Prices',
        url: 'https://www.eia.gov/totalenergy/data/monthly/',
        topic: 'May 2026 average residential electricity price benchmark of 18.44 cents per kWh.',
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
