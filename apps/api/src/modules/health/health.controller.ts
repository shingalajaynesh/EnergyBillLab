import { Controller, Get, Head } from '@nestjs/common';

import { HealthService } from './health.service.js';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/')
  @Head('/')
  root() {
    return this.healthService.live();
  }

  @Get('health/live')
  live() {
    return this.healthService.live();
  }

  @Get('health/ready')
  async ready() {
    return this.healthService.ready();
  }

  @Get('freshness')
  async freshness() {
    return this.healthService.freshness();
  }
}
