import type { Metadata } from "next";
import TeamPage from "@/components/TeamPage";
import { getTeamMembers, getTeamPage } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The team behind Nexify Africa — a small, senior group with no hand-offs and no layers.",
};

export default async function TeamRoute() {
  const [members, teamPage] = await Promise.all([
    getTeamMembers().catch(() => null),
    getTeamPage().catch(() => null),
  ]);

  const membersProps =
    members && members.length > 0
      ? {
          members: members.map((m) => ({
            id: m._id,
            name: m.name,
            role: m.role,
            portraitUrl: m.portrait?.asset ? urlFor(m.portrait.asset).width(600).url() : undefined,
          })),
        }
      : {};

  const defaultImageUrl = teamPage?.defaultTeamImage?.asset
    ? urlFor(teamPage.defaultTeamImage.asset).width(600).url()
    : undefined;

  return (
    <TeamPage
      {...membersProps}
      defaultImageUrl={defaultImageUrl}
      heroLines={teamPage?.heroLines}
      heroRevealLines={teamPage?.heroRevealLines}
    />
  );
}
