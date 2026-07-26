import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-central-air-conditioning-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideCentralAcElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Central Air Conditioning Electricity Use & Cost</h2>
        <p>
          A residential central air conditioning system draws between{' '}
          <strong>3,000W and 5,000W</strong> (3.0 to 5.0 kW) of electrical power during active
          compressor operation.
        </p>
        <p>
          Operating a typical 3.5-ton central AC for 8 hours daily at an assumed 60% compressor duty
          cycle (illustrative calculation assumption for peak summer demand) consumes approximately{' '}
          <strong>16.8 kWh to 24.0 kWh per day</strong> (504 kWh to 720 kWh per month). At an
          average electric rate of 20 ¢/kWh, running central AC costs between{' '}
          <strong>$100 and $144 per month</strong> ($3.30 to $4.80 per day).
        </p>
      </section>

      <section className={styles.section}>
        <h2>Tonnage, SEER2 Ratings & Duct Thermal Loss</h2>
        <p>
          Central cooling electricity demand depends on system sizing, seasonal efficiency ratings,
          and ductwork condition:
        </p>
        <ul>
          <li>
            <strong>Cooling Capacity (Tonnage):</strong> 1 ton equals 12,000 BTU/hr of heat removal.
            Standard homes use 2.5-ton (30,000 BTU) to 5.0-ton (60,000 BTU) systems.
          </li>
          <li>
            <strong>SEER2 Efficiency:</strong> SEER2 (Seasonal Energy Efficiency Ratio 2) measures
            cooling output divided by total watt-hours. Upgrading from SEER 10 or 13 to SEER2 16+
            reduces electricity consumption by 15% to 30%.
          </li>
          <li>
            <strong>Duct Leakage & Thermal Losses:</strong> According to U.S. DOE research,
            uninsulated or leaky attic ducts lose 20% to 30% of cooling energy before air reaches
            living rooms.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Daily AC kWh = System Input kW × Operating Hours × Compressor Duty Cycle
        </div>
      </section>

      <section className={styles.section}>
        <h2>Central AC Operating Costs across Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Central AC operating costs across system sizes and electric rates"
            className={styles.dataTable}
          >
            <caption>Central AC Operating Costs: Tonnage vs. Electric Rates (8 hrs/day)</caption>
            <thead>
              <tr>
                <th scope="col">System Size (Tons)</th>
                <th scope="col">Input Power (kW)</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2.5 Ton (30,000 BTU)</td>
                <td>2.8 kW</td>
                <td>403 kWh</td>
                <td>$60.45</td>
                <td>$80.60</td>
                <td>$120.90</td>
              </tr>
              <tr>
                <td>3.5 Ton (42,000 BTU)</td>
                <td>3.9 kW</td>
                <td>561 kWh</td>
                <td>$84.15</td>
                <td>$112.20</td>
                <td>$168.30</td>
              </tr>
              <tr>
                <td>5.0 Ton (60,000 BTU)</td>
                <td>5.5 kW</td>
                <td>792 kWh</td>
                <td>$118.80</td>
                <td>$158.40</td>
                <td>$237.60</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume 8 hours daily runtime at an average 60% compressor duty cycle.
          Figures represent typical manufacturer benchmarks and illustrative calculation
          assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Energy Optimization Tips</h2>
        <p>
          To minimize central AC operating costs, maintain clean air filters, schedule annual coil
          maintenance, seal attic duct leaks, and utilize smart thermostat setbacks.
        </p>
        <p>
          Calculate your exact air conditioning costs with our{' '}
          <Link href="/tools/ac-cost-calculator">Air Conditioner Cost Calculator</Link> or evaluate
          ductless options in our{' '}
          <Link href="/guides/how-much-electricity-does-a-ductless-mini-split-use">
            Ductless Mini-Split Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
