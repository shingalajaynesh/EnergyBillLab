'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import type { PublicRouteHref } from '@/lib/routes';

import styles from './comparisons-hub.module.css';

interface CategoryData {
  id: string;
  name: string;
  shortDesc1: string;
  shortDesc2: string;
  variables: [string, string, string];
  calculatorCta: {
    label: string;
    route: PublicRouteHref;
  };
  guides: Array<{
    title: string;
    description: string;
    route: PublicRouteHref;
  }>;
}

const CATEGORY_DATA: CategoryData[] = [
  {
    id: 'heating',
    name: 'Heating System Comparisons',
    shortDesc1:
      'Heating energy costs depend on system type, coefficient of performance, thermal load, and outdoor temperature thresholds.',
    shortDesc2:
      'Heat pumps move ambient heat at 200%–400% efficiency, whereas electric resistance systems convert electrical power at 100%.',
    variables: [
      'Coefficient of Performance (COP)',
      'Outdoor Temperature Drop',
      'Blower Motor Wattage',
    ],
    calculatorCta: {
      label: 'Calculate Space Heater Cost',
      route: '/tools/space-heater-cost-calculator',
    },
    guides: [
      {
        title: 'Heat Pump vs Electric Resistance Cost Comparison',
        description:
          'Detailed analysis of COP efficiency, operating costs, and winter backup heating.',
        route: '/guides/heat-pump-vs-electric-resistance-heating-cost',
      },
      {
        title: 'How Much Electricity Does a Heat Pump Use?',
        description:
          'Breakdown of compressor power draw, SEER2 ratings, and monthly heating bills.',
        route: '/guides/how-much-electricity-does-a-heat-pump-use',
      },
      {
        title: 'How Much Electricity Does an Electric Furnace Use?',
        description: 'Evaluating 10–20 kW central furnace electrical loads and duct airflow.',
        route: '/guides/how-much-electricity-does-an-electric-furnace-use',
      },
      {
        title: 'Electric Baseboard Heating Consumption Guide',
        description: 'Room-by-room zone thermostat management and wattage calculations.',
        route: '/guides/how-much-electricity-does-electric-baseboard-heating-use',
      },
      {
        title: 'Space Heater Power & Operating Cost Guide',
        description: 'Evaluating 1,500W space heater electrical draw and room heating trade-offs.',
        route: '/guides/how-much-does-it-cost-to-run-a-space-heater',
      },
    ],
  },
  {
    id: 'cooling',
    name: 'Cooling Equipment Comparisons',
    shortDesc1:
      'Cooling consumption depends on compressor capacity (BTU/hr), efficiency rating (EER/SEER2), thermostat setting, and ductwork heat gain.',
    shortDesc2:
      'Central AC units cool whole homes but experience duct heat loss, whereas window units and mini-splits target specific room zones.',
    variables: ['EER & SEER2 Rating', 'Compressor Duty Cycle', 'Duct Heat Loss %'],
    calculatorCta: {
      label: 'Calculate Air Conditioner Cost',
      route: '/tools/ac-cost-calculator',
    },
    guides: [
      {
        title: 'Central Air Conditioning Electricity Usage Guide',
        description: 'Evaluating 3-ton central compressor wattage, SEER2 ratings, and duct losses.',
        route: '/guides/how-much-electricity-does-central-air-conditioning-use',
      },
      {
        title: 'Window Air Conditioner Power & Cost Guide',
        description: 'Single-room cooling power draw, EER rating efficiency, and daily kWh.',
        route: '/guides/how-much-electricity-does-a-window-air-conditioner-use',
      },
      {
        title: 'Portable Air Conditioner Efficiency & Energy Guide',
        description: 'Single-hose vs dual-hose exhaust heat re-entry and compressor duty cycle.',
        route: '/guides/how-much-electricity-does-a-portable-air-conditioner-use',
      },
      {
        title: 'Ductless Mini-Split Power Draw & Cost Guide',
        description: 'Multi-zone inverter compressor control and zero-duct-loss savings.',
        route: '/guides/how-much-electricity-does-a-ductless-mini-split-use',
      },
      {
        title: 'Should You Turn Off Air Conditioner When Away?',
        description: 'Thermal recovery load vs constant temperature maintenance energy trade-offs.',
        route: '/guides/should-you-turn-off-the-air-conditioner-when-away',
      },
    ],
  },
  {
    id: 'appliances',
    name: 'Appliance Energy Comparisons',
    shortDesc1:
      'Appliance operating costs depend on rated electrical wattage, active cycle duration, and thermal cavity preheating volume.',
    shortDesc2:
      'Small appliances like air fryers or microwaves use high power for brief runtimes, whereas clothes dryers and ovens draw power over long periods.',
    variables: ['Rated Power Wattage (W)', 'Operating Cycle Hours', 'Active Duty Cycle %'],
    calculatorCta: {
      label: 'Calculate Appliance Energy Cost',
      route: '/tools/appliance-energy-cost-calculator',
    },
    guides: [
      {
        title: 'Air Fryer Electricity Usage & Cost Guide',
        description:
          'Comparing 1,500W rapid convection cooking to 3,500W electric oven preheating.',
        route: '/guides/how-much-electricity-does-an-air-fryer-use',
      },
      {
        title: 'Electric Oven Power & Baking Cost Guide',
        description: 'Baking element wattage, cavity preheating, and thermal maintenance energy.',
        route: '/guides/how-much-does-it-cost-to-run-an-electric-oven',
      },
      {
        title: 'Microwave Power Draw & Cooking Cost Guide',
        description: 'Magnetron power draw, cooking time efficiency, and standby standby power.',
        route: '/guides/how-much-electricity-does-a-microwave-use',
      },
      {
        title: 'Dishwasher kWh Consumption Guide',
        description: 'Internal water heater element draw, dry cycle heater, and wash cycle kWh.',
        route: '/guides/how-much-electricity-does-a-dishwasher-use',
      },
      {
        title: 'Desktop Gaming PC Wattage & Electricity Cost Guide',
        description: 'Evaluating multi-hundred-watt GPU/CPU gaming rigs against efficient laptops.',
        route: '/guides/how-much-electricity-does-a-gaming-pc-use',
      },
    ],
  },
  {
    id: 'ev',
    name: 'EV Home Charging Scenarios',
    shortDesc1:
      'Electric vehicle charging cost depends on battery pack capacity (kWh), daily driving distance, charging efficiency, and electricity rate structure.',
    shortDesc2:
      'Level 1 (120V) charging is adequate for lower daily mileage, while Level 2 (240V) charging reduces session duration and pairs with off-peak TOU rates.',
    variables: ['Level 1 vs Level 2 Speed', '85%–90% Charging Efficiency', 'Off-Peak Rate Windows'],
    calculatorCta: {
      label: 'Calculate EV Charging Cost',
      route: '/tools/ev-home-charging-cost-calculator',
    },
    guides: [
      {
        title: 'EV Home Charging Cost & kWh Guide',
        description:
          'Level 1 vs Level 2 charging speeds, charging losses, and monthly driving cost.',
        route: '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
      },
      {
        title: 'Time-of-Use Electricity Rate Guide for EV Owners',
        description: 'Overnight off-peak charging windows, automated timers, and rate savings.',
        route: '/guides/what-is-a-time-of-use-electricity-rate',
      },
      {
        title: 'Peak vs Off-Peak Electricity Hours Explained',
        description: 'Understanding utility rate schedules, demand windows, and load shifting.',
        route: '/guides/peak-vs-off-peak-electricity-hours-explained',
      },
      {
        title: 'How to Calculate Electricity Cost Per kWh From Your Bill',
        description:
          'Determining all-in effective rate including supply, delivery, and utility fees.',
        route: '/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill',
      },
    ],
  },
  {
    id: 'plans',
    name: 'Electricity Rate Structure Comparisons',
    shortDesc1:
      'Evaluating utility price options requires comparing generation supply rates, transmission/delivery charges, peak windows, and billing rules.',
    shortDesc2:
      'Fixed-rate contracts lock supply prices against market spikes, whereas time-of-use rates reward shifting heavy appliance usage off-peak.',
    variables: [
      'All-In Effective Rate ($/kWh)',
      'Peak Window Multipliers',
      'Fixed vs Variable Contract Terms',
    ],
    calculatorCta: {
      label: 'Analyze My Electricity Bill',
      route: '/electricity-bill-analyzer',
    },
    guides: [
      {
        title: 'Fixed vs Variable Electricity Rates',
        description:
          'Evaluating supply contract price stability against wholesale price volatility.',
        route: '/guides/fixed-vs-variable-electricity-rates',
      },
      {
        title: 'What Is a Time-of-Use Electricity Rate?',
        description:
          'On-peak vs off-peak hourly pricing, seasonal windows, and load-shifting strategy.',
        route: '/guides/what-is-a-time-of-use-electricity-rate',
      },
      {
        title: 'Electricity Supply Charge vs Delivery Charge',
        description: 'Breaking down generation supplier costs vs utility distribution line fees.',
        route: '/guides/electricity-supply-charge-vs-delivery-charge',
      },
      {
        title: 'What Is a Demand Charge on an Electric Bill?',
        description: 'Understanding peak interval kW demand charges vs total monthly kWh energy.',
        route: '/guides/what-is-a-demand-charge-on-an-electric-bill',
      },
      {
        title: 'How Budget Billing Works',
        description:
          '12-month payment smoothing, annual true-up bills, and deferred balance rules.',
        route: '/guides/how-budget-billing-works',
      },
    ],
  },
];

