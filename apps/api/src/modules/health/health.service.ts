import {
  getDataFreshnessDetails,
  getElectricityRateDataStatus,
  getReadDatabaseClient,
  type DataFreshnessDetailsDTO,
} from '@energy-bill-lab/database';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';

export type HealthLivenessResponse = {
  status: 'ok';
  service: 'energy-bill-lab-api';
  timestamp: string;
  version: string;
};

export type HealthReadinessResponse = {
  status: 'ok' | 'degraded';
  service: 'energy-bill-lab-api';
  timestamp: string;
  version: string;
  database: {
    connected: boolean;
    latestPeriod: string | null;
    latestPeriodGeographyCount: number;
  };
};

export type HealthFreshnessResponse = {
  status: 'ok';
  service: 'energy-bill-lab-api';
  timestamp: string;
  freshness: DataFreshnessDetailsDTO;
};

@Injectable()
export class HealthService {
  live(): HealthLivenessResponse {
    return {
      status: 'ok',
      service: 'energy-bill-lab-api',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  async ready(): Promise<HealthReadinessResponse> {
    const db = getReadDatabaseClient();
    if (!db) {
      throw new ServiceUnavailableException({
        status: 'unavailable',
        service: 'energy-bill-lab-api',
        timestamp: new Date().toISOString(),
        database: { connected: false },
      });
    }

    try {
      const rateStatus = await getElectricityRateDataStatus(db);
      return {
        status: rateStatus.status === 'available' ? 'ok' : 'degraded',
        service: 'energy-bill-lab-api',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        database: {
          connected: true,
          latestPeriod: rateStatus.latestAvailablePeriod,
          latestPeriodGeographyCount: rateStatus.geographyCount,
        },
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'unavailable',
        service: 'energy-bill-lab-api',
        timestamp: new Date().toISOString(),
        database: { connected: false },
      });
    }
  }

  async freshness(): Promise<HealthFreshnessResponse> {
    const db = getReadDatabaseClient();
    if (!db) {
      throw new ServiceUnavailableException({
        status: 'unavailable',
        service: 'energy-bill-lab-api',
        timestamp: new Date().toISOString(),
        freshness: null,
      });
    }

    const freshnessData = await getDataFreshnessDetails(db);
    return {
      status: 'ok',
      service: 'energy-bill-lab-api',
      timestamp: new Date().toISOString(),
      freshness: freshnessData,
    };
  }
}
