import { getMaxValidPublicationDate, validateInsightsRegistry } from '@/lib/insights-validation';

import type { InsightCategory, InsightRecord } from './types';
import { INSIGHTS_PUBLICATION_THRESHOLD } from './types';
import { april2026ResidentialNaturalGasPriceHeatingCost } from './articles/april-2026-residential-natural-gas-price-heating-cost';
import { august2026CensusDivisionResidentialElectricityRateBreakdown } from './articles/august-2026-census-division-residential-electricity-rate-breakdown';
import { august2026CentralAirConditionerSeer2CoolingCostBenchmark } from './articles/august-2026-central-air-conditioner-seer2-cooling-cost-benchmark';
import { august2026ElectricClothesDryerKwhOperatingCostBenchmark } from './articles/august-2026-electric-clothes-dryer-kwh-operating-cost-benchmark';
import { august2026ElectricClothesWasherKwhOperatingCostBenchmark } from './articles/august-2026-electric-clothes-washer-kwh-operating-cost-benchmark';
import { august2026ElectricDehumidifierKwhOperatingCostBenchmark } from './articles/august-2026-electric-dehumidifier-kwh-operating-cost-benchmark';
import { august2026ElectricDishwasherKwhOperatingCostBenchmark } from './articles/august-2026-electric-dishwasher-kwh-operating-cost-benchmark';
import { august2026RefrigeratorKwhAnnualOperatingCostBenchmark } from './articles/august-2026-refrigerator-kwh-annual-operating-cost-benchmark';
import { august2026HomeApplianceOperatingCostHierarchyBenchmark } from './articles/august-2026-home-appliance-operating-cost-hierarchy-benchmark';
import { august2026HomeBatteryStorageUsableCapacityRoundTripEfficiencyBenchmark } from './articles/august-2026-home-battery-storage-usable-capacity-round-trip-efficiency-benchmark';
import { august2026NaturalGasVsElectricHeatingCostPerMmtuBenchmark } from './articles/august-2026-natural-gas-vs-electric-heating-cost-per-mmbtu-benchmark';
import { august2026PortableElectricSpaceHeaterOperatingCostBenchmark } from './articles/august-2026-portable-electric-space-heater-operating-cost-benchmark';
import { august2026StateResidentialElectricityPriceSpreadBenchmark } from './articles/august-2026-state-residential-electricity-price-spread-benchmark';
import { august2026TimeOfUsePeakRateSpreadApplianceLoadShiftingBenchmark } from './articles/august-2026-time-of-use-peak-rate-spread-appliance-load-shifting-benchmark';
import { july2026SummerWholesaleElectricityPriceForecast } from './articles/july-2026-summer-wholesale-electricity-price-forecast';
import { may2026HeatPumpWaterHeaterSavingsBenchmark } from './articles/may-2026-heat-pump-water-heater-savings-benchmark';
import { may2026CoolingDemandResidentialSales } from './articles/may-2026-cooling-demand-residential-sales';
import { may2026EvHomeChargingCostBenchmark } from './articles/may-2026-ev-home-charging-cost-benchmark';
import { may2026ResidentialElectricityPriceBillImpact } from './articles/may-2026-residential-electricity-price-bill-impact';
import { may2026ResidentialNaturalGasPriceOffSeasonBillImpact } from './articles/may-2026-residential-natural-gas-price-off-season-bill-impact';
import { may2026RooftopSolarGenerationRetailSavingsBenchmark } from './articles/may-2026-rooftop-solar-generation-retail-savings-benchmark';
import { august2026RooftopSolarNem3NetBillingExportValueBenchmark } from './articles/august-2026-rooftop-solar-nem-3-net-billing-export-value-benchmark';
import { august2026SwimmingPoolPumpKwhOperatingCostBenchmark } from './articles/august-2026-swimming-pool-pump-kwh-operating-cost-benchmark';
import { august2026InductionVsElectricVsGasCooktopEnergyCostBenchmark } from './articles/august-2026-induction-vs-electric-vs-gas-cooktop-energy-cost-benchmark';

/**
 * Array of individual article modules imported from ./articles/
 * Draft records are intentionally registered before the first-three launch.
 */
const rawArticles: InsightRecord[] = [
  may2026EvHomeChargingCostBenchmark,
  may2026ResidentialElectricityPriceBillImpact,
  may2026CoolingDemandResidentialSales,
  april2026ResidentialNaturalGasPriceHeatingCost,
  may2026HeatPumpWaterHeaterSavingsBenchmark,
  july2026SummerWholesaleElectricityPriceForecast,
  may2026RooftopSolarGenerationRetailSavingsBenchmark,
  august2026HomeBatteryStorageUsableCapacityRoundTripEfficiencyBenchmark,
  august2026StateResidentialElectricityPriceSpreadBenchmark,
  august2026TimeOfUsePeakRateSpreadApplianceLoadShiftingBenchmark,
  may2026ResidentialNaturalGasPriceOffSeasonBillImpact,
  august2026CentralAirConditionerSeer2CoolingCostBenchmark,
  august2026CensusDivisionResidentialElectricityRateBreakdown,
  august2026HomeApplianceOperatingCostHierarchyBenchmark,
  august2026NaturalGasVsElectricHeatingCostPerMmtuBenchmark,
  august2026PortableElectricSpaceHeaterOperatingCostBenchmark,
  august2026ElectricClothesDryerKwhOperatingCostBenchmark,
  august2026RefrigeratorKwhAnnualOperatingCostBenchmark,
  august2026ElectricDishwasherKwhOperatingCostBenchmark,
  august2026ElectricClothesWasherKwhOperatingCostBenchmark,
  august2026ElectricDehumidifierKwhOperatingCostBenchmark,
  august2026SwimmingPoolPumpKwhOperatingCostBenchmark,
  august2026RooftopSolarNem3NetBillingExportValueBenchmark,
  august2026InductionVsElectricVsGasCooktopEnergyCostBenchmark,
];

// Automatic Registry Validation at initialization time
const validation = validateInsightsRegistry(rawArticles);
if (!validation.valid) {
  throw new Error(`Energy Insights Registry Validation Failed:\n${validation.errors.join('\n')}`);
}

export const insightsRegistry: InsightRecord[] = rawArticles;

export function getPublishedInsights(now?: string): InsightRecord[] {
  const maxValidDate = getMaxValidPublicationDate(now);
  return insightsRegistry
    .filter((item) => {
      if (item.status !== 'published') return false;
      if (item.noindex) return false;
      if (item.publishedAt.slice(0, 10) > maxValidDate) return false;
      return true;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getInsightBySlug(slug: string): InsightRecord | undefined {
  return insightsRegistry.find((item) => item.slug === slug);
}

export function getInsightsByCategory(
  category: InsightCategory,
  now = new Date().toISOString(),
): InsightRecord[] {
  return getPublishedInsights(now).filter((item) => item.category === category);
}

export function isInsightsHubEligible(now = new Date().toISOString()): boolean {
  return getPublishedInsights(now).length >= INSIGHTS_PUBLICATION_THRESHOLD;
}
