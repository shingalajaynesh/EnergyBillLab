import { z } from 'zod';

export const dehumidifierSchema = z.object({
  wattage: z
    .number()
    .min(50, 'Wattage must be at least 50 W')
    .max(5000, 'Wattage must be under 5,000 W'),
  hoursPerDay: z.number().min(0, 'Hours must be 0-24').max(24, 'Hours must be 0-24'),
  dutyCyclePercent: z
    .number()
    .min(0, 'Duty cycle must be 0-100%')
    .max(100, 'Duty cycle must be 0-100%'),
  days: z.number().min(1, 'Days must be 1-365').max(365, 'Days must be 1-365'),
  rateCentsPerKwh: z
    .number()
    .min(0.01, 'Rate must be positive')
    .max(500, 'Rate must be under 500¢/kWh'),
  selectedStateCode: z.string().optional(),
  presetId: z.string().optional(),
});

export type DehumidifierFormValues = z.infer<typeof dehumidifierSchema>;

export const DEFAULT_DEHUMIDIFIER_FORM_VALUES: DehumidifierFormValues = {
  wattage: 500,
  hoursPerDay: 12,
  dutyCyclePercent: 50,
  days: 30,
  rateCentsPerKwh: 16.5,
  presetId: 'standard-dehumidifier',
};
