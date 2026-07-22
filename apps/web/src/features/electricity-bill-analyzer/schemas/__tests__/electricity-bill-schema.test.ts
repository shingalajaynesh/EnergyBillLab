import { describe, expect, it } from 'vitest';

import { electricityBillSchema } from '../electricity-bill-schema';

describe('electricityBillSchema', () => {
  it('validates valid basic input successfully', () => {
    const result = electricityBillSchema.safeParse({
      currentBill: 150,
      currentKwh: 1000,
      currentDays: 30,
    });
    expect(result.success).toBe(true);
  });

  it('validates valid comparison input successfully', () => {
    const result = electricityBillSchema.safeParse({
      currentBill: 180,
      currentKwh: 1200,
      currentDays: 30,
      previousBill: 120,
      previousKwh: 1000,
      previousDays: 30,
    });
    expect(result.success).toBe(true);
  });

  it('validates valid detailed input successfully', () => {
    const result = electricityBillSchema.safeParse({
      currentBill: 180,
      currentKwh: 1200,
      currentDays: 30,
      currentFixedCharge: 15,
      currentTaxesAndFees: 12,
      currentCredits: 5,
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing current bill', () => {
    const result = electricityBillSchema.safeParse({
      currentKwh: 1000,
      currentDays: 30,
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing current kWh', () => {
    const result = electricityBillSchema.safeParse({
      currentBill: 150,
      currentDays: 30,
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid billing days (< 1 or > 120)', () => {
    const lowResult = electricityBillSchema.safeParse({
      currentBill: 150,
      currentKwh: 1000,
      currentDays: 0,
    });
    expect(lowResult.success).toBe(false);

    const highResult = electricityBillSchema.safeParse({
      currentBill: 150,
      currentKwh: 1000,
      currentDays: 121,
    });
    expect(highResult.success).toBe(false);
  });

  it('rejects partial previous-period input', () => {
    const result = electricityBillSchema.safeParse({
      currentBill: 150,
      currentKwh: 1000,
      currentDays: 30,
      previousBill: 120,
      // previousKwh missing
      previousDays: 30,
    });
    expect(result.success).toBe(false);
  });

  it('rejects negative charges', () => {
    const result = electricityBillSchema.safeParse({
      currentBill: -50,
      currentKwh: 1000,
      currentDays: 30,
    });
    expect(result.success).toBe(false);
  });

  it('rejects charges that produce an impossible variable subtotal', () => {
    const result = electricityBillSchema.safeParse({
      currentBill: 100,
      currentKwh: 1000,
      currentDays: 30,
      currentFixedCharge: 80,
      currentTaxesAndFees: 30, // 80 + 30 = 110 > 100 total bill
    });
    expect(result.success).toBe(false);
  });

  it('handles maximum limits correctly', () => {
    const result = electricityBillSchema.safeParse({
      currentBill: 100000,
      currentKwh: 1000000,
      currentDays: 120,
    });
    expect(result.success).toBe(true);

    const exceedResult = electricityBillSchema.safeParse({
      currentBill: 100001,
      currentKwh: 1000000,
      currentDays: 30,
    });
    expect(exceedResult.success).toBe(false);
  });
});
