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

const guide = energyGuides['how-much-electricity-does-central-air-conditioning-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideCentralAcElectricityPage() {
  const rateDollars = DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH / 100;

  // 3-Ton (36,000 BTU/hr) system power draw across SEER2 ratings
  const seer134Watts = 36000 / 13.4; // ~2,686.5 W (2.69 kW)
  const seer152Watts = 36000 / 15.2; // ~2,368.4 W (2.37 kW)
  const seer180Watts = 36000 / 18.0; // 2,000.0 W (2.00 kW)

  // Standard summer schedule (240 hrs/mo: 8 hrs/day)
  const kwhStandard134 = (seer134Watts * 240) / 1000;
  const costStandard134 = kwhStandard134 * rateDollars;

  const kwhStandard152 = (seer152Watts * 240) / 1000;
  const costStandard152 = kwhStandard152 * rateDollars;

  const kwhStandard180 = (seer180Watts * 240) / 1000;
  const costStandard180 = kwhStandard180 * rateDollars;

  const monthlySavingsStandard = costStandard134 - costStandard180;
  const seasonalSavingsStandard = monthlySavingsStandard * 4;

  // Peak heatwave schedule (420 hrs/mo: 14 hrs/day)
  const kwhPeak134 = (seer134Watts * 420) / 1000;
  const costPeak134 = kwhPeak134 * rateDollars;

  const kwhPeak180 = (seer180Watts * 420) / 1000;
  const costPeak180 = kwhPeak180 * rateDollars;

  const monthlySavingsPeak = costPeak134 - costPeak180;

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Central Air Conditioning Electricity Use & Cost</h2>
        <p>
          A residential central air conditioning system draws between{' '}
          <strong>2,000W and 5,500W</strong> (2.0 to 5.5 kW) of electrical power during active
          compressor operation depending on cooling capacity (tonnage) and SEER2 energy efficiency
          rating.
        </p>
        <p>
          Operating a typical 3-ton (36,000 BTU/hr) central AC for 8 hours daily (240 hours per
          month) consumes between <strong>480 kWh and 646 kWh per month</strong>. At the current
          U.S. residential benchmark rate of{' '}
          <strong>{DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH} ¢/kWh</strong> (
          {DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE}), running a 3-ton central AC costs between{' '}
          <strong>
            ${costStandard180.toFixed(2)} and ${costStandard134.toFixed(2)} per month
          </strong>{' '}
          (${(costStandard134 / 30).toFixed(2)} to ${(costStandard180 / 30).toFixed(2)} per day).
        </p>
      </section>

      <section className={styles.section}>
        <h2>Tonnage, SEER2 Ratings & Power Draw Formulas</h2>
        <p>
          Central cooling electricity demand depends on equipment sizing, seasonal efficiency
          ratings, and ductwork condition:
        </p>
        <ul>
          <li>
            <strong>Cooling Capacity (Tonnage):</strong> 1 ton equals 12,000 BTU/hr of heat removal.
            Standard single-family homes use 2.5-ton (30,000 BTU) to 5.0-ton (60,000 BTU) systems.
          </li>
          <li>
            <strong>SEER2 Efficiency:</strong> Under U.S. Department of Energy (DOE 10 CFR Part 430)
            standards, SEER2 measures total cooling output (BTU) divided by total electrical energy
            input (Wh) under updated external static pressure requirements (0.5 in. w.g.) reflecting
            real ductwork resistance.
          </li>
          <li>
            <strong>Power Draw Formula:</strong> Electrical power input (kW) equals system cooling
            capacity (BTU/hr) divided by SEER2 rating divided by 1,000:
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Power (kW) = (Cooling Capacity BTU/hr ÷ SEER2) ÷ 1,000
          <br />
          Monthly Energy Charge ($) = Power (kW) × Monthly Operating Hours × Electricity Rate
          ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>SEER2 Efficiency Benchmarks: 3-Ton Central AC Comparison</h2>
        <p>
          Comparing a standard 3-ton system across baseline, mid-tier, and premium SEER2 ratings
          illustrates substantial seasonal savings at the national benchmark rate of{' '}
          <strong>{DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh</strong> (
          {DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE}):
        </p>
        <div className={styles.tableWrapper}>
          <table
            aria-label="3-Ton Central AC SEER2 Efficiency & Operating Cost Comparison"
            className={styles.dataTable}
          >
            <caption>
              Table 1: 3-Ton (36,000 BTU/hr) Central AC Operating Costs by SEER2 Rating (@{' '}
              {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh)
            </caption>
            <thead>
              <tr>
                <th scope="col">Efficiency Tier</th>
                <th scope="col">SEER2 Rating</th>
                <th scope="col">Input Power</th>
                <th scope="col">Standard Summer (240 hrs)</th>
                <th scope="col">Standard Cost/Mo</th>
                <th scope="col">Heat Wave (420 hrs)</th>
                <th scope="col">Heat Wave Cost/Mo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Baseline Standard</td>
                <td>13.4 SEER2</td>
                <td>2.69 kW</td>
                <td>{kwhStandard134.toFixed(1)} kWh</td>
                <td>${costStandard134.toFixed(2)} / mo</td>
                <td>{kwhPeak134.toFixed(1)} kWh</td>
                <td>${costPeak134.toFixed(2)} / mo</td>
              </tr>
              <tr>
                <td>Mid-Tier Efficient</td>
                <td>15.2 SEER2</td>
                <td>2.37 kW</td>
                <td>{kwhStandard152.toFixed(1)} kWh</td>
                <td>${costStandard152.toFixed(2)} / mo</td>
                <td>{((seer152Watts * 420) / 1000).toFixed(1)} kWh</td>
                <td>${(((seer152Watts * 420) / 1000) * rateDollars).toFixed(2)} / mo</td>
              </tr>
              <tr>
                <td>High-Efficiency Inverter</td>
                <td>18.0 SEER2</td>
                <td>2.00 kW</td>
                <td>{kwhStandard180.toFixed(1)} kWh</td>
                <td>${costStandard180.toFixed(2)} / mo</td>
                <td>{kwhPeak180.toFixed(1)} kWh</td>
                <td>${costPeak180.toFixed(2)} / mo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Upgrading from a baseline 13.4 SEER2 system to an 18.0 SEER2 unit saves{' '}
          <strong>${monthlySavingsStandard.toFixed(2)} per month</strong> ($
          {seasonalSavingsStandard.toFixed(2)} over a 4-month cooling season). During intense
          heatwaves or heat domes (14 operating hours daily), monthly savings expand to{' '}
          <strong>${monthlySavingsPeak.toFixed(2)} per month</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Central AC Operating Costs across Tonnage & Electric Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Central AC operating costs across system sizes and electric rates"
            className={styles.dataTable}
          >
            <caption>
              Central AC Operating Costs: Tonnage vs. Electric Rates (8 hrs/day, 60% duty cycle)
            </caption>
            <thead>
              <tr>
                <th scope="col">System Size (Tons)</th>
                <th scope="col">Input Power (kW)</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">
                  Cost at {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH} ¢/kWh (U.S. Benchmark)
                </th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2.5 Ton (30,000 BTU)</td>
                <td>2.8 kW</td>
                <td>403.2 kWh</td>
                <td>${(403.2 * 0.15).toFixed(2)}</td>
                <td>${(403.2 * rateDollars).toFixed(2)}</td>
                <td>${(403.2 * 0.3).toFixed(2)}</td>
              </tr>
              <tr>
                <td>3.5 Ton (42,000 BTU)</td>
                <td>3.9 kW</td>
                <td>561.6 kWh</td>
                <td>${(561.6 * 0.15).toFixed(2)}</td>
                <td>${(561.6 * rateDollars).toFixed(2)}</td>
                <td>${(561.6 * 0.3).toFixed(2)}</td>
              </tr>
              <tr>
                <td>5.0 Ton (60,000 BTU)</td>
                <td>5.5 kW</td>
                <td>792.0 kWh</td>
                <td>${(792.0 * 0.15).toFixed(2)}</td>
                <td>${(792.0 * rateDollars).toFixed(2)}</td>
                <td>${(792.0 * 0.3).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Energy Optimization Tips</h2>
        <p>
          According to U.S. DOE research, uninsulated or leaky attic ductwork can lose 20% to 30% of
          cooling energy before conditioned air reaches living rooms. To minimize central AC
          operating expenses:
        </p>
        <ul>
          <li>Seal attic duct leaks and mastic joints to prevent cooled air loss.</li>
          <li>Replace or clean pleated air filters every 30 to 60 days during peak summer.</li>
          <li>
            Install programmable or smart thermostat schedules with moderate overnight setbacks.
          </li>
          <li>
            Pair whole-home AC with room-specific supplemental zone cooling where appropriate.
          </li>
        </ul>
        <p>
          Calculate your exact air conditioning costs with our{' '}
          <Link href="/tools/ac-cost-calculator">Air Conditioner Cost Calculator</Link> or evaluate
          ductless options in our{' '}
          <Link href="/guides/how-much-electricity-does-a-ductless-mini-split-use">
            Ductless Mini-Split Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
