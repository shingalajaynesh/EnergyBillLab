import { z } from 'zod';

export const diagnosticFormSchema = z.object({
  currentBillAmount: z
    .number({ invalid_type_error: 'Enter a valid current bill amount' })
    .min(1, 'Current bill must be greater than $0')
    .max(5000, 'Current bill must be $5,000 or less'),
  previousBillAmount: z
    .number({ invalid_type_error: 'Enter a valid previous bill amount' })
    .min(1, 'Previous bill must be greater than $0')
    .max(5000, 'Previous bill must be $5,000 or less'),
  currentKwh: z
    .number({ invalid_type_error: 'Enter a valid current kWh value' })
    .min(1, 'Current kWh must be greater than 0')
    .max(20000, 'Current kWh must be 20,000 or less'),
  previousKwh: z
    .number({ invalid_type_error: 'Enter a valid previous kWh value' })
    .min(1, 'Previous kWh must be greater than 0')
    .max(20000, 'Previous kWh must be 20,000 or less'),
  billingDaysCurrent: z
    .number()
    .int('Days must be a whole number')
    .min(1, 'Days must be at least 1')
    .max(60, 'Days cannot exceed 60')
    .default(30),
  billingDaysPrevious: z
    .number()
    .int('Days must be a whole number')
    .min(1, 'Days must be at least 1')
    .max(60, 'Days cannot exceed 60')
    .default(30),
  season: z.enum(['summer', 'winter', 'shoulder']).default('summer'),
  rateStructure: z.enum(['flat', 'tiered', 'tou', 'unknown']).default('unknown'),
  equipment: z.array(z.string()).default([]),
  events: z.array(z.string()).default([]),
  stateCode: z.string().optional(),
});

export type DiagnosticFormValues = z.infer<typeof diagnosticFormSchema>;
