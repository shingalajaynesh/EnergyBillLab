import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-air-leaks-increase-your-energy-bill']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideAirLeaksEnergyBillPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: How Air Leaks Increase Your Energy Bill</h2>
        <p>
          Unsealed gaps, cracks, and duct leaks allow conditioned indoor air to escape while drawing
          unconditioned outdoor air into your home.
        </p>
        <p>
          According to research by the <strong>U.S. Department of Energy (DOE)</strong> and{' '}
          <strong>ENERGY STAR</strong>, air infiltration accounts for{' '}
          <strong>15% to 30% of total residential heating and cooling energy loss</strong>. For a
          household spending $1,500 annually on heating and cooling, sealing air leaks reduces
          energy bills by <strong>$150 to $300 per year</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Infiltration Mechanics, Stack Effect & Leak Locations</h2>
        <p>Air leaks force HVAC systems to operate longer to maintain target temperatures:</p>
        <ul>
          <li>
            <strong>The Stack Effect:</strong> During winter, warm indoor air rises and escapes
            through attic penetrations, creating negative pressure that pulls cold outdoor air
            through basement and ground-floor gaps.
          </li>
          <li>
            <strong>Primary Leak Locations:</strong> Major air leakage occurs around attic hatches,
            recessed lighting cans, plumbing penetrations, window/door frames, and unsealed HVAC
            duct connections.
          </li>
          <li>
            <strong>Duct Infiltration:</strong> Unsealed ducts running through unconditioned attics
            or crawlspaces lose up to 20% of supply air before reaching living space registers.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Annual Leakage Cost ($) = HVAC Energy Spend ($) × Infiltration Loss Percentage (%)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Air Sealing Savings Estimates across Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Air sealing energy bill savings across home sizes and utility rates"
            className={styles.dataTable}
          >
            <caption>Air Sealing Savings: Annual HVAC Spend vs. Electric Rates</caption>
            <thead>
              <tr>
                <th scope="col">Home Size & Profile</th>
                <th scope="col">Annual HVAC Spend</th>
                <th scope="col">Savings at 15 ¢/kWh</th>
                <th scope="col">Savings at 20 ¢/kWh</th>
                <th scope="col">Savings at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Small Home / Apartment ($900/yr HVAC)</td>
                <td>$900</td>
                <td>$97.50</td>
                <td>$135.00</td>
                <td>$202.50</td>
              </tr>
              <tr>
                <td>Average Home ($1,500/yr HVAC)</td>
                <td>$1,500</td>
                <td>$162.50</td>
                <td>$225.00</td>
                <td>$337.50</td>
              </tr>
              <tr>
                <td>Large Unsealed Home ($2,400/yr HVAC)</td>
                <td>$2,400</td>
                <td>$260.00</td>
                <td>$360.00</td>
                <td>$540.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Savings based on DOE benchmark estimates (15% to 20% HVAC bill reduction from
          comprehensive air sealing). Figures represent illustrative calculation assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Blower Door Energy Audits</h2>
        <p>
          Before air sealing, conduct a professional energy assessment using a blower door fan test
          and infrared thermography to identify invisible building envelope leaks.
        </p>
        <p>
          Diagnose your electric bill with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link> or evaluate attic
          insulation in our{' '}
          <Link href="/guides/how-attic-insulation-affects-your-energy-bill">
            Attic Insulation Energy Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
