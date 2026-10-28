import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import nextConfig from '../next.config';
import { energyGuides } from '../src/content/guides';
import { publicRoutes } from '../src/lib/routes';

describe('Redirect Integrity & Internal Link Scan Gate', () => {
  it('verifies all redirects use permanent: true (HTTP 308), have chain length 1, and destinations exist', async () => {
    const redirects = await (
      nextConfig as {
        redirects?: () => Promise<
          Array<{ source: string; destination: string; permanent: boolean }>
        >;
      }
    ).redirects!();

    expect(redirects.length).toBeGreaterThanOrEqual(16);

    const redirectSources = new Set<string>(redirects.map((r) => r.source));
    const publicHrefs = new Set<string>(publicRoutes.map((r) => r.href));
    const guideHrefs = new Set<string>(Object.values(energyGuides).map((g) => g.href));

    for (const r of redirects) {
      // 1. Must be permanent (Next.js emits HTTP 308 Permanent Redirect for permanent: true)
      expect(r.permanent, `Redirect ${r.source} must be configured permanent: true`).toBe(true);

      // 2. Chain length must be 1: Destination must NOT be another redirect source
      expect(
        redirectSources.has(r.destination),
        `Destination ${r.destination} cannot be a redirect source (chain length must be 1)`,
      ).toBe(false);

      // 3. Destination must exist in public routes or registered guides (resolves to HTTP 200)
      const destinationExists =
        publicHrefs.has(r.destination) || guideHrefs.has(r.destination);
      expect(
        destinationExists,
        `Destination ${r.destination} must resolve to a valid registered route`,
      ).toBe(true);
    }
  });

  it('verifies that zero internal links across src/ point to any redirect source URLs', async () => {
    const redirects = await (
      nextConfig as {
        redirects?: () => Promise<
          Array<{ source: string; destination: string; permanent: boolean }>
        >;
      }
    ).redirects!();

    const redirectSources = redirects.map((r) => r.source);

    const srcDir = path.resolve(__dirname, '../src');

    function scanFiles(dir: string): string[] {
      let results: string[] = [];
      const list = fs.readdirSync(dir);
      for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          results = results.concat(scanFiles(fullPath));
        } else if (/\.(tsx|ts|md|json)$/.test(file)) {
          results.push(fullPath);
        }
      }
      return results;
    }

    const allSrcFiles = scanFiles(srcDir);
    const violations: Array<{ file: string; staleLink: string }> = [];

    for (const file of allSrcFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      for (const source of redirectSources) {
        // Look for literal href="..." or link patterns pointing to redirect source
        const exactHrefDouble = `href="${source}"`;
        const exactHrefSingle = `href='${source}'`;
        const exactHrefBacktick = `href=\`${source}\``;
        const markdownLink = `(${source})`;

        if (
          content.includes(exactHrefDouble) ||
          content.includes(exactHrefSingle) ||
          content.includes(exactHrefBacktick) ||
          content.includes(markdownLink)
        ) {
          violations.push({ file: path.relative(srcDir, file), staleLink: source });
        }
      }
    }

    expect(
      violations,
      `Found ${violations.length} stale internal links pointing to redirect sources`,
    ).toHaveLength(0);
  });

  it('verifies 404 not-found template exists and is properly registered', () => {
    const notFoundPath = path.resolve(__dirname, '../src/app/not-found.tsx');
    expect(fs.existsSync(notFoundPath)).toBe(true);
    const content = fs.readFileSync(notFoundPath, 'utf-8');
    expect(content).toContain('404');
  });
});
