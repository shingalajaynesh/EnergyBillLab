import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-dishwasher-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideDishwasherElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Dishwasher Electricity Use & Cost</h2>
        <p>
          A standard residential dishwasher uses between{' '}
          <strong>1.2 kWh and 2.4 kWh per load</strong>, drawing 1,200 to 1,800 Watts during active
          wash cycles. At a national benchmark electricity rate of 20 ¢/kWh, running one dishwasher
          load costs approximately <strong>$0.24 to $0.48 per load</strong> ($7.20 to $14.40 per
          month for daily use).
        </p>
        <p>
          Over 70% to 80% of a dishwasher&apos;s electrical consumption goes toward heating incoming
          water and running the heated dry element.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Dishwasher Energy Calculation Formula</h2>
        <div className={styles.formulaBox}>
          Energy Cost per Load ($) = kWh per Load × Electricity Rate ($/kWh)
        </div>
        <p>
          Where energy per load equals: (Heating Element Watts + Pump Motor Watts) ÷ 1,000 × Cycle
          Hours.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Dishwasher Cost Comparisons at 15¢, 20¢, and 30¢ per kWh</h2>

        <div className={styles.tableWrapper}>
          <table
            aria-label="Dishwasher operating cost across electricity rates and usage levels"
            className={styles.dataTable}
          >
            <caption>Dishwasher Operating Costs: Usage Scenarios vs. Utility Rates</caption>
            <thead>
              <tr>
                <th scope="col">Usage Scenario</th>
                <th scope="col">Daily / Monthly Runs</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">At 15 ¢/kWh</th>
                <th scope="col">At 20 ¢/kWh</th>
                <th scope="col">At 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Low Use (Eco Mode, Air Dry)</td>
                <td>4 Loads / Week (17/mo)</td>
                <td>20.4 kWh</td>
                <td>$3.06 / mo</td>
                <td>$4.08 / mo</td>
                <td>$6.12 / mo</td>
              </tr>
              <tr>
                <td>Typical Use (Standard Wash)</td>
                <td>1 Load / Day (30/mo)</td>
                <td>48.0 kWh</td>
                <td>$7.20 / mo</td>
                <td>$9.60 / mo</td>
                <td>$14.40 / mo</td>
              </tr>
              <tr>
                <td>High Use (Sanitize + Heated Dry)</td>
                <td>2 Loads / Day (60/mo)</td>
                <td>120.0 kWh</td>
                <td>$18.00 / mo</td>
                <td>$24.00 / mo</td>
                <td>$36.00 / mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Actionable Energy-Saving Tips for Dishwashers</h2>
        <ul>
          <li>
            <strong>Disable Heated Dry:</strong> Select &quot;Air Dry&quot; or crack the door open
            after the final rinse to save 30% to 50% of cycle energy.
          </li>
          <li>
            <strong>Run Full Loads Only:</strong> Dishwashers use the same amount of water heating
            energy regardless of how many dishes are loaded inside.
          </li>
          <li>
            <strong>Use Eco Mode:</strong> Eco cycles optimize water temperature and pump timing to
            minimize kWh consumption.
          </li>
        </ul>
        <p>
          Estimate appliance operating expenses with our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          or view statewide rate benchmarks on our{' '}
          <Link href="/electricity-rates">Electricity Rates Hub</Link>.
        </p>
      </section>
    </GuideArticleView>
  );
}
