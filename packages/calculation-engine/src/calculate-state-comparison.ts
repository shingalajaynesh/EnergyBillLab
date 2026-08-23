/**
 * @file calculate-state-comparison.ts
 * Pure TypeScript comparison engine comparing energy rates, household bills,
 * and appliance operating costs across any two U.S. states.
 */

export interface StateProfileInput {
  name: string;
  code: string;
  slug: string;
  electricityRateCentsPerKwh: number;
  gasPriceDollarsPerMcf?: number | null;
  gasPriceDollarsPerTherm?: number | null;
}

export interface CalculateStateComparisonInput {
  stateA: StateProfileInput;
  stateB: StateProfileInput;
  monthlyKwhBaseline?: number; // default 900 kWh
  monthlyThermsBaseline?: number; // default 60 therms
}

export interface ApplianceCostComparisonItem {
  id: string;
  title: string;
  baselineUnitLabel: string;
  stateACost: number;
  stateBCost: number;
  differenceDollars: number;
  cheaperState: 'stateA' | 'stateB' | 'equal';
  description: string;
}

export interface CalculateStateComparisonOutput {
  stateA: StateProfileInput;
  stateB: StateProfileInput;
  electricity: {
    rateStateA: number;
    rateStateB: number;
    rateDeltaCents: number; // stateB - stateA
    rateDeltaPercent: number;
    monthlyBillStateA: number;
    monthlyBillStateB: number;
    monthlyBillDifference: number;
    annualBillDifference: number;
    cheaperState: 'stateA' | 'stateB' | 'equal';
    cheaperStateName: string;
  };
  naturalGas: {
    available: boolean;
    thermRateStateA: number | null;
    thermRateStateB: number | null;
    thermDeltaDollars: number | null;
    thermDeltaPercent: number | null;
    monthlyGasBillStateA: number | null;
    monthlyGasBillStateB: number | null;
    monthlyGasBillDifference: number | null;
    annualGasBillDifference: number | null;
    cheaperState: 'stateA' | 'stateB' | 'equal' | null;
  };
  totalHouseholdCombined: {
    available: boolean;
    monthlyCombinedStateA: number;
    monthlyCombinedStateB: number;
    monthlyCombinedDifference: number;
    annualCombinedDifference: number;
    cheaperState: 'stateA' | 'stateB' | 'equal';
  };
  appliances: ApplianceCostComparisonItem[];
  summaryVerdict: string;
}

