/**
 * @file diagnose-bill-spike.ts
 * Pure TypeScript diagnostic engine that performs forensic analysis on electric bill spikes.
 * Identifies root-cause culprits, calculates probability scores, estimates dollar attribution,
 * and generates a prioritized, actionable savings plan.
 */

export type BillingSeason = 'summer' | 'winter' | 'shoulder';
export type RateStructure = 'flat' | 'tiered' | 'tou' | 'unknown';

export type HouseholdEquipment =
  | 'central_ac'
  | 'window_ac'
  | 'heat_pump'
  | 'space_heater'
  | 'electric_furnace'
  | 'electric_water_heater'
  | 'pool_pump'
  | 'ev'
  | 'dehumidifier'
  | 'hot_tub';

export type HouseholdEvent =
  | 'heat_wave'
  | 'cold_snap'
  | 'longer_billing_cycle'
  | 'estimated_meter_reading'
  | 'guests_or_wfh'
  | 'new_appliance'
  | 'rate_increase'
  | 'travel_unoccupied';

export interface DiagnoseBillSpikeInput {
  currentBillAmount: number;
  previousBillAmount: number;
  currentKwh: number;
  previousKwh: number;
  billingDaysCurrent?: number;
  billingDaysPrevious?: number;
  season?: BillingSeason;
  rateStructure?: RateStructure;
  equipment?: HouseholdEquipment[];
  events?: HouseholdEvent[];
  stateCode?: string;
}

export type CulpritSeverity = 'high' | 'medium' | 'low';

export interface CulpritDiagnosis {
  id: string;
  title: string;
  probabilityScore: number; // 0 - 100%
  severity: CulpritSeverity;
  estimatedDollarImpact: number;
  description: string;
  evidence: string;
  recommendedGuideSlug?: string;
}

export type ActionCategory = 'zero_cost' | 'low_cost' | 'utility_action';

export interface ActionItem {
  id: string;
  category: ActionCategory;
  title: string;
  description: string;
  estimatedSavingsPotential: string;
  difficulty: 'easy' | 'moderate' | 'advanced';
}

export interface MetricForensics {
  dollarChange: number;
  dollarChangePercent: number;
  kwhChange: number;
  kwhChangePercent: number;
  dailyKwhCurrent: number;
  dailyKwhPrevious: number;
  dailyKwhChangePercent: number;
  effectiveRateCurrentCents: number;
  effectiveRatePreviousCents: number;
  effectiveRateChangePercent: number;
  billingDaysDelta: number;
  billingDaysDollarImpact: number;
  usageVsRateAttribution: {
    usageSharePercent: number;
    rateSharePercent: number;
  };
}

export interface DiagnoseBillSpikeOutput {
  primaryDriver: string;
  summaryVerdict: string;
  metrics: MetricForensics;
  culprits: CulpritDiagnosis[];
  actionPlan: ActionItem[];
  relatedGuideSlugs: string[];
}

