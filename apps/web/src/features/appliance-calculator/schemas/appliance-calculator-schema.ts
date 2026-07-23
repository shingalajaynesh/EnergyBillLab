import { z } from 'zod';

export const applianceCalculatorSchema = z.object({
  wattage: z
    .number({ invalid_type_error: 'Appliance wattage must be a valid number.' })
    .positive({ message: 'Appliance wattage must be greater than 0 W.' })
    .max(50000, { message: 'Appliance wattage cannot exceed 50,000 W.' }),

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

export type ApplianceCalculatorFormValues = z.infer<typeof applianceCalculatorSchema>;

export const DEFAULT_APPLIANCE_FORM_VALUES: ApplianceCalculatorFormValues = {
  wattage: 1500,
  hoursPerDay: 4,
  days: 30,
  rateCentsPerKwh: 16.5,
  dutyCyclePercent: 100,
  presetId: 'space-heater',
};
