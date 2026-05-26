import type { Metadata } from "next";
import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the team behind Nexify Africa.",
};

export default function TeamPage() {
  return (
    <ComingSoonPage
      title="Team"
      description="We're introducing our team soon. Check back shortly."
    />
  );
}
