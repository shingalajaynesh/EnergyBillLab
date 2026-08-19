import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-washing-machine-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideWashingMachineElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Washing Machine Electricity Use & Cost</h2>
        <p>
          A clothes washing machine uses <strong>0.3 kWh to 0.6 kWh per load</strong> for cold-water
          washes (costing about <strong>$0.06 to $0.12 per load</strong> at 20 ¢/kWh). However,
          washing with hot water increases energy draw to{' '}
          <strong>1.5 kWh to 2.5 kWh per load</strong> ($0.30 to $0.50 per load) because 85% to 90%
          of total wash energy goes toward heating water.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Hot Water vs. Cold Water Wash Energy Split</h2>
        <div className={styles.formulaBox}>
          Total Washer Energy (kWh) = Motor Energy (0.3 kWh) + Water Heating Energy (0.0 to 1.8 kWh)
        </div>
        <p>
          Switching from hot to cold water washes saves approximately 1.5 kWh per load, translating
          to annual savings of $40 to $80 for typical households.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Washing Machine Cost Comparison Across Rates</h2>

        <div className={styles.tableWrapper}>
          <table
            aria-label="Washing machine operating cost comparison across water temperatures and utility rates"
            className={styles.dataTable}
          >
            <caption>Washing Machine Costs: Cold vs. Hot Wash Loads Across Rates</caption>
            <thead>
              <tr>
                <th scope="col">Wash Temperature</th>
                <th scope="col">Energy per Load</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
                <th scope="col">Annual Cost (5 Loads/Wk)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cold Water Wash</td>
                <td>0.35 kWh</td>
                <td>$0.05 / load</td>
                <td>$0.07 / load</td>
                <td>$0.11 / load</td>
                <td>$18.20 / yr (at 20¢)</td>
              </tr>
              <tr>
                <td>Warm Water Wash</td>
                <td>1.10 kWh</td>
                <td>$0.17 / load</td>
                <td>$0.22 / load</td>
                <td>$0.33 / load</td>
                <td>$57.20 / yr (at 20¢)</td>
              </tr>
              <tr>
                <td>Hot Water Wash</td>
                <td>2.00 kWh</td>
                <td>$0.30 / load</td>
                <td>$0.40 / load</td>
                <td>$0.60 / load</td>
                <td>$104.00 / yr (at 20¢)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>How Many Units of Electricity Does a Washing Machine Use?</h2>
        <p>
          In electric utility billing,{' '}
          <strong>1 unit of electricity equals exactly 1 kilowatt-hour (1 kWh)</strong>. The number
          of units your washing machine consumes per cycle depends directly on your water
          temperature selection:
        </p>
        <ul>
          <li>
            <strong>Cold Water Wash:</strong> Uses approximately{' '}
            <strong>0.3 to 0.5 units (kWh) per cycle</strong>. Only the electric motor and pump
            consume power.
          </li>
          <li>
            <strong>Warm Water Wash:</strong> Uses approximately{' '}
            <strong>1.0 to 1.3 units (kWh) per cycle</strong> due to moderate water heater power
            draw.
          </li>
          <li>
            <strong>Hot Water / Heavy Duty Wash:</strong> Uses approximately{' '}
            <strong>1.8 to 2.3 units (kWh) per cycle</strong> because heating 15–20 gallons of water
            requires high electrical energy.
          </li>
        </ul>
        <p>
          For a typical household running 5 loads per week on cold water, a washing machine uses
          only <strong>7 to 10 units (kWh) per month</strong>, costing about{' '}
          <strong>$1.30 to $1.85 monthly</strong> on your electric bill.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Related Appliances & Tools</h2>
        <p>
          Calculate laundry costs with our{' '}
          <Link href="/tools/clothes-dryer-cost-calculator">Clothes Dryer Cost Calculator</Link> or{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>
          . For dryer energy draw, read our guide on{' '}
          <Link href="/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer">
            Running an Electric Clothes Dryer
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
