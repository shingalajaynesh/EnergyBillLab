declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export type TrackDryerAnalyticsOptions = {
  event:
    | 'dryer_calculator_viewed'
    | 'dryer_calculation_completed'
    | 'dryer_preset_selected'
    | 'dryer_result_reset'
    | 'dryer_state_average_used';
  hasPreset?: boolean;
  hasCustomRate?: boolean;
  costBand?: 'LOW' | 'MEDIUM' | 'HIGH';
};

export function createDryerAnalyticsPayload(options: TrackDryerAnalyticsOptions) {
  return {
    event: options.event,
    calculator_name: 'clothes-dryer-cost-calculator',
    preset_used: Boolean(options.hasPreset),
    custom_rate_used: Boolean(options.hasCustomRate),
    result_cost_band: options.costBand ?? 'NONE',
  };
}

export function trackDryerAnalytics(options: TrackDryerAnalyticsOptions): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(createDryerAnalyticsPayload(options));
}
