import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-heat-pump-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideHeatPumpElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Heat Pump Electricity Usage in Heating & Cooling</h2>
        <p>
          A residential air-source heat pump draws between <strong>1,500W and 4,500W</strong> of
          electrical power depending on mode, outdoor temperature, and compressor capacity.
        </p>
        <p>
          In cooling mode, heat pumps function identically to high-efficiency central air
          conditioners. In heating mode, heat pumps achieve a{' '}
          <strong>Coefficient of Performance (COP) of 2.0 to 4.0</strong>, delivering 2 to 4 kWh of
          heat energy for every 1 kWh of electricity consumed.
        </p>
        <p>
          Heating a typical home for 8 hours daily during winter consumes{' '}
          <strong>16 to 36 kWh per day (480 to 1,080 kWh per month)</strong>, costing between{' '}
          <strong>$96 and $216 monthly</strong> at 20 ¢/kWh.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Cooling Mode, Heating Mode & Auxiliary Heat Strip Spikes</h2>
        <p>Heat pump energy consumption varies dynamically across seasonal operating modes:</p>
        <ul>
          <li>
            <strong>Cooling Mode (SEER2 15–22+):</strong> Reverses refrigerant flow to extract heat
            from indoor air and dump it outdoors.
          </li>
          <li>
            <strong>Heating Mode (HSPF2 8.5–12+):</strong> Extracts heat energy from cold outdoor
            air and compresses it to heat indoor spaces at 200% to 400% efficiency.
          </li>
          <li>
            <strong>Auxiliary / Emergency Resistance Heat:</strong> When outdoor temperatures drop
            below the system thermal balance point (e.g., below 20°F), auxiliary electric resistance
            heat strips (5 kW to 10 kW) engage to supplement heating, causing temporary spikes in
            winter kWh usage.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Heating kWh = Required Thermal Energy (kWh) ÷ System COP
        </div>
      </section>

      <section className={styles.section}>
        <h2>Heat Pump Operating Costs across Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Heat pump operating costs across seasons and electric rates"
            className={styles.dataTable}
          >
            <caption>Heat Pump Monthly Operating Costs: Mode vs. Electric Rates</caption>
            <thead>
              <tr>
                <th scope="col">Operating Mode & Climate</th>
                <th scope="col">Daily Runtime</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Summer Cooling (Mild Climate)</td>
                <td>6 hrs/day</td>
                <td>450 kWh</td>
                <td>$67.50</td>
                <td>$90.00</td>
                <td>$135.00</td>
              </tr>
              <tr>
                <td>Winter Heating (Moderate COP 3.0)</td>
                <td>8 hrs/day</td>
                <td>640 kWh</td>
                <td>$96.00</td>
                <td>$128.00</td>
                <td>$192.00</td>
              </tr>
              <tr>
                <td>Extreme Cold (Aux Strip Activation)</td>
                <td>10 hrs/day</td>
                <td>1,250 kWh</td>
                <td>$187.50</td>
                <td>$250.00</td>
                <td>$375.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume a 3-ton heat pump system. Figures represent typical
          manufacturer benchmarks and illustrative calculation assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Technology Comparisons</h2>
        <p>
          Compare heat pump COP against electric resistance heaters in our{' '}
          <Link href="/guides/heat-pump-vs-electric-resistance-heating-cost">
            Heat Pump vs. Resistance Heating Guide
          </Link>{' '}
          or calculate portable space heating in our{' '}
          <Link href="/tools/space-heater-cost-calculator">Space Heater Cost Calculator</Link>.
        </p>
      </section>
    </GuideArticleView>
  );
}
