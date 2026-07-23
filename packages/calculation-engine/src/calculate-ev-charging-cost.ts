export type EvChargingCostInput = {
  /** Total usable EV battery capacity in kWh (e.g. 75) */
  batteryCapacityKwh: number;
  /** Starting State of Charge (SoC) percentage (0 - 99%) */
  startingChargePercent: number;
  /** Target State of Charge (SoC) percentage (1 - 100%, must be > startingChargePercent) */
  targetChargePercent: number;
  /** AC-to-battery charging efficiency percentage (50 - 100%, default 88%) */
  chargingEfficiencyPercent?: number;
  /** Electricity tariff rate in Cents per kilowatt-hour (¢/kWh) */
  rateCentsPerKwh: number;
  /** Optional driving distance in miles */
  milesDriven?: number;
  /** Optional EV driving efficiency in miles per kWh (e.g. 3.3) */
  milesPerKwh?: number;
  /** Optional preset identifier */
  presetId?: string;
};

export type EvChargingScenario = {
  label: string;
  description: string;
  rateCentsPerKwh: number;
  chargingEfficiencyPercent: number;
  targetChargePercent: number;
  gridEnergyRequiredKwh: number;
  chargeCostUsd: number;
  differenceUsd: number;
};

export type EvChargingCostResult = {
  batteryCapacityKwh: number;
  startingChargePercent: number;
  targetChargePercent: number;
  batteryPercentAdded: number;
  batteryEnergyAddedKwh: number;
  chargingEfficiencyPercentUsed: number;
  gridEnergyRequiredKwh: number;
  chargingLossKwh: number;
  chargeCostUsd: number;
  costPerPercentUsd: number;
  rateCentsPerKwhUsed: number;
  drivingMetrics?: {
    milesDriven: number;
    milesPerKwh: number;
    drivingBatteryKwh: number;
    drivingGridKwh: number;
    drivingCostUsd: number;
    costPerMileUsd: number;
    costPer100MilesUsd: number;
    monthlyDrivingGridKwh: number;
    monthlyDrivingCostUsd: number;
  };
  scenarios: EvChargingScenario[];
  workedExample: {
    formulaSummary: string;
    step1Percent: string;
    step2BatteryKwh: string;
    step3GridKwh: string;
    step4Cost: string;
  };
};

export class EvChargingCalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EvChargingCalculationError';
  }
}

/**
 * Calculates grid electricity usage (kWh), charging losses, session cost (USD),
 * and optional cost-per-mile for an electric vehicle.
 */
