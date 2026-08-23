/**
 * Heating Fuel & Heat Pump Breakeven Comparator Calculation Engine
 *
 * Compares delivered cost per Million BTU (MMBtu) across Natural Gas,
 * Heat Pumps, Heating Oil, Propane, and Electric Resistance at local utility
 * prices, computing thermal balance points and annual operating cost rankings.
 */

export interface CalculateHeatingFuelComparisonInput {
  electricityRateCentsPerKwh: number;
  naturalGasDollarsPerTherm: number;
  heatingOilDollarsPerGallon?: number;
  propaneDollarsPerGallon?: number;
  annualHeatingDemandMbtu?: number; // default 50 MMBtu for typical 2,000 sq ft home
  gasFurnaceAfue?: number; // default 0.80 standard or 0.96 high efficiency
  heatPumpHspf2?: number; // default 8.5
}

export type FuelType =
  | 'natural_gas_high'
  | 'natural_gas_standard'
  | 'heat_pump_inverter'
  | 'heat_pump_standard'
  | 'propane'
  | 'heating_oil'
  | 'electric_resistance';

export interface FuelComparisonItem {
  fuelType: FuelType;
  name: string;
  category: 'gas' | 'electric' | 'oil' | 'propane';
  efficiencyRating: string;
  unitPriceDisplay: string;
  costPerMbtuDeliveredDollars: number;
  annualHeatingCostDollars: number;
  differenceVsLowestDollars: number;
  rank: number;
  isLowest: boolean;
}

export interface ThermalCrossoverPoint {
  crossoverTempF: number;
  explanation: string;
  heatPumpBeatsGasAboveF: boolean;
}

export interface CalculateHeatingFuelComparisonOutput {
  fuels: FuelComparisonItem[];
  lowestCostFuel: FuelComparisonItem;
  annualDemandMbtu: number;
  thermalBalancePoint: ThermalCrossoverPoint;
  comparativeSummary: string;
}

