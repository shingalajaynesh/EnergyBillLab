import type { InsightClassification } from '../types/electricity-bill-types';

export const BILL_ANALYZER_CONSTANTS = {
  // Input constraints
  MIN_BILL_DOLLARS: 0.01,
  MAX_BILL_DOLLARS: 100000,
  MIN_KWH: 0.01,
  MAX_KWH: 1000000,
  MIN_DAYS: 1,
  MAX_DAYS: 120,

  // Thresholds for classification
  SMALL_CHANGE_THRESHOLD_DOLLARS: 5.0, // Bill change under $5 is treated as small change
  DOMINANCE_RATIO: 0.65, // If one effect accounts for >= 65% of absolute bill change, it dominates
} as const;

export const CLASSIFICATION_MESSAGES: Record<InsightClassification, string> = {
  USAGE_PRIMARY:
    'Your bill increased primarily because your daily electricity usage was higher during this billing period.',
  RATE_FEE_PRIMARY:
    'Your electricity usage was similar or lower, so changes in effective rate, fixed charges, taxes, or other bill items appear to explain the difference.',
  BOTH_SIGNIFICANT:
    'Both higher daily electricity usage and higher effective cost/fees contributed significantly to your bill increase.',
  SMALL_CHANGE: 'The total bill change between these two billing periods is relatively small.',
  NO_COMPARISON:
    'Showing current period cost estimates. Enter previous period billing details to calculate a comparison breakdown.',
};

export const CHECKLIST_ITEMS: Record<InsightClassification, string[]> = {
  USAGE_PRIMARY: [
    'Check heating and cooling degree days: HVAC systems are the single largest driver of summer and winter usage spikes.',
    'Compare billing period length: Verify if the current statement covers more calendar days than the previous statement.',
    'Review major appliance runtime: Dehumidifiers, space heaters, pool pumps, and EV chargers significantly affect daily kWh.',
    'Check for estimated vs. actual meter readings: A catch-up reading after multiple estimated bills can create a sudden usage spike.',
  ],
  RATE_FEE_PRIMARY: [
    'Compare effective cost per kWh: Check if your electricity rate, fuel cost adjustment, or power-cost rider increased.',
    'Review fixed monthly charges: Look for increases in customer service charges, meter fees, or fixed delivery fees.',
    'Inspect taxes and regulatory surcharges: State, local, or utility environmental fees can change between billing cycles.',
    'Check seasonal or time-of-use pricing tiers: Summer rate tiers or peak-hour pricing can raise cost even if usage is constant.',
    'Verify previous credits: Check if a previous billing credit expired or was applied only to the earlier statement.',
  ],
  BOTH_SIGNIFICANT: [
    'Check both HVAC runtime and rate structure changes: Seasonal weather changes often coincide with summer peak rate adjustments.',
    'Compare daily average usage: Look at kWh/day rather than total kWh to isolate billing period length differences.',
    'Inspect tier thresholds: Higher consumption can push usage into higher price per kWh tiers.',
    'Review fixed and variable line items: Compare detailed bill subtotals side by side.',
  ],
  SMALL_CHANGE: [
    'Track monthly usage trends: Small variations are normal and often reflect minor weather or calendar day differences.',
    'Review effective cost per kWh: Verify that your rate tier remains stable.',
    'Maintain baseline efficiency: Simple adjustments like thermostat scheduling help prevent future spikes.',
  ],
  NO_COMPARISON: [
    'Review your current effective cost per kWh: Compare it with your electricity supplier agreement or rate plan.',
    'Check daily average usage (kWh/day): This is the best benchmark for tracking home energy consumption.',
    'Keep previous utility statements: Entering a previous bill allows automatic decomposition into usage vs. rate effects.',
    'Inspect fixed fees vs. variable charges: Separate recurring monthly customer charges from kWh supply fees.',
  ],
};