export function calculateEvChargingCost(input: EvChargingCostInput): EvChargingCostResult {
  const {
    batteryCapacityKwh,
    startingChargePercent,
    targetChargePercent,
    chargingEfficiencyPercent = 88,
    rateCentsPerKwh,
    milesDriven,
    milesPerKwh,
  } = input;

  if (
    typeof batteryCapacityKwh !== 'number' ||
    isNaN(batteryCapacityKwh) ||
    batteryCapacityKwh <= 0 ||
    batteryCapacityKwh > 300
  ) {
    throw new EvChargingCalculationError(
      'Battery capacity must be a positive number up to 300 kWh.',
    );
  }

  if (
    typeof startingChargePercent !== 'number' ||
    isNaN(startingChargePercent) ||
    startingChargePercent < 0 ||
    startingChargePercent >= 100
  ) {
    throw new EvChargingCalculationError('Starting charge percentage must be between 0% and 99%.');
  }

  if (
    typeof targetChargePercent !== 'number' ||
    isNaN(targetChargePercent) ||
    targetChargePercent <= 0 ||
    targetChargePercent > 100
  ) {
    throw new EvChargingCalculationError('Target charge percentage must be between 1% and 100%.');
  }

  if (targetChargePercent <= startingChargePercent) {
    throw new EvChargingCalculationError(
      'Target charge percentage must be strictly greater than starting charge percentage.',
    );
  }

  if (
    typeof chargingEfficiencyPercent !== 'number' ||
    isNaN(chargingEfficiencyPercent) ||
    chargingEfficiencyPercent < 50 ||
    chargingEfficiencyPercent > 100
  ) {
    throw new EvChargingCalculationError(
      'Charging efficiency percentage must be between 50% and 100%.',
    );
  }

  if (
    typeof rateCentsPerKwh !== 'number' ||
    isNaN(rateCentsPerKwh) ||
    rateCentsPerKwh <= 0 ||
    rateCentsPerKwh > 500
  ) {
    throw new EvChargingCalculationError(
      'Electricity rate must be a positive number in cents/kWh (e.g. 16.5).',
    );
  }

  const batteryPercentAdded = targetChargePercent - startingChargePercent;
  const batteryEnergyAddedKwh = batteryCapacityKwh * (batteryPercentAdded / 100);
  const efficiencyFactor = chargingEfficiencyPercent / 100;
  const gridEnergyRequiredKwh = batteryEnergyAddedKwh / efficiencyFactor;
  const chargingLossKwh = gridEnergyRequiredKwh - batteryEnergyAddedKwh;
  const chargeCostUsd = (gridEnergyRequiredKwh * rateCentsPerKwh) / 100;
  const costPerPercentUsd = chargeCostUsd / batteryPercentAdded;

  // Optional Driving Metrics
  let drivingMetrics: EvChargingCostResult['drivingMetrics'];
  if (
    typeof milesDriven === 'number' &&
    !isNaN(milesDriven) &&
    milesDriven > 0 &&
    typeof milesPerKwh === 'number' &&
    !isNaN(milesPerKwh) &&
    milesPerKwh > 0
  ) {
    const drivingBatteryKwh = milesDriven / milesPerKwh;
    const drivingGridKwh = drivingBatteryKwh / efficiencyFactor;
    const drivingCostUsd = (drivingGridKwh * rateCentsPerKwh) / 100;
    const costPerMileUsd = drivingCostUsd / milesDriven;
    const costPer100MilesUsd = costPerMileUsd * 100;

    // Standardized 1,000 miles/month benchmark
    const monthlyDrivingGridKwh = 1000 / milesPerKwh / efficiencyFactor;
    const monthlyDrivingCostUsd = (monthlyDrivingGridKwh * rateCentsPerKwh) / 100;

    drivingMetrics = {
      milesDriven,
      milesPerKwh,
      drivingBatteryKwh: roundToTwoDecimals(drivingBatteryKwh),
      drivingGridKwh: roundToTwoDecimals(drivingGridKwh),
      drivingCostUsd: roundToTwoDecimals(drivingCostUsd),
      costPerMileUsd: roundToFourDecimals(costPerMileUsd),
      costPer100MilesUsd: roundToTwoDecimals(costPer100MilesUsd),
      monthlyDrivingGridKwh: roundToTwoDecimals(monthlyDrivingGridKwh),
      monthlyDrivingCostUsd: roundToTwoDecimals(monthlyDrivingCostUsd),
    };
  }

  // Comparison Scenarios Logic
  const scenarios: EvChargingScenario[] = [];

  // Scenario 1: Base Estimate
  scenarios.push({
    label: 'Base Charging Session',
    description: `Current inputs (${batteryCapacityKwh}kWh battery, ${startingChargePercent}% to ${targetChargePercent}%, ${chargingEfficiencyPercent}% efficiency @ ${rateCentsPerKwh.toFixed(2)}¢/kWh)`,
    rateCentsPerKwh,
    chargingEfficiencyPercent,
    targetChargePercent,
    gridEnergyRequiredKwh: roundToTwoDecimals(gridEnergyRequiredKwh),
    chargeCostUsd: roundToTwoDecimals(chargeCostUsd),
    differenceUsd: 0,
  });

  // Scenario 2: Off-Peak / Lower Rate (30% discount on electricity rate)
  const offPeakRate = rateCentsPerKwh * 0.7;
  const offPeakCost = (gridEnergyRequiredKwh * offPeakRate) / 100;
  scenarios.push({
    label: 'Off-Peak EV Tariff (30% Discount)',
    description: `Charging during off-peak rate period (${offPeakRate.toFixed(2)}¢/kWh instead of ${rateCentsPerKwh.toFixed(2)}¢/kWh)`,
    rateCentsPerKwh: offPeakRate,
    chargingEfficiencyPercent,
    targetChargePercent,
    gridEnergyRequiredKwh: roundToTwoDecimals(gridEnergyRequiredKwh),
    chargeCostUsd: roundToTwoDecimals(offPeakCost),
    differenceUsd: roundToTwoDecimals(offPeakCost - chargeCostUsd),
  });

  // Scenario 3: Higher Level 2 Charging Efficiency (92%)
  const s3GridKwh = batteryEnergyAddedKwh / 0.92;
  const s3Cost = (s3GridKwh * rateCentsPerKwh) / 100;
  scenarios.push({
    label: 'Optimal Level 2 Efficiency (92%)',
    description: `High-efficiency Level 2 charging (92% efficiency instead of ${chargingEfficiencyPercent}%)`,
    rateCentsPerKwh,
    chargingEfficiencyPercent: 92,
    targetChargePercent,
    gridEnergyRequiredKwh: roundToTwoDecimals(s3GridKwh),
    chargeCostUsd: roundToTwoDecimals(s3Cost),
    differenceUsd: roundToTwoDecimals(s3Cost - chargeCostUsd),
  });

  // Scenario 4: Target 80% SoC (Daily Battery Health Recommendation)
  if (targetChargePercent > 80) {
    const s4PercentAdded = Math.max(0, 80 - startingChargePercent);
    const s4BatteryKwh = batteryCapacityKwh * (s4PercentAdded / 100);
    const s4GridKwh = s4BatteryKwh / efficiencyFactor;
    const s4Cost = (s4GridKwh * rateCentsPerKwh) / 100;
    scenarios.push({
      label: 'Charge to 80% SoC (Daily Conservation)',
      description: `Charging to 80% target SoC instead of ${targetChargePercent}% (${s4PercentAdded}% added)`,
      rateCentsPerKwh,
      chargingEfficiencyPercent,
      targetChargePercent: 80,
      gridEnergyRequiredKwh: roundToTwoDecimals(s4GridKwh),
      chargeCostUsd: roundToTwoDecimals(s4Cost),
      differenceUsd: roundToTwoDecimals(s4Cost - chargeCostUsd),
    });
  }

  const step1Percent = `Battery State of Charge Added = ${targetChargePercent}% - ${startingChargePercent}% = ${batteryPercentAdded}%`;
  const step2BatteryKwh = `Net Battery Energy Added = ${batteryCapacityKwh} kWh × (${batteryPercentAdded}% ÷ 100) = ${batteryEnergyAddedKwh.toFixed(2)} kWh`;
  const step3GridKwh = `Grid Energy Required (including ${chargingEfficiencyPercent}% efficiency) = ${batteryEnergyAddedKwh.toFixed(2)} kWh ÷ 0.${chargingEfficiencyPercent} = ${gridEnergyRequiredKwh.toFixed(2)} kWh (${chargingLossKwh.toFixed(2)} kWh charging loss)`;
  const step4Cost = `Total Session Cost = ${gridEnergyRequiredKwh.toFixed(2)} kWh × ${rateCentsPerKwh.toFixed(2)}¢/kWh = $${chargeCostUsd.toFixed(2)}`;

  return {
    batteryCapacityKwh,
    startingChargePercent,
    targetChargePercent,
    batteryPercentAdded,
    batteryEnergyAddedKwh: roundToTwoDecimals(batteryEnergyAddedKwh),
    chargingEfficiencyPercentUsed: chargingEfficiencyPercent,
    gridEnergyRequiredKwh: roundToTwoDecimals(gridEnergyRequiredKwh),
    chargingLossKwh: roundToTwoDecimals(chargingLossKwh),
    chargeCostUsd: roundToTwoDecimals(chargeCostUsd),
    costPerPercentUsd: roundToFourDecimals(costPerPercentUsd),
    rateCentsPerKwhUsed: rateCentsPerKwh,
    drivingMetrics,
    scenarios,
    workedExample: {
      formulaSummary: 'Grid kWh = (Battery Capacity × SoC Added %) ÷ Charging Efficiency %',
      step1Percent,
      step2BatteryKwh,
      step3GridKwh,
      step4Cost,
    },
  };
}

function roundToTwoDecimals(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

function roundToFourDecimals(val: number): number {
  return Math.round((val + Number.EPSILON) * 10000) / 10000;
}
