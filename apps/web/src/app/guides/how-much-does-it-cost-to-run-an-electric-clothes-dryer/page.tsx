import { calculateDryerCost } from '@energy-bill-lab/calculation-engine';
import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

import {
  DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
  DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE,
} from '@/lib/constants/electricity';

const guide = energyGuides['how-much-does-it-cost-to-run-an-electric-clothes-dryer']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function ClothesDryerGuidePage() {
  // Worked Example: 4,000W electric dryer, 45 minutes/load, 5 loads/week, 4 weeks at canonical benchmark
  const workedExample = calculateDryerCost({
    wattage: 4000,
    minutesPerLoad: 45,
    loadsPerWeek: 5,
    weeks: 4,
    rateCentsPerKwh: DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
    dutyCyclePercent: 100,
  });

  const rateDollars = DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH / 100;
  const loadKwh = 3.0; // 4,000W * 0.75 hrs

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>1. Electric Clothes Dryer Power Draw & Scope</h2>
        <p>
          Electric clothes dryers are among the highest electrical power consumers in North American
          residences. Operating on a dedicated 240-volt electrical circuit, standard electric dryers
          draw between <strong>1,800 Watts (1.8 kW)</strong> and{' '}
          <strong>5,000 Watts (5.0 kW)</strong>
          to power heating elements and motor blowers.
        </p>
        <div className={styles.callout}>
          <strong>Electric-Only Scope Note:</strong> This guide and matching calculator evaluate
          electric resistance clothes dryers powered strictly by electricity. Natural gas clothes
          dryers use electricity only for motor rotation while burning natural gas or propane for
          heat, requiring a separate therm/CCF gas fuel tariff model.
        </div>
      </section>

      <section className={styles.section}>
        <h2>2. Standard Dryer Energy Calculation Formula</h2>
        <p>
          To calculate energy consumption and electricity cost per load of laundry, apply the
          following sequence of equations:
        </p>
        <div className={styles.formulaBox}>
          Hours per Load = Minutes per Load ÷ 60
          <br />
          kWh per Load = (Dryer Watts × Hours per Load × Duty Cycle %) ÷ 1,000
          <br />
          Cost per Load = (kWh per Load × Electricity Rate in ¢/kWh) ÷ 100
          <br />
          Weekly Cost = Cost per Load × Loads per Week
        </div>
      </section>

      <section className={styles.section}>
        <h2>3. Worked Example: Shared Engine Calculation</h2>
        <p>
          Consider a typical family laundry schedule using a{' '}
          <strong>4,000-Watt electric dryer</strong>
          running for <strong>45 minutes per load</strong>, completing{' '}
          <strong>5 loads per week</strong> at the national benchmark rate of{' '}
          <strong>{DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH} ¢/kWh</strong> (
          {DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE}).
        </p>
        <ul>
          <li>
            <strong>Duration per Load:</strong> 0.75 hours (45 minutes)
          </li>
          <li>
            <strong>Energy per Load:</strong> {workedExample.kwhPerLoad.toFixed(2)} kWh
          </li>
          <li>
            <strong>Cost per Load:</strong> ${workedExample.costPerLoadUsd.toFixed(2)}
          </li>
          <li>
            <strong>Weekly Energy (5 loads):</strong> {(workedExample.kwhPerLoad * 5).toFixed(2)}{' '}
            kWh
          </li>
          <li>
            <strong>Weekly Cost (5 loads):</strong> ${(workedExample.costPerLoadUsd * 5).toFixed(2)}
          </li>
          <li>
            <strong>Estimated Monthly Cost (4 weeks):</strong> $
            {workedExample.periodCostUsd.toFixed(2)}
          </li>
          <li>
            <strong>Extrapolated Annual Cost (52 weeks):</strong> $
            {workedExample.annualCostUsd.toFixed(2)}
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>4. Weekly Laundry Volume vs. Monthly Electricity Cost</h2>
        <div className={styles.tableWrapper}>
          <table aria-label="Electric Clothes Dryer Laundry Volume vs Monthly Cost">
            <caption>
              Table 1: Estimated Electric Dryer Costs by Weekly Load Volume (4,000W Dryer @{' '}
              {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh)
            </caption>
            <thead>
              <tr>
                <th scope="col">Weekly Laundry Volume</th>
                <th scope="col">Monthly Loads (4 Weeks)</th>
                <th scope="col">Monthly Energy (kWh)</th>
                <th scope="col">Estimated Monthly Cost</th>
                <th scope="col">Estimated Annual Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2 loads / week (Single / Couple)</td>
                <td>8 loads</td>
                <td>{(8 * loadKwh).toFixed(1)} kWh</td>
                <td>${(8 * loadKwh * rateDollars).toFixed(2)}</td>
                <td>${(8 * loadKwh * rateDollars * 13).toFixed(2)}</td>
              </tr>
              <tr>
                <td>5 loads / week (Medium Household)</td>
                <td>20 loads</td>
                <td>{(20 * loadKwh).toFixed(1)} kWh</td>
                <td>${(20 * loadKwh * rateDollars).toFixed(2)}</td>
                <td>${(20 * loadKwh * rateDollars * 13).toFixed(2)}</td>
              </tr>
              <tr>
                <td>8 loads / week (Large Family)</td>
                <td>32 loads</td>
                <td>{(32 * loadKwh).toFixed(1)} kWh</td>
                <td>${(32 * loadKwh * rateDollars).toFixed(2)}</td>
                <td>${(32 * loadKwh * rateDollars * 13).toFixed(2)}</td>
              </tr>
              <tr>
                <td>12 loads / week (Heavy Laundry)</td>
                <td>48 loads</td>
                <td>{(48 * loadKwh).toFixed(1)} kWh</td>
                <td>${(48 * loadKwh * rateDollars).toFixed(2)}</td>
                <td>${(48 * loadKwh * rateDollars * 13).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Technology Efficiency Comparison: Standard vs. Heat Pump Dryers</h3>
        <p>
          According to EPA ENERGY STAR criteria, upgrading from a standard electric resistance dryer
          to modern drying technologies delivers substantial energy savings:
        </p>
        <ul>
          <li>
            <strong>Standard Vented Dryer:</strong> Consumes ~3.0 kWh per cycle ($
            {(3.0 * rateDollars).toFixed(2)}/load; ${(65 * rateDollars).toFixed(2)}/month at 5
            loads/week).
          </li>
          <li>
            <strong>ENERGY STAR Sensor Dryer:</strong> Uses moisture sensors to terminate cycles
            early, consuming ~2.4 kWh per cycle ($
            {(2.4 * rateDollars).toFixed(2)}/load; ${(52 * rateDollars).toFixed(2)}/month). Saves
            20% in energy waste.
          </li>
          <li>
            <strong>Ventless Heat Pump Dryer:</strong> Recirculates heat through a closed-loop
            refrigeration cycle, consuming only ~1.2 kWh per cycle ($
            {(1.2 * rateDollars).toFixed(2)}/load; ${(26 * rateDollars).toFixed(2)}/month). Cuts
            dryer electricity costs by 60%.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>5. Factors Influencing Dryer Electricity Consumption</h2>
        <ul>
          <li>
            <strong>Automatic Moisture Sensors vs. Timed Dry:</strong> Moisture sensors shut down
            the heating element when dampness drops, preventing unnecessary runtime compared to
            manual timer cycles.
          </li>
          <li>
            <strong>Washing Machine Spin Speed:</strong> Higher washer spin speeds (1,000+ RPM)
            extract more moisture prior to drying, reducing required dryer cycle duration by 10 to
            15 minutes per load.
          </li>
          <li>
            <strong>Exhaust Duct Maintenance:</strong> Clogged lint traps or crushed exterior vent
            ducts restrict airflow, causing heat buildup and extending cycle times by 30% or more.
          </li>
          <li>
            <strong>Consecutive Loads:</strong> Drying back-to-back loads utilizes residual heat
            retained inside the drum, slightly lowering initial thermal warm-up energy.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>6. Limitations & Calculation Assumptions</h2>
        <p>
          Calculated dryer costs represent electrical power consumption of resistance heating
          elements and drum motors. Actual utility bills depend on local utility rate structures,
          time-of-use peak periods, and washer extraction effectiveness.
        </p>
        <p>
          To calculate your exact electric dryer operating costs, use our interactive tool:{' '}
          <Link href="/tools/clothes-dryer-cost-calculator">
            Go to Clothes Dryer Cost Calculator →
          </Link>
        </p>
      </section>
    </GuideArticleView>
  );
}
