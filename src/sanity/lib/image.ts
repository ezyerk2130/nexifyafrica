import {
  createImageUrlBuilder,
  type ImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/**
 * Returns a Sanity image URL builder for chaining (.width().url()).
 * Returns null when the source is missing so callers can guard safely.
 */
export function urlFor(source: SanityImageSource | null | undefined): ImageUrlBuilder | null {
  if (!source) return null;
  try {
    return builder.image(source);
  } catch {
    return null;
  }
}

/**
 * Convenience helper that resolves a fully-built image URL string, or null
 * when the source is missing/invalid. Accepts optional width sizing.
 */
export function imageUrl(
  source: SanityImageSource | null | undefined,
  width?: number,
): string | null {
  const b = urlFor(source);
  if (!b) return null;
  try {
    return (width ? b.width(width) : b).url();
  } catch {
    return null;
  }
}
