"use client";

import PinnedHero from "@/components/PinnedHero";
import { safeHref } from "@/lib/url";

const DEFAULT_LINES = [
  "A Force For Progress in Tech",
  "Across Africa",
] as const;

const DEFAULT_REVEAL_LINES = [
  "We create strategies, brand systems, digital",
  "products, and experiences for the world's",
  "most disruptive thinkers.",
] as const;

const DEFAULT_CTA_TEXT = "Our work";
const DEFAULT_CTA_HREF = "#work";

interface HeroSectionProps {
  lines?: string[];
  revealLines?: string[];
  ctaText?: string;
  ctaHref?: string;
}

export default function HeroSection({
  lines,
  revealLines,
  ctaText,
  ctaHref,
}: HeroSectionProps) {
  const heroLines = lines && lines.length > 0 ? lines : DEFAULT_LINES;
  const heroReveal =
    revealLines && revealLines.length > 0 ? revealLines : DEFAULT_REVEAL_LINES;
  const buttonText = ctaText || DEFAULT_CTA_TEXT;
  const buttonHref = safeHref(ctaHref || DEFAULT_CTA_HREF, DEFAULT_CTA_HREF);

  return (
    <PinnedHero
      sectionId="hero-section"
      lines={heroLines}
      revealLines={heroReveal}
      cta={
        <a
          href={buttonHref}
          className="site-button hero-cta-button border border-solid border-white bg-transparent"
        >
          {buttonText}
        </a>
      }
    />
  );
}
