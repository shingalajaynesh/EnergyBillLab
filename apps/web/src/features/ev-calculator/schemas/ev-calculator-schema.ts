import { z } from 'zod';

export const evCalculatorSchema = z
  .object({
    batteryCapacityKwh: z
      .number({ invalid_type_error: 'Battery capacity must be a valid number.' })
      .positive({ message: 'Battery capacity must be greater than 0 kWh.' })
      .max(300, { message: 'Battery capacity cannot exceed 300 kWh.' }),

    startingChargePercent: z
      .number({ invalid_type_error: 'Starting charge must be a valid number.' })
      .min(0, { message: 'Starting charge cannot be less than 0%.' })
      .max(99, { message: 'Starting charge must be less than 100%.' }),

    targetChargePercent: z
      .number({ invalid_type_error: 'Target charge must be a valid number.' })
      .min(1, { message: 'Target charge must be at least 1%.' })
      .max(100, { message: 'Target charge cannot exceed 100%.' }),

    chargingEfficiencyPercent: z
      .number({ invalid_type_error: 'Charging efficiency must be a valid number.' })
      .min(50, { message: 'Charging efficiency cannot be below 50%.' })
      .max(100, { message: 'Charging efficiency cannot exceed 100%.' }),

    rateCentsPerKwh: z
      .number({ invalid_type_error: 'Electricity rate must be a valid number.' })
      .positive({ message: 'Electricity rate must be greater than 0¢/kWh.' })
      .max(500, { message: 'Electricity rate cannot exceed 500¢/kWh.' }),

    milesDriven: z
      .number({ invalid_type_error: 'Miles driven must be a valid number.' })
      .positive({ message: 'Miles driven must be greater than 0.' })
      .max(50000, { message: 'Miles driven cannot exceed 50,000 miles.' })
      .optional(),

    milesPerKwh: z
      .number({ invalid_type_error: 'Miles per kWh must be a valid number.' })
      .positive({ message: 'Miles per kWh must be greater than 0.' })
      .max(10, { message: 'Miles per kWh cannot exceed 10 mi/kWh.' })
      .optional(),

    presetId: z.string().optional(),
  })
  .refine((data) => data.targetChargePercent > data.startingChargePercent, {
    message: 'Target charge percentage must be strictly greater than starting charge percentage.',
    path: ['targetChargePercent'],
  });

export type EvFormValues = z.infer<typeof evCalculatorSchema>;

export const DEFAULT_EV_FORM_VALUES: EvFormValues = {
  batteryCapacityKwh: 75,
  startingChargePercent: 20,
  targetChargePercent: 80,
  chargingEfficiencyPercent: 90,
  rateCentsPerKwh: 16.5,
  milesDriven: 30,
  milesPerKwh: 3.3,
  presetId: '75kwh-long-range',
};
