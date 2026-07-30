'use client';

import { useState } from 'react';
import { calculateNaturalGasBill } from '@energy-bill-lab/calculation-engine';
import { Alert, Card, Form, InputNumber, Radio, Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

export function NaturalGasBillCalculatorIsland() {
  const [unit, setUnit] = useState<'therms' | 'mcf'>('therms');
  const [usage, setUsage] = useState<number | null>(80);
  const [pricePerUnit, setPricePerUnit] = useState<number | null>(1.75);
  const [fixedCharge, setFixedCharge] = useState<number | null>(15);
  const [taxesAndFees, setTaxesAndFees] = useState<number | null>(10);

  const safeUsage = usage ?? 0;
  const safePrice = pricePerUnit ?? 0;
  const safeFixed = fixedCharge ?? 0;
  const safeTaxes = taxesAndFees ?? 0;

  const result = calculateNaturalGasBill({
    usage: safeUsage,
    unit,
    pricePerUnit: safePrice,
    fixedChargeUsd: safeFixed,
    taxesAndFeesUsd: safeTaxes,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card title="Natural Gas Bill Calculator Inputs" bordered>
        <Form layout="vertical">
          <Form.Item label="Billing Unit">
            <Radio.Group
              value={unit}
              onChange={(e) => {
                const newUnit = e.target.value as 'therms' | 'mcf';
                setUnit(newUnit);
                if (newUnit === 'mcf' && (pricePerUnit === 1.75 || pricePerUnit === null)) {
                  setPricePerUnit(18.17);
                  setUsage(8);
                } else if (
                  newUnit === 'therms' &&
                  (pricePerUnit === 18.17 || pricePerUnit === null)
                ) {
                  setPricePerUnit(1.75);
                  setUsage(80);
                }
              }}
            >
              <Radio.Button value="therms">Therms</Radio.Button>
              <Radio.Button value="mcf">Mcf (Thousand Cubic Feet)</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            <Form.Item label={`Monthly Usage (${unit === 'therms' ? 'therms' : 'Mcf'})`}>
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={5000}
                value={usage}
                onChange={(val) => setUsage(val)}
                addonAfter={unit === 'therms' ? 'therms' : 'Mcf'}
              />
            </Form.Item>

            <Form.Item label={`Rate per Unit ($/${unit === 'therms' ? 'therm' : 'Mcf'})`}>
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={100}
                step={0.01}
                value={pricePerUnit}
                onChange={(val) => setPricePerUnit(val)}
                addonBefore="$"
              />
            </Form.Item>

            <Form.Item label="Fixed Customer Account Charge ($)">
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={500}
                value={fixedCharge}
                onChange={(val) => setFixedCharge(val)}
                addonBefore="$"
              />
            </Form.Item>

            <Form.Item label="Taxes & Utility Rider Fees ($)">
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={500}
                value={taxesAndFees}
                onChange={(val) => setTaxesAndFees(val)}
                addonBefore="$"
              />
            </Form.Item>
          </div>
        </Form>
      </Card>

      {/* Results Card */}
      <Card
        title="Estimated Monthly Natural Gas Bill Summary"
        bordered
        style={{ background: '#f9fafb' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Volumetric Usage Charge
            </Text>
            <Title level={3} style={{ margin: 0, color: '#111827' }}>
              ${result.usageChargeUsd.toFixed(2)}
            </Title>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Fixed Account Charge
            </Text>
            <Title level={3} style={{ margin: 0, color: '#111827' }}>
              ${result.fixedChargeUsd.toFixed(2)}
            </Title>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Taxes & Fees
            </Text>
            <Title level={3} style={{ margin: 0, color: '#111827' }}>
              ${result.taxesAndFeesUsd.toFixed(2)}
            </Title>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Estimated Total Monthly Bill
            </Text>
            <Title level={3} style={{ margin: 0, color: '#176b5b' }}>
              ${result.totalBillUsd.toFixed(2)}
            </Title>
          </div>
        </div>

        <Alert
          type="info"
          showIcon
          message={`Effective Cost per ${unit === 'therms' ? 'Therm' : 'Mcf'}`}
          description={`Your effective all-in cost is $${result.effectiveCostPerUnit.toFixed(
            4,
          )} per ${unit === 'therms' ? 'therm' : 'Mcf'} ($${result.totalBillUsd.toFixed(
            2,
          )} total ÷ ${result.usage} ${unit}).`}
        />
      </Card>

      {/* Assumptions & Limitations */}
      <Card title="Formula Assumptions & Calculation Limits" size="small">
        <Paragraph>
          <strong>Formula:</strong> Usage Charge = Usage × Price per Unit. Total Bill = Usage Charge
          + Fixed Charge + Taxes & Fees.
        </Paragraph>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          {result.assumptions.map((item, idx) => (
            <li key={idx} style={{ marginBottom: 4 }}>
              {item}
            </li>
          ))}
          {result.limitations.map((item, idx) => (
            <li key={`lim-${idx}`} style={{ color: '#595959', marginBottom: 4 }}>
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
