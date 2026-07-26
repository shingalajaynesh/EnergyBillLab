import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['heat-pump-vs-electric-resistance-heating-cost']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideHeatPumpVsResistanceHeatingPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Heat Pump vs. Resistance Heating Cost Comparison</h2>
        <p>
          Electric heat pumps achieve a{' '}
          <strong>Coefficient of Performance (COP) of 2.0 to 4.0</strong>, transferring 2 to 4 units
          of heat energy into your home for every 1 unit of electricity consumed. In contrast,
          electric resistance heating (baseboards, space heaters, electric furnaces) has a{' '}
          <strong>COP of 1.0</strong> (1 unit of heat per unit of electricity).
        </p>
        <p>
          In moderate winter climates, an electric heat pump uses{' '}
          <strong>50% to 60% less electricity</strong> than electric resistance heating to provide
          identical household thermal comfort, reducing winter heating bills by hundreds of dollars
          per season.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Thermal Efficiency (COP), Outdoor Temperature & Emergency Heat</h2>
        <p>
          Understanding space heating mechanics is essential when evaluating winter electric bills:
        </p>
        <ul>
          <li>
            <strong>Coefficient of Performance (COP):</strong> Measures thermal heating output
            divided by electrical energy input. Resistance heat is strictly 100% efficient (COP
            1.0), whereas heat pumps achieve 200% to 400% seasonal efficiency (COP 2.0–4.0) by
            extracting heat from ambient outdoor air.
          </li>
          <li>
            <strong>Outdoor Temperature Performance Drop:</strong> As outdoor temperatures fall
            below 25°F (-4°C), air-source heat pump COP decreases, though cold-climate heat pumps
            maintain COP 2.0+ down to 0°F.
          </li>
          <li>
            <strong>Auxiliary / Emergency Heat Strips:</strong> When outdoor temperatures drop below
            the system thermal balance point, heat pumps switch on backup electric resistance heat
            strips (5 kW to 10 kW), causing temporary spikes in winter kWh usage.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Heating kWh = Required Thermal Energy (kWh) ÷ System Seasonal COP
        </div>
      </section>

      <section className={styles.section}>
        <h2>Heating System Cost Comparisons across Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Heat pump vs electric resistance heating operating costs across utility rates"
            className={styles.dataTable}
          >
            <caption>
              Winter Heating Costs: Heat Pump (COP 3.0) vs. Electric Resistance (COP 1.0)
            </caption>
            <thead>
              <tr>
                <th scope="col">Heating Technology</th>
                <th scope="col">Seasonal Thermal Output</th>
                <th scope="col">Seasonal kWh Consumed</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Electric Resistance Baseboard / Furnace (COP 1.0)</td>
                <td>6,000 kWh thermal</td>
                <td>6,000 kWh</td>
                <td>$900</td>
                <td>$1,200</td>
                <td>$1,800</td>
              </tr>
              <tr>
                <td>Standard Air-Source Heat Pump (COP 2.5)</td>
                <td>6,000 kWh thermal</td>
                <td>2,400 kWh</td>
                <td>$360</td>
                <td>$480</td>
                <td>$720</td>
              </tr>
              <tr>
                <td>High-Efficiency Inverter Heat Pump (COP 3.5)</td>
                <td>6,000 kWh thermal</td>
                <td>1,714 kWh</td>
                <td>$257</td>
                <td>$343</td>
                <td>$514</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume a moderate winter heating load delivering 6,000 kWh of thermal
          energy. Figures represent typical manufacturer benchmarks and illustrative calculation
          assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Climate Dependence & Savings Claim Boundaries</h2>
        <p>
          Claiming one universal national savings percentage is misleading because heat pump
          economic savings depend on local climate zone, house insulation, heat pump COP, and
          regional electricity rates.
        </p>
        <p>
          Calculate portable space heater expenses with our{' '}
          <Link href="/tools/space-heater-cost-calculator">Space Heater Cost Calculator</Link> or
          learn about resistance heater costs in our{' '}
          <Link href="/guides/how-much-does-it-cost-to-run-a-space-heater">
            Space Heater Energy Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