export function calculateStateComparison(
  input: CalculateStateComparisonInput
): CalculateStateComparisonOutput {
  const kwhBaseline = Math.max(100, input.monthlyKwhBaseline ?? 900);
  const thermBaseline = Math.max(10, input.monthlyThermsBaseline ?? 60);

  const rateA = Math.max(0.01, input.stateA.electricityRateCentsPerKwh);
  const rateB = Math.max(0.01, input.stateB.electricityRateCentsPerKwh);

  // Electricity calculation
  const monthlyElecA = (kwhBaseline * rateA) / 100;
  const monthlyElecB = (kwhBaseline * rateB) / 100;
  const elecDiff = monthlyElecB - monthlyElecA;
  const rateDeltaCents = rateB - rateA;
  const rateDeltaPercent = rateA > 0 ? (rateDeltaCents / rateA) * 100 : 0;
  const annualElecDiff = Math.abs(elecDiff) * 12;

  let cheaperElec: 'stateA' | 'stateB' | 'equal' = 'equal';
  let cheaperStateName = 'Both states have identical rates';
  if (rateA < rateB) {
    cheaperElec = 'stateA';
    cheaperStateName = input.stateA.name;
  } else if (rateB < rateA) {
    cheaperElec = 'stateB';
    cheaperStateName = input.stateB.name;
  }

  // Natural gas calculation
  const thermA =
    input.stateA.gasPriceDollarsPerTherm ??
    (input.stateA.gasPriceDollarsPerMcf ? input.stateA.gasPriceDollarsPerMcf / 10.37 : null);
  const thermB =
    input.stateB.gasPriceDollarsPerTherm ??
    (input.stateB.gasPriceDollarsPerMcf ? input.stateB.gasPriceDollarsPerMcf / 10.37 : null);

  const gasAvailable = thermA !== null && thermB !== null;
  let thermDeltaDollars: number | null = null;
  let thermDeltaPercent: number | null = null;
  let monthlyGasA: number | null = null;
  let monthlyGasB: number | null = null;
  let monthlyGasDiff: number | null = null;
  let annualGasDiff: number | null = null;
  let cheaperGas: 'stateA' | 'stateB' | 'equal' | null = null;

  if (gasAvailable && thermA !== null && thermB !== null) {
    thermDeltaDollars = thermB - thermA;
    thermDeltaPercent = thermA > 0 ? (thermDeltaDollars / thermA) * 100 : 0;
    monthlyGasA = thermBaseline * thermA;
    monthlyGasB = thermBaseline * thermB;
    monthlyGasDiff = monthlyGasB - monthlyGasA;
    annualGasDiff = Math.abs(monthlyGasDiff) * 12;

    if (thermA < thermB) cheaperGas = 'stateA';
    else if (thermB < thermA) cheaperGas = 'stateB';
    else cheaperGas = 'equal';
  }

  // Combined Household Energy (Elec + Gas)
  const combinedMonthlyA = monthlyElecA + (monthlyGasA ?? 0);
  const combinedMonthlyB = monthlyElecB + (monthlyGasB ?? 0);
  const combinedMonthlyDiff = combinedMonthlyB - combinedMonthlyA;
  const annualCombinedDiff = Math.abs(combinedMonthlyDiff) * 12;
  const cheaperCombined: 'stateA' | 'stateB' | 'equal' =
    combinedMonthlyA < combinedMonthlyB
      ? 'stateA'
      : combinedMonthlyB < combinedMonthlyA
        ? 'stateB'
        : 'equal';

  // Appliance Benchmarks Side-by-Side
  // 1. Central AC (typical 600 kWh/mo summer cooling)
  const acKwh = 600;
  const acCostA = (acKwh * rateA) / 100;
  const acCostB = (acKwh * rateB) / 100;

  // 2. Electric Water Heater (350 kWh/mo)
  const whKwh = 350;
  const whCostA = (whKwh * rateA) / 100;
  const whCostB = (whKwh * rateB) / 100;

  // 3. EV Charging (1,000 miles @ 3.0 mi/kWh = 333 kWh)
  const evKwh = 333;
  const evCostA = (evKwh * rateA) / 100;
  const evCostB = (evKwh * rateB) / 100;

  // 4. Electric Clothes Dryer (20 loads/mo @ 3.3 kWh = 66 kWh)
  const dryerKwh = 66;
  const dryerCostA = (dryerKwh * rateA) / 100;
  const dryerCostB = (dryerKwh * rateB) / 100;

  // 5. Space Heater (1.5 kW x 5h/day x 30d = 225 kWh)
  const heaterKwh = 225;
  const heaterCostA = (heaterKwh * rateA) / 100;
  const heaterCostB = (heaterKwh * rateB) / 100;

  const appliances: ApplianceCostComparisonItem[] = [
    {
      id: 'central_ac',
      title: 'Central Air Conditioning (Summer Month)',
      baselineUnitLabel: '600 kWh / month (3-Ton AC @ 6h/day)',
      stateACost: acCostA,
      stateBCost: acCostB,
      differenceDollars: Math.abs(acCostB - acCostA),
      cheaperState: acCostA < acCostB ? 'stateA' : acCostB < acCostA ? 'stateB' : 'equal',
      description: 'Typical 3-ton central cooling system operating 6 hours daily during warm months.',
    },
    {
      id: 'electric_water_heater',
      title: 'Electric Water Heater',
      baselineUnitLabel: '350 kWh / month (Family of 3–4)',
      stateACost: whCostA,
      stateBCost: whCostB,
      differenceDollars: Math.abs(whCostB - whCostA),
      cheaperState: whCostA < whCostB ? 'stateA' : whCostB < whCostA ? 'stateB' : 'equal',
      description: 'Standard 50-gallon dual-element electric resistance water heater baseline.',
    },
    {
      id: 'ev_home_charging',
      title: 'Electric Vehicle Home Charging',
      baselineUnitLabel: '1,000 Miles Driven (~333 kWh)',
      stateACost: evCostA,
      stateBCost: evCostB,
      differenceDollars: Math.abs(evCostB - evCostA),
      cheaperState: evCostA < evCostB ? 'stateA' : evCostB < evCostA ? 'stateB' : 'equal',
      description: 'Level 2 home charging covering 1,000 miles of driving at 3.0 miles per kWh.',
    },
    {
      id: 'electric_clothes_dryer',
      title: 'Electric Clothes Dryer',
      baselineUnitLabel: '20 Loads / month (~66 kWh)',
      stateACost: dryerCostA,
      stateBCost: dryerCostB,
      differenceDollars: Math.abs(dryerCostB - dryerCostA),
      cheaperState: dryerCostA < dryerCostB ? 'stateA' : dryerCostB < dryerCostA ? 'stateB' : 'equal',
      description: 'Standard 240V residential electric dryer running 5 loads per week.',
    },
    {
      id: 'portable_space_heater',
      title: 'Portable Space Heater',
      baselineUnitLabel: '225 kWh / month (1,500W @ 5h/day)',
      stateACost: heaterCostA,
      stateBCost: heaterCostB,
      differenceDollars: Math.abs(heaterCostB - heaterCostA),
      cheaperState: heaterCostA < heaterCostB ? 'stateA' : heaterCostB < heaterCostA ? 'stateB' : 'equal',
      description: 'Single 1,500W electric resistance ceramic heater running 5 hours per day.',
    },
  ];

  // Generate clear summary verdict
  const higherState = rateA > rateB ? input.stateA.name : input.stateB.name;
  const lowerState = rateA > rateB ? input.stateB.name : input.stateA.name;
  const lowerRate = Math.min(rateA, rateB);
  const percentHigher = lowerRate > 0 ? (Math.abs(rateA - rateB) / lowerRate) * 100 : 0;

  let summaryVerdict = `${higherState} electricity rates are ${percentHigher.toFixed(1)}% higher than in ${lowerState}. For a household using ${kwhBaseline} kWh per month, living in ${lowerState} saves approximately $${Math.abs(elecDiff).toFixed(2)} per month ($${annualElecDiff.toFixed(2)} per year) on electric bills alone.`;

  if (gasAvailable && monthlyGasDiff !== null) {
    summaryVerdict += ` For combined heating and power (900 kWh + 60 therms), ${cheaperCombined === 'stateA' ? input.stateA.name : input.stateB.name} saves $${Math.abs(combinedMonthlyDiff).toFixed(2)}/month ($${annualCombinedDiff.toFixed(2)}/year).`;
  }

  return {
    stateA: input.stateA,
    stateB: input.stateB,
    electricity: {
      rateStateA: rateA,
      rateStateB: rateB,
      rateDeltaCents,
      rateDeltaPercent,
      monthlyBillStateA: monthlyElecA,
      monthlyBillStateB: monthlyElecB,
      monthlyBillDifference: elecDiff,
      annualBillDifference: annualElecDiff,
      cheaperState: cheaperElec,
      cheaperStateName,
    },
    naturalGas: {
      available: gasAvailable,
      thermRateStateA: thermA,
      thermRateStateB: thermB,
      thermDeltaDollars,
      thermDeltaPercent,
      monthlyGasBillStateA: monthlyGasA,
      monthlyGasBillStateB: monthlyGasB,
      monthlyGasBillDifference: monthlyGasDiff,
      annualGasBillDifference: annualGasDiff,
      cheaperState: cheaperGas,
    },
    totalHouseholdCombined: {
      available: gasAvailable,
      monthlyCombinedStateA: combinedMonthlyA,
      monthlyCombinedStateB: combinedMonthlyB,
      monthlyCombinedDifference: combinedMonthlyDiff,
      annualCombinedDifference: annualCombinedDiff,
      cheaperState: cheaperCombined,
    },
    appliances,
    summaryVerdict,
  };
}
