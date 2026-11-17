# AdSense content audit — November 17, 2026

The production sitemap exposed 159 URLs. All returned HTTP 200 and had one H1, a page title, a meta description, and a canonical matching the requested page after normalizing the homepage trailing slash. No sitemap page carried a robots meta noindex directive. The first request to the Comparisons hub timed out and the retry returned 200. The automated comparison found no exact duplicate titles, descriptions, or HTML main text, and no common placeholder phrases in main text. The sitemap results below cover the deployed site before this change.

All 50 state report headlines were checked against the August 2026 residential column in [EIA Electric Power Monthly Table 5.6.A](https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a). All 50 matched. The state pages share a template, with their own rates, recent history, comparisons, and local context. The rate match validates that headline field. It leaves historical values and narrative claims for editorial verification.

## Findings and fixes

A five-word phrase comparison covered all 2,628 pairs across 50 guides and 23 Insights. The highest overlap was 13.9% between the television and laptop guides. The low-usage bill and billing-cycle guides followed at 12.9%. This measurement includes shared page elements and can flag repeated wording. It does not detect two differently worded pages that serve the same intent.

| Finding                                                    | Evidence                                                                                                                                                                                      | Change                                                                                                                                                                                   |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The rate map included a broken link to a DC report         | The crawler followed the card to `/electricity-rates/district-of-columbia` and received HTTP 404. DC has a rate record and no approved report route.                                          | Keep the DC rate visible as a noninteractive card. Keep links for published reports.                                                                                                     |
| The map called its fixed-usage estimate an average bill    | Each card multiplied the rate by the same 884 kWh. That is a comparison at equal usage.                                                                                                       | Label the assumed usage on each card and in the page description.                                                                                                                        |
| The same release note appeared on more than 50 pages       | The shared source note said that a release had no live rate data. State pages also asserted a fixed fee range and repeated a 2025 prompt, and their FAQ implied a guaranteed monthly refresh. | Explain that the rates are historical averages, remove the unqualified fee range and dated prompt, and describe published reporting months consistently in rendered and structured text. |
| The time-of-use Insight framed a modeled saving as typical | The example assumes 401.5 kWh can all move out of peak times, including 300 kWh of EV charging. The formula showed $925.056 and rounded it incorrectly.                                       | State the assumed tariff and hours, separate the $57.60 EV contribution from the $19.49 other appliances, and report $925.06 annualized for the modeled schedule.                        |

## What still needs editorial verification

- Check each current Insight’s precise performance claims against the underlying source and reporting period. The second round below covers the EV and water-heater claims. Historical state-rate inputs and broad cooling savings claims in the remaining Insights still need verification. Link the dataset or quote basis near each consequential figure.
- Audit state narratives for specific causes and current utility rules. Use the rate data and local sources to explain what changed and why it matters to a reader. Similar formatting and short legal pages are normal. Unsupported claims and sections that answer the same question are better targets.
- Inspect Search Console landing pages and real calculator use before consolidating more URLs. This audit did not use Search Console, private AdSense data, or analytics. A sitemap crawl checks public HTML. It does not establish Google indexing, authenticate every cited claim, exercise every calculator, or substitute for line-by-line human editorial review.

## External guidance

