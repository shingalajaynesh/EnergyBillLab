import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-to-calculate-electricity-cost-per-kwh-from-your-bill']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideCalculateCostPerKwhPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Calculating Your Effective All-In Electricity Rate</h2>
        <p>
          To calculate your true effective electricity cost per kilowatt-hour (kWh), divide your
          total monthly bill dollar amount by the total number of kilowatt-hours consumed during
          that billing cycle:
        </p>
        <div className={styles.formulaBox}>
          Effective All-In Rate (¢/kWh) = (Total Bill Amount in USD ÷ Total Billing kWh) × 100
        </div>
        <p>
          For example, if your total electric statement is <strong>$160.00</strong> and your home
          consumed <strong>800 kWh</strong>, your effective all-in electricity cost is{' '}
          <strong>20.00 ¢ per kWh</strong> ($0.20/kWh).
        </p>
      </section>

      <section className={styles.section}>
        <h2>Why Base Supply Rates Are Misleading</h2>
        <p>
          Electric utility advertisements and retail supplier offers often list only the generation
          supply rate (for example, 8.5 ¢/kWh). However, your actual electric bill includes multiple
          additional charges:
        </p>
        <ul>
          <li>
            <strong>Transmission & Delivery Charges:</strong> Regulated fees paid to local utility
            grid operators for maintaining poles, wires, transformers, and substations.
          </li>
          <li>
            <strong>Fixed Customer Charges:</strong> Monthly account maintenance and metering fees
            ($10 to $20 per month) assessed regardless of usage.
          </li>
          <li>
            <strong>Environmental & Fuel Riders:</strong> Variable surcharges covering power plant
            fuel price adjustments and clean energy mandates.
          </li>
          <li>
            <strong>Local Utility Taxes & State Surcharges:</strong> Municipal utility taxes, state
            franchise fees, and public purpose program surcharges.
          </li>
        </ul>
        <p>
          Calculating your effective all-in rate is essential because it reflects the real cost of
          powering household appliances on your specific utility statement.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Step-by-Step Worked Calculation Example</h2>
        <p>
          Consider a representative residential billing statement with the following line-item
          breakdown:
        </p>

        <div className={styles.tableWrapper}>
          <table
            aria-label="Sample residential electric bill line-item calculation"
            className={styles.dataTable}
          >
            <caption>Sample Electric Bill Line-Item Breakdown (Usage: 1,000 kWh)</caption>
            <thead>
              <tr>
                <th scope="col">Bill Line Item</th>
                <th scope="col">Charge Type</th>
                <th scope="col">Amount ($)</th>
                <th scope="col">Effective Rate (¢/kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Electricity Supply (Generation)</td>
                <td>Variable (1,000 kWh × $0.09)</td>
                <td>$90.00</td>
                <td>9.00 ¢/kWh</td>
              </tr>
              <tr>
                <td>Utility Delivery & Distribution</td>
                <td>Variable (1,000 kWh × $0.06)</td>
                <td>$60.00</td>
                <td>6.00 ¢/kWh</td>
              </tr>
              <tr>
                <td>Fixed Customer Account Charge</td>
                <td>Fixed Monthly Fee</td>
                <td>$15.00</td>
                <td>1.50 ¢/kWh</td>
              </tr>
              <tr>
                <td>State & Local Utility Taxes</td>
                <td>Regulatory Surcharge</td>
                <td>$15.00</td>
                <td>1.50 ¢/kWh</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Electric Statement</strong>
                </td>
                <td>
                  <strong>All-In Total</strong>
                </td>
                <td>
                  <strong>$180.00</strong>
                </td>
                <td>
                  <strong>18.00 ¢/kWh</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          In this example, while the supply rate was 9.00 ¢/kWh, the true all-in rate paid by the
          household was <strong>18.00 ¢ per kWh</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>How to Use Your Effective Rate for Appliance Cost Estimates</h2>
        <p>
          Once you know your effective all-in rate, you can accurately estimate how much any
          appliance costs to operate using the standard energy formula:
        </p>
        <div className={styles.formulaBox}>
          Energy Cost ($) = (Wattage ÷ 1,000) × Operating Hours × Effective Rate ($/kWh)
        </div>
        <p>
          For additional details on state electricity pricing benchmarks, review our{' '}
          <Link href="/electricity-rates">50-State Electricity Rates Hub</Link>, inspect our{' '}
          <Link href="/methodology">Methodology</Link>, or check official sources at{' '}
          <Link href="/data-sources">Data Sources</Link>.
        </p>
      </section>
    </GuideArticleView>
  );
}
