import { PUBLISHED_STATE_CONFIGS } from '@/config/published-states';
import type { InsightRecord, InsightStatus } from '@/content/insights';
import { INSIGHT_CATEGORIES } from '@/content/insights';

export type ValidationResult = {
  errors: string[];
  valid: boolean;
  warnings: string[];
};

const PROHIBITED_TITLE_PREFIXES = [
  'how much',
  'best',
  'top 10',
  'complete guide',
  'ultimate guide',
  'everything you need to know',
];

const PROHIBITED_CLAIMS = [
  'guaranteed',
  'guaranteed savings',
  '100% accurate',
  'perfectly accurate',
  'certified',
  'expert-approved',
  'expert-reviewed',
  'government-approved',
  'risk-free',
  'real-time',
  'live rate',
  'save thousands',
  'cut your bill in half',
  'everyone should switch',
  'solar always pays for itself',
];

const PROHIBITED_AUTHOR_IDENTITY_KEYWORDS = [
  'founder',
  'technical publisher',
  'full-stack software engineer',
  'software engineer',
  'mern stack developer',
  'energy expert',
  'certified energy analyst',
  'surat',
  'gujarat',
  'india',
  'reviewedby',
];

const GENERIC_SLUGS = [
  'blog-1',
  'latest-news',
  'complete-energy-guide',
  'electricity-rates',
  'why-is-my-electric-bill-high',
  'energy-update',
  'article-1',
  'test-article',
  'sample-insight',
];

const EXISTING_OWNED_INTENTS = new Map<string, string>([
  // Guides
  ['why-is-my-electric-bill-so-high', 'guide:why-is-my-electric-bill-so-high'],
  ['why-is-my-power-bill-high', 'guide:why-is-my-electric-bill-so-high'],
  ['reasons-for-a-high-electric-bill', 'guide:why-is-my-electric-bill-so-high'],
  ['why-did-my-energy-bill-increase', 'guide:why-is-my-electric-bill-so-high'],
  ['causes-of-a-higher-electricity-bill', 'guide:why-is-my-electric-bill-so-high'],
  // Calculators
  ['electricity-bill-analyzer', 'calculator:electricity-bill-analyzer'],
  ['appliance-energy-cost-calculator', 'calculator:appliance-energy-cost-calculator'],
  ['ac-cost-calculator', 'calculator:ac-cost-calculator'],
  ['space-heater-cost-calculator', 'calculator:space-heater-cost-calculator'],
  ['ev-home-charging-cost-calculator', 'calculator:ev-home-charging-cost-calculator'],
  // Research
  ['us-residential-electricity-rate-report', 'research:us-residential-electricity-rate-report'],
]);

// Add state intent ownership
for (const state of PUBLISHED_STATE_CONFIGS) {
  const stateSlug = state.slug;
  const stateNameLower = state.name.toLowerCase();
  EXISTING_OWNED_INTENTS.set(`${stateSlug}-electricity-rates`, `state:${stateSlug}`);
  EXISTING_OWNED_INTENTS.set(`${stateNameLower}-electricity-rates`, `state:${stateSlug}`);
  EXISTING_OWNED_INTENTS.set(`${stateNameLower}-cost-per-kwh`, `state:${stateSlug}`);
}

