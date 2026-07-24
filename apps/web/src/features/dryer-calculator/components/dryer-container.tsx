'use client';

import { useState } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { calculateDryerCost, type DryerCostResult } from '@energy-bill-lab/calculation-engine';

import { DryerForm } from './dryer-form';
import type { DryerFormValues } from '../schemas/dryer-schema';

const { Text, Title } = Typography;

type StateOption = {
  stateCode: string;
  stateName: string;
  rateCentsPerKwh: number;
};

type DryerContainerProps = {
  stateOptions?: StateOption[];
  sourcePeriodText?: string;
};

const INITIAL_RESULT: DryerCostResult = calculateDryerCost({
  wattage: 4500,
  minutesPerLoad: 45,
  loadsPerWeek: 4,
  weeks: 4.33,
  rateCentsPerKwh: 16.5,
  dutyCyclePercent: 100,
});

export function DryerContainer({ stateOptions = [], sourcePeriodText }: DryerContainerProps) {
  const [result, setResult] = useState<DryerCostResult>(INITIAL_RESULT);

  const handleCalculate = (newResult: DryerCostResult, _values: DryerFormValues) => {
    setResult(newResult);
  };

  const handleReset = () => {
    setResult(INITIAL_RESULT);
  };

  return (
    <div>
      <DryerForm
        onCalculate={handleCalculate}
        onReset={handleReset}
        stateOptions={stateOptions}
        sourcePeriodText={sourcePeriodText}
      />

      <Card style={{ marginBottom: 24, borderRadius: 12 }}>
        <Title level={4} style={{ marginTop: 0 }}>
          Estimated Electric Dryer Operating Cost
        </Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card type="inner" title="Cost per Load">
              <Title level={2} style={{ margin: 0, color: 'var(--ebl-primary, #176b5b)' }}>
                ${result.costPerLoadUsd.toFixed(2)}
              </Title>
              <Text type="secondary">{result.kwhPerLoad.toFixed(2)} kWh / load</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card type="inner" title="Monthly Cost">
              <Title level={3} style={{ margin: 0 }}>
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
            <Card type="inner" title="Weekly Runtime">
              <Title level={3} style={{ margin: 0 }}>
                {(result.hoursPerLoad * result.loadsPerWeekUsed).toFixed(1)} hrs
              </Title>
              <Text type="secondary">
                {result.loadsPerWeekUsed} loads @ {result.hoursPerLoad * 60} mins
              </Text>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
          <Text type="secondary">
            Formula: kWh/load = (Watts × Hours/load) / 1,000 | Rate used:{' '}
            {result.rateCentsPerKwhUsed.toFixed(2)}¢/kWh
          </Text>
        </div>
      </Card>
    </div>
  );
}
