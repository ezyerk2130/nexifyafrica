import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  // Disable the CDN so that when a page revalidates (ISR or webhook) it reads
  // fresh published content instead of a CDN copy that can be up to ~60s stale.
  // Next.js still caches each query for REVALIDATE_SECONDS, so the live API is
  // only hit at revalidation time.
  useCdn: false,
  perspective: "published",
});
