export type GasFurnaceCostInput =
  | {
      mode: 'input_capacity';
      inputBtuPerHour: number;
      runtimeHoursPerDay: number;
      days: number;
      ratePerThermUsd: number;
    }
  | {
      mode: 'heating_output';
      outputBtuPerHour: number;
      afuePercent: number;
      runtimeHoursPerDay: number;
      days: number;
      ratePerThermUsd: number;
    };

export type GasFurnaceCostOutput = {
  mode: 'input_capacity' | 'heating_output';
  inputBtuPerHour: number;
  outputBtuPerHour?: number;
  afuePercent?: number;
  runtimeHoursPerDay: number;
  days: number;
  totalRuntimeHours: number;
  thermsUsed: number;
  ratePerThermUsd: number;
  totalUsageCostUsd: number;
  dailyCostUsd: number;
  monthlyCostUsd: number;
  assumptions: string[];
  limitations: string[];
};

export function calculateGasFurnaceCost(input: GasFurnaceCostInput): GasFurnaceCostOutput {
  const runtimeHoursPerDay = Math.max(
    0,
    Math.min(24, Number.isFinite(input.runtimeHoursPerDay) ? input.runtimeHoursPerDay : 0),
  );
  const days = Math.max(1, Math.min(365, Number.isFinite(input.days) ? input.days : 30));
  const ratePerThermUsd = Math.max(
    0,
    Number.isFinite(input.ratePerThermUsd) ? input.ratePerThermUsd : 0,
  );

  const totalRuntimeHours = Number((runtimeHoursPerDay * days).toFixed(2));

  let inputBtuPerHour = 0;
  let outputBtuPerHour: number | undefined;
  let afuePercent: number | undefined;

  if (input.mode === 'input_capacity') {
    inputBtuPerHour = Math.max(
      0,
      Number.isFinite(input.inputBtuPerHour) ? input.inputBtuPerHour : 0,
    );
  } else {
    outputBtuPerHour = Math.max(
      0,
      Number.isFinite(input.outputBtuPerHour) ? input.outputBtuPerHour : 0,
    );
    afuePercent = Math.max(
      50,
      Math.min(99, Number.isFinite(input.afuePercent) ? input.afuePercent : 80),
    );
    inputBtuPerHour = outputBtuPerHour / (afuePercent / 100);
  }

  // 1 therm = 100,000 Btu
  const btuPerTherm = 100000;
  const thermsUsed = Number(((inputBtuPerHour * totalRuntimeHours) / btuPerTherm).toFixed(2));
  const totalUsageCostUsd = Number((thermsUsed * ratePerThermUsd).toFixed(2));
  const dailyCostUsd = days > 0 ? Number((totalUsageCostUsd / days).toFixed(2)) : 0;
  const monthlyCostUsd = Number((dailyCostUsd * 30).toFixed(2));

  const assumptions: string[] = [
    input.mode === 'input_capacity'
      ? `Furnace input capacity rated at ${inputBtuPerHour.toLocaleString()} Btu/hr.`
      : `Furnace heating output rated at ${(outputBtuPerHour ?? 0).toLocaleString()} Btu/hr with ${afuePercent}% AFUE seasonal efficiency (input capacity: ${Math.round(
          inputBtuPerHour,
        ).toLocaleString()} Btu/hr).`,
    `Burner runtime estimated at ${runtimeHoursPerDay} hours per day over ${days} active heating days (${totalRuntimeHours} total runtime hours).`,
    `Natural gas pricing assumed at $${ratePerThermUsd.toFixed(2)} per therm (1 therm = 100,000 Btu).`,
  ];

  const limitations: string[] = [
    'Calculates volumetric natural gas usage cost only. Electricity needed for the furnace blower motor (typically 300W to 800W) is not included.',
    'Thermostat cycling, outdoor winter temperatures, building insulation, and duct losses alter actual burner firing hours.',
    'Utility fixed monthly customer charges, delivery fees, and taxes are excluded.',
  ];

  return {
    mode: input.mode,
    inputBtuPerHour: Math.round(inputBtuPerHour),
    outputBtuPerHour,
    afuePercent,
    runtimeHoursPerDay,
    days,
    totalRuntimeHours,
    thermsUsed,
    ratePerThermUsd,
    totalUsageCostUsd,
    dailyCostUsd,
    monthlyCostUsd,
    assumptions,
    limitations,
  };
}
