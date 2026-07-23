declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export type TrackCalculatorEventOptions = {
  event:
    | 'electricity_bill_analyzer_started'
    | 'electricity_bill_analyzer_completed'
    | 'electricity_bill_analyzer_reset'
    | 'advanced_inputs_opened';
  hasComparison?: boolean;
  hasAdvancedInputs?: boolean;
  classification?: string;
};

export function createBillAnalyzerAnalyticsPayload({
  classification,
  event,
  hasAdvancedInputs = false,
  hasComparison = false,
}: TrackCalculatorEventOptions) {
  return {
    event,
    calculator_name: 'electricity-bill-analyzer',
    comparison_used: hasComparison,
    advanced_inputs_used: hasAdvancedInputs,
    result_classification: classification ?? 'NONE',
  };
}

export function trackCalculatorEvent(options: TrackCalculatorEventOptions): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(createBillAnalyzerAnalyticsPayload(options));
}
