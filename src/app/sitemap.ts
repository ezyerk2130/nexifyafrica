import type { MetadataRoute } from "next";
import { SITE_ROUTES } from "@/config/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexifyafrica.com";

  return SITE_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
