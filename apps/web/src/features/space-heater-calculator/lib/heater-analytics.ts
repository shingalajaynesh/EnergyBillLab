declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export type HeaterAnalyticsEvent =
  | 'heater_calculator_viewed'
  | 'heater_calculation_completed'
  | 'heater_preset_selected'
  | 'heater_quantity_changed'
  | 'heater_result_reset'
  | 'heater_state_average_used';

export type TrackHeaterAnalyticsOptions = {
  event: HeaterAnalyticsEvent;
  hasPreset?: boolean;
  hasMultipleHeaters?: boolean;
  hasCustomRate?: boolean;
  hasDutyCycleAdjustment?: boolean;
  resultBand?: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
};

export function createHeaterAnalyticsPayload({
  event,
  hasPreset = false,
  hasMultipleHeaters = false,
  hasCustomRate = false,
  hasDutyCycleAdjustment = false,
  resultBand,
}: TrackHeaterAnalyticsOptions) {
  return {
    event,
    calculator_name: 'space-heater-cost-calculator',
    preset_used: hasPreset,
    multiple_heaters: hasMultipleHeaters,
    custom_rate_used: hasCustomRate,
    duty_cycle_adjusted: hasDutyCycleAdjustment,
    result_cost_band: resultBand ?? 'NONE',
  };
}

export function trackHeaterAnalytics(options: TrackHeaterAnalyticsOptions): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(createHeaterAnalyticsPayload(options));
}
