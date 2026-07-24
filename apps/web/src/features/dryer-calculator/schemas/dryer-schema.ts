import { z } from 'zod';

export const dryerSchema = z.object({
  wattage: z
    .number()
    .min(100, 'Wattage must be at least 100 W')
    .max(10000, 'Wattage must be under 10,000 W'),
  minutesPerLoad: z
    .number()
    .min(1, 'Minutes per load must be 1-300')
    .max(300, 'Minutes per load must be 1-300'),
  loadsPerWeek: z
    .number()
    .min(0, 'Loads per week must be 0-50')
    .max(50, 'Loads per week must be 0-50'),
  weeks: z.number().min(1, 'Weeks must be 1-52').max(52, 'Weeks must be 1-52'),
  rateCentsPerKwh: z
    .number()
    .min(0.01, 'Rate must be positive')
    .max(500, 'Rate must be under 500¢/kWh'),
  dutyCyclePercent: z
    .number()
    .min(1, 'Duty cycle must be 1-100%')
    .max(100, 'Duty cycle must be 1-100%'),
  selectedStateCode: z.string().optional(),
  presetId: z.string().optional(),
});

export type DryerFormValues = z.infer<typeof dryerSchema>;

export const DEFAULT_DRYER_FORM_VALUES: DryerFormValues = {
  wattage: 4500,
  minutesPerLoad: 45,
  loadsPerWeek: 4,
  weeks: 4.33,
  rateCentsPerKwh: 16.5,
  dutyCyclePercent: 100,
  presetId: 'standard-electric-dryer',
};