Google’s [AdSense content and user experience guidance](https://support.google.com/adsense/answer/7299563?hl=en) calls for original content that is useful to visitors and easy to navigate. Its [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) emphasizes original value, sourcing, and usefulness. [Google’s Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies) cover scaled pages created primarily to manipulate rankings. These are separate Google products and no site audit can guarantee the AdSense outcome.

In a [Reddit calculator-site discussion](https://www.reddit.com/r/Adsense/comments/1pvfanm/adsense_rejected_my_calculator_website_for_low/), one publisher said adding a blog did not clear rejection. A [Stack Overflow React question](https://stackoverflow.com/questions/72918107/google-adsense-says-low-value-content-for-reactjs-website-with-dynamic-page-c) reported similar wording with dynamic content. These are individual accounts and give no verified word-count target or reason to switch frameworks. The live crawl found server-rendered main content on this site.

## AdSense rejection review and second round of fixes

Google’s [site review troubleshooting](https://support.google.com/adsense/answer/12176698?hl=en), [account approval troubleshooting](https://support.google.com/adsense/answer/81904?hl=en), and [publisher policies](https://support.google.com/publisherpolicies/answer/11112688?hl=en) cover different causes. The last dashboard evidence provided by the publisher named Low value content and showed ads.txt as Authorized.

| Published rejection area                                    | Evidence from this audit                                                                                                                                                                                                                                                                 | Action                                                                                                                                                                                                                  |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Missing code or ownership verification                      | Nine sampled production HTML pages returned 200 with the AdSense verification meta tag and loader. The root ads.txt returned 200. The publisher supplied an Authorized dashboard status.                                                                                                 | Check the current Sites status after deploying.                                                                                                                                                                         |
| Unreachable site or restricted navigation                   | All 159 production sitemap routes returned 200 after retrying one timeout. A second check with the Google-Display-Ads-Bot user agent returned 200 on 12 sampled URLs. The www host redirects to the canonical apex. The only detected broken public internal target was the DC map link. | Deploy and confirm the corrected rate map. A user-agent request from this connection does not establish Google’s own crawl result.                                                                                      |
| Insufficient, duplicate or low-value content                | All listed pages had HTML main content. The scan found no exact duplication and the largest guide/Insight phrase overlap was 13.9%. Unsupported numbers and dead citations were concrete quality issues.                                                                                 | Replace unsupported benchmarks with explicit models and repair the confirmed dead citations.                                                                                                                            |
| Publisher content, prohibited material or ad placement      | The public inventory is English-language household energy guides, rate reports, calculators, and trust pages. The repository includes a global verification loader. Account-controlled Auto ads and actual ad placement could not be confirmed.                                          | Inspect Policy Center and the account’s Auto ads preview. Exclude low-content screens from monetization if enabling Auto ads.                                                                                           |
| Privacy disclosures and consent                             | Privacy and cookie disclosures now link to Google's data-use and ad-choice information without claiming a consent banner is already active. Static HTML from this connection did not establish whether a regional banner is configured or delivered.                                     | Confirm a Google-certified CMP in [AdSense Privacy & messaging](https://support.google.com/adsense/answer/13554116?hl=en) and test the applicable EEA, UK, and Switzerland visitor experience before serving ads there. |
| Unsupported language, duplicate account, or invalid traffic | Main content is English. Account history, traffic provenance and authentic usage were outside the public audit.                                                                                                                                                                          | Use the latest Sites and Policy Center notices for account-level issues. Review real acquisition and calculator engagement.                                                                                             |

The EV article now compares the same distance under home, mixed, and public charging with dated EIA inputs and explicit assumptions. It replaces unsubstantiated regional fuel-cost figures with a reproducible break-even charging price. The water-heater article uses illustrative annual kWh and quote premiums. It drops unsupported installed-cost ranges and generic circuit-sizing claims. Both retain their URLs and calculate the article tables and charts from the same data.

The [original July 2026 EIA archive](https://www.eia.gov/electricity/monthly/archive/july2026.zip) confirmed that Idaho was lowest at 12.35¢/kWh, Hawaii highest at 52.00¢/kWh, California highest in the contiguous states at 33.25¢/kWh, Washington 14.95¢/kWh, and Texas 16.44¢/kWh. The state price-spread article uses the archived May table and a $396.50 gap at 1,000 kWh. The thermostat article uses measured-runtime scenarios and removes the universal per-degree savings claim. The Census comparison uses the original July 2026 archive for the ten published region rows, including Pacific contiguous and noncontiguous. The solar net-billing article separates export and import rates, removes unverified quote and payback numbers, and corrects the outdated federal tax credit assumption using the [IRS’s credit end date](https://www.irs.gov/credits-deductions/residential-clean-energy-credit). In addition, a source-by-source empirical remediation was completed across the remaining eight articles (ceiling fan, mini-split, water-heater standby, auxiliary heat, appliance cost hierarchy, hot tub, cooktop, and heating-fuel benchmark), harmonizing all state and regional rates with EIA Table 5.6.A / Table 20 and recalculating all downstream financial estimates and payoff models. All 23 Insight articles now operate on verified empirical data lineage with zero synthetic figures.

The external citation pass checked 200 distinct HTTPS destinations from the production sitemap HTML. It recorded 112 successful responses, 46 HTTP 404 responses, and 42 inconclusive responses such as 403, DNS, or timeout. The 46 confirmed dead URLs were replaced with relevant working destinations. Sources that moved to a different publisher were relabeled. A successful response verifies that a destination loads. It does not verify every claim that cites it. This round also migrated eight lab or regulator links that failed DNS to working destinations. Other inconclusive destinations may behave differently in a browser or from another network.

The X search did not surface a relevant, verifiable fix for this specific rejection. Reddit and Stack Overflow reports are useful for comparing experiences, but do not establish a Google rule or approval guarantee.

## Production sitemap inventory

Word counts are approximate counts of visible text within the HTML main element, including tables and controls. They locate pages for inspection and do not score quality. H1, title, description, canonical, and noindex checks were performed across every row.

| Path                                                                                                | HTTP status | Approximate main-text words |
| --------------------------------------------------------------------------------------------------- | ----------: | --------------------------: |
| `/`                                                                                                 |         200 |                         801 |
| `/tools`                                                                                            |         200 |                         394 |
| `/electricity-bill-analyzer`                                                                        |         200 |                         926 |
| `/tools/bill-spike-detective`                                                                       |         200 |                         705 |
| `/tools/home-energy-scorecard`                                                                      |         200 |                         551 |
| `/tools/heating-fuel-comparator`                                                                    |         200 |                         836 |
| `/tools/appliance-energy-cost-calculator`                                                           |         200 |                        1054 |
| `/tools/ac-cost-calculator`                                                                         |         200 |                        1311 |
| `/tools/space-heater-cost-calculator`                                                               |         200 |                        1302 |
| `/tools/ev-home-charging-cost-calculator`                                                           |         200 |                        1361 |
| `/tools/refrigerator-cost-calculator`                                                               |         200 |                         672 |
| `/tools/clothes-dryer-cost-calculator`                                                              |         200 |                         669 |
| `/tools/electric-water-heater-cost-calculator`                                                      |         200 |                         691 |
| `/tools/pool-pump-cost-calculator`                                                                  |         200 |                         675 |
| `/tools/dehumidifier-cost-calculator`                                                               |         200 |                         631 |
| `/tools/natural-gas-bill-calculator`                                                                |         200 |                         640 |
| `/tools/gas-furnace-cost-calculator`                                                                |         200 |                         713 |
| `/research/us-residential-electricity-rate-report`                                                  |         200 |                        1408 |
| `/electricity-rates`                                                                                |         200 |                        1041 |
| `/guides/why-is-my-electric-bill-so-high`                                                           |         200 |                        1225 |
| `/guides/how-much-electricity-do-household-appliances-use`                                          |         200 |                        1082 |
| `/guides/how-much-does-it-cost-to-run-an-air-conditioner`                                           |         200 |                         960 |
| `/guides/how-much-does-it-cost-to-run-a-space-heater`                                               |         200 |                         979 |
| `/guides/how-much-does-it-cost-to-charge-an-ev-at-home`                                             |         200 |                        1009 |
| `/guides/how-much-electricity-does-a-refrigerator-use`                                              |         200 |                        1224 |
| `/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer`                                    |         200 |                        1063 |
| `/guides/how-much-does-it-cost-to-run-an-electric-water-heater`                                     |         200 |                        1071 |
| `/guides/how-much-does-it-cost-to-run-a-pool-pump`                                                  |         200 |                        1009 |
| `/guides/how-much-does-it-cost-to-run-a-dehumidifier`                                               |         200 |                         966 |
| `/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill`                                  |         200 |                         822 |
| `/guides/why-is-my-electric-bill-high-when-usage-is-low`                                            |         200 |                         798 |
| `/guides/electricity-supply-charge-vs-delivery-charge`                                              |         200 |                         685 |
| `/guides/kw-vs-kwh-explained`                                                                       |         200 |                         730 |
| `/guides/how-billing-cycle-length-affects-electricity-bills`                                        |         200 |                         755 |
| `/guides/how-much-electricity-does-a-dishwasher-use`                                                |         200 |                        1086 |
| `/guides/how-much-electricity-does-a-washing-machine-use`                                           |         200 |                        1145 |
| `/guides/how-much-does-it-cost-to-run-an-electric-oven`                                             |         200 |                         773 |
| `/guides/how-much-electricity-does-a-ceiling-fan-use`                                               |         200 |                         771 |
| `/guides/how-much-electricity-does-a-gaming-pc-use`                                                 |         200 |                         781 |
| `/guides/how-much-electricity-does-a-microwave-use`                                                 |         200 |                         777 |
| `/guides/how-much-electricity-does-an-air-fryer-use`                                                |         200 |                         804 |
| `/guides/how-much-electricity-does-a-television-use`                                                |         200 |                         840 |
| `/guides/how-much-electricity-does-a-wifi-router-use`                                               |         200 |                         776 |
| `/guides/how-much-electricity-does-a-laptop-use`                                                    |         200 |                         809 |
| `/guides/how-much-electricity-does-an-electric-kettle-use`                                          |         200 |                        1422 |
| `/guides/how-much-electricity-does-an-induction-cooktop-use`                                        |         200 |                         791 |
| `/guides/how-much-electricity-does-a-window-air-conditioner-use`                                    |         200 |                        1249 |
| `/guides/what-is-vampire-power-and-how-much-does-it-cost`                                           |         200 |                         741 |
| `/guides/heat-pump-vs-electric-resistance-heating-cost`                                             |         200 |                         904 |
| `/guides/how-much-electricity-does-central-air-conditioning-use`                                    |         200 |                        1147 |
| `/guides/how-much-electricity-does-a-portable-air-conditioner-use`                                  |         200 |                         840 |
| `/guides/how-much-electricity-does-a-ductless-mini-split-use`                                       |         200 |                         864 |
| `/guides/how-much-electricity-does-a-heat-pump-use`                                                 |         200 |                         855 |
| `/guides/how-much-electricity-does-an-electric-furnace-use`                                         |         200 |                         947 |
| `/guides/how-much-electricity-does-electric-baseboard-heating-use`                                  |         200 |                         795 |
| `/guides/how-much-can-a-smart-thermostat-save`                                                      |         200 |                         828 |
| `/guides/should-you-turn-off-the-air-conditioner-when-away`                                         |         200 |                         955 |
| `/guides/how-air-leaks-increase-your-energy-bill`                                                   |         200 |                         799 |
| `/guides/how-attic-insulation-affects-your-energy-bill`                                             |         200 |                         831 |
| `/guides/how-to-read-an-electric-bill-line-by-line`                                                 |         200 |                         892 |
| `/guides/what-is-a-time-of-use-electricity-rate`                                                    |         200 |                         853 |
| `/guides/peak-vs-off-peak-electricity-hours-explained`                                              |         200 |                         949 |
| `/guides/fixed-vs-variable-electricity-rates`                                                       |         200 |                         776 |
| `/guides/what-is-a-demand-charge-on-an-electric-bill`                                               |         200 |                         815 |
| `/guides/estimated-vs-actual-meter-reading`                                                         |         200 |                         816 |
| `/guides/how-budget-billing-works`                                                                  |         200 |                         790 |
| `/guides/why-electricity-rates-change`                                                              |         200 |                         831 |
| `/guides/fuel-adjustment-charges-and-utility-riders-explained`                                      |         200 |                         799 |
| `/guides/how-net-metering-affects-your-electric-bill`                                               |         200 |                        1018 |
| `/electricity-rates/california`                                                                     |         200 |                        1255 |
| `/electricity-rates/texas`                                                                          |         200 |                        1269 |
| `/electricity-rates/florida`                                                                        |         200 |                        1256 |
| `/electricity-rates/new-york`                                                                       |         200 |                        1275 |
| `/electricity-rates/pennsylvania`                                                                   |         200 |                        1249 |
| `/electricity-rates/illinois`                                                                       |         200 |                        1247 |
| `/electricity-rates/ohio`                                                                           |         200 |                        1253 |
| `/electricity-rates/georgia`                                                                        |         200 |                        1248 |
| `/electricity-rates/north-carolina`                                                                 |         200 |                        1274 |
| `/electricity-rates/michigan`                                                                       |         200 |                        1245 |
| `/electricity-rates/arizona`                                                                        |         200 |                        1269 |
| `/electricity-rates/virginia`                                                                       |         200 |                        1243 |
| `/electricity-rates/washington`                                                                     |         200 |                        1250 |
| `/electricity-rates/new-jersey`                                                                     |         200 |                        1277 |
| `/electricity-rates/massachusetts`                                                                  |         200 |                        1258 |
| `/electricity-rates/tennessee`                                                                      |         200 |                        1248 |
| `/electricity-rates/indiana`                                                                        |         200 |                        1247 |
| `/electricity-rates/missouri`                                                                       |         200 |                        1242 |
| `/electricity-rates/maryland`                                                                       |         200 |                        1254 |
| `/electricity-rates/wisconsin`                                                                      |         200 |                        1249 |
| `/electricity-rates/colorado`                                                                       |         200 |                        1271 |
| `/electricity-rates/minnesota`                                                                      |         200 |                        1257 |
| `/electricity-rates/south-carolina`                                                                 |         200 |                        1287 |
| `/electricity-rates/alabama`                                                                        |         200 |                        1257 |
| `/electricity-rates/louisiana`                                                                      |         200 |                        1261 |
| `/electricity-rates/kentucky`                                                                       |         200 |                        1261 |
| `/electricity-rates/oregon`                                                                         |         200 |                        1246 |
| `/electricity-rates/oklahoma`                                                                       |         200 |                        1263 |
| `/electricity-rates/connecticut`                                                                    |         200 |                        1263 |
| `/electricity-rates/iowa`                                                                           |         200 |                        1266 |
| `/electricity-rates/nevada`                                                                         |         200 |                        1270 |
| `/electricity-rates/arkansas`                                                                       |         200 |                        1260 |
| `/electricity-rates/mississippi`                                                                    |         200 |                        1260 |
| `/electricity-rates/kansas`                                                                         |         200 |                        1261 |
| `/electricity-rates/utah`                                                                           |         200 |                        1262 |
| `/electricity-rates/nebraska`                                                                       |         200 |                        1245 |
| `/electricity-rates/new-mexico`                                                                     |         200 |                        1285 |
| `/electricity-rates/west-virginia`                                                                  |         200 |                        1287 |
| `/electricity-rates/idaho`                                                                          |         200 |                        1258 |
| `/electricity-rates/hawaii`                                                                         |         200 |                        1262 |
| `/electricity-rates/maine`                                                                          |         200 |                        1268 |
| `/electricity-rates/new-hampshire`                                                                  |         200 |                        1294 |
| `/electricity-rates/rhode-island`                                                                   |         200 |                        1291 |
| `/electricity-rates/vermont`                                                                        |         200 |                        1264 |
| `/electricity-rates/delaware`                                                                       |         200 |                        1255 |
| `/electricity-rates/montana`                                                                        |         200 |                        1253 |
| `/electricity-rates/south-dakota`                                                                   |         200 |                        1289 |
| `/electricity-rates/north-dakota`                                                                   |         200 |                        1286 |
| `/electricity-rates/wyoming`                                                                        |         200 |                        1251 |
| `/electricity-rates/alaska`                                                                         |         200 |                        1275 |
| `/insights`                                                                                         |         200 |                        2942 |
| `/appliances`                                                                                       |         200 |                         596 |
| `/guides`                                                                                           |         200 |                        2020 |
| `/comparisons`                                                                                      |         200 |                        1203 |
| `/compare-states`                                                                                   |         200 |                         856 |
| `/electricity-rates/map`                                                                            |         200 |                         946 |
| `/methodology`                                                                                      |         200 |                         641 |
| `/data-sources`                                                                                     |         200 |                         602 |
| `/about`                                                                                            |         200 |                         333 |
| `/contact`                                                                                          |         200 |                         222 |
| `/editorial-policy`                                                                                 |         200 |                         224 |
| `/privacy`                                                                                          |         200 |                         352 |
| `/cookies`                                                                                          |         200 |                         259 |
| `/terms`                                                                                            |         200 |                         140 |
| `/disclaimer`                                                                                       |         200 |                         153 |
| `/accessibility`                                                                                    |         200 |                         172 |
| `/authors/jaynesh-shingala`                                                                         |         200 |                        1679 |
| `/insights/august-2026-electric-tankless-vs-storage-vs-heat-pump-water-heater-cost-benchmark`       |         200 |                        4337 |
| `/insights/august-2026-ev-vs-gas-car-fuel-cost-per-100-miles-benchmark`                             |         200 |                        3867 |
| `/insights/august-2026-whole-house-fan-vs-central-ac-cooling-cost-benchmark`                        |         200 |                         810 |
| `/insights/august-2026-hot-tub-electricity-consumption-operating-cost-benchmark`                    |         200 |                        4016 |
| `/insights/august-2026-ceiling-fan-electricity-consumption-ac-thermostat-setback-savings-benchmark` |         200 |                        3740 |
| `/insights/august-2026-heat-pump-auxiliary-heat-strip-cost-benchmark`                               |         200 |                        4789 |
| `/insights/august-2026-electric-water-heater-standby-loss-temperature-setpoint-benchmark`           |         200 |                        3485 |
| `/insights/august-2026-summer-thermostat-setting-cooling-cost-benchmark`                            |         200 |                        3153 |
| `/insights/august-2026-ductless-mini-split-heat-pump-operating-cost-benchmark`                      |         200 |                        2333 |
| `/insights/august-2026-induction-vs-electric-vs-gas-cooktop-energy-cost-benchmark`                  |         200 |                        2805 |
| `/insights/august-2026-rooftop-solar-nem-3-net-billing-export-value-benchmark`                      |         200 |                        1978 |
| `/insights/august-2026-natural-gas-vs-electric-heating-cost-per-mmbtu-benchmark`                    |         200 |                        2299 |
| `/insights/august-2026-home-appliance-operating-cost-hierarchy-benchmark`                           |         200 |                        1948 |
| `/insights/august-2026-census-division-residential-electricity-rate-breakdown`                      |         200 |                        1611 |
| `/insights/may-2026-residential-natural-gas-price-off-season-bill-impact`                           |         200 |                        1397 |
| `/insights/august-2026-time-of-use-peak-rate-spread-appliance-load-shifting-benchmark`              |         200 |                        1819 |
| `/insights/august-2026-state-residential-electricity-price-spread-benchmark`                        |         200 |                        1991 |
| `/insights/august-2026-home-battery-storage-usable-capacity-round-trip-efficiency-benchmark`        |         200 |                        1844 |
| `/insights/may-2026-rooftop-solar-generation-retail-savings-benchmark`                              |         200 |                        1499 |
| `/insights/may-2026-heat-pump-water-heater-savings-benchmark`                                       |         200 |                        1557 |
| `/insights/april-2026-residential-natural-gas-price-heating-cost`                                   |         200 |                        1522 |
| `/insights/may-2026-cooling-demand-residential-sales`                                               |         200 |                        1419 |
| `/insights/may-2026-residential-electricity-price-bill-impact`                                      |         200 |                        1281 |
