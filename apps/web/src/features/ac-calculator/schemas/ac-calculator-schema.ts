import { z } from 'zod';

export const acCalculatorSchema = z.object({
  mode: z.enum(['wattage', 'capacity_eer']),
  acType: z.enum(['window', 'portable', 'minisplit', 'central', 'custom']),
  wattage: z
    .number({ invalid_type_error: 'AC wattage must be a valid number.' })
    .positive({ message: 'AC wattage must be greater than 0 W.' })
    .max(20000, { message: 'AC wattage cannot exceed 20,000 W.' })
    .optional(),

  coolingCapacityBtu: z
    .number({ invalid_type_error: 'Cooling capacity must be a valid number.' })
    .positive({ message: 'Cooling capacity must be greater than 0 BTU/hr.' })
    .max(120000, { message: 'Cooling capacity cannot exceed 120,000 BTU/hr.' })
    .optional(),

  eer: z
    .number({ invalid_type_error: 'EER rating must be a valid number.' })
    .positive({ message: 'EER rating must be greater than 0.' })
    .max(40, { message: 'EER rating cannot exceed 40.' })
    .optional(),

  hoursPerDay: z
    .number({ invalid_type_error: 'Hours per day must be a valid number.' })
    .min(0, { message: 'Hours per day cannot be negative.' })
    .max(24, { message: 'Hours per day cannot exceed 24 hours.' }),

  days: z
    .number({ invalid_type_error: 'Days must be a valid number.' })
    .positive({ message: 'Days must be at least 1 day.' })
    .max(365, { message: 'Days cannot exceed 365 days.' }),

  rateCentsPerKwh: z
    .number({ invalid_type_error: 'Electricity rate must be a valid number.' })
    .positive({ message: 'Electricity rate must be greater than 0¢/kWh.' })
    .max(500, { message: 'Electricity rate cannot exceed 500¢/kWh.' }),

  dutyCyclePercent: z
    .number({ invalid_type_error: 'Duty cycle must be a valid number.' })
    .min(0, { message: 'Duty cycle percentage cannot be less than 0%.' })
    .max(100, { message: 'Duty cycle percentage cannot exceed 100%.' }),

  presetId: z.string().optional(),
});

export type AcCalculatorFormValues = z.infer<typeof acCalculatorSchema>;

export const DEFAULT_AC_FORM_VALUES: AcCalculatorFormValues = {
  mode: 'capacity_eer',
  acType: 'window',
  coolingCapacityBtu: 12000,
  eer: 12.0,
  wattage: 1000,
  hoursPerDay: 8,
  days: 30,
  rateCentsPerKwh: 16.5,
  dutyCyclePercent: 60,
  presetId: 'large-window-12000',
};
