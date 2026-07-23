import { describe, expect, it } from 'vitest';
import {
  DEFAULT_HEATER_FORM_VALUES,
  spaceHeaterCalculatorSchema,
} from '../schemas/heater-calculator-schema';

describe('spaceHeaterCalculatorSchema', () => {
  it('validates default initial space heater form values successfully', () => {
    const parsed = spaceHeaterCalculatorSchema.safeParse(DEFAULT_HEATER_FORM_VALUES);
    expect(parsed.success).toBe(true);
  });

  it('rejects invalid or non-positive wattage', () => {
    const invalid = spaceHeaterCalculatorSchema.safeParse({
      ...DEFAULT_HEATER_FORM_VALUES,
      heaterWatts: -1500,
    });
    expect(invalid.success).toBe(false);
  });

  it('rejects quantity less than 1 or non-integer', () => {
    const invalidZero = spaceHeaterCalculatorSchema.safeParse({
      ...DEFAULT_HEATER_FORM_VALUES,
      quantity: 0,
    });
    expect(invalidZero.success).toBe(false);

    const invalidFloat = spaceHeaterCalculatorSchema.safeParse({
      ...DEFAULT_HEATER_FORM_VALUES,
      quantity: 1.5,
    });
    expect(invalidFloat.success).toBe(false);
  });

  it('rejects dutyCyclePercent greater than 100', () => {
    const invalid = spaceHeaterCalculatorSchema.safeParse({
      ...DEFAULT_HEATER_FORM_VALUES,
      dutyCyclePercent: 120,
    });
    expect(invalid.success).toBe(false);
  });

  it('accepts valid multiple heater inputs', () => {
    const valid = spaceHeaterCalculatorSchema.safeParse({
      heaterWatts: 1500,
      quantity: 3,
      hoursPerDay: 5,
      days: 30,
      rateCentsPerKwh: 18.5,
      dutyCyclePercent: 85,
    });
    expect(valid.success).toBe(true);
  });
});
