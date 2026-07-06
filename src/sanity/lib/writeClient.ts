import { createClient } from "next-sanity";

export function getSanityWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    throw new Error("SANITY_API_WRITE_TOKEN is not configured");
  }

  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
    token,
    useCdn: false,
  });
}