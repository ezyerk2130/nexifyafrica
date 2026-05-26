import PinnedHero from "@/components/PinnedHero";

const HERO_LINES = [
  "Stories of change —",
  "and the strategy behind them",
] as const;

export default function CaseStudiesHero() {
  return <PinnedHero lines={HERO_LINES} />;
}
