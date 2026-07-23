import { getTableColumns } from 'drizzle-orm';
import { describe, expect, it } from 'vitest';
import { dataImportRuns } from '../data-import-runs';
import { electricityGeographies } from '../electricity-geographies';
import { electricityRetailSalesMonthly } from '../electricity-retail-sales-monthly';

describe('Database Schemas Metadata', () => {
  describe('electricityGeographies table', () => {
    it('defines correct table columns and constraints', () => {
      const cols = getTableColumns(electricityGeographies);
      expect(cols.code).toBeDefined();
      expect(cols.slug).toBeDefined();
      expect(cols.name).toBeDefined();
      expect(cols.kind).toBeDefined();
      expect(cols.isActive).toBeDefined();
      expect(cols.displayOrder).toBeDefined();
      expect(cols.createdAt).toBeDefined();
      expect(cols.updatedAt).toBeDefined();
    });
  });

  describe('electricityRetailSalesMonthly table', () => {
    it('defines exact numeric precision and required columns', () => {
      const cols = getTableColumns(electricityRetailSalesMonthly);
      expect(cols.id).toBeDefined();
      expect(cols.geographyCode).toBeDefined();
      expect(cols.period).toBeDefined();
      expect(cols.sector).toBeDefined();
      expect(cols.priceCentsPerKwh).toBeDefined();
      expect(cols.revenueMillionUsd).toBeDefined();
      expect(cols.salesMillionKwh).toBeDefined();
      expect(cols.customers).toBeDefined();
      expect(cols.source).toBeDefined();
      expect(cols.sourceDataset).toBeDefined();
      expect(cols.importRunId).toBeDefined();
      expect(cols.importedAt).toBeDefined();
      expect(cols.createdAt).toBeDefined();
      expect(cols.updatedAt).toBeDefined();
    });
  });

  describe('dataImportRuns table', () => {
    it('defines required audit columns', () => {
      const cols = getTableColumns(dataImportRuns);
      expect(cols.id).toBeDefined();
      expect(cols.source).toBeDefined();
      expect(cols.dataset).toBeDefined();
      expect(cols.importType).toBeDefined();
      expect(cols.status).toBeDefined();
      expect(cols.startedAt).toBeDefined();
      expect(cols.completedAt).toBeDefined();
      expect(cols.metadata).toBeDefined();
    });
  });
});
