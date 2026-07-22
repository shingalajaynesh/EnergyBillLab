# Calculation Engine Technical Documentation

## Mathematical Foundation

All monetary calculations in the `@energy-bill-lab/web` calculation engine are executed using **integer-cents arithmetic** to prevent JavaScript floating-point inaccuracies.

---

## Core Formulas

### 1. Current All-In Effective Cost per kWh

$$\text{All-In Effective Cost (\$/kWh)} = \frac{\text{Current Bill (cents)}}{\text{Current kWh}} \times \frac{1}{100}$$

### 2. Daily Average Usage

$$\text{Daily Usage (kWh/day)} = \frac{\text{Current kWh}}{\text{Current Billing Days}}$$

### 3. 30-Day Normalized Projection

$$\text{30-Day Estimated Usage (kWh)} = \left(\frac{\text{Current kWh}}{\text{Current Billing Days}}\right) \times 30$$

$$\text{30-Day Estimated Cost (\$)} = \left(\frac{\text{Current Bill (cents)}}{\text{Current Billing Days}}\right) \times \frac{30}{100}$$

---

## Comparison & Normalization Equations

### 4. Billing-Day Adjusted Expected Usage

When comparing a current billing period ($D_{\text{curr}}$ days) with a previous period ($D_{\text{prev}}$ days, $K_{\text{prev}}$ kWh):

$$\text{Previous Daily Usage} = \frac{K_{\text{prev}}}{D_{\text{prev}}}$$

$$\text{Adjusted Expected Current Usage} = \text{Previous Daily Usage} \times D_{\text{curr}}$$

$$\text{Normalized Usage Difference } (\Delta K_{\text{norm}}) = K_{\text{curr}} - \text{Adjusted Expected Current Usage}$$

### 5. Bill Decomposition & Exact Reconciliation

$$\Delta B_{\text{total}} = \text{Bill}_{\text{curr}} - \text{Bill}_{\text{prev}} \quad \text{(in cents)}$$

$$\text{Usage Effect (cents)} = \text{round}\left( \Delta K_{\text{norm}} \times \frac{\text{Bill}_{\text{prev}} (\text{cents})}{K_{\text{prev}}} \right)$$

$$\text{Rate, Fee \& Other Effect (cents)} = \Delta B_{\text{total}} - \text{Usage Effect (cents)}$$

#### Strict Reconciliation Proof:

$$\text{Usage Effect (cents)} + \text{Rate, Fee \& Other Effect (cents)} \equiv \Delta B_{\text{total}} \quad \text{(cents)}$$

This guarantees 100% exact reconciliation between the sum of components and the overall bill change.

---

## Insight Classification Determinism

The result classification is evaluated based on the dominance of the absolute usage effect versus absolute rate/fee effect:

$$\text{Total Effect} = |\text{Usage Effect}| + |\text{Rate/Fee Effect}|$$

1. **`SMALL_CHANGE`**: Total bill difference $|\Delta B_{\text{total}}| < \$5.00$.
2. **`USAGE_PRIMARY`**: $\frac{|\text{Usage Effect}|}{\text{Total Effect}} \ge 0.65$.
3. **`RATE_FEE_PRIMARY`**: $\frac{|\text{Rate/Fee Effect}|}{\text{Total Effect}} \ge 0.65$.
4. **`BOTH_SIGNIFICANT`**: Neither component exceeds $65\%$ of the total absolute effect.
