import type { Metadata } from "next";
import CaseStudiesPage from "@/components/CaseStudiesPage";
import { getCaseStudyCards, getHomePage } from "@/sanity/lib/queries";
import { imageUrl } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real outcomes and measured impact — explore how Nexify Africa partners with teams to deliver results.",
};

export default async function CaseStudiesRoute() {
  const [cards, homePage] = await Promise.all([
    getCaseStudyCards().catch(() => null),
    getHomePage().catch(() => null),
  ]);

  const cardsProps =
    cards && cards.length > 0
      ? {
          cards: cards.map((c) => ({
            client: c.cardClient ?? c.title?.split(" ")[0] ?? "",
            title: c.title ?? "",
            metric: c.metric,
            metricLabel: c.metricLabel,
            slug: c.slug?.current,
            imageUrl: imageUrl(c.cardImage, 800) ?? undefined,
          })),
        }
      : {};

  return (
    <CaseStudiesPage
      {...cardsProps}
      heroLines={homePage?.caseStudiesHeroLines}
      heroRevealLines={homePage?.caseStudiesRevealLines}
    />
  );
}
