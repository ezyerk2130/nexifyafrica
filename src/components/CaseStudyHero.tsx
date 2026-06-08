import PinnedHero from "@/components/PinnedHero";

type CaseStudyHeroProps = {
  lines: string | readonly string[];
  revealLines: string | readonly string[];
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
