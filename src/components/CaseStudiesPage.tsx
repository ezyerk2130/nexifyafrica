"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import CaseStudiesHero from "@/components/CaseStudiesHero";
import Footer from "@/components/Footer";
import { CASE_STUDY_CARDS } from "@/data/caseStudies";

type CardItem = {
  client: string;
  title: string;
  metric: string;
  metricLabel: string;
  slug?: string;
  imageUrl?: string;
};

type Props = {
  cards?: CardItem[];
  heroLines?: string | string[];
  heroRevealLines?: string | string[];
};
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function CaseStudiesPage({ cards, heroLines, heroRevealLines }: Props = {}) {
  const CARDS = cards ?? CASE_STUDY_CARDS;
  const cardsSectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = cardsSectionRef.current;
    if (!section) return;

    const cardEls = section.querySelectorAll<HTMLElement>(".case-study-card");

    if (prefersReducedMotion) {
      gsap.set(cardEls, { opacity: 1, y: 0 });
      return;
    }

    let ctx: ReturnType<typeof gsap.context> | undefined;
    try {
      gsap.set(cardEls, { opacity: 0, y: 48 });

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(cardEls, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: "power4.out",
            });
          },
        });
      }, section);

      return () => {
        ctx?.revert();
      };
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[CaseStudiesPage] Card animation unavailable:", error);
      }
      ctx?.revert();
      gsap.set(cardEls, { opacity: 1, y: 0 });
    }
  }, [prefersReducedMotion]);

  return (
    <>
      <CaseStudiesHero lines={heroLines} revealLines={heroRevealLines} />

      <section
        ref={cardsSectionRef}
        className="bg-[#F4F6F8] text-neutral-900"
      >
        <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-16 sm:px-8 lg:px-12 lg:pb-32 lg:pt-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {CARDS.map((study) => (
              <article
                key={study.client}
                className="case-study-card flex min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6"
              >
                {study.imageUrl ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                    <Image
                      src={study.imageUrl}
                      alt={`${study.client} case study`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div
                    className="flex aspect-[16/10] w-full items-center justify-center rounded-xl bg-neutral-100"
                    aria-hidden="true"
                  >
                    <span className="text-sm text-neutral-400">Case study image</span>
                  </div>
                )}

                <div className="mt-5 flex items-center gap-2.5">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#003B8C]/10 text-xs font-semibold text-[#003B8C]"
                    aria-hidden="true"
                  >
                    {study.client.charAt(0)}
                  </span>
                  <p className="text-sm font-medium text-neutral-700">{study.client}</p>
                </div>

                <h2 className="case-study-card-title mt-3 text-2xl leading-tight tracking-[-0.03em] text-neutral-900 sm:text-[1.65rem]">
                  {study.title}
                </h2>

                <div className="case-study-card-footer mt-auto flex flex-col gap-4 pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
                  <div className="min-w-0">
                    <p className="text-base leading-none font-normal tracking-[-0.04em] text-neutral-900">
                      {study.metric}
                    </p>
                    <p className="mt-1.5 text-sm leading-snug text-neutral-500 lg:whitespace-nowrap">
                      {study.metricLabel}
                    </p>
                  </div>

                  {study.slug ? (
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="site-button site-button--blue w-full shrink-0 justify-center lg:w-auto"
                    >
                      Read case study
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      title="Full case study coming soon"
                      className="site-button site-button--blue site-button--disabled w-full shrink-0 justify-center lg:w-auto"
                    >
                      Coming soon
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
