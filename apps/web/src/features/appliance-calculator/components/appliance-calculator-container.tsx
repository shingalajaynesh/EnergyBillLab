'use client';

import {
  calculateApplianceCost,
  type ApplianceCostResult,
} from '@energy-bill-lab/calculation-engine';
import React, { useState } from 'react';

import { ApplianceCalculatorForm, type StateRateOption } from './appliance-calculator-form';
import { ApplianceCalculatorResults } from './appliance-calculator-results';
import { WorkedExampleSection } from './worked-example-section';

type ApplianceCalculatorContainerProps = {
  stateRates?: StateRateOption[];
};

const DEFAULT_INITIAL_RESULT: ApplianceCostResult = calculateApplianceCost({
  wattage: 1500,
  hoursPerDay: 4,
  days: 30,
  rateCentsPerKwh: 16.5,
  dutyCyclePercent: 100,
});

export function ApplianceCalculatorContainer({
  stateRates = [],
}: ApplianceCalculatorContainerProps) {
  const [result, setResult] = useState<ApplianceCostResult>(DEFAULT_INITIAL_RESULT);
  const [periodDays, setPeriodDays] = useState<number>(30);

  return (
    <div>
      <ApplianceCalculatorForm
        stateRates={stateRates}
        onCalculate={(newResult) => {
          setResult(newResult);
          // Calculate period days ratio from periodKwh / dailyKwh when dailyKwh > 0
          if (newResult.dailyKwh > 0) {
            const calculatedDays = Math.round(newResult.periodKwh / newResult.dailyKwh);
            setPeriodDays(calculatedDays);
          }
        }}
        onReset={() => {
          setResult(DEFAULT_INITIAL_RESULT);
          setPeriodDays(30);
        }}
      />

      <ApplianceCalculatorResults result={result} periodDays={periodDays} />

      <WorkedExampleSection result={result} periodDays={periodDays} />
    </div>
  );
}
