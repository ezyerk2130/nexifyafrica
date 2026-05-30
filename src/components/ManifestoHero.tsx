import PinnedHero from "@/components/PinnedHero";
import {
  MANIFESTO_HERO_LINES,
  MANIFESTO_HERO_REVEAL_LINES,
} from "@/data/manifesto";

export default function ManifestoHero() {
  return (
    <PinnedHero
      lines={MANIFESTO_HERO_LINES}
      revealLines={MANIFESTO_HERO_REVEAL_LINES}
    />
  );
}
