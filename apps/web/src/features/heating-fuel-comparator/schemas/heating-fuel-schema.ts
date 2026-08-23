import { z } from 'zod';

export const heatingFuelComparatorSchema = z.object({
  electricityRateCentsPerKwh: z
    .number()
    .min(1, 'Electricity rate must be at least 1¢')
    .max(100, 'Electricity rate cannot exceed 100¢'),
  naturalGasDollarsPerTherm: z
    .number()
    .min(0.2, 'Natural gas price must be at least $0.20')
    .max(15, 'Natural gas price cannot exceed $15.00'),
  heatingOilDollarsPerGallon: z
    .number()
    .min(1, 'Heating oil price must be at least $1.00')
    .max(15, 'Heating oil price cannot exceed $15.00')
    .optional(),
  propaneDollarsPerGallon: z
    .number()
    .min(0.5, 'Propane price must be at least $0.50')
    .max(15, 'Propane price cannot exceed $15.00')
    .optional(),
  annualHeatingDemandMbtu: z
    .number()
    .min(10, 'Annual heating load must be at least 10 MMBtu')
    .max(200, 'Annual heating load cannot exceed 200 MMBtu'),
});

export type HeatingFuelComparatorFormData = z.infer<typeof heatingFuelComparatorSchema>;
