import { z } from 'zod';

const envSchema = z.object({
  API_HOST: z.string().min(1).default('0.0.0.0'),
  API_PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  DATABASE_URL: z.string().url().optional(),
  DATABASE_READ_URL: z.string().url().optional(),
  EIA_API_KEY: z.string().optional(),
  EIA_API_BASE_URL: z.string().url().default('https://api.eia.gov/v2/'),
  EIA_REQUEST_TIMEOUT_MS: z.coerce.number().int().default(15000),
  EIA_IMPORT_LOOKBACK_MONTHS: z.coerce.number().int().default(12),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

export type ApiEnv = z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv): ApiEnv {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');

    throw new Error(`Invalid API environment: ${message}`);
  }

  return result.data;
}
