import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-window-air-conditioner-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideWindowAirConditionerElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Window AC Power & Monthly Cooling Cost</h2>
        <p>
          A window air conditioner consumes between <strong>450W and 1,200W</strong> of electrical
          power depending on cooling capacity (5,000 BTU to 12,000 BTU) and CEER energy efficiency
          rating.
        </p>
        <p>
          Running an 8,000 BTU window AC for 8 hours daily at a 60% compressor duty cycle consumes
          approximately <strong>3.5 kWh per day (105 kWh per month)</strong>, costing between{' '}
          <strong>$16.00 and $32.00 per month</strong> at 15 ¢ to 30 ¢/kWh electric rates.
        </p>
      </section>

      <section className={styles.section}>
        <h2>BTU Capacity, CEER Rating & Compressor Duty Cycle</h2>
        <p>Window AC electrical consumption is governed by four key variables:</p>
        <ul>
          <li>
            <strong>BTU Cooling Capacity:</strong> 5,000 BTU (150 sq ft) draws ~450W; 8,000 BTU (350
            sq ft) draws ~700W; 12,000 BTU (550 sq ft) draws ~1,100W.
          </li>
          <li>
            <strong>CEER Efficiency Rating:</strong> Combined Energy Efficiency Ratio (CEER)
            measures BTU cooling output per Watt-hour input. ENERGY STAR certified units (CEER
            12.0+) use 10% to 15% less energy than standard models.
          </li>
          <li>
            <strong>Compressor Duty Cycle:</strong> Once a room reaches setpoint temperature, the
            compressor cycles off, leaving only the fan running (30W–50W). Average summer duty
            cycles range from 50% to 70%.
          </li>
          <li>
            <strong>Thermostat Settings:</strong> U.S. DOE testing indicates raising the thermostat
            setting by 4°F (e.g., from 72°F to 76°F) reduces cooling energy consumption by 10% to
            15%.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Monthly AC Cost ($) = Rated Watts × Duty Cycle × Daily Cooling Hours × 30 ÷ 1,000 × Rate
          ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Window AC Monthly Costs across Sizes & Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Window air conditioner operating costs across BTU sizes and utility rates"
            className={styles.dataTable}
          >
            <caption>
              Window AC Monthly Costs: Unit Size vs. Electric Rates (8 hrs/day, 60% duty cycle)
            </caption>
            <thead>
              <tr>
                <th scope="col">Unit Size (BTU/hr)</th>
                <th scope="col">Rated Input Watts</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Small 5,000 BTU (Bedroom)</td>
                <td>450W</td>
                <td>64.8 kWh</td>
                <td>$9.72</td>
                <td>$12.96</td>
                <td>$19.44</td>
              </tr>
              <tr>
                <td>Medium 8,000 BTU (Living Room)</td>
                <td>720W</td>
                <td>103.7 kWh</td>
                <td>$15.55</td>
                <td>$20.74</td>
                <td>$31.11</td>
              </tr>
              <tr>
                <td>Large 12,000 BTU (Open Concept)</td>
                <td>1,100W</td>
                <td>158.4 kWh</td>
                <td>$23.76</td>
                <td>$31.68</td>
                <td>$47.52</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume 8 hours daily operating time at a 60% compressor duty cycle.
          Figures represent typical manufacturer benchmarks and illustrative assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Sizing Recommendations</h2>
        <p>
          Undersized window AC units run continuously without reaching target temperature, while
          oversized units cool quickly without dehumidifying properly.
        </p>
        <p>
          Calculate your exact room cooling expenses with our dedicated{' '}
          <Link href="/tools/ac-cost-calculator">AC Cost Calculator</Link> or evaluate central air
          power in our{' '}
          <Link href="/guides/how-much-does-it-cost-to-run-an-air-conditioner">
            Air Conditioner Cost Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
