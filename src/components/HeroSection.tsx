"use client";

import PinnedHero from "@/components/PinnedHero";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const HERO_LINES = [
  "A Force For Progress in Tech",
  "Across Africa",
] as const;

const HERO_LINES_REVEAL = [
  "We create strategies, brand systems, digital",
  "products, and experiences for the world's",
  "most disruptive thinkers.",
] as const;

export default function HeroSection() {
  useSmoothScroll(true);

  return (
    <PinnedHero
      sectionId="hero-section"
      lines={HERO_LINES}
      revealLines={HERO_LINES_REVEAL}
      cta={
        <a
          href="#work"
          className="site-button hero-cta-button border border-solid border-white bg-transparent"
        >
          Our work
        </a>
      }
    />
  );
}
