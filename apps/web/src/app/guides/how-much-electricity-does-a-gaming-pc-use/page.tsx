import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-gaming-pc-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideGamingPcElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Gaming PC Electricity Draw & Cost</h2>
        <p>
          A mid-to-high-end gaming PC draws <strong>300 to 600 Watts during active gaming</strong>{' '}
          (GPU and CPU load), plus 30 to 60 Watts for a gaming monitor. Gaming for 4 hours daily at
          a 500W system load consumes <strong>2.0 kWh per day</strong> (60 kWh per month).
        </p>
        <p>
          At a 20 ¢/kWh electricity rate, running a gaming rig for 4 hours daily costs approximately{' '}
          <strong>$0.40 per day</strong> ($12.00 per month or $144.00 per year).
        </p>
      </section>

      <section className={styles.section}>
        <h2>System Components & Active vs. Idle Power Load</h2>
        <p>
          Power draw varies dramatically depending on whether your gaming PC is actively rendering
          3D graphics or idling:
        </p>
        <ul>
          <li>
            <strong>Active 3D Gaming Load (300W – 600W):</strong> High graphics card (GPU)
            utilization, multi-core CPU rendering, high-RPM cooling fans, and RGB lighting.
          </li>
          <li>
            <strong>Web Browsing & Desktop Work (60W – 120W):</strong> Low GPU/CPU clock states,
            minimal fan speed, reduced monitor refresh rate draw.
          </li>
          <li>
            <strong>Sleep / Standby Mode (2W – 5W):</strong> Low-power RAM refresh state meeting
            ENERGY STAR standards.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Gaming PC Cost Comparison Across Rates & Gaming Hours</h2>

        <div className={styles.tableWrapper}>
          <table
            aria-label="Gaming PC monthly operating cost across gaming hours and utility rates"
            className={styles.dataTable}
          >
            <caption>Gaming PC Operating Costs: System Load vs. Electricity Rates</caption>
            <thead>
              <tr>
                <th scope="col">System Setup & Usage</th>
                <th scope="col">Total Load (PC + Monitor)</th>
                <th scope="col">Monthly kWh (4 hr/day)</th>
                <th scope="col">At 15 ¢/kWh</th>
                <th scope="col">At 20 ¢/kWh</th>
                <th scope="col">At 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Entry-Level Rig (4 hrs/day)</td>
                <td>300 W</td>
                <td>36.0 kWh</td>
                <td>$5.40 / mo</td>
                <td>$7.20 / mo</td>
                <td>$10.80 / mo</td>
              </tr>
              <tr>
                <td>Mid-Range Rig (4 hrs/day)</td>
                <td>500 W</td>
                <td>60.0 kWh</td>
                <td>$9.00 / mo</td>
                <td>$12.00 / mo</td>
                <td>$18.00 / mo</td>
              </tr>
              <tr>
                <td>High-End RTX 4090 Rig (6 hrs/day)</td>
                <td>750 W</td>
                <td>135.0 kWh</td>
                <td>$20.25 / mo</td>
                <td>$27.00 / mo</td>
                <td>$40.50 / mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Power Supply Efficiency (80 Plus Gold / Platinum)</h2>
        <p>
          Using an 80 Plus Gold or Platinum certified Power Supply Unit (PSU) reduces heat
          conversion waste, improving power draw by 5% to 10% compared to uncertified power
          supplies.
        </p>
        <p>
          Calculate home electronics and appliance costs with our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          or understand power units with our guide on{' '}
          <Link href="/guides/kw-vs-kwh-explained">kW vs. kWh Explained</Link>.
        </p>
      </section>
    </GuideArticleView>
  );
}
