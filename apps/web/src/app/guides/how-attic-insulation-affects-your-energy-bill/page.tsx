import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-attic-insulation-affects-your-energy-bill']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideAtticInsulationEnergyBillPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: How Attic Insulation Affects Your Energy Bill</h2>
        <p>
          Attic insulation acts as a thermal barrier, slowing conductive heat transfer between your
          living space and outdoor weather.
        </p>
        <p>
          According to guidelines from the <strong>U.S. Department of Energy (DOE)</strong>,
          upgrading under-insulated attic space (e.g., bringing R-11 up to recommended R-49 or R-60
          levels) reduces home heating and cooling energy usage by <strong>15% to 20%</strong>. For
          a household spending $1,600 annually on heating and cooling, insulating the attic saves{' '}
          <strong>$240 to $320 per year</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>R-Value Physics, Climate Zones & Air Sealing First</h2>
        <p>
          Evaluating attic insulation performance requires understanding thermal resistance ratings
          and installation best practices:
        </p>
        <ul>
          <li>
            <strong>R-Value Thermal Resistance:</strong> R-value measures material resistance to
            heat flow. Higher R-values provide greater insulating capability (e.g., fiberglass batt,
            blown cellulose, or spray foam).
          </li>
          <li>
            <strong>DOE Climate Zone Standards:</strong> Cold Northern climates require R-49 to R-60
            (approximately 16 to 22 inches of insulation depending on material density), while warm
            Southern climates require R-30 to R-38 (approximately 10 to 14 inches) according to U.S.
            Department of Energy (DOE) recommended insulation depth guidelines.
          </li>
          <li>
            <strong>Air Sealing Prior to Insulating:</strong> Insulation retards heat conduction but
            does not stop airflow. Sealing attic floor air leaks with expanding foam before adding
            insulation is essential to prevent convective thermal loss.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Conductive Heat Loss ($Q$) = Area ($A$) × $\Delta T$ (Temp Difference) ÷ R-Value
        </div>
      </section>

      <section className={styles.section}>
        <h2>Attic Insulation Savings Estimates across Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Attic insulation energy bill savings across existing R-values and utility rates"
            className={styles.dataTable}
          >
            <caption>Attic Insulation Upgrade Savings: Existing R-Value vs. Electric Rates</caption>
            <thead>
              <tr>
                <th scope="col">Existing Attic Status</th>
                <th scope="col">Recommended Upgrade</th>
                <th scope="col">Est. HVAC Reduction</th>
                <th scope="col">Savings at 15 ¢/kWh</th>
                <th scope="col">Savings at 20 ¢/kWh</th>
                <th scope="col">Savings at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Poor (R-11 / 3-4 inches)</td>
                <td>Upgrade to R-49</td>
                <td>20% Reduction</td>
                <td>$210.00</td>
                <td>$280.00</td>
                <td>$420.00</td>
              </tr>
              <tr>
                <td>Fair (R-19 / 6-7 inches)</td>
                <td>Upgrade to R-49</td>
                <td>12% Reduction</td>
                <td>$126.00</td>
                <td>$168.00</td>
                <td>$252.00</td>
              </tr>
              <tr>
                <td>Good (R-30 / 10-11 inches)</td>
                <td>Top-off to R-60</td>
                <td>6% Reduction</td>
                <td>$63.00</td>
                <td>$84.00</td>
                <td>$126.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume a $1,400 annual HVAC spend. Figures represent DOE benchmark
          estimates and illustrative calculation assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Diminishing Returns</h2>
        <p>
          Adding insulation delivers diminishing marginal returns—doubling insulation thickness from
          R-30 to R-60 halves remaining heat flow, rather than doubling dollar savings. Ensure
          proper attic ventilation to prevent roof ice dams and moisture accumulation.
        </p>
        <p>
          Diagnose your electric statement with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link> or evaluate air
          sealing in our{' '}
          <Link href="/guides/how-air-leaks-increase-your-energy-bill">Air Leaks Energy Guide</Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
