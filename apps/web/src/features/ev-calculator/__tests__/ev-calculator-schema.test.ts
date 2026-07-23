import { describe, expect, it } from 'vitest';
import { DEFAULT_EV_FORM_VALUES, evCalculatorSchema } from '../schemas/ev-calculator-schema';

describe('evCalculatorSchema', () => {
  it('validates default initial EV form values successfully', () => {
    const parsed = evCalculatorSchema.safeParse(DEFAULT_EV_FORM_VALUES);
    expect(parsed.success).toBe(true);
  });

  it('rejects invalid or non-positive battery capacity', () => {
    const invalid = evCalculatorSchema.safeParse({
      ...DEFAULT_EV_FORM_VALUES,
      batteryCapacityKwh: -75,
    });
    expect(invalid.success).toBe(false);
  });

  it('rejects target SoC <= starting SoC', () => {
    const invalidEqual = evCalculatorSchema.safeParse({
      ...DEFAULT_EV_FORM_VALUES,
      startingChargePercent: 50,
      targetChargePercent: 50,
    });
    expect(invalidEqual.success).toBe(false);

    const invalidLower = evCalculatorSchema.safeParse({
      ...DEFAULT_EV_FORM_VALUES,
      startingChargePercent: 80,
      targetChargePercent: 20,
    });
    expect(invalidLower.success).toBe(false);
  });

  it('rejects charging efficiency below 50% or above 100%', () => {
    const invalidLow = evCalculatorSchema.safeParse({
      ...DEFAULT_EV_FORM_VALUES,
      chargingEfficiencyPercent: 40,
    });
    expect(invalidLow.success).toBe(false);

    const invalidHigh = evCalculatorSchema.safeParse({
      ...DEFAULT_EV_FORM_VALUES,
      chargingEfficiencyPercent: 105,
    });
    expect(invalidHigh.success).toBe(false);
  });

  it('accepts valid optional driving mileage inputs', () => {
    const valid = evCalculatorSchema.safeParse({
      batteryCapacityKwh: 60,
      startingChargePercent: 10,
      targetChargePercent: 90,
      chargingEfficiencyPercent: 88,
      rateCentsPerKwh: 15.0,
      milesDriven: 50,
      milesPerKwh: 3.8,
    });
    expect(valid.success).toBe(true);
  });
});
