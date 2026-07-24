'use client';

import { InputNumber, Space, type InputNumberProps } from 'antd';

export type NumberInputWithUnitProps = InputNumberProps<number> & {
  unit: string;
};

export function NumberInputWithUnit({ unit, style, ...rest }: NumberInputWithUnitProps) {
  return (
    <Space.Compact style={{ width: '100%', ...style }}>
      <InputNumber style={{ width: '100%' }} {...rest} />
      <span
        tabIndex={-1}
        aria-hidden="true"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0 11px',
          background: '#fafafa',
          border: '1px solid #d9d9d9',
          borderLeft: 0,
          borderRadius: '0 6px 6px 0',
          color: 'rgba(0, 0, 0, 0.65)',
          fontSize: '14px',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {unit}
      </span>
    </Space.Compact>
  );
}