export function normalizeFingerprint(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function validateInsightRecord(
  record: InsightRecord,
  allRecords: InsightRecord[] = [],
  validRoutes?: string[],
  nowIso: string = new Date().toISOString(),
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Basic ID and Slug
  if (!record.id || typeof record.id !== 'string' || record.id.trim() === '') {
    errors.push('Insight record missing valid ID.');
  }

  if (!record.slug || typeof record.slug !== 'string') {
    errors.push('Insight record missing valid slug.');
  } else {
    const slug = record.slug.trim();
    if (slug !== slug.toLowerCase()) {
      errors.push(`Slug "${slug}" must be lowercase.`);
    }
    if (/[^a-z0-9-]/.test(slug)) {
      errors.push(
        `Slug "${slug}" contains invalid characters (only lowercase ASCII letters, numbers, and hyphens allowed).`,
      );
    }
    if (slug.includes('_')) {
      errors.push(`Slug "${slug}" must not contain underscores.`);
    }
    if (GENERIC_SLUGS.includes(slug)) {
      errors.push(`Slug "${slug}" is a generic or placeholder slug, which is prohibited.`);
    }
  }

  // 2. Status
  const validStatuses: InsightStatus[] = ['draft', 'scheduled', 'published', 'archived'];
  if (!validStatuses.includes(record.status)) {
    errors.push(`Invalid status "${record.status}". Must be one of: ${validStatuses.join(', ')}.`);
  }

  // Future scheduled check
  if (record.status === 'published' && record.publishedAt > nowIso) {
    errors.push(
      `Article "${record.slug}" status is "published" but has future publication date (${record.publishedAt}). Must use status "scheduled".`,
    );
  }

  // 3. Category
  if (!record.category || !INSIGHT_CATEGORIES[record.category]) {
    errors.push(`Invalid or missing category "${String(record.category)}".`);
  }

  // 4. Primary Intent & Intent Fingerprint
  if (!record.primaryIntent || record.primaryIntent.trim() === '') {
    errors.push('Missing primary intent.');
  }

  if (!record.intentFingerprint || record.intentFingerprint.trim() === '') {
    errors.push('Missing intent fingerprint.');
  } else {
    const normalizedFp = normalizeFingerprint(record.intentFingerprint);
    if (normalizedFp !== record.intentFingerprint) {
      errors.push(
        `Intent fingerprint "${record.intentFingerprint}" should be normalized as "${normalizedFp}".`,
      );
    }

    // Conflict check against existing owned intents (Guides, States, Calculators)
    const existingOwner = EXISTING_OWNED_INTENTS.get(normalizedFp);
    if (existingOwner) {
      errors.push(
        `Intent fingerprint "${record.intentFingerprint}" conflicts with existing owned resource: ${existingOwner}.`,
      );
    }
  }

  // 5. Canonical Topic
  if (!record.canonicalTopic || record.canonicalTopic.trim() === '') {
    errors.push('Missing canonical topic.');
  }

  // 6. Authorship & Privacy
  if (record.authorName !== 'Jaynesh Shingala') {
    errors.push(
      `Author name must strictly be "Jaynesh Shingala". Received "${String(record.authorName)}".`,
    );
  }

  const recordJson = JSON.stringify(record).toLowerCase();
  for (const keyword of PROHIBITED_AUTHOR_IDENTITY_KEYWORDS) {
    if (recordJson.includes(keyword)) {
      errors.push(
        `Record contains prohibited personal identity or credential keyword: "${keyword}".`,
      );
    }
  }

  // 7. Sources
  if (!record.sources || !Array.isArray(record.sources) || record.sources.length === 0) {
    if (record.status === 'published') {
      errors.push('Published Insight must have at least one authoritative source.');
    }
  } else {
    for (const src of record.sources) {
      if (!src.url || !src.organization || !src.title) {
        errors.push('Source entry missing required fields (url, organization, or title).');
      }
      if (src.url.includes('utm_')) {
        errors.push(`Source URL "${src.url}" contains tracking parameters.`);
      }
    }
  }

  // 8. Related Routes Verification
  if (!record.relatedRoutes || !Array.isArray(record.relatedRoutes)) {
    errors.push('Missing related routes array.');
  } else if (validRoutes && validRoutes.length > 0) {
    for (const route of record.relatedRoutes) {
      if (!validRoutes.includes(route)) {
        errors.push(`Related route "${route}" does not exist in public route registry.`);
      }
    }
  }

  // 9. Claims and Title rules
  const titleLower = (record.title || '').toLowerCase();
  for (const prefix of PROHIBITED_TITLE_PREFIXES) {
    if (titleLower.startsWith(prefix)) {
      errors.push(`Title starts with prohibited repetitive prefix: "${prefix}".`);
    }
  }

  for (const claim of PROHIBITED_CLAIMS) {
    if (titleLower.includes(claim) || (record.summary || '').toLowerCase().includes(claim)) {
      errors.push(`Content contains prohibited claim phrase: "${claim}".`);
    }
  }

  if (record.title && (record.title.length < 30 || record.title.length > 80)) {
    warnings.push(
      `Title length (${record.title.length} chars) is outside recommended range (45-70 chars).`,
    );
  }

  if (!record.summary || record.summary.trim() === '') {
    errors.push('Missing direct summary.');
  }

  // 10. Canonical Host verification
  const canonicalUrl = `https://energybilllab.com/insights/${record.slug}`;
  if (!canonicalUrl.startsWith('https://energybilllab.com/')) {
    errors.push(`Canonical URL "${canonicalUrl}" must use apex host https://energybilllab.com.`);
  }

  // 11. Cross-record duplicates (if allRecords provided)
  if (allRecords.length > 0) {
    const duplicates = allRecords.filter((other) => other !== record);

    if (duplicates.some((other) => other.slug === record.slug)) {
      errors.push(`Duplicate slug "${record.slug}" found in registry.`);
    }
    if (duplicates.some((other) => other.id === record.id)) {
      errors.push(`Duplicate article ID "${record.id}" found in registry.`);
    }
    if (duplicates.some((other) => other.canonicalTopic === record.canonicalTopic)) {
      errors.push(`Duplicate canonical topic "${record.canonicalTopic}" found in registry.`);
    }
    if (
      duplicates.some(
        (other) =>
          normalizeFingerprint(other.intentFingerprint) ===
          normalizeFingerprint(record.intentFingerprint),
      )
    ) {
      errors.push(`Duplicate intent fingerprint "${record.intentFingerprint}" found in registry.`);
    }
    if (
      duplicates.some(
        (other) => normalizeFingerprint(other.title) === normalizeFingerprint(record.title),
      )
    ) {
      errors.push(`Duplicate title "${record.title}" found in registry.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateInsightsRegistry(
  registry: InsightRecord[],
  validRoutes?: string[],
): ValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  for (const record of registry) {
    const res = validateInsightRecord(record, registry, validRoutes);
    allErrors.push(...res.errors);
    allWarnings.push(...res.warnings);
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
}
