declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export type ApplianceAnalyticsEvent =
  | 'appliance_calculator_viewed'
  | 'appliance_calculation_completed'
  | 'appliance_preset_selected'
  | 'appliance_result_reset'
  | 'state_average_used';

export type TrackApplianceAnalyticsOptions = {
  event: ApplianceAnalyticsEvent;
  hasPreset?: boolean;
  hasCustomRate?: boolean;
  hasDutyCycleAdjustment?: boolean;
  resultBand?: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
};

export function createApplianceAnalyticsPayload({
  event,
  hasPreset = false,
  hasCustomRate = false,
  hasDutyCycleAdjustment = false,
  resultBand,
}: TrackApplianceAnalyticsOptions) {
  return {
    event,
    calculator_name: 'appliance-energy-cost-calculator',
    preset_used: hasPreset,
    custom_rate_used: hasCustomRate,
    duty_cycle_adjusted: hasDutyCycleAdjustment,
    result_cost_band: resultBand ?? 'NONE',
  };
}

export function trackApplianceAnalytics(options: TrackApplianceAnalyticsOptions): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(createApplianceAnalyticsPayload(options));
}
