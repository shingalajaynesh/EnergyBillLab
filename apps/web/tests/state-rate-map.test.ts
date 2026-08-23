import { describe, expect, it } from 'vitest';
import { getRouteByHref } from '@/lib/routes';

describe('Interactive State Rate Map Feature Integration', () => {
  it('registers /electricity-rates/map in the public routes registry with valid metadata', () => {
    const route = getRouteByHref('/electricity-rates/map');
    expect(route).toBeDefined();
    expect(route?.group).toBe('research');
    expect(route?.sitemap).toBe(true);
    expect(route?.label).toBe('Rate Heatmap');
  });
});
