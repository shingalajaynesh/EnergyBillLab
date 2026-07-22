'use client';

import { Alert, Button, Collapse, Form, InputNumber, Segmented, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';

import { BILL_ANALYZER_CONSTANTS } from '../constants/electricity-bill-constants';
import { trackCalculatorEvent } from '../lib/calculator-analytics';
import {
  electricityBillSchema,
  type ElectricityBillFormValues,
} from '../schemas/electricity-bill-schema';
import type { ElectricityBillInput } from '../types/electricity-bill-types';

import styles from './bill-analyzer-form.module.css';

const { Text } = Typography;

type BillAnalyzerFormProps = {
  onCalculate: (input: ElectricityBillInput) => void;
  onReset: () => void;
};

export function BillAnalyzerForm({ onCalculate, onReset }: BillAnalyzerFormProps) {
  const [form] = Form.useForm<ElectricityBillFormValues>();
  const [hasComparison, setHasComparison] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleFinish = (values: ElectricityBillFormValues) => {
    setFormError(null);

    // Validate with Zod schema
    const validation = electricityBillSchema.safeParse(values);

    if (!validation.success) {
      const firstError = validation.error.errors[0]?.message || 'Please check the form for errors.';
      setFormError(firstError);

      // Focus first invalid input
      const firstErrorField = validation.error.errors[0]?.path[0];
      if (firstErrorField) {
        form.scrollToField(firstErrorField);
      }
      return;
    }

    const inputData: ElectricityBillInput = {
      currentBill: validation.data.currentBill,
      currentKwh: validation.data.currentKwh,
      currentDays: validation.data.currentDays,
      previousBill: validation.data.previousBill,
      previousKwh: validation.data.previousKwh,
      previousDays: validation.data.previousDays,
      currentFixedCharge: validation.data.currentFixedCharge,
      currentTaxesAndFees: validation.data.currentTaxesAndFees,
      currentCredits: validation.data.currentCredits,
      previousFixedCharge: validation.data.previousFixedCharge,
      previousTaxesAndFees: validation.data.previousTaxesAndFees,
      previousCredits: validation.data.previousCredits,
    };

    const isAdvancedUsed =
      values.currentFixedCharge !== undefined ||
      values.currentTaxesAndFees !== undefined ||
      values.currentCredits !== undefined;

    trackCalculatorEvent({
      event: 'electricity_bill_analyzer_completed',
      hasComparison: Boolean(values.previousBill && values.previousKwh && values.previousDays),
      hasAdvancedInputs: isAdvancedUsed,
    });

    onCalculate(inputData);
  };

  const handleReset = () => {
    form.resetFields();
    setHasComparison(false);
    setFormError(null);
    trackCalculatorEvent({ event: 'electricity_bill_analyzer_reset' });
    onReset();
  };

  const handleValuesChange = () => {
    if (formError) setFormError(null);
  };

  return (
    <div className={styles.formContainer} ref={formRef}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onValuesChange={handleValuesChange}
        requiredMark={false}
      >
        {formError ? (
          <Alert className={styles.errorAlert} message={formError} showIcon type="error" />
        ) : null}

        <div className={styles.sectionTitle}>
          <h3>Current Billing Period</h3>
          <Text type="secondary">Enter the totals from your latest electricity statement</Text>
        </div>

        <div className={styles.formGrid}>
          <Form.Item
            label="Total Current Bill ($)"
            name="currentBill"
            rules={[{ required: true, message: 'Enter current bill total in $' }]}
          >
            <InputNumber
              addonBefore="$"
              className={styles.fullWidth}
              max={BILL_ANALYZER_CONSTANTS.MAX_BILL_DOLLARS}
              min={BILL_ANALYZER_CONSTANTS.MIN_BILL_DOLLARS}
              placeholder="e.g. 180.00"
              precision={2}
              size="large"
              step={0.01}
            />
          </Form.Item>

          <Form.Item
            label="Total Electricity Use (kWh)"
            name="currentKwh"
            rules={[{ required: true, message: 'Enter electricity usage in kWh' }]}
          >
            <InputNumber
              addonAfter="kWh"
              className={styles.fullWidth}
              max={BILL_ANALYZER_CONSTANTS.MAX_KWH}
              min={BILL_ANALYZER_CONSTANTS.MIN_KWH}
              placeholder="e.g. 1200"
              precision={1}
              size="large"
              step={1}
            />
          </Form.Item>

          <Form.Item
            label="Billing Period Length (Days)"
            name="currentDays"
            rules={[{ required: true, message: 'Enter billing cycle days' }]}
          >
            <InputNumber
              addonAfter="days"
              className={styles.fullWidth}
              max={BILL_ANALYZER_CONSTANTS.MAX_DAYS}
              min={BILL_ANALYZER_CONSTANTS.MIN_DAYS}
              placeholder="e.g. 30"
              precision={0}
              size="large"
              step={1}
            />
          </Form.Item>
        </div>

        {/* Comparison Toggle */}
        <div className={styles.comparisonToggleArea}>
          <div className={styles.toggleHeader}>
            <div>
              <h4 className={styles.toggleTitle}>Compare Previous Billing Period</h4>
              <Text type="secondary">
                Optional: Analyze why your bill changed compared to a prior statement
              </Text>
            </div>
            <Segmented
              options={[
                { label: 'Off', value: false },
                { label: 'Compare Statement', value: true },
              ]}
              onChange={(value) => setHasComparison(Boolean(value))}
              value={hasComparison}
            />
          </div>

          {hasComparison ? (
            <div className={styles.formGrid}>
              <Form.Item
                label="Previous Total Bill ($)"
                name="previousBill"
                rules={[
                  {
                    required: hasComparison,
                    message: 'Enter previous bill total in $',
                  },
                ]}
              >
                <InputNumber
                  addonBefore="$"
                  className={styles.fullWidth}
                  max={BILL_ANALYZER_CONSTANTS.MAX_BILL_DOLLARS}
                  min={BILL_ANALYZER_CONSTANTS.MIN_BILL_DOLLARS}
                  placeholder="e.g. 120.00"
                  precision={2}
                  size="large"
                  step={0.01}
                />
              </Form.Item>

              <Form.Item
                label="Previous Usage (kWh)"
                name="previousKwh"
                rules={[
                  {
                    required: hasComparison,
                    message: 'Enter previous usage in kWh',
                  },
                ]}
              >
                <InputNumber
                  addonAfter="kWh"
                  className={styles.fullWidth}
                  max={BILL_ANALYZER_CONSTANTS.MAX_KWH}
                  min={BILL_ANALYZER_CONSTANTS.MIN_KWH}
                  placeholder="e.g. 1000"
                  precision={1}
                  size="large"
                  step={1}
                />
              </Form.Item>

              <Form.Item
                label="Previous Days"
                name="previousDays"
                rules={[
                  {
                    required: hasComparison,
                    message: 'Enter previous billing days',
                  },
                ]}
              >
                <InputNumber
                  addonAfter="days"
                  className={styles.fullWidth}
                  max={BILL_ANALYZER_CONSTANTS.MAX_DAYS}
                  min={BILL_ANALYZER_CONSTANTS.MIN_DAYS}
                  placeholder="e.g. 30"
                  precision={0}
                  size="large"
                  step={1}
                />
              </Form.Item>
            </div>
          ) : null}
        </div>

        {/* Detailed Mode (Advanced Line Items) */}
        <Collapse
          className={styles.collapseArea}
          items={[
            {
              key: 'detailed-mode',
              label: 'Detailed Mode: Known Fixed Charges, Taxes & Credits (Optional)',
              children: (
                <div className={styles.advancedGrid}>
                  <p className={styles.advancedNote}>
                    If your statement itemizes fixed monthly fees or taxes, enter them below to
                    separate variable energy supply rates.
                  </p>

                  <div className={styles.formGrid}>
                    <Form.Item label="Current Fixed Charge ($)" name="currentFixedCharge">
                      <InputNumber
                        addonBefore="$"
                        className={styles.fullWidth}
                        min={0}
                        placeholder="e.g. 15.00"
                        precision={2}
                      />
                    </Form.Item>

                    <Form.Item label="Current Taxes & Fees ($)" name="currentTaxesAndFees">
                      <InputNumber
                        addonBefore="$"
                        className={styles.fullWidth}
                        min={0}
                        placeholder="e.g. 12.50"
                        precision={2}
                      />
                    </Form.Item>

                    <Form.Item label="Current Credits ($)" name="currentCredits">
                      <InputNumber
                        addonBefore="$"
                        className={styles.fullWidth}
                        min={0}
                        placeholder="e.g. 5.00"
                        precision={2}
                      />
                    </Form.Item>
                  </div>
                </div>
              ),
            },
          ]}

          onChange={(keys) => {
            if (keys.length > 0) {
              trackCalculatorEvent({ event: 'advanced_inputs_opened' });
            }
          }}
        />

        <div className={styles.formActions}>
          <Space>
            <Button size="large" type="default" onClick={handleReset}>
              Clear
            </Button>
            <Button htmlType="submit" size="large" type="primary">
              Analyze Electricity Bill
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
}
