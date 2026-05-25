"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AnimatedWordLine } from "@/components/AnimatedWordLine";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

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
  const pageRef = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const words = root.querySelectorAll<HTMLElement>(".reveal-word");
    const subtitleWords = root.querySelectorAll<HTMLElement>(".reveal-word-subtitle");
    const cards = root.querySelectorAll<HTMLElement>(".case-study-card");

    gsap.set(words, { y: "100%" });
    gsap.set(subtitleWords, { y: "100%" });
    gsap.set(cards, { opacity: 0, y: 32 });

    const loadTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    loadTl.to(words, { y: "0%", duration: 1.2, stagger: 0.05 }, 0);
    loadTl.to(
      subtitleWords,
      { y: "0%", duration: 1.2, stagger: 0.04 },
      0.15,
    );
    loadTl.to(cards, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.45);

    return () => {
      loadTl.kill();
    };
  }, []);

  return (
    <>
      <div ref={pageRef} className="case-studies-page bg-[#F4F6F8] text-neutral-900">
        <div className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white">
          <SiteNav variant="light" className="pb-6 sm:pb-8 lg:pb-10" />
        </div>

        <main>
          <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
            <div className="mx-auto max-w-4xl text-center">
              <AnimatedWordLine
                line="Stories of change — and the strategy behind them"
                className="case-studies-title mx-auto text-[clamp(2rem,5vw,4rem)] leading-[0.98] tracking-[-0.04em] text-neutral-900"
              />
              <AnimatedWordLine
                line="See how we've helped companies like Stellaris and OmniCorp succeed."
                wordClassName="reveal-word-subtitle"
                className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg"
              />
            </div>
          </section>

          <section className="mx-auto max-w-[1400px] px-6 pb-24 sm:px-8 lg:px-12 lg:pb-32">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {CASE_STUDIES.map((study) => (
                <article
                  key={study.client}
                  className="case-study-card flex flex-col rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6"
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

                  <div className="mt-auto flex items-end justify-between gap-6 pt-8">
                    <div>
                      <p className="text-base leading-none font-normal tracking-[-0.04em] text-neutral-900">
                        {study.metric}
                      </p>
                      <p className="mt-1.5 whitespace-nowrap text-sm leading-snug text-neutral-500">
                        {study.metricLabel}
                      </p>
                    </div>

                    <a
                      href="#"
                      className="site-button site-button--blue shrink-0"
                    >
                      Read case
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
