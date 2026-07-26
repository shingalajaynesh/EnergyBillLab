'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import type { PublicRouteHref } from '@/lib/routes';

import styles from './comparisons-hub.module.css';

interface CategoryConfig {
  id: string;
  name: string;
  options: Array<{
    label: string;
    route: PublicRouteHref;
  }>;
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    id: 'heating',
    name: 'Heating Systems',
    options: [
      {
        label: 'Heat Pump vs Electric Resistance',
        route: '/guides/heat-pump-vs-electric-resistance-heating-cost',
      },
      {
        label: 'Electric Furnace Usage',
        route: '/guides/how-much-electricity-does-an-electric-furnace-use',
      },
      {
        label: 'Electric Baseboard Heating',
        route: '/guides/how-much-electricity-does-electric-baseboard-heating-use',
      },
      {
        label: 'Space Heater Cost Calculator',
        route: '/tools/space-heater-cost-calculator',
      },
    ],
  },
  {
    id: 'cooling',
    name: 'Cooling Equipment',
    options: [
      {
        label: 'Central AC Electricity Usage',
        route: '/guides/how-much-electricity-does-central-air-conditioning-use',
      },
      {
        label: 'Window AC vs Portable AC',
        route: '/tools/ac-cost-calculator',
      },
      {
        label: 'Ductless Mini-Split Power Draw',
        route: '/guides/how-much-electricity-does-a-ductless-mini-split-use',
      },
      {
        label: 'Window Air Conditioner Guide',
        route: '/guides/how-much-electricity-does-a-window-air-conditioner-use',
      },
    ],
  },
  {
    id: 'appliances',
    name: 'Household Appliances',
    options: [
      {
        label: 'Air Fryer vs Electric Oven',
        route: '/guides/how-much-electricity-does-an-air-fryer-use',
      },
      {
        label: 'Laptop vs Gaming PC',
        route: '/guides/how-much-electricity-does-a-gaming-pc-use',
      },
      {
        label: 'Dishwasher Electricity Usage',
        route: '/guides/how-much-electricity-does-a-dishwasher-use',
      },
      {
        label: 'General Appliance Cost Calculator',
        route: '/tools/appliance-energy-cost-calculator',
      },
    ],
  },
  {
    id: 'plans',
    name: 'Electricity Rate Plans',
    options: [
      {
        label: 'Fixed vs Variable Electricity Rates',
        route: '/guides/fixed-vs-variable-electricity-rates',
      },
      {
        label: 'Time-of-Use Rate Pricing',
        route: '/guides/what-is-a-time-of-use-electricity-rate',
      },
      {
        label: 'Peak vs Off-Peak Hours',
        route: '/guides/peak-vs-off-peak-electricity-hours-explained',
      },
      {
        label: 'Supply vs Delivery Charges',
        route: '/guides/electricity-supply-charge-vs-delivery-charge',
      },
    ],
  },
  {
    id: 'ev',
    name: 'EV Home Charging',
    options: [
      {
        label: 'Level 1 vs Level 2 Home Charging',
        route: '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
      },
      {
        label: 'EV Home Charging Cost Calculator',
        route: '/tools/ev-home-charging-cost-calculator',
      },
      {
        label: 'EV Time-of-Use Rate Strategy',
        route: '/guides/what-is-a-time-of-use-electricity-rate',
      },
    ],
  },
];

export function QuickComparisonLauncher() {
  const router = useRouter();
  const [selectedCatId, setSelectedCatId] = useState<string>('heating');
  const [selectedOptionA, setSelectedOptionA] = useState<string>('0');
  const [selectedOptionB, setSelectedOptionB] = useState<string>('1');
  const [rateInput, setRateInput] = useState<string>('0.17');

  const currentConfig: CategoryConfig =
    CATEGORY_CONFIGS.find((c) => c.id === selectedCatId) || (CATEGORY_CONFIGS[0] as CategoryConfig);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCatId = e.target.value;
    setSelectedCatId(newCatId);
    setSelectedOptionA('0');
    setSelectedOptionB('1');
  };

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
    const idx = parseInt(selectedOptionA, 10);
    const targetOption = currentConfig.options[idx] ??
      currentConfig.options[0] ?? { route: '/tools' };
    router.push(targetOption.route);
  };

  return (
    <div className={styles.launcherPanel}>
      <div className={styles.launcherHeader}>
        <div className={styles.launcherBadge}>INTERACTIVE LAUNCHER</div>
        <h2 className={styles.launcherTitle}>Quick Comparison Tool</h2>
        <p className={styles.launcherSub}>Select options to launch a targeted comparison</p>
      </div>

      <form onSubmit={handleCompare} className={styles.launcherForm}>
        <div className={styles.formGroup}>
          <label htmlFor="comp-category" className={styles.formLabel}>
            Energy Category
          </label>
          <select
            id="comp-category"
            value={selectedCatId}
            onChange={handleCategoryChange}
            className={styles.formSelect}
          >
            {CATEGORY_CONFIGS.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGridTwo}>
          <div className={styles.formGroup}>
            <label htmlFor="comp-option-a" className={styles.formLabel}>
              Option A
            </label>
            <select
              id="comp-option-a"
              value={selectedOptionA}
              onChange={(e) => setSelectedOptionA(e.target.value)}
              className={styles.formSelect}
            >
              {currentConfig.options.map((opt, idx) => (
                <option key={opt.label} value={idx}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="comp-option-b" className={styles.formLabel}>
              Option B
            </label>
            <select
              id="comp-option-b"
              value={selectedOptionB}
              onChange={(e) => setSelectedOptionB(e.target.value)}
              className={styles.formSelect}
            >
              {currentConfig.options.map((opt, idx) => (
                <option key={`${opt.label}-b`} value={idx}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="comp-rate" className={styles.formLabel}>
            Electricity Rate ($ / kWh)
          </label>
          <input
            id="comp-rate"
            type="number"
            step="0.01"
            min="0.01"
            max="1.00"
            value={rateInput}
            onChange={(e) => setRateInput(e.target.value)}
            className={styles.formInput}
            placeholder="0.17"
          />
        </div>

        <button type="submit" className={styles.launcherBtn}>
          Compare Selected Options →
        </button>
      </form>
    </div>
  );
}
