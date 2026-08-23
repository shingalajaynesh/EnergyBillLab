/**
 * Whole-Home Energy Efficiency Score & Retrofit ROI Calculation Engine
 *
 * Implements building physics and residential energy consumption modeling
 * based on DOE RECS and ASHRAE 90.2 benchmarks to generate an efficiency
 * letter grade (A+ to F), annual energy waste estimates, and a prioritized
 * Retrofit ROI Roadmap.
 */

export type YearBuiltTier = 'pre_1975' | '1975_1990' | '1991_2005' | '2006_2015' | '2016_plus';

export type ClimateZone = 'cold' | 'moderate' | 'hot_humid' | 'hot_dry' | 'marine';

export type InsulationLevel =
  'poor_uninsulated' | 'average_batt' | 'high_r38_r49' | 'air_sealed_super';

export type HeatingType =
  | 'electric_resistance'
  | 'gas_standard_80'
  | 'gas_high_96'
  | 'heat_pump_standard'
  | 'heat_pump_inverter';

export type CoolingType =
  'none' | 'window_units' | 'central_old_seer10' | 'central_standard_seer14' | 'heat_pump_seer2_16';

export type WaterHeaterType = 'electric_tank' | 'gas_tank' | 'heat_pump_hybrid' | 'tankless_gas';

export type WindowType = 'single_pane' | 'double_clear' | 'double_low_e' | 'triple_pane';

export interface CalculateHomeEnergyScoreInput {
  squareFootage: number;
  yearBuiltTier: YearBuiltTier;
  climateZone: ClimateZone;
  insulationLevel: InsulationLevel;
  heatingType: HeatingType;
  coolingType: CoolingType;
  waterHeaterType: WaterHeaterType;
  windowType: WindowType;
  electricityRateCentsPerKwh: number;
  gasPriceDollarsPerTherm?: number;
}

export type LetterGrade = 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';

export interface ComponentScoreItem {
  name: string;
  score: number;
  maxScore: number;
  status: 'good' | 'average' | 'poor';
  note: string;
}

export interface RetrofitUpgradeItem {
  id: string;
  title: string;
  category: 'envelope' | 'hvac' | 'water_heating' | 'controls' | 'windows';
  description: string;
  estimatedCostRange: string;
  estimatedAnnualSavingsDollars: number;
  simplePaybackYears: number;
  priority: 'high' | 'medium' | 'low';
}

export interface CalculateHomeEnergyScoreOutput {
  score: number; // 0 to 100
  letterGrade: LetterGrade;
  estimatedAnnualElectricityKwh: number;
  estimatedAnnualGasTherms: number;
  estimatedAnnualTotalCostDollars: number;
  estimatedAnnualWasteDollars: number;
  efficiencySummary: string;
  componentScores: {
    envelope: ComponentScoreItem;
    heating: ComponentScoreItem;
    cooling: ComponentScoreItem;
    waterHeating: ComponentScoreItem;
    windows: ComponentScoreItem;
  };
  retrofitRoadmap: RetrofitUpgradeItem[];
}

