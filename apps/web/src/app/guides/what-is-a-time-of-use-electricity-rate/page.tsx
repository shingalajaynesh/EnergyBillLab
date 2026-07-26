import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['what-is-a-time-of-use-electricity-rate']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideTimeOfUseRatePage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: What Is a Time-of-Use (TOU) Electricity Rate?</h2>
        <p>
          A <strong>Time-of-Use (TOU)</strong> rate is a variable utility pricing structure where
          the price of electricity ($/kWh) changes based on the time of day, day of the week, and
          season.
        </p>
        <p>
          Instead of charging a flat rate all day (e.g., 18 ¢/kWh), utilities charge higher rates
          during high-demand <strong>Peak hours</strong> (e.g., 32 ¢/kWh) and lower rates during
          low-demand <strong>Off-Peak hours</strong> (e.g., 12 ¢/kWh).
        </p>
      </section>

      <section className={styles.section}>
        <h2>How TOU Schedules Work: Peak, Shoulder & Off-Peak Periods</h2>
        <p>
          Time-of-use tariffs require an advanced smart meter to record hourly interval consumption.
          Rates are divided into distinct daily windows:
        </p>
        <ul>
          <li>
            <strong>Peak Hours:</strong> Period of highest grid energy demand (for example, Southern
            California Edison's TOU-D-PRIME plan uses a 4 p.m.–9 p.m. time window, but its price
            classification varies by season and whether the day is a weekday or weekend, while
            Arizona Public Service's current Time-of-Use plan uses a 4 p.m.–7 p.m. weekday window,
            excluding applicable holidays). Exact peak hours, seasonal schedules, and day rules vary
            by utility provider.
          </li>
          <li>
            <strong>Off-Peak Hours:</strong> Period of lowest grid demand (nights, early mornings,
            and weekends). Electricity pricing is lowest.
          </li>
          <li>
            <strong>Shoulder / Mid-Peak Hours:</strong> Intermediate pricing periods between
            off-peak and peak hours (e.g., late morning to early afternoon).
          </li>
          <li>
            <strong>Seasonal Schedules:</strong> Utilities adjust TOU time windows between summer
            (cooling demand) and winter (heating demand) seasons.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Total TOU Energy Cost ($) = Sum of (Period kWh × Period Rate)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Flat Rate vs. Time-of-Use Monthly Cost Comparison</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="TOU rate cost comparison across household load shifting scenarios"
            className={styles.dataTable}
          >
            <caption>
              TOU Bill Comparison: Standard Flat Rate vs. TOU Rate Strategies (800 kWh/mo)
            </caption>
            <thead>
              <tr>
                <th scope="col">Household Consumption Profile</th>
                <th scope="col">Usage Breakdown</th>
                <th scope="col">Standard Flat Bill (18 ¢/kWh)</th>
                <th scope="col">TOU Bill (Peak 32¢ / Off-Peak 12¢)</th>
                <th scope="col">Net Monthly Savings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>High Peak Usage (Unadjusted)</td>
                <td>40% Peak / 60% Off-Peak</td>
                <td>$144.00</td>
                <td>$160.00</td>
                <td>-$16.00 (Higher Cost)</td>
              </tr>
              <tr>
                <td>Balanced Household</td>
                <td>25% Peak / 75% Off-Peak</td>
                <td>$144.00</td>
                <td>$136.00</td>
                <td>+$8.00 Savings</td>
              </tr>
              <tr>
                <td>Shifted Off-Peak (EV + Laundry)</td>
                <td>10% Peak / 90% Off-Peak</td>
                <td>$144.00</td>
                <td>$112.00</td>
                <td>+$32.00 Savings</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: TOU hours, seasonal schedules, and pricing ratios vary by utility company. Figures
          represent an illustrative calculation assumption for an 800 kWh monthly profile.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Load Shifting Limitations</h2>
        <p>
          Enrolling in a TOU rate plan does not automatically reduce your electric bill. If your
          household cannot shift heavy loads (such as air conditioning, EV charging, or clothes
          drying) away from peak afternoon hours, a TOU rate may increase your monthly charges.
        </p>
        <p>
          Analyze your usage under TOU plans with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link> or learn more
          about peak hours in our{' '}
          <Link href="/guides/peak-vs-off-peak-electricity-hours-explained">
            Peak vs. Off-Peak Hours Guide
          </Link>{' '}
          or EV charging costs in our{' '}
          <Link href="/guides/how-much-does-it-cost-to-charge-an-ev-at-home">
            EV Home Charging Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
