import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { HttpExceptionFilter } from '../common/filters/http-exception.filter.js';
import { ElectricityRateImportModule } from './electricity-rate-import/electricity-rate-import.module';
import { ElectricityRatesModule } from './electricity-rates/electricity-rates.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule, ElectricityRatesModule, ElectricityRateImportModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
