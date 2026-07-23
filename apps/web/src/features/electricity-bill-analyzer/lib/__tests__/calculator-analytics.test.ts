import { describe, expect, it } from 'vitest';

import { createBillAnalyzerAnalyticsPayload } from '../calculator-analytics';

describe('createBillAnalyzerAnalyticsPayload', () => {
  it('builds privacy-safe payload for electricity bill analyzer without raw financial inputs', () => {
    const payload = createBillAnalyzerAnalyticsPayload({
      event: 'electricity_bill_analyzer_completed',
      hasComparison: true,
      hasAdvancedInputs: true,
      classification: 'USAGE_DRIVEN',
    });

    expect(payload).toEqual({
      event: 'electricity_bill_analyzer_completed',
      calculator_name: 'electricity-bill-analyzer',
      comparison_used: true,
      advanced_inputs_used: true,
      result_classification: 'USAGE_DRIVEN',
    });
  });

  it('provides default fallback flags', () => {
    const payload = createBillAnalyzerAnalyticsPayload({
      event: 'electricity_bill_analyzer_reset',
    });

    expect(payload).toEqual({
      event: 'electricity_bill_analyzer_reset',
      calculator_name: 'electricity-bill-analyzer',
      comparison_used: false,
      advanced_inputs_used: false,
      result_classification: 'NONE',
    });
  });
});
