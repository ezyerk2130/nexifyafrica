import type { Metadata } from "next";
import ComingSoonPage from "@/components/ComingSoonPage";
import { getCareersPage } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Nexify Africa and help shape the future of tech in Africa.",
};

export default async function CareersPage() {
  const data = await getCareersPage().catch(() => null);

  const title = data?.heroLines?.[0] ?? "Careers";
  const description =
    data?.description ?? "Open roles and opportunities are coming soon.";
  const revealLines =
    data?.heroRevealLines && data.heroRevealLines.length > 0
      ? data.heroRevealLines
      : ["Open roles and opportunities", "are coming soon."];

  return (
    <ComingSoonPage
      title={title}
      description={description}
      revealLines={revealLines}
      kicker={data?.kicker ?? "Coming soon"}
      primaryCta={{
        label: data?.primaryCtaLabel ?? "Back to home",
        href: data?.primaryCtaHref ?? "/",
      }}
      secondaryCta={{
        label: data?.secondaryCtaLabel ?? "View case studies",
        href: data?.secondaryCtaHref ?? "/case-studies",
      }}
    />
  );
}
