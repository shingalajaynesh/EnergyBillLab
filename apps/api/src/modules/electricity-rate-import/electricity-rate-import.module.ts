import { Module } from '@nestjs/common';

import { EiaModule } from '../../infrastructure/eia/eia.module';
import { ElectricityRateImportController } from './electricity-rate-import.controller';
import { ElectricityRateImportService } from './electricity-rate-import.service';

@Module({
  imports: [EiaModule],
  controllers: [ElectricityRateImportController],
  providers: [ElectricityRateImportService],
  exports: [ElectricityRateImportService],
})
export class ElectricityRateImportModule {}
