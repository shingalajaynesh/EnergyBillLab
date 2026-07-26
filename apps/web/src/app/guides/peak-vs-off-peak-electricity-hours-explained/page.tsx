import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['peak-vs-off-peak-electricity-hours-explained']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuidePeakVsOffPeakPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Peak vs. Off-Peak Electricity Hours</h2>
        <p>
          <strong>Peak hours</strong> are scheduled daily time windows when customer electricity
          demand on the regional power grid is at its highest. Utilities charge higher rates per kWh
          during peak windows to cover expensive peaking generator operation.
        </p>
        <p>
          <strong>Off-peak hours</strong> occur during low-demand periods (late nights, early
          mornings, and weekends) when cleaner, lower-cost baseline power plants supply grid energy
          at reduced pricing.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Grid Peak Demand Physics & Regional Seasonality</h2>
        <p>
          Peak hours are determined by climate, solar generation curves, and daily human activity,
          varying significantly by utility tariff and region. Utility-specific examples checked
          against published rate information include:
        </p>
        <ul>
          <li>
            <strong>Southern California Edison (SCE TOU-D-PRIME):</strong> TOU-D-PRIME uses a 4:00
            PM – 9:00 PM time window, but its price classification (on-peak vs. mid-peak vs.
            off-peak) varies by season (summer vs. winter) and whether the day is a weekday or
            weekend. Customers must review SCE's current tariff before making usage decisions.
          </li>
          <li>
            <strong>Arizona Public Service (APS Time-of-Use 4pm-7pm Weekdays):</strong> Current
            active residential TOU plan defines on-peak hours from 4:00 PM to 7:00 PM on weekdays,
            excluding applicable holidays. (Note: The historical APS Saver Choice Plus 3:00 PM–8:00
            PM plan is closed to new enrollment).
          </li>
          <li>
            <strong>Xcel Energy Minnesota (Residential Time of Day):</strong> The current Minnesota
            Residential Time of Day schedule identifies weekdays from 9:00 AM to 9:00 PM as on-peak
            hours (excluding applicable holidays). Customers should verify the current Minnesota
            tariff because schedules and eligibility can change.
          </li>
          <li>
            <strong>Critical Peak Pricing Events:</strong> During severe heatwaves or winter
            freezing events, utilities may declare short critical peak pricing events with temporary
            rate surcharges (e.g., $1.00+/kWh).
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Off-Peak Savings ($) = Flexible kWh Shifted × (Peak Rate − Off-Peak Rate)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Audited Utility TOU Tariff Examples</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Audited utility peak vs off-peak time windows and rate schedules"
            className={styles.dataTable}
          >
            <caption>Audited Residential Utility Tariff Schedules</caption>
            <thead>
              <tr>
                <th scope="col">Utility Name & Tariff Schedule</th>
                <th scope="col">Status</th>
                <th scope="col">Peak Hours Window</th>
                <th scope="col">Off-Peak Window</th>
                <th scope="col">Official Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Southern California Edison (SCE) — TOU-D-PRIME</td>
                <td>Current Active Plan</td>
                <td>4:00 PM – 9:00 PM (Summer Weekday On-Peak / Seasonal Mid-Peak)</td>
                <td>Off-Peak & Super Off-Peak Hours (Varies by Season & Day)</td>
                <td>sce.com/tou</td>
              </tr>
              <tr>
                <td>Arizona Public Service (APS) — TOU 4pm–7pm Weekdays</td>
                <td>Current Active Plan</td>
                <td>4:00 PM – 7:00 PM Weekdays</td>
                <td>7:00 PM – 4:00 PM Weekdays + All Weekend / Holidays</td>
                <td>aps.com/tou</td>
              </tr>
              <tr>
                <td>Xcel Energy Minnesota — Residential Time of Day</td>
                <td>Current Active Plan</td>
                <td>9:00 AM – 9:00 PM Weekdays</td>
                <td>9:00 PM – 9:00 AM Weekdays + All Weekend / Holidays</td>
                <td>xcelenergy.com/mn</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Utility-specific examples were checked against cited official rate pages. Policies
          and tariffs can change, and customers must confirm their current utility tariff directly
          with their electric provider.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Tariff Checking</h2>
        <p>
          Always check your specific electric utility rate schedule tariff document to verify exact
          peak hours, holiday exemptions, and weekend rules before altering household appliance
          routines.
        </p>
        <p>
          Analyze peak bill impacts with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link> or evaluate TOU
          pricing in our{' '}
          <Link href="/guides/what-is-a-time-of-use-electricity-rate">
            Time-of-Use Electricity Rate Guide
          </Link>{' '}
          or central cooling costs in our{' '}
          <Link href="/guides/how-much-electricity-does-central-air-conditioning-use">
            Central AC Energy Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
