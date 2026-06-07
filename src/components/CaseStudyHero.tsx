import PinnedHero from "@/components/PinnedHero";

type CaseStudyHeroProps = {
  lines: readonly string[];
  revealLines: readonly string[];
};

export default function CaseStudyHero({ lines, revealLines }: CaseStudyHeroProps) {
  return (
    <PinnedHero
      lines={lines}
      revealLines={revealLines}
      sectionId="case-study-hero"
    />
  );
}
