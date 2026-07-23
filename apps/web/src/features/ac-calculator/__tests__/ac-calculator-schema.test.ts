import { describe, expect, it } from 'vitest';
import { acCalculatorSchema, DEFAULT_AC_FORM_VALUES } from '../schemas/ac-calculator-schema';

describe('acCalculatorSchema', () => {
  it('validates default initial AC form values successfully', () => {
    const parsed = acCalculatorSchema.safeParse(DEFAULT_AC_FORM_VALUES);
    expect(parsed.success).toBe(true);
  });

  it('rejects invalid or non-positive wattage', () => {
    const invalid = acCalculatorSchema.safeParse({
      ...DEFAULT_AC_FORM_VALUES,
      mode: 'wattage',
      wattage: -500,
    });
    expect(invalid.success).toBe(false);
  });

  it('rejects invalid cooling capacity in capacity_eer mode', () => {
    const invalid = acCalculatorSchema.safeParse({
      ...DEFAULT_AC_FORM_VALUES,
      mode: 'capacity_eer',
      coolingCapacityBtu: -12000,
    });
    expect(invalid.success).toBe(false);
  });

  it('rejects dutyCyclePercent greater than 100', () => {
    const invalid = acCalculatorSchema.safeParse({
      ...DEFAULT_AC_FORM_VALUES,
      dutyCyclePercent: 110,
    });
    expect(invalid.success).toBe(false);
  });

  it('accepts valid capacity and EER inputs', () => {
    const valid = acCalculatorSchema.safeParse({
      mode: 'capacity_eer',
      acType: 'minisplit',
      coolingCapacityBtu: 12000,
      eer: 14.0,
      hoursPerDay: 8,
      days: 30,
      rateCentsPerKwh: 18.5,
      dutyCyclePercent: 50,
    });
    expect(valid.success).toBe(true);
  });
});
