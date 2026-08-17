import { describe, expect, it } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { TechnicalVisualCard } from '../src/components/technical-visual-card';
import { guideSlugs } from '../src/content/guides';
import { GUIDE_VISUAL_CONFIGS } from '../src/content/guides-visuals';
import { getPublishedInsights } from '../src/content/insights';
import { INSIGHT_VISUAL_CONFIGS } from '../src/content/insights/visuals';

describe('TechnicalVisualCard Component & Full Visual Coverage', () => {
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

  it('2. provides valid visual configs for all 25 published Insight articles', () => {
    const publishedInsights = getPublishedInsights();
    expect(publishedInsights).toHaveLength(25);

    publishedInsights.forEach((insight) => {
      const config = INSIGHT_VISUAL_CONFIGS[insight.slug];
      expect(config).toBeDefined();
      expect(config?.title).toBeTruthy();
      expect(config?.items.length).toBeGreaterThanOrEqual(2);
      for (const item of config!.items) {
        expect(item.label).toBeTruthy();
        expect(item.displayValue).toBeTruthy();
        expect(item.value).toBeGreaterThan(0);
      }
    });
  });

  it('3. provides valid visual configs for all 50 energy guides', () => {
    expect(guideSlugs).toHaveLength(50);

    guideSlugs.forEach((slug) => {
      const config = GUIDE_VISUAL_CONFIGS[slug];
      expect(config).toBeDefined();
      expect(config?.title).toBeTruthy();
      expect(config?.items.length).toBeGreaterThanOrEqual(2);
      for (const item of config!.items) {
        expect(item.label).toBeTruthy();
        expect(item.displayValue).toBeTruthy();
        expect(item.value).toBeGreaterThan(0);
      }
    });
  });
});
