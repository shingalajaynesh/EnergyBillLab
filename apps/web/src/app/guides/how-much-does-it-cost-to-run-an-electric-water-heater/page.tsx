import { calculateWaterHeaterCost } from '@energy-bill-lab/calculation-engine';
import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-does-it-cost-to-run-an-electric-water-heater']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function WaterHeaterGuidePage() {
  // Worked Example: 4,500W element, 1 active element, 3.0 active hours/day, 30 days, 16.5 ¢/kWh
  const workedExample = calculateWaterHeaterCost({
    elementWatts: 4500,
    activeElements: 1,
    hoursPerDay: 3.0,
    days: 30,
    rateCentsPerKwh: 16.5,
  });

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>1. Electric Resistance Water Heater Power & Scope</h2>
        <p>
          Domestic electric water heaters are major energy consumers in U.S. homes, typically
          ranking second only to space heating and cooling systems. Standard residential electric
          resistance tank water heaters utilize internal upper and lower heating elements rated
          between <strong>3,000 Watts (3.0 kW)</strong> and <strong>5,500 Watts (5.5 kW)</strong>.
        </p>
        <div className={styles.callout}>
          <strong>Electric Resistance Scope Note:</strong> This guide and matching calculator cover
          electric resistance storage tank water heaters. Heat-pump (hybrid) water heaters utilize a
          vapor-compression cycle with a Coefficient of Performance (COP) of 2.5 to 3.5, requiring a
          separate thermodynamics model.
        </div>
      </section>

      <section className={styles.section}>
        <h2>2. Staged Heating Elements: Why Default Active Element Count Is 1</h2>
        <p>
          Most dual-element electric tank water heaters contain upper and lower 4,500W elements.
          However, internal thermostats use non-simultaneous interlocking circuitry (flip-flop
          control):
        </p>
        <ul>
          <li>
            When cold water enters, the upper element energizes first to heat the top tank layer.
          </li>
          <li>
            Once the upper setpoint is reached, power flips to the lower element to heat the rest of
            the tank.
          </li>
          <li>
            Both elements almost never draw power simultaneously unless equipped with non-standard
            commercial wiring.
          </li>
        </ul>
        <p>
          Therefore, default calculation models set{' '}
          <strong>Simultaneously Active Elements = 1</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Water Heater Energy Calculation Formula</h2>
        <p>
          To compute daily and monthly electrical operating costs for an electric resistance water
          heater:
        </p>
        <div className={styles.formulaBox}>
          Total Active Watts = Element Rating (Watts) × Simultaneously Active Elements
          <br />
          Daily kWh = (Total Active Watts × Active Heating Hours per Day) ÷ 1,000
          <br />
          Monthly Cost = (Daily kWh × Days × Electricity Rate in ¢/kWh) ÷ 100
        </div>
      </section>

      <section className={styles.section}>
        <h2>4. Worked Calculation: Shared Engine Output</h2>
        <p>
          Consider a standard 50-gallon electric water heater with a{' '}
          <strong>4,500-Watt element</strong>,<strong>1 active element</strong>, operating for{' '}
          <strong>3.0 active heating hours per day</strong>
          at an example rate of <strong>16.5 ¢/kWh</strong> over 30 days:
        </p>
        <ul>
          <li>
            <strong>Total Electrical Power Draw:</strong> 4,500 Watts (4.5 kW)
          </li>
          <li>
            <strong>Daily Energy Consumption:</strong> {workedExample.dailyKwh.toFixed(2)} kWh/day
          </li>
          <li>
            <strong>Daily Operating Cost:</strong> ${workedExample.dailyCostUsd.toFixed(2)}/day
          </li>
          <li>
            <strong>30-Day Energy Consumption:</strong> {workedExample.periodKwh.toFixed(2)} kWh
          </li>
          <li>
            <strong>30-Day Operating Cost:</strong> ${workedExample.periodCostUsd.toFixed(2)}
          </li>
          <li>
            <strong>Extrapolated Annual Cost (365 days):</strong> $
            {workedExample.annualCostUsd.toFixed(2)}/year
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>5. Active Heating Duration vs. Monthly Operating Cost</h2>
        <div className={styles.tableWrapper}>
          <table aria-label="Electric Resistance Water Heater Active Hours vs Monthly Cost">
            <caption>
              Table 1: Estimated Water Heater Costs by Daily Active Runtime (4,500W Element @
              16.5¢/kWh)
            </caption>
            <thead>
              <tr>
                <th scope="col">Household Hot Water Usage Level</th>
                <th scope="col">Active Hours / Day</th>
                <th scope="col">Daily kWh</th>
                <th scope="col">Estimated Monthly Cost (30 Days)</th>
                <th scope="col">Estimated Annual Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Low Usage (1-2 persons, short showers)</td>
                <td>2.0 hrs/day</td>
                <td>9.0 kWh</td>
                <td>$44.55</td>
                <td>$542.03</td>
              </tr>
              <tr>
                <td>Average Household (3-4 persons, typical laundry)</td>
                <td>3.0 hrs/day</td>
                <td>13.5 kWh</td>
                <td>$66.83</td>
                <td>$813.04</td>
              </tr>
              <tr>
                <td>High Usage (Large family, daily baths)</td>
                <td>4.5 hrs/day</td>
                <td>20.25 kWh</td>
                <td>$100.24</td>
                <td>$1,219.56</td>
              </tr>
              <tr>
                <td>Heavy Usage + Cold Winter Inlet Temps</td>
                <td>6.0 hrs/day</td>
                <td>27.0 kWh</td>
                <td>$133.65</td>
                <td>$1,626.08</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>6. Factors Affecting Water Heating Expenses</h2>
        <ul>
          <li>
            <strong>Incoming Water Temperature:</strong> In winter, groundwater temperatures drop by
            15°F to 25°F, requiring significantly more thermal energy to reach the thermostat
            setpoint.
          </li>
          <li>
            <strong>Thermostat Setpoint:</strong> Lowering the thermostat setting from 140°F to
            120°F reduces standby heat losses and lowers annual operating costs by 6% to 10%.
          </li>
          <li>
            <strong>Standby Heat Loss:</strong> Older or poorly insulated tanks lose heat through
            the tank walls 24 hours a day, causing elements to cycle periodically even when no hot
            water is used.
          </li>
          <li>
            <strong>Sediment Buildup:</strong> Mineral scale accumulating at the bottom of the tank
            acts as an insulating barrier, reducing heat transfer efficiency from the lower element.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>7. Limitations & Calculation Assumptions</h2>
        <p>
          Calculations estimate electrical energy input for resistance water heating. Standby heat
          losses are modeled as active runtime hours. Equipment wiring and electrical maintenance
          should only be performed by licensed electrical professionals.
        </p>
        <p>
          To calculate your exact electric water heater operating costs, use our interactive tool:{' '}
          <Link href="/tools/electric-water-heater-cost-calculator">
            Go to Electric Water Heater Cost Calculator →
          </Link>
        </p>
      </section>
    </GuideArticleView>
  );
}
