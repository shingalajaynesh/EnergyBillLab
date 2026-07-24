declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export type TrackDehumidifierAnalyticsOptions = {
  event:
    | 'dehumidifier_calculator_viewed'
    | 'dehumidifier_calculation_completed'
    | 'dehumidifier_preset_selected'
    | 'dehumidifier_result_reset'
    | 'dehumidifier_state_average_used';
  hasPreset?: boolean;
  hasCustomRate?: boolean;
  costBand?: 'LOW' | 'MEDIUM' | 'HIGH';
};

export function createDehumidifierAnalyticsPayload(options: TrackDehumidifierAnalyticsOptions) {
  return {
    event: options.event,
    calculator_name: 'dehumidifier-cost-calculator',
    preset_used: Boolean(options.hasPreset),
    custom_rate_used: Boolean(options.hasCustomRate),
    result_cost_band: options.costBand ?? 'NONE',
  };
}

export function trackDehumidifierAnalytics(options: TrackDehumidifierAnalyticsOptions): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(createDehumidifierAnalyticsPayload(options));
}
