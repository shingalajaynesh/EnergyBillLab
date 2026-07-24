export type ApplianceType =
  'refrigerator' | 'clothes-dryer' | 'electric-water-heater' | 'pool-pump' | 'dehumidifier';

export type ApplianceBenchmark = {
  id: string;
  applianceType: ApplianceType;
  label: string;
  description: string;
  exampleWatts: number;
  exampleDutyCyclePercent: number;
  exampleRuntime: number;
  runtimeUnit: 'hours_per_day' | 'minutes_per_load' | 'hours_per_week';
  assumptions: string[];
  sourceName: string;
  sourceUrl: string;
  sourceReviewedAt: string;
  published: boolean;
};

export const applianceBenchmarks: ApplianceBenchmark[] = [
  // Refrigerator Benchmarks
  {
    id: 'compact-fridge',
    applianceType: 'refrigerator',
    label: 'Compact Refrigerator (4-6 cu ft)',
    description: 'Dorm-size or office compact refrigerator with single compressor.',
    exampleWatts: 100,
    exampleDutyCyclePercent: 35,
    exampleRuntime: 24,
    runtimeUnit: 'hours_per_day',
    assumptions: [
      'Compressor active approximately 35% of total plugged-in hours',
      'Continuous 120V grid connection',
      'Ambient room temperature ~70°F (21°C)',
    ],
    sourceName: 'U.S. Department of Energy (Energy Saver)',
    sourceUrl:
      'https://www.energy.gov/energysaver/estimating-appliance-and-home-electronic-energy-use',
    sourceReviewedAt: '2026-07-24',
    published: true,
  },
  {
    id: 'standard-top-freezer-fridge',
    applianceType: 'refrigerator',
    label: 'Standard Top-Freezer Refrigerator (18-20 cu ft)',
    description: 'Typical ENERGY STAR certified residential top-freezer refrigerator.',
    exampleWatts: 150,
    exampleDutyCyclePercent: 35,
    exampleRuntime: 24,
    runtimeUnit: 'hours_per_day',
    assumptions: [
      'Compressor cycles on/off automatically to maintain setpoint',
      'Average 400-450 kWh annual EnergyGuide rating',
      'Automatic defrost cycle included',
    ],
    sourceName: 'ENERGY STAR Appliance Specifications',
    sourceUrl: 'https://www.energystar.gov/products/appliances/refrigerators',
    sourceReviewedAt: '2026-07-24',
    published: true,
  },
  {
    id: 'side-by-side-fridge',
    applianceType: 'refrigerator',
    label: 'Side-by-Side / French Door Refrigerator (24-28 cu ft)',
    description: 'Large capacity refrigerator with through-the-door ice/water dispenser.',
    exampleWatts: 250,
    exampleDutyCyclePercent: 40,
    exampleRuntime: 24,
    runtimeUnit: 'hours_per_day',
    assumptions: [
      'Dual cooling evaporators and ice maker standby loads included',
      'Compressor duty cycle 40% under normal kitchen usage',
      'Average 600-650 kWh annual consumption baseline',
    ],
    sourceName: 'U.S. Energy Information Administration (RECS)',
    sourceUrl: 'https://www.eia.gov/consumption/residential/',
    sourceReviewedAt: '2026-07-24',
    published: true,
  },

  // Clothes Dryer Benchmarks
  {
    id: 'compact-electric-dryer',
    applianceType: 'clothes-dryer',
    label: 'Compact Electric Dryer (120V / 240V small drum)',
    description: 'Smaller laundry space electric clothes dryer.',
    exampleWatts: 3000,
    exampleDutyCyclePercent: 100,
    exampleRuntime: 45,
    runtimeUnit: 'minutes_per_load',
    assumptions: [
      'Pure electric resistance heating elements',
      '45 minutes runtime per typical load',
      'Does not estimate natural gas fuel cost',
    ],
    sourceName: 'U.S. Department of Energy',
    sourceUrl: 'https://www.energy.gov/energysaver/laundry',
    sourceReviewedAt: '2026-07-24',
    published: true,
  },
  {
    id: 'standard-electric-dryer',
    applianceType: 'clothes-dryer',
    label: 'Standard Electric Dryer (240V 30A circuit)',
    description: 'Standard full-size residential electric clothes dryer.',
    exampleWatts: 4500,
    exampleDutyCyclePercent: 100,
    exampleRuntime: 45,
    runtimeUnit: 'minutes_per_load',
    assumptions: [
      '4,500W heating element draw during active drying cycle',
      '4 loads per week baseline household laundry frequency',
      'Excludes washer motor and water heating loads',
    ],
    sourceName: 'ENERGY STAR Clothes Dryers Benchmark',
    sourceUrl: 'https://www.energystar.gov/products/appliances/clothes_dryers',
    sourceReviewedAt: '2026-07-24',
    published: true,
  },

  // Electric Water Heater Benchmarks
  {
    id: 'standard-electric-water-heater',
    applianceType: 'electric-water-heater',
    label: 'Standard Electric Water Heater (4,500W element)',
    description: '50-gallon tank electric-resistance water heater.',
    exampleWatts: 4500,
    exampleDutyCyclePercent: 100,
    exampleRuntime: 3,
    runtimeUnit: 'hours_per_day',
    assumptions: [
      'Single active 4,500W heating element at a time (upper and lower elements do not energize simultaneously in standard wiring)',
      '3 hours total daily heating time to maintain tank temperature and hot water recovery',
      'Electric resistance tank technology (excludes heat-pump hybrid models)',
    ],
    sourceName: 'U.S. Department of Energy (Water Heating)',
    sourceUrl: 'https://www.energy.gov/energysaver/water-heating',
    sourceReviewedAt: '2026-07-24',
    published: true,
  },

  // Pool Pump Benchmarks
  {
    id: 'standard-pool-pump',
    applianceType: 'pool-pump',
    label: 'Standard Single-Speed Pool Pump (1.5 HP input)',
    description: 'Continuous single-speed residential pool filtration pump.',
    exampleWatts: 1500,
    exampleDutyCyclePercent: 100,
    exampleRuntime: 8,
    runtimeUnit: 'hours_per_day',
    assumptions: [
      '1,500W continuous electrical input draw',
      '8 hours daily filtration cycle during pool season',
      'Single-speed induction motor operation',
    ],
    sourceName: 'ENERGY STAR Pool Pumps Benchmark',
    sourceUrl: 'https://www.energystar.gov/products/building_products/pool_pumps',
    sourceReviewedAt: '2026-07-24',
    published: true,
  },

  // Dehumidifier Benchmarks
  {
    id: 'standard-dehumidifier',
    applianceType: 'dehumidifier',
    label: 'Medium-Capacity Dehumidifier (50 pint / day)',
    description: 'Basement or living space portable dehumidifier.',
    exampleWatts: 500,
    exampleDutyCyclePercent: 50,
    exampleRuntime: 12,
    runtimeUnit: 'hours_per_day',
    assumptions: [
      '500W rated compressor and fan input power',
      'Humidistat cycles compressor on 50% of operating time',
      '12 hours active daily schedule',
    ],
    sourceName: 'U.S. EPA / ENERGY STAR Dehumidifier Specs',
    sourceUrl: 'https://www.energystar.gov/products/appliances/dehumidifiers',
    sourceReviewedAt: '2026-07-24',
    published: true,
  },
];

export function getBenchmarksByApplianceType(type: ApplianceType): ApplianceBenchmark[] {
  return applianceBenchmarks.filter((b) => b.applianceType === type && b.published);
}
