import { Controller, Get } from '@nestjs/common';

import { HealthService } from './health.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('live')
  live() {
    return this.healthService.live();
  }

  @Get('ready')
  async ready() {
    return this.healthService.ready();
  }

  @Get('freshness')
  async freshness() {
    return this.healthService.freshness();
  }
}
