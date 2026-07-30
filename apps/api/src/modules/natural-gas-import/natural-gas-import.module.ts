import { Module } from '@nestjs/common';

import { EiaModule } from '../../infrastructure/eia/eia.module';
import { NaturalGasImportController } from './natural-gas-import.controller';
import { NaturalGasImportService } from './natural-gas-import.service';

@Module({
  imports: [EiaModule],
  controllers: [NaturalGasImportController],
  providers: [NaturalGasImportService],
  exports: [NaturalGasImportService],
})
export class NaturalGasImportModule {}
