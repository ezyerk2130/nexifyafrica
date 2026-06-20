export function decodePathSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export function normalizePathSegment(value: string): string {
  return decodePathSegment(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function caseStudyPathSegment(slug: string): string {
  const normalized = normalizePathSegment(slug);
  return normalized || encodeURIComponent(decodePathSegment(slug).trim());
}
