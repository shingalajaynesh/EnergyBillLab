export type ElectricityBillInput = {
  // Basic mode
  currentBill: number;
  currentKwh: number;
  currentDays: number;
  previousBill?: number;
  previousKwh?: number;
  previousDays?: number;

  // Detailed mode (optional)
  currentFixedCharge?: number;
  currentTaxesAndFees?: number;
  currentCredits?: number;
  previousFixedCharge?: number;
  previousTaxesAndFees?: number;
  previousCredits?: number;
};

export type CurrentPeriodMetrics = {
  allInEffectiveCostPerKwh: number;
  dailyUsageKwh: number;
  estimated30DayUsageKwh: number;
  estimated30DayCost: number;
  variableSubtotal?: number;
  estimatedVariableCostPerKwh?: number;
};

export type InsightClassification =
  'USAGE_PRIMARY' | 'RATE_FEE_PRIMARY' | 'BOTH_SIGNIFICANT' | 'SMALL_CHANGE' | 'NO_COMPARISON';

export type ComparisonDecomposition = {
  hasComparison: boolean;
  previousAllInEffectiveCostPerKwh: number;
  previousDailyUsageKwh: number;
  billChangeDollar: number;
  billChangePercent: number;
  kwhChange: number;
  kwhChangePercent: number;
  dailyUsageChangeKwh: number;
  dailyUsageChangePercent: number;
  effectiveCostChangePerKwh: number;
  effectiveCostChangePercent: number;
  daysDifference: number;
  adjustedExpectedCurrentKwh: number;
  normalizedKwhDifference: number;
  estimatedUsageEffectDollar: number;
  estimatedRateFeeOtherEffectDollar: number;
  reconciliationReconciles: boolean;
  classification: InsightClassification;
};

export type CalculationResult = {
  current: CurrentPeriodMetrics;
  comparison?: ComparisonDecomposition;
  insights: string[];
  checklist: string[];
};
