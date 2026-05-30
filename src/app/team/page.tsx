import type { Metadata } from "next";
import TeamPage from "@/components/TeamPage";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The team behind Nexify Africa — a small, senior group with no hand-offs and no layers.",
};

export default function TeamRoute() {
  return <TeamPage />;
}
