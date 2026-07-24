import { z } from 'zod';

export const poolPumpSchema = z.object({
  wattage: z
    .number()
    .min(100, 'Wattage must be at least 100 W')
    .max(10000, 'Wattage must be under 10,000 W'),
  hoursPerDay: z.number().min(0, 'Hours must be 0-24').max(24, 'Hours must be 0-24'),
  daysPerWeek: z.number().min(1, 'Days per week must be 1-7').max(7, 'Days per week must be 1-7'),
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

export type PoolPumpFormValues = z.infer<typeof poolPumpSchema>;

export const DEFAULT_POOL_PUMP_FORM_VALUES: PoolPumpFormValues = {
  wattage: 1500,
  hoursPerDay: 8,
  daysPerWeek: 7,
  weeks: 4.33,
  rateCentsPerKwh: 16.5,
  dutyCyclePercent: 100,
  presetId: 'standard-pool-pump',
};
