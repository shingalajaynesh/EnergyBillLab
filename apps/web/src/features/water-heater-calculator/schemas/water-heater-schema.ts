import { z } from 'zod';

export const waterHeaterSchema = z.object({
  elementWatts: z
    .number()
    .min(500, 'Element wattage must be at least 500 W')
    .max(12000, 'Element wattage must be under 12,000 W'),
  activeElements: z
    .number()
    .min(1, 'Active elements must be 1-4')
    .max(4, 'Active elements must be 1-4'),
  hoursPerDay: z.number().min(0, 'Active hours must be 0-24').max(24, 'Active hours must be 0-24'),
  days: z.number().min(1, 'Days must be 1-365').max(365, 'Days must be 1-365'),
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

export type WaterHeaterFormValues = z.infer<typeof waterHeaterSchema>;

export const DEFAULT_WATER_HEATER_FORM_VALUES: WaterHeaterFormValues = {
  elementWatts: 4500,
  activeElements: 1,
  hoursPerDay: 3,
  days: 30,
  rateCentsPerKwh: 16.5,
  dutyCyclePercent: 100,
  presetId: 'standard-electric-water-heater',
};
