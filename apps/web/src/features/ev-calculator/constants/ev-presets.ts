export type EvPreset = {
  id: string;
  name: string;
  batteryCapacityKwh: number;
  defaultStartPercent: number;
  defaultTargetPercent: number;
  defaultEfficiencyPercent: number;
  caveat: string;
};

export const EV_PRESETS: EvPreset[] = [
  {
    id: '40kwh-compact',
    name: '40 kWh Compact EV',
    batteryCapacityKwh: 40,
    defaultStartPercent: 20,
    defaultTargetPercent: 80,
    defaultEfficiencyPercent: 88,
    caveat: 'Compact electric hatchback or city commuter battery pack (24 kWh added).',
  },
  {
    id: '60kwh-crossover',
    name: '60 kWh Mid-Size EV',
    batteryCapacityKwh: 60,
    defaultStartPercent: 20,
    defaultTargetPercent: 80,
    defaultEfficiencyPercent: 88,
    caveat: 'Mid-size electric sedan or crossover battery pack (36 kWh added).',
  },
  {
    id: '75kwh-long-range',
    name: '75 kWh Long-Range EV Benchmark',
    batteryCapacityKwh: 75,
    defaultStartPercent: 20,
    defaultTargetPercent: 80,
    defaultEfficiencyPercent: 90,
    caveat: 'Standard 75 kWh long-range battery pack benchmark (45 kWh added).',
  },
  {
    id: '100kwh-large-suv',
    name: '100 kWh Large EV / Truck',
    batteryCapacityKwh: 100,
    defaultStartPercent: 20,
    defaultTargetPercent: 80,
    defaultEfficiencyPercent: 90,
    caveat: 'Full-size long-range SUV or electric truck battery pack (60 kWh added).',
  },
];
