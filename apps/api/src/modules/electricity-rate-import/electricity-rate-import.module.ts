import { Module } from '@nestjs/common';

import { EiaModule } from '../../infrastructure/eia/eia.module';
import { ElectricityRateImportService } from './electricity-rate-import.service';

@Module({
  imports: [EiaModule],
  providers: [ElectricityRateImportService],
  exports: [ElectricityRateImportService],
})
export class ElectricityRateImportModule {}
