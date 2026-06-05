"use client";

import { useEffect, useRef } from "react";
import PrincipleIcon from "@/components/PrincipleIcon";
import RevealText from "@/components/RevealText";
import {
  HOME_PRINCIPLES,
  HOME_PRINCIPLES_HEADING,
} from "@/data/homePrinciples";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollWordReveal } from "@/hooks/useScrollWordReveal";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function PrincipleCard({
  icon,
  title,
  description,
}: (typeof HOME_PRINCIPLES)[number]) {
  return (
    <article className="home-principle-card">
      <div className="home-principle-card-top">
        <div className="home-principle-icon-wrap">
          <PrincipleIcon id={icon} />
        </div>
        <h3 className="home-principle-title">{title}</h3>
      </div>
      <p className="home-principle-description">{description}</p>
    </article>
  );
}

function MarqueeList({
  ariaHidden = false,
}: {
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="home-marquee-list"
      aria-hidden={ariaHidden || undefined}
    >
      {HOME_PRINCIPLES.map((principle) => (
        <PrincipleCard key={`${ariaHidden ? "dup-" : ""}${principle.id}`} {...principle} />
      ))}
    </div>
  );
}

export default function NextSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useScrollWordReveal(headingRef, sectionRef, prefersReducedMotion);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    if (!section || !heading || !marquee || !track) return;

    const lists = track.querySelectorAll<HTMLElement>(".home-marquee-list");
    const firstList = lists[0];
    if (!firstList) return;

    let marqueeTween: gsap.core.Tween | null = null;

    const setupMarquee = () => {
      marqueeTween?.kill();
      gsap.set(track, { x: 0 });

      if (prefersReducedMotion) return;

      const listWidth = firstList.offsetWidth;
      const gap = Number.parseFloat(
        getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0",
      );
      const distance = listWidth + gap;

      marqueeTween = gsap.to(track, {
        x: -distance,
        duration: Math.max(distance / 45, 18),
        ease: "none",
        repeat: -1,
      });
    };

    try {
      const ctx = gsap.context(() => {
        if (!prefersReducedMotion) {
          gsap.set(marquee, { opacity: 0 });
          ScrollTrigger.create({
            trigger: marquee,
            start: "top 92%",
            once: true,
            onEnter: () => {
              gsap.to(marquee, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                overwrite: true,
              });
            },
          });
        }

        setupMarquee();
      }, section);

      const resizeObserver = new ResizeObserver(() => {
        setupMarquee();
      });

      resizeObserver.observe(firstList);
      resizeObserver.observe(track);

      return () => {
        marqueeTween?.kill();
        resizeObserver.disconnect();
        ctx.revert();
      };
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[NextSection] Animation unavailable:", error);
      }
      gsap.set(marquee, { opacity: 1, x: 0 });
      heading?.querySelectorAll<HTMLElement>(".hero-word").forEach((word) => {
        gsap.set(word, { y: "0%" });
      });
    }
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="work" className="home-principles text-neutral-900">
      <div className="home-section-inner home-section-inner--features">
        <h2 ref={headingRef} className="home-principles-heading">
          <RevealText
            segments={[
              { text: HOME_PRINCIPLES_HEADING.before },
              {
                text: HOME_PRINCIPLES_HEADING.highlight,
                className: "home-principles-highlight",
                keepTogether: true,
              },
              { text: HOME_PRINCIPLES_HEADING.after },
            ]}
          />
        </h2>
      </div>

      <div
        ref={marqueeRef}
        className={`home-marquee${prefersReducedMotion ? " home-marquee--static" : ""}`}
      >
        <div ref={trackRef} className="home-marquee-track">
          <MarqueeList />
          {!prefersReducedMotion ? <MarqueeList ariaHidden /> : null}
        </div>
      </div>
    </section>
  );
}
