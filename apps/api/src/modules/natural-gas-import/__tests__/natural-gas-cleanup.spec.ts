import { describe, expect, it } from 'vitest';

import { NaturalGasCleanupService } from '../natural-gas-cleanup.service';

describe('NaturalGasCleanupService & Safety Audit Verification', () => {
  it('1. cleanup defaults to dry-run with databaseWrites equal to zero', async () => {
    const service = new NaturalGasCleanupService();
    const report = await service.runDryRunCleanup();

    expect(report.mode).toBe('dry-run');
    expect(report.databaseWrites).toBe(0);
    expect(report.status).toBe('succeeded');
    expect(report.auditExplanation).toContain('DRY RUN ONLY');
  });

  it('2. transactional replacement requires explicit confirm parameter', async () => {
    const service = new NaturalGasCleanupService();
    const report = await service.executeAtomicReplacement({ confirm: false });

    expect(report.status).toBe('requires_confirmation');
    expect(report.databaseWrites).toBe(0);
  });

  it('3. audit correctly classifies known PRS vs PIN national checkpoints', async () => {
    const service = new NaturalGasCleanupService();
    const audit = await service.auditDatabase();

    expect(audit.checkpointAudits).toHaveLength(6);
    expect(
      audit.checkpointAudits.some(
        (c) => c.period === '2026-04' && c.expectedPrs === 18.17 && c.expectedPin === 4.9,
      ),
    ).toBe(true);
    expect(
      audit.checkpointAudits.some(
        (c) => c.period === '2026-05' && c.expectedPrs === 19.83 && c.expectedPin === 4.27,
      ),
    ).toBe(true);
  });

  it('4. proves electricity data and geography registry are strictly excluded from cleanup selection', async () => {
    const service = new NaturalGasCleanupService();
    const report = await service.runDryRunCleanup();

    expect(report.selectionCriteria).not.toContain('electricity');
    expect(report.selectionCriteria).not.toContain('geographies');
    expect(report.selectionCriteria).toContain('PIN');
  });
});
