'use client';

import {
  calculateEvChargingCost,
  type EvChargingCostResult,
} from '@energy-bill-lab/calculation-engine';
import React, { useState } from 'react';

import { DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH } from '@/lib/constants/electricity';

import { EvForm, type StateRateOption } from './ev-form';
import { EvResults } from './ev-results';
import { WorkedExampleSection } from './worked-example-section';

type EvContainerProps = {
  stateRates?: StateRateOption[];
};

const DEFAULT_INITIAL_RESULT: EvChargingCostResult = calculateEvChargingCost({
  batteryCapacityKwh: 75,
  startingChargePercent: 20,
  targetChargePercent: 80,
  chargingEfficiencyPercent: 90,
  rateCentsPerKwh: DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
  milesDriven: 30,
  milesPerKwh: 3.3,
});

export function EvContainer({ stateRates = [] }: EvContainerProps) {
  const [result, setResult] = useState<EvChargingCostResult>(DEFAULT_INITIAL_RESULT);

  return (
    <div>
      <EvForm
        stateRates={stateRates}
        onCalculate={(newResult) => {
          setResult(newResult);
        }}
        onReset={() => {
          setResult(DEFAULT_INITIAL_RESULT);
        }}
      />

      <EvResults result={result} />

      <WorkedExampleSection result={result} />
    </div>
  );
}
