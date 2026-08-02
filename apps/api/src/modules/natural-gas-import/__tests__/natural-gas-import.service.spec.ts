import { describe, expect, it } from 'vitest';

import { NaturalGasEiaRowSchema } from '../../../infrastructure/eia/natural-gas-eia-client.schema';
import type { EiaClientService } from '../../../infrastructure/eia/eia-client.service';
import { NaturalGasImportService } from '../natural-gas-import.service';

describe('NaturalGasImportService & Transport Validation', () => {
  it('1. transport schema accepts response rows with zero values without failing response envelope', () => {
    const zeroRow = NaturalGasEiaRowSchema.parse({
      period: '2026-04',
      duoarea: 'SCA',
      process: 'PRS',
      product: 'EPG0',
      value: 0,
      units: '$/MCF',
    });

    expect(zeroRow.value).toBe(0);
    expect(zeroRow.duoarea).toBe('SCA');
  });

  it('2. parses valid EIA natural gas rows correctly (PRS process & duoarea)', () => {
    const mockEiaClient = {} as EiaClientService;
    const service = new NaturalGasImportService(mockEiaClient);

    const result = service.parseAndValidateRow({
      period: '2026-04',
      duoarea: 'SCA',
      process: 'PRS',
      product: 'EPG0',
      value: 18.45,
      units: '$/MCF',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.geographyCode).toBe('CA');
      expect(result.data.period).toBe('2026-04-01');
      expect(result.data.priceDollarsPerMcf).toBe('18.4500');
      expect(result.data.priceDollarsPerTherm).toBe('1.7809');
    }
  });

  it('2b. strictly rejects PIN process rows as industrial natural gas data', () => {
    const mockEiaClient = {} as EiaClientService;
    const service = new NaturalGasImportService(mockEiaClient);

    const result = service.parseAndValidateRow({
      period: '2026-04',
      duoarea: 'SCA',
      process: 'PIN',
      product: 'EPG0',
      value: 4.9,
      units: '$/MCF',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.reason).toBe('WRONG_PROCESS');
    }
  });

  it('3. rejects zero-value row with NON_POSITIVE_SOURCE_VALUE reason', () => {
    const mockEiaClient = {} as EiaClientService;
    const service = new NaturalGasImportService(mockEiaClient);

    const res = service.parseAndValidateRow({
      period: '2026-04',
      duoarea: 'SCA',
      process: 'PRS',
      product: 'EPG0',
      value: 0,
      units: '$/MCF',
    });

    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.reason).toBe('NON_POSITIVE_SOURCE_VALUE');
    }
  });

  it('4. rejects negative-value row with NON_POSITIVE_SOURCE_VALUE reason', () => {
    const mockEiaClient = {} as EiaClientService;
    const service = new NaturalGasImportService(mockEiaClient);

    const res = service.parseAndValidateRow({
      period: '2026-04',
      duoarea: 'SCA',
      process: 'PRS',
      product: 'EPG0',
      value: -15.5,
      units: '$/MCF',
    });

    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.reason).toBe('NON_POSITIVE_SOURCE_VALUE');
    }
  });

  it('5. rejects nonfinite numeric value safely', () => {
    const mockEiaClient = {} as EiaClientService;
    const service = new NaturalGasImportService(mockEiaClient);

    const res = service.parseAndValidateRow({
      period: '2026-04',
      duoarea: 'SCA',
      process: 'PRS',
      product: 'EPG0',
      value: NaN,
      units: '$/MCF',
    });

    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.reason).toBe('NON_POSITIVE_SOURCE_VALUE');
    }
  });

  it('6. continues processing valid rows when another row is zero', async () => {
    const mockEiaClient = {
      fetchNaturalGasData: () =>
        Promise.resolve({
          total: 2,
          rows: [
            {
              period: '2026-04',
              duoarea: 'SCA',
              process: 'PRS',
              product: 'EPG0',
              value: 0,
              units: '$/MCF',
            },
            {
              period: '2026-04',
              duoarea: 'STX',
              process: 'PRS',
              product: 'EPG0',
              value: 12.5,
              units: '$/MCF',
            },
          ],
        }),
    } as unknown as EiaClientService;

    const service = new NaturalGasImportService(mockEiaClient);
    const report = await service.runImport({ dryRun: true });

    expect(report.status).toBe('succeeded');
    expect(report.fetchedRows).toBe(2);
    expect(report.validatedRows).toBe(1);
    expect(report.rejectedRows).toBe(1);
    expect(report.rejectionBreakdown?.NON_POSITIVE_SOURCE_VALUE).toBe(1);
  });

  it('7. fails import when all rows are zero or invalid', async () => {
    const mockEiaClient = {
      fetchNaturalGasData: () =>
        Promise.resolve({
          total: 2,
          rows: [
            {
              period: '2026-04',
              duoarea: 'SCA',
              process: 'PRS',
              product: 'EPG0',
              value: 0,
              units: '$/MCF',
            },
            {
              period: '2026-04',
              duoarea: 'STX',
              process: 'PRS',
              product: 'EPG0',
              value: 0,
              units: '$/MCF',
            },
          ],
        }),
    } as unknown as EiaClientService;

    const service = new NaturalGasImportService(mockEiaClient);
    const report = await service.runImport({ dryRun: true });

    expect(report.status).toBe('failed');
    expect(report.validatedRows).toBe(0);
    expect(report.rejectedRows).toBe(2);
    expect(report.issues[0]?.message).toContain('No valid residential natural gas rows remain');
  });

  it('8. contract-shape failure throws on non-numeric value or missing required fields', () => {
    expect(() =>
      NaturalGasEiaRowSchema.parse({
        period: '2026-04',
        duoarea: 'SCA',
        process: 'PRS',
        product: 'EPG0',
        value: 'invalid-number',
        units: '$/MCF',
      }),
    ).toThrow();
  });
});
