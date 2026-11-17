import type { InsightRecord } from '../types';

export const august2026TimeOfUsePeakRateSpreadApplianceLoadShiftingBenchmark: InsightRecord = {
  id: 'insight-2026-08-01-august-time-of-use-peak-rate-spread-appliance-load-shifting-benchmark',
  slug: 'august-2026-time-of-use-peak-rate-spread-appliance-load-shifting-benchmark',
  status: 'published',
  title: 'August 2026 Time-of-Use Peak Rate Spread & Appliance Load-Shifting Savings Benchmark',
  metaTitle: 'August 2026 Time-of-Use Peak Rate Spread & Appliance Load-Shifting Benchmark',
  metaDescription:
    'See how to calculate time-of-use savings from your utility’s peak and off-peak rates. The example separates laundry, dishwashing, and EV charging.',
  summary:
    'With a modeled 2.5x peak-to-off-peak price spread, shifting 16 dryer loads, 25 dishwasher cycles, and 10 EV charging sessions from 32.0¢/kWh to 12.8¢/kWh yields $77.09 in monthly utility bill reductions. The EV accounts for $57.60 of the modeled savings. Without the EV, the modeled monthly savings are $19.49. Use your own statement rates and count only the usage you can actually move.',
  category: 'home-energy-costs',
  primaryIntent:
    'benchmark residential time of use peak rate spread and calculate appliance load shifting savings',
  primaryQuery:
    'time of use rate peak spread appliance load shifting savings benchmark august 2026',
  secondaryQueries: [
    'tou peak vs off peak electricity price ratio household savings',
    'how much can you save by shifting dishwasher and dryer to off peak hours',
    'time of use rate peak pricing appliance cost comparison august 2026',
  ],
  intentFingerprint: 'august-2026-tou-peak-offpeak-spread-appliance-savings-benchmark',
  canonicalTopic: 'august-2026-time-of-use-peak-rate-spread-appliance-load-shifting-benchmark',
  geography: 'united-states',
  reportingPeriod: 'August 2026',
  publishedAt: '2026-07-31',
  updatedAt: '2026-11-17',
  updateCadence: 'one-time',
  authorName: 'Jaynesh Shingala',
  keyFindings: [
    'Data Provenance Transparency: This analysis clearly separates official empirical inputs (EIA residential rate of 18.44¢/kWh) from EnergyBillLab model assumptions (2.5x TOU rate spread: 32.00¢ peak vs 12.80¢ off-peak; 4.0 kWh dryer load; 1.5 kWh dishwasher cycle; 30.0 kWh EV charging session) and derived calculated results (19.20¢/kWh rate differential; $0.77/load dryer savings; $5.76/session EV savings; $77.09/mo whole-home load-shifting savings).',
    'A 2.5x TOU rate spread (32.00¢/kWh peak vs 12.80¢/kWh off-peak) creates a 19.20¢/kWh cost differential per shifted kilowatt-hour.',
    'Shifting a 4.0 kWh electric clothes dryer load from peak hours to off-peak hours cuts per-load operating cost from $1.28 to $0.51 (saving $0.77 per load).',
    'Shifting a 30.0 kWh EV home charging session outside peak hours reduces session cost from $9.60 to $3.84 (saving $5.76 per charging session).',
    'The modeled household combining off-peak laundry, dishwashing, and EV charging saves $77.09 per month ($925.06 per year) while consuming the exact same total energy.',
  ],
  bodyParagraphs: [
    'As utility companies expand residential Time-of-Use (TOU) rate structures across the United States, household electricity costs increasingly depend on when energy is consumed rather than just how many kilowatt-hours are used. The example uses an illustrative tariff. The EIA national residential average of 18.44 cents per kWh provides context and does not specify the peak or off-peak rate on your plan.',
    'In the modeled plan, electricity is 32.00¢/kWh at peak and 12.80¢/kWh off peak. Each kWh shifted saves 19.20¢. Check your plan for eligible hours, which can vary by season and day.',
    'This benchmark report quantifies the exact dollar savings achieved by shifting major discretionary household appliance cycles—including electric clothes dryers, dishwashers, and electric vehicle (EV) home chargers—away from expensive peak demand hours.',
  ],
  sections: [
    {
      heading: 'Appliance cycle energy consumption and TOU rate math',
      paragraphs: [
        'To calculate load-shifting economics, appliance energy draw per cycle is multiplied by the respective peak and off-peak utility rate tariffs. A standard 240V electric clothes dryer drawing 5,000 Watts over a 48-minute cycle consumes 4.0 kWh per load.',
        'At the 32.00¢/kWh peak rate, running one dryer load costs $1.28. At the 12.80¢/kWh off-peak rate, that same load costs $0.512. Shifting a single laundry load to off-peak hours reduces operating cost by $0.768 per load (a 60% savings).',
        'Similarly, an ENERGY STAR dishwasher with heated dry drawing 1.5 kWh per cycle costs $0.48 during peak hours versus $0.192 off-peak, generating $0.288 in savings per cycle. For an electric vehicle requiring a 30.0 kWh charging session (adding ~100 miles of range), peak charging costs $9.60 compared to $3.84 off-peak—a $5.76 savings per charge.',
        'Table: Data Provenance & Methodology Lineage Breakdown',
        '| Lineage Category | Parameter / Metric | Value & Specification | Primary Source / Methodology Reference |',
        '| :--- | :--- | :--- | :--- |',
        '| Official Government Data | U.S. National Average Residential Electricity Rate | 18.44 ¢/kWh ($0.1844/kWh) | EIA Form EIA-861M / Electric Power Monthly (May 2026 Data Release) |',
        '| Official Government Data | Appliance Energy Test Standard Baselines | 10 CFR Part 430 (Dryers, Dishwashers, EV) | U.S. Department of Energy (DOE) |',
        '| Model Assumption | Peak TOU Electricity Rate (4 PM - 9 PM) | 32.00 ¢/kWh ($0.3200/kWh; 1.735x national avg) | Illustrative peak rate |',
        '| Model Assumption | Off-Peak TOU Electricity Rate (Nights) | 12.80 ¢/kWh ($0.1280/kWh; 0.694x national avg) | Illustrative off-peak rate |',
        '| Model Assumption | Electric Clothes Dryer Consumption | 4.0 kWh / Cycle (5,000W element @ 48 mins) | Standard Residential Laundry Cycle Baseline |',
        '| Model Assumption | Dishwasher Heated-Dry Consumption | 1.5 kWh / Cycle (wash booster + calrod dry) | Standard Residential Dishwasher Cycle Baseline |',
        '| Model Assumption | Level 2 EV Home Charging Session | 30.0 kWh / Session (~100 miles range added) | Standard Mid-Size EV Level 2 Charging Profile |',
        '| EnergyBillLab Calculation | Shifted Dryer Savings per Load | 76.8 ¢ / load ($1.280 peak vs $0.512 off-peak) | 4.0 kWh × (32.00¢ - 12.80¢) = $0.768 |',
        '| EnergyBillLab Calculation | Shifted EV Savings per Session | $5.76 / session ($9.60 peak vs $3.84 off-peak) | 30.0 kWh × (32.00¢ - 12.80¢) = $5.76 |',
        '| EnergyBillLab Calculation | Combined Monthly Load-Shifting Savings | $77.09 / month ($925.06 / year) | 16 dryer loads + 25 dishwasher runs + 10 EV sessions |',
      ],
    },
    {
      heading: 'Modeled monthly and annual household load-shifting savings',
      paragraphs: [
        'The totals below assume all listed cycles would otherwise have occurred during peak hours.',
        'For a household running 16 clothes dryer loads per month (4 loads per week), off-peak operation saves $12.29 monthly ($147.46 annually). Running 25 dishwasher cycles per month off-peak saves $7.20 monthly ($86.40 annually). Combining off-peak laundry and dishwashing yields $19.49 in monthly savings ($233.86 per year) without EV charging.',
        'When home EV charging (10 sessions per month at 30 kWh per session) is shifted entirely to overnight off-peak hours, EV charging savings add $57.60 monthly. In total, a fully load-shifted household saves $77.09 per month ($925.06 annually).',
      ],
    },
    {
      heading: 'Strategies for automating appliance load shifting',
      paragraphs: [
        'Modern smart appliances and home automation tools make TOU load shifting effortless without disrupting daily household schedules.',
        'Most modern dishwashers and clothes washers include built-in delay start timers (e.g., 2-hour, 4-hour, or 8-hour delays) allowing users to load dishes after dinner and automatically delay wash execution until 10:00 PM.',
        'Level 2 EV home chargers and EV onboard software allow drivers to configure scheduled charging windows (e.g., midnight to 6:00 AM), ensuring the vehicle charges automatically during the lowest rate tier. For electric resistance space heating or air conditioning, programmable smart thermostats can pre-cool or pre-heat living space prior to 4:00 PM peak windows.',
      ],
    },
    {
      heading: 'Methodology and limits',
      paragraphs: [
        'This benchmark models a representative summer 2.5x TOU rate spread benchmark centered around the EIA May 2026 national residential average price of 18.44¢/kWh (released July 23, 2026). Peak rate is set to 32.00¢/kWh (1.735x national average); off-peak rate is set to 12.80¢/kWh (0.694x national average).',
        'The modeled electricity drawn at the wall is 4.0 kWh per dryer load, 1.5 kWh per dishwasher cycle, and 30.0 kWh per EV charging session.',
        'Monthly and annual estimates are computed from unrounded inputs and displayed to the nearest cent. Actual individual utility savings depend on specific tariff structures (e.g., super-off-peak tiers, demand charges, fixed customer fees, and seasonal schedule dates).',
      ],
    },
  ],
  practicalExample:
    'Under a 2.5x TOU rate spread (32.0¢ peak vs 12.8¢ off-peak), a household running 16 dryer loads, 25 dishwasher cycles, and 10 EV charging sessions per month reduces monthly energy charges from $128.48 (all peak) to $51.39 (all off-peak)—saving $77.09 per month ($925.06 per year) while using identical energy.',
  methodologyNotes:
    'Formulas: Cycle Savings = Cycle kWh * (Peak Rate - OffPeak Rate). Peak Rate = 32.00¢/kWh ($0.3200); Off-Peak Rate = 12.80¢/kWh ($0.1280); Rate Spread = 19.20¢/kWh ($0.1920). Dryer load (4.0 kWh): Peak $1.28 - OffPeak $0.512 = $0.768 savings/load. Dishwasher (1.5 kWh): Peak $0.48 - OffPeak $0.192 = $0.288 savings/load. EV charge (30.0 kWh): Peak $9.60 - OffPeak $3.84 = $5.76 savings/session. Monthly Total = (16 * $0.768) + (25 * $0.288) + (10 * $5.76) = $12.288 + $7.200 + $57.600 = $77.088 -> $77.09. Annual Total = $77.088 * 12 = $925.056 -> $925.06.',
  sources: [
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Electricity Monthly Update — May 2026 Average Residential Price Data',
      url: 'https://www.eia.gov/electricity/monthly/update/',
      topic:
        'U.S. national residential average electricity price benchmark (18.44 cents per kWh) released July 23, 2026.',
    },
    {
      organization: 'U.S. Energy Information Administration',
      title: 'Electricity Explained — Factors Affecting Electricity Prices & TOU Rates',
      url: 'https://www.eia.gov/energyexplained/electricity/prices-and-factors-affecting-prices.php',
      topic: 'Time-of-Use utility rate structures, peak pricing periods, and grid demand dynamics.',
    },
    {
      organization: 'U.S. Department of Energy',
      title: 'Estimating Appliance and Home Electronic Energy Use (archived PDF)',
      url: 'https://bpi.org/__cms/docs/Estimating-Appliance-and-Home-Electronic-Energy-Use-_-Department-of-Energy.pdf',
      topic: 'Estimating energy and operating cost from power, runtime, and electricity price',
    },
  ],
  relatedRoutes: [
    '/tools/appliance-energy-cost-calculator',
    '/tools/clothes-dryer-cost-calculator',
    '/tools/ev-home-charging-cost-calculator',
    '/electricity-bill-analyzer',
    '/guides/what-is-a-time-of-use-electricity-rate',
    '/guides/how-much-electricity-do-household-appliances-use',
    '/electricity-rates',
    '/data-sources',
  ],
};
