import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-billing-cycle-length-affects-electricity-bills']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideBillingCycleLengthPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Why Billing Cycle Days Matter</h2>
        <p>
          Electric utility billing cycles vary between 28 and 35 days depending on weekends,
          holidays, calendar months, and meter reading schedules. A statement covering 34 billing
          days contains 21.4% more calendar days than a 28-day statement, increasing your overall
          bill dollar amount even if your daily energy habits did not change.
        </p>
        <p>
          To compare two statements accurately, always divide total kWh and total dollars by the
          number of billing cycle days to derive your <strong>daily energy usage (kWh/day)</strong>{' '}
          and <strong>daily cost ($/day)</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Daily Usage Normalization Formula</h2>
        <div className={styles.formulaBox}>
          Daily Energy Consumption (kWh/day) = Total Statement kWh ÷ Billing Cycle Days
        </div>
        <p>
          Normalizing by billing days removes calendar drift and allows you to compare summer and
          winter statements fairly.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Billing Cycle Length Impact Comparison</h2>

        <div className={styles.tableWrapper}>
          <table
            aria-label="Comparison of billing cycles with 28, 30, and 34 days at identical daily usage"
            className={styles.dataTable}
          >
            <caption>
              Statement Impact: Identical 30 kWh/day Usage Across Different Cycle Lengths
            </caption>
            <thead>
              <tr>
                <th scope="col">Statement Metric</th>
                <th scope="col">Short Cycle (28 Days)</th>
                <th scope="col">Standard Cycle (30 Days)</th>
                <th scope="col">Long Cycle (34 Days)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Average Daily Usage</td>
                <td>30 kWh/day</td>
                <td>30 kWh/day</td>
                <td>30 kWh/day</td>
              </tr>
              <tr>
                <td>Total Billed Energy (kWh)</td>
                <td>840 kWh</td>
                <td>900 kWh</td>
                <td>1,020 kWh</td>
              </tr>
              <tr>
                <td>Effective Rate (20 ¢/kWh)</td>
                <td>$168.00</td>
                <td>$180.00</td>
                <td>$204.00</td>
              </tr>
              <tr>
                <td>Fixed Account Charge</td>
                <td>$15.00</td>
                <td>$15.00</td>
                <td>$15.00</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Electric Statement</strong>
                </td>
                <td>
                  <strong>$183.00</strong>
                </td>
                <td>
                  <strong>$195.00</strong>
                </td>
                <td>
                  <strong>$219.00</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Difference vs 28-Day Bill</strong>
                </td>
                <td>
                  <strong>Baseline</strong>
                </td>
                <td>
                  <strong>+$12.00 (+6.6%)</strong>
                </td>
                <td>
                  <strong>+$36.00 (+19.7%)</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Tiered Rates & Billing Cycle Drift</h2>
        <p>
          If your utility uses tiered tariffs (where kWh prices increase above a monthly threshold,
          such as 800 kWh), extra billing days push additional consumption into higher-priced rate
          tiers, amplifying the bill increase. For example, at the EIA national average rate of{' '}
          <strong>18.44 ¢/kWh</strong> (May 2026 benchmark release), 4 extra billing days in a
          33-day cycle add 120 kWh ($22.13) in baseline power before tiered multipliers apply.
        </p>
        <p>
          Normalize your monthly statements using our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link>, check if your
          meter was estimated in our{' '}
          <Link href="/guides/estimated-vs-actual-meter-reading">
            Estimated vs. Actual Meter Reading Guide
          </Link>
          , or understand line-item surcharges in our{' '}
          <Link href="/guides/fuel-adjustment-charges-and-utility-riders-explained">
            Fuel Adjustment Charges & Riders Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
