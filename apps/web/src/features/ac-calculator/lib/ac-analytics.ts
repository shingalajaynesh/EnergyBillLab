import type { AcCalculationMode } from '@energy-bill-lab/calculation-engine';

declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export type AcAnalyticsEvent =
  | 'ac_calculator_viewed'
  | 'ac_calculation_completed'
  | 'ac_calculation_method_selected'
  | 'ac_preset_selected'
  | 'ac_result_reset'
  | 'ac_state_average_used';

export type TrackAcAnalyticsOptions = {
  event: AcAnalyticsEvent;
  calculationMethod?: AcCalculationMode;
  hasPreset?: boolean;
  hasCustomRate?: boolean;
  hasDutyCycleAdjustment?: boolean;
  resultBand?: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
};

export function createAcAnalyticsPayload({
  event,
  calculationMethod = 'capacity_eer',
  hasPreset = false,
  hasCustomRate = false,
  hasDutyCycleAdjustment = false,
  resultBand,
}: TrackAcAnalyticsOptions) {
  return {
    event,
    calculator_name: 'ac-cost-calculator',
    calculation_method: calculationMethod,
    preset_used: hasPreset,
    custom_rate_used: hasCustomRate,
    duty_cycle_adjusted: hasDutyCycleAdjustment,
    result_cost_band: resultBand ?? 'NONE',
  };
}

export function trackAcAnalytics(options: TrackAcAnalyticsOptions): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(createAcAnalyticsPayload(options));
}
