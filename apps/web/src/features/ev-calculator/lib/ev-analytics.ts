declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export type EvAnalyticsEvent =
  | 'ev_calculator_viewed'
  | 'ev_calculation_completed'
  | 'ev_preset_selected'
  | 'ev_mileage_enabled'
  | 'ev_result_reset'
  | 'ev_state_average_used';

export type TrackEvAnalyticsOptions = {
  event: EvAnalyticsEvent;
  hasPreset?: boolean;
  hasMileageEstimate?: boolean;
  hasCustomRate?: boolean;
  hasEfficiencyAdjustment?: boolean;
  chargeRangeBand?: 'SMALL_TOPUP' | 'STANDARD_DAILY' | 'DEEP_CHARGE';
  resultBand?: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
};

export function createEvAnalyticsPayload({
  chargeRangeBand,
  event,
  hasCustomRate = false,
  hasEfficiencyAdjustment = false,
  hasMileageEstimate = false,
  hasPreset = false,
  resultBand,
}: TrackEvAnalyticsOptions) {
  return {
    event,
    calculator_name: 'ev-home-charging-cost-calculator',
    preset_used: hasPreset,
    mileage_estimate_enabled: hasMileageEstimate,
    custom_rate_used: hasCustomRate,
    efficiency_adjusted: hasEfficiencyAdjustment,
    charge_range_band: chargeRangeBand ?? 'NONE',
    result_cost_band: resultBand ?? 'NONE',
  };
}

export function trackEvAnalytics(options: TrackEvAnalyticsOptions): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(createEvAnalyticsPayload(options));
}
