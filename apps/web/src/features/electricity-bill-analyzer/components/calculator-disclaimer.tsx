import Link from 'next/link';
import React from 'react';

import { DataSourceNote } from '@/components/data-source-note';

export function CalculatorDisclaimer() {
  return (
    <DataSourceNote>
      Energy Bill Lab estimates are based strictly on the figures you enter. Actual utility bills
      may differ because of fixed customer charges, local taxes, fuel cost riders, seasonal pricing
      tiers, time-of-use rates, or billing-cycle variances.{' '}
      <Link href="/methodology">Read calculation methodology &rarr;</Link>
    </DataSourceNote>
  );
}
