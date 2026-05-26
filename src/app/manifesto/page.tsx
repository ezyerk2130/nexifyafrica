import type { Metadata } from "next";
import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "The Nexify Africa manifesto — our vision for progress in tech across Africa.",
};

export default function ManifestoPage() {
  return (
    <ComingSoonPage
      title="Manifesto"
      description="Our manifesto is on its way. Check back soon."
    />
  );
}
