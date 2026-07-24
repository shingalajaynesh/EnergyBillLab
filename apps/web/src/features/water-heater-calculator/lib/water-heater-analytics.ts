declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export type TrackWaterHeaterAnalyticsOptions = {
  event:
    | 'water_heater_calculator_viewed'
    | 'water_heater_calculation_completed'
    | 'water_heater_preset_selected'
    | 'water_heater_result_reset'
    | 'water_heater_state_average_used';
  hasPreset?: boolean;
  hasCustomRate?: boolean;
  costBand?: 'LOW' | 'MEDIUM' | 'HIGH';
};

export function createWaterHeaterAnalyticsPayload(options: TrackWaterHeaterAnalyticsOptions) {
  return {
    event: options.event,
    calculator_name: 'electric-water-heater-cost-calculator',
    preset_used: Boolean(options.hasPreset),
    custom_rate_used: Boolean(options.hasCustomRate),
    result_cost_band: options.costBand ?? 'NONE',
  };
}

export function trackWaterHeaterAnalytics(options: TrackWaterHeaterAnalyticsOptions): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(createWaterHeaterAnalyticsPayload(options));
}
