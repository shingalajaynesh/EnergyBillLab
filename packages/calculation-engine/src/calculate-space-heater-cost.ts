export type SpaceHeaterCostInput = {
  /** Electrical power rating per heater in Watts (e.g. 1500) */
  heaterWatts: number;
  /** Number of space heaters operating simultaneously (default 1) */
  quantity: number;
  /** Daily operating duration in Hours (0 - 24) */
  hoursPerDay: number;
  /** Duration of calculation period in Days (1 - 365) */
  days: number;
  /** Electricity tariff rate in Cents per kilowatt-hour (¢/kWh) */
  rateCentsPerKwh: number;
  /** Active thermostat duty cycle percentage (0 - 100%, default 80%) */
  dutyCyclePercent?: number;
  /** Optional preset identifier */
  presetId?: string;
};

export type SpaceHeaterCostScenario = {
  label: string;
  description: string;
  heaterWatts: number;
  quantity: number;
  hoursPerDay: number;
  dutyCyclePercent: number;
  periodKwh: number;
  periodCostUsd: number;
  differenceUsd: number;
};

export type SpaceHeaterCostResult = {
  heaterWatts: number;
  quantity: number;
  totalRatedWatts: number;
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
  scenarios: SpaceHeaterCostScenario[];
  workedExample: {
    formulaSummary: string;
    step1Watts: string;
    step2Kwh: string;
    step3Cost: string;
  };
};

export class SpaceHeaterCalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SpaceHeaterCalculationError';
  }
}

/**
 * Calculates electricity usage (kWh) and operating cost (USD)
 * for one or more electric space heaters.
 */
