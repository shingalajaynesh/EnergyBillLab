import { Controller, Get, Header, NotFoundException, Param, Query } from '@nestjs/common';

import { ElectricityRatesService } from './electricity-rates.service';

@Controller('v1/electricity-rates')
export class ElectricityRatesController {
  constructor(private readonly service: ElectricityRatesService) {}

  @Get('states')
  @Header('Cache-Control', 'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800')
  async getAllStateRates() {
    return this.service.getAllLatestStateRates();
  }

  @Get('states/:stateCode/latest')
  @Header('Cache-Control', 'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800')
  async getLatestStateRate(@Param('stateCode') stateCode: string) {
    const rate = await this.service.getLatestStateRate(stateCode);
    if (!rate) {
      throw new NotFoundException(`No electricity rate data found for state code '${stateCode}'.`);
    }
    return rate;
  }

  @Get('states/:stateCode/history')
  @Header('Cache-Control', 'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800')
  async getStateRateHistory(
    @Param('stateCode') stateCode: string,
    @Query('months') months?: string,
  ) {
    const parsedMonths = months ? parseInt(months, 10) : 24;
    return this.service.getStateRateHistory(stateCode, parsedMonths);
  }

  @Get('national/latest')
  @Header('Cache-Control', 'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800')
  async getNationalRate() {
    const rate = await this.service.getNationalRate();
    if (!rate) {
      throw new NotFoundException('National average electricity rate data is unavailable.');
    }
    return rate;
  }

  @Get('status')
  @Header('Cache-Control', 'public, max-age=60, s-maxage=300')
  async getDataStatus() {
    return this.service.getDataStatus();
  }
}
