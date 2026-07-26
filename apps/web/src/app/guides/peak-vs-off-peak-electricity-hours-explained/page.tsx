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
          varying significantly by utility tariff and region. For example:
        </p>
        <ul>
          <li>
            <strong>California Summer Cooling Peak (SCE TOU-D-PRIME Tariff):</strong> Southern
            California Edison defines summer peak hours as 4:00 PM to 9:00 PM on weekdays, when air
            conditioning load coincides with declining solar generation.
          </li>
          <li>
            <strong>Southwest Summer Peak (Arizona APS Saver Choice Tariff):</strong> Arizona Public
            Service defines summer peak hours as 3:00 PM to 8:00 PM weekdays (May through October).
          </li>
          <li>
            <strong>Upper Midwest Winter Heating Peak (Xcel Energy Minnesota Tariff):</strong> Xcel
            Energy defines winter peak hours as 9:00 AM to 9:00 PM weekdays (October through May).
          </li>
          <li>
            <strong>Critical Peak Pricing Events:</strong> During severe heatwaves or winter storms,
            some utilities declare critical peak pricing events with temporary rate surcharges
            (e.g., $1.00+/kWh).
          </li>
          <li>
            <strong>Shifting Flexible Load:</strong> Appliances with delay timers (dishwashers, EV
            chargers, pool pumps, washing machines) can be automated to operate during off-peak
            overnight hours.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Off-Peak Savings ($) = Flexible kWh Shifted × (Peak Rate − Off-Peak Rate)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Sample Named Utility TOU Tariff Schedules</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Sample named utility peak vs off-peak time windows and pricing schedules"
            className={styles.dataTable}
          >
            <caption>Sample Named Utility Tariff Schedules (Illustrative Utility Examples)</caption>
            <thead>
              <tr>
                <th scope="col">Utility & Tariff Name</th>
                <th scope="col">Applicable Season</th>
                <th scope="col">Peak Hours Window</th>
                <th scope="col">Off-Peak Window</th>
                <th scope="col">Sample Rate Tier</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SCE TOU-D-PRIME (California)</td>
                <td>Summer (Jun–Sep)</td>
                <td>4:00 PM – 9:00 PM Weekdays</td>
                <td>9:00 PM – 4:00 PM & Weekends</td>
                <td>Peak ~34 ¢/kWh / Off-Peak ~14 ¢/kWh</td>
              </tr>
              <tr>
                <td>APS Saver Choice (Arizona)</td>
                <td>Summer (May–Oct)</td>
                <td>3:00 PM – 8:00 PM Weekdays</td>
                <td>8:00 PM – 3:00 PM & Weekends</td>
                <td>Peak ~31 ¢/kWh / Off-Peak ~11 ¢/kWh</td>
              </tr>
              <tr>
                <td>Xcel Energy Time-of-Day (Minnesota)</td>
                <td>Winter (Oct–May)</td>
                <td>9:00 AM – 9:00 PM Weekdays</td>
                <td>9:00 PM – 9:00 AM & Weekends</td>
                <td>Peak ~24 ¢/kWh / Off-Peak ~10 ¢/kWh</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Peak schedules, hours, rate structures, and weekend rules are established by
          individual electric utilities and state public utility commissions. Figures represent
          named utility tariff examples and illustrative calculation assumptions.
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
