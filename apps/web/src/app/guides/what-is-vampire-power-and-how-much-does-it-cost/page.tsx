import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['what-is-vampire-power-and-how-much-does-it-cost']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideVampirePowerPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: What Is Vampire Power & What Does It Cost?</h2>
        <p>
          Vampire power (also called phantom load or standby power) is the electrical energy
          consumed by appliances and electronic devices while turned off or in standby mode.
        </p>
        <p>
          In a typical U.S. home with 20 to 40 plugged-in electronic devices, continuous standby
          loads total <strong>25W to 60W</strong>, accumulating{' '}
          <strong>200 to 520 kWh annually</strong>. At an average electric rate of 20 ¢/kWh, vampire
          power costs between <strong>$40 and $104 per year</strong> per household.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Devices That Draw Standby Power Continuously</h2>
        <p>
          Devices draw phantom load to maintain internal clocks, wireless remote readiness, network
          connectivity, and status lights:
        </p>
        <ul>
          <li>
            <strong>Cable Boxes & DVRs:</strong> 10W to 25W continuous (one of the highest phantom
            draws in home electronics).
          </li>
          <li>
            <strong>Smart TVs & Soundbars:</strong> 0.5W to 3.0W to respond to remote signals and
            network wake commands.
          </li>
          <li>
            <strong>Microwave & Range Clocks:</strong> 2W to 4W continuously powering LED display
            digits.
          </li>
          <li>
            <strong>Game Consoles in Instant-On Mode:</strong> 10W to 15W downloading background
            games and updates.
          </li>
          <li>
            <strong>Unloaded USB Wall Chargers:</strong> 0.1W to 0.5W continuous transformer loss
            when left in wall outlets.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Annual Vampire Power Cost ($) = Combined Standby Watts × 8,760 Hours ÷ 1,000 × Rate
          ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Vampire Power Costs across Standby Levels & Utility Rates</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Vampire power standby operating costs across household load levels and utility rates"
            className={styles.dataTable}
          >
            <caption>
              Household Vampire Power Costs: Standby Wattage vs. Electric Rates (24/7/365)
            </caption>
            <thead>
              <tr>
                <th scope="col">Household Standby Profile</th>
                <th scope="col">Continuous Phantom Draw</th>
                <th scope="col">Annual kWh</th>
                <th scope="col">Annual Cost (15 ¢/kWh)</th>
                <th scope="col">Annual Cost (20 ¢/kWh)</th>
                <th scope="col">Annual Cost (30 ¢/kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Efficient Home (Smart strips & ENERGY STAR)</td>
                <td>15W</td>
                <td>131.4 kWh</td>
                <td>$19.71</td>
                <td>$26.28</td>
                <td>$39.42</td>
              </tr>
              <tr>
                <td>Typical Household (Multiple TVs & cable boxes)</td>
                <td>35W</td>
                <td>306.6 kWh</td>
                <td>$45.99</td>
                <td>$61.32</td>
                <td>$91.98</td>
              </tr>
              <tr>
                <td>High-Tech Home (Consoles, mesh, workstations)</td>
                <td>65W</td>
                <td>569.4 kWh</td>
                <td>$85.41</td>
                <td>$113.88</td>
                <td>$170.82</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Calculations assume continuous 24/7 standby draw (8,760 hours/yr). Figures
          represent typical manufacturer benchmarks and illustrative assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>How to Eliminate Vampire Power</h2>
        <p>
          Use smart power strips (which automatically cut outlet power when a master device turns
          off), plug-in electricity monitors (like Kill A Watt meters) to measure exact standby
          watts, and enable Eco energy-saving modes on gaming consoles and TVs.
        </p>
        <p>
          Diagnose your total electric bill with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link>, calculate
          individual standby loads with our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>
          , or see how phantom load ranks against major appliances in our{' '}
          <Link href="/insights/august-2026-home-appliance-operating-cost-hierarchy-benchmark">
            August 2026 Home Appliance Operating Cost Hierarchy Benchmark
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
