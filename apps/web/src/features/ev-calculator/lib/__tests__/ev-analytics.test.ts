import { describe, expect, it } from 'vitest';

import { createEvAnalyticsPayload } from '../ev-analytics';

describe('createEvAnalyticsPayload', () => {
  it('builds privacy-safe payload for EV charging calculator', () => {
    const payload = createEvAnalyticsPayload({
      event: 'ev_calculation_completed',
      hasPreset: true,
      hasMileageEstimate: true,
      hasCustomRate: false,
      hasEfficiencyAdjustment: true,
      chargeRangeBand: 'STANDARD_DAILY',
      resultBand: 'MEDIUM',
    });

    expect(payload).toEqual({
      event: 'ev_calculation_completed',
      calculator_name: 'ev-home-charging-cost-calculator',
      preset_used: true,
      mileage_estimate_enabled: true,
      custom_rate_used: false,
      efficiency_adjusted: true,
      charge_range_band: 'STANDARD_DAILY',
      result_cost_band: 'MEDIUM',
    });
  });
});
