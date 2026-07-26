import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['what-is-a-demand-charge-on-an-electric-bill']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideDemandChargePage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: What Is a Demand Charge on an Electric Bill?</h2>
        <p>
          A <strong>Demand Charge ($/kW)</strong> is a utility billing fee based on the single
          highest rate of electricity consumption (peak power draw in kilowatts) measured over a
          brief interval (typically 15 to 30 minutes) during a billing cycle.
        </p>
        <p>
          While standard energy charges ($/kWh) bill for the total volume of electricity consumed
          over 30 days, demand charges ($/kW) bill for the maximum grid capacity required to supply
          your peak simultaneous load.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Energy (kWh) vs. Demand (kW) & Electrification Impacts</h2>
        <p>
          To understand demand charges, consider the classic automotive analogy:{' '}
          <strong>kWh is total miles driven</strong>, while <strong>kW is top speed (mph)</strong>.
        </p>
        <ul>
          <li>
            <strong>15-Minute Peak Interval:</strong> Smart meters record average kW power draw
            every 15 minutes. The single highest 15-minute interval during the month sets your
            demand charge billing kW.
          </li>
          <li>
            <strong>Simultaneous Appliance Operation:</strong> Running a central AC (4 kW), electric
            clothes dryer (5 kW), water heater (4.5 kW), and Level 2 EV charger (9.6 kW) at the
            exact same time creates a simultaneous demand spike of over 23 kW.
          </li>
          <li>
            <strong>Commercial vs. Residential Tariffs:</strong> Demand charges are universal on
            commercial electric bills, but select electric utilities are introducing residential
            demand tariffs for EV owners and electrified homes.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Demand Charge ($) = Maximum Interval Billed Demand (kW) × Demand Rate ($/kW)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Sample Demand Charge Bill Calculation</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Demand charge bill calculation comparing simultaneous vs staggered load profiles"
            className={styles.dataTable}
          >
            <caption>Demand Charge Impact: Staggered Usage vs. Simultaneous Peak Load</caption>
            <thead>
              <tr>
                <th scope="col">Household Appliance Profile</th>
                <th scope="col">Peak Billed Demand (kW)</th>
                <th scope="col">Total Energy (kWh)</th>
                <th scope="col">Demand Charge ($10/kW)</th>
                <th scope="col">Energy Charge (12¢/kWh)</th>
                <th scope="col">Total Monthly Bill</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Staggered Operation (Load Shifted)</td>
                <td>8.0 kW peak</td>
                <td>1,200 kWh</td>
                <td>$80.00</td>
                <td>$144.00</td>
                <td>$224.00</td>
              </tr>
              <tr>
                <td>Simultaneous Peak (EV + HVAC + Dryer)</td>
                <td>20.0 kW peak</td>
                <td>1,200 kWh</td>
                <td>$200.00</td>
                <td>$144.00</td>
                <td>$344.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Demand interval duration (15 vs 30 min), demand rates ($/kW), and residential
          applicability vary by electric utility tariff. Figures represent an illustrative
          calculation assumption.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Tariff Verification</h2>
        <p>
          Most standard residential utility tariffs do not include demand charges, but specialized
          EV rates or solar tariffs may incorporate kW demand pricing. Check your utility tariff
          document to confirm whether a demand charge applies to your rate class.
        </p>
        <p>
          Analyze your peak power draw with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link> or learn more
          about power physics in our{' '}
          <Link href="/guides/kw-vs-kwh-explained">kW vs. kWh Explained Guide</Link> or EV charging
          in our{' '}
          <Link href="/guides/how-much-does-it-cost-to-charge-an-ev-at-home">
            EV Home Charging Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
