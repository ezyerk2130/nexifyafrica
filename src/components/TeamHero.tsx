import PinnedHero from "@/components/PinnedHero";
import { TEAM_HERO_LINES, TEAM_HERO_REVEAL_LINES } from "@/data/team";

export default function TeamHero() {
  return (
    <PinnedHero lines={TEAM_HERO_LINES} revealLines={TEAM_HERO_REVEAL_LINES} />
  );
}
