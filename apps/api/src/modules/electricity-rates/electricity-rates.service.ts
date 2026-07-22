import { Injectable } from '@nestjs/common';
import {
  getElectricityRateDataStatus,
  getLatestResidentialRateByStateCode,
  getLatestResidentialRatesForAllStates,
  getNationalResidentialRate,
  getReadDatabaseClient,
  getResidentialRateHistory,
  RateDataStatusDTO,
  StateRateDTO,
} from '@energy-bill-lab/database';

@Injectable()
export class ElectricityRatesService {
  private getDb() {
    return getReadDatabaseClient();
  }

  async getAllLatestStateRates(): Promise<Record<string, StateRateDTO>> {
    const db = this.getDb();
    if (!db) return {};
    return getLatestResidentialRatesForAllStates(db);
  }

  async getLatestStateRate(stateCode: string): Promise<StateRateDTO | null> {
    const db = this.getDb();
    if (!db) return null;
    return getLatestResidentialRateByStateCode(db, stateCode);
  }

  async getStateRateHistory(stateCode: string, months = 24): Promise<StateRateDTO[]> {
    const db = this.getDb();
    if (!db) return [];
    return getResidentialRateHistory(db, stateCode, months);
  }

  async getNationalRate(): Promise<StateRateDTO | null> {
    const db = this.getDb();
    if (!db) return null;
    return getNationalResidentialRate(db);
  }

  async getDataStatus(): Promise<RateDataStatusDTO> {
    const db = this.getDb();
    if (!db) {
      return {
        source: 'EIA',
        dataset: 'electricity/retail-sales',
        latestAvailablePeriod: null,
        lastSuccessfulImportAt: null,
        geographyCount: 0,
        status: 'unavailable',
      };
    }
    return getElectricityRateDataStatus(db);
  }
}
