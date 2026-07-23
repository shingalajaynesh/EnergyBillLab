'use client';

import {
  calculateSpaceHeaterCost,
  type SpaceHeaterCostResult,
} from '@energy-bill-lab/calculation-engine';
import React, { useState } from 'react';

import { SpaceHeaterForm, type StateRateOption } from './space-heater-form';
import { SpaceHeaterResults } from './space-heater-results';
import { WorkedExampleSection } from './worked-example-section';

type SpaceHeaterContainerProps = {
  stateRates?: StateRateOption[];
};

const DEFAULT_INITIAL_RESULT: SpaceHeaterCostResult = calculateSpaceHeaterCost({
  heaterWatts: 1500,
  quantity: 1,
  hoursPerDay: 4,
  days: 30,
  rateCentsPerKwh: 16.5,
  dutyCyclePercent: 80,
});

export function SpaceHeaterContainer({ stateRates = [] }: SpaceHeaterContainerProps) {
  const [result, setResult] = useState<SpaceHeaterCostResult>(DEFAULT_INITIAL_RESULT);
  const [periodDays, setPeriodDays] = useState<number>(30);

  return (
    <div>
      <SpaceHeaterForm
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

      <SpaceHeaterResults result={result} periodDays={periodDays} />

      <WorkedExampleSection result={result} periodDays={periodDays} />
    </div>
  );
}
