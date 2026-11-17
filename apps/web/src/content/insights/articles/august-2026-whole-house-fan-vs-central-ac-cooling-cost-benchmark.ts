import type { InsightRecord } from '../types';

export const august2026WholeHouseFanVsCentralAcCoolingCostBenchmark: InsightRecord = {
  id: 'august-2026-whole-house-fan-vs-central-ac-cooling-cost-benchmark',
  slug: 'august-2026-whole-house-fan-vs-central-ac-cooling-cost-benchmark',
  title: 'August 2026 Whole-House Fan vs. Central AC: How Much Runtime Must the Fan Replace?',
  metaTitle: 'Whole-House Fan vs Central AC Electricity Cost Benchmark | EnergyBillLab',
  metaDescription:
    'Compare whole-house fan and central AC costs using active runtime. Calculate how long the fan must displace AC operation to save electricity.',
  status: 'published',
  publishedAt: '2026-08-25',
  updatedAt: '2026-11-17',
  category: 'home-energy-costs',
  canonicalTopic: 'august-2026-whole-house-fan-vs-central-ac-cooling-cost-benchmark',
  intentFingerprint: 'whole-house-fan-central-ac-electricity-cost-wattage-savings-benchmark-2026',
  primaryIntent:
    'Estimate cooling electricity savings from actual AC runtime displaced by a whole-house fan on suitable evenings.',
  primaryQuery: 'whole house fan electricity cost vs central ac',
  secondaryQueries: [
    'how much electricity does a whole house fan use per month',
    'whole house fan wattage vs central air',
    'whole house fan monthly cost to run',
    'does a whole house fan save money on electric bill',
    'whole house fan vs air conditioner savings',
    'how many cfm for whole house fan calculator',
  ],
  geography: 'united-states',
  reportingPeriod: null,
  authorName: 'Jaynesh Shingala',
  updateCadence: 'annual',
  noindex: false,
  summary:
    'A 250-watt whole-house fan running for four hours uses 1 kWh. A central AC drawing 3 kW uses the same electricity in 20 minutes of active operation. On a cool, dry evening, the fan saves energy if it prevents more than 20 minutes of AC runtime.',
  keyFindings: [
    'Use active AC runtime. A thermostat schedule can include hours when the compressor is off.',
    'Compare the cost of electricity during the hours each device runs. Fixed monthly charges stay the same.',
    'Outdoor temperature, humidity, and air quality determine whether ventilation is an option.',
  ],
  bodyParagraphs: [
    'A whole-house fan draws cooler outside air through open windows. The U.S. Department of Energy recommends considering ventilation cooling where evenings are cool and dry. Air conditioning also removes moisture, so the two systems can deliver different indoor conditions.',
  ],
  sections: [
    {
      heading: 'How much AC runtime does the fan need to replace?',
      paragraphs: [
        'Multiply fan power in kilowatts by fan runtime in hours. Divide the result by the AC power draw while cooling, including the indoor blower. This gives the minimum AC runtime the fan must prevent before total electricity use drops.',
        'The table models one evening with a 250-watt fan running for four hours, a 3-kW AC, and a flat rate of $0.20/kWh.',
        '| AC runtime avoided | AC electricity avoided | Net change after fan use | Change in electricity cost |',
        '| :--- | :--- | :--- | :--- |',
        '| 10 minutes | 0.5 kWh | 0.5 kWh more | $0.10 more |',
        '| 20 minutes | 1.0 kWh | No change | No change |',
        '| 40 minutes | 2.0 kWh | 1.0 kWh less | $0.20 less |',
        '| 60 minutes | 3.0 kWh | 2.0 kWh less | $0.40 less |',
      ],
    },
    {
      heading: 'Check your own cooling costs',
      paragraphs: [
        'Compare thermostat runtime records from evenings with similar outdoor temperature, humidity, and indoor setpoints. For variable-speed AC, use measured kWh where available because power changes during operation. Check the full overnight period in case some AC operation shifts to a later hour.',
        'Multiply the fan and AC energy by the prices that apply during their respective hours. On a time-of-use plan, avoiding one kWh at the peak price and adding one kWh off peak can still reduce costs.',
      ],
    },
    {
      heading: 'When to keep windows closed',
      paragraphs: [
        'Use outdoor air for cooling when it is cooler and dry enough for your home. Humid air, smoke, and poor outdoor air quality can make ventilation unsuitable even after temperatures fall.',
        'A whole-house fan can depressurize a home and draw combustion gases indoors. Ask a qualified installer to assess combustion appliances, makeup air, and attic exhaust. Follow the equipment instructions for opening windows and operating the fan.',
      ],
    },
  ],
  practicalExample:
    'Suppose the fan replaces 40 minutes of active AC on each of 12 comparable evenings. You avoid 24 kWh of AC use and add 12 kWh of fan use. At $0.20/kWh, the net reduction is 12 kWh, or $2.40 for the month.',
  methodologyNotes:
    'The power draws, runtime, and flat electricity price are illustrative inputs. This comparison covers operating electricity. Actual comfort, runtime avoided, and costs depend on the equipment, weather, building, and tariff.',
  sources: [
    {
      organization: 'U.S. Department of Energy',
      title: 'Home Cooling',
      topic: 'Climate and humidity limits of ventilation cooling',
      url: 'https://www.energy.gov/home-cooling',
    },
    {
      organization: 'U.S. Department of Energy',
      title: 'Measure Guideline: Ventilation Cooling',
      topic: 'Installation and combustion backdrafting',
      url: 'https://www1.eere.energy.gov/buildings/publications/pdfs/building_america/measure_guide_vent_cooling.pdf',
    },
  ],
  relatedRoutes: [
    '/tools/ac-cost-calculator',
    '/tools/appliance-energy-cost-calculator',
    '/tools/bill-spike-detective',
    '/tools/home-energy-scorecard',
    '/electricity-rates',
    '/data-sources',
    '/methodology',
  ],
};
