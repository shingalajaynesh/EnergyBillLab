import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-does-it-cost-to-run-an-electric-oven']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideElectricOvenCostPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Electric Oven Power Draw & Cost</h2>
        <p>
          An electric oven draws <strong>2,000 to 5,000 Watts</strong> when heating elements are
          active. However, because internal thermostats cycle elements on and off (duty cycle of 50%
          to 60%), baking at 350°F consumes approximately <strong>1.5 to 2.4 kWh per hour</strong>.
        </p>
        <p>
          At a 20 ¢/kWh electricity rate, running an electric oven for 1 hour costs approximately{' '}
          <strong>$0.30 to $0.48 per hour</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Electric Oven Thermostat Duty Cycle Formula</h2>
        <div className={styles.formulaBox}>
          Hourly Oven Cost ($) = Rated kW × Duty Cycle (0.55) × Electricity Rate ($/kWh)
        </div>
        <p>
          For a 3,000 Watt (3.0 kW) oven operating at 55% thermostat duty cycle: 3.0 kW × 0.55 =
          1.65 kWh per hour. At 20 ¢/kWh, cost = 1.65 kWh × $0.20 = $0.33 per hour.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Electric Oven Cost Comparison Across Rates</h2>

        <div className={styles.tableWrapper}>
          <table
            aria-label="Electric oven operating cost per hour and month across utility rates"
            className={styles.dataTable}
          >
            <caption>Electric Oven Operating Costs: Baking Times vs. Utility Rates</caption>
            <thead>
              <tr>
                <th scope="col">Oven Wattage & Temperature</th>
                <th scope="col">Effective Duty Cycle</th>
                <th scope="col">Hourly kWh</th>
                <th scope="col">At 15 ¢/kWh</th>
                <th scope="col">At 20 ¢/kWh</th>
                <th scope="col">At 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Compact Oven (2,400 W at 350°F)</td>
                <td>50% Duty Cycle</td>
                <td>1.20 kWh/hr</td>
                <td>$0.18 / hr</td>
                <td>$0.24 / hr</td>
                <td>$0.36 / hr</td>
              </tr>
              <tr>
                <td>Standard Oven (3,500 W at 350°F)</td>
                <td>55% Duty Cycle</td>
                <td>1.92 kWh/hr</td>
                <td>$0.29 / hr</td>
                <td>$0.38 / hr</td>
                <td>$0.58 / hr</td>
              </tr>
              <tr>
                <td>Large Oven / Broil (4,500 W High Heat)</td>
                <td>75% Duty Cycle</td>
                <td>3.38 kWh/hr</td>
                <td>$0.51 / hr</td>
                <td>$0.68 / hr</td>
                <td>$1.01 / hr</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Energy-Saving Kitchen Alternatives</h2>
        <p>
          For smaller meals, countertop convection ovens or air fryers draw 1,400W to 1,800W without
          requiring 0.8 kWh of preheating energy, saving 40% to 60% on cooking electricity.
        </p>
        <p>
          Calculate kitchen appliance operating costs with our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          or inspect benchmark rates on our{' '}
          <Link href="/electricity-rates">Electricity Rates Hub</Link>.
        </p>
      </section>
    </GuideArticleView>
  );
}
