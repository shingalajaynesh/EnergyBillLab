import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-ductless-mini-split-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideDuctlessMiniSplitElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Ductless Mini-Split Power & Operating Cost</h2>
        <p>
          A single-zone ductless mini-split heat pump draws between <strong>200W and 1,500W</strong>{' '}
          depending on compressor inverter speed. Because DC inverter compressors modulate power
          output continuously to match room thermal demand, mini-splits consume{' '}
          <strong>25% to 40% less electricity</strong> than standard ducted central air systems.
        </p>
        <p>
          Operating a 12,000 BTU mini-split for 10 hours daily at an average modulated power draw of
          500W consumes approximately <strong>5.0 kWh per day (150 kWh per month)</strong>, costing
          about <strong>$1.00 per day ($30.00 per month)</strong> at 20 ¢/kWh.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Inverter Modulation, SEER2 Ratings & Zoned Comfort</h2>
        <p>
          Ductless mini-splits achieve exceptional seasonal efficiency through advanced mechanical
          design:
        </p>
        <ul>
          <li>
            <strong>Variable-Speed Inverter Compressors:</strong> Rather than cycling abruptly on
            and off at 100% capacity, inverter compressors throttle down to low RPMs (typically
            200W–400W based on manufacturer performance ratings), maintaining precise indoor
            temperatures without energy-intensive restarting spikes.
          </li>
          <li>
            <strong>High SEER2 & HSPF2 Ratings:</strong> Premium mini-splits feature manufacturer
            SEER2 ratings of 18 to 30+ and HSPF2 ratings of 9 to 12+, delivering high heat transfer
            efficiency in both cooling and heating modes.
          </li>
          <li>
            <strong>Avoids Central Duct Losses:</strong> Ductless systems avoid the distribution
            losses associated with central ductwork, saving an estimated 20% to 30% of thermal
            energy compared to uninsulated attic duct distribution systems according to U.S.
            Department of Energy (DOE) benchmarks.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Daily Cost ($) = Modulated Power (kW) × Daily Operating Hours × Rate ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Mini-Split Operating Costs across Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Ductless mini-split operating costs across zone setups and electric rates"
            className={styles.dataTable}
          >
            <caption>
              Mini-Split Operating Costs: System Profile vs. Electric Rates (10 hrs/day)
            </caption>
            <thead>
              <tr>
                <th scope="col">Zone Setup</th>
                <th scope="col">Modulated Power (Watts)</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Single Zone (9,000 BTU / Bedroom)</td>
                <td>350W</td>
                <td>105.0 kWh</td>
                <td>$15.75</td>
                <td>$21.00</td>
                <td>$31.50</td>
              </tr>
              <tr>
                <td>Single Zone (12,000 BTU / Living)</td>
                <td>500W</td>
                <td>150.0 kWh</td>
                <td>$22.50</td>
                <td>$30.00</td>
                <td>$45.00</td>
              </tr>
              <tr>
                <td>Multi-Zone (3 Zones / 36,000 BTU)</td>
                <td>1,400W</td>
                <td>420.0 kWh</td>
                <td>$63.00</td>
                <td>$84.00</td>
                <td>$126.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume 10 hours daily operation at average modulated inverter power
          levels. Figures represent typical manufacturer benchmarks and illustrative calculation
          assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Heating Mode Boundaries</h2>
        <p>
          In heating mode, ductless mini-splits maintain high Coefficient of Performance (COP
          2.5–3.5) down to freezing temperatures. Cold-climate inverter models feature automatic
          defrost cycles to clear outdoor coil frost while preserving room warmth.
        </p>
        <p>
          Calculate heat pump operating expenses with our{' '}
          <Link href="/tools/ac-cost-calculator">Air Conditioner Cost Calculator</Link> or evaluate
          heat pump heating in our{' '}
          <Link href="/guides/how-much-electricity-does-a-heat-pump-use">
            Heat Pump Energy Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