export function diagnoseBillSpike(input: DiagnoseBillSpikeInput): DiagnoseBillSpikeOutput {
  const currentBill = Math.max(0, input.currentBillAmount);
  const prevBill = Math.max(0, input.previousBillAmount);
  const currentKwh = Math.max(1, input.currentKwh);
  const prevKwh = Math.max(1, input.previousKwh);
  const daysCurrent = Math.max(1, input.billingDaysCurrent ?? 30);
  const daysPrev = Math.max(1, input.billingDaysPrevious ?? 30);
  const season = input.season ?? 'summer';
  const equipment = new Set(input.equipment ?? []);
  const events = new Set(input.events ?? []);

  // Forensics math
  const dollarChange = currentBill - prevBill;
  const dollarChangePercent = prevBill > 0 ? ((dollarChange) / prevBill) * 100 : 0;
  const kwhChange = currentKwh - prevKwh;
  const kwhChangePercent = prevKwh > 0 ? ((kwhChange) / prevKwh) * 100 : 0;

  const dailyKwhCurrent = currentKwh / daysCurrent;
  const dailyKwhPrevious = prevKwh / daysPrev;
  const dailyKwhChangePercent =
    dailyKwhPrevious > 0 ? ((dailyKwhCurrent - dailyKwhPrevious) / dailyKwhPrevious) * 100 : 0;

  const effectiveRateCurrentCents = (currentBill / currentKwh) * 100;
  const effectiveRatePreviousCents = (prevBill / prevKwh) * 100;
  const effectiveRateChangePercent =
    effectiveRatePreviousCents > 0
      ? ((effectiveRateCurrentCents - effectiveRatePreviousCents) / effectiveRatePreviousCents) * 100
      : 0;

  const billingDaysDelta = daysCurrent - daysPrev;
  const prevDailyCost = prevBill / daysPrev;
  const billingDaysDollarImpact = Math.max(0, billingDaysDelta * prevDailyCost);

  // Usage vs Rate attribution
  let usageSharePercent = 50;
  let rateSharePercent = 50;
  const totalChangeMagnitude = Math.abs(kwhChangePercent) + Math.abs(effectiveRateChangePercent);
  if (totalChangeMagnitude > 0) {
    usageSharePercent = Math.round((Math.abs(kwhChangePercent) / totalChangeMagnitude) * 100);
    rateSharePercent = 100 - usageSharePercent;
  }

  const culprits: CulpritDiagnosis[] = [];
  const relatedGuideSlugs: string[] = [];

  // --- 1. Cooling Load / AC Compressor Runtime ---
  if (season === 'summer' || equipment.has('central_ac') || equipment.has('window_ac') || events.has('heat_wave')) {
    let coolingScore = 20;
    if (season === 'summer') coolingScore += 25;
    if (events.has('heat_wave')) coolingScore += 30;
    if (equipment.has('central_ac')) coolingScore += 20;
    if (equipment.has('window_ac')) coolingScore += 15;
    if (dailyKwhChangePercent > 20) coolingScore += 15;

    coolingScore = Math.min(95, coolingScore);
    const estCoolingCost = Math.max(10, Math.round(dollarChange * (coolingScore / 100)));

    culprits.push({
      id: 'cooling_runtime_surge',
      title: 'Air Conditioning Compressor Runtime Surge',
      probabilityScore: coolingScore,
      severity: coolingScore > 65 ? 'high' : coolingScore > 40 ? 'medium' : 'low',
      estimatedDollarImpact: estCoolingCost,
      description:
        'Elevated outdoor temperatures force central air compressors and window AC units to cycle continuously, increasing daily kWh consumption by 30% to 70%.',
      evidence: events.has('heat_wave')
        ? 'Heat wave event reported with active cooling equipment.'
        : `Daily electricity consumption increased by ${dailyKwhChangePercent.toFixed(1)}% during summer cooling months.`,
      recommendedGuideSlug: 'how-much-does-it-cost-to-run-an-air-conditioner',
    });
    relatedGuideSlugs.push('how-much-does-it-cost-to-run-an-air-conditioner');
    relatedGuideSlugs.push('should-you-turn-off-the-air-conditioner-when-away');
  }

  // --- 2. Heating Load / Space Heaters & Auxiliary Resistance Strips ---
  if (
    season === 'winter' ||
    equipment.has('space_heater') ||
    equipment.has('heat_pump') ||
    equipment.has('electric_furnace') ||
    events.has('cold_snap')
  ) {
    let heatingScore = 20;
    if (season === 'winter') heatingScore += 25;
    if (events.has('cold_snap')) heatingScore += 30;
    if (equipment.has('space_heater')) heatingScore += 25;
    if (equipment.has('electric_furnace')) heatingScore += 20;
    if (equipment.has('heat_pump') && events.has('cold_snap')) heatingScore += 25;
    if (dailyKwhChangePercent > 25) heatingScore += 15;

    heatingScore = Math.min(95, heatingScore);
    const estHeatingCost = Math.max(15, Math.round(dollarChange * (heatingScore / 100)));

    culprits.push({
      id: 'heating_resistance_surge',
      title: 'Space Heater or Auxiliary Electric Heat Strip Activation',
      probabilityScore: heatingScore,
      severity: heatingScore > 65 ? 'high' : heatingScore > 40 ? 'medium' : 'low',
      estimatedDollarImpact: estHeatingCost,
      description:
        'Portable 1,500W electric space heaters or heat pump auxiliary resistance heat strips (5 kW to 15 kW) draw massive continuous power during sub-freezing weather.',
      evidence: equipment.has('space_heater')
        ? 'Electric space heaters operate at 1.5 kW draw per unit.'
        : 'Sub-freezing temperatures often trigger emergency auxiliary electric resistance strips.',
      recommendedGuideSlug: 'how-much-does-it-cost-to-run-a-space-heater',
    });
    relatedGuideSlugs.push('how-much-does-it-cost-to-run-a-space-heater');
    relatedGuideSlugs.push('heat-pump-vs-electric-resistance-heating-cost');
  }

  // --- 3. Longer Billing Cycle ---
  if (billingDaysDelta >= 2 || events.has('longer_billing_cycle')) {
    const daysScore = Math.min(90, Math.max(50, billingDaysDelta * 15));
    culprits.push({
      id: 'longer_billing_cycle',
      title: `Extended Billing Cycle (+${billingDaysDelta} Days)`,
      probabilityScore: daysScore,
      severity: billingDaysDelta >= 4 ? 'high' : 'medium',
      estimatedDollarImpact: Math.round(billingDaysDollarImpact),
      description: `Your utility statement covered ${daysCurrent} days compared to ${daysPrev} days in the previous period. Calendar day expansion naturally inflates total bill amounts even with identical daily habits.`,
      evidence: `Statement period includes ${billingDaysDelta} additional calendar days of baseline household consumption.`,
      recommendedGuideSlug: 'how-billing-cycle-length-affects-electricity-bills',
    });
    relatedGuideSlugs.push('how-billing-cycle-length-affects-electricity-bills');
  }

  // --- 4. Rate Tariff / Utility Rider / Fuel Adjustment Increase ---
  if (effectiveRateChangePercent > 5 || events.has('rate_increase')) {
    let rateScore = 30;
    if (effectiveRateChangePercent > 15) rateScore += 40;
    else if (effectiveRateChangePercent > 5) rateScore += 20;
    if (events.has('rate_increase')) rateScore += 20;

    rateScore = Math.min(95, rateScore);
    const estRateCost = Math.max(5, Math.round(dollarChange * (rateScore / 100)));

    culprits.push({
      id: 'utility_rate_spike',
      title: 'Utility Tariff, Rider or Fuel Adjustment Surcharge Increase',
      probabilityScore: rateScore,
      severity: effectiveRateChangePercent > 15 ? 'high' : 'medium',
      estimatedDollarImpact: estRateCost,
      description: `Your effective cost per kWh increased by ${effectiveRateChangePercent.toFixed(1)}% (from ${effectiveRatePreviousCents.toFixed(2)}¢ to ${effectiveRateCurrentCents.toFixed(2)}¢/kWh), indicating a utility rate hike, seasonal tier jump, or fuel surcharge.`,
      evidence: `Effective rate jumped from ${effectiveRatePreviousCents.toFixed(2)}¢ to ${effectiveRateCurrentCents.toFixed(2)}¢ per kWh.`,
      recommendedGuideSlug: 'why-electricity-rates-change',
    });
    relatedGuideSlugs.push('why-electricity-rates-change');
    relatedGuideSlugs.push('fuel-adjustment-charges-and-utility-riders-explained');
  }

  // --- 5. Estimated Meter Reading Reconciliation ---
  if (events.has('estimated_meter_reading')) {
    culprits.push({
      id: 'estimated_meter_reconciliation',
      title: 'Estimated Meter Reading "True-Up" Charge',
      probabilityScore: 85,
      severity: 'high',
      estimatedDollarImpact: Math.max(20, Math.round(dollarChange * 0.7)),
      description:
        'When a utility cannot physically or digitally read your meter, they estimate previous usage. If previous bills were underestimated, the subsequent actual read captures all unpaid past consumption in one statement.',
      evidence: 'Estimated meter reading flag identified in billing cycle.',
      recommendedGuideSlug: 'estimated-vs-actual-meter-reading',
    });
    relatedGuideSlugs.push('estimated-vs-actual-meter-reading');
  }

  // --- 6. Water Heater Standby & High-Draw Baseline ---
  if (equipment.has('electric_water_heater')) {
    culprits.push({
      id: 'water_heater_baseline',
      title: 'Electric Water Heater Standby Losses & Hot Water Draw',
      probabilityScore: 40,
      severity: 'medium',
      estimatedDollarImpact: Math.round(Math.min(dollarChange * 0.35, 45)),
      description:
        'Standard 4,500W dual-element electric resistance water heaters account for 18% to 25% of typical home electricity. High thermostat setpoints (140°F) and colder inlet water increase standby heating cycles.',
      evidence: 'Electric water heater identified in household baseline equipment.',
      recommendedGuideSlug: 'how-much-does-it-cost-to-run-an-electric-water-heater',
    });
    relatedGuideSlugs.push('how-much-does-it-cost-to-run-an-electric-water-heater');
  }

  // --- 7. EV / Pool Pump / Hot Tub / New Appliances ---
  if (equipment.has('ev') || equipment.has('pool_pump') || equipment.has('hot_tub') || events.has('new_appliance')) {
    const heavyLoads: string[] = [];
    if (equipment.has('ev')) heavyLoads.push('EV Home Charging');
    if (equipment.has('pool_pump')) heavyLoads.push('Pool Pump');
    if (equipment.has('hot_tub')) heavyLoads.push('Hot Tub Heater');
    if (events.has('new_appliance')) heavyLoads.push('New Major Appliance');

    culprits.push({
      id: 'heavy_appliance_addition',
      title: `High-Draw Equipment Operating Cycles (${heavyLoads.join(', ')})`,
      probabilityScore: 60,
      severity: 'medium',
      estimatedDollarImpact: Math.round(Math.min(dollarChange * 0.5, 65)),
      description: `High-wattage continuous equipment (${heavyLoads.join(', ')}) significantly elevates daily baseline kWh consumption.`,
      evidence: `Active equipment profile includes: ${heavyLoads.join(', ')}.`,
      recommendedGuideSlug: equipment.has('ev')
        ? 'how-much-does-it-cost-to-charge-an-ev-at-home'
        : 'how-much-does-it-cost-to-run-a-pool-pump',
    });
    if (equipment.has('ev')) relatedGuideSlugs.push('how-much-does-it-cost-to-charge-an-ev-at-home');
    if (equipment.has('pool_pump')) relatedGuideSlugs.push('how-much-does-it-cost-to-run-a-pool-pump');
  }

  // --- 8. Occupancy / Work From Home / Guests ---
  if (events.has('guests_or_wfh')) {
    culprits.push({
      id: 'occupancy_surge',
      title: 'Increased Household Daytime Occupancy & Plug Loads',
      probabilityScore: 50,
      severity: 'low',
      estimatedDollarImpact: Math.round(Math.min(dollarChange * 0.3, 35)),
      description:
        'More people staying home during daytime hours increases cooking, laundry, electronics runtime, and daytime thermostat comfort requirements.',
      evidence: 'Guest visit or work-from-home daytime occupancy reported.',
      recommendedGuideSlug: 'how-much-electricity-do-household-appliances-use',
    });
    relatedGuideSlugs.push('how-much-electricity-do-household-appliances-use');
  }

  // Sort culprits by probability score descending
  culprits.sort((a, b) => b.probabilityScore - a.probabilityScore);

  // If no culprits triggered, provide a general baseline analysis
  if (culprits.length === 0) {
    culprits.push({
      id: 'general_usage_creep',
      title: 'Household Baseline Usage Creep & Plug Loads',
      probabilityScore: 55,
      severity: 'medium',
      estimatedDollarImpact: Math.round(dollarChange),
      description:
        'Continuous phantom loads, older refrigeration equipment, and incremental plug loads gradually increase monthly kWh consumption.',
      evidence: `Daily usage shifted from ${dailyKwhPrevious.toFixed(1)} kWh to ${dailyKwhCurrent.toFixed(1)} kWh.`,
      recommendedGuideSlug: 'why-is-my-electric-bill-so-high',
    });
    relatedGuideSlugs.push('why-is-my-electric-bill-so-high');
  }

  // Generate actionable recommendations
  const actionPlan: ActionItem[] = [];

  // Zero cost
  actionPlan.push({
    id: 'thermostat_setback',
    category: 'zero_cost',
    title: 'Implement Smart Thermostat Setbacks & Ceiling Fan Wind-Chill',
    description:
      'In summer, raise the thermostat from 74°F to 78°F and run ceiling fans when occupied (cooling skin by 4°F through convective wind chill) to cut cooling costs by 12% to 15%. In winter, lower heating setpoints to 68°F.',
    estimatedSavingsPotential: '$15 – $35 / month',
    difficulty: 'easy',
  });

  if (equipment.has('electric_water_heater')) {
    actionPlan.push({
      id: 'water_heater_setpoint',
      category: 'zero_cost',
      title: 'Lower Water Heater Temperature to 120°F (50°C)',
      description:
        'Most factory water heaters are preset to 140°F. Dialing down to 120°F reduces standby thermal heat loss by over $40/year without sacrificing shower comfort.',
      estimatedSavingsPotential: '$3 – $6 / month',
      difficulty: 'easy',
    });
  }

  // Low cost
  actionPlan.push({
    id: 'air_filter_weatherstrip',
    category: 'low_cost',
    title: 'Replace Dirty HVAC Air Filters & Seal Door Drafts',
    description:
      'A clogged HVAC filter increases blower motor power draw by 15% and forces compressors to run longer cycles. Replace 1-inch filters every 60–90 days.',
    estimatedSavingsPotential: '$8 – $18 / month',
    difficulty: 'easy',
  });

  // Utility action
  if (events.has('estimated_meter_reading')) {
    actionPlan.push({
      id: 'utility_meter_audit',
      category: 'utility_action',
      title: 'Request a Utility Meter Verification & True-Up Audit',
      description:
        'Call your electric utility provider to verify the actual physical meter reading and request a payment arrangement if past estimated months created a sudden catch-up balance.',
      estimatedSavingsPotential: 'Balance Correction',
      difficulty: 'moderate',
    });
  } else {
    actionPlan.push({
      id: 'tariff_tou_review',
      category: 'utility_action',
      title: 'Evaluate Time-of-Use (TOU) or Off-Peak Rate Schedules',
      description:
        'Check if your utility offers a TOU rate plan. If you can shift EV charging, laundry, and pool pump filtration to off-peak hours (overnight/morning), you can cut per-kWh rates by up to 50%.',
      estimatedSavingsPotential: '$20 – $50 / month',
      difficulty: 'moderate',
    });
  }

  // Determine primary driver verdict
  const topCulprit = culprits[0]!;
  const primaryDriver = topCulprit.title;
  const summaryVerdict =
    dollarChange > 0
      ? `Your electric bill increased by $${dollarChange.toFixed(2)} (+${dollarChangePercent.toFixed(1)}%). Our forensic analysis indicates that ${usageSharePercent}% of the change is attributable to higher kWh usage, led by "${topCulprit.title}" (Estimated $${topCulprit.estimatedDollarImpact} impact), while ${rateSharePercent}% is related to effective rate/fee dynamics.`
      : `Your electric bill decreased by $${Math.abs(dollarChange).toFixed(2)} (${dollarChangePercent.toFixed(1)}%). Daily energy consumption averaged ${dailyKwhCurrent.toFixed(1)} kWh/day at an effective rate of ${effectiveRateCurrentCents.toFixed(2)}¢/kWh.`;

  // Deduplicate guide slugs
  const uniqueGuideSlugs = Array.from(new Set(relatedGuideSlugs)).slice(0, 5);

  return {
    primaryDriver,
    summaryVerdict,
    metrics: {
      dollarChange,
      dollarChangePercent,
      kwhChange,
      kwhChangePercent,
      dailyKwhCurrent,
      dailyKwhPrevious,
      dailyKwhChangePercent,
      effectiveRateCurrentCents,
      effectiveRatePreviousCents,
      effectiveRateChangePercent,
      billingDaysDelta,
      billingDaysDollarImpact,
      usageVsRateAttribution: {
        usageSharePercent,
        rateSharePercent,
      },
    },
    culprits,
    actionPlan,
    relatedGuideSlugs: uniqueGuideSlugs,
  };
}
