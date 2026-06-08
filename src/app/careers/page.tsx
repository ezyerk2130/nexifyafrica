import type { Metadata } from "next";
import ComingSoonPage from "@/components/ComingSoonPage";
import { getCareersPage } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Nexify Africa and help shape the future of tech in Africa.",
};

function toText(value?: string | string[]): string {
  if (Array.isArray(value)) return value.join(" ");
  return value ?? "";
}

export default async function CareersPage() {
  const data = await getCareersPage().catch(() => null);

  const title = toText(data?.heroLines).trim() || "Careers";
  const description =
    data?.description ?? "Open roles and opportunities are coming soon.";
  const revealText =
    toText(data?.heroRevealLines).trim() ||
    "Open roles and opportunities are coming soon.";

  return (
    <ComingSoonPage
      title={title}
      description={description}
      revealLines={revealText}
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
