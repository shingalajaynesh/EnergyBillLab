import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-wifi-router-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideWifiRouterElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: 24/7 Wi-Fi Router Power & Annual Cost</h2>
        <p>
          A single standalone Wi-Fi router or modem combo draws between <strong>5W and 15W</strong>{' '}
          of continuous electrical power. Because internet networking gear runs 24 hours a day, 365
          days a year (8,760 hours/yr), a typical 10W router setup consumes{' '}
          <strong>7.3 kWh per month (87.6 kWh per year)</strong>.
        </p>
        <p>
          At average U.S. electricity rates (20 ¢/kWh), operating a Wi-Fi router costs approximately{' '}
          <strong>$1.46 per month or $17.52 per year</strong>. Multi-node mesh networks with 3
          satellite units draw 20W to 35W combined, costing $35.00 to $60.00 annually.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Modem, Router & Mesh Node Power Breakdown</h2>
        <p>Home networking equipment consists of different devices with distinct power profiles:</p>
        <ul>
          <li>
            <strong>Cable / Fiber Modem (ONT):</strong> Draws 5W to 10W to maintain broadband line
            connection.
          </li>
          <li>
            <strong>Wi-Fi 6 / 6E Router:</strong> Draws 8W to 15W supporting dual-band/tri-band
            wireless radios.
          </li>
          <li>
            <strong>Wi-Fi Mesh Satellite Nodes:</strong> Draw 4W to 10W per node continuously.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Annual Router Cost ($) = Continuous Watts × 8,760 Hours ÷ 1,000 × Rate ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Wi-Fi Router Operating Costs across Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Wi-Fi router and networking equipment operating costs across utility rates"
            className={styles.dataTable}
          >
            <caption>Networking Equipment Costs: Device Setup vs. Electric Rates (24/7)</caption>
            <thead>
              <tr>
                <th scope="col">Networking Setup</th>
                <th scope="col">Continuous Power Draw</th>
                <th scope="col">Annual kWh</th>
                <th scope="col">Annual Cost (15 ¢/kWh)</th>
                <th scope="col">Annual Cost (20 ¢/kWh)</th>
                <th scope="col">Annual Cost (30 ¢/kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basic ISP Modem / Router Combo</td>
                <td>7W</td>
                <td>61.3 kWh</td>
                <td>$9.20</td>
                <td>$12.26</td>
                <td>$18.39</td>
              </tr>
              <tr>
                <td>High-Performance Wi-Fi 6 Router</td>
                <td>12W</td>
                <td>105.1 kWh</td>
                <td>$15.77</td>
                <td>$21.02</td>
                <td>$31.53</td>
              </tr>
              <tr>
                <td>3-Pack Mesh Wi-Fi Network</td>
                <td>25W</td>
                <td>219.0 kWh</td>
                <td>$32.85</td>
                <td>$43.80</td>
                <td>$65.70</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume continuous 24/7/365 operation (8,760 hours/yr). Figures
          represent typical manufacturer benchmarks and illustrative assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Network Energy Tips</h2>
        <p>
          Because Wi-Fi routers provide smart home connectivity and security updates, turning them
          off overnight is generally not recommended. To optimize energy, choose ENERGY STAR
          certified network equipment or disable unused frequency bands (e.g., guest networks) if
          not needed.
        </p>
        <p>
          Calculate small electronic operating costs with our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          or learn about laptop power in our{' '}
          <Link href="/guides/how-much-electricity-does-a-laptop-use">
            Laptop Electricity Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
