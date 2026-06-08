import PinnedHero from "@/components/PinnedHero";
import { CONTACT_HERO_LINES, CONTACT_HERO_REVEAL_LINES } from "@/data/contact";

type Props = {
  lines?: string | readonly string[];
  revealLines?: string | readonly string[];
};

export default function ContactHero({ lines, revealLines }: Props) {
  return (
    <PinnedHero
      lines={lines ?? CONTACT_HERO_LINES}
      revealLines={revealLines ?? CONTACT_HERO_REVEAL_LINES}
    />
  );
}
