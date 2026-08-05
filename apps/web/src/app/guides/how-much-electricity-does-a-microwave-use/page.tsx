import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-microwave-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideMicrowaveElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Microwave Power & Monthly Cost</h2>
        <p>
          A standard countertop microwave draws between <strong>1,100W and 1,800W</strong> of
          electrical input power to generate 700W to 1,200W of cooking output. Because microwaves
          operate for short durations (typically 5 to 15 minutes daily), monthly electricity
          consumption is very low—between <strong>3 kWh and 12 kWh per month</strong> ($0.60 to
          $2.40 per month at 20 ¢/kWh).
        </p>
        <p>
          Digital microwave clocks draw a continuous standby power of 2W to 4W, accumulating
          approximately 1.5 to 3.0 kWh per month ($0.30 to $0.60/month) simply remaining plugged
          into the wall.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Input Wattage vs. Cooking Output Power</h2>
        <p>
          Microwaves carry two wattage ratings: <strong>cooking output wattage</strong> (printed on
          the front panel, e.g., 1,000W) and <strong>electrical input wattage</strong> (printed on
          the rear rating label, e.g., 1,500W). Magnetron energy conversion efficiency averages 60%
          to 70%, with the remaining power lost as thermal heat.
        </p>
        <div className={styles.formulaBox}>
          Energy (kWh) = (Input Watts × Daily Operating Minutes ÷ 60) ÷ 1,000
        </div>
      </section>

      <section className={styles.section}>
        <h2>Microwave Cost Benchmarks across Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Microwave operating costs across utility rates and daily usage scenarios"
            className={styles.dataTable}
          >
            <caption>Microwave Operating Costs: Usage Scenarios vs. Utility Rates</caption>
            <thead>
              <tr>
                <th scope="col">Usage Scenario</th>
                <th scope="col">Daily Cooking Time</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Light Use (Reheating 1-2 meals)</td>
                <td>5 mins/day</td>
                <td>3.75 kWh</td>
                <td>$0.56</td>
                <td>$0.75</td>
                <td>$1.13</td>
              </tr>
              <tr>
                <td>Typical Household (Cooking & thawing)</td>
                <td>15 mins/day</td>
                <td>11.25 kWh</td>
                <td>$1.69</td>
                <td>$2.25</td>
                <td>$3.38</td>
              </tr>
              <tr>
                <td>Heavy Household (Frequent cooking)</td>
                <td>30 mins/day</td>
                <td>22.50 kWh</td>
                <td>$3.38</td>
                <td>$4.50</td>
                <td>$6.75</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume a 1,500W input power rating. Standby clock consumption adds
          ~2.2 kWh/month. Figures represent illustrative calculation assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions, Limitations & Cooking Efficiency</h2>
        <p>
          For single portions or reheating, microwaves use 50% to 70% less energy than full-size
          electric ovens because they heat food directly rather than warming a large oven cavity and
          surrounding air. For boiling water specifically, see our{' '}
          <Link href="/guides/how-much-electricity-does-an-electric-kettle-use">
            Electric Kettle Power Consumption Guide
          </Link>
          , which demonstrates why submerged resistance heating elements outperform microwaves in
          thermal efficiency for liquids.
        </p>
        <p>
          Calculate your exact kitchen appliance energy costs with our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          or diagnose your monthly statement using the{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link>.
        </p>
      </section>
    </GuideArticleView>
  );
}