export function calculateSpaceHeaterCost(input: SpaceHeaterCostInput): SpaceHeaterCostResult {
  const {
    heaterWatts,
    quantity,
    hoursPerDay,
    days,
    rateCentsPerKwh,
    dutyCyclePercent = 80,
  } = input;

  if (
    typeof heaterWatts !== 'number' ||
    isNaN(heaterWatts) ||
    heaterWatts <= 0 ||
    heaterWatts > 10000
  ) {
    throw new SpaceHeaterCalculationError(
      'Heater wattage must be a positive number up to 10,000 Watts.',
    );
  }

  if (
    typeof quantity !== 'number' ||
    isNaN(quantity) ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 20
  ) {
    throw new SpaceHeaterCalculationError('Quantity must be an integer between 1 and 20 heaters.');
  }

  if (
    typeof hoursPerDay !== 'number' ||
    isNaN(hoursPerDay) ||
    hoursPerDay < 0 ||
    hoursPerDay > 24
  ) {
    throw new SpaceHeaterCalculationError('Hours per day must be between 0 and 24 hours.');
  }

  if (typeof days !== 'number' || isNaN(days) || days <= 0 || days > 365) {
    throw new SpaceHeaterCalculationError('Days must be a positive number between 1 and 365 days.');
  }

  if (
    typeof rateCentsPerKwh !== 'number' ||
    isNaN(rateCentsPerKwh) ||
    rateCentsPerKwh <= 0 ||
    rateCentsPerKwh > 500
  ) {
    throw new SpaceHeaterCalculationError(
      'Electricity rate must be a positive number in cents/kWh (e.g. 16.5).',
    );
  }

  if (
    typeof dutyCyclePercent !== 'number' ||
    isNaN(dutyCyclePercent) ||
    dutyCyclePercent < 0 ||
    dutyCyclePercent > 100
  ) {
    throw new SpaceHeaterCalculationError('Duty cycle must be between 0% and 100%.');
  }

  const totalRatedWatts = heaterWatts * quantity;
  const dutyCycleFactor = dutyCyclePercent / 100;
  const effectiveWatts = totalRatedWatts * dutyCycleFactor;

  // Energy & Cost Calculations
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

  // Comparison Scenarios Logic
  const scenarios: SpaceHeaterCostScenario[] = [];

  // Scenario 1: Base Estimate
  scenarios.push({
    label: 'Base Estimate',
    description: `Current inputs (${quantity} × ${heaterWatts}W heater${quantity > 1 ? 's' : ''}, ${hoursPerDay} hrs/day, ${dutyCyclePercent}% duty cycle)`,
    heaterWatts,
    quantity,
    hoursPerDay,
    dutyCyclePercent,
    periodKwh: roundToFourDecimals(periodKwh),
    periodCostUsd: roundToTwoDecimals(periodCostUsd),
    differenceUsd: 0,
  });

  // Scenario 2: Reduce Runtime by 1 Hr/Day
  const lessOneHour = Math.max(0, hoursPerDay - 1);
  const s2Kwh = (effectiveWatts / 1000) * lessOneHour * days;
  const s2Cost = (s2Kwh * rateCentsPerKwh) / 100;
  scenarios.push({
    label: 'Reduce Runtime by 1 Hr/Day',
    description: `Operating ${lessOneHour} hrs/day instead of ${hoursPerDay} hrs/day`,
    heaterWatts,
    quantity,
    hoursPerDay: lessOneHour,
    dutyCyclePercent,
    periodKwh: roundToFourDecimals(s2Kwh),
    periodCostUsd: roundToTwoDecimals(s2Cost),
    differenceUsd: roundToTwoDecimals(s2Cost - periodCostUsd),
  });

  // Scenario 3: Lower Power Setting (750W setting if current watts > 750W)
  if (heaterWatts > 750) {
    const s3Effective = 750 * quantity * dutyCycleFactor;
    const s3Kwh = (s3Effective / 1000) * hoursPerDay * days;
    const s3Cost = (s3Kwh * rateCentsPerKwh) / 100;
    scenarios.push({
      label: 'Switch to Low Setting (750W)',
      description: `Operating at 750W low power setting per heater instead of ${heaterWatts}W`,
      heaterWatts: 750,
      quantity,
      hoursPerDay,
      dutyCyclePercent,
      periodKwh: roundToFourDecimals(s3Kwh),
      periodCostUsd: roundToTwoDecimals(s3Cost),
      differenceUsd: roundToTwoDecimals(s3Cost - periodCostUsd),
    });
  }

  // Scenario 4: Reduce Quantity by 1 (if quantity > 1)
  if (quantity > 1) {
    const s4Qty = quantity - 1;
    const s4Effective = heaterWatts * s4Qty * dutyCycleFactor;
    const s4Kwh = (s4Effective / 1000) * hoursPerDay * days;
    const s4Cost = (s4Kwh * rateCentsPerKwh) / 100;
    scenarios.push({
      label: 'Use One Fewer Space Heater',
      description: `Operating ${s4Qty} space heater${s4Qty > 1 ? 's' : ''} instead of ${quantity}`,
      heaterWatts,
      quantity: s4Qty,
      hoursPerDay,
      dutyCyclePercent,
      periodKwh: roundToFourDecimals(s4Kwh),
      periodCostUsd: roundToTwoDecimals(s4Cost),
      differenceUsd: roundToTwoDecimals(s4Cost - periodCostUsd),
    });
  }

  // Scenario 5: Thermostat Duty Cycle (20% lower duty cycle)
  const lowerDuty = Math.max(0, dutyCyclePercent - 20);
  const s5Effective = totalRatedWatts * (lowerDuty / 100);
  const s5Kwh = (s5Effective / 1000) * hoursPerDay * days;
  const s5Cost = (s5Kwh * rateCentsPerKwh) / 100;
  scenarios.push({
    label: 'Lower Thermostat Duty Cycle',
    description: `Thermostat cycling at ${lowerDuty}% active draw instead of ${dutyCyclePercent}%`,
    heaterWatts,
    quantity,
    hoursPerDay,
    dutyCyclePercent: lowerDuty,
    periodKwh: roundToFourDecimals(s5Kwh),
    periodCostUsd: roundToTwoDecimals(s5Cost),
    differenceUsd: roundToTwoDecimals(s5Cost - periodCostUsd),
  });

  const step1Watts = `Total Effective Watts = (${heaterWatts} W × ${quantity} unit${quantity > 1 ? 's' : ''}) × ${dutyCyclePercent}% duty cycle = ${effectiveWatts.toFixed(1)} W`;
  const step2Kwh = `(${effectiveWatts.toFixed(1)} W × ${hoursPerDay} hrs/day × ${days} days) / 1,000 = ${periodKwh.toFixed(2)} kWh`;
  const step3Cost = `${periodKwh.toFixed(2)} kWh × ${rateCentsPerKwh.toFixed(2)}¢/kWh = $${periodCostUsd.toFixed(2)}`;

  return {
    heaterWatts,
    quantity,
    totalRatedWatts,
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
    scenarios,
    workedExample: {
      formulaSummary: 'kWh = (Heater Watts × Quantity × Hours/Day × Days × Duty Cycle %) / 1,000',
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
