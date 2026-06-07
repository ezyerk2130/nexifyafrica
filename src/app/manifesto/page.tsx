import type { Metadata } from "next";
import ManifestoPage, { type NormalizedManifestoSection } from "@/components/ManifestoPage";
import { getManifestoPage } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Where did Africa's digital promise go? Read the Nexify Africa manifesto on building software that matches the continent's ambition.",
};

export default async function ManifestoRoute() {
  const data = await getManifestoPage().catch(() => null);

  if (!data) {
    return <ManifestoPage />;
  }

  const sections: NormalizedManifestoSection[] = (data.sections ?? []).map((section) => ({
    id: section.id?.current ?? (section.id as unknown as string),
    label: section.label,
    blocks: (section.blocks ?? []).map((block) => ({
      type: block.type,
      text: block.text,
      items: block.items,
    })),
    imageAfter: section.imageAfter,
    imageAfterSrc: section.image?.asset ? urlFor(section.image.asset).url() : undefined,
    imageAfterAlt: section.imageAlt,
    imageAfterFit: section.imageFit,
  }));

  return (
    <ManifestoPage
      heroLines={data.heroLines}
      heroRevealLines={data.heroRevealLines}
      kicker={data.kicker}
      lead={data.lead}
      sections={sections.length > 0 ? sections : undefined}
    />
  );
}
