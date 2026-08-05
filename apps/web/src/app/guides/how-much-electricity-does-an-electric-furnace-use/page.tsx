import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-an-electric-furnace-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideElectricFurnaceElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Electric Furnace Power Draw & Winter Cost</h2>
        <p>
          A central electric furnace has a high rated power capacity between{' '}
          <strong>10 kW and 25 kW</strong> (10,000W to 25,000W), making it one of the largest single
          electrical loads in residential homes.
        </p>
        <p>
          However, electric furnaces do not draw maximum kW continuously. Thermostat controls cycle
          heating elements on and off in 5 kW to 10 kW stages. In cold winter climates, an electric
          furnace operating 6 hours daily at an average 50% duty cycle consumes an estimated{' '}
          <strong>1,350 to 2,700 kWh per month</strong> based on illustrative calculation
          assumptions ($270 to $540 per month at 20 ¢/kWh).
        </p>
      </section>

      <section className={styles.section}>
        <h2>Heating Element Staging, Blower Motors & Duty Cycles</h2>
        <p>
          Understanding electric furnace power consumption requires separating heating element
          wattage from blower fan operation:
        </p>
        <ul>
          <li>
            <strong>Heating Element Staging:</strong> Electric furnace coils (typically 5 kW per
            bank) engage sequentially to prevent sudden voltage dips on the main electrical panel.
          </li>
          <li>
            <strong>Blower Motor Draw:</strong> The central air handler blower motor draws an
            additional 300W to 800W continuously while pushing heated air through ductwork.
          </li>
          <li>
            <strong>Thermostat Duty Cycle:</strong> Once the home reaches the target setpoint (e.g.,
            68°F), the thermostat cycles heating elements off, keeping average hourly power draw
            below peak rating.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Winter Monthly Cost ($) = Rated kW × Duty Cycle × Daily Hours × 30 Days × Rate ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Electric Furnace Operating Costs across Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Electric furnace operating costs across furnace sizes and electric rates"
            className={styles.dataTable}
          >
            <caption>
              Electric Furnace Costs: Capacity Rating vs. Electric Rates (6 hrs/day, 50% Duty)
            </caption>
            <thead>
              <tr>
                <th scope="col">Furnace Capacity</th>
                <th scope="col">Effective Power</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10 kW (Small Home / Mild)</td>
                <td>5.0 kW effective</td>
                <td>900 kWh</td>
                <td>$135.00</td>
                <td>$180.00</td>
                <td>$270.00</td>
              </tr>
              <tr>
                <td>15 kW (Medium Home)</td>
                <td>7.5 kW effective</td>
                <td>1,350 kWh</td>
                <td>$202.50</td>
                <td>$270.00</td>
                <td>$405.00</td>
              </tr>
              <tr>
                <td>20 kW (Large Home / Cold)</td>
                <td>10.0 kW effective</td>
                <td>1,800 kWh</td>
                <td>$270.00</td>
                <td>$360.00</td>
                <td>$540.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume 6 hours daily operating demand at a 50% element duty cycle.
          Figures represent typical manufacturer benchmarks and illustrative calculation
          assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Efficiency Upgrades</h2>
        <p>
          Because electric resistance furnaces convert 100% of electrical energy directly into heat
          (COP 1.0), upgrading to an air-source heat pump (COP 2.5–3.5) reduces winter heating kWh
          consumption by 50% to 60%. At the U.S. EIA national average rate of{' '}
          <strong>18.44 ¢/kWh</strong> (May 2026 benchmark release), a 15 kW furnace operating 6
          hours daily costs $248.94 per month, whereas a heat pump delivering identical warmth costs
          $83.00 to $99.50.
        </p>
        <p>
          Calculate room heating operating costs with our{' '}
          <Link href="/tools/space-heater-cost-calculator">Space Heater Cost Calculator</Link>,
          evaluate heat pump upgrades in our{' '}
          <Link href="/guides/heat-pump-vs-electric-resistance-heating-cost">
            Heat Pump vs. Resistance Heating Guide
          </Link>
          , analyze overall bill spikes with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link>, or compare
          delivered thermal costs in our{' '}
          <Link href="/insights/august-2026-natural-gas-vs-electric-heating-cost-per-mmbtu-benchmark">
            August 2026 Gas vs. Electric Heating $/MMBtu Benchmark
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
