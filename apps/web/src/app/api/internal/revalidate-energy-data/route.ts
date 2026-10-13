import { timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

function safeCompare(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function POST(request: NextRequest) {
  const secretHeader = request.headers.get('x-revalidation-secret');
  const secretQuery = request.nextUrl.searchParams.get('secret');
  const providedSecret = secretHeader || secretQuery;

  const configuredSecret = process.env.ENERGY_DATA_REVALIDATION_SECRET;

  if (!configuredSecret || !providedSecret || !safeCompare(providedSecret, configuredSecret)) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Invalid or missing x-revalidation-secret header.' },
      { status: 401 },
    );
  }

  try {
    const customPath = request.nextUrl.searchParams.get('path');

    const defaultPaths = [
      '/',
      '/natural-gas-rates',
      '/tools/natural-gas-bill-calculator',
      '/tools/gas-furnace-cost-calculator',
      '/electricity-rates',
      '/research/us-residential-electricity-rate-report',
      '/insights',
      '/insights/august-2026-induction-vs-electric-vs-gas-cooktop-energy-cost-benchmark',
      '/insights/august-2026-natural-gas-vs-electric-heating-cost-per-mmbtu-benchmark',
      '/insights/may-2026-residential-natural-gas-price-off-season-bill-impact',
      '/insights/april-2026-residential-natural-gas-price-heating-cost',
      '/sitemap.xml',
    ];

    const pathsToRevalidate = customPath
      ? Array.from(new Set([customPath, ...defaultPaths]))
      : defaultPaths;

    const defaultTags = ['natural-gas-rates', 'electricity-rates', 'insights'];

    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    for (const tag of defaultTags) {
      revalidateTag(tag);
    }

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate,
      tags: defaultTags,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: 'RevalidationError', message: msg }, { status: 500 });
  }
}
