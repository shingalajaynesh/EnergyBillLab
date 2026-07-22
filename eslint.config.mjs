import baseConfig from '@energy-bill-lab/eslint-config/base';

export default [
  {
    ignores: ['**/.next/**', '**/coverage/**', '**/dist/**', '**/node_modules/**'],
  },
  ...baseConfig,
];
