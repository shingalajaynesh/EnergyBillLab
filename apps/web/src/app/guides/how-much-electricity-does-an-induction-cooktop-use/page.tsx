import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-an-induction-cooktop-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideInductionCooktopElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Induction Cooktop Power & Cooking Cost</h2>
        <p>
          Induction cooktop burners feature power ratings between <strong>1,400W and 3,700W</strong>{' '}
          per element. Because induction transfers magnetic energy directly into ferrous cookware
          rather than heating ambient glass or air, cooking a typical 30-minute meal on medium heat
          (1,500W effective power) consumes about <strong>0.75 kWh per meal</strong>.
        </p>
        <p>
          At a benchmark rate of 20 ¢/kWh, preparing a daily 30-minute meal costs approximately{' '}
          <strong>$0.15 per meal ($4.50 per month)</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Magnetic Heat Transfer & Power Cycling</h2>
        <p>
          Induction cooktops use high-frequency copper coils under a ceramic glass surface to
          generate an alternating magnetic field. When iron or magnetic stainless steel cookware is
          placed on top, eddy currents generate heat directly within the pan metal.
        </p>
        <ul>
          <li>
            <strong>Simmering / Low Settings:</strong> Power cycles pulse on/off at low wattage to
            maintain precise pan temperatures.
          </li>
          <li>
            <strong>Boost / Rapid Boil:</strong> Maximum 3,700W power boost boils 1 liter of water
            in under 2.5 minutes.
          </li>
          <li>
            <strong>Pan Requirements:</strong> Only cookware with magnetic iron bottoms (cast iron,
            magnetic stainless) functions on induction surfaces.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Meal Cooking Cost ($) = Burner Effective Watts × Cooking Hours ÷ 1,000 × Rate ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Induction Cooktop Costs across Usage Scenarios & Electric Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Induction cooktop operating costs across cooking durations and utility rates"
            className={styles.dataTable}
          >
            <caption>Induction Cooktop Operating Costs: Usage Scenarios vs. Utility Rates</caption>
            <thead>
              <tr>
                <th scope="col">Cooking Scenario</th>
                <th scope="col">Daily Cooking Time</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Quick Meals (1 burner, 20 mins)</td>
                <td>20 mins/day</td>
                <td>15.0 kWh</td>
                <td>$2.25</td>
                <td>$3.00</td>
                <td>$4.50</td>
              </tr>
              <tr>
                <td>Standard Dinner (2 burners, 30 mins)</td>
                <td>45 mins total/day</td>
                <td>33.8 kWh</td>
                <td>$5.06</td>
                <td>$6.75</td>
                <td>$10.13</td>
              </tr>
              <tr>
                <td>Heavy Family Cooking (Multiple burners)</td>
                <td>90 mins total/day</td>
                <td>67.5 kWh</td>
                <td>$10.13</td>
                <td>$13.50</td>
                <td>$20.25</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume average burner operation at 1,500W effective power. Figures
          represent typical manufacturer benchmarks and illustrative calculation assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Efficiency Comparison Limitations</h2>
        <p>
          While induction delivers ~80% to 90% of electromagnetic energy directly to cookware
          compared to ~70% for smooth-top radiant electric elements and ~40% for gas burners, actual
          energy bill savings depend heavily on cooking habits and electric rates.
        </p>
        <p>
          Calculate cooktop costs with our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          or compare oven power in our{' '}
          <Link href="/guides/how-much-does-it-cost-to-run-an-electric-oven">
            Electric Oven Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
