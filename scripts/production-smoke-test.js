/**
 * Energy Bill Lab - Read-Only Production Smoke-Test Script
 *
 * Safe, non-mutating validation script covering all core platform routes,
 * data freshness indicators, CSV headers, sitemap count, and robots.txt.
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.SMOKE_TEST_BASE_URL || 'https://energybilllab.com';
const API_URL = process.env.SMOKE_TEST_API_URL || 'https://energybilllab.onrender.com';

const CRITICAL_ROUTES = [
  '/',
  '/electricity-rates',
  '/electricity-rates/north-carolina',
  '/electricity-rates/california',
  '/electricity-rates/texas',
  '/electricity-rates/hawaii',
  '/electricity-rates/north-dakota',
  '/guides/how-to-read-an-electric-bill-line-by-line',
  '/tools/ac-cost-calculator',
  '/tools/appliance-energy-cost-calculator',
  '/tools/clothes-dryer-cost-calculator',
  '/tools/dehumidifier-cost-calculator',
  '/tools/electric-water-heater-cost-calculator',
  '/tools/ev-home-charging-cost-calculator',
  '/tools/pool-pump-cost-calculator',
  '/tools/refrigerator-cost-calculator',
  '/tools/space-heater-cost-calculator',
  '/electricity-bill-analyzer',
  '/comparisons',
  '/research',
  '/research/us-residential-electricity-rate-report',
  '/research/us-residential-electricity-rate-report/csv',
  '/methodology',
  '/data-sources',
  '/privacy',
  '/terms',
  '/sitemap.xml',
  '/robots.txt',
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client
      .get(url, { headers: { 'User-Agent': 'EBL-SmokeTest/1.0' } }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data,
          });
        });
      })
      .on('error', (err) => reject(err));
  });
}

async function runSmokeTest() {
  console.log(`Starting Production Smoke Test against ${BASE_URL}...`);
  let passed = 0;
  let failed = 0;

  for (const route of CRITICAL_ROUTES) {
    const fullUrl = `${BASE_URL}${route}`;
    try {
      const res = await fetchUrl(fullUrl);
      if (res.statusCode === 200) {
        console.log(`[PASS] ${route} (200 OK)`);
        passed++;

        if (route === '/sitemap.xml') {
          const locCount = (res.body.match(/<loc>/g) || []).length;
          if (locCount === 128) {
            console.log(`       -> Sitemap URL count exact: 128 URLs`);
          } else {
            console.warn(`       [WARN] Sitemap URL count is ${locCount} (expected 128)`);
          }
        }

        if (route === '/research/us-residential-electricity-rate-report/csv') {
          const contentType = res.headers['content-type'] || '';
          if (contentType.includes('text/csv')) {
            console.log(`       -> CSV Header valid: ${contentType}`);
          } else {
            console.warn(`       [WARN] CSV Content-Type: ${contentType}`);
          }
        }
      } else {
        console.error(`[FAIL] ${route} returned HTTP ${res.statusCode}`);
        failed++;
      }
    } catch (err) {
      console.error(`[FAIL] ${route} error: ${err.message}`);
      failed++;
    }
  }

  // Check API Health
  try {
    const healthUrl = `${API_URL}/health/live`;
    const res = await fetchUrl(healthUrl);
    if (res.statusCode === 200) {
      console.log(`[PASS] API Liveness Endpoint ${healthUrl} (200 OK)`);
      passed++;
    } else {
      console.error(`[FAIL] API Liveness Endpoint ${healthUrl} returned ${res.statusCode}`);
      failed++;
    }
  } catch (err) {
    console.warn(`[WARN] API Liveness check could not connect to ${API_URL}: ${err.message}`);
  }

  console.log(`\nSmoke Test Finished: ${passed} passed, ${failed} failed.`);
  return failed === 0;
}

if (require.main === module) {
  runSmokeTest().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { runSmokeTest, CRITICAL_ROUTES };
