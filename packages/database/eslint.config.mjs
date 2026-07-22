import baseConfig from '@energy-bill-lab/eslint-config/base';

export default [
  ...baseConfig,
  {
    ignores: ['drizzle.config.ts', 'dist/**', 'migrations/**'],
  },
];
