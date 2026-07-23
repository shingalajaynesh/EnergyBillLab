import { describe, expect, it } from 'vitest';

import { createHeaterAnalyticsPayload } from '../heater-analytics';

describe('createHeaterAnalyticsPayload', () => {
  it('builds privacy-safe payload for space heater calculator', () => {
    const payload = createHeaterAnalyticsPayload({
      event: 'heater_calculation_completed',
      hasPreset: true,
      hasMultipleHeaters: true,
      hasCustomRate: false,
      hasDutyCycleAdjustment: false,
      resultBand: 'MEDIUM',
    });

    expect(payload).toEqual({
      event: 'heater_calculation_completed',
      calculator_name: 'space-heater-cost-calculator',
      preset_used: true,
      multiple_heaters: true,
      custom_rate_used: false,
      duty_cycle_adjusted: false,
      result_cost_band: 'MEDIUM',
    });
  });
});
