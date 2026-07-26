import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-to-read-an-electric-bill-line-by-line']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideReadElectricBillPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: How to Read Your Electric Bill Line by Line</h2>
        <p>
          A standard residential electric bill breaks down into two core charges:{' '}
          <strong>Supply (Generation)</strong> and{' '}
          <strong>Delivery (Transmission & Distribution)</strong>, alongside fixed customer fees,
          utility riders, and state/local taxes.
        </p>
        <p>
          To find your true <strong>effective electricity rate</strong>, divide your total eligible
          bill charges ($) by total billed kilowatt-hours (kWh). For example, a total monthly bill
          of <strong>$180.00 for 900 kWh</strong> yields an effective rate of{' '}
          <strong>20.0 ¢ per kWh</strong> ($0.20/kWh).
        </p>
      </section>

      <section className={styles.section}>
        <h2>Anatomy of a Utility Statement: Key Line Items</h2>
        <p>
          While exact item terminology varies by utility and state regulatory jurisdiction,
          statements contain these standard sections:
        </p>
        <ul>
          <li>
            <strong>Account & Service Details:</strong> Account number, service address, meter ID,
            billing period (e.g., 30 days), and due date.
          </li>
          <li>
            <strong>Meter Reading Summary:</strong> Previous cumulative reading, current reading,
            meter multiplier (typically 1.0 for residential), and total billed usage (Current
            Reading − Previous Reading).
          </li>
          <li>
            <strong>Supply / Generation Charges:</strong> The cost of power generation from power
            plants or market suppliers. In retail choice states, this line item comes from your
            chosen competitive supplier.
          </li>
          <li>
            <strong>Delivery / Distribution Charges:</strong> Regulated utility fees for maintaining
            local poles, wires, substations, and emergency restoration.
          </li>
          <li>
            <strong>Fixed Monthly Customer Charge:</strong> A flat administrative fee (for example,
            $8.00–$15.00/month in many utility service territories) billed regardless of energy
            consumed.
          </li>
          <li>
            <strong>Riders & Surcharges:</strong> Variable line items for fuel adjustments, energy
            efficiency programs, storm recovery, or renewable energy mandates.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Effective Rate ($/kWh) = Eligible Monthly Bill Charges ($) ÷ Total Billed Usage (kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Sample Electric Bill Line-Item Breakdown</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Sample residential electric bill line item breakdown for 900 kWh"
            className={styles.dataTable}
          >
            <caption>Sample Electric Bill Breakdown (900 kWh Usage Baseline)</caption>
            <thead>
              <tr>
                <th scope="col">Line Item Category</th>
                <th scope="col">Description</th>
                <th scope="col">Subtotal ($)</th>
                <th scope="col">Effective Rate Contribution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fixed Customer Charge</td>
                <td>Monthly meter & customer account service fee</td>
                <td>$12.00</td>
                <td>1.33 ¢/kWh</td>
              </tr>
              <tr>
                <td>Supply / Generation Charge</td>
                <td>Electricity generation rate at 9.5 ¢/kWh</td>
                <td>$85.50</td>
                <td>9.50 ¢/kWh</td>
              </tr>
              <tr>
                <td>Delivery / Distribution Charge</td>
                <td>Transmission & local grid maintenance at 7.0 ¢/kWh</td>
                <td>$63.00</td>
                <td>7.00 ¢/kWh</td>
              </tr>
              <tr>
                <td>Environmental & Storm Riders</td>
                <td>Regulatory compliance and grid resilience riders</td>
                <td>$9.00</td>
                <td>1.00 ¢/kWh</td>
              </tr>
              <tr>
                <td>State & Local Taxes</td>
                <td>Applicable municipal utility taxes (approx. 5%)</td>
                <td>$10.50</td>
                <td>1.17 ¢/kWh</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Statement Amount</strong>
                </td>
                <td>
                  <strong>Combined monthly customer balance</strong>
                </td>
                <td>
                  <strong>$180.00</strong>
                </td>
                <td>
                  <strong>20.0 ¢/kWh</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Line item labels, tax percentages, and delivery fees vary by utility company and
          regulatory jurisdiction. Figures represent an illustrative calculation assumption for a
          900 kWh monthly statement.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Calculation Boundaries</h2>
        <p>
          When calculating effective cost per kWh, separate non-recurring one-time charges (such as
          late payment fees, security deposits, or repair charges) from recurring energy usage
          charges.
        </p>
        <p>
          Analyze your utility statement line items with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link> or learn more
          about supply vs. delivery in our{' '}
          <Link href="/guides/electricity-supply-charge-vs-delivery-charge">
            Supply vs. Delivery Charge Guide
          </Link>{' '}
          or effective rate calculation guide:{' '}
          <Link href="/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill">
            How to Calculate Cost per kWh
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
