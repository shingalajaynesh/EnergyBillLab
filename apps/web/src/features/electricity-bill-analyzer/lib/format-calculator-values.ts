const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const rateFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 3,
  maximumFractionDigits: 4,
});

const kwhFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatCurrency(amount: number, signed = false): string {
  const formatted = usdFormatter.format(Math.abs(amount));
  if (signed && amount > 0) return `+${formatted}`;
  if (amount < 0) return `-${formatted}`;
  return formatted;
}

export function formatRate(rate: number, signed = false): string {
  const formatted = rateFormatter.format(Math.abs(rate));
  if (signed && rate > 0) return `+${formatted}`;
  if (rate < 0) return `-${formatted}`;
  return formatted;
}

export function formatKwh(kwh: number, signed = false): string {
  const formatted = kwhFormatter.format(Math.abs(kwh));
  if (signed && kwh > 0) return `+${formatted} kWh`;
  if (kwh < 0) return `-${formatted} kWh`;
  return `${formatted} kWh`;
}

export function formatPercent(percent: number, signed = false): string {
  const formatted = percentFormatter.format(Math.abs(percent));
  if (signed && percent > 0) return `+${formatted}%`;
  if (percent < 0) return `-${formatted}%`;
  return `${formatted}%`;
}
