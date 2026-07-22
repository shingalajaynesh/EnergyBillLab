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
};

export default nextConfig;
