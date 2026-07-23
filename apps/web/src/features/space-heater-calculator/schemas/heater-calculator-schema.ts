import { z } from 'zod';

export const spaceHeaterCalculatorSchema = z.object({
  heaterWatts: z
    .number({ invalid_type_error: 'Heater wattage must be a valid number.' })
    .positive({ message: 'Heater wattage must be greater than 0 W.' })
    .max(10000, { message: 'Heater wattage cannot exceed 10,000 W.' }),

  quantity: z
    .number({ invalid_type_error: 'Quantity must be a valid number.' })
    .int({ message: 'Quantity must be a whole number.' })
    .min(1, { message: 'Quantity must be at least 1 heater.' })
    .max(20, { message: 'Quantity cannot exceed 20 heaters.' }),

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

export type SpaceHeaterFormValues = z.infer<typeof spaceHeaterCalculatorSchema>;

export const DEFAULT_HEATER_FORM_VALUES: SpaceHeaterFormValues = {
  heaterWatts: 1500,
  quantity: 1,
  hoursPerDay: 4,
  days: 30,
  rateCentsPerKwh: 16.5,
  dutyCyclePercent: 80,
  presetId: '1500w-standard',
};
