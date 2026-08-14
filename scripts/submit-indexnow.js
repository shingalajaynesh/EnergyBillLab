/**
 * IndexNow Batch Submission Script for Energy Bill Lab
 *
 * Submits all public URLs to Microsoft Bing and the IndexNow protocol
 * to accelerate search engine discovery and real-time indexation.
 */

const https = require('https');

const HOST = 'energybilllab.com';
const KEY = '589b5670849d4689863427c43f772083';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// 50 U.S. State Slugs
const US_STATES = [
  'alabama',
  'alaska',
  'arizona',
  'arkansas',
  'california',
  'colorado',
  'connecticut',
  'delaware',
  'florida',
  'georgia',
  'hawaii',
  'idaho',
  'illinois',
  'indiana',
  'iowa',
  'kansas',
  'kentucky',
  'louisiana',
  'maine',
  'maryland',
  'massachusetts',
  'michigan',
  'minnesota',
  'mississippi',
  'missouri',
  'montana',
  'nebraska',
  'nevada',
  'new-hampshire',
  'new-jersey',
  'new-mexico',
  'new-york',
  'north-carolina',
  'north-dakota',
  'ohio',
  'oklahoma',
  'oregon',
  'pennsylvania',
  'rhode-island',
  'south-carolina',
  'south-dakota',
  'tennessee',
  'texas',
  'utah',
  'vermont',
  'virginia',
  'washington',
  'west-virginia',
  'wisconsin',
  'wyoming',
];

// Core static & hub URLs
const STATIC_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/contact`,
  `https://${HOST}/authors/jaynesh-shingala`,
  `https://${HOST}/methodology`,
  `https://${HOST}/data-sources`,
  `https://${HOST}/editorial-policy`,
  `https://${HOST}/accessibility`,
  `https://${HOST}/privacy`,
  `https://${HOST}/terms`,
  `https://${HOST}/disclaimer`,
  `https://${HOST}/cookie-policy`,
  `https://${HOST}/electricity-bill-analyzer`,
  `https://${HOST}/electricity-rates`,
  `https://${HOST}/natural-gas-rates`,
  `https://${HOST}/tools`,
  `https://${HOST}/guides`,
  `https://${HOST}/insights`,
  `https://${HOST}/research/us-residential-electricity-rate-report`,
  `https://${HOST}/tools/appliance-energy-cost-calculator`,
  `https://${HOST}/tools/ac-cost-calculator`,
  `https://${HOST}/tools/space-heater-cost-calculator`,
  `https://${HOST}/tools/ev-home-charging-cost-calculator`,
  `https://${HOST}/tools/refrigerator-cost-calculator`,
  `https://${HOST}/tools/clothes-dryer-cost-calculator`,
  `https://${HOST}/tools/electric-water-heater-cost-calculator`,
  `https://${HOST}/tools/pool-pump-cost-calculator`,
  `https://${HOST}/tools/dehumidifier-cost-calculator`,
  `https://${HOST}/tools/natural-gas-bill-calculator`,
  `https://${HOST}/tools/gas-furnace-cost-calculator`,
];

// 50 State Rate URLs
const STATE_URLS = US_STATES.map((s) => `https://${HOST}/electricity-rates/${s}`);

// 50 Guide URLs
const GUIDE_SLUGS = [
  'average-electric-bill-by-state-and-home-size',
  'common-electric-bill-hidden-fees-explained',
  'compare-gas-vs-electric-dryer-cost',
  'compare-gas-vs-electric-water-heater-cost',
  'cost-to-charge-tesla-model-3-and-model-y-at-home',
  'does-unplugging-appliances-save-electricity',
  'electric-baseboard-vs-heat-pump-cost',
  'electric-bill-too-high-in-summer-causes-and-fixes',
  'electric-bill-too-high-in-winter-causes-and-fixes',
  'estimated-vs-actual-meter-reading',
  'fixed-vs-variable-electricity-rates',
  'fuel-adjustment-charges-and-utility-riders-explained',
  'heat-pump-vs-electric-resistance-heating-cost',
  'how-air-leaks-increase-your-energy-bill',
  'how-attic-insulation-affects-your-energy-bill',
  'how-billing-cycle-length-affects-electricity-bills',
  'how-budget-billing-works',
  'how-much-can-a-smart-thermostat-save',
  'how-much-does-it-cost-to-charge-an-ev-at-home',
  'how-much-does-it-cost-to-run-a-dehumidifier',
  'how-much-does-it-cost-to-run-a-pool-pump',
  'how-much-does-it-cost-to-run-a-space-heater',
  'how-much-does-it-cost-to-run-an-air-conditioner',
  'how-much-does-it-cost-to-run-an-electric-clothes-dryer',
  'how-much-does-it-cost-to-run-an-electric-oven',
  'how-much-does-it-cost-to-run-an-electric-water-heater',
  'how-much-electricity-do-household-appliances-use',
  'how-much-electricity-does-a-ceiling-fan-use',
  'how-much-electricity-does-a-dishwasher-use',
  'how-much-electricity-does-a-ductless-mini-split-use',
  'how-much-electricity-does-a-gaming-pc-use',
  'how-much-electricity-does-a-heat-pump-use',
  'how-much-electricity-does-a-laptop-use',
  'how-much-electricity-does-a-microwave-use',
  'how-much-electricity-does-a-portable-air-conditioner-use',
  'how-much-electricity-does-a-refrigerator-use',
  'how-much-electricity-does-a-television-use',
  'how-much-electricity-does-a-washing-machine-use',
  'how-much-electricity-does-a-wifi-router-use',
  'how-much-electricity-does-a-window-air-conditioner-use',
  'how-much-electricity-does-an-air-fryer-use',
  'how-much-electricity-does-an-electric-furnace-use',
  'how-much-electricity-does-an-electric-kettle-use',
  'how-much-electricity-does-an-induction-cooktop-use',
  'how-much-electricity-does-central-air-conditioning-use',
  'how-much-electricity-does-electric-baseboard-heating-use',
  'how-net-metering-affects-your-electric-bill',
  'how-to-calculate-electricity-cost-per-kwh-from-your-bill',
  'how-to-read-an-electric-bill-line-by-line',
  'kw-vs-kwh-explained',
  'peak-vs-off-peak-electricity-hours-explained',
  'should-you-turn-off-the-air-conditioner-when-away',
  'what-is-a-demand-charge-on-an-electric-bill',
  'what-is-a-time-of-use-electricity-rate',
  'what-is-vampire-power-and-how-much-does-it-cost',
  'why-electricity-rates-change',
  'why-is-my-electric-bill-high-when-usage-is-low',
  'why-is-my-electric-bill-so-high',
];
const GUIDE_URLS = GUIDE_SLUGS.map((g) => `https://${HOST}/guides/${g}`);

