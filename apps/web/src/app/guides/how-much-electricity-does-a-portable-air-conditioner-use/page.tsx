import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-portable-air-conditioner-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuidePortableAcElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Portable Air Conditioner Power & Cost</h2>
        <p>
          A portable air conditioner draws between <strong>900W and 1,400W</strong> of electrical
          power while the cooling compressor is running.
        </p>
        <p>
          Running a 1,200W portable AC for 8 hours daily at a 70% compressor duty cycle consumes
          approximately <strong>6.7 kWh per day (201 kWh per month)</strong>. At an average utility
          rate of 20 ¢/kWh, operating a portable AC costs about{' '}
          <strong>$1.34 per day ($40.20 per month)</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>DOE SACC Ratings & Single-Hose Infiltration Losses</h2>
        <p>
          Understanding portable AC power consumption requires evaluating cooling capacity standards
          and exhaust hose mechanics:
        </p>
        <ul>
          <li>
            <strong>DOE SACC Rating:</strong> Department of Energy Seasonally Adjusted Cooling
            Capacity (SACC) accounts for exhaust hose thermal radiation and unconditioned outdoor
            air infiltration, resulting in lower net cooling ratings than older ASHRAE figures.
          </li>
          <li>
            <strong>Single-Hose Negative Pressure:</strong> Single-hose units push indoor air out
            through the exhaust duct, creating negative pressure that pulls warm, humid outdoor air
            into adjacent rooms through building cracks.
          </li>
          <li>
            <strong>Dual-Hose Units:</strong> Dual-hose portables draw outdoor air through one hose
            and exhaust it through the other, eliminating indoor negative pressure and improving
            cooling efficiency by 15% to 25%.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Daily Cost ($) = Rated Watts × Duty Cycle × Operating Hours ÷ 1,000 × Rate ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Portable AC Operating Costs across Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Portable AC operating costs across capacity sizes and electric rates"
            className={styles.dataTable}
          >
            <caption>
              Portable AC Operating Costs: Power Rating vs. Utility Rates (8 hrs/day)
            </caption>
            <thead>
              <tr>
                <th scope="col">Portable AC Size</th>
                <th scope="col">Power Draw (Watts)</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Cost at 15 ¢/kWh</th>
                <th scope="col">Cost at 20 ¢/kWh</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Small Room (8,000 SACC)</td>
                <td>950W</td>
                <td>159.6 kWh</td>
                <td>$23.94</td>
                <td>$31.92</td>
                <td>$47.88</td>
              </tr>
              <tr>
                <td>Medium Room (10,000 SACC)</td>
                <td>1,150W</td>
                <td>193.2 kWh</td>
                <td>$28.98</td>
                <td>$38.64</td>
                <td>$57.96</td>
              </tr>
              <tr>
                <td>Large Room (12,000 SACC)</td>
                <td>1,350W</td>
                <td>226.8 kWh</td>
                <td>$34.02</td>
                <td>$45.36</td>
                <td>$68.04</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume 8 hours daily operation at a 70% compressor duty cycle.
          Figures represent typical manufacturer benchmarks and illustrative calculation
          assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Efficiency Comparison Boundaries</h2>
        <p>
          While window AC units submerge their hot compressor outside the building envelope,
          portable units house the hot compressor indoors, radiating heat through plastic exhaust
          hoses. When window installation is feasible, window units typically offer higher CEER
          efficiency.
        </p>
        <p>
          Calculate room cooling costs with our{' '}
          <Link href="/tools/ac-cost-calculator">Air Conditioner Cost Calculator</Link> or evaluate
          window units in our{' '}
          <Link href="/guides/how-much-electricity-does-a-window-air-conditioner-use">
            Window AC Energy Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