export function CategoryNavSection() {
  const [activeTabId, setActiveTabId] = useState<string>('heating');

  const currentCategory: CategoryData =
    CATEGORY_DATA.find((c) => c.id === activeTabId) || (CATEGORY_DATA[0] as CategoryData);

  return (
    <div className={styles.categoryNavContainer}>
      <div className={styles.tabList} role="tablist" aria-label="Energy comparison categories">
        {CATEGORY_DATA.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={cat.id === activeTabId}
            aria-controls={`panel-${cat.id}`}
            id={`tab-${cat.id}`}
            onClick={() => setActiveTabId(cat.id)}
            className={`${styles.tabBtn} ${cat.id === activeTabId ? styles.tabBtnActive : ''}`}
          >
            {cat.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div
        id={`panel-${currentCategory.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${currentCategory.id}`}
        className={styles.tabContentPanel}
      >
        <div className={styles.splitLayout}>
          {/* Left Column: Summary & Calculator CTA */}
          <div className={styles.summaryCol}>
            <h3 className={styles.summaryTitle}>{currentCategory.name}</h3>
            <p className={styles.summaryText}>{currentCategory.shortDesc1}</p>
            <p className={styles.summaryText}>{currentCategory.shortDesc2}</p>

            <div className={styles.varsContainer}>
              <span className={styles.varsLabel}>Key Comparison Variables:</span>
              <div className={styles.chipsRow}>
                {currentCategory.variables.map((v) => (
                  <span key={v} className={styles.varChip}>
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <Link href={currentCategory.calculatorCta.route} className={styles.summaryCtaBtn}>
              {currentCategory.calculatorCta.label} →
            </Link>
          </div>

          {/* Right Column: Guide Rows */}
          <div className={styles.guidesCol}>
            <h4 className={styles.guidesHeading}>Source-Backed Comparison Guides</h4>
            <div className={styles.guideRowsList}>
              {currentCategory.guides.slice(0, 5).map((guide) => (
                <Link key={guide.route} href={guide.route} className={styles.guideRowCard}>
                  <div className={styles.guideRowIcon}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <div className={styles.guideRowContent}>
                    <div className={styles.guideRowTitle}>{guide.title}</div>
                    <div className={styles.guideRowDesc}>{guide.description}</div>
                  </div>
                  <span className={styles.guideRowArrow}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
