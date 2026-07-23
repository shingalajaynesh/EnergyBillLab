'use client';

import { calculateAcCost, type AcCostResult } from '@energy-bill-lab/calculation-engine';
import React, { useState } from 'react';

import { AcCalculatorForm, type StateRateOption } from './ac-calculator-form';
import { AcCalculatorResults } from './ac-calculator-results';
import { WorkedExampleSection } from './worked-example-section';

type AcCalculatorContainerProps = {
  stateRates?: StateRateOption[];
};

const DEFAULT_INITIAL_RESULT: AcCostResult = calculateAcCost({
  mode: 'capacity_eer',
  acType: 'window',
  coolingCapacityBtu: 12000,
  eer: 12.0,
  hoursPerDay: 8,
  days: 30,
  rateCentsPerKwh: 16.5,
  dutyCyclePercent: 60,
});

export function AcCalculatorContainer({ stateRates = [] }: AcCalculatorContainerProps) {
  const [result, setResult] = useState<AcCostResult>(DEFAULT_INITIAL_RESULT);
  const [periodDays, setPeriodDays] = useState<number>(30);

  return (
    <div>
      <AcCalculatorForm
        stateRates={stateRates}
        onCalculate={(newResult) => {
          setResult(newResult);
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

      <AcCalculatorResults result={result} periodDays={periodDays} />

      <WorkedExampleSection result={result} periodDays={periodDays} />
    </div>
  );
}
