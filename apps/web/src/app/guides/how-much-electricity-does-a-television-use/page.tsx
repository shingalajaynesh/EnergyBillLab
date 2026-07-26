import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-television-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideTelevisionElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: TV Power Consumption & Operating Cost</h2>
        <p>
          Modern LED and LCD televisions draw between <strong>30W and 120W</strong> depending on
          screen size (32" to 65"), while large 65"+ OLED televisions draw{' '}
          <strong>100W to 220W</strong> under High Dynamic Range (HDR) content. At 4 hours of daily
          viewing and a 20 ¢/kWh electric rate, operating a TV costs between{' '}
          <strong>$0.70 and $5.00 per month</strong> ($8.50 to $60.00 per year).
        </p>
        <p>
          Connected smart TVs draw 0.5W to 2.0W in standby mode to maintain Wi-Fi connectivity for
          instant wake and background software updates.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Display Technology, Screen Size & Brightness Impact</h2>
        <p>
          Television energy consumption is primarily determined by backlight panel technology and
          peak luminance:
        </p>
        <ul>
          <li>
            <strong>LED/LCD Displays:</strong> Edge-lit and direct-lit LED backlights are highly
            energy-efficient, consuming ~0.015W to 0.025W per square inch of screen area in Standard
            Dynamic Range (SDR).
          </li>
          <li>
            <strong>OLED Displays:</strong> Organic LED displays illuminate each pixel individually.
            While deep blacks consume minimal power, bright white HDR scenes increase power draw up
            to 220W on 65"+ displays.
          </li>
          <li>
            <strong>Streaming Accessories:</strong> Plug-in streaming sticks (Roku, Fire TV, Apple
            TV) add 2W to 6W, while connected gaming consoles add 70W to 200W during active
            gameplay.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Monthly TV Cost ($) = (Display Watts + Streaming Watts) × Daily Viewing Hours × 30 ÷ 1,000
          × Rate ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>TV Electricity Costs across Sizes & Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Television operating costs across screen sizes, display types, and electric rates"
            className={styles.dataTable}
          >
            <caption>
              Television Operating Costs: Screen Size vs. Electric Rates (4 hrs/day)
            </caption>
            <thead>
              <tr>
                <th scope="col">TV Type & Size</th>
                <th scope="col">Average Power Draw</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Compact 32" LED TV</td>
                <td>35W</td>
                <td>4.2 kWh</td>
                <td>$0.63</td>
                <td>$0.84</td>
                <td>$1.26</td>
              </tr>
              <tr>
                <td>Medium 55" 4K LED TV</td>
                <td>75W</td>
                <td>9.0 kWh</td>
                <td>$1.35</td>
                <td>$1.80</td>
                <td>$2.70</td>
              </tr>
              <tr>
                <td>Large 65" OLED 4K TV (HDR)</td>
                <td>140W</td>
                <td>16.8 kWh</td>
                <td>$2.52</td>
                <td>$3.36</td>
                <td>$5.04</td>
              </tr>
              <tr>
                <td>Ultra 75" Mini-LED TV</td>
                <td>180W</td>
                <td>21.6 kWh</td>
                <td>$3.24</td>
                <td>$4.32</td>
                <td>$6.48</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume 4 hours of active viewing daily plus 20 hours of standby at
          1W. Figures represent typical manufacturer benchmarks and illustrative assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Energy Saving Settings & Recommendations</h2>
        <p>
          Enabling automatic brightness adjustment (ambient light sensors) reduces power draw by 20%
          to 40% during evening viewing. Setting sleep timers prevents TVs from running overnight.
        </p>
        <p>
          Estimate home electronic costs with our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          or learn about standby power in our{' '}
          <Link href="/guides/what-is-vampire-power-and-how-much-does-it-cost">
            Vampire Power Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
