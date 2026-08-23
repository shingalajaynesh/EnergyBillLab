import { z } from 'zod';

export const homeEnergyAuditSchema = z.object({
  squareFootage: z
    .number()
    .min(400, 'Square footage must be at least 400 sq ft')
    .max(15000, 'Square footage cannot exceed 15,000 sq ft'),
  yearBuiltTier: z.enum([
    'pre_1975',
    '1975_1990',
    '1991_2005',
    '2006_2015',
    '2016_plus',
  ]),
  climateZone: z.enum([
    'cold',
    'moderate',
    'hot_humid',
    'hot_dry',
    'marine',
  ]),
  insulationLevel: z.enum([
    'poor_uninsulated',
    'average_batt',
    'high_r38_r49',
    'air_sealed_super',
  ]),
  heatingType: z.enum([
    'electric_resistance',
    'gas_standard_80',
    'gas_high_96',
    'heat_pump_standard',
    'heat_pump_inverter',
  ]),
  coolingType: z.enum([
    'none',
    'window_units',
    'central_old_seer10',
    'central_standard_seer14',
    'heat_pump_seer2_16',
  ]),
  waterHeaterType: z.enum([
    'electric_tank',
    'gas_tank',
    'heat_pump_hybrid',
    'tankless_gas',
  ]),
  windowType: z.enum([
    'single_pane',
    'double_clear',
    'double_low_e',
    'triple_pane',
  ]),
  electricityRateCentsPerKwh: z
    .number()
    .min(1, 'Rate must be at least 1¢')
    .max(100, 'Rate cannot exceed 100¢'),
  gasPriceDollarsPerTherm: z
    .number()
    .min(0.2, 'Gas price must be at least $0.20')
    .max(15, 'Gas price cannot exceed $15.00')
    .optional(),
});

export type HomeEnergyAuditFormData = z.infer<typeof homeEnergyAuditSchema>;
