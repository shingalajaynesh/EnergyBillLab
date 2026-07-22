import { z } from 'zod';

import { BILL_ANALYZER_CONSTANTS } from '../constants/electricity-bill-constants';

const baseSchema = z.object({
  currentBill: z
    .number({ invalid_type_error: 'Enter a valid current bill amount' })
    .min(BILL_ANALYZER_CONSTANTS.MIN_BILL_DOLLARS, 'Current bill must be greater than $0')
    .max(
      BILL_ANALYZER_CONSTANTS.MAX_BILL_DOLLARS,
      `Current bill cannot exceed $${BILL_ANALYZER_CONSTANTS.MAX_BILL_DOLLARS.toLocaleString()}`,
    ),
  currentKwh: z
    .number({ invalid_type_error: 'Enter a valid kWh amount' })
    .min(BILL_ANALYZER_CONSTANTS.MIN_KWH, 'Current kWh must be greater than 0')
    .max(
      BILL_ANALYZER_CONSTANTS.MAX_KWH,
      `Current kWh cannot exceed ${BILL_ANALYZER_CONSTANTS.MAX_KWH.toLocaleString()} kWh`,
    ),
  currentDays: z
    .number({ invalid_type_error: 'Enter valid billing days' })
    .int('Billing days must be a whole number')
    .min(BILL_ANALYZER_CONSTANTS.MIN_DAYS, 'Billing days must be at least 1')
    .max(
      BILL_ANALYZER_CONSTANTS.MAX_DAYS,
      `Billing days cannot exceed ${BILL_ANALYZER_CONSTANTS.MAX_DAYS} days`,
    ),

  // Optional comparison inputs
  previousBill: z
    .number({ invalid_type_error: 'Enter a valid previous bill amount' })
    .min(BILL_ANALYZER_CONSTANTS.MIN_BILL_DOLLARS, 'Previous bill must be greater than $0')
    .max(BILL_ANALYZER_CONSTANTS.MAX_BILL_DOLLARS, 'Previous bill exceeds maximum limit')
    .optional()
    .or(z.literal(NaN).transform(() => undefined)),
  previousKwh: z
    .number({ invalid_type_error: 'Enter a valid previous kWh amount' })
    .min(BILL_ANALYZER_CONSTANTS.MIN_KWH, 'Previous kWh must be greater than 0')
    .max(BILL_ANALYZER_CONSTANTS.MAX_KWH, 'Previous kWh exceeds maximum limit')
    .optional()
    .or(z.literal(NaN).transform(() => undefined)),
  previousDays: z
    .number({ invalid_type_error: 'Enter valid previous billing days' })
    .int('Previous billing days must be a whole number')
    .min(BILL_ANALYZER_CONSTANTS.MIN_DAYS, 'Previous billing days must be at least 1')
    .max(BILL_ANALYZER_CONSTANTS.MAX_DAYS, 'Previous billing days exceeds maximum limit')
    .optional()
    .or(z.literal(NaN).transform(() => undefined)),

  // Optional detailed charges
  currentFixedCharge: z.number().min(0, 'Fixed charge cannot be negative').optional(),
  currentTaxesAndFees: z.number().min(0, 'Taxes and fees cannot be negative').optional(),
  currentCredits: z.number().min(0, 'Credits cannot be negative').optional(),
  previousFixedCharge: z.number().min(0, 'Previous fixed charge cannot be negative').optional(),
  previousTaxesAndFees: z.number().min(0, 'Previous taxes and fees cannot be negative').optional(),
  previousCredits: z.number().min(0, 'Previous credits cannot be negative').optional(),
});

export const electricityBillSchema = baseSchema
  .refine(
    (data) => {
      const hasAnyPrev =
        data.previousBill !== undefined ||
        data.previousKwh !== undefined ||
        data.previousDays !== undefined;
      if (!hasAnyPrev) return true;
      return (
        data.previousBill !== undefined &&
        data.previousKwh !== undefined &&
        data.previousDays !== undefined
      );
    },
    {
      message:
        'To compare billing periods, enter previous bill ($), previous kWh, and previous billing days.',
      path: ['previousBill'],
    },
  )
  .refine(
    (data) => {
      if (
        data.currentFixedCharge !== undefined ||
        data.currentTaxesAndFees !== undefined ||
        data.currentCredits !== undefined
      ) {
        const fixed = data.currentFixedCharge ?? 0;
        const taxes = data.currentTaxesAndFees ?? 0;
        const credits = data.currentCredits ?? 0;
        const knownNonEnergy = fixed + taxes - credits;
        return knownNonEnergy <= data.currentBill;
      }
      return true;
    },
    {
      message: 'Known non-energy charges (fixed + taxes - credits) cannot exceed the total bill.',
      path: ['currentFixedCharge'],
    },
  );

export type ElectricityBillFormValues = z.infer<typeof electricityBillSchema>;
