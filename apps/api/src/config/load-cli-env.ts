import fs from 'fs';
import path from 'path';

/**
 * Safely loads environment variables from local .env files into process.env
 * without overwriting variables that are already set in process.env.
 */
export function loadCliEnv(): void {
  const possiblePaths = [
    path.resolve(process.cwd(), 'apps/api/.env'),
    path.resolve(process.cwd(), '.env'),
    path.resolve(__dirname, '../../../../.env'),
    path.resolve(__dirname, '../../../.env'),
    path.resolve(__dirname, '../../.env'),
  ];

  for (const envPath of possiblePaths) {
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, 'utf8');
        const lines = content.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx === -1) continue;
          const key = trimmed.slice(0, eqIdx).trim();
          let value = trimmed.slice(eqIdx + 1).trim();
          if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            value = value.slice(1, -1);
          }
          // Do NOT overwrite existing process.env variables (process variables take precedence)
          if (!process.env[key] || process.env[key] === '') {
            process.env[key] = value;
          }
        }
      } catch {
        // Ignore read errors
      }
    }
  }
}
