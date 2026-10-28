import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';
import {
  DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
  DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE,
} from '@/lib/constants/electricity';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['what-is-vampire-power-and-how-much-does-it-cost']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideVampirePowerPage() {
  const rateDollars = DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH / 100;
  const costPerContinuousWatt = (8760 / 1000) * rateDollars; // ~ $1.59 per continuous Watt-year

  // Household baseload profiles (LBNL Standby Power Group field measurement baselines)
  const apartmentWatts = 45;
  const suburbanWatts = 115;
  const smartHomeWatts = 220;

  const apartmentAnnualKwh = (apartmentWatts * 8760) / 1000;
  const suburbanAnnualKwh = (suburbanWatts * 8760) / 1000;
  const smartHomeAnnualKwh = (smartHomeWatts * 8760) / 1000;

  const apartmentCost = apartmentAnnualKwh * rateDollars;
  const suburbanCost = suburbanAnnualKwh * rateDollars;
  const smartHomeCost = smartHomeAnnualKwh * rateDollars;

  // Smart power strip economics (shedding 45W idle peripheral loads)
  const smartStripSavedKwh = (45 * 8760) / 1000;
  const smartStripAnnualSavings = smartStripSavedKwh * rateDollars;
  const smartStripPaybackMonths = 25.0 / (smartStripAnnualSavings / 12);

  // Device standby rankings (LBNL empirical measurements)
  const deviceRankings = [
    {
      name: 'HD DVR / Cable Set-Top Box',
      defaultW: 22.0,
      ecoW: 1.5,
      notes: 'Active standby vs deep sleep firmware',
    },
    {
      name: 'Next-Gen Game Console (Instant-On)',
      defaultW: 15.0,
      ecoW: 0.5,
      notes: 'Connected standby vs Energy Saver mode',
    },
    {
      name: 'Wi-Fi Mesh Node System (2-Pack)',
      defaultW: 14.0,
      ecoW: 14.0,
      notes: 'Essential continuous network baseload',
    },
    {
      name: 'Desktop PC & Dual Monitors (Sleep)',
      defaultW: 9.0,
      ecoW: 0.0,
      notes: 'Eliminated via smart power strip',
    },
    {
      name: 'AV Surround Sound Receiver',
      defaultW: 8.0,
      ecoW: 0.5,
      notes: 'Standby circuit vs low-power pass-through',
    },
    {
      name: '65" 4K Smart TV (Quick-Start)',
      defaultW: 6.0,
      ecoW: 0.5,
      notes: 'Instant-on wake vs standard Eco mode',
    },
    {
      name: 'Microwave & Oven Digital Clocks',
      defaultW: 6.0,
      ecoW: 6.0,
      notes: 'Continuous LED display digits (2 units)',
    },
    {
      name: 'Smart Speakers / Voice Hubs (3 units)',
      defaultW: 6.0,
      ecoW: 6.0,
      notes: 'Continuous microphone listening state',
    },
    {
      name: 'Smart Plugs & IoT Switches (8 units)',
      defaultW: 6.4,
      ecoW: 6.4,
      notes: 'Wi-Fi keep-alive telemetry (~0.8W each)',
    },
    {
      name: 'Unloaded Phone Chargers (5 units)',
      defaultW: 1.0,
      ecoW: 0.0,
      notes: 'Minimal transformer draw (~0.2W each)',
    },
  ];

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: What Is Vampire Power & What Does It Cost?</h2>
        <p>
          Vampire power (also called phantom load or standby electricity) is the continuous
          electrical energy consumed by electronic equipment and appliances while turned off or in
          standby mode.
        </p>
        <p>
          A typical U.S. single-family home maintains a continuous standby load of{' '}
          <strong>115 Watts</strong>, drawing approximately <strong>1,007.4 kWh per year</strong>.
          At the current U.S. residential benchmark electricity rate of{' '}
          <strong>{DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH} ¢/kWh</strong> (
          {DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE}), this invisible baseload costs{' '}
          <strong>${suburbanCost.toFixed(2)} per year</strong> (${(suburbanCost / 12).toFixed(2)}{' '}
          per month) on household electric bills. In high-rate states such as California
          (32.40¢/kWh), this identical 115W continuous draw costs over{' '}
          <strong>$326 per year</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>The Continuous Power Formula & Golden Rule of Baseload</h2>
        <p>
          Every 1 Watt of continuous electrical power drawn 24 hours per day, 365 days per year
          (8,760 hours) consumes exactly <strong>8.76 kWh per year</strong>:
        </p>
        <div className={styles.formulaBox}>
          Annual Baseload kWh = Continuous Standby Watts × 8,760 Hours ÷ 1,000
          <br />
          Annual Running Cost ($) = Continuous Standby Watts × ${costPerContinuousWatt.toFixed(
            3,
          )}{' '}
          per Watt-year
        </div>
        <p>
          <strong>The Golden Rule:</strong> At the current national benchmark rate, every continuous
          Watt of phantom draw costs <strong>${costPerContinuousWatt.toFixed(2)} per year</strong>.
          A device drawing 10 continuous Watts costs{' '}
          <strong>
            ${(10 * costPerContinuousWatt).toFixed(2)}
            /year
          </strong>
          , while a 100-Watt baseload costs{' '}
          <strong>${(100 * costPerContinuousWatt).toFixed(2)}/year</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Device-by-Device Standby Power & Cost Rankings</h2>
        <p>
          Based on empirical laboratory measurements from the Lawrence Berkeley National Laboratory
          (LBNL) Standby Power Group, below are the measured phantom power draws and annual costs
          for common household devices at the national benchmark rate of{' '}
          <strong>{DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh</strong> (
          {DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE}):
        </p>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Household Electronics Standby Power & Annual Operating Cost Benchmark"
            className={styles.dataTable}
          >
            <caption>
              Table 1: Device Standby Power Draw & Annual Operating Costs (8,760 Hours/Year @{' '}
              {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh)
            </caption>
            <thead>
              <tr>
                <th scope="col">Device Category</th>
                <th scope="col">Default Standby</th>
                <th scope="col">Annual kWh</th>
                <th scope="col">Annual Cost (@ {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢)</th>
                <th scope="col">Eco Mode Standby</th>
                <th scope="col">Eco Mode Cost</th>
                <th scope="col">Annual Savings</th>
              </tr>
            </thead>
            <tbody>
              {deviceRankings.map((dev) => {
                const annualKwh = (dev.defaultW * 8760) / 1000;
                const annualCost = annualKwh * rateDollars;
                const ecoKwh = (dev.ecoW * 8760) / 1000;
                const ecoCost = ecoKwh * rateDollars;
                const savings = annualCost - ecoCost;
                return (
                  <tr key={dev.name}>
                    <td>{dev.name}</td>
                    <td>{dev.defaultW.toFixed(1)} W</td>
                    <td>{annualKwh.toFixed(1)} kWh</td>
                    <td>${annualCost.toFixed(2)} / yr</td>
                    <td>{dev.ecoW.toFixed(1)} W</td>
                    <td>${ecoCost.toFixed(2)} / yr</td>
                    <td>{savings > 0.01 ? `$${savings.toFixed(2)} / yr` : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p>
          <strong>Myth vs. Reality on Phone Chargers:</strong> Unloaded phone and laptop chargers
          draw only 0.1W to 0.3W when left plugged in without a connected device. Leaving 5 phone
          chargers plugged in all year draws just 1.0 Watt total—costing only{' '}
          <strong>${costPerContinuousWatt.toFixed(2)} per year</strong>. In contrast, home-theater
          equipment, Wi-Fi mesh systems, and set-top boxes drive over 95% of total household phantom
          waste.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Three Household Continuous Baseload Profiles</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Household profile standby electricity baseload and annual cost matrix"
            className={styles.dataTable}
          >
            <caption>
              Table 2: Continuous Household Standby Baseloads across Profiles & Rates
            </caption>
            <thead>
              <tr>
                <th scope="col">Household Profile</th>
                <th scope="col">Continuous Standby</th>
                <th scope="col">Annual kWh</th>
                <th scope="col">
                  National Benchmark (@ {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢)
                </th>
                <th scope="col">California (@ 32.40¢)</th>
                <th scope="col">High-Cost State (@ 42.00¢)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1. Minimalist 1-Bedroom Apartment</td>
                <td>45 Watts (0.045 kW)</td>
                <td>{apartmentAnnualKwh.toFixed(1)} kWh</td>
                <td>${apartmentCost.toFixed(2)} / yr</td>
                <td>${(apartmentAnnualKwh * 0.324).toFixed(2)} / yr</td>
                <td>${(apartmentAnnualKwh * 0.42).toFixed(2)} / yr</td>
              </tr>
              <tr>
                <td>2. Standard Suburban Home (3-Bedroom)</td>
                <td>115 Watts (0.115 kW)</td>
                <td>{suburbanAnnualKwh.toFixed(1)} kWh</td>
                <td>${suburbanCost.toFixed(2)} / yr</td>
                <td>${(suburbanAnnualKwh * 0.324).toFixed(2)} / yr</td>
                <td>${(suburbanAnnualKwh * 0.42).toFixed(2)} / yr</td>
              </tr>
              <tr>
                <td>3. Tech-Heavy Connected Smart Home</td>
                <td>220 Watts (0.220 kW)</td>
                <td>{smartHomeAnnualKwh.toFixed(1)} kWh</td>
                <td>${smartHomeCost.toFixed(2)} / yr</td>
                <td>${(smartHomeAnnualKwh * 0.324).toFixed(2)} / yr</td>
                <td>${(smartHomeAnnualKwh * 0.42).toFixed(2)} / yr</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Smart Power Strip Economics & Practical Elimination Steps</h2>
        <p>
          Installing an advanced Tier 1 smart power strip on entertainment centers or home office
          desks automatically de-energizes peripheral equipment (subwoofers, soundbars, monitors,
          printers) when the primary TV or PC powers down:
        </p>
        <ul>
          <li>
            <strong>Peripheral Load Shedding:</strong> Eliminates ~45 Watts of idle standby power
            (328.5 kWh saved annually).
          </li>
          <li>
            <strong>Financial Savings:</strong> Reduces electricity bills by{' '}
            <strong>${smartStripAnnualSavings.toFixed(2)} per year</strong> nationally ($106.40/year
            in California).
          </li>
          <li>
            <strong>Rapid Capital Payback:</strong> Completely recovers the typical $25.00 purchase
            price in approximately <strong>{smartStripPaybackMonths.toFixed(1)} months</strong>.
          </li>
          <li>
            <strong>Firmware Setting Tweaks:</strong> Switching video game consoles from
            &quot;Instant-On&quot; to &quot;Energy Saver&quot; mode saves ~$23.80/year per console
            with zero financial investment.
          </li>
        </ul>
        <p>
          Analyze your full electricity statement with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link> or evaluate
          specific appliance energy use in our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
