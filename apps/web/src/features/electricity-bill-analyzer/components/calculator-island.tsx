'use client';

import React, { useState } from 'react';

import type { StateRatesSnapshot } from '@/lib/server/get-state-rates';
import { calculateElectricityBill } from '../lib/calculate-electricity-bill';
import type { CalculationResult, ElectricityBillInput } from '../types/electricity-bill-types';

import { BillAnalyzerForm } from './bill-analyzer-form';
import { BillAnalyzerResults } from './bill-analyzer-results';
import styles from './calculator-island.module.css';

type CalculatorIslandProps = {
  stateRatesSnapshot?: StateRatesSnapshot;
};

export function CalculatorIsland({ stateRatesSnapshot }: CalculatorIslandProps) {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [selectedStateCode, setSelectedStateCode] = useState<string | undefined>(undefined);

  const handleCalculate = (input: ElectricityBillInput, stateCode?: string) => {
    const calcResult = calculateElectricityBill(input);
    setResult(calcResult);
    setSelectedStateCode(stateCode);

    // Scroll smoothly to results
    setTimeout(() => {
      document.getElementById('calculator-results')?.focus();
    }, 50);
  };

  const handleReset = () => {
    setResult(null);
    setSelectedStateCode(undefined);
  };

  const stateRateInfo =
    selectedStateCode && stateRatesSnapshot?.rates?.[selectedStateCode]
      ? stateRatesSnapshot.rates[selectedStateCode]
      : null;

  return (
    <div className={styles.islandContainer}>
      <BillAnalyzerForm
        geographies={stateRatesSnapshot?.geographies}
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result ? (
        <div className={styles.resultsArea}>
          <BillAnalyzerResults
            onReset={handleReset}
            result={result}
            selectedStateRate={stateRateInfo}
          />
        </div>
      ) : null}
    </div>
  );
}
