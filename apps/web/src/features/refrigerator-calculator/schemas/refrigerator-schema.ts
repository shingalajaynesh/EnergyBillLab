import { z } from 'zod';

export const refrigeratorSchema = z.object({
  mode: z.enum(['wattage', 'annual_kwh']),
  wattage: z
    .number()
    .min(1, 'Wattage must be at least 1 W')
    .max(5000, 'Wattage must be under 5,000 W'),
  hoursPerDay: z.number().min(0, 'Hours must be 0-24').max(24, 'Hours must be 0-24'),
  dutyCyclePercent: z
    .number()
    .min(0, 'Duty cycle must be 0-100%')
    .max(100, 'Duty cycle must be 0-100%'),
  annualKwh: z
    .number()
    .min(1, 'Annual kWh must be positive')
    .max(5000, 'Annual kWh must be under 5,000 kWh'),
  days: z.number().min(1, 'Days must be 1-365').max(365, 'Days must be 1-365'),
  rateCentsPerKwh: z
    .number()
    .min(0.01, 'Rate must be positive')
    .max(500, 'Rate must be under 500¢/kWh'),
  selectedStateCode: z.string().optional(),
  presetId: z.string().optional(),
});

export type RefrigeratorFormValues = z.infer<typeof refrigeratorSchema>;

export const DEFAULT_REFRIGERATOR_FORM_VALUES: RefrigeratorFormValues = {
  mode: 'wattage',
  wattage: 150,
  hoursPerDay: 24,
  dutyCyclePercent: 35,
  annualKwh: 450,
  days: 30,
  rateCentsPerKwh: 16.5,
  presetId: 'standard-top-freezer-fridge',
};
