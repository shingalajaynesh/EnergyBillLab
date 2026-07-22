declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

type TrackCalculatorEventOptions = {
  event:
    | 'electricity_bill_analyzer_started'
    | 'electricity_bill_analyzer_completed'
    | 'electricity_bill_analyzer_reset'
    | 'advanced_inputs_opened';
  hasComparison?: boolean;
  hasAdvancedInputs?: boolean;
  classification?: string;
};

export function trackCalculatorEvent({
  classification,
  event,
  hasAdvancedInputs = false,
  hasComparison = false,
}: TrackCalculatorEventOptions): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  // Pushing ONLY privacy-safe neutral metadata. ZERO user financial/kWh inputs are included.
  window.dataLayer.push({
    event,
    calculator_name: 'electricity-bill-analyzer',
    comparison_used: hasComparison,
    advanced_inputs_used: hasAdvancedInputs,
    result_classification: classification ?? 'NONE',
  });
}
