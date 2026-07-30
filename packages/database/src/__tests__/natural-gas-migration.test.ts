import { describe, expect, it } from 'vitest';
import { getTableColumns } from 'drizzle-orm';

import { naturalGasGeographies, naturalGasResidentialPricesMonthly } from '../schema';

describe('Natural Gas Database Migration & Schema Verification', () => {
  it('1. verifies natural_gas_geographies columns and primary key', () => {
    const cols = getTableColumns(naturalGasGeographies);

    expect(cols.code).toBeDefined();
    expect(cols.name).toBeDefined();
    expect(cols.type).toBeDefined();
    expect(cols.createdAt).toBeDefined();
    expect(cols.updatedAt).toBeDefined();

    expect(cols.code.primary).toBe(true);
  });

  it('2. verifies natural_gas_residential_prices_monthly columns, PK, and fields', () => {
    const cols = getTableColumns(naturalGasResidentialPricesMonthly);

    expect(cols.id).toBeDefined();
    expect(cols.geographyCode).toBeDefined();
    expect(cols.period).toBeDefined();
    expect(cols.sector).toBeDefined();
    expect(cols.priceDollarsPerMcf).toBeDefined();
    expect(cols.priceDollarsPerTherm).toBeDefined();
    expect(cols.conversionMethod).toBeDefined();
    expect(cols.conversionAssumptions).toBeDefined();
    expect(cols.source).toBeDefined();
    expect(cols.sourceDataset).toBeDefined();
    expect(cols.importRunId).toBeDefined();
    expect(cols.importedAt).toBeDefined();

    expect(cols.id.primary).toBe(true);
    expect(cols.sector.default).toBe('RES');
  });
});
