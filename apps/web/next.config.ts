import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@energy-bill-lab/design-system'],
};

export default nextConfig;
