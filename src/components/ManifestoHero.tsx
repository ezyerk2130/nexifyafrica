import PinnedHero from "@/components/PinnedHero";
import {
  MANIFESTO_HERO_LINES,
  MANIFESTO_HERO_REVEAL_LINES,
} from "@/data/manifesto";

type Props = {
  lines?: readonly string[];
  revealLines?: readonly string[];
};

export default function ManifestoHero({ lines, revealLines }: Props) {
  return (
    <PinnedHero
      lines={lines ?? MANIFESTO_HERO_LINES}
      revealLines={revealLines ?? MANIFESTO_HERO_REVEAL_LINES}
    />
  );
}
