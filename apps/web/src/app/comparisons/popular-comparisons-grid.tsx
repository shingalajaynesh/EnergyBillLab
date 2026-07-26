'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import type { PublicRouteHref } from '@/lib/routes';

import styles from './comparisons-hub.module.css';

export interface ComparisonCardItem {
  id: string;
  badge: 'Guide' | 'Calculator';
  optionA: string;
  optionB: string;
  title: string;
  description: string;
  factors: [string, string, string];
  href: PublicRouteHref;
  ctaText: string;
}

const ALL_FEATURED_CARDS: ComparisonCardItem[] = [
  {
    id: 'heat-pump-vs-resistance',
    badge: 'Guide',
    optionA: 'Heat Pump',
    optionB: 'Electric Resistance',
    title: 'Heat Pump vs Electric Resistance Heating',
    description:
      'Compare seasonal efficiency, cold-weather output, COP ratings, and monthly heating bills.',
    factors: ['Seasonal efficiency (COP 2–4)', 'Cold-weather performance', 'Operating cost delta'],
    href: '/guides/heat-pump-vs-electric-resistance-heating-cost',
    ctaText: 'Compare Heating Costs',
  },
  {
    id: 'central-ac-vs-window-ac',
    badge: 'Guide',
    optionA: 'Central AC',
    optionB: 'Window AC',
    title: 'Central AC vs Window Air Conditioner',
    description:
      'Evaluate whole-home cooling coverage against single-room spot cooling power draw.',
    factors: ['Whole-home vs single-room', 'Duct heat gain & distribution', 'Compressor wattage'],
    href: '/guides/how-much-electricity-does-central-air-conditioning-use',
    ctaText: 'Compare Central vs Window AC',
  },
  {
    id: 'window-ac-vs-portable-ac',
    badge: 'Calculator',
    optionA: 'Window AC',
    optionB: 'Portable AC',
    title: 'Window AC vs Portable Air Conditioner',
    description:
      'Analyze EER ratings, single-hose exhaust heat leakage, and daily operating costs.',
    factors: ['EER & SEER2 ratings', 'Exhaust hose heat re-entry', 'Daily kWh calculation'],
    href: '/tools/ac-cost-calculator',
    ctaText: 'Calculate Cooling Cost',
  },
  {
    id: 'air-fryer-vs-oven',
    badge: 'Guide',
    optionA: 'Air Fryer',
    optionB: 'Electric Oven',
    title: 'Air Fryer vs Electric Oven Energy Use',
    description: 'Compare rapid convection cooking against large-cavity thermal preheating power.',
    factors: ['Wattage (1,500W vs 3,500W)', 'Preheat & cycle duration', 'Thermal cavity size'],
    href: '/guides/how-much-electricity-does-an-air-fryer-use',
    ctaText: 'Compare Cooking Energy',
  },
  {
    id: 'laptop-vs-gaming-pc',
    badge: 'Guide',
    optionA: 'Laptop',
    optionB: 'Gaming PC',
    title: 'Laptop Computer vs Gaming PC Power Draw',
    description: 'Evaluate low-voltage mobile processors against multi-hundred-watt desktop GPUs.',
    factors: ['Idle & peak wattage', 'Power supply efficiency', 'Annual electricity cost'],
    href: '/guides/how-much-electricity-does-a-gaming-pc-use',
    ctaText: 'Compare Computing Power',
  },
  {
    id: 'fixed-vs-variable-rate',
    badge: 'Guide',
    optionA: 'Fixed Rate',
    optionB: 'Variable Rate',
    title: 'Fixed vs Variable Electricity Rate Plans',
    description: 'Compare stable contract pricing against volatile wholesale market supply rates.',
    factors: ['Price volatility risk', 'Seasonal price surges', 'Contract term commitment'],
    href: '/guides/fixed-vs-variable-electricity-rates',
    ctaText: 'Compare Electricity Rates',
  },
  {
    id: 'mini-split-vs-central-ac',
    badge: 'Guide',
    optionA: 'Ductless Mini-Split',
    optionB: 'Central AC',
    title: 'Ductless Mini-Split vs Central AC Systems',
    description: 'Compare ductless zone control inverters against central duct distribution.',
    factors: ['Multi-zone inverter control', 'Zero duct loss efficiency', 'Installation cost'],
    href: '/guides/how-much-electricity-does-a-ductless-mini-split-use',
    ctaText: 'Compare Ductless Efficiency',
  },
  {
    id: 'furnace-vs-baseboard',
    badge: 'Guide',
    optionA: 'Electric Furnace',
    optionB: 'Baseboard Heating',
    title: 'Electric Furnace vs Baseboard Heaters',
    description: 'Analyze central blower electrical load against room-by-room zone heating.',
    factors: ['10–20 kW central furnace draw', 'Zone thermostat control', 'Air handler blower kWh'],
    href: '/guides/how-much-electricity-does-an-electric-furnace-use',
    ctaText: 'Compare Electric Heating',
  },
  {
    id: 'tou-vs-standard-pricing',
    badge: 'Guide',
    optionA: 'Time-of-Use',
    optionB: 'Standard Flat Rate',
    title: 'Time-of-Use Pricing vs Flat Electricity Rates',
    description: 'Evaluate peak-window load shifting against uniform 24/7 kWh billing rates.',
    factors: ['On-peak rate multipliers', 'Off-peak charging windows', 'Behavioral load shifting'],
    href: '/guides/what-is-a-time-of-use-electricity-rate',
    ctaText: 'Compare Rate Structures',
  },
  {
    id: 'ev-charging-rates',
    badge: 'Calculator',
    optionA: 'Off-Peak TOU',
    optionB: 'Standard Rate',
    title: 'Home EV Charging Under Different Rates',
    description: 'Calculate Level 1 vs Level 2 session costs under flat and TOU utility rates.',
    factors: ['Level 1 vs Level 2 speed', '85%–90% charging efficiency', 'Cost per 100 miles'],
    href: '/tools/ev-home-charging-cost-calculator',
    ctaText: 'Calculate EV Charging Cost',
  },
];

export function PopularComparisonsGrid() {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedCards = isExpanded ? ALL_FEATURED_CARDS : ALL_FEATURED_CARDS.slice(0, 6);

  return (
    <div className={styles.popularSection}>
      <div className={styles.cardsGrid}>
        {displayedCards.map((card) => (
          <article key={card.id} className={styles.compCard}>
            <div className={styles.compCardHeader}>
              <span
                className={card.badge === 'Calculator' ? styles.badgeCalculator : styles.badgeGuide}
              >
                {card.badge}
              </span>
              <div className={styles.vsVisual}>
                <span className={styles.optA}>{card.optionA}</span>
                <span className={styles.vsPill}>VS</span>
                <span className={styles.optB}>{card.optionB}</span>
              </div>
            </div>

            <h3 className={styles.compCardTitle}>{card.title}</h3>
            <p className={styles.compCardDesc}>{card.description}</p>

            <ul className={styles.factorList}>
              {card.factors.map((f) => (
                <li key={f} className={styles.factorItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link href={card.href} className={styles.cardCtaLink}>
              <span>{card.ctaText}</span>
              <span>→</span>
            </Link>
          </article>
        ))}
      </div>

      <div className={styles.expandRow}>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.expandBtn}
          aria-expanded={isExpanded}
        >
          {isExpanded
            ? 'Show Fewer Comparisons ↑'
            : `View More Comparisons (${ALL_FEATURED_CARDS.length - 6} Additional) ↓`}
        </button>
      </div>
    </div>
  );
}
