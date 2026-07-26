import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-an-air-fryer-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideAirFryerElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Air Fryer Electricity Use & Cost</h2>
        <p>
          A countertop air fryer draws between <strong>1,400W and 1,800W</strong> of electrical
          power. Cooking a typical 20 to 30-minute meal consumes approximately{' '}
          <strong>0.5 to 0.75 kWh per use</strong>. At a national benchmark electricity rate of 20
          ¢/kWh, running an air fryer costs about{' '}
          <strong>$0.10 to $0.15 per cooking session</strong> ($3.00 to $4.50 per month for daily
          use).
        </p>
        <p>
          Because air fryers feature compact 3 to 6-quart cooking chambers, they preheat in 2 to 3
          minutes, compared to 10 to 15 minutes for full-size electric range ovens.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Thermostat Cycling & Cooking Comparison Boundaries</h2>
        <p>
          Like electric ovens, air fryers cycle their heating elements on and off once the target
          cooking temperature (e.g., 400°F) is reached. The internal fan runs continuously
          (20W–40W), while the main heating element cycles at a 70% to 85% duty cycle.
        </p>
        <div className={styles.formulaBox}>
          Energy Cost per Meal ($) = Rated Watts × Duty Cycle × Cooking Hours ÷ 1,000 × Rate ($/kWh)
        </div>
        <p>
          <strong>Oven Comparison Boundary:</strong> While an air fryer uses significantly less
          total energy to cook small portions or single-rack meals, a full-size electric oven
          (3,000W) remains more energy-efficient per serving when baking multiple trays or cooking
          large family meals simultaneously.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Air Fryer Cost Benchmarks across Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Air fryer operating costs across utility rates and cooking scenarios"
            className={styles.dataTable}
          >
            <caption>Air Fryer Operating Costs: Usage Scenarios vs. Utility Rates</caption>
            <thead>
              <tr>
                <th scope="col">Usage Scenario</th>
                <th scope="col">Frequency & Duration</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Occasional Use (3x/week)</td>
                <td>20 mins per meal</td>
                <td>4.2 kWh</td>
                <td>$0.63</td>
                <td>$0.84</td>
                <td>$1.26</td>
              </tr>
              <tr>
                <td>Daily Meal Preparation</td>
                <td>30 mins per meal</td>
                <td>18.0 kWh</td>
                <td>$2.70</td>
                <td>$3.60</td>
                <td>$5.40</td>
              </tr>
              <tr>
                <td>Heavy Family Cooking</td>
                <td>45 mins per day</td>
                <td>27.0 kWh</td>
                <td>$4.05</td>
                <td>$5.40</td>
                <td>$8.10</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume a 1,500W heating element operating at an average 80% duty
          cycle. Figures represent illustrative calculation assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Energy Optimization Tips</h2>
        <p>
          To minimize air fryer energy consumption, avoid opening the drawer unnecessarily during
          cooking, as re-heating escaping hot air forces the heating element to run continuously at
          full wattage.
        </p>
        <p>
          Calculate small appliance operating costs with our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          or evaluate range cooking costs in our{' '}
          <Link href="/guides/how-much-does-it-cost-to-run-an-electric-oven">
            Electric Oven Energy Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
