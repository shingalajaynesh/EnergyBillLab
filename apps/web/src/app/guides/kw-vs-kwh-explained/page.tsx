import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['kw-vs-kwh-explained']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideKwVsKwhPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: What Is the Difference Between kW and kWh?</h2>
        <p>
          The difference between a kilowatt (kW) and a kilowatt-hour (kWh) comes down to{' '}
          <strong>power capacity</strong> versus <strong>energy consumption over time</strong>:
        </p>
        <ul>
          <li>
            <strong>Kilowatt (kW):</strong> A unit of electrical power (demand). It measures how
            fast an appliance or home draws electricity at any instantaneous moment (1 kW = 1,000
            Watts).
          </li>
          <li>
            <strong>Kilowatt-Hour (kWh):</strong> A unit of total electrical energy. It measures the
            total volume of electricity consumed over a given time duration (kWh = kW × Hours).
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Simple Automotive Analogy</h2>
        <p>To easily remember the relationship between kW and kWh, consider a car:</p>
        <div className={styles.formulaBox}>
          kW = Speedometer Speed (Miles per Hour) &nbsp;|&nbsp; kWh = Odometer Distance (Total Miles
          Traveled)
        </div>
        <p>
          Driving at 60 MPH for 2 hours equals 120 miles traveled. Similarly, running a 1.5 kW space
          heater for 4 hours consumes 6.0 kWh of energy (1.5 kW × 4 hours = 6.0 kWh).
        </p>
      </section>

      <section className={styles.section}>
        <h2>Appliance Power (kW) vs. Energy Consumption (kWh) Benchmarks</h2>

        <div className={styles.tableWrapper}>
          <table
            aria-label="Appliance wattage ratings in kW and energy consumption in kWh"
            className={styles.dataTable}
          >
            <caption>Appliance Benchmarks: Instantaneous kW Draw vs. Consumption (kWh)</caption>
            <thead>
              <tr>
                <th scope="col">Household Appliance</th>
                <th scope="col">Power Draw (Watts)</th>
                <th scope="col">Power Capacity (kW)</th>
                <th scope="col">Daily Runtime</th>
                <th scope="col">Daily Energy (kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>LED Light Bulb</td>
                <td>10 W</td>
                <td>0.010 kW</td>
                <td>6 Hours</td>
                <td>0.06 kWh</td>
              </tr>
              <tr>
                <td>Ceiling Fan (Medium)</td>
                <td>40 W</td>
                <td>0.040 kW</td>
                <td>10 Hours</td>
                <td>0.40 kWh</td>
              </tr>
              <tr>
                <td>Gaming Desktop Computer</td>
                <td>500 W</td>
                <td>0.500 kW</td>
                <td>4 Hours</td>
                <td>2.00 kWh</td>
              </tr>
              <tr>
                <td>Portable Electric Space Heater</td>
                <td>1,500 W</td>
                <td>1.500 kW</td>
                <td>6 Hours</td>
                <td>9.00 kWh</td>
              </tr>
              <tr>
                <td>Central Air Conditioner (3-Ton)</td>
                <td>3,500 W</td>
                <td>3.500 kW</td>
                <td>8 Hours (50% Duty)</td>
                <td>14.00 kWh</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>How kWh Converts to Your Monthly Electric Bill</h2>
        <p>
          Electric utilities charge residential customers based on total kilowatt-hours (kWh) logged
          by your meter:
        </p>
        <div className={styles.formulaBox}>
          Total Energy Cost ($) = Total kWh × Electricity Rate ($/kWh)
        </div>
        <p>
          Calculate your household appliance energy draw with our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          or analyze monthly statement rates using our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link>.
        </p>
      </section>
    </GuideArticleView>
  );
}
