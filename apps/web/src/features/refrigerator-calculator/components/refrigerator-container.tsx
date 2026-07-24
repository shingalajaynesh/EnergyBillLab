'use client';

import { useState } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import {
  calculateApplianceCost,
  type ApplianceCostResult,
} from '@energy-bill-lab/calculation-engine';

import { RefrigeratorForm } from './refrigerator-form';
import type { RefrigeratorFormValues } from '../schemas/refrigerator-schema';

const { Text, Title } = Typography;

type StateOption = {
  stateCode: string;
  stateName: string;
  rateCentsPerKwh: number;
};

type RefrigeratorContainerProps = {
  stateOptions?: StateOption[];
  sourcePeriodText?: string;
};

const INITIAL_RESULT: ApplianceCostResult = calculateApplianceCost({
  wattage: 150,
  hoursPerDay: 24,
  days: 30,
  rateCentsPerKwh: 16.5,
  dutyCyclePercent: 35,
});

export function RefrigeratorContainer({
  stateOptions = [],
  sourcePeriodText,
}: RefrigeratorContainerProps) {
  const [result, setResult] = useState<ApplianceCostResult>(INITIAL_RESULT);
  const [formValues, setFormValues] = useState<Partial<RefrigeratorFormValues>>({
    mode: 'wattage',
    days: 30,
  });

  const handleCalculate = (newResult: ApplianceCostResult, values: RefrigeratorFormValues) => {
    setResult(newResult);
    setFormValues(values);
  };

  const handleReset = () => {
    setResult(INITIAL_RESULT);
    setFormValues({ mode: 'wattage', days: 30 });
  };

  return (
    <div>
      <RefrigeratorForm
        onCalculate={handleCalculate}
        onReset={handleReset}
        stateOptions={stateOptions}
        sourcePeriodText={sourcePeriodText}
      />

      <Card style={{ marginBottom: 24, borderRadius: 12 }}>
        <Title level={4} style={{ marginTop: 0 }}>
          Estimated Refrigerator Operating Cost
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
            <Card type="inner" title="Annual Cost">
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
            <Card type="inner" title="Effective Power Draw">
              <Title level={3} style={{ margin: 0 }}>
                {result.effectiveWatts} W
              </Title>
              <Text type="secondary">
                {formValues.mode === 'annual_kwh'
                  ? 'Based on EnergyGuide rating'
                  : `${result.dutyCyclePercentUsed}% duty cycle`}
              </Text>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
          <Text type="secondary">
            Formula: {result.workedExample.formulaSummary} | Rate used:{' '}
            {result.rateCentsPerKwhUsed.toFixed(2)}¢/kWh
          </Text>
        </div>
      </Card>
    </div>
  );
}
