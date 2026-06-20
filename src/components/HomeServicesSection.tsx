"use client";

import { useRef } from "react";
import RevealText from "@/components/RevealText";
import { HOME_SERVICES, HOME_SERVICES_HEADING } from "@/data/homeServices";
import { useBatchReveal } from "@/hooks/useBatchReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollWordReveal } from "@/hooks/useScrollWordReveal";

type ServiceItem = {
  id?: string;
  number: string;
  title: string;
  description: string;
};

function ServiceCard({ number, title, description }: ServiceItem) {
  const displayNumber = (number ?? "").replace(/\.$/, "");

  return (
    <article className="home-service-card">
      <p className="home-service-number" aria-hidden="true">
        {displayNumber}
        <span className="home-service-number-dot">.</span>
      </p>
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
  useBatchReveal({
    scopeRef: sectionRef,
    targets: ".home-service-card",
    disabled: prefersReducedMotion,
    y: 48,
    start: "top 88%",
    duration: 0.85,
    stagger: 0.08,
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="home-services text-neutral-900"
      aria-labelledby="home-services-heading"
    >
      <div className="home-section-inner home-section-inner--services">
        <header className="home-services-header">
          <h2
            id="home-services-heading"
            ref={headingRef}
            className="home-services-heading"
          >
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
