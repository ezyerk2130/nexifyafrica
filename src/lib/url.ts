/**
 * Validates a CMS-controlled href to prevent stored XSS via `javascript:` / `data:` URLs.
 * Allows http(s), mailto, tel, relative paths, and in-page anchors.
 */
export function isSafeHref(href: string | undefined | null): boolean {
  if (!href) return false;

  const value = href.trim();
  if (value === "") return false;

  // Relative paths and in-page anchors are safe.
  if (value.startsWith("/") || value.startsWith("#") || value.startsWith("?")) {
    return true;
  }

  // Protocol-relative URLs (//host/path) resolve to https in practice.
  if (value.startsWith("//")) return true;

  const allowedSchemes = ["http:", "https:", "mailto:", "tel:"];

  try {
    // Use a base so relative values don't throw; absolute values keep their scheme.
    const parsed = new URL(value, "https://example.com");
    return allowedSchemes.includes(parsed.protocol);
  } catch {
    return false;
  }
}

/** Returns the href if safe, otherwise a fallback (defaults to "#"). */
export function safeHref(href: string | undefined | null, fallback = "#"): string {
  return isSafeHref(href) ? (href as string).trim() : fallback;
}
