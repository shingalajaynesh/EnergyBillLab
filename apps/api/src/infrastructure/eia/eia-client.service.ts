import { Injectable, Logger } from '@nestjs/common';

import type { EiaRow } from './eia-client.schema';
import { EiaResponseSchema } from './eia-client.schema';

export type FetchEiaParams = {
  startPeriod?: string; // YYYY-MM
  endPeriod?: string; // YYYY-MM
  offset?: number;
  length?: number;
};

export type FetchEiaResult = {
  total: number;
  rows: EiaRow[];
  offset: number;
  length: number;
};

@Injectable()
export class EiaClientService {
  private readonly logger = new Logger(EiaClientService.name);

  async fetchRetailSalesData(params: FetchEiaParams = {}): Promise<FetchEiaResult> {
    const apiKey = process.env.EIA_API_KEY;
    if (!apiKey) {
      throw new Error('EIA_API_KEY is not configured in environment variables.');
    }

    const baseUrl = process.env.EIA_API_BASE_URL || 'https://api.eia.gov/v2/';
    const endpointUrl = new URL('electricity/retail-sales/data', baseUrl);

    const offset = params.offset ?? 0;
    const length = params.length ?? 5000;

    endpointUrl.searchParams.set('api_key', apiKey);
    endpointUrl.searchParams.set('frequency', 'monthly');
    endpointUrl.searchParams.append('facets[sectorid][]', 'RES');
    endpointUrl.searchParams.append('data[]', 'price');
    endpointUrl.searchParams.append('data[]', 'revenue');
    endpointUrl.searchParams.append('data[]', 'sales');
    endpointUrl.searchParams.append('data[]', 'customers');
    endpointUrl.searchParams.set('sort[0][column]', 'period');
    endpointUrl.searchParams.set('sort[0][direction]', 'asc');
    endpointUrl.searchParams.set('offset', offset.toString());
    endpointUrl.searchParams.set('length', length.toString());

    if (params.startPeriod) {
      endpointUrl.searchParams.set('start', params.startPeriod);
    }
    if (params.endPeriod) {
      endpointUrl.searchParams.set('end', params.endPeriod);
    }

    const timeoutMs = parseInt(process.env.EIA_REQUEST_TIMEOUT_MS || '15000', 10);
    const maxRetries = 3;
    let attempt = 0;

    while (attempt <= maxRetries) {
      attempt++;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      try {
        this.logger.log(
          `Fetching EIA retail-sales page (attempt=${attempt}, offset=${offset}, length=${length})`,
        );

        const res = await fetch(endpointUrl.toString(), { signal: controller.signal });
        clearTimeout(timer);

        if (!res.ok) {
          const status = res.status;
          this.logger.warn(`EIA API returned HTTP ${status} (attempt=${attempt})`);

          if ([429, 500, 502, 503, 504].includes(status) && attempt <= maxRetries) {
            const backoffMs = Math.pow(2, attempt) * 1000 + Math.random() * 500;
            await new Promise((r) => setTimeout(r, backoffMs));
            continue;
          }

          throw new Error(`EIA API failed with status ${status}`);
        }

        const json = await res.json();
        const parsed = EiaResponseSchema.safeParse(json);

        if (!parsed.success) {
          this.logger.error(`EIA response schema mismatch: ${parsed.error.message}`);
          throw new Error('EIA_CONTRACT_MISMATCH: Response schema validation failed.');
        }

        return {
          total: parsed.data.response.total,
          rows: parsed.data.response.data,
          offset,
          length,
        };
      } catch (err: unknown) {
        clearTimeout(timer);
        const errName = err instanceof Error ? err.name : '';
        if (attempt <= maxRetries && errName !== 'Error') {
          const backoffMs = Math.pow(2, attempt) * 1000 + Math.random() * 500;
          await new Promise((r) => setTimeout(r, backoffMs));
          continue;
        }
        throw err;
      }
    }

    throw new Error('EIA API request failed after maximum retries');
  }

  async verifyMetadataContract(): Promise<boolean> {
    try {
      const result = await this.fetchRetailSalesData({ length: 5 });
      return result.rows.length > 0 && result.total > 0;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`Metadata verification failed: ${msg}`);
      return false;
    }
  }
}
