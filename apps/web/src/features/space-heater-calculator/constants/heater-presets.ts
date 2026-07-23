export type SpaceHeaterPreset = {
  id: string;
  name: string;
  heaterWatts: number;
  quantity: number;
  defaultHoursPerDay: number;
  defaultDutyCyclePercent: number;
  caveat: string;
};

export const HEATER_PRESETS: SpaceHeaterPreset[] = [
  {
    id: '750w-low',
    name: '750 W Low Power Setting',
    heaterWatts: 750,
    quantity: 1,
    defaultHoursPerDay: 4,
    defaultDutyCyclePercent: 100,
    caveat: 'Low heat or eco power setting on a personal space heater (750W continuous).',
  },
  {
    id: '1000w-compact',
    name: '1,000 W Compact Tower Heater',
    heaterWatts: 1000,
    quantity: 1,
    defaultHoursPerDay: 4,
    defaultDutyCyclePercent: 90,
    caveat: 'Compact ceramic or infrared tower heater on medium setting (1,000W).',
  },
  {
    id: '1500w-standard',
    name: '1,500 W Standard Space Heater (High)',
    heaterWatts: 1500,
    quantity: 1,
    defaultHoursPerDay: 4,
    defaultDutyCyclePercent: 80,
    caveat: 'Standard 15-Amp residential electric heater on high setting (most common).',
  },
  {
    id: '1500w-two-units',
    name: 'Two 1,500 W Heaters (3,000 W Total)',
    heaterWatts: 1500,
    quantity: 2,
    defaultHoursPerDay: 4,
    defaultDutyCyclePercent: 80,
    caveat: 'Two 1,500W space heaters operating simultaneously in separate rooms.',
  },
];
