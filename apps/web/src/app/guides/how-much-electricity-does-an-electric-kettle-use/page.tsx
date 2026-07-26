import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-an-electric-kettle-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideElectricKettleElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Electric Kettle Power & Cost per Boil</h2>
        <p>
          An electric kettle operates at a high power rating of <strong>1,200W to 1,500W</strong>{' '}
          (up to 2,200W–3,000W in 230V countries), but runs for very short durations—typically{' '}
          <strong>3 to 5 minutes per boil</strong>.
        </p>
        <p>
          Boiling 1 liter of water consumes approximately <strong>0.08 to 0.11 kWh</strong>, costing
          between <strong>$0.015 and $0.025 per boil</strong> at standard electric rates (20 ¢/kWh).
          A household boiling a kettle 4 times daily spends about $1.80 to $2.70 per month.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Physics of Water Heating & Overfilling Energy Waste</h2>
        <p>
          Raising 1 liter of water from 60°F (15°C) room temperature to 212°F (100°C) boiling point
          requires a fixed quantity of thermal energy (approx. 355 kJ or 0.098 kWh).
        </p>
        <div className={styles.formulaBox}>
          Cost per Boil ($) = Kettle Watts × (Boil Time Minutes ÷ 60) ÷ 1,000 × Rate ($/kWh)
        </div>
        <p>
          <strong>Overfilling Effect:</strong> Heating a full 1.7-liter kettle when you only need
          one 250mL cup of tea consumes nearly 7 times more energy than necessary. Overfilling
          wastes up to 80% of the electricity used per boil session.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Electric Kettle Costs across Usage Frequencies & Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Electric kettle operating costs across boiling frequencies and utility rates"
            className={styles.dataTable}
          >
            <caption>Electric Kettle Operating Costs: Daily Boils vs. Electric Rates</caption>
            <thead>
              <tr>
                <th scope="col">Usage Scenario</th>
                <th scope="col">Boils per Day (1.0L)</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Occasional Tea (2 boils/day)</td>
                <td>2 boils (8 mins total)</td>
                <td>6.0 kWh</td>
                <td>$0.90</td>
                <td>$1.20</td>
                <td>$1.80</td>
              </tr>
              <tr>
                <td>Typical Household (4 boils/day)</td>
                <td>4 boils (16 mins total)</td>
                <td>12.0 kWh</td>
                <td>$1.80</td>
                <td>$2.40</td>
                <td>$3.60</td>
              </tr>
              <tr>
                <td>Frequent Tea & Coffee (8 boils/day)</td>
                <td>8 boils (32 mins total)</td>
                <td>24.0 kWh</td>
                <td>$3.60</td>
                <td>$4.80</td>
                <td>$7.20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume a 1,500W heating element boiling 1.0L water in 4 minutes.
          Figures represent typical manufacturer benchmarks and illustrative assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Energy Optimization Tips</h2>
        <p>
          Electric kettles submerge their heating element directly in water, achieving 80% to 85%
          thermal efficiency—outperforming electric stovetop coils (55%–65% efficiency) for boiling
          water.
        </p>
        <p>
          Calculate kitchen water heating costs with our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          or evaluate cooktop cooking in our{' '}
          <Link href="/guides/how-much-electricity-does-an-induction-cooktop-use">
            Induction Cooktop Energy Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
