import type { Metadata } from "next";
import CaseStudiesPage from "@/components/CaseStudiesPage";
import { getCaseStudyCards } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real outcomes and measured impact — explore how Nexify Africa partners with teams to deliver results.",
};

export default async function CaseStudiesRoute() {
  const cards = await getCaseStudyCards().catch(() => null);

  const cardsProps =
    cards && cards.length > 0
      ? {
          cards: cards.map((c) => ({
            client: c.cardClient ?? c.title.split(" ")[0] ?? "",
            title: c.title,
            metric: c.metric,
            metricLabel: c.metricLabel,
            slug: c.slug?.current,
          })),
        }
      : {};

  return <CaseStudiesPage {...cardsProps} />;
}
