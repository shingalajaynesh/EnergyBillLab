'use client';

import React, { useState } from 'react';

import { calculateElectricityBill } from '../lib/calculate-electricity-bill';
import type { CalculationResult, ElectricityBillInput } from '../types/electricity-bill-types';

import { BillAnalyzerForm } from './bill-analyzer-form';
import { BillAnalyzerResults } from './bill-analyzer-results';
import styles from './calculator-island.module.css';

export function CalculatorIsland() {
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = (input: ElectricityBillInput) => {
    const calcResult = calculateElectricityBill(input);
    setResult(calcResult);

    // Scroll smoothly to results
    setTimeout(() => {
      document.getElementById('calculator-results')?.focus();
    }, 50);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className={styles.islandContainer}>
      <BillAnalyzerForm onCalculate={handleCalculate} onReset={handleReset} />

      {result ? (
        <div className={styles.resultsArea}>
          <BillAnalyzerResults onReset={handleReset} result={result} />
        </div>
      ) : null}
    </div>
  );
}
