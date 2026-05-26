"use client";

import { useEffect, useRef } from "react";
import CaseStudiesHero from "@/components/CaseStudiesHero";
import Footer from "@/components/Footer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const CASE_STUDIES = [
  {
    client: "Concept Lab",
    title: "Stabilizing deployment workflows across growing production environments",
    metric: "40%",
    metricLabel: "reduction in downtime",
  },
  {
    client: "Code_House",
    title: "Improving execution reliability for multi-team automation workflows",
    metric: "40%",
    metricLabel: "increase in release frequency",
  },
  {
    client: "Moana",
    title: "Reducing operational overhead across long-running data pipelines",
    metric: "70%",
    metricLabel: "reduction in manual intervention",
  },
  {
    client: "Jasmin Studio",
    title: "“Things started moving immediately. Less discussion, more execution.”",
    metric: "55%",
    metricLabel: "increase in team productivity",
  },
] as const;

export default function CaseStudiesPage() {
  const cardsSectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  useSmoothScroll(true);

  useEffect(() => {
    const section = cardsSectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(".case-study-card");

    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    try {
      gsap.set(cards, { opacity: 0, y: 48 });

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
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
        ctx.revert();
      };
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[CaseStudiesPage] Card animation unavailable:", error);
      }
      gsap.set(cards, { opacity: 1, y: 0 });
    }
  }, [prefersReducedMotion]);

  return (
    <>
      <CaseStudiesHero />

      <section
        ref={cardsSectionRef}
        className="bg-[#F4F6F8] text-neutral-900"
      >
        <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-16 sm:px-8 lg:px-12 lg:pb-32 lg:pt-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {CASE_STUDIES.map((study) => (
              <article
                key={study.client}
                className="case-study-card flex min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6"
              >
                <div
                  className="flex aspect-[16/10] w-full items-center justify-center rounded-xl bg-neutral-100"
                  aria-hidden="true"
                >
                  <span className="text-sm text-neutral-400">Case study image</span>
                </div>

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

                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    title="Full case study coming soon"
                    className="site-button site-button--blue site-button--disabled w-full shrink-0 justify-center lg:w-auto"
                  >
                    Coming soon
                  </button>
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
