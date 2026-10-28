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

const guide = energyGuides['how-much-electricity-does-a-washing-machine-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideWashingMachineElectricityPage() {
  const rateDollars = DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH / 100;

  // Wash cycle energy parameters (DOE 10 CFR Part 430 App J2; 300 cycles/yr baseline)
  const coldKwh = 0.2; // 0.20 kWh motor/controls only
  const warmKwh = 1.25; // 0.20 kWh motor + 1.05 kWh thermal
  const hotKwh = 2.45; // 0.20 kWh motor + 2.25 kWh thermal

  const coldCost = coldKwh * rateDollars;
  const warmCost = warmKwh * rateDollars;
  const hotCost = hotKwh * rateDollars;

  const annualColdCost = coldKwh * 300 * rateDollars;
  const annualWarmCost = warmKwh * 300 * rateDollars;
  const annualHotCost = hotKwh * 300 * rateDollars;
  const coldShiftSavings = annualHotCost - annualColdCost;

  // Front-load vs Top-load parameters (warm wash 300 cycles/yr)
  const heFrontKwh = 0.7;
  const stdTopKwh = 1.4;
  const annualHeFrontCost = heFrontKwh * 300 * rateDollars;
  const annualStdTopCost = stdTopKwh * 300 * rateDollars;
  const tenYearFrontLoadSavings = (annualStdTopCost - annualHeFrontCost) * 10;

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Washing Machine Electricity Use & Cost</h2>
        <p>
          A clothes washing machine uses <strong>0.20 kWh per load</strong> for cold-water washes
          (costing about <strong>${coldCost.toFixed(3)} per cycle</strong> at the current U.S.
          residential benchmark rate of{' '}
          <strong>{DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH} ¢/kWh</strong>,{' '}
          {DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE}). However, washing with hot water increases
          energy consumption to <strong>2.45 kWh per load (${hotCost.toFixed(3)} per cycle)</strong>{' '}
          because <strong>75% to 90% of total wash energy</strong> goes strictly toward heating
          municipal tap water in an electric water heater.
        </p>
        <p>
          For a typical U.S. household completing 300 laundry cycles annually (5.8 loads/week),
          switching from Hot to Cold water washes saves <strong>675.0 kWh per year</strong>,
          reducing electric bills by <strong>${coldShiftSavings.toFixed(2)} annually</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Hot Water vs. Cold Water Wash Energy Split</h2>
        <div className={styles.formulaBox}>
          Total Washer Energy (kWh) = Mechanical Motor Work (~0.20 kWh) + Water Heater Thermal Input
          (0.0 to 2.25 kWh)
          <br />
          Cycle Operating Cost ($) = Total Washer Energy (kWh) × Electricity Rate ($/kWh)
          <br />
          Annual Operating Cost ($) = Annual Cycles (300 baseline) × Cycle Energy (kWh) × Rate
          ($/kWh)
        </div>
        <p>
          An electric washing machine motor, drain pump, and control board draw only 150 to 250
          Watts during operation, consuming approximately 0.20 kWh per load regardless of water
          temperature. Supplying 20 gallons of hot water for a 130°F Hot wash cycle requires an
          electric tank water heater to consume 2.25 kWh of electricity to heat municipal tap water
          from 60°F. Selecting Cold wash eliminates this 2.25 kWh thermal burden entirely.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Washing Machine Cost Comparison Across Water Temperatures</h2>
        <p>
          Below is a comprehensive cycle operating cost matrix evaluated across water temperatures
          and utility rates (based on a 300-cycle annual household workload):
        </p>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Washing machine operating cost comparison across water temperatures and utility rates"
            className={styles.dataTable}
          >
            <caption>
              Table 1: Washing Machine Cycle Energy & Annual Operating Costs (@{' '}
              {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh; 300 Cycles/Year Baseline)
            </caption>
            <thead>
              <tr>
                <th scope="col">Wash Temperature</th>
                <th scope="col">Energy / Load</th>
                <th scope="col">Cost / Cycle (@ {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢)</th>
                <th scope="col">Annual kWh (300 cycles)</th>
                <th scope="col">Annual Cost (@ {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢)</th>
                <th scope="col">Annual Cost @ 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cold Water Wash (60°F Tap)</td>
                <td>0.20 kWh</td>
                <td>${coldCost.toFixed(3)}</td>
                <td>{(coldKwh * 300).toFixed(1)} kWh</td>
                <td>${annualColdCost.toFixed(2)} / yr</td>
                <td>${(coldKwh * 300 * 0.3).toFixed(2)} / yr</td>
              </tr>
              <tr>
                <td>Warm Water Wash (105°F)</td>
                <td>1.25 kWh</td>
                <td>${warmCost.toFixed(3)}</td>
                <td>{(warmKwh * 300).toFixed(1)} kWh</td>
                <td>${annualWarmCost.toFixed(2)} / yr</td>
                <td>${(warmKwh * 300 * 0.3).toFixed(2)} / yr</td>
              </tr>
              <tr>
                <td>Hot Water Wash (130°F)</td>
                <td>2.45 kWh</td>
                <td>${hotCost.toFixed(3)}</td>
                <td>{(hotKwh * 300).toFixed(1)} kWh</td>
                <td>${annualHotCost.toFixed(2)} / yr</td>
                <td>${(hotKwh * 300 * 0.3).toFixed(2)} / yr</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Top-Load vs. Front-Load Mechanical Efficiency Benchmark</h2>
        <p>Washer design architecture plays a major role in total energy and water demand:</p>
        <ul>
          <li>
            <strong>Standard Agitator Top-Loader:</strong> Submerges clothing in a deep water basin
            (30–45 gallons per load). On a standard warm wash setting, heating and running this unit
            consumes <strong>1.40 kWh per cycle</strong> (420.0 kWh/year or $
            {annualStdTopCost.toFixed(2)}/year).
          </li>
          <li>
            <strong>High-Efficiency (HE) Front-Loader:</strong> Uses horizontal axis tumbling,
            lifting and dropping clothing through a shallow pool of water (requiring only 12–15
            gallons per load). On warm wash, an HE front-loader consumes only{' '}
            <strong>0.70 kWh per cycle</strong> (210.0 kWh/year or ${annualHeFrontCost.toFixed(2)}
            /year).
          </li>
          <li>
            <strong>10-Year Lifecycle Savings:</strong> Over a 10-year appliance lifespan, choosing
            an HE front-load washer saves{' '}
            <strong>2,100 kWh of electricity (${tenYearFrontLoadSavings.toFixed(2)}</strong>{' '}
            nationally, and over $680 in California) compared to a standard agitator top-loader, in
            addition to saving thousands of gallons of municipal water.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Practical Strategies to Lower Laundry Power Bills</h2>
        <ul>
          <li>
            <strong>Default to Cold Water Wash:</strong> Modern liquid detergents use enzymes
            designed to activate at tap water temperatures (60°F). Defaulting to cold wash
            eliminates up to 92% of laundry water-heating electricity.
          </li>
          <li>
            <strong>Wash Full Loads:</strong> Clothes washer motors draw virtually the same
            electricity for small loads as for full loads. Washing full loads maximizes energy
            utility per pound of fabric.
          </li>
          <li>
            <strong>Select High-Speed Spin Extraction:</strong> High-speed spin cycles (1,000–1,400
            RPM on front-loaders) extract significantly more residual water from clothing. Because
            electric clothes dryers use 3 to 4 times more energy per load than washers, thorough
            spin extraction slashes dryer runtime.
          </li>
          <li>
            <strong>Use Delay Timers on Time-of-Use Rates:</strong> If your utility charges higher
            rates during peak afternoon/evening hours, program your washer to run during off-peak
            morning or overnight hours.
          </li>
        </ul>
        <p>
          Calculate laundry drying costs with our{' '}
          <Link href="/tools/clothes-dryer-cost-calculator">Clothes Dryer Cost Calculator</Link> or
          estimate appliance energy usage in our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
