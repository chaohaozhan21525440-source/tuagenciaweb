export type Consent = { necessary: true; analytics: boolean; ts: number };

const COOKIE = "tw_consent";
const TTL_DAYS = 365;

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`${COOKIE}=([^;]+)`));
  if (!m) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(m[1])) as Consent;
    if (parsed && parsed.necessary === true && typeof parsed.analytics === "boolean") return parsed;
    return null;
  } catch {
    return null;
  }
}

export function writeConsent(c: Consent) {
  const value = encodeURIComponent(JSON.stringify(c));
  const maxAge = TTL_DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE}=${value}; path=/; max-age=${maxAge}; samesite=lax`;
}
