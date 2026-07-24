declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export type TrackRefrigeratorAnalyticsOptions = {
  event:
    | 'refrigerator_calculator_viewed'
    | 'refrigerator_calculation_completed'
    | 'refrigerator_preset_selected'
    | 'refrigerator_result_reset'
    | 'refrigerator_state_average_used';
  mode?: 'wattage' | 'annual_kwh';
  hasPreset?: boolean;
  hasCustomRate?: boolean;
  costBand?: 'LOW' | 'MEDIUM' | 'HIGH';
};

export function createRefrigeratorAnalyticsPayload(options: TrackRefrigeratorAnalyticsOptions) {
  return {
    event: options.event,
    calculator_name: 'refrigerator-cost-calculator',
    calculation_mode: options.mode ?? 'wattage',
    preset_used: Boolean(options.hasPreset),
    custom_rate_used: Boolean(options.hasCustomRate),
    result_cost_band: options.costBand ?? 'NONE',
  };
}

export function trackRefrigeratorAnalytics(options: TrackRefrigeratorAnalyticsOptions): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(createRefrigeratorAnalyticsPayload(options));
}
