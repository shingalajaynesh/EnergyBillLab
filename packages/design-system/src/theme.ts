import type { ThemeConfig } from 'antd';

export const colors = {
  border: '#d0d5dd',
  borderSubtle: '#eaecf0',
  brand: '#176b5b',
  brandStrong: '#104c41',
  info: '#1f6f8b',
  success: '#2f7d32',
  warning: '#a05a00',
  error: '#b42318',
  surface: '#ffffff',
  surfaceMuted: '#f6f8f7',
  surfaceRaised: '#fcfcfd',
  text: '#182230',
  textMuted: '#475467',
  textSubtle: '#667085',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

export const typography = {
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  lineHeightBody: 1.65,
  lineHeightHeading: 1.15,
  scale: {
    body: '1rem',
    small: '0.9375rem',
    h1: 'clamp(2rem, 5vw, 3.6rem)',
    h2: '1.75rem',
    h3: '1.25rem',
  },
} as const;

export const borderRadii = {
  sm: 4,
  md: 6,
  lg: 8,
} as const;

export const breakpoints = {
  mobile: 520,
  tablet: 768,
  desktop: 1180,
} as const;

export const chartPalette = ['#176b5b', '#1f6f8b', '#8a5a00', '#6c5ce7', '#2f7d32'] as const;

export const appTheme = {
  token: {
    colorPrimary: colors.brand,
    colorInfo: colors.info,
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorError: colors.error,
    colorText: colors.text,
    colorTextSecondary: colors.textMuted,
    colorBorder: colors.border,
    colorBgBase: colors.surface,
    colorBgLayout: colors.surfaceMuted,
    colorBgContainer: colors.surface,
    borderRadius: borderRadii.md,
    fontFamily: typography.fontFamily,
    controlHeight: 40,
    controlHeightLG: 48,
  },
  components: {
    Button: {
      borderRadius: borderRadii.md,
      controlHeight: 40,
      fontWeight: 600,
    },
    Card: {
      borderRadiusLG: borderRadii.lg,
      boxShadowTertiary: 'none',
    },
    Layout: {
      bodyBg: colors.surface,
      headerBg: colors.surface,
      footerBg: colors.surfaceMuted,
    },
  },
} satisfies ThemeConfig;
