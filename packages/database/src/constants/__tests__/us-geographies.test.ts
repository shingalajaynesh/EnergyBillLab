import { describe, expect, it } from 'vitest';
import { US_GEOGRAPHIES, VALID_GEOGRAPHY_CODES } from '../us-geographies';

describe('US Geographies Dataset', () => {
  it('contains exactly 52 geography entries (50 states + DC + US national)', () => {
    expect(US_GEOGRAPHIES.length).toBe(52);
  });

  it('includes the national aggregate US', () => {
    const national = US_GEOGRAPHIES.find((g) => g.code === 'US');
    expect(national).toBeDefined();
    expect(national?.kind).toBe('national');
    expect(national?.slug).toBe('national');
  });

  it('includes District of Columbia as district kind', () => {
    const dc = US_GEOGRAPHIES.find((g) => g.code === 'DC');
    expect(dc).toBeDefined();
    expect(dc?.kind).toBe('district');
    expect(dc?.name).toBe('District of Columbia');
  });

  it('includes all 50 US states as state kind', () => {
    const states = US_GEOGRAPHIES.filter((g) => g.kind === 'state');
    expect(states.length).toBe(50);
  });

  it('has unique uppercase codes', () => {
    const codes = US_GEOGRAPHIES.map((g) => g.code);
    const uniqueCodes = new Set(codes);
    expect(uniqueCodes.size).toBe(codes.length);
    for (const code of codes) {
      expect(code).toBe(code.toUpperCase());
    }
  });

  it('has unique lowercase kebab-case slugs', () => {
    const slugs = US_GEOGRAPHIES.map((g) => g.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toBe(slug.toLowerCase());
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('has deterministic display orders starting at 1', () => {
    const displayOrders = US_GEOGRAPHIES.map((g) => g.displayOrder);
    const sorted = [...displayOrders].sort((a, b) => a - b);
    expect(displayOrders).toEqual(sorted);
    expect(sorted[0]).toBe(1);
    expect(sorted[sorted.length - 1]).toBe(52);
  });

  it('does not include any US territories', () => {
    const territories = ['PR', 'VI', 'GU', 'AS', 'MP'];
    for (const territory of territories) {
      expect(VALID_GEOGRAPHY_CODES.has(territory)).toBe(false);
    }
  });
});
