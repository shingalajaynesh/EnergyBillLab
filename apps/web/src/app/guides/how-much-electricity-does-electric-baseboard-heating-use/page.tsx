import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-electric-baseboard-heating-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideElectricBaseboardHeatingPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Electric Baseboard Heating Power & Cost</h2>
        <p>
          Electric baseboard heaters draw approximately <strong>250 Watts per linear foot</strong>{' '}
          of heater length based on standard manufacturer equipment specifications. A standard
          6-foot baseboard heater draws 1,500 Watts (1.5 kW) of electrical power.
        </p>
        <p>
          Heating a 3-bedroom home equipped with 8,000 Watts (8.0 kW) of combined baseboard heaters
          operating 6 hours daily at a 50% thermostat duty cycle consumes{' '}
          <strong>720 kWh to 1,440 kWh per month</strong> ($144 to $288 monthly at 20 ¢/kWh).
        </p>
      </section>

      <section className={styles.section}>
        <h2>Linear Foot Wattage, Line-Voltage Thermostats & Zone Control</h2>
        <p>Baseboard heating features distinct operational characteristics:</p>
        <ul>
          <li>
            <strong>Wattage per Linear Foot:</strong> Standard electric resistance baseboards are
            manufactured at 250W/ft (e.g., 3-foot = 750W, 4-foot = 1,000W, 6-foot = 1,500W, 8-foot =
            2,000W).
          </li>
          <li>
            <strong>Line-Voltage Thermostats:</strong> Individual wall or unit-mounted thermostats
            switch full 120V or 240V household current directly to heating elements.
          </li>
          <li>
            <strong>Room-by-Room Zone Control:</strong> Zoned thermostats permit lowering
            temperatures in unoccupied rooms (e.g., guest bedrooms), reducing unnecessary whole-home
            heating.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Baseboard Cost ($) = (Total Heater Feet × 250W/ft) × Duty Cycle × Hours ÷ 1,000 × Rate
          ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Baseboard Heating Operating Costs across Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Electric baseboard heating operating costs across house sizes and electric rates"
            className={styles.dataTable}
          >
            <caption>
              Baseboard Heating Costs: Combined Wattage vs. Electric Rates (6 hrs/day, 50% Duty)
            </caption>
            <thead>
              <tr>
                <th scope="col">House Setup</th>
                <th scope="col">Combined Wattage</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1-Bed Apartment (16 ft baseboard)</td>
                <td>4,000W (4.0 kW)</td>
                <td>360 kWh</td>
                <td>$54.00</td>
                <td>$72.00</td>
                <td>$108.00</td>
              </tr>
              <tr>
                <td>2-Bed Condo (24 ft baseboard)</td>
                <td>6,000W (6.0 kW)</td>
                <td>540 kWh</td>
                <td>$81.00</td>
                <td>$108.00</td>
                <td>$162.00</td>
              </tr>
              <tr>
                <td>3-Bed Home (32 ft baseboard)</td>
                <td>8,000W (8.0 kW)</td>
                <td>720 kWh</td>
                <td>$108.00</td>
                <td>$144.00</td>
                <td>$216.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume 6 hours daily operating demand at a 50% element duty cycle.
          Figures represent typical manufacturer benchmarks and illustrative calculation
          assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Optimization Boundaries</h2>
        <p>
          While zone control allows lowering thermostat settings in unused rooms, heating occupied
          rooms with resistance coils (COP 1.0) remains significantly more expensive per unit of
          heat delivered than heat pumps (COP 2.5–3.5).
        </p>
        <p>
          Calculate room space heating costs with our{' '}
          <Link href="/tools/space-heater-cost-calculator">Space Heater Cost Calculator</Link> or
          evaluate portable heaters in our{' '}
          <Link href="/guides/how-much-does-it-cost-to-run-a-space-heater">
            Space Heater Energy Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
