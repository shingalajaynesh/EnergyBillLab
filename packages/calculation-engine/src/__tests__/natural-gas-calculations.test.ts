import { describe, expect, it } from 'vitest';

import { calculateGasFurnaceCost, calculateNaturalGasBill } from '../index';

describe('Natural Gas Calculation Engine', () => {
  describe('calculateNaturalGasBill', () => {
    it('calculates bill with therms usage, fixed charge, and fees', () => {
      const result = calculateNaturalGasBill({
        usage: 100,
        unit: 'therms',
        pricePerUnit: 1.75,
        fixedChargeUsd: 15.0,
        taxesAndFeesUsd: 12.5,
      });

      expect(result.usageChargeUsd).toBe(175.0);
      expect(result.totalBillUsd).toBe(202.5);
      expect(result.effectiveCostPerUnit).toBe(2.025);
      expect(result.assumptions.length).toBeGreaterThan(0);
    });

    it('calculates bill with Mcf usage', () => {
      const result = calculateNaturalGasBill({
        usage: 10,
        unit: 'mcf',
        pricePerUnit: 18.17,
        fixedChargeUsd: 10.0,
      });

      expect(result.usageChargeUsd).toBe(181.7);
      expect(result.totalBillUsd).toBe(191.7);
    });

    it('handles zero or negative inputs safely', () => {
      const result = calculateNaturalGasBill({
        usage: -5,
        unit: 'therms',
        pricePerUnit: -2,
      });

      expect(result.usage).toBe(0);
      expect(result.pricePerUnit).toBe(0);
      expect(result.totalBillUsd).toBe(0);
    });
  });

  describe('calculateGasFurnaceCost', () => {
    it('calculates Mode A (input capacity)', () => {
      const result = calculateGasFurnaceCost({
        mode: 'input_capacity',
        inputBtuPerHour: 100000,
        runtimeHoursPerDay: 5,
        days: 30,
        ratePerThermUsd: 1.75,
      });

      expect(result.thermsUsed).toBe(150); // 100,000 * 150 / 100,000 = 150 therms
      expect(result.totalUsageCostUsd).toBe(262.5); // 150 * 1.75 = 262.50
    });

    it('calculates Mode B (output capacity with AFUE efficiency)', () => {
      const result = calculateGasFurnaceCost({
        mode: 'heating_output',
        outputBtuPerHour: 80000,
        afuePercent: 80,
        runtimeHoursPerDay: 4,
        days: 30,
        ratePerThermUsd: 1.5,
      });

      // 80,000 / 0.8 = 100,000 input Btu/hr
      // 100,000 * 120 hrs / 100,000 = 120 therms
      // 120 * 1.50 = 180.00
      expect(result.inputBtuPerHour).toBe(100000);
      expect(result.thermsUsed).toBe(120);
      expect(result.totalUsageCostUsd).toBe(180.0);
    });

    it('clamps invalid runtime and AFUE values safely', () => {
      const result = calculateGasFurnaceCost({
        mode: 'heating_output',
        outputBtuPerHour: 60000,
        afuePercent: 120, // max 99
        runtimeHoursPerDay: 30, // max 24
        days: 30,
        ratePerThermUsd: 1.5,
      });

      expect(result.afuePercent).toBe(99);
      expect(result.runtimeHoursPerDay).toBe(24);
    });
  });
});
