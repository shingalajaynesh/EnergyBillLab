declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export type TrackPoolPumpAnalyticsOptions = {
  event:
    | 'pool_pump_calculator_viewed'
    | 'pool_pump_calculation_completed'
    | 'pool_pump_preset_selected'
    | 'pool_pump_result_reset'
    | 'pool_pump_state_average_used';
  hasPreset?: boolean;
  hasCustomRate?: boolean;
  costBand?: 'LOW' | 'MEDIUM' | 'HIGH';
};

export function createPoolPumpAnalyticsPayload(options: TrackPoolPumpAnalyticsOptions) {
  return {
    event: options.event,
    calculator_name: 'pool-pump-cost-calculator',
    preset_used: Boolean(options.hasPreset),
    custom_rate_used: Boolean(options.hasCustomRate),
    result_cost_band: options.costBand ?? 'NONE',
  };
}

export function trackPoolPumpAnalytics(options: TrackPoolPumpAnalyticsOptions): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(createPoolPumpAnalyticsPayload(options));
}
