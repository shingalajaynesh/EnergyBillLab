import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-can-a-smart-thermostat-save']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideSmartThermostatSavingsPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: How Much Can a Smart Thermostat Save?</h2>
        <p>
          According to independent field research by <strong>ENERGY STAR</strong> and the{' '}
          <strong>U.S. Department of Energy (DOE)</strong>, certified smart thermostats save
          households an average of <strong>8% to 12% on heating bills</strong> and{' '}
          <strong>15% on cooling bills</strong>.
        </p>
        <p>
          For a typical U.S. household spending $1,200 annually on heating and cooling, a smart
          thermostat delivers <strong>$100 to $180 in annual electric bill savings</strong>, paying
          back its initial purchase price ($120–$250) in 1 to 2 years.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Setback Physics, Geofencing & Occupancy Detection</h2>
        <p>
          Energy savings result from automated control features that reduce HVAC runtime without
          sacrificing thermal comfort:
        </p>
        <ul>
          <li>
            <strong>DOE 1% Setback Rule:</strong> According to U.S. DOE guidelines, turning a
            thermostat back 7°F to 10°F for 8 hours daily saves approximately 1% on heating/cooling
            bills per degree of setback.
          </li>
          <li>
            <strong>Geofencing & Occupancy Sensors:</strong> Smart thermostats detect when occupants
            leave the home via smartphone GPS or motion sensors, automatically switching to
            energy-saving Eco setback temperatures.
          </li>
          <li>
            <strong>Adaptive Heating & Cooling Recovery:</strong> Smart algorithms learn how quickly
            a home heats and cools, delaying HVAC start times until necessary to achieve desired
            target temperatures.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Annual Thermostat Savings ($) = Annual HVAC Energy Bill ($) × Savings Percentage (%)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Smart Thermostat Savings across Climate Regions & Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Smart thermostat annual savings across HVAC bill levels and utility rates"
            className={styles.dataTable}
          >
            <caption>Smart Thermostat Savings: Annual HVAC Expense vs. Utility Rates</caption>
            <thead>
              <tr>
                <th scope="col">Annual HVAC Spend</th>
                <th scope="col">Annual kWh Saved (12% Avg)</th>
                <th scope="col">Savings at 15 ¢/kWh</th>
                <th scope="col">Savings at 20 ¢/kWh</th>
                <th scope="col">Savings at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Moderate Climate ($800/yr HVAC)</td>
                <td>480 kWh</td>
                <td>$72.00</td>
                <td>$96.00</td>
                <td>$144.00</td>
              </tr>
              <tr>
                <td>Typical Home ($1,200/yr HVAC)</td>
                <td>720 kWh</td>
                <td>$108.00</td>
                <td>$144.00</td>
                <td>$216.00</td>
              </tr>
              <tr>
                <td>Extreme Climate ($1,800/yr HVAC)</td>
                <td>1,080 kWh</td>
                <td>$162.00</td>
                <td>$216.00</td>
                <td>$324.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Savings percentages based on ENERGY STAR certified smart thermostat benchmark
          studies (8%–12% heating, 15% cooling). Figures represent illustrative calculation
          assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Compatibility Limitations</h2>
        <p>
          Actual financial savings depend on household behavior, climate severity, building
          insulation, and HVAC equipment type (e.g., heat pumps, central AC, baseboards). Smart
          thermostats require a 24V C-wire or power adapter module for continuous Wi-Fi operation.
        </p>
        <p>
          Diagnose your HVAC statement with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link> or evaluate AC
          setbacks in our{' '}
          <Link href="/guides/should-you-turn-off-the-air-conditioner-when-away">
            Turning Off AC When Away Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
