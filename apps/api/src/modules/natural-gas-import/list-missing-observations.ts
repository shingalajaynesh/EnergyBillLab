import * as fs from 'fs';
import * as path from 'path';
import { EiaClientService } from '../../infrastructure/eia/eia-client.service';
import { NaturalGasImportService } from './natural-gas-import.service';

function loadEnvIfMissing() {
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
    }
  }
}

const GEOGRAPHIES = [
  'US',
  'AK',
  'AL',
  'AR',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'IA',
  'ID',
  'IL',
  'IN',
  'KS',
  'KY',
  'LA',
  'MA',
  'MD',
  'ME',
  'MI',
  'MN',
  'MO',
  'MS',
  'MT',
  'NC',
  'ND',
  'NE',
  'NH',
  'NJ',
  'NM',
  'NV',
  'NY',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VA',
  'VT',
  'WA',
  'WI',
  'WV',
  'WY',
];

const PERIODS = [
  '2024-06',
  '2024-07',
  '2024-08',
  '2024-09',
  '2024-10',
  '2024-11',
  '2024-12',
  '2025-01',
  '2025-02',
  '2025-03',
  '2025-04',
  '2025-05',
  '2025-06',
  '2025-07',
  '2025-08',
  '2025-09',
  '2025-10',
  '2025-11',
  '2025-12',
  '2026-01',
  '2026-02',
  '2026-03',
  '2026-04',
  '2026-05',
];

async function main() {
  loadEnvIfMissing();
  const eiaClient = new EiaClientService();
  const importService = new NaturalGasImportService(eiaClient);

  const eiaResult = await eiaClient.fetchNaturalGasData({
    startPeriod: '2024-06',
    endPeriod: '2026-05',
    length: 5000,
    sortDirection: 'desc',
  });

  const discoveredMap = new Map<string, { price: number; reason?: string }>();

  for (const row of eiaResult.rows) {
    const parsed = importService.parseAndValidateRow(row);
    const key = `${row.duoarea}:${row.period}`;
    if (parsed.success) {
      discoveredMap.set(key, { price: parseFloat(parsed.data.priceDollarsPerMcf) });
    } else {
      discoveredMap.set(key, { price: 0, reason: parsed.reason });
    }
  }

  const missing: Array<{ period: string; geography: string; reason: string }> = [];

  for (const period of PERIODS) {
    for (const geo of GEOGRAPHIES) {
      const key = `${geo === 'US' ? 'NUS' : `S${geo}`}:${period}`;
      const entry = discoveredMap.get(key);
      if (!entry) {
        missing.push({ period, geography: geo, reason: 'UNAVAILABLE_IN_EIA_SOURCE' });
      } else if (entry.price <= 0) {
        missing.push({
          period,
          geography: geo,
          reason: entry.reason || 'NON_POSITIVE_SOURCE_VALUE',
        });
      }
    }
  }

  console.log(`Theoretical Total: ${PERIODS.length * GEOGRAPHIES.length} (24 x 52 = 1248)`);
  console.log(`Accepted Count: ${1248 - missing.length}`);
  console.log(`Missing/Rejected Count: ${missing.length}`);
  console.log('--- MISSING OBSERVATIONS LIST ---');
  console.log(JSON.stringify(missing, null, 2));
}

main().catch(console.error);
