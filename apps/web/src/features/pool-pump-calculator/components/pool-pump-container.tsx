'use client';

import { useState } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import {
  calculatePoolPumpCost,
  type ApplianceCostResult,
} from '@energy-bill-lab/calculation-engine';

import { PoolPumpForm } from './pool-pump-form';
import type { PoolPumpFormValues } from '../schemas/pool-pump-schema';

const { Text, Title } = Typography;

type StateOption = {
  stateCode: string;
  stateName: string;
  rateCentsPerKwh: number;
};

type PoolPumpContainerProps = {
  stateOptions?: StateOption[];
  sourcePeriodText?: string;
};

const INITIAL_RESULT: ApplianceCostResult = calculatePoolPumpCost({
  wattage: 1500,
  hoursPerDay: 8,
  daysPerWeek: 7,
  weeks: 4.33,
  rateCentsPerKwh: 16.5,
  dutyCyclePercent: 100,
});

export function PoolPumpContainer({ stateOptions = [], sourcePeriodText }: PoolPumpContainerProps) {
  const [result, setResult] = useState<ApplianceCostResult>(INITIAL_RESULT);

  const handleCalculate = (newResult: ApplianceCostResult, _values: PoolPumpFormValues) => {
    setResult(newResult);
  };

  const handleReset = () => {
    setResult(INITIAL_RESULT);
  };

  return (
    <div>
      <PoolPumpForm
        onCalculate={handleCalculate}
        onReset={handleReset}
        stateOptions={stateOptions}
        sourcePeriodText={sourcePeriodText}
      />

      <Card style={{ marginBottom: 24, borderRadius: 12 }}>
        <Title level={4} style={{ marginTop: 0 }}>
          Estimated Pool Pump Electricity Cost
        </Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card type="inner" title="Monthly Cost">
              <Title level={2} style={{ margin: 0, color: 'var(--ebl-primary, #176b5b)' }}>
                ${result.monthlyCostUsd.toFixed(2)}
              </Title>
              <Text type="secondary">{result.monthlyKwh.toFixed(1)} kWh / month</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card type="inner" title="Annual / Season Cost">
              <Title level={3} style={{ margin: 0 }}>
                ${result.annualCostUsd.toFixed(2)}
              </Title>
              <Text type="secondary">{result.annualKwh.toFixed(0)} kWh / year</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card type="inner" title="Daily Cost">
              <Title level={3} style={{ margin: 0 }}>
                ${result.dailyCostUsd.toFixed(2)}
              </Title>
              <Text type="secondary">{result.dailyKwh.toFixed(2)} kWh / day</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card type="inner" title="Hourly Running Cost">
              <Title level={3} style={{ margin: 0 }}>
                ${(result.hourlyKwh * (result.rateCentsPerKwhUsed / 100)).toFixed(2)}
              </Title>
              <Text type="secondary">{result.hourlyKwh.toFixed(2)} kWh / hr</Text>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
          <Text type="secondary">
            Formula: kWh = (Watts × Hours/Day) / 1,000 | Rate used:{' '}
            {result.rateCentsPerKwhUsed.toFixed(2)}¢/kWh
          </Text>
        </div>
      </Card>
    </div>
  );
}
