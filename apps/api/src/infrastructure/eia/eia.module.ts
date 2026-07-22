import { Module } from '@nestjs/common';

import { EiaClientService } from './eia-client.service';

@Module({
  providers: [EiaClientService],
  exports: [EiaClientService],
})
export class EiaModule {}
