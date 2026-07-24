export type ApplianceCostInput = {
  /** Appliance power rating in Watts (W) */
  wattage: number;
  /** Operating duration per day in Hours (0 - 24) */
  hoursPerDay: number;
  /** Duration of calculation period in Days (1 - 365) */
  days: number;
  /** Electricity tariff rate in Cents per kilowatt-hour (¢/kWh) */
  rateCentsPerKwh: number;
  /** Percentage of active power draw during operating hours (0 - 100%) */
  dutyCyclePercent?: number;
};

export type ApplianceCostResult = {
  hourlyKwh: number;
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
  effectiveWatts: number;
  workedExample: {
    formulaSummary: string;
    step1Kwh: string;
    step2Cost: string;
  };
};

export class ApplianceCalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApplianceCalculationError';
  }
}

/**
 * Calculates electricity consumption (kWh) and monetary operating cost (USD)
 * for household appliances using wattage, usage hours, days, electricity rate,
 * and duty cycle percentage.
 */
export function calculateApplianceCost(input: ApplianceCostInput): ApplianceCostResult {
  const { wattage, hoursPerDay, days, rateCentsPerKwh, dutyCyclePercent = 100 } = input;

  if (typeof wattage !== 'number' || isNaN(wattage) || wattage <= 0 || wattage > 50000) {
    throw new ApplianceCalculationError(
      'Appliance wattage must be a positive number up to 50,000 W.',
    );
  }

  if (
    typeof hoursPerDay !== 'number' ||
    isNaN(hoursPerDay) ||
    hoursPerDay < 0 ||
    hoursPerDay > 24
  ) {
    throw new ApplianceCalculationError('Hours per day must be between 0 and 24 hours.');
  }

  if (typeof days !== 'number' || isNaN(days) || days <= 0 || days > 365) {
    throw new ApplianceCalculationError('Days must be a positive number between 1 and 365 days.');
  }

  if (
    typeof rateCentsPerKwh !== 'number' ||
    isNaN(rateCentsPerKwh) ||
    rateCentsPerKwh <= 0 ||
    rateCentsPerKwh > 500
  ) {
    throw new ApplianceCalculationError(
      'Electricity rate must be a positive number in cents/kWh (e.g. 16.5).',
    );
  }

  if (
    typeof dutyCyclePercent !== 'number' ||
    isNaN(dutyCyclePercent) ||
    dutyCyclePercent < 0 ||
    dutyCyclePercent > 100
  ) {
    throw new ApplianceCalculationError('Duty cycle must be between 0% and 100%.');
  }

  const dutyCycleFactor = dutyCyclePercent / 100;
  const effectiveWatts = wattage * dutyCycleFactor;

  // Hourly kWh during active operation
  const hourlyKwh = (wattage * dutyCycleFactor) / 1000;

  // Daily kWh = (Watts * Hours/Day * DutyCycle) / 1000
  const dailyKwh = (wattage * hoursPerDay * dutyCycleFactor) / 1000;
  const dailyCostUsd = (dailyKwh * rateCentsPerKwh) / 100;

  // Period totals
  const periodKwh = dailyKwh * days;
  const periodCostUsd = (periodKwh * rateCentsPerKwh) / 100;

  // Standardized baselines
  const monthlyKwh = dailyKwh * 30;
  const monthlyCostUsd = (monthlyKwh * rateCentsPerKwh) / 100;

  const annualKwh = dailyKwh * 365;
  const annualCostUsd = (annualKwh * rateCentsPerKwh) / 100;

  // Worked example explanation strings
  const step1Kwh = `(${wattage} W × ${hoursPerDay} hrs/day × ${days} days × ${dutyCyclePercent}%) / 1,000 = ${periodKwh.toFixed(2)} kWh`;
  const step2Cost = `${periodKwh.toFixed(2)} kWh × ${rateCentsPerKwh.toFixed(2)}¢/kWh = $${periodCostUsd.toFixed(2)}`;

  return {
    hourlyKwh: roundToFourDecimals(hourlyKwh),
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
    effectiveWatts: roundToTwoDecimals(effectiveWatts),
    workedExample: {
      formulaSummary: 'kWh = (Watts × Hours/Day × Days × Duty Cycle %) / 1,000',
      step1Kwh,
      step2Cost,
    },
  };
}

export type RefrigeratorAnnualKwhInput = {
  annualKwh: number;
  days?: number;
  rateCentsPerKwh: number;
};

