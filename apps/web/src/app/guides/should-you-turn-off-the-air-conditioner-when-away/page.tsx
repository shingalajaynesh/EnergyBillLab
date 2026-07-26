import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['should-you-turn-off-the-air-conditioner-when-away']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideTurnOffAcWhenAwayPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Should You Turn Off the AC When Away?</h2>
        <p>
          For all-day absences (8+ hours),{' '}
          <strong>raising your thermostat setting by 7°F to 10°F</strong> consumes significantly
          less total electricity than leaving the AC running at 72°F all day.
        </p>
        <p>
          According to thermodynamic heat gain principles confirmed by the{' '}
          <strong>U.S. Department of Energy (DOE)</strong>, heat enters a building slower when
          indoor temperature is closer to outdoor temperature. However, completely shutting off the
          AC in hot, humid climates can cause indoor humidity spikes, mold risk, or heat distress.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Factors Influencing Safe Thermostat Setbacks</h2>
        <p>
          Thermostat setback recommendations are not universally identical for every household. An
          optimal setback temperature depends on several critical building and occupant conditions:
        </p>
        <ul>
          <li>
            <strong>Outdoor Climate & Humidity:</strong> In humid climates, AC systems perform
            necessary dehumidification. Setbacks should allow periodic compressor operation to keep
            indoor relative humidity below 60%.
          </li>
          <li>
            <strong>Pets & Occupants:</strong> Households with domestic pets, elderly occupants, or
            infants require moderate setback limits to prevent heat discomfort or distress.
          </li>
          <li>
            <strong>Medical & Health Needs:</strong> Individuals with heat sensitivity or
            respiratory conditions need stable indoor temperature and air filtration.
          </li>
          <li>
            <strong>Building Construction & Insulation:</strong> Well-insulated homes retain cool
            air longer, whereas uninsulated structures gain heat rapidly during peak afternoon
            hours.
          </li>
          <li>
            <strong>HVAC Equipment Capacity:</strong> Undersized or single-stage cooling units
            require extended runtime to recover temperatures after deep setbacks.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Heat Gain Physics & Short vs All-Day Absences</h2>
        <p>Determining your thermostat schedule depends on absence duration and cooling demand:</p>
        <ul>
          <li>
            <strong>Short Absences (1–2 Hours):</strong> Keep thermostat at standard setpoint or
            raise by 2°F. The energy spent recovering indoor temperature outweighs the minor savings
            from a short 2-hour shutdown.
          </li>
          <li>
            <strong>All-Day Workdays (8–10 Hours):</strong> Setting an automated thermostat setback
            of 7°F to 10°F during work hours reduces daily cooling energy consumption by an
            estimated 5% to 15%.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Heat Flow Rate ($Q$) = Thermal Conductance ($U$) × Area ($A$) × $\Delta T$ (Indoor-Outdoor
          Temp Difference)
        </div>
      </section>

      <section className={styles.section}>
        <h2>AC Setback Savings Comparison across Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="AC setback operating costs across thermostat schedules and utility rates"
            className={styles.dataTable}
          >
            <caption>Thermostat Strategy: Continuous 72°F vs. 8-Hour Setback (78°F)</caption>
            <thead>
              <tr>
                <th scope="col">Thermostat Strategy</th>
                <th scope="col">Daily Runtime</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Constant 72°F All Day</td>
                <td>9.0 hrs/day</td>
                <td>630 kWh</td>
                <td>$94.50</td>
                <td>$126.00</td>
                <td>$189.00</td>
              </tr>
              <tr>
                <td>8-Hour Workday Setback (78°F)</td>
                <td>7.2 hrs/day</td>
                <td>504 kWh</td>
                <td>$75.60</td>
                <td>$100.80</td>
                <td>$151.20</td>
              </tr>
              <tr>
                <td>Smart Thermostat Auto-Setback</td>
                <td>6.5 hrs/day</td>
                <td>455 kWh</td>
                <td>$68.25</td>
                <td>$91.00</td>
                <td>$136.50</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume a 3.5-ton central AC system. Figures represent typical
          manufacturer benchmarks and illustrative calculation assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Pet/Plant Safety Limits</h2>
        <p>
          Never leave indoor temperatures above 82°F if pets, sensitive house plants, or delicate
          electronics remain indoors. Utilize smart thermostat geofencing to begin temperature
          recovery 30 minutes before returning home.
        </p>
        <p>
          Calculate central cooling operating costs with our{' '}
          <Link href="/tools/ac-cost-calculator">Air Conditioner Cost Calculator</Link> or evaluate
          smart thermostats in our{' '}
          <Link href="/guides/how-much-can-a-smart-thermostat-save">
            Smart Thermostat Savings Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
