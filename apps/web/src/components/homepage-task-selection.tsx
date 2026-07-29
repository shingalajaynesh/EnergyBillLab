'use client';

import Link from 'next/link';

import { trackEvent } from '@/lib/analytics';
import type { PublicRouteHref } from '@/lib/routes';

import styles from '@/app/page.module.css';

type TaskItem = {
  title: string;
  desc: string;
  href: PublicRouteHref;
  action: string;
  taskName: string;
};

const tasks: TaskItem[] = [
  {
    title: 'Understand why my bill increased',
    desc: 'Explore seasonal bill spikes, usage changes vs rate increases, fixed fees, and billing-day variances.',
    href: '/guides/why-is-my-electric-bill-so-high',
    action: 'Read High Bill Guide \u2192',
    taskName: 'understand_bill_increase',
  },
  {
    title: "Calculate an appliance's cost",
    desc: 'Estimate operating costs for air conditioners, space heaters, EV chargers, refrigerators, and water heaters.',
    href: '/tools/appliance-energy-cost-calculator',
    action: 'Appliance Calculator \u2192',
    taskName: 'calculate_appliance_cost',
  },
  {
    title: 'Find my state electricity rate',
    desc: 'Explore official U.S. EIA residential rate benchmarks, rankings, and 24-month trend reports across all 50 U.S. states.',
    href: '/electricity-rates',
    action: 'View 50-State Rates \u2192',
    taskName: 'find_state_rate',
  },
  {
    title: 'Compare electricity costs',
    desc: 'Review national residential rate research benchmarks comparing high-cost and low-cost states against national averages.',
    href: '/research/us-residential-electricity-rate-report',
    action: 'Read Rate Report \u2192',
    taskName: 'compare_electricity_costs',
  },
  {
    title: 'Analyze my electricity bill',
    desc: 'Calculate your effective all-in cost per kWh and evaluate whether your electric bill is above or below state benchmarks.',
    href: '/electricity-bill-analyzer',
    action: 'Analyze Statement \u2192',
    taskName: 'analyze_electricity_bill',
  },
];

export function HomepageTaskSelection() {
  return (
    <section className={styles.taskSelectionSection} aria-labelledby="task-selection-heading">
      <h2 id="task-selection-heading">What do you need help with?</h2>
      <div className={styles.taskSelectionGrid}>
        {tasks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.taskCard}
            onClick={() => {
              trackEvent('homepage_task_click', {
                destination_page: item.href,
                source_page: '/',
                task_name: item.taskName,
              });
            }}
          >
            <div>
              <span className={styles.taskTitle}>{item.title}</span>
              <small className={styles.taskDesc}>{item.desc}</small>
            </div>
            <span className={styles.taskAction}>{item.action}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
