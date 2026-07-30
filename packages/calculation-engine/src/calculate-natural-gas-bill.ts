export type NaturalGasBillInput = {
  usage: number;
  unit: 'therms' | 'mcf';
  pricePerUnit: number;
  fixedChargeUsd?: number;
  taxesAndFeesUsd?: number;
};

export type NaturalGasBillOutput = {
  usage: number;
  unit: 'therms' | 'mcf';
  pricePerUnit: number;
  usageChargeUsd: number;
  fixedChargeUsd: number;
  taxesAndFeesUsd: number;
  totalBillUsd: number;
  effectiveCostPerUnit: number;
  assumptions: string[];
  limitations: string[];
};

export function calculateNaturalGasBill(input: NaturalGasBillInput): NaturalGasBillOutput {
  const usage = Math.max(0, Number.isFinite(input.usage) ? input.usage : 0);
  const pricePerUnit = Math.max(0, Number.isFinite(input.pricePerUnit) ? input.pricePerUnit : 0);
  const fixedChargeUsd = Math.max(
    0,
    Number.isFinite(input.fixedChargeUsd) ? (input.fixedChargeUsd ?? 0) : 0,
  );
  const taxesAndFeesUsd = Math.max(
    0,
    Number.isFinite(input.taxesAndFeesUsd) ? (input.taxesAndFeesUsd ?? 0) : 0,
  );

  const usageChargeUsd = Number((usage * pricePerUnit).toFixed(2));
  const totalBillUsd = Number((usageChargeUsd + fixedChargeUsd + taxesAndFeesUsd).toFixed(2));
  const effectiveCostPerUnit = usage > 0 ? Number((totalBillUsd / usage).toFixed(4)) : pricePerUnit;

  const unitLabel = input.unit === 'mcf' ? 'Mcf (thousand cubic feet)' : 'therms';

  const assumptions: string[] = [
    `Volumetric natural gas usage is calculated at ${usage} ${unitLabel} at $${pricePerUnit.toFixed(
      2,
    )} per ${input.unit === 'mcf' ? 'Mcf' : 'therm'}.`,
    `Fixed customer account charge is set to $${fixedChargeUsd.toFixed(2)} per billing cycle.`,
    `User-entered taxes and rider fees total $${taxesAndFeesUsd.toFixed(2)}.`,
  ];

  const limitations: string[] = [
    'Actual natural gas bills include local utility distribution rates, weather-normalization adjustments, and seasonal tariff tiers.',
    'EIA state averages represent aggregate retail revenue divided by volume, not a specific local gas utility price schedule.',
    'Gas heat content varies slightly by supplier region (typically 1.02 to 1.05 therms per Ccf / 10.2 to 10.5 therms per Mcf).',
  ];

  return {
    usage,
    unit: input.unit,
    pricePerUnit,
    usageChargeUsd,
    fixedChargeUsd,
    taxesAndFeesUsd,
    totalBillUsd,
    effectiveCostPerUnit,
    assumptions,
    limitations,
  };
}
