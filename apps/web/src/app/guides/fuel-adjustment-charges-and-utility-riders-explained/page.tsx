import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['fuel-adjustment-charges-and-utility-riders-explained']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideFuelAdjustmentsAndRidersPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: What Are Fuel Adjustments and Utility Riders?</h2>
        <p>
          <strong>Fuel Adjustment Clauses (FAC)</strong> and <strong>Utility Riders</strong> are
          separate line-item surcharges on your electric bill designed to recover specific variable
          utility expenses outside of standard base rates.
        </p>
        <p>
          Fuel adjustments pass fluctuating fuel costs (such as natural gas or wholesale power
          purchases) directly to consumers. Utility riders recover costs for specific state-approved
          investments, including hurricane recovery, grid modernization, or energy efficiency
          programs.
        </p>
      </section>

      <section className={styles.section}>
        <h2>How Riders Work: Regulatory Mechanisms & Terminology</h2>
        <p>
          Rather than filing a multi-year formal base rate case with state public utility
          commissions, utilities use approved rider mechanisms to adjust rates dynamically:
        </p>
        <ul>
          <li>
            <strong>Fuel Adjustment Clause (FAC):</strong> Adjusts monthly or quarterly to reflect
            changes in power plant fuel costs (e.g., natural gas price volatility).
          </li>
          <li>
            <strong>Purchased Power Adjustment (PPA):</strong> Recovers costs when a utility must
            buy emergency electricity from wholesale power markets.
          </li>
          <li>
            <strong>Storm Recovery / Securitization Riders:</strong> Temporary surcharges that repay
            bonds issued to rebuild power lines after severe weather events.
          </li>
          <li>
            <strong>Environmental & Grid Modernization Riders:</strong> Funds pollution control
            upgrades, smart meter rollouts, or renewable energy compliance.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Total Monthly Rider Cost ($) = Billed kWh × Combined Rider Adjustment Rate ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Common Utility Rider Surcharges & Billing Impact</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Common electric utility rider surcharges and line item descriptions"
            className={styles.dataTable}
          >
            <caption>Sample Utility Riders & Billing Impact (1,000 kWh Monthly Usage)</caption>
            <thead>
              <tr>
                <th scope="col">Rider Surcharge Category</th>
                <th scope="col">Typical Purpose</th>
                <th scope="col">Adjustment Frequency</th>
                <th scope="col">Sample Rate Impact</th>
                <th scope="col">Monthly Bill Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fuel & Energy Cost Adjustment (FAC)</td>
                <td>Natural gas fuel & market power purchases</td>
                <td>Monthly or Quarterly</td>
                <td>1.50 ¢/kWh</td>
                <td>$15.00</td>
              </tr>
              <tr>
                <td>Storm Restoration Securitization Rider</td>
                <td>Rebuilding grid infrastructure after major storms</td>
                <td>Annual True-Up</td>
                <td>0.80 ¢/kWh</td>
                <td>$8.00</td>
              </tr>
              <tr>
                <td>Energy Efficiency & Demand Response Rider</td>
                <td>Funding customer rebate programs & low-income audits</td>
                <td>Annual Adjustment</td>
                <td>0.40 ¢/kWh</td>
                <td>$4.00</td>
              </tr>
              <tr>
                <td>Renewable Energy Standard Rider</td>
                <td>Solar & wind power purchase agreement compliance</td>
                <td>Annual Adjustment</td>
                <td>0.30 ¢/kWh</td>
                <td>$3.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Rider names, calculation formulas, and surcharge rates vary widely by state and
          utility provider. Figures represent an illustrative calculation assumption for a 1,000 kWh
          statement.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Regulatory Oversight</h2>
        <p>
          Riders and fuel adjustments are not arbitrary fees created by electric companies; they are
          legally binding rate mechanisms approved and audited by state public utility commissions.
        </p>
        <p>
          Separate riders from base charges using our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link>, learn more in
          our{' '}
          <Link href="/guides/how-to-read-an-electric-bill-line-by-line">
            Reading Your Electric Bill Guide
          </Link>
          , or see how wholesale market volatility drives rider surcharges in our{' '}
          <Link href="/insights/july-2026-summer-wholesale-electricity-price-forecast">
            Summer Wholesale Electricity Price Forecast
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