// 22 Published Insight URLs
const INSIGHT_SLUGS = [
  'may-2026-ev-home-charging-cost-benchmark',
  'may-2026-residential-electricity-price-bill-impact',
  'may-2026-cooling-demand-residential-sales',
  'april-2026-residential-natural-gas-price-heating-cost',
  'may-2026-heat-pump-water-heater-savings-benchmark',
  'july-2026-summer-wholesale-electricity-price-forecast',
  'may-2026-rooftop-solar-generation-retail-savings-benchmark',
  'august-2026-home-battery-storage-usable-capacity-round-trip-efficiency-benchmark',
  'august-2026-state-residential-electricity-price-spread-benchmark',
  'august-2026-time-of-use-peak-rate-spread-appliance-load-shifting-benchmark',
  'may-2026-residential-natural-gas-price-off-season-bill-impact',
  'august-2026-central-air-conditioner-seer2-cooling-cost-benchmark',
  'august-2026-census-division-residential-electricity-rate-breakdown',
  'august-2026-home-appliance-operating-cost-hierarchy-benchmark',
  'august-2026-natural-gas-vs-electric-heating-cost-per-mmbtu-benchmark',
  'august-2026-portable-electric-space-heater-operating-cost-benchmark',
  'august-2026-electric-clothes-dryer-kwh-operating-cost-benchmark',
  'august-2026-refrigerator-kwh-annual-operating-cost-benchmark',
  'august-2026-electric-dishwasher-kwh-operating-cost-benchmark',
  'august-2026-electric-clothes-washer-kwh-operating-cost-benchmark',
  'august-2026-electric-dehumidifier-kwh-operating-cost-benchmark',
  'august-2026-rooftop-solar-nem-3-net-billing-export-value-benchmark',
  'august-2026-swimming-pool-pump-kwh-operating-cost-benchmark',
  'august-2026-induction-vs-electric-vs-gas-cooktop-energy-cost-benchmark',
];
const INSIGHT_URLS = INSIGHT_SLUGS.map((i) => `https://${HOST}/insights/${i}`);

// Category URLs
const CATEGORY_URLS = [
  `https://${HOST}/insights/category/electricity-rates`,
  `https://${HOST}/insights/category/home-energy-costs`,
  `https://${HOST}/insights/category/appliances`,
  `https://${HOST}/insights/category/natural-gas`,
  `https://${HOST}/insights/page/2`,
];

const ALL_SITE_URLS = Array.from(
  new Set([...STATIC_URLS, ...STATE_URLS, ...GUIDE_URLS, ...INSIGHT_URLS, ...CATEGORY_URLS]),
);

async function submitIndexNow(urlList = ALL_SITE_URLS) {
  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList,
  });

  const endpoints = ['api.indexnow.org', 'www.bing.com'];

  for (const endpoint of endpoints) {
    console.log(`Submitting ${urlList.length} URLs to https://${endpoint}/indexnow ...`);

    const options = {
      hostname: endpoint,
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    await new Promise((resolve) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          if (res.statusCode === 200 || res.statusCode === 202) {
            console.log(
              `✓ Success from ${endpoint}: HTTP ${res.statusCode} (${urlList.length} URLs Queued for Immediate Indexing)`,
            );
          } else {
            console.log(
              `! Response from ${endpoint}: HTTP ${res.statusCode} - ${data || 'No response body'}`,
            );
          }
          resolve();
        });
      });

      req.on('error', (err) => {
        console.error(`✕ Error submitting to ${endpoint}:`, err.message);
        resolve();
      });

      req.write(payload);
      req.end();
    });
  }
}

if (require.main === module) {
  submitIndexNow(ALL_SITE_URLS).then(() => {
    console.log('IndexNow submission finished.');
  });
}

module.exports = { submitIndexNow, KEY, HOST, ALL_SITE_URLS };
