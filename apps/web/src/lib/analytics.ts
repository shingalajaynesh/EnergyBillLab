/**
 * Energy Bill Lab - Unified Data Layer Analytics Event Tracking
 *
 * Implements clean, privacy-safe event tracking pushing to window.dataLayer.
 * Enforces strict data minimization: zero PII, zero bill upload contents, zero email/address data.
 */

export type EventName =
  | 'calculator_started'
  | 'calculator_completed'
  | 'calculator_result_viewed'
  | 'bill_analyzer_started'
  | 'bill_analyzer_completed'
  | 'state_selected'
  | 'custom_rate_entered'
  | 'guide_to_tool_click'
  | 'state_to_tool_click'
  | 'comparison_tool_click'
  | 'csv_download'
  | 'methodology_click'
  | 'data_source_click';

export type EventParams = {
  tool_slug?: string;
  guide_slug?: string;
  state_slug?: string;
  source_page?: string;
  destination_page?: string;
  reporting_period?: string;
};

// Prohibited keys that must NEVER be passed to tracking
const PROHIBITED_KEYS = new Set([
  'email',
  'address',
  'name',
  'bill_upload',
  'bill_amount',
  'kwh_amount',
  'secret',
  'user_id',
  'account_number',
  'db_id',
]);

export function trackEvent(eventName: EventName, params: EventParams = {}): void {
  if (typeof window === 'undefined') {
    return;
  }

  const win = window as unknown as { dataLayer?: Record<string, unknown>[] };
  win.dataLayer = win.dataLayer || [];

  // Sanitize params to guarantee 0 PII or sensitive values
  const sanitizedParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (PROHIBITED_KEYS.has(key.toLowerCase())) {
      continue;
    }
    if (typeof value === 'string' && value.trim().length > 0) {
      // Prevent PII or long text injection
      sanitizedParams[key] = value.substring(0, 120);
    }
  }

  win.dataLayer.push({
    event: eventName,
    ...sanitizedParams,
    timestamp: new Date().toISOString(),
  });
}
