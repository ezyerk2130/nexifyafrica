"use client";

import { useEffect, useRef } from "react";
import RevealText from "@/components/RevealText";
import { HOME_SERVICES, HOME_SERVICES_HEADING } from "@/data/homeServices";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollWordReveal } from "@/hooks/useScrollWordReveal";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ServiceItem = { id?: string; number: string; title: string; description: string };

function ServiceCard({ number, title, description }: ServiceItem) {
  const displayNumber = number.replace(/\.$/, "");

  return (
    <article className="home-service-card">
      <h2 className="home-service-number">
        {displayNumber}
        <span className="home-service-number-dot">.</span>
      </h2>
      <div className="home-service-content">
        <h3 className="home-service-title">{title}</h3>
        <p className="home-service-description">{description}</p>
      </div>
    </article>
  );
}

type Props = {
  services?: ServiceItem[];
  heading?: string;
};

export default function HomeServicesSection({ services, heading }: Props = {}) {
  const SERVICES = services ?? HOME_SERVICES;
  const HEADING = heading ?? HOME_SERVICES_HEADING;
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
            <RevealText block segments={[{ text: HEADING }]} />
          </h2>
        </header>

        <div ref={gridRef} className="home-services-grid">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id ?? index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
