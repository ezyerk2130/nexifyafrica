"use client";

import { useEffect, useRef } from "react";
import { HOME_FEATURES } from "@/data/homeFeatures";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function NextSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".grid-feature-holder");

    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    try {
      gsap.set(cards, { opacity: 0, y: 48 });

      const ctx = gsap.context(() => {
        ScrollTrigger.batch(cards, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.08,
              ease: "power4.out",
              overwrite: true,
            });
          },
        });
      }, section);

      return () => {
        ctx.revert();
      };
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[NextSection] Animation unavailable:", error);
      }
      gsap.set(cards, { opacity: 1, y: 0 });
    }
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="work" className="home-features text-neutral-900">
      <div className="home-features-inner mx-auto w-full max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div ref={gridRef} className="grid-features">
          {HOME_FEATURES.map((feature) => (
            <article key={feature.id} className="grid-feature-holder">
              <h2 className="number">
                {feature.number}
                <span className="black-text">.</span>
              </h2>
              <div className="grid-content-left">
                <h5 className="h6-style">{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
