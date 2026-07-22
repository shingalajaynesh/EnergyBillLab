import { Module } from '@nestjs/common';

import { ElectricityRateImportModule } from './electricity-rate-import/electricity-rate-import.module';
import { ElectricityRatesModule } from './electricity-rates/electricity-rates.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule, ElectricityRatesModule, ElectricityRateImportModule],
})
export class AppModule {}
