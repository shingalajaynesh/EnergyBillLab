'use client';

import { useState } from 'react';
import { calculateGasFurnaceCost } from '@energy-bill-lab/calculation-engine';
import { Alert, Card, Form, InputNumber, Radio, Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

export type GasFurnaceBenchmarkProps = {
  reportingPeriod?: string | null;
  estimatedPricePerTherm?: number | null;
  sourceLabel?: string | null;
};

export function GasFurnaceCalculatorIsland({
  initialBenchmark,
}: {
  initialBenchmark?: GasFurnaceBenchmarkProps;
}) {
  const defaultThermRate = initialBenchmark?.estimatedPricePerTherm ?? 19.83 / 10.36;

  const [mode, setMode] = useState<'input_capacity' | 'heating_output'>('heating_output');
  const [inputBtu, setInputBtu] = useState<number | null>(100000);
  const [outputBtu, setOutputBtu] = useState<number | null>(80000);
  const [afue, setAfue] = useState<number | null>(80);
  const [runtimeHours, setRuntimeHours] = useState<number | null>(5);
  const [days, setDays] = useState<number | null>(30);
  const [ratePerTherm, setRatePerTherm] = useState<number | null>(
    Number(defaultThermRate.toFixed(4)),
  );

  const safeRuntime = runtimeHours ?? 0;
  const safeDays = days ?? 30;
  const safeRate = ratePerTherm ?? 0;

  const result =
    mode === 'input_capacity'
      ? calculateGasFurnaceCost({
          mode: 'input_capacity',
          inputBtuPerHour: inputBtu ?? 0,
          runtimeHoursPerDay: safeRuntime,
          days: safeDays,
          ratePerThermUsd: safeRate,
        })
      : calculateGasFurnaceCost({
          mode: 'heating_output',
          outputBtuPerHour: outputBtu ?? 0,
          afuePercent: afue ?? 80,
          runtimeHoursPerDay: safeRuntime,
          days: safeDays,
          ratePerThermUsd: safeRate,
        });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {initialBenchmark?.reportingPeriod && (
        <Alert
          type="info"
          showIcon
          message={`EIA Residential Benchmark Gas Rate (${initialBenchmark.sourceLabel || 'U.S. EIA Delivered Price'})`}
          description={`Default natural gas pricing derives from ${initialBenchmark.reportingPeriod} official EIA residential dataset ($${defaultThermRate.toFixed(4)}/therm).`}
        />
      )}

      <Card title="Gas Furnace Cost Calculator Inputs" bordered>
        <Form layout="vertical">
          <Form.Item label="Calculation Mode">
            <Radio.Group
              value={mode}
              onChange={(e) => setMode(e.target.value as 'input_capacity' | 'heating_output')}
            >
              <Radio.Button value="heating_output">Mode B: Heating Output + AFUE %</Radio.Button>
              <Radio.Button value="input_capacity">Mode A: Input Rating (Btu/hr)</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {mode === 'input_capacity' ? (
              <Form.Item label="Furnace Input Capacity (Btu/hr)">
                <InputNumber
                  style={{ width: '100%' }}
                  min={10000}
                  max={300000}
                  step={5000}
                  value={inputBtu}
                  onChange={(val) => setInputBtu(val)}
                  addonAfter="Btu/hr"
                />
              </Form.Item>
            ) : (
              <>
                <Form.Item label="Delivered Heating Output (Btu/hr)">
                  <InputNumber
                    style={{ width: '100%' }}
                    min={10000}
                    max={300000}
                    step={5000}
                    value={outputBtu}
                    onChange={(val) => setOutputBtu(val)}
                    addonAfter="Btu/hr"
                  />
                </Form.Item>

                <Form.Item label="AFUE Efficiency Rating (%)">
                  <InputNumber
                    style={{ width: '100%' }}
                    min={50}
                    max={99}
                    value={afue}
                    onChange={(val) => setAfue(val)}
                    addonAfter="%"
                  />
                </Form.Item>
              </>
            )}

            <Form.Item label="Burner Active Runtime (Hours/Day)">
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={24}
                step={0.5}
                value={runtimeHours}
                onChange={(val) => setRuntimeHours(val)}
                addonAfter="hrs/day"
              />
            </Form.Item>

            <Form.Item label="Active Heating Days">
              <InputNumber
                style={{ width: '100%' }}
                min={1}
                max={365}
                value={days}
                onChange={(val) => setDays(val)}
                addonAfter="days"
              />
            </Form.Item>

            <Form.Item label="Natural Gas Rate ($/Therm)">
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={50}
                step={0.0001}
                value={ratePerTherm}
                onChange={(val) => setRatePerTherm(val)}
                addonBefore="$"
                addonAfter="/therm"
              />
            </Form.Item>
          </div>
        </Form>
      </Card>

      {/* Result Card */}
      <Card title="Estimated Gas Furnace Operating Cost" bordered style={{ background: '#f9fafb' }}>
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
              Calculated Input Capacity
            </Text>
            <Title level={3} style={{ margin: 0, color: '#111827' }}>
              {result.inputBtuPerHour.toLocaleString()} Btu/hr
            </Title>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Therms Consumed
            </Text>
            <Title level={3} style={{ margin: 0, color: '#111827' }}>
              {result.thermsUsed.toFixed(1)} therms
            </Title>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Daily Heating Cost
            </Text>
            <Title level={3} style={{ margin: 0, color: '#111827' }}>
              ${result.dailyCostUsd.toFixed(2)} / day
            </Title>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Estimated Heating Period Cost ({result.days} days)
            </Text>
            <Title level={3} style={{ margin: 0, color: '#176b5b' }}>
              ${result.totalUsageCostUsd.toFixed(2)}
            </Title>
          </div>
        </div>

        <Alert
          type="info"
          showIcon
          message="Volumetric Gas Usage Summary"
          description={`At ${result.inputBtuPerHour.toLocaleString()} Btu/hr input and ${
            result.runtimeHoursPerDay
          } runtime hours/day over ${result.days} days, the furnace uses ${
            result.thermsUsed
          } therms of gas ($${result.totalUsageCostUsd.toFixed(2)} total at $${result.ratePerThermUsd.toFixed(
            4,
          )}/therm).`}
        />
      </Card>

      {/* Assumptions */}
      <Card title="Calculation Assumptions & Limitations" size="small">
        <Paragraph>
          <strong>Formula:</strong> Input Btu/hr = Heating Output Btu/hr ÷ (AFUE % ÷ 100). Therms
          Used = Input Btu/hr × Total Hours ÷ 100,000. Usage Cost = Therms × Gas Rate per Therm.
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
