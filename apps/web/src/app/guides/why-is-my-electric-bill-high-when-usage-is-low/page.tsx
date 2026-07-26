import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['why-is-my-electric-bill-high-when-usage-is-low']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideHighBillLowUsagePage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Why Your Bill Remains High Despite Lower Usage</h2>
        <p>
          An electric bill can remain high or even increase when your kilowatt-hour (kWh)
          consumption drops due to five primary drivers: fixed monthly customer account charges,
          utility base rate increases, fuel supply riders, billing cycle length variations, and
          estimated meter reading reconciliations.
        </p>
        <p>
          Lowering electricity usage reduces variable per-kWh costs, but fixed fees and per-unit
          rate increases can offset usage reductions on your final monthly total.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Key Causes of High Bills With Low Usage</h2>

        <h3>1. Fixed Customer Account Charges</h3>
        <p>
          Most electric utilities assess a fixed monthly customer charge ($10 to $25 per month) on
          every billing statement regardless of whether you consume 50 kWh or 1,500 kWh. If you are
          away on vacation, this fixed charge forms a baseline floor on your bill.
        </p>

        <h3>2. Utility Rate Hikes & Transmission Delivery Riders</h3>
        <p>
          State public utility commissions periodically approve base rate increases or transmission
          rider adjustments. If your electric utility increases its all-in rate from 14.0 ¢/kWh to
          17.5 ¢/kWh (a 25% rate increase), consuming 15% fewer kilowatt-hours will still yield a
          higher monthly total.
        </p>

        <h3>3. Estimated vs. Actual Meter Reads</h3>
        <p>
          If severe weather or scheduling issues prevent a physical meter read, utilities bill an
          estimated amount (marked &quot;E&quot; on your statement). If previous months
          underestimated usage, a subsequent actual read (marked &quot;A&quot;) includes catch-up
          charges from past cycles.
        </p>

        <h3>4. Longer Billing Cycles (More Calendar Days)</h3>
        <p>
          A billing cycle spanning 34 days contains 21.4% more billing days than a 28-day cycle.
          Even if your average daily usage was lower, extra days increase total statement dollars.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Comparing Low-Usage vs. High-Rate Billing Cycles</h2>

        <div className={styles.tableWrapper}>
          <table
            aria-label="Comparison of billing cycles with low usage vs high rate adjustments"
            className={styles.dataTable}
          >
            <caption>Statement Comparison: Usage Reduction vs. Rate Increase Impact</caption>
            <thead>
              <tr>
                <th scope="col">Billing Metric</th>
                <th scope="col">Previous Statement</th>
                <th scope="col">Current Statement</th>
                <th scope="col">Net Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Billing Cycle Days</td>
                <td>30 Days</td>
                <td>34 Days</td>
                <td>+4 Days (+13%)</td>
              </tr>
              <tr>
                <td>Total Energy Consumed</td>
                <td>900 kWh</td>
                <td>765 kWh</td>
                <td>-135 kWh (-15%)</td>
              </tr>
              <tr>
                <td>Effective Rate per kWh</td>
                <td>14.00 ¢/kWh</td>
                <td>18.00 ¢/kWh</td>
                <td>+4.00 ¢ (+28.6%)</td>
              </tr>
              <tr>
                <td>Fixed Customer Charge</td>
                <td>$15.00</td>
                <td>$15.00</td>
                <td>$0.00</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Bill Amount</strong>
                </td>
                <td>
                  <strong>$141.00</strong>
                </td>
                <td>
                  <strong>$152.70</strong>
                </td>
                <td>
                  <strong>+$11.70 (+8.3%)</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Diagnostic Steps & Related Tools</h2>
        <p>
          To diagnose your statement, use our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link> to separate rate
          increases from billing day variations, check our{' '}
          <Link href="/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill">
            Cost per kWh Calculation Guide
          </Link>
          , or review statewide rate baselines on our{' '}
          <Link href="/electricity-rates">Electricity Rates Hub</Link>.
        </p>
      </section>
    </GuideArticleView>
  );
}
