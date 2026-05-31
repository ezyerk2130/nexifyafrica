"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import PinnedHero from "@/components/PinnedHero";

type ComingSoonPageProps = {
  title: string;
  description?: string;
  revealLines?: readonly string[];
};

export default function ComingSoonPage({
  title,
  description = "We're building this section. Check back shortly.",
  revealLines,
}: ComingSoonPageProps) {
  const heroRevealLines =
    revealLines ??
    (description.includes(".")
      ? description.split(/(?<=\.)\s+/).filter(Boolean)
      : [description]);

  return (
    <>
      <PinnedHero lines={[title]} revealLines={heroRevealLines} />

      <section className="bg-[#F4F6F8] text-neutral-900">
        <div className="mx-auto flex min-h-[50vh] max-w-[1400px] flex-col items-center justify-center px-6 py-24 text-center sm:px-8 lg:px-12 lg:py-32">
          <p className="mb-3 text-sm tracking-[0.2em] text-neutral-500 uppercase">
            Coming soon
          </p>
          <h2 className="max-w-2xl text-3xl leading-tight tracking-[-0.03em] text-neutral-900 md:text-4xl">
            {description}
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="site-button site-button--blue">
              Back to home
            </Link>
            <Link
              href="/case-studies"
              className="site-button site-button--blue bg-transparent"
            >
              View case studies
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
