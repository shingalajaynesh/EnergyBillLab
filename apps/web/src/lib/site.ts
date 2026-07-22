function validateSiteUrl(value: string | undefined) {
  try {
    return new URL(value ?? 'https://energybilllab.com').origin;
  } catch {
    return 'https://energybilllab.com';
  }
}

export const SITE_URL = validateSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const SITE_NAME = 'Energy Bill Lab';
export const SITE_DESCRIPTION =
  'Energy Bill Lab helps U.S. residents understand home energy costs with transparent estimates, plain-English methodology, and source-led data notes.';
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export function getSiteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}
