import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';

import { EiaClientService } from '../../infrastructure/eia/eia-client.service';
import { NaturalGasImportService } from './natural-gas-import.service';

function loadEnvIfMissing() {
  if (process.env.EIA_API_KEY) return;
  const envPaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'apps/api/.env'),
    path.resolve(__dirname, '../../../.env'),
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
      if (process.env.EIA_API_KEY) break;
    }
  }
}

async function main() {
  loadEnvIfMissing();
  const logger = new Logger('NaturalGasImportCLI');
  logger.log('Starting natural gas CLI import tool...');

  const eiaClient = new EiaClientService();
  const service = new NaturalGasImportService(eiaClient);

  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const startIdx = args.indexOf('--start');
  const startPeriod = startIdx !== -1 ? args[startIdx + 1] : undefined;

  const endIdx = args.indexOf('--end');
  const endPeriod = endIdx !== -1 ? args[endIdx + 1] : undefined;

  const result = await service.runImport({
    importType: 'manual',
    dryRun,
    startPeriod,
    endPeriod,
  });

  logger.log(`Natural Gas Import Completed! Status: ${result.status}`);
  logger.log(`Rows Inserted/Updated: ${result.insertedRows}`);
  logger.log(`Rows Rejected: ${result.rejectedRows}`);
  logger.log(`Latest Period: ${result.latestPeriod}`);

  if (result.issues.length > 0) {
    logger.warn(`Issues encountered: ${JSON.stringify(result.issues)}`);
  }

  process.exit(result.status === 'succeeded' ? 0 : 1);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Natural Gas CLI fatal error:', err);
    process.exit(1);
  });
}
