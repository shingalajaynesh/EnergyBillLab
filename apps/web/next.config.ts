import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['pg'],
  transpilePackages: [
    '@energy-bill-lab/database',
    '@energy-bill-lab/design-system',
    'antd',
    '@ant-design/icons',
    '@ant-design/cssinjs',
    '@ant-design/nextjs-registry',
  ],
  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    return [
      {
        source: '/tools/electricity-bill-analyzer',
        destination: '/electricity-bill-analyzer',
        permanent: true,
      },
      {
        source: '/cookie-policy',
        destination: '/cookies',
        permanent: true,
      },
      {
        source: '/insights/category',
        destination: '/insights',
        permanent: true,
      },
      // Consolidated Appliance Insights (301 Permanent Redirects to Canonical Guides)
      {
        source: '/insights/august-2026-electric-clothes-dryer-kwh-operating-cost-benchmark',
        destination: '/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer',
        permanent: true,
      },
      {
        source: '/insights/august-2026-refrigerator-kwh-annual-operating-cost-benchmark',
        destination: '/guides/how-much-electricity-does-a-refrigerator-use',
        permanent: true,
      },
      {
        source: '/insights/august-2026-central-air-conditioner-seer2-cooling-cost-benchmark',
        destination: '/guides/how-much-electricity-does-central-air-conditioning-use',
        permanent: true,
      },
      {
        source: '/insights/august-2026-portable-electric-space-heater-operating-cost-benchmark',
        destination: '/guides/how-much-does-it-cost-to-run-a-space-heater',
        permanent: true,
      },
      {
        source: '/insights/august-2026-swimming-pool-pump-kwh-operating-cost-benchmark',
        destination: '/guides/how-much-does-it-cost-to-run-a-pool-pump',
        permanent: true,
      },
      {
        source: '/insights/august-2026-electric-dehumidifier-kwh-operating-cost-benchmark',
        destination: '/guides/how-much-does-it-cost-to-run-a-dehumidifier',
        permanent: true,
      },
      {
        source: '/insights/august-2026-window-air-conditioner-wattage-operating-cost-benchmark',
        destination: '/guides/how-much-electricity-does-a-window-air-conditioner-use',
        permanent: true,
      },
      {
        source: '/insights/august-2026-electric-dishwasher-kwh-operating-cost-benchmark',
        destination: '/guides/how-much-electricity-does-a-dishwasher-use',
        permanent: true,
      },
      {
        source: '/insights/august-2026-electric-clothes-washer-kwh-operating-cost-benchmark',
        destination: '/guides/how-much-electricity-does-a-washing-machine-use',
        permanent: true,
      },
      {
        source:
          '/insights/august-2026-vampire-power-phantom-load-standby-electricity-cost-benchmark',
        destination: '/guides/what-is-vampire-power-and-how-much-does-it-cost',
        permanent: true,
      },
      {
        source: '/insights/may-2026-ev-home-charging-cost-benchmark',
        destination: '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
        permanent: true,
      },
      {
        source: '/insights/august-2026-ev-home-charging-efficiency-losses-benchmark',
        destination: '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
