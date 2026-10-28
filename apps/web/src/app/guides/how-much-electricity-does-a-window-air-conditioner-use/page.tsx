import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';
import {
  DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
  DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE,
} from '@/lib/constants/electricity';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-window-air-conditioner-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideWindowAirConditionerElectricityPage() {
  const rateDollars = DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH / 100;

  // Window AC capacity tiers (CEER standards, rated input Watts, 55% cycling duty factor)
  const windowAcTiers = [
    { size: '5,000 BTU (Bedroom/Studio)', btu: 5000, ceer: 11.0, watts: 450, effectiveWatts: 248 },
    {
      size: '8,000 BTU (Master Bedroom/Living)',
      btu: 8000,
      ceer: 11.4,
      watts: 700,
      effectiveWatts: 385,
    },
    {
      size: '10,000 BTU (Large Living Area)',
      btu: 10000,
      ceer: 11.4,
      watts: 875,
      effectiveWatts: 481,
    },
    {
      size: '12,000 BTU (Master Suite/Apartment)',
      btu: 12000,
      ceer: 11.4,
      watts: 1050,
      effectiveWatts: 578,
    },
    {
      size: '15,000 BTU (Open Concept Floor Plan)',
      btu: 15000,
      ceer: 10.8,
      watts: 1400,
      effectiveWatts: 770,
    },
  ];

  const standard8k = windowAcTiers[1]!;
  const standardHourlyCycling = (standard8k.effectiveWatts / 1000) * rateDollars;
  const standardHourlyFull = (standard8k.watts / 1000) * rateDollars;
  const standardMonthly8hr = ((standard8k.effectiveWatts * 8 * 30) / 1000) * rateDollars;

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Window AC Power & Monthly Cooling Cost</h2>
        <p>
          A window air conditioner consumes between <strong>450W and 1,400W</strong> of electrical
          power depending on cooling capacity (5,000 BTU to 15,000 BTU) and CEER energy efficiency
          rating.
        </p>
        <p>
          Under typical thermostatic cycling (55% duty cycle), running a popular 8,000 BTU window AC
          costs approximately <strong>{(standardHourlyCycling * 100).toFixed(1)}¢ per hour</strong>{' '}
          (<strong>{(standardHourlyFull * 100).toFixed(1)}¢/hr</strong> at continuous full load).
          Operating this unit for 8 hours nightly consumes approximately{' '}
          <strong>92.4 kWh per month</strong>, costing{' '}
          <strong>${standardMonthly8hr.toFixed(2)} per month</strong> at the current U.S.
          residential benchmark rate of{' '}
          <strong>{DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH} ¢/kWh</strong> (
          {DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE}).
        </p>
      </section>

      <section className={styles.section}>
        <h2>BTU Capacity, CEER Rating & Compressor Duty Cycle</h2>
        <p>
          Window AC electrical consumption is governed by four thermodynamic and operational
          variables:
        </p>
        <ul>
          <li>
            <strong>BTU Cooling Capacity:</strong> British Thermal Units per hour (BTU/hr) measures
            heat extraction rate. 5,000 BTU cools ~150 sq ft (450W draw); 8,000 BTU cools ~350 sq ft
            (700W draw); 12,000 BTU cools ~550 sq ft (1,050W draw).
          </li>
          <li>
            <strong>CEER Efficiency Rating:</strong> Under U.S. Department of Energy (DOE 10 CFR
            Part 430) standards, Combined Energy Efficiency Ratio (CEER) measures cooling output per
            Watt-hour input, including standby energy. Standard units achieve 10.8 to 11.4 CEER,
            while variable-speed inverter models reach 15.0+ CEER.
          </li>
          <li>
            <strong>Compressor Duty Cycle:</strong> Once room air reaches setpoint temperature, a
            conventional compressor cycles off, leaving only the circulating fan running (30W–50W).
            In a well-insulated bedroom, average summer duty cycles range from 50% to 60% (55%
            average).
          </li>
          <li>
            <strong>Thermostatic Calculation Formula:</strong>
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Effective Power (kW) = (Rated Input Watts × Duty Cycle) ÷ 1,000
          <br />
          Hourly Running Cost ($/hr) = Effective Power (kW) × Electricity Rate ($/kWh)
          <br />
          Monthly Energy Charge ($) = Effective Power (kW) × Daily Hours × Days × Rate ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Window AC Capacity Matrix: 5,000 to 15,000 BTU Benchmarks</h2>
        <p>
          Below is a comprehensive engineering benchmark comparing power draws, hourly costs, and
          monthly bills across common window AC sizes at the national benchmark rate of{' '}
          <strong>{DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh</strong> (
          {DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE}):
        </p>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Window Air Conditioner Capacity & Operating Cost Matrix"
            className={styles.dataTable}
          >
            <caption>
              Table 1: Window AC Electricity Costs by Capacity Tier (@{' '}
              {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh, 55% Duty Cycle, 8 Hours/Day)
            </caption>
            <thead>
              <tr>
                <th scope="col">Unit Size & Typical Coverage</th>
                <th scope="col">Rated Watts</th>
                <th scope="col">Cycling Draw</th>
                <th scope="col">Cost / Hour (Cycling)</th>
                <th scope="col">Cost / Hour (Full Load)</th>
                <th scope="col">Monthly Cost (8 hrs/day)</th>
              </tr>
            </thead>
            <tbody>
              {windowAcTiers.map((tier) => {
                const hourlyCycle = (tier.effectiveWatts / 1000) * rateDollars;
                const hourlyPeak = (tier.watts / 1000) * rateDollars;
                const monthly8h = ((tier.effectiveWatts * 8 * 30) / 1000) * rateDollars;
                return (
                  <tr key={tier.size}>
                    <td>{tier.size}</td>
                    <td>{tier.watts} W</td>
                    <td>{tier.effectiveWatts} W</td>
                    <td>{(hourlyCycle * 100).toFixed(1)} ¢ / hr</td>
                    <td>{(hourlyPeak * 100).toFixed(1)} ¢ / hr</td>
                    <td>${monthly8h.toFixed(2)} / mo</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Inverter Technology Savings & Overnight Bedroom Zone-Cooling</h2>
        <h3>1. Variable-Speed Inverter Efficiency</h3>
        <p>
          Traditional window ACs use single-speed compressors that slam on at 100% and shut off
          abruptly. Modern ENERGY STAR variable-speed inverter window units (CEER 15.0+)
          continuously throttle compressor speed to match cooling demand. Upgrading an 8,000 BTU
          unit from a standard 11.4 CEER model (385W cycling draw) to an inverter model (275W
          average draw) cuts electricity consumption by <strong>28.6%</strong>, saving approximately{' '}
          <strong>$21.90 per 90-day cooling season</strong> nationally ($38.50 in California).
        </p>

        <h3>2. Overnight Zone-Cooling Economics vs. Central AC</h3>
        <p>
          Homeowners with central AC can unlock substantial savings through room-specific
          supplemental zoning:
        </p>
        <ul>
          <li>
            <strong>Whole-Home Central AC Baseline:</strong> Cooling an entire 2,200 sq. ft. house
            to 72°F overnight with a 3.5-ton central AC (3,200W @ 50% duty cycle) consumes ~460
            kWh/month, costing <strong>${(460 * rateDollars).toFixed(2)}/month</strong>.
          </li>
          <li>
            <strong>Hybrid Zone-Cooling Alternative:</strong> Cooling only an occupied master
            bedroom to 72°F with an 8,000 BTU window AC (${standardMonthly8hr.toFixed(2)}/month)
            while easing the central thermostat to 78°F (${(144 * rateDollars).toFixed(2)}/month)
            consumes ~223 kWh/month combined.
          </li>
          <li>
            <strong>Net Household Savings:</strong> Hybrid overnight zoning saves approximately{' '}
            <strong>48.7% ($41.38/month)</strong> in cooling energy expenses during summer billing
            months.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Actionable Energy Reduction Practices</h2>
        <ul>
          <li>
            <strong>Seal Side Curtains & Window Gaps:</strong> Use foam weatherstripping and
            insulated side-panel covers to stop warm outdoor air infiltration.
          </li>
          <li>
            <strong>Clean Washable Filters Monthly:</strong> Clogged dust screens reduce airflow
            across the evaporator coil, increasing compressor runtime by 10% to 15%.
          </li>
          <li>
            <strong>Pair with a Ceiling Fan:</strong> Ceiling fans produce a wind-chill effect
            making rooms feel 3°F to 4°F cooler at a cost of only ~0.5¢/hour, allowing you to raise
            the window AC thermostat.
          </li>
        </ul>
        <p>
          Calculate your exact cooling expenses with our{' '}
          <Link href="/tools/ac-cost-calculator">Air Conditioner Cost Calculator</Link> or compare
          single-hose options in our{' '}
          <Link href="/guides/how-much-electricity-does-a-portable-air-conditioner-use">
            Portable AC Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
