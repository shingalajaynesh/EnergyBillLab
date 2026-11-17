import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { STANDBY_ANNUAL_KWH_SAVED, STANDBY_POWER_EXAMPLE } from '@/content/guides-visuals';
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
  const { standbyHoursPerDay, wattsBefore, wattsAfter, stripPrice } = STANDBY_POWER_EXAMPLE;
  const annualSavings = STANDBY_ANNUAL_KWH_SAVED * rateDollars;

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>What counts as standby power?</h2>
        <p>
          Standby power is the electricity a device draws while it waits for a remote control, keeps
          a clock running, or stays ready for another task. A router serving your home network is
          doing its regular job, even at night. Your home’s overnight usage can include both standby
          power and equipment that is actively working.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Measure the device in the mode you actually use</h2>
        <ol>
          <li>
            Choose an unused device or group you can safely test. Connect it to a plug-in energy
            meter rated for the outlet and load, then use the normal remote or power button to put
            the device in standby.
          </li>
          <li>
            Let the device settle. If its reading fluctuates, such as when it checks for updates,
            use cumulative kWh over several standby hours. Divide kWh by the number of hours and
            multiply by 1,000 to find average watts. Very small loads may be below your meter’s
            useful resolution.
          </li>
          <li>
            Change one setting and repeat the measurement. If you are testing a smart power strip,
            measure at the wall so the strip’s own power use is included. Keep devices that need
            uninterrupted power on an always-on outlet.
          </li>
        </ol>
        <p>
          The{' '}
          <a href="https://www.energy.gov/cmei/femp/measuring-standby-power">
            Department of Energy’s standby measurement guidance
          </a>{' '}
          explains why averaging energy over time helps when readings fluctuate.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Convert the measured difference to annual cost</h2>
        <div className={styles.formulaBox}>
          Annual kWh saved = Watts saved × standby hours per day × 365 ÷ 1,000
        </div>
        <p>
          Multiply those kWh by the price of the electricity you avoid buying. On a time-of-use
          plan, apply the prices for the hours you save. Fixed monthly charges do not change.
        </p>
        <p>
          Suppose a TV and its accessories average {wattsBefore} W in standby and {wattsAfter} W
          after changing settings or adding a strip. Over {standbyHoursPerDay} standby hours per
          day, the difference is <strong>{STANDBY_ANNUAL_KWH_SAVED.toFixed(1)} kWh per year</strong>
          . At {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh (
          {DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE}), that is about{' '}
          <strong>${annualSavings.toFixed(2)} per year</strong>.
        </p>
        <p>
          If a setting achieves the reduction, try it first. If a ${stripPrice} strip achieves the
          same reduction, it takes about {(stripPrice / annualSavings).toFixed(1)} years to pay for
          itself through electricity savings. Measure your own setup before buying. Use the{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          to try your measured watts, hours, and rate.
        </p>
      </section>
    </GuideArticleView>
  );
}
