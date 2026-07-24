import { calculateDryerCost } from '@energy-bill-lab/calculation-engine';
import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-does-it-cost-to-run-an-electric-clothes-dryer']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function ClothesDryerGuidePage() {
  // Worked Example: 4,000W electric dryer, 45 minutes/load, 5 loads/week, 4 weeks, 16.5 ¢/kWh
  const workedExample = calculateDryerCost({
    wattage: 4000,
    minutesPerLoad: 45,
    loadsPerWeek: 5,
    weeks: 4,
    rateCentsPerKwh: 16.5,
    dutyCyclePercent: 100,
  });

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
          <strong>5 loads per week</strong>
          at an example rate of <strong>16.5 ¢/kWh</strong>.
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
              Table 1: Estimated Electric Dryer Costs by Weekly Load Volume (4,000W Dryer @
              16.5¢/kWh)
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
                <td>24.0 kWh</td>
                <td>$3.96</td>
                <td>$51.48</td>
              </tr>
              <tr>
                <td>5 loads / week (Medium Household)</td>
                <td>20 loads</td>
                <td>60.0 kWh</td>
                <td>$9.90</td>
                <td>$128.70</td>
              </tr>
              <tr>
                <td>8 loads / week (Large Family)</td>
                <td>32 loads</td>
                <td>96.0 kWh</td>
                <td>$15.84</td>
                <td>$205.92</td>
              </tr>
              <tr>
                <td>12 loads / week (Heavy Laundry)</td>
                <td>48 loads</td>
                <td>144.0 kWh</td>
                <td>$23.76</td>
                <td>$308.88</td>
              </tr>
            </tbody>
          </table>
        </div>
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
