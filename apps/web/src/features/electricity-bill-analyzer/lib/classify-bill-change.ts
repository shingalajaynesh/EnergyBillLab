import { BILL_ANALYZER_CONSTANTS } from '../constants/electricity-bill-constants';
import type { InsightClassification } from '../types/electricity-bill-types';

type ClassificationInput = {
  billChangeDollar: number;
  estimatedUsageEffectDollar: number;
  estimatedRateFeeOtherEffectDollar: number;
};

export function classifyBillChange({
  billChangeDollar,
  estimatedRateFeeOtherEffectDollar,
  estimatedUsageEffectDollar,
}: ClassificationInput): InsightClassification {
  const absBillChange = Math.abs(billChangeDollar);

  if (absBillChange < BILL_ANALYZER_CONSTANTS.SMALL_CHANGE_THRESHOLD_DOLLARS) {
    return 'SMALL_CHANGE';
  }

  const absUsage = Math.abs(estimatedUsageEffectDollar);
  const absRateFee = Math.abs(estimatedRateFeeOtherEffectDollar);

  // If usage effect dominates (>= 65% of combined absolute effect)
  const totalAbsEffect = absUsage + absRateFee;
  if (totalAbsEffect === 0) return 'SMALL_CHANGE';

  const usageRatio = absUsage / totalAbsEffect;
  const rateFeeRatio = absRateFee / totalAbsEffect;

  if (usageRatio >= BILL_ANALYZER_CONSTANTS.DOMINANCE_RATIO) {
    return 'USAGE_PRIMARY';
  }

  if (rateFeeRatio >= BILL_ANALYZER_CONSTANTS.DOMINANCE_RATIO) {
    return 'RATE_FEE_PRIMARY';
  }

  return 'BOTH_SIGNIFICANT';
}
