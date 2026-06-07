import PinnedHero from "@/components/PinnedHero";
import { TEAM_HERO_LINES, TEAM_HERO_REVEAL_LINES } from "@/data/team";

type Props = {
  lines?: readonly string[];
  revealLines?: readonly string[];
};

export default function TeamHero({ lines, revealLines }: Props) {
  return (
    <PinnedHero
      lines={lines ?? TEAM_HERO_LINES}
      revealLines={revealLines ?? TEAM_HERO_REVEAL_LINES}
    />
  );
}
