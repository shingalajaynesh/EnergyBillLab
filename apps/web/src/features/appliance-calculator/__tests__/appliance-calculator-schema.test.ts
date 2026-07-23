import { describe, expect, it } from 'vitest';
import {
  applianceCalculatorSchema,
  DEFAULT_APPLIANCE_FORM_VALUES,
} from '../schemas/appliance-calculator-schema';

describe('applianceCalculatorSchema', () => {
  it('validates default initial form values successfully', () => {
    const parsed = applianceCalculatorSchema.safeParse(DEFAULT_APPLIANCE_FORM_VALUES);
    expect(parsed.success).toBe(true);
  });

  it('rejects invalid or non-positive wattage', () => {
    const invalid = applianceCalculatorSchema.safeParse({
      ...DEFAULT_APPLIANCE_FORM_VALUES,
      wattage: -500,
    });
    expect(invalid.success).toBe(false);
  });

  it('rejects hoursPerDay greater than 24', () => {
    const invalid = applianceCalculatorSchema.safeParse({
      ...DEFAULT_APPLIANCE_FORM_VALUES,
      hoursPerDay: 25,
    });
    expect(invalid.success).toBe(false);
  });

  it('rejects dutyCyclePercent greater than 100', () => {
    const invalid = applianceCalculatorSchema.safeParse({
      ...DEFAULT_APPLIANCE_FORM_VALUES,
      dutyCyclePercent: 110,
    });
    expect(invalid.success).toBe(false);
  });

  it('accepts valid custom inputs', () => {
    const valid = applianceCalculatorSchema.safeParse({
      wattage: 200,
      hoursPerDay: 8,
      days: 30,
      rateCentsPerKwh: 18.5,
      dutyCyclePercent: 50,
    });
    expect(valid.success).toBe(true);
  });
});
