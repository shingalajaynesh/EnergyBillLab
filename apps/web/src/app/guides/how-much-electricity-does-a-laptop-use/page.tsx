import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-laptop-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideLaptopElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Laptop Power Draw & Monthly Cost</h2>
        <p>
          A laptop computer consumes between <strong>15W and 45W</strong> during typical office
          work, web browsing, and video streaming. Under heavy processing or simultaneous battery
          fast-charging, power draw increases to <strong>50W to 90W</strong>.
        </p>
        <p>
          Using a laptop for 8 hours daily consumes approximately{' '}
          <strong>5 to 10 kWh per month</strong>, costing between{' '}
          <strong>$1.00 and $2.00 per month</strong> ($12.00 to $24.00 per year) at a benchmark rate
          of 20 ¢/kWh.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Charger Rating vs. Actual Wall Power Draw</h2>
        <p>
          A laptop power adapter rating (e.g., 65W or 100W USB-C PD) represents the{' '}
          <em>maximum peak output capacity</em> the charger can supply. Actual wall power draw
          depends on workload state:
        </p>
        <ul>
          <li>
            <strong>Idle / Sleep Mode:</strong> 1W to 5W when display is off or sleeping.
          </li>
          <li>
            <strong>Office Work & Web Browsing:</strong> 15W to 35W with moderate screen brightness.
          </li>
          <li>
            <strong>Heavy Video Editing / 3D Rendering:</strong> 50W to 90W with fans active.
          </li>
          <li>
            <strong>Battery Charging Losses:</strong> Power supplies convert AC wall power to DC
            battery power at 85% to 90% efficiency.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Monthly Laptop Cost ($) = Average Active Watts × Daily Work Hours × 30 ÷ 1,000 × Rate
          ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Laptop Electricity Costs across Workloads & Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Laptop computer operating costs across workload levels and electric rates"
            className={styles.dataTable}
          >
            <caption>
              Laptop Operating Costs: Usage Workloads vs. Electric Rates (8 hrs/day)
            </caption>
            <thead>
              <tr>
                <th scope="col">Laptop Workload Profile</th>
                <th scope="col">Average Power Draw</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Light Use (Web browsing & documents)</td>
                <td>20W</td>
                <td>4.8 kWh</td>
                <td>$0.72</td>
                <td>$0.96</td>
                <td>$1.44</td>
              </tr>
              <tr>
                <td>Standard Office Work & Video Calls</td>
                <td>35W</td>
                <td>8.4 kWh</td>
                <td>$1.26</td>
                <td>$1.68</td>
                <td>$2.52</td>
              </tr>
              <tr>
                <td>Heavy Workstation / Gaming Laptop</td>
                <td>75W</td>
                <td>18.0 kWh</td>
                <td>$2.70</td>
                <td>$3.60</td>
                <td>$5.40</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume 8 hours of active daily use. Figures represent typical
          manufacturer benchmarks and illustrative calculation assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Laptop vs. Desktop Power Comparison Boundaries</h2>
        <p>
          Laptops consume 70% to 85% less electricity than desktop PCs because laptop components
          (CPUs, displays, RAM) are engineered for thermal and battery constraints. However,
          high-end gaming desktops provide far higher raw performance at 300W–600W.
        </p>
        <p>
          Calculate office equipment costs with our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          or evaluate desktop gaming power in our{' '}
          <Link href="/guides/how-much-electricity-does-a-gaming-pc-use">
            Gaming PC Energy Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
