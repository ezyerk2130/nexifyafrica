import type { MetadataRoute } from "next";
import { SITE_ROUTES } from "@/config/navigation";
import { getAllCaseStudySlugsFromSanity } from "@/sanity/lib/queries";
import { getAllCaseStudySlugs } from "@/data/caseStudies";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexifyafrica.com";
  const lastModified = new Date();

  const staticEntries = SITE_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));

  const sanitySlugs = await getAllCaseStudySlugsFromSanity().catch(() => []);
  const slugs = Array.from(new Set([...sanitySlugs, ...getAllCaseStudySlugs()]));

  const caseStudyEntries = slugs.map((slug) => ({
    url: `${baseUrl}/case-studies/${slug}`,
    lastModified,
  }));

  return [...staticEntries, ...caseStudyEntries];
}