export function calculateHeatingFuelComparison(
  input: CalculateHeatingFuelComparisonInput,
): CalculateHeatingFuelComparisonOutput {
  const elecRateDollars = Math.max(0.01, input.electricityRateCentsPerKwh / 100);
  const gasPriceDollars = Math.max(0.2, input.naturalGasDollarsPerTherm);
  const oilPriceDollars = Math.max(1.0, input.heatingOilDollarsPerGallon ?? 3.85);
  const propanePriceDollars = Math.max(0.8, input.propaneDollarsPerGallon ?? 2.95);
  const demandMbtu = Math.max(10, Math.min(200, input.annualHeatingDemandMbtu ?? 50));

  // Delivered Cost per MMBtu (1,000,000 BTU) delivered into living space:
  // 1 therm natural gas = 100,000 BTU
  // 1 kWh electricity = 3,412.14 BTU (293.071 kWh per 1 MMBtu at COP 1.0)
  // 1 gallon propane = 91,500 BTU (10.929 gallons per 1 MMBtu at 100%)
  // 1 gallon heating oil #2 = 138,500 BTU (7.22 gallons per 1 MMBtu at 100%)

  // 1. High-Efficiency Natural Gas (96% AFUE)
  const gasHighCostPerMbtu = (gasPriceDollars * 10) / 0.96;

  // 2. Standard Natural Gas (80% AFUE)
  const gasStdCostPerMbtu = (gasPriceDollars * 10) / 0.80;

  // 3. High-Efficiency Cold-Climate Heat Pump (COP ~3.2 seasonal average, HSPF2 10.0)
  const heatPumpInverterCostPerMbtu = (elecRateDollars * 293.071) / 3.2;

  // 4. Standard Heat Pump (COP ~2.5 seasonal average, HSPF2 8.5)
  const heatPumpStdCostPerMbtu = (elecRateDollars * 293.071) / 2.5;

  // 5. High-Efficiency Propane (95% AFUE)
  const propaneCostPerMbtu = (propanePriceDollars * 10.929) / 0.95;

  // 6. Modern Heating Oil (85% AFUE)
  const oilCostPerMbtu = (oilPriceDollars * 7.22) / 0.85;

  // 7. Baseboard / Strip Electric Resistance (100% / COP 1.0)
  const resistanceCostPerMbtu = elecRateDollars * 293.071;

  const rawFuels: Array<Omit<FuelComparisonItem, 'rank' | 'differenceVsLowestDollars' | 'isLowest'>> = [
    {
      fuelType: 'natural_gas_high',
      name: 'High-Efficiency Natural Gas Furnace',
      category: 'gas',
      efficiencyRating: '96% AFUE Condensing',
      unitPriceDisplay: `$${gasPriceDollars.toFixed(2)}/therm`,
      costPerMbtuDeliveredDollars: parseFloat(gasHighCostPerMbtu.toFixed(2)),
      annualHeatingCostDollars: Math.round(gasHighCostPerMbtu * demandMbtu),
    },
    {
      fuelType: 'natural_gas_standard',
      name: 'Standard Natural Gas Furnace',
      category: 'gas',
      efficiencyRating: '80% AFUE Standard',
      unitPriceDisplay: `$${gasPriceDollars.toFixed(2)}/therm`,
      costPerMbtuDeliveredDollars: parseFloat(gasStdCostPerMbtu.toFixed(2)),
      annualHeatingCostDollars: Math.round(gasStdCostPerMbtu * demandMbtu),
    },
    {
      fuelType: 'heat_pump_inverter',
      name: 'Inverter Cold-Climate Heat Pump',
      category: 'electric',
      efficiencyRating: 'COP 3.2 (SEER2 18 / HSPF2 10)',
      unitPriceDisplay: `${input.electricityRateCentsPerKwh.toFixed(1)}¢/kWh`,
      costPerMbtuDeliveredDollars: parseFloat(heatPumpInverterCostPerMbtu.toFixed(2)),
      annualHeatingCostDollars: Math.round(heatPumpInverterCostPerMbtu * demandMbtu),
    },
    {
      fuelType: 'heat_pump_standard',
      name: 'Standard Central Heat Pump',
      category: 'electric',
      efficiencyRating: 'COP 2.5 (SEER2 14.3 / HSPF2 8.5)',
      unitPriceDisplay: `${input.electricityRateCentsPerKwh.toFixed(1)}¢/kWh`,
      costPerMbtuDeliveredDollars: parseFloat(heatPumpStdCostPerMbtu.toFixed(2)),
      annualHeatingCostDollars: Math.round(heatPumpStdCostPerMbtu * demandMbtu),
    },
    {
      fuelType: 'propane',
      name: 'High-Efficiency Propane Furnace',
      category: 'propane',
      efficiencyRating: '95% AFUE Condensing',
      unitPriceDisplay: `$${propanePriceDollars.toFixed(2)}/gal`,
      costPerMbtuDeliveredDollars: parseFloat(propaneCostPerMbtu.toFixed(2)),
      annualHeatingCostDollars: Math.round(propaneCostPerMbtu * demandMbtu),
    },
    {
      fuelType: 'heating_oil',
      name: 'Modern Heating Oil Furnace / Boiler',
      category: 'oil',
      efficiencyRating: '85% AFUE Flame Retention',
      unitPriceDisplay: `$${oilPriceDollars.toFixed(2)}/gal`,
      costPerMbtuDeliveredDollars: parseFloat(oilCostPerMbtu.toFixed(2)),
      annualHeatingCostDollars: Math.round(oilCostPerMbtu * demandMbtu),
    },
    {
      fuelType: 'electric_resistance',
      name: 'Electric Baseboard / Strip Heating',
      category: 'electric',
      efficiencyRating: 'COP 1.0 (100% Resistance)',
      unitPriceDisplay: `${input.electricityRateCentsPerKwh.toFixed(1)}¢/kWh`,
      costPerMbtuDeliveredDollars: parseFloat(resistanceCostPerMbtu.toFixed(2)),
      annualHeatingCostDollars: Math.round(resistanceCostPerMbtu * demandMbtu),
    },
  ];

  // Sort by lowest cost
  rawFuels.sort((a, b) => a.costPerMbtuDeliveredDollars - b.costPerMbtuDeliveredDollars);

  const lowestCost = rawFuels[0]!.costPerMbtuDeliveredDollars;

  const fuels: FuelComparisonItem[] = rawFuels.map((f, idx) => ({
    ...f,
    rank: idx + 1,
    differenceVsLowestDollars: Math.round((f.costPerMbtuDeliveredDollars - lowestCost) * demandMbtu),
    isLowest: idx === 0,
  }));

  const lowestFuel = fuels[0]!;

  // Calculate Thermal Balance Crossover Point between Heat Pump and 80% Gas Furnace
  // Cost HP(COP) = Cost Gas(0.80) => (Elec * 293.071) / COP = (Gas * 10) / 0.80
  // COP_crossover = (Elec * 293.071 * 0.80) / (Gas * 10)
  const copCrossover = (elecRateDollars * 293.071 * 0.8) / (gasPriceDollars * 10);

  // Modern inverter heat pump COP curve approx: COP(T) = 1.7 + (T / 47) * 1.8
  // T_cross = (COP_cross - 1.7) * (47 / 1.8)
  let crossoverTempF = Math.round((copCrossover - 1.7) * (47 / 1.8));
  crossoverTempF = Math.max(-10, Math.min(65, crossoverTempF));

  let crossoverExplanation = '';
  if (copCrossover < 1.8) {
    crossoverExplanation = `At your electric rate of ${input.electricityRateCentsPerKwh.toFixed(1)}¢/kWh and gas rate of $${gasPriceDollars.toFixed(2)}/therm, a modern heat pump remains more cost-effective than standard natural gas across virtually all winter temperatures down to sub-zero days.`;
  } else if (copCrossover > 4.0) {
    crossoverExplanation = `Due to inexpensive natural gas ($${gasPriceDollars.toFixed(2)}/therm) relative to electricity (${input.electricityRateCentsPerKwh.toFixed(1)}¢/kWh), natural gas heating is cheaper than heat pumps at almost all outdoor winter temperatures.`;
  } else {
    crossoverExplanation = `Your thermal economic balance point occurs around ${crossoverTempF}°F. Above ${crossoverTempF}°F, a heat pump delivers lower operating cost; below ${crossoverTempF}°F, a natural gas furnace becomes more economical per hour.`;
  }

  const comparativeSummary = `${lowestFuel.name} is currently the most economical heating option at $${lowestFuel.costPerMbtuDeliveredDollars.toFixed(2)}/MMBtu ($${lowestFuel.annualHeatingCostDollars}/year for a typical ${demandMbtu} MMBtu heating load). Choosing it over electric resistance saves $${(resistanceCostPerMbtu * demandMbtu - lowestFuel.annualHeatingCostDollars).toLocaleString()}/year.`;

  return {
    fuels,
    lowestCostFuel: lowestFuel,
    annualDemandMbtu: demandMbtu,
    thermalBalancePoint: {
      crossoverTempF,
      explanation: crossoverExplanation,
      heatPumpBeatsGasAboveF: copCrossover <= 3.5,
    },
    comparativeSummary,
  };
}
