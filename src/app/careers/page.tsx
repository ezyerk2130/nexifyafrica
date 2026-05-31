import type { Metadata } from "next";
import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Nexify Africa and help shape the future of tech in Africa.",
};

export default function CareersPage() {
  return (
    <ComingSoonPage
      title="Careers"
      description="Open roles and opportunities are coming soon."
      revealLines={["Open roles and opportunities", "are coming soon."]}
    />
  );
}
