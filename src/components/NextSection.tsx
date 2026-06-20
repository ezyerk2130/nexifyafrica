"use client";

import { useRef } from "react";
import PrincipleIcon from "@/components/PrincipleIcon";
import RevealText from "@/components/RevealText";
import {
  HOME_PRINCIPLES,
  HOME_PRINCIPLES_HEADING,
  type PrincipleIconId,
} from "@/data/homePrinciples";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollWordReveal } from "@/hooks/useScrollWordReveal";
import { mediaQueries, motion } from "@/lib/animation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type PrincipleItem = {
  id?: string;
  icon: string;
  title: string;
  description: string;
};

type ScrollMetrics = {
  start: string;
  distance: number;
  pause: number;
  totalScroll: number;
};

function PrincipleCard({ icon, title, description }: PrincipleItem) {
  return (
    <article className="home-principle-card">
      <div className="home-principle-card-top">
        <div className="home-principle-icon-wrap">
          <PrincipleIcon id={icon as PrincipleIconId} />
        </div>
        <h3 className="home-principle-title">{title}</h3>
      </div>
      <p className="home-principle-description">{description}</p>
    </article>
  );
}

type Props = {
  principles?: PrincipleItem[];
  headingBefore?: string;
  headingHighlight?: string;
  headingAfter?: string;
};

function PrinciplesList({
  principles,
}: {
  principles: readonly PrincipleItem[];
}) {
  return (
    <div className="home-marquee-list">
      {principles.map((principle, i) => (
        <PrincipleCard key={principle.id ?? i} {...principle} />
      ))}
    </div>
  );
}

export default function NextSection({
  principles,
  headingBefore,
  headingHighlight,
  headingAfter,
}: Props = {}) {
  const PRINCIPLES: readonly PrincipleItem[] = principles ?? HOME_PRINCIPLES;
  const before = headingBefore ?? HOME_PRINCIPLES_HEADING.before;
  const highlight = headingHighlight ?? HOME_PRINCIPLES_HEADING.highlight;
  const after = headingAfter ?? HOME_PRINCIPLES_HEADING.after;
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useScrollWordReveal(headingRef, sectionRef, prefersReducedMotion);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinWrapper = pinRef.current;
      const heading = headingRef.current;
      const marquee = marqueeRef.current;
      const track = trackRef.current;
      if (!section || !pinWrapper || !heading || !marquee || !track) return;

      const isMobile = () => window.matchMedia(mediaQueries.touch).matches;

      const measureScroll = (): ScrollMetrics | null => {
        const styles = getComputedStyle(marquee);
        const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0;
        const visibleWidth = marquee.clientWidth - paddingLeft;
        const distance = Math.max(0, track.scrollWidth - visibleWidth);
        if (distance <= 0) return null;

        const gap = isMobile() ? 24 : 40;
        const marqueeHeight = marquee.offsetHeight;
        const marqueeTop = marquee.offsetTop;
        const cardsTopPx = Math.max(
          0,
          window.innerHeight - marqueeHeight - gap,
        );
        const pinStartPx = cardsTopPx - marqueeTop;
        const pause = isMobile()
          ? Math.min(window.innerHeight * 0.22, 200)
          : Math.min(window.innerHeight * 0.3, 320);

        return {
          start: `top ${pinStartPx}px`,
          distance,
          pause,
          totalScroll: pause * 2 + distance,
        };
      };

      let timeline: gsap.core.Timeline | undefined;
      let rebuildTimer: ReturnType<typeof setTimeout> | undefined;
      let onLayoutChange: (() => void) | undefined;
      let refreshFrame: number | undefined;

      try {
        gsap.set(track, { x: 0 });

        if (prefersReducedMotion) {
          marquee.classList.add("home-marquee--native");
          refreshFrame = window.requestAnimationFrame(() =>
            ScrollTrigger.refresh(),
          );

          return () => {
            if (refreshFrame !== undefined) {
              window.cancelAnimationFrame(refreshFrame);
            }
            marquee.classList.remove("home-marquee--native");
            gsap.set(track, { clearProps: "transform" });
            ScrollTrigger.refresh();
          };
        }

        marquee.classList.remove("home-marquee--native");

        const buildScroll = () => {
          timeline?.scrollTrigger?.kill();
          timeline?.kill();
          gsap.set(track, { x: 0 });

          const metrics = measureScroll();
          if (!metrics) return;

          timeline = gsap
            .timeline({
              scrollTrigger: {
                id: "home-principles-horizontal",
                trigger: pinWrapper,
                start: metrics.start,
                end: `+=${metrics.totalScroll}`,
                pin: pinWrapper,
                pinReparent: false,
                pinSpacing: true,
                scrub: isMobile() ? 0.85 : 0.6,
                anticipatePin: 0,
                fastScrollEnd: !isMobile(),
                invalidateOnRefresh: !isMobile(),
              },
            })
            .to({}, { duration: metrics.pause })
            .to(track, {
              x: -metrics.distance,
              ease: "none",
              duration: metrics.distance,
            })
            .to({}, { duration: metrics.pause });
        };

        buildScroll();

        onLayoutChange = () => {
          if (rebuildTimer) clearTimeout(rebuildTimer);
          rebuildTimer = setTimeout(() => {
            buildScroll();
            ScrollTrigger.refresh();
          }, motion.refreshDebounceMs);
        };

        window.addEventListener("resize", onLayoutChange);
        window.addEventListener("orientationchange", onLayoutChange);

        refreshFrame = window.requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });

        return () => {
          if (refreshFrame !== undefined) {
            window.cancelAnimationFrame(refreshFrame);
          }
          if (rebuildTimer) clearTimeout(rebuildTimer);
          if (onLayoutChange) {
            window.removeEventListener("resize", onLayoutChange);
            window.removeEventListener("orientationchange", onLayoutChange);
          }
          marquee?.classList.remove("home-marquee--native");
          gsap.set(track, { clearProps: "transform" });
          ScrollTrigger.refresh();
        };
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("[NextSection] Animation unavailable:", error);
        }
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
        gsap.set(track, { clearProps: "transform" });
        heading?.querySelectorAll<HTMLElement>(".hero-word").forEach((word) => {
          gsap.set(word, { y: "0%" });
        });
      }
    },
    {
      scope: sectionRef,
      dependencies: [prefersReducedMotion],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="home-principles text-neutral-900"
    >
      <div ref={pinRef} className="home-principles-pin">
        <div className="home-section-inner home-section-inner--features">
          <h2 ref={headingRef} className="home-principles-heading">
            <RevealText
              segments={[
                { text: before },
                {
                  text: highlight,
                  className: "home-principles-highlight",
                  keepTogether: true,
                },
                { text: after },
              ]}
            />
          </h2>
        </div>

        <div ref={marqueeRef} className="home-marquee">
          <div ref={trackRef} className="home-marquee-track">
            <PrinciplesList principles={PRINCIPLES} />
          </div>
        </div>
      </div>
    </section>
  );
}
