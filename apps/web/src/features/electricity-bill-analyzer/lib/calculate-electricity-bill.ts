import type {
  CalculationResult,
  ComparisonDecomposition,
  CurrentPeriodMetrics,
  ElectricityBillInput,
} from '../types/electricity-bill-types';
import { classifyBillChange } from './classify-bill-change';

function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

export function calculateElectricityBill(input: ElectricityBillInput): CalculationResult {
  const currentBillCents = dollarsToCents(input.currentBill);
  const currentKwh = input.currentKwh;
  const currentDays = input.currentDays;

  // 1. Current Period Metrics
  const allInEffectiveCostPerKwh = currentBillCents / currentKwh / 100;
  const dailyUsageKwh = currentKwh / currentDays;
  const estimated30DayUsageKwh = dailyUsageKwh * 30;
  const estimated30DayCost = ((currentBillCents / currentDays) * 30) / 100;

  let variableSubtotal: number | undefined;
  let estimatedVariableCostPerKwh: number | undefined;

  if (
    input.currentFixedCharge !== undefined ||
    input.currentTaxesAndFees !== undefined ||
    input.currentCredits !== undefined
  ) {
    const fixedCents = dollarsToCents(input.currentFixedCharge ?? 0);
    const taxesCents = dollarsToCents(input.currentTaxesAndFees ?? 0);
    const creditsCents = dollarsToCents(input.currentCredits ?? 0);
    const knownNonEnergyCents = Math.max(0, fixedCents + taxesCents - creditsCents);
    const varCents = Math.max(0, currentBillCents - knownNonEnergyCents);

    variableSubtotal = varCents / 100;
    estimatedVariableCostPerKwh = varCents / currentKwh / 100;
  }

  const currentMetrics: CurrentPeriodMetrics = {
    currentBill: input.currentBill,
    currentKwh: input.currentKwh,
    allInEffectiveCostPerKwh,
    dailyUsageKwh,
    estimated30DayUsageKwh,
    estimated30DayCost,
    variableSubtotal,
    estimatedVariableCostPerKwh,
  };

  // 2. Optional Comparison Metrics
  let comparison: ComparisonDecomposition | undefined;

  const hasPrevious =
    input.previousBill !== undefined &&
    input.previousKwh !== undefined &&
    input.previousDays !== undefined &&
    input.previousBill > 0 &&
    input.previousKwh > 0 &&
    input.previousDays > 0;

  if (hasPrevious) {
    const previousBillCents = dollarsToCents(input.previousBill!);
    const previousKwh = input.previousKwh!;
    const previousDays = input.previousDays!;

    const previousAllInEffectiveCostPerKwh = previousBillCents / previousKwh / 100;
    const previousDailyUsageKwh = previousKwh / previousDays;

    const billChangeCents = currentBillCents - previousBillCents;
    const billChangeDollar = billChangeCents / 100;
    const billChangePercent = (billChangeCents / previousBillCents) * 100;

    const kwhChange = currentKwh - previousKwh;
    const kwhChangePercent = (kwhChange / previousKwh) * 100;

    const dailyUsageChangeKwh = dailyUsageKwh - previousDailyUsageKwh;
    const dailyUsageChangePercent = (dailyUsageChangeKwh / previousDailyUsageKwh) * 100;

    const effectiveCostChangePerKwh = allInEffectiveCostPerKwh - previousAllInEffectiveCostPerKwh;
    const effectiveCostChangePercent =
      (effectiveCostChangePerKwh / previousAllInEffectiveCostPerKwh) * 100;

    const daysDifference = currentDays - previousDays;

    // Billing-day normalization with clean rounding defense
    const adjustedExpectedCurrentKwh =
      Math.round((previousKwh / previousDays) * currentDays * 10000) / 10000;
    const normalizedKwhDifference =
      Math.round((currentKwh - adjustedExpectedCurrentKwh) * 10000) / 10000;

    // Usage vs residual rate/fee effect in cents (Reconciliation guarantee)
    const previousRateCentsPerKwh = previousBillCents / previousKwh;
    const estimatedUsageEffectCents = Math.round(normalizedKwhDifference * previousRateCentsPerKwh);
    const estimatedRateFeeOtherEffectCents = billChangeCents - estimatedUsageEffectCents;

    const estimatedUsageEffectDollar = estimatedUsageEffectCents / 100;
    const estimatedRateFeeOtherEffectDollar = estimatedRateFeeOtherEffectCents / 100;

    // Verification check: usage effect + rate/fee effect MUST equal total bill change
    const reconciliationReconciles =
      estimatedUsageEffectCents + estimatedRateFeeOtherEffectCents === billChangeCents;

    const classification = classifyBillChange({
      billChangeDollar,
      estimatedUsageEffectDollar,
      estimatedRateFeeOtherEffectDollar,
    });

    comparison = {
      hasComparison: true,
      previousAllInEffectiveCostPerKwh,
      previousDailyUsageKwh,
      billChangeDollar,
      billChangePercent,
      kwhChange,
      kwhChangePercent,
      dailyUsageChangeKwh,
      dailyUsageChangePercent,
      effectiveCostChangePerKwh,
      effectiveCostChangePercent,
      daysDifference,
      adjustedExpectedCurrentKwh,
      normalizedKwhDifference,
      estimatedUsageEffectDollar,
      estimatedRateFeeOtherEffectDollar,
      reconciliationReconciles,
      classification,
    };
  }

  // 3. Generate plain-English insights & checklist
  const { checklist, insights } = generateInsightsAndChecklist(currentMetrics, comparison);

  return {
    current: currentMetrics,
    comparison,
    insights,
    checklist,
  };
}

