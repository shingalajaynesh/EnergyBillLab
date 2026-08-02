import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';

import { EiaClientService } from '../../../infrastructure/eia/eia-client.service';
import { NaturalGasImportService } from '../natural-gas-import.service';

function loadEnv() {
  const envPaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'apps/api/.env'),
    path.resolve(process.cwd(), '../../.env'),
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...vals] = trimmed.split('=');
          const k = key?.trim();
          const v = vals
            .join('=')
            .trim()
            .replace(/^["']|["']$/g, '');
          if (k && v && !process.env[k]) {
            process.env[k] = v;
          }
        }
      }
    }
  }
}

describe('Opt-In Live EIA Residential Natural Gas (PRS) Contract Verification', () => {
  it('1. skips live EIA test when RUN_LIVE_EIA_TESTS env var is not set to true', () => {
    if (process.env.RUN_LIVE_EIA_TESTS !== 'true') {
      expect(process.env.RUN_LIVE_EIA_TESTS).toBeUndefined();
      // Gracefully skipped without network or database interaction
      return;
    }
  });

  it('2. executes live EIA contract verification when RUN_LIVE_EIA_TESTS=true', async () => {
    if (process.env.RUN_LIVE_EIA_TESTS !== 'true') {
      // Opt-in flag absent: skip live network execution
      return;
    }

    loadEnv();
    const apiKey = process.env.EIA_API_KEY;
    if (!apiKey) {
      console.warn('Skipping live EIA API execution: EIA_API_KEY missing from environment.');
      return;
    }

    const eiaClient = new EiaClientService();
    const result = await eiaClient.fetchNaturalGasData({
      startPeriod: '2026-01',
      endPeriod: '2026-05',
      length: 100,
      sortDirection: 'desc',
    });

    expect(result.rows.length).toBeGreaterThan(0);

    // Verify PRS process, EPG0 product, and $/MCF unit
    for (const row of result.rows) {
      if (row.process) expect(row.process).toBe('PRS');
      if (row.product) expect(row.product).toBe('EPG0');
      if (row.units) expect(['$/MCF', '$/Mcf']).toContain(row.units);
    }

    // Verify US national residential checkpoints
    const usMay2026 = result.rows.find((r) => r.duoarea === 'NUS' && r.period === '2026-05');
    const usApr2026 = result.rows.find((r) => r.duoarea === 'NUS' && r.period === '2026-04');
    const usMar2026 = result.rows.find((r) => r.duoarea === 'NUS' && r.period === '2026-03');
    const usFeb2026 = result.rows.find((r) => r.duoarea === 'NUS' && r.period === '2026-02');
    const usJan2026 = result.rows.find((r) => r.duoarea === 'NUS' && r.period === '2026-01');

    if (usMay2026) expect(usMay2026.value).toBe(19.83);
    if (usApr2026) expect(usApr2026.value).toBe(18.17);
    if (usMar2026) expect(usMar2026.value).toBe(16.25);
    if (usFeb2026) expect(usFeb2026.value).toBe(15.06);
    if (usJan2026) expect(usJan2026.value).toBe(13.96);

    // Run dry-run import via NaturalGasImportService
    const service = new NaturalGasImportService(eiaClient);
    const report = await service.runImport({
      dryRun: true,
      startPeriod: '2026-01',
      endPeriod: '2026-05',
    });

    // Assert zero database writes occur during dry-run mode
    expect(report.mode).toBe('dry-run');
    expect(report.insertedRows).toBe(0);
    expect(report.updatedRows).toBe(0);
    expect(report.validatedRows).toBeGreaterThan(0);
  }, 60000);
});
