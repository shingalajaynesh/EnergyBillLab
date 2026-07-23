export type AppliancePreset = {
  id: string;
  name: string;
  category: string;
  wattage: number;
  defaultHoursPerDay: number;
  defaultDutyCyclePercent: number;
  caveat: string;
};

export const APPLIANCE_PRESETS: AppliancePreset[] = [
  {
    id: 'space-heater',
    name: 'Space Heater (1,500W)',
    category: 'Heating & Cooling',
    wattage: 1500,
    defaultHoursPerDay: 4,
    defaultDutyCyclePercent: 100,
    caveat: 'Draws full rated 1,500W power continuously while heating element is active.',
  },
  {
    id: 'window-ac',
    name: 'Window Air Conditioner (1,000W)',
    category: 'Heating & Cooling',
    wattage: 1000,
    defaultHoursPerDay: 8,
    defaultDutyCyclePercent: 50,
    caveat:
      'Compressor cycles on and off; active draw depends on thermostat target and ambient temp.',
  },
  {
    id: 'refrigerator',
    name: 'Refrigerator / Freezer (150W)',
    category: 'Kitchen Appliances',
    wattage: 150,
    defaultHoursPerDay: 24,
    defaultDutyCyclePercent: 33,
    caveat:
      'Runs 24 hours daily but compressor typically cycles on for only ~8 hours total (33% duty cycle).',
  },
  {
    id: 'clothes-dryer',
    name: 'Electric Clothes Dryer (3,000W)',
    category: 'Laundry Appliances',
    wattage: 3000,
    defaultHoursPerDay: 1,
    defaultDutyCyclePercent: 100,
    caveat: 'High wattage heating element runs continuously during drying cycle.',
  },
  {
    id: 'electric-oven',
    name: 'Electric Oven / Range (2,400W)',
    category: 'Kitchen Appliances',
    wattage: 2400,
    defaultHoursPerDay: 1,
    defaultDutyCyclePercent: 75,
    caveat: 'Baking elements cycle to maintain set temperature.',
  },
  {
    id: 'dishwasher',
    name: 'Dishwasher (1,200W)',
    category: 'Kitchen Appliances',
    wattage: 1200,
    defaultHoursPerDay: 1,
    defaultDutyCyclePercent: 100,
    caveat: 'Includes internal water heater element during wash cycles.',
  },
  {
    id: 'desktop-computer',
    name: 'Desktop PC & Monitor (200W)',
    category: 'Electronics',
    wattage: 200,
    defaultHoursPerDay: 8,
    defaultDutyCyclePercent: 100,
    caveat: 'Power consumption varies with GPU/CPU workload and monitor brightness.',
  },
  {
    id: 'television',
    name: '55" LED Television (100W)',
    category: 'Electronics',
    wattage: 100,
    defaultHoursPerDay: 5,
    defaultDutyCyclePercent: 100,
    caveat: 'Modern LED screens use steady baseline power when screen is active.',
  },
  {
    id: 'led-bulb',
    name: 'LED Light Bulb (10W)',
    category: 'Lighting',
    wattage: 10,
    defaultHoursPerDay: 6,
    defaultDutyCyclePercent: 100,
    caveat: 'Equivalent to traditional 60W incandescent bulb while using 83% less power.',
  },
];
