import { Injectable } from '@nestjs/common';

type HealthResponse = {
  service: 'energy-bill-lab-api';
  status: 'ok';
  timestamp: string;
};

@Injectable()
export class HealthService {
  live(): HealthResponse {
    return this.response();
  }

  ready(): HealthResponse {
    return this.response();
  }

  private response(): HealthResponse {
    return {
      service: 'energy-bill-lab-api',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
