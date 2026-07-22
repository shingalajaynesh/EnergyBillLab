# State Electricity Rate Comparison Specification

## Product Purpose

The **State Rate Comparison** feature allows users of the Electricity Bill Analyzer to compare their effective household electricity cost ($/kWh) against official statewide residential average electricity prices compiled by the **U.S. Energy Information Administration (EIA)**.

---

## Key Formulas

1. **Rate Difference (cents/kWh)**:
   $$\text{Rate Difference (¢/kWh)} = \text{User Effective Rate (¢/kWh)} - \text{EIA State Average Price (¢/kWh)}$$

2. **Percentage Difference (%)**:
   $$\text{Percentage Difference (\%)} = \left(\frac{\text{Rate Difference}}{\text{EIA State Average Price}}\right) \times 100$$

3. **Current-Usage Estimated Difference ($)**:
   $$\text{Estimated Dollar Difference (\$)} = \left(\frac{\text{Rate Difference}}{100}\right) \times \text{Current Usage (kWh)}$$

---

## Directional Classification Labels

- **`Near Statewide Average`**: Rate difference within $\pm 5\%$ of the state EIA residential average.
- **`Above Statewide Average`**: Rate difference exceeds $+5\%$ of the state average.
- **`Below Statewide Average`**: Rate difference is lower than $-5\%$ of the state average.

---

## Truthful Disclosure & Caveats

All state comparison results display the following explicit caveat:

> _This statewide average combines many utilities, rate plans, and seasonal variations. Your actual utility statement includes fixed customer charges, local taxes, regulatory riders, and tiered pricing structure._

---

## Data Freshness & Source Period

Every state comparison card explicitly displays the exact source month and year (e.g., _"Latest available EIA residential average: April 2026"_) along with full text attribution to the U.S. Energy Information Administration.
