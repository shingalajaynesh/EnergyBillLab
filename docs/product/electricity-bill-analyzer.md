# Electricity Bill Analyzer Product Specification

## Overview

The **Electricity Bill Analyzer** is the primary utility tool of **EnergyBillLab.com**. It helps U.S. residential energy consumers analyze their electric bills, determine their all-in effective cost per kWh, normalize consumption across varying billing-period lengths, decompose bill differences into usage vs. rate/fee effects, and obtain actionable utility-statement inspection guidance.

---

## User Problem & Value Proposition

Utility bills are notoriously difficult to interpret. Statements contain multiple line items including customer service fees, generation supply rates, distribution charges, fuel riders, environmental surcharges, and local taxes. Additionally, billing cycle lengths fluctuate between 28 and 35 days month-to-month, making raw kWh comparisons misleading.

The Electricity Bill Analyzer resolves these issues by:

1. **Normalizing by Calendar Days**: Computing daily average kWh/day and adjusting expected baseline consumption.
2. **Decomposing Bill Differences**: Isolating how much of a bill change stems from increased daily usage versus changes in effective rate, fees, or taxes.
3. **Providing Plain-English Insight**: Categorizing results deterministically without alarming or misleading language.
4. **Actionable Checklist**: Directing users to specific statement items to verify.

---

## Input & Output Model

### Inputs

- **Current Billing Period (Required)**:
  - `currentBill`: Total bill amount in USD ($0.01 to $100,000)
  - `currentKwh`: Total electricity consumption in kWh (>0 to 1,000,000)
  - `currentDays`: Billing period length in days (1 to 120)

- **Previous Billing Period (Optional for Comparison)**:
  - `previousBill`: Previous total bill amount in USD
  - `previousKwh`: Previous electricity consumption in kWh
  - `previousDays`: Previous billing period length in days

- **Detailed Line Items (Optional)**:
  - `currentFixedCharge`, `currentTaxesAndFees`, `currentCredits`
  - `previousFixedCharge`, `previousTaxesAndFees`, `previousCredits`

### Key Outputs

- **All-In Effective Cost**: `Total Bill ($) / Total kWh` ($/kWh)
- **Daily Usage**: `Total kWh / Billing Days` (kWh/day)
- **30-Day Normalized Projection**: `(kWh / Days) * 30`
- **Normalized Usage Difference**: `Current kWh - (Previous Daily Usage * Current Days)`
- **Estimated Usage Effect ($)**: `Normalized kWh Difference * Previous Effective Rate`
- **Estimated Rate, Fee & Other Effect ($)**: `Total Bill Change ($) - Estimated Usage Effect ($)`
- **Reconciliation Proof**: `Usage Effect ($) + Rate/Fee Effect ($) === Total Bill Change ($)`

---

## Privacy & Data Handling

- **100% Client-Side Computation**: All arithmetic runs entirely within the browser.
- **Zero Storage**: No values are saved in `localStorage`, `sessionStorage`, cookies, or URL parameters.
- **Zero Transmission**: No entered bill amounts, kWh figures, rates, or personal inputs are sent to any API or backend.
- **Privacy-Safe Analytics**: GTM events record only feature completion metadata (`hasComparison`, `hasAdvancedInputs`, `classification`). Zero user-entered financial or energy figures are included in event payloads.
- **No Calculator-Specific Client Data Fetch**: No calculator-specific client data fetch is required for basic client-side calculation.

---

## Non-Goals

- No AI-generated diagnoses or unsupported claims.
- No automated PDF/image OCR uploads.
- No user account or saved report requirement.
- No unverified state-average comparisons or fake predictions.
