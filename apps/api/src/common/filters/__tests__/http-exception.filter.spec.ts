import { describe, expect, it } from 'vitest';

import { HttpExceptionFilter } from '../http-exception.filter.js';

describe('HttpExceptionFilter secret redaction', () => {
  it('redacts PostgreSQL credentials and connection strings', () => {
    const filter = new HttpExceptionFilter();
    const raw =
      'Connection failed to postgresql://neondb_owner:super_secret_password@ep-curly-bonus.neon.tech/neondb';
    const redacted = filter.redactSecrets(raw);
    expect(redacted).not.toContain('super_secret_password');
    expect(redacted).toContain('postgresql://[REDACTED]@ep-curly-bonus.neon.tech/neondb');
  });

  it('redacts revalidation secrets and bearer tokens', () => {
    const filter = new HttpExceptionFilter();
    const raw =
      'Invalid token: ebl_reval_sec_9f8a2b7c4d3e21056789abcdef012345 or Bearer secret_jwt_token';
    const redacted = filter.redactSecrets(raw);
    expect(redacted).not.toContain('ebl_reval_sec_9f8a2b7c4d3e21056789abcdef012345');
    expect(redacted).not.toContain('secret_jwt_token');
    expect(redacted).toContain('[REDACTED_SECRET]');
    expect(redacted).toContain('Bearer [REDACTED_TOKEN]');
  });
});
