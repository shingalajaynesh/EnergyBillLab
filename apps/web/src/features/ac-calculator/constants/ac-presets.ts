import type { AcCalculationMode, AcType } from '@energy-bill-lab/calculation-engine';

export type AcPreset = {
  id: string;
  name: string;
  acType: AcType;
  mode: AcCalculationMode;
  wattage?: number;
  coolingCapacityBtu?: number;
  eer?: number;
  defaultHoursPerDay: number;
  defaultDutyCyclePercent: number;
  caveat: string;
};

export const AC_PRESETS: AcPreset[] = [
  {
    id: 'small-window-5000',
    name: 'Small Window AC (5,000 BTU / EER 11.0)',
    acType: 'window',
    mode: 'capacity_eer',
    coolingCapacityBtu: 5000,
    eer: 11.0,
    defaultHoursPerDay: 8,
    defaultDutyCyclePercent: 60,
    caveat: 'Typical bedroom size (~150 sq ft). Input power ~455 Watts.',
  },
  {
    id: 'medium-window-8000',
    name: 'Medium Window AC (8,000 BTU / EER 12.0)',
    acType: 'window',
    mode: 'capacity_eer',
    coolingCapacityBtu: 8000,
    eer: 12.0,
    defaultHoursPerDay: 8,
    defaultDutyCyclePercent: 60,
    caveat: 'Medium room size (~350 sq ft). Input power ~667 Watts.',
  },
  {
    id: 'large-window-12000',
    name: 'Large Window AC (12,000 BTU / EER 12.0)',
    acType: 'window',
    mode: 'capacity_eer',
    coolingCapacityBtu: 12000,
    eer: 12.0,
    defaultHoursPerDay: 8,
    defaultDutyCyclePercent: 60,
    caveat: 'Large room or open space (~550 sq ft). Input power ~1,000 Watts.',
  },
  {
    id: 'portable-10000',
    name: 'Portable Air Conditioner (10,000 BTU / EER 9.5)',
    acType: 'portable',
    mode: 'capacity_eer',
    coolingCapacityBtu: 10000,
    eer: 9.5,
    defaultHoursPerDay: 8,
    defaultDutyCyclePercent: 70,
    caveat: 'Single-hose portable unit (~1,053W). Higher duty cycle due to heat exhaust radiation.',
  },
  {
    id: 'minisplit-12000',
    name: 'Ductless Mini-Split (12,000 BTU / 1 Ton / EER 14.0)',
    acType: 'minisplit',
    mode: 'capacity_eer',
    coolingCapacityBtu: 12000,
    eer: 14.0,
    defaultHoursPerDay: 8,
    defaultDutyCyclePercent: 50,
    caveat:
      'High-efficiency inverter mini-split (~857W peak). Modulates compressor speed continuously.',
  },
  {
    id: 'central-ac-36000',
    name: 'Central AC System (36,000 BTU / 3 Tons / EER 11.5)',
    acType: 'central',
    mode: 'capacity_eer',
    coolingCapacityBtu: 36000,
    eer: 11.5,
    defaultHoursPerDay: 8,
    defaultDutyCyclePercent: 60,
    caveat: 'Whole-house 3-ton system (~3,130W). Excludes blower fan power which adds ~300-500W.',
  },
];
