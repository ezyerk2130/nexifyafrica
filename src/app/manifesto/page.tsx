import type { Metadata } from "next";
import ManifestoPage from "@/components/ManifestoPage";
import { getManifestoPage } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Where did Africa's digital promise go? Read the Nexify Africa manifesto on building software that matches the continent's ambition.",
};

export default async function ManifestoRoute() {
  const data = await getManifestoPage().catch(() => null);

  return (
    <ManifestoPage
      heroLines={data?.heroLines}
      heroRevealLines={data?.heroRevealLines}
      kicker={data?.kicker}
      lead={data?.lead}
      body={data?.body}
    />
  );
}
