export type AcCalculationMode = 'wattage' | 'capacity_eer';

export type AcType = 'window' | 'portable' | 'minisplit' | 'central' | 'custom';

export type AcCostInput = {
  /** Calculation method mode */
  mode: AcCalculationMode;
  /** Electrical input power rating in Watts (used in wattage mode) */
  wattage?: number;
  /** Cooling capacity in BTU/hour (used in capacity_eer mode) */
  coolingCapacityBtu?: number;
  /** Energy Efficiency Ratio in BTU per Watt-Hour (used in capacity_eer mode) */
  eer?: number;
  /** Operating duration per day in Hours (0 - 24) */
  hoursPerDay: number;
  /** Duration of calculation period in Days (1 - 365) */
  days: number;
  /** Electricity tariff rate in Cents per kilowatt-hour (¢/kWh) */
  rateCentsPerKwh: number;
  /** Compressor active duty cycle percentage (0 - 100%) */
  dutyCyclePercent?: number;
  /** AC Equipment Category */
  acType?: AcType;
};

export type AcCostScenario = {
  label: string;
  description: string;
  hoursPerDay: number;
  dutyCyclePercent: number;
  periodKwh: number;
  periodCostUsd: number;
  differenceUsd: number;
};

export type AcCostResult = {
  mode: AcCalculationMode;
  acType: AcType;
  inputWatts: number;
  effectiveWatts: number;
  hourlyKwh: number;
  hourlyCostUsd: number;
  dailyKwh: number;
  dailyCostUsd: number;
  periodKwh: number;
  periodCostUsd: number;
  monthlyKwh: number;
  monthlyCostUsd: number;
  annualKwh: number;
  annualCostUsd: number;
  rateCentsPerKwhUsed: number;
  dutyCyclePercentUsed: number;
  derivedBtu?: number;
  derivedTons?: number;
  scenarios: AcCostScenario[];
  workedExample: {
    formulaSummary: string;
    step1Watts: string;
    step2Kwh: string;
    step3Cost: string;
  };
};

export class AcCalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AcCalculationError';
  }
}

/**
 * Calculates electricity consumption (kWh) and operating cost (USD)
 * for air conditioning units using wattage or BTU/EER efficiency ratings.
 */