function generateInsightsAndChecklist(
  current: CurrentPeriodMetrics,
  comparison?: ComparisonDecomposition,
) {
  const insights: string[] = [];
  const checklist: string[] = [];

  if (!comparison || !comparison.hasComparison) {
    insights.push(
      `Your current all-in effective cost is $${current.allInEffectiveCostPerKwh.toFixed(3)} per kWh, averaging ${current.dailyUsageKwh.toFixed(1)} kWh/day.`,
    );
    insights.push(
      `Based on your daily average, an estimated 30-day billing cycle would use ~${Math.round(current.estimated30DayUsageKwh)} kWh costing ~$${current.estimated30DayCost.toFixed(2)}.`,
    );

    checklist.push(
      'Review your current effective cost per kWh against your electricity supply agreement.',
      'Check daily average usage (kWh/day) as your primary home energy benchmark.',
      'Enter previous billing details to unlock detailed usage vs. rate decomposition.',
      'Separate fixed monthly customer charges from variable kWh usage fees.',
    );

    return { insights, checklist };
  }

  const {
    billChangeDollar,
    billChangePercent,
    classification,
    daysDifference,
    estimatedRateFeeOtherEffectDollar,
    estimatedUsageEffectDollar,
    normalizedKwhDifference,
  } = comparison;

  const isIncrease = billChangeDollar > 0;
  const absChangeDollar = Math.abs(billChangeDollar);

  if (Math.abs(billChangeDollar) < 5) {
    insights.push(
      `Your bill changed by $${billChangeDollar > 0 ? '+' : ''}${billChangeDollar.toFixed(2)} (${billChangePercent > 0 ? '+' : ''}${billChangePercent.toFixed(1)}%), which represents a small variance.`,
    );
  } else if (isIncrease) {
    insights.push(
      `Your bill increased by +$${absChangeDollar.toFixed(2)} (+${billChangePercent.toFixed(1)}%) compared to the previous period.`,
    );
  } else {
    insights.push(
      `Your bill decreased by -$${absChangeDollar.toFixed(2)} (${billChangePercent.toFixed(1)}%) compared to the previous period.`,
    );
  }

  if (daysDifference !== 0) {
    insights.push(
      `The current billing statement covers ${Math.abs(daysDifference)} ${daysDifference > 0 ? 'more' : 'fewer'} calendar days than the previous statement. Billing-day normalization was applied to isolate true consumption changes.`,
    );
  }

  if (Math.abs(normalizedKwhDifference) > 1) {
    const usageImpact = estimatedUsageEffectDollar;
    insights.push(
      `Billing-day-adjusted usage difference: ${normalizedKwhDifference > 0 ? '+' : ''}${Math.round(normalizedKwhDifference)} kWh (Estimated dollar impact: ${usageImpact >= 0 ? '+' : ''}$${usageImpact.toFixed(2)}).`,
    );
  }

  if (Math.abs(estimatedRateFeeOtherEffectDollar) >= 1) {
    const rateImpact = estimatedRateFeeOtherEffectDollar;
    insights.push(
      `Estimated impact of effective rate, fixed fee, tax, or credit changes: ${rateImpact >= 0 ? '+' : ''}$${rateImpact.toFixed(2)}.`,
    );
  }

  // Populate checklist based on classification
  switch (classification) {
    case 'USAGE_PRIMARY':
      checklist.push(
        'Check heating and cooling degree days: HVAC systems are the single largest driver of summer and winter usage spikes.',
        'Compare billing period length: Verify if the current statement covers more calendar days than the previous statement.',
        'Review major appliance runtime: Dehumidifiers, space heaters, pool pumps, and EV chargers significantly affect daily kWh.',
        'Check for estimated vs. actual meter readings: A catch-up reading after multiple estimated bills can create a sudden usage spike.',
      );
      break;

    case 'RATE_FEE_PRIMARY':
      checklist.push(
        'Compare effective cost per kWh: Check if your electricity supply rate, fuel adjustment, or power-cost rider increased.',
        'Review fixed monthly charges: Look for increases in customer service charges, meter fees, or fixed delivery fees.',
        'Inspect taxes and regulatory surcharges: State, local, or utility environmental fees can change between billing cycles.',
        'Check seasonal or time-of-use pricing tiers: Summer rate tiers or peak-hour pricing can raise cost even if usage is constant.',
        'Verify previous credits: Check if a previous billing credit expired or was applied only to the earlier statement.',
      );
      break;

    case 'BOTH_SIGNIFICANT':
      checklist.push(
        'Check both HVAC runtime and rate structure changes: Seasonal weather changes often coincide with summer peak rate adjustments.',
        'Compare daily average usage: Look at kWh/day rather than total kWh to isolate billing period length differences.',
        'Inspect tier thresholds: Higher consumption can push usage into higher price per kWh tiers.',
        'Review fixed and variable line items: Compare detailed bill subtotals side by side.',
      );
      break;

    case 'SMALL_CHANGE':
      checklist.push(
        'Track monthly usage trends: Small variations are normal and often reflect minor weather or calendar day differences.',
        'Review effective cost per kWh: Verify that your rate tier remains stable.',
        'Maintain baseline efficiency: Simple adjustments like thermostat scheduling help prevent future spikes.',
      );
      break;

    default:
      checklist.push(
        'Inspect actual billing statements side-by-side to verify line-item charges.',
        'Contact your utility provider if your bill contains unexplained fees or rate code changes.',
      );
      break;
  }

  return { insights, checklist };
}
