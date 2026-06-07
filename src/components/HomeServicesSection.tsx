"use client";

import { useEffect, useRef } from "react";
import RevealText from "@/components/RevealText";
import { HOME_SERVICES, HOME_SERVICES_HEADING } from "@/data/homeServices";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollWordReveal } from "@/hooks/useScrollWordReveal";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function ServiceCard({
  number,
  title,
  description,
}: (typeof HOME_SERVICES)[number]) {
  return (
    <article className="home-service-card">
      <p className="home-service-number" aria-hidden="true">
        {number}
      </p>
      <div className="home-service-copy">
        <h3 className="home-service-title">{title}</h3>
        <p className="home-service-description">{description}</p>
      </div>
    </article>
  );
}

export default function HomeServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useScrollWordReveal(headingRef, sectionRef, prefersReducedMotion);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".home-service-card");

    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    try {
      gsap.set(cards, { opacity: 0, y: 40 });

      const ctx = gsap.context(() => {
        ScrollTrigger.batch(cards, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
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
        console.warn("[HomeServicesSection] Animation unavailable:", error);
      }
      gsap.set(cards, { opacity: 1, y: 0 });
    }
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="home-services text-neutral-900"
      aria-labelledby="home-services-heading"
    >
      <div className="home-section-inner home-section-inner--services">
        <header className="home-services-header">
          <h2 id="home-services-heading" ref={headingRef} className="home-services-heading">
            <RevealText block segments={[{ text: HOME_SERVICES_HEADING }]} />
          </h2>
        </header>

        <div ref={gridRef} className="home-services-grid">
          {HOME_SERVICES.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