export function calculateAcCost(input: AcCostInput): AcCostResult {
  const {
    mode,
    wattage,
    coolingCapacityBtu,
    eer,
    hoursPerDay,
    days,
    rateCentsPerKwh,
    dutyCyclePercent = 60,
    acType = 'window',
  } = input;

  if (
    typeof hoursPerDay !== 'number' ||
    isNaN(hoursPerDay) ||
    hoursPerDay < 0 ||
    hoursPerDay > 24
  ) {
    throw new AcCalculationError('Hours per day must be between 0 and 24 hours.');
  }

  if (typeof days !== 'number' || isNaN(days) || days <= 0 || days > 365) {
    throw new AcCalculationError('Days must be a positive number between 1 and 365 days.');
  }

  if (
    typeof rateCentsPerKwh !== 'number' ||
    isNaN(rateCentsPerKwh) ||
    rateCentsPerKwh <= 0 ||
    rateCentsPerKwh > 500
  ) {
    throw new AcCalculationError(
      'Electricity rate must be a positive number in cents/kWh (e.g. 16.5).',
    );
  }

  if (
    typeof dutyCyclePercent !== 'number' ||
    isNaN(dutyCyclePercent) ||
    dutyCyclePercent < 0 ||
    dutyCyclePercent > 100
  ) {
    throw new AcCalculationError('Duty cycle must be between 0% and 100%.');
  }

  let inputWatts = 0;
  let step1Watts = '';
  let derivedBtu: number | undefined;
  let derivedTons: number | undefined;

  if (mode === 'capacity_eer') {
    if (
      typeof coolingCapacityBtu !== 'number' ||
      isNaN(coolingCapacityBtu) ||
      coolingCapacityBtu <= 0 ||
      coolingCapacityBtu > 120000
    ) {
      throw new AcCalculationError('Cooling capacity must be between 1,000 and 120,000 BTU/hr.');
    }
    if (typeof eer !== 'number' || isNaN(eer) || eer <= 0 || eer > 40) {
      throw new AcCalculationError('EER rating must be a positive number between 1 and 40 BTU/Wh.');
    }

    inputWatts = coolingCapacityBtu / eer;
    derivedBtu = coolingCapacityBtu;
    derivedTons = roundToTwoDecimals(coolingCapacityBtu / 12000);
    step1Watts = `Input Watts = Cooling Capacity (${coolingCapacityBtu.toLocaleString()} BTU/hr) ÷ EER (${eer}) = ${inputWatts.toFixed(1)} W`;
  } else {
    if (typeof wattage !== 'number' || isNaN(wattage) || wattage <= 0 || wattage > 20000) {
      throw new AcCalculationError(
        'AC electrical input wattage must be a positive number up to 20,000 W.',
      );
    }
    inputWatts = wattage;
    step1Watts = `Input Watts = ${inputWatts} W (Direct electrical input specified)`;
  }

  const dutyCycleFactor = dutyCyclePercent / 100;
  const effectiveWatts = inputWatts * dutyCycleFactor;

  // Energy & Cost Metrics
  const hourlyKwh = effectiveWatts / 1000;
  const hourlyCostUsd = (hourlyKwh * rateCentsPerKwh) / 100;

  const dailyKwh = hourlyKwh * hoursPerDay;
  const dailyCostUsd = (dailyKwh * rateCentsPerKwh) / 100;

  const periodKwh = dailyKwh * days;
  const periodCostUsd = (periodKwh * rateCentsPerKwh) / 100;

  const monthlyKwh = dailyKwh * 30;
  const monthlyCostUsd = (monthlyKwh * rateCentsPerKwh) / 100;

  const annualKwh = dailyKwh * 365;
  const annualCostUsd = (annualKwh * rateCentsPerKwh) / 100;

  // Efficiency & Runtime Comparison Scenarios
  const scenarioLessOneHourHours = Math.max(0, hoursPerDay - 1);
  const scenarioLessOneHourKwh = (effectiveWatts / 1000) * scenarioLessOneHourHours * days;
  const scenarioLessOneHourCost = (scenarioLessOneHourKwh * rateCentsPerKwh) / 100;

  const scenarioLowerDutyPercent = Math.max(0, dutyCyclePercent - 10);
  const scenarioLowerDutyKwh =
    ((inputWatts * (scenarioLowerDutyPercent / 100)) / 1000) * hoursPerDay * days;
  const scenarioLowerDutyCost = (scenarioLowerDutyKwh * rateCentsPerKwh) / 100;

  const scenarios: AcCostScenario[] = [
    {
      label: 'Base Estimate',
      description: `Current inputs (${hoursPerDay} hrs/day, ${dutyCyclePercent}% duty cycle)`,
      hoursPerDay,
      dutyCyclePercent,
      periodKwh: roundToFourDecimals(periodKwh),
      periodCostUsd: roundToTwoDecimals(periodCostUsd),
      differenceUsd: 0,
    },
    {
      label: 'Reduce Runtime by 1 Hr/Day',
      description: `Operating ${scenarioLessOneHourHours} hrs/day instead of ${hoursPerDay} hrs/day`,
      hoursPerDay: scenarioLessOneHourHours,
      dutyCyclePercent,
      periodKwh: roundToFourDecimals(scenarioLessOneHourKwh),
      periodCostUsd: roundToTwoDecimals(scenarioLessOneHourCost),
      differenceUsd: roundToTwoDecimals(scenarioLessOneHourCost - periodCostUsd),
    },
    {
      label: 'Lower Compressor Duty Cycle',
      description: `Thermostat cycling at ${scenarioLowerDutyPercent}% duty cycle instead of ${dutyCyclePercent}%`,
      hoursPerDay,
      dutyCyclePercent: scenarioLowerDutyPercent,
      periodKwh: roundToFourDecimals(scenarioLowerDutyKwh),
      periodCostUsd: roundToTwoDecimals(scenarioLowerDutyCost),
      differenceUsd: roundToTwoDecimals(scenarioLowerDutyCost - periodCostUsd),
    },
  ];

  const step2Kwh = `(${inputWatts.toFixed(1)} W × ${hoursPerDay} hrs/day × ${days} days × ${dutyCyclePercent}%) / 1,000 = ${periodKwh.toFixed(2)} kWh`;
  const step3Cost = `${periodKwh.toFixed(2)} kWh × ${rateCentsPerKwh.toFixed(2)}¢/kWh = $${periodCostUsd.toFixed(2)}`;

  return {
    mode,
    acType,
    inputWatts: roundToTwoDecimals(inputWatts),
    effectiveWatts: roundToTwoDecimals(effectiveWatts),
    hourlyKwh: roundToFourDecimals(hourlyKwh),
    hourlyCostUsd: roundToTwoDecimals(hourlyCostUsd),
    dailyKwh: roundToFourDecimals(dailyKwh),
    dailyCostUsd: roundToTwoDecimals(dailyCostUsd),
    periodKwh: roundToFourDecimals(periodKwh),
    periodCostUsd: roundToTwoDecimals(periodCostUsd),
    monthlyKwh: roundToFourDecimals(monthlyKwh),
    monthlyCostUsd: roundToTwoDecimals(monthlyCostUsd),
    annualKwh: roundToFourDecimals(annualKwh),
    annualCostUsd: roundToTwoDecimals(annualCostUsd),
    rateCentsPerKwhUsed: rateCentsPerKwh,
    dutyCyclePercentUsed: dutyCyclePercent,
    derivedBtu,
    derivedTons,
    scenarios,
    workedExample: {
      formulaSummary: 'kWh = (Input Watts × Hours/Day × Days × Duty Cycle %) / 1,000',
      step1Watts,
      step2Kwh,
      step3Cost,
    },
  };
}

function roundToTwoDecimals(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

function roundToFourDecimals(val: number): number {
  return Math.round((val + Number.EPSILON) * 10000) / 10000;
}
