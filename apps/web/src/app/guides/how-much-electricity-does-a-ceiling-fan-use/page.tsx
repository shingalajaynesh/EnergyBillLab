import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-ceiling-fan-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideCeilingFanElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Ceiling Fan Power Consumption & Cost</h2>
        <p>
          Standard AC ceiling fans draw <strong>50 to 75 Watts on high speed</strong> (and 15 to 30
          Watts on low speed), consuming 0.6 kWh per 12 hours of operation. At a 20 ¢/kWh
          electricity rate, running a ceiling fan for 12 hours daily costs only{' '}
          <strong>$0.12 per day</strong> ($3.60 per month).
        </p>
        <p>
          High-efficiency DC motor ceiling fans draw even less power (15 to 30 Watts on high speed),
          costing under $1.50 per month.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Ceiling Fan Wind-Chill Effect vs. Room Cooling</h2>
        <p>
          Ceiling fans cool <strong>people, not rooms</strong>, via the aerodynamic wind-chill
          effect. A ceiling fan creates evaporative cooling on skin, making a room feel up to 4°F
          cooler to occupants.
        </p>
        <div className={styles.formulaBox}>
          Thermostat Saver: Raising AC Setpoint 4°F + Running 50W Fan = Net 10% to 15% Air
          Conditioner Energy Savings
        </div>
        <p>
          Always turn ceiling fans off when exiting an unoccupied room to prevent wasting
          electricity.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Ceiling Fan Cost Comparison Across Rates & Speeds</h2>

        <div className={styles.tableWrapper}>
          <table
            aria-label="Ceiling fan power draw and monthly cost comparison across speed settings and rates"
            className={styles.dataTable}
          >
            <caption>Ceiling Fan Operating Costs (12 Hours / Day Runtime)</caption>
            <thead>
              <tr>
                <th scope="col">Fan Motor & Speed</th>
                <th scope="col">Power Draw (Watts)</th>
                <th scope="col">Monthly kWh (12 hr/day)</th>
                <th scope="col">At 15 ¢/kWh</th>
                <th scope="col">At 20 ¢/kWh</th>
                <th scope="col">At 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>High-Efficiency DC Motor (Medium)</td>
                <td>15 W</td>
                <td>5.4 kWh</td>
                <td>$0.81 / mo</td>
                <td>$1.08 / mo</td>
                <td>$1.62 / mo</td>
              </tr>
              <tr>
                <td>Standard AC Fan (Medium Speed)</td>
                <td>40 W</td>
                <td>14.4 kWh</td>
                <td>$2.16 / mo</td>
                <td>$2.88 / mo</td>
                <td>$4.32 / mo</td>
              </tr>
              <tr>
                <td>Standard AC Fan (High Speed)</td>
                <td>75 W</td>
                <td>27.0 kWh</td>
                <td>$4.05 / mo</td>
                <td>$5.40 / mo</td>
                <td>$8.10 / mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Cooling Calculators & Related Guides</h2>
        <p>
          Compare fan costs with air conditioning expenses using our{' '}
          <Link href="/tools/ac-cost-calculator">Air Conditioner Cost Calculator</Link> or{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>
          . For central AC cost details, read our guide on{' '}
          <Link href="/guides/how-much-does-it-cost-to-run-an-air-conditioner">
            Air Conditioner Operating Costs
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
