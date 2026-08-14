import { describe, expect, it } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { TechnicalVisualCard } from '../src/components/technical-visual-card';
import { INSIGHT_VISUAL_CONFIGS } from '../src/content/insights/visuals';

describe('TechnicalVisualCard Component & Insights Visual Configs', () => {
  it('1. renders comparison bars with accessible labels and formatted values', () => {
    const html = renderToString(
      React.createElement(TechnicalVisualCard, {
        title: 'Test Efficiency Benchmark',
        subtitle: 'Comparing power draw across technologies',
        badge: 'Top Savings',
        badgeType: 'success',
        items: [
          {
            label: 'Baseline Model',
            displayValue: '$100/mo',
            value: 100,
            color: 'danger',
            subLabel: 'High consumption',
          },
          {
            label: 'High-Efficiency Model',
            displayValue: '$30/mo',
            value: 30,
            color: 'success',
            highlight: true,
            badge: 'Best Value',
            subLabel: '70% savings',
          },
        ],
        footerNote: 'Source: Official Test Procedure',
      }),
    );

    expect(html).toContain('Test Efficiency Benchmark');
    expect(html).toContain('Comparing power draw across technologies');
    expect(html).toContain('Top Savings');
    expect(html).toContain('Baseline Model');
    expect(html).toContain('$100/mo');
    expect(html).toContain('High-Efficiency Model');
    expect(html).toContain('$30/mo');
    expect(html).toContain('Best Value');
    expect(html).toContain('Source: Official Test Procedure');
    expect(html).toContain('role="img"');
  });

  it('2. provides valid visual configs for high-traffic Insight articles', () => {
    expect(
      INSIGHT_VISUAL_CONFIGS['august-2026-swimming-pool-pump-kwh-operating-cost-benchmark'],
    ).toBeDefined();
    expect(
      INSIGHT_VISUAL_CONFIGS['august-2026-rooftop-solar-nem-3-net-billing-export-value-benchmark'],
    ).toBeDefined();
    expect(
      INSIGHT_VISUAL_CONFIGS['august-2026-electric-dehumidifier-kwh-operating-cost-benchmark'],
    ).toBeDefined();
    expect(
      INSIGHT_VISUAL_CONFIGS['august-2026-central-air-conditioner-seer2-cooling-cost-benchmark'],
    ).toBeDefined();
    expect(
      INSIGHT_VISUAL_CONFIGS['august-2026-portable-electric-space-heater-operating-cost-benchmark'],
    ).toBeDefined();
  });

  it('3. ensures every visual config item has valid positive values and display strings', () => {
    for (const [_slug, config] of Object.entries(INSIGHT_VISUAL_CONFIGS)) {
      expect(config.title).toBeTruthy();
      expect(config.items.length).toBeGreaterThanOrEqual(2);
      for (const item of config.items) {
        expect(item.label).toBeTruthy();
        expect(item.displayValue).toBeTruthy();
        expect(item.value).toBeGreaterThan(0);
      }
    }
  });
});
