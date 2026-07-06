"use client";

import PinnedHero from "@/components/PinnedHero";
import { safeHref } from "@/lib/url";

const DEFAULT_LINES = "A Force For Progress in Tech Across Africa";

const DEFAULT_REVEAL_LINES =
  "We create strategies, brand systems, digital products, and experiences for the world's most disruptive thinkers.";

const LEGACY_CTA_TEXT = "Our work";
const LEGACY_CTA_HREF = "#work";
const DEFAULT_CTA_TEXT = "Contact us today";
const DEFAULT_CTA_HREF = "/contact";

function hasText(value?: string | string[]): boolean {
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value && value.trim());
}

interface HeroSectionProps {
  lines?: string | string[];
  revealLines?: string | string[];
  ctaText?: string;
  ctaHref?: string;
}

export default function HeroSection({
  lines,
  revealLines,
  ctaText,
  ctaHref,
}: HeroSectionProps) {
  const heroLines = hasText(lines) ? lines! : DEFAULT_LINES;
  const heroReveal = hasText(revealLines) ? revealLines! : DEFAULT_REVEAL_LINES;
  const authoredCtaText = ctaText?.trim();
  const authoredCtaHref = ctaHref?.trim();
  const usesLegacyCtaText =
    authoredCtaText?.toLowerCase() === LEGACY_CTA_TEXT.toLowerCase();
  const buttonText =
    !authoredCtaText || usesLegacyCtaText ? DEFAULT_CTA_TEXT : authoredCtaText;
  const rawButtonHref =
    !authoredCtaHref || authoredCtaHref === LEGACY_CTA_HREF
      ? DEFAULT_CTA_HREF
      : authoredCtaHref;
  const buttonHref = safeHref(rawButtonHref, DEFAULT_CTA_HREF);

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
