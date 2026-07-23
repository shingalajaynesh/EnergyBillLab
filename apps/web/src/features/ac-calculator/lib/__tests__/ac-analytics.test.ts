import { describe, expect, it } from 'vitest';

import { createAcAnalyticsPayload } from '../ac-analytics';

describe('createAcAnalyticsPayload', () => {
  it('builds privacy-safe payload for AC cost calculator', () => {
    const payload = createAcAnalyticsPayload({
      event: 'ac_calculation_completed',
      calculationMethod: 'capacity_eer',
      hasPreset: true,
      hasCustomRate: true,
      hasDutyCycleAdjustment: true,
      resultBand: 'HIGH',
    });

    expect(payload).toEqual({
      event: 'ac_calculation_completed',
      calculator_name: 'ac-cost-calculator',
      calculation_method: 'capacity_eer',
      preset_used: true,
      custom_rate_used: true,
      duty_cycle_adjusted: true,
      result_cost_band: 'HIGH',
    });
  });
});
