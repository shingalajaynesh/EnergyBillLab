import { describe, expect, it } from 'vitest';

import { createApplianceAnalyticsPayload } from '../appliance-analytics';

describe('createApplianceAnalyticsPayload', () => {
  it('builds privacy-safe payload for appliance cost calculator', () => {
    const payload = createApplianceAnalyticsPayload({
      event: 'appliance_calculation_completed',
      hasPreset: true,
      hasCustomRate: false,
      hasDutyCycleAdjustment: true,
      resultBand: 'MEDIUM',
    });

    expect(payload).toEqual({
      event: 'appliance_calculation_completed',
      calculator_name: 'appliance-energy-cost-calculator',
      preset_used: true,
      custom_rate_used: false,
      duty_cycle_adjusted: true,
      result_cost_band: 'MEDIUM',
    });
  });
});