export function calculateHomeEnergyScore(
  input: CalculateHomeEnergyScoreInput,
): CalculateHomeEnergyScoreOutput {
  const sqft = Math.max(400, Math.min(15000, input.squareFootage));
  const elecRateDollars = Math.max(0.01, input.electricityRateCentsPerKwh / 100);
  const gasPriceDollars = Math.max(0.5, input.gasPriceDollarsPerTherm ?? 1.45);

  // 1. Envelope Component (Insulation + Vintage) - Max 30 pts
  let envelopeScore = 15;
  let envelopeNote = '';
  switch (input.insulationLevel) {
    case 'poor_uninsulated':
      envelopeScore = 6;
      envelopeNote = 'Minimal or damaged insulation with high thermal bypass air leaks.';
      break;
    case 'average_batt':
      envelopeScore = 18;
      envelopeNote = 'Standard fiberglass batts with typical residential leakage.';
      break;
    case 'high_r38_r49':
      envelopeScore = 26;
      envelopeNote = 'Robust attic and exterior insulation meeting modern IECC standards.';
      break;
    case 'air_sealed_super':
      envelopeScore = 30;
      envelopeNote = 'AeroBarrier / spray-foam sealed thermal envelope with minimal infiltration.';
      break;
  }
  if (input.yearBuiltTier === 'pre_1975') envelopeScore = Math.max(3, envelopeScore - 4);
  if (input.yearBuiltTier === '2016_plus') envelopeScore = Math.min(30, envelopeScore + 2);

  // 2. Heating System Component - Max 25 pts
  let heatingScore = 12;
  let heatingNote = '';
  switch (input.heatingType) {
    case 'electric_resistance':
      heatingScore = 4;
      heatingNote =
        'Electric baseboard / strips consume 1 kWh per 3,412 BTU (COP 1.0) with very high operating cost.';
      break;
    case 'gas_standard_80':
      heatingScore = 14;
      heatingNote = 'Standard 80% AFUE natural gas furnace loses 20% of fuel energy up the flue.';
      break;
    case 'gas_high_96':
      heatingScore = 21;
      heatingNote = 'High-efficiency 96%+ condensing natural gas furnace.';
      break;
    case 'heat_pump_standard':
      heatingScore = 20;
      heatingNote =
        'Standard heat pump (HSPF2 7.5–8.5) delivering 2.5–3.0x thermal efficiency vs resistance.';
      break;
    case 'heat_pump_inverter':
      heatingScore = 25;
      heatingNote =
        'Variable-speed cold-climate inverter heat pump (HSPF2 10+) maintaining efficiency down to -15°F.';
      break;
  }

  // 3. Cooling System Component - Max 15 pts
  let coolingScore = 10;
  let coolingNote = '';
  switch (input.coolingType) {
    case 'none':
      coolingScore = 15;
      coolingNote = 'No mechanical air conditioning installed (zero active cooling power draw).';
      break;
    case 'window_units':
      coolingScore = 6;
      coolingNote =
        'Window/portable AC units with low CEER ratings and air infiltration around sashes.';
      break;
    case 'central_old_seer10':
      coolingScore = 5;
      coolingNote =
        'Aging SEER 10 AC compressor drawing ~40% more electricity than modern minimums.';
      break;
    case 'central_standard_seer14':
      coolingScore = 11;
      coolingNote = 'Standard code-compliant SEER 14 / SEER2 13.4 central AC.';
      break;
    case 'heat_pump_seer2_16':
      coolingScore = 15;
      coolingNote = 'High-efficiency SEER2 16+ variable-capacity cooling.';
      break;
  }

  // 4. Water Heating Component - Max 15 pts
  let waterScore = 8;
  let waterNote = '';
  switch (input.waterHeaterType) {
    case 'electric_tank':
      waterScore = 4;
      waterNote = 'Standard electric resistance water heater consuming ~3,500–4,500 kWh/year.';
      break;
    case 'gas_tank':
      waterScore = 9;
      waterNote = 'Standard atmospheric gas tank (0.60 UEF).';
      break;
    case 'tankless_gas':
      waterScore = 12;
      waterNote = 'On-demand condensing gas tankless (0.90+ UEF) eliminating standby tank losses.';
      break;
    case 'heat_pump_hybrid':
      waterScore = 15;
      waterNote =
        'Hybrid heat pump water heater (3.5+ UEF) cutting water heating electricity by ~70%.';
      break;
  }

  // 5. Windows Component - Max 15 pts
  let windowScore = 8;
  let windowNote = '';
  switch (input.windowType) {
    case 'single_pane':
      windowScore = 3;
      windowNote = 'Single-pane glass with U-factor ~1.1 and high radiative heat gain/loss.';
      break;
    case 'double_clear':
      windowScore = 9;
      windowNote = 'Standard double-pane clear insulated glass units.';
      break;
    case 'double_low_e':
      windowScore = 13;
      windowNote = 'Energy Star double-pane with Low-E metallic coating and argon gas fill.';
      break;
    case 'triple_pane':
      windowScore = 15;
      windowNote = 'Triple-pane super-insulating glazing (U-factor <0.20).';
      break;
  }

  const rawTotalScore = envelopeScore + heatingScore + coolingScore + waterScore + windowScore;
  const score = Math.max(10, Math.min(100, rawTotalScore));

  // Determine Letter Grade
  let letterGrade: LetterGrade = 'C';
  if (score >= 92) letterGrade = 'A+';
  else if (score >= 82) letterGrade = 'A';
  else if (score >= 70) letterGrade = 'B';
  else if (score >= 54) letterGrade = 'C';
  else if (score >= 38) letterGrade = 'D';
  else letterGrade = 'F';

  // Baseline Energy Consumption Model (per sq ft scaling)
  let baseHeatingBtuPerSqft = 35000;
  let baseCoolingKwhPerSqft = 1.2;

  if (input.climateZone === 'cold') {
    baseHeatingBtuPerSqft = 55000;
    baseCoolingKwhPerSqft = 0.6;
  } else if (input.climateZone === 'hot_humid' || input.climateZone === 'hot_dry') {
    baseHeatingBtuPerSqft = 18000;
    baseCoolingKwhPerSqft = 2.4;
  } else if (input.climateZone === 'marine') {
    baseHeatingBtuPerSqft = 30000;
    baseCoolingKwhPerSqft = 0.3;
  }

  // Envelope and window modifiers
  const envelopeModifier = 1.6 - (envelopeScore / 30) * 0.9; // 0.7 to 1.6
  const windowModifier = 1.3 - (windowScore / 15) * 0.5; // 0.8 to 1.3
  const totalThermalLoad = baseHeatingBtuPerSqft * sqft * envelopeModifier * windowModifier;

  let annualElecHeatingKwh = 0;
  let annualGasHeatingTherms = 0;

  if (input.heatingType === 'electric_resistance') {
    annualElecHeatingKwh = totalThermalLoad / 3412;
  } else if (input.heatingType === 'heat_pump_standard') {
    annualElecHeatingKwh = totalThermalLoad / (3412 * 2.5);
  } else if (input.heatingType === 'heat_pump_inverter') {
    annualElecHeatingKwh = totalThermalLoad / (3412 * 3.4);
  } else if (input.heatingType === 'gas_standard_80') {
    annualGasHeatingTherms = totalThermalLoad / (100000 * 0.8);
    annualElecHeatingKwh = annualGasHeatingTherms * 2.5; // blower fan electricity
  } else if (input.heatingType === 'gas_high_96') {
    annualGasHeatingTherms = totalThermalLoad / (100000 * 0.96);
    annualElecHeatingKwh = annualGasHeatingTherms * 2.0;
  }

  // Cooling Consumption
  const coolingEfficiencyMultiplier =
    input.coolingType === 'none'
      ? 0
      : input.coolingType === 'window_units'
        ? 1.3
        : input.coolingType === 'central_old_seer10'
          ? 1.4
          : input.coolingType === 'central_standard_seer14'
            ? 1.0
            : 0.75;
  const annualCoolingKwh =
    baseCoolingKwhPerSqft * sqft * envelopeModifier * coolingEfficiencyMultiplier;

  // Water Heating Consumption
  let annualWaterKwh = 0;
  let annualWaterTherms = 0;
  if (input.waterHeaterType === 'electric_tank') {
    annualWaterKwh = 3800;
  } else if (input.waterHeaterType === 'heat_pump_hybrid') {
    annualWaterKwh = 1150;
  } else if (input.waterHeaterType === 'gas_tank') {
    annualWaterTherms = 220;
  } else if (input.waterHeaterType === 'tankless_gas') {
    annualWaterTherms = 140;
  }

  // Base Plug Loads & Lighting (~2.2 kWh/sqft/yr baseline)
  const basePlugLoadKwh = sqft * 2.2;

  const totalElecKwh = Math.round(
    annualElecHeatingKwh + annualCoolingKwh + annualWaterKwh + basePlugLoadKwh,
  );
  const totalGasTherms = Math.round(annualGasHeatingTherms + annualWaterTherms);

  const totalAnnualCost = totalElecKwh * elecRateDollars + totalGasTherms * gasPriceDollars;

  // Calculate annual waste vs. an optimal modern B+/A benchmark (Score 80)
  const benchmarkCost = totalAnnualCost * (0.45 + (score / 100) * 0.55);
  const annualWasteDollars = Math.max(0, Math.round(totalAnnualCost - benchmarkCost));

  // Build Prioritized Retrofit Roadmap
  const roadmap: RetrofitUpgradeItem[] = [];

  if (input.insulationLevel === 'poor_uninsulated' || input.insulationLevel === 'average_batt') {
    const savings = Math.round(
      (totalElecKwh * elecRateDollars + totalGasTherms * gasPriceDollars) * 0.16,
    );
    const cost = sqft > 2500 ? 2400 : 1600;
    roadmap.push({
      id: 'attic_insulation',
      title: 'Attic Air Sealing & R-49 Blown-in Insulation',
      category: 'envelope',
      description:
        'Seal thermal bypass penetrations around recessed lights, top plates, and chases, then blow cellulose/fiberglass to R-49.',
      estimatedCostRange: `$${cost.toLocaleString()} – $${(cost * 1.4).toLocaleString()}`,
      estimatedAnnualSavingsDollars: Math.max(120, savings),
      simplePaybackYears: parseFloat((cost / Math.max(120, savings)).toFixed(1)),
      priority: 'high',
    });
  }

  if (input.waterHeaterType === 'electric_tank') {
    const savings = Math.round((3800 - 1150) * elecRateDollars);
    const cost = 2200;
    roadmap.push({
      id: 'heat_pump_water_heater',
      title: 'Upgrade to Hybrid Heat Pump Water Heater',
      category: 'water_heating',
      description:
        'Replaces electric resistance tank with a 3.5+ UEF heat pump unit (eligible for 30% IRA 25C tax credit up to $2,000).',
      estimatedCostRange: '$1,800 – $2,600',
      estimatedAnnualSavingsDollars: savings,
      simplePaybackYears: parseFloat((cost / savings).toFixed(1)),
      priority: 'high',
    });
  }

  if (input.heatingType === 'electric_resistance' || input.coolingType === 'central_old_seer10') {
    const heatingSavings =
      annualElecHeatingKwh > 0 ? Math.round(annualElecHeatingKwh * 0.55 * elecRateDollars) : 250;
    const cost = sqft > 2200 ? 9500 : 7000;
    roadmap.push({
      id: 'inverter_heat_pump',
      title: 'High-Efficiency Inverter Heat Pump Conversion',
      category: 'hvac',
      description:
        'Replace aging SEER 10 AC or resistance baseboards with a modern variable-speed cold-climate heat pump (SEER2 16+, HSPF2 9.5+).',
      estimatedCostRange: `$${cost.toLocaleString()} – $${(cost * 1.5).toLocaleString()}`,
      estimatedAnnualSavingsDollars: Math.max(350, heatingSavings),
      simplePaybackYears: parseFloat((cost / Math.max(350, heatingSavings)).toFixed(1)),
      priority: 'high',
    });
  }

  if (input.windowType === 'single_pane') {
    const windowSavings = Math.round(totalAnnualCost * 0.09);
    roadmap.push({
      id: 'low_e_window_inserts',
      title: 'Low-E Insulating Window Inserts or Storm Panels',
      category: 'windows',
      description:
        'Install interior custom acrylic or Low-E glass inserts to stop drafts and double thermal resistance without replacing frames.',
      estimatedCostRange: '$800 – $1,800',
      estimatedAnnualSavingsDollars: Math.max(80, windowSavings),
      simplePaybackYears: parseFloat((1200 / Math.max(80, windowSavings)).toFixed(1)),
      priority: 'medium',
    });
  }

  // Always include smart thermostat if not already optimized
  const thermostatSavings = Math.round(totalAnnualCost * 0.07);
  roadmap.push({
    id: 'smart_thermostat',
    title: 'Smart Programmable Thermostat with Geofencing',
    category: 'controls',
    description:
      'Automates 7°F–10°F nighttime and away temperature setbacks, eliminating wasted heating and cooling in unoccupied hours.',
    estimatedCostRange: '$120 – $220',
    estimatedAnnualSavingsDollars: Math.max(60, thermostatSavings),
    simplePaybackYears: parseFloat((160 / Math.max(60, thermostatSavings)).toFixed(1)),
    priority: 'high',
  });

  // Sort roadmap by shortest payback / highest impact
  roadmap.sort((a, b) => a.simplePaybackYears - b.simplePaybackYears);

  let summary = '';
  if (score >= 80) {
    summary = `Your home demonstrates strong energy efficiency (Grade ${letterGrade}, Score ${score}/100). Thermal losses and mechanical energy waste are minimal compared to regional averages.`;
  } else if (score >= 55) {
    summary = `Your home has moderate efficiency (Grade ${letterGrade}, Score ${score}/100) with an estimated $${annualWasteDollars}/year in preventable thermal and mechanical energy waste. Targeted envelope air-sealing and HVAC upgrades offer high return on investment.`;
  } else {
    summary = `Your home exhibits significant energy inefficiency (Grade ${letterGrade}, Score ${score}/100), leaking an estimated $${annualWasteDollars}/year in unnecessary utility expense due to uninsulated envelope gaps or low-efficiency heating equipment.`;
  }

  return {
    score,
    letterGrade,
    estimatedAnnualElectricityKwh: totalElecKwh,
    estimatedAnnualGasTherms: totalGasTherms,
    estimatedAnnualTotalCostDollars: Math.round(totalAnnualCost),
    estimatedAnnualWasteDollars: annualWasteDollars,
    efficiencySummary: summary,
    componentScores: {
      envelope: {
        name: 'Building Envelope & Air Sealing',
        score: envelopeScore,
        maxScore: 30,
        status: envelopeScore >= 24 ? 'good' : envelopeScore >= 14 ? 'average' : 'poor',
        note: envelopeNote,
      },
      heating: {
        name: 'Primary Heating System',
        score: heatingScore,
        maxScore: 25,
        status: heatingScore >= 20 ? 'good' : heatingScore >= 12 ? 'average' : 'poor',
        note: heatingNote,
      },
      cooling: {
        name: 'Air Conditioning System',
        score: coolingScore,
        maxScore: 15,
        status: coolingScore >= 12 ? 'good' : coolingScore >= 8 ? 'average' : 'poor',
        note: coolingNote,
      },
      waterHeating: {
        name: 'Water Heating Equipment',
        score: waterScore,
        maxScore: 15,
        status: waterScore >= 12 ? 'good' : waterScore >= 8 ? 'average' : 'poor',
        note: waterNote,
      },
      windows: {
        name: 'Window Glazing & Draft Resistance',
        score: windowScore,
        maxScore: 15,
        status: windowScore >= 12 ? 'good' : windowScore >= 7 ? 'average' : 'poor',
        note: windowNote,
      },
    },
    retrofitRoadmap: roadmap,
  };
}
