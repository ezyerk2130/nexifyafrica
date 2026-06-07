import PinnedHero from "@/components/PinnedHero";

const DEFAULT_LINES = [
  "Stories of change —",
  "and the strategy behind them",
] as const;

const DEFAULT_REVEAL_LINES = [
  "Real outcomes.",
  "Measured impact.",
] as const;

interface CaseStudiesHeroProps {
  lines?: string[];
  revealLines?: string[];
}

export default function CaseStudiesHero({ lines, revealLines }: CaseStudiesHeroProps = {}) {
  const heroLines = lines && lines.length > 0 ? lines : DEFAULT_LINES;
  const heroReveal = revealLines && revealLines.length > 0 ? revealLines : DEFAULT_REVEAL_LINES;

  return (
    <PinnedHero lines={heroLines} revealLines={heroReveal} />
  );
}
