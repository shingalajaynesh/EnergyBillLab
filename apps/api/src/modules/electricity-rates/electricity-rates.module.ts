import { Module } from '@nestjs/common';

import { ElectricityRatesController } from './electricity-rates.controller';
import { ElectricityRatesService } from './electricity-rates.service';

@Module({
  controllers: [ElectricityRatesController],
  providers: [ElectricityRatesService],
  exports: [ElectricityRatesService],
})
export class ElectricityRatesModule {}
