import PinnedHero from "@/components/PinnedHero";
import { CONTACT_HERO_LINES, CONTACT_HERO_REVEAL_LINES } from "@/data/contact";

export default function ContactHero() {
  return (
    <PinnedHero
      lines={CONTACT_HERO_LINES}
      revealLines={CONTACT_HERO_REVEAL_LINES}
    />
  );
}