export function calculateRefrigeratorAnnualKwhCost(
  input: RefrigeratorAnnualKwhInput,
): ApplianceCostResult {
  const { annualKwh, days = 30, rateCentsPerKwh } = input;

  if (typeof annualKwh !== 'number' || isNaN(annualKwh) || annualKwh <= 0 || annualKwh > 10000) {
    throw new ApplianceCalculationError(
      'Annual EnergyGuide kWh must be a positive number up to 10,000 kWh.',
    );
  }

  const dailyKwh = annualKwh / 365;
  const effectiveWatts = (dailyKwh * 1000) / 24;

  return calculateApplianceCost({
    wattage: effectiveWatts,
    hoursPerDay: 24,
    days,
    rateCentsPerKwh,
    dutyCyclePercent: 100,
  });
}

export type DryerCostInput = {
  wattage: number;
  minutesPerLoad: number;
  loadsPerWeek: number;
  weeks?: number;
  rateCentsPerKwh: number;
  dutyCyclePercent?: number;
};

export type DryerCostResult = ApplianceCostResult & {
  kwhPerLoad: number;
  costPerLoadUsd: number;
  hoursPerLoad: number;
  loadsPerWeekUsed: number;
};

export function calculateDryerCost(input: DryerCostInput): DryerCostResult {
  const {
    wattage,
    minutesPerLoad,
    loadsPerWeek,
    weeks = 4.33,
    rateCentsPerKwh,
    dutyCyclePercent = 100,
  } = input;

  if (
    typeof minutesPerLoad !== 'number' ||
    isNaN(minutesPerLoad) ||
    minutesPerLoad <= 0 ||
    minutesPerLoad > 300
  ) {
    throw new ApplianceCalculationError('Minutes per load must be between 1 and 300 minutes.');
  }

  if (
    typeof loadsPerWeek !== 'number' ||
    isNaN(loadsPerWeek) ||
    loadsPerWeek < 0 ||
    loadsPerWeek > 50
  ) {
    throw new ApplianceCalculationError('Loads per week must be between 0 and 50 loads.');
  }

  const hoursPerLoad = minutesPerLoad / 60;
  const kwhPerLoad = roundToFourDecimals(
    (wattage * hoursPerLoad * (dutyCyclePercent / 100)) / 1000,
  );
  const costPerLoadUsd = roundToTwoDecimals((kwhPerLoad * rateCentsPerKwh) / 100);

  const weeklyHours = hoursPerLoad * loadsPerWeek;
  const hoursPerDay = weeklyHours / 7;
  const days = Math.round(weeks * 7);

  const baseResult = calculateApplianceCost({
    wattage,
    hoursPerDay,
    days,
    rateCentsPerKwh,
    dutyCyclePercent,
  });

  return {
    ...baseResult,
    kwhPerLoad,
    costPerLoadUsd,
    hoursPerLoad: roundToTwoDecimals(hoursPerLoad),
    loadsPerWeekUsed: loadsPerWeek,
  };
}

export type WaterHeaterCostInput = {
  elementWatts: number;
  activeElements?: number;
  hoursPerDay: number;
  days?: number;
  rateCentsPerKwh: number;
  dutyCyclePercent?: number;
};

export function calculateWaterHeaterCost(input: WaterHeaterCostInput): ApplianceCostResult {
  const {
    elementWatts,
    activeElements = 1,
    hoursPerDay,
    days = 30,
    rateCentsPerKwh,
    dutyCyclePercent = 100,
  } = input;

  if (
    typeof activeElements !== 'number' ||
    isNaN(activeElements) ||
    activeElements < 1 ||
    activeElements > 4
  ) {
    throw new ApplianceCalculationError('Simultaneously active elements must be between 1 and 4.');
  }

  const totalWatts = elementWatts * activeElements;

  return calculateApplianceCost({
    wattage: totalWatts,
    hoursPerDay,
    days,
    rateCentsPerKwh,
    dutyCyclePercent,
  });
}

export type PoolPumpCostInput = {
  wattage: number;
  hoursPerDay: number;
  daysPerWeek?: number;
  weeks?: number;
  rateCentsPerKwh: number;
  dutyCyclePercent?: number;
};

export function calculatePoolPumpCost(input: PoolPumpCostInput): ApplianceCostResult {
  const {
    wattage,
    hoursPerDay,
    daysPerWeek = 7,
    weeks = 4.33,
    rateCentsPerKwh,
    dutyCyclePercent = 100,
  } = input;

  if (typeof daysPerWeek !== 'number' || isNaN(daysPerWeek) || daysPerWeek < 1 || daysPerWeek > 7) {
    throw new ApplianceCalculationError('Days per week must be between 1 and 7 days.');
  }

  const hoursPerDayNormalized = (hoursPerDay * daysPerWeek) / 7;
  const days = Math.round(weeks * 7);

  return calculateApplianceCost({
    wattage,
    hoursPerDay: hoursPerDayNormalized,
    days,
    rateCentsPerKwh,
    dutyCyclePercent,
  });
}

function roundToTwoDecimals(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

function roundToFourDecimals(val: number): number {
  return Math.round((val + Number.EPSILON) * 10000) / 10000;
}
