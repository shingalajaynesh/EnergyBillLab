import type { ThemeConfig } from 'antd';

export const appTheme = {
  token: {
    colorPrimary: '#176b5b',
    colorInfo: '#1f6f8b',
    colorSuccess: '#2f7d32',
    colorWarning: '#a05a00',
    colorError: '#b42318',
    colorText: '#182230',
    colorTextSecondary: '#475467',
    colorBorder: '#d0d5dd',
    colorBgBase: '#ffffff',
    colorBgLayout: '#f6f8f7',
    colorBgContainer: '#ffffff',
    borderRadius: 6,
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    controlHeight: 40,
    controlHeightLG: 48,
  },
  components: {
    Button: {
      borderRadius: 6,
      controlHeight: 40,
      fontWeight: 600,
    },
    Card: {
      borderRadiusLG: 8,
      boxShadowTertiary: 'none',
    },
    Layout: {
      bodyBg: '#ffffff',
      headerBg: '#ffffff',
      footerBg: '#f6f8f7',
    },
  },
} satisfies ThemeConfig;
