"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteNav from "@/components/SiteNav";

gsap.registerPlugin(ScrollTrigger);

const HERO_LINES = [
  "Stories of change,",
  "and the strategy behind them",
];

const GRADIENT_START = {
  top: "#003B8C",
  bottom: "#003B8C",
};

const GRADIENT_MID = {
  top: "#003B8C",
  bottom: "#F3F0EA",
};

const GRADIENT_END = {
  top: "#FFFFFF",
  bottom: "#FFFFFF",
};

function HeroLine({
  line,
  className,
}: {
  line: string;
  className?: string;
}) {
  const words = line.split(" ");

  return (
    <p className={className}>
      {words.map((word, wordIndex) => (
        <span
          key={`${line}-${wordIndex}`}
          className="hero-word-mask inline-block align-top"
        >
          <span className="hero-word inline-block will-change-transform">
            {word}
            {wordIndex < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </p>
  );
}

const HERO_COPY_LAYER_CLASS =
  "hero-copy-layer pointer-events-none absolute inset-0 flex w-full items-center justify-center px-6 sm:px-8 lg:justify-start lg:px-16";

export default function CaseStudiesHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const copy = copyRef.current;
    const chrome = chromeRef.current;
    const whiteOverlay = whiteOverlayRef.current;

    if (!wrapper || !section || !copy || !chrome || !whiteOverlay) {
      return;
    }

    const words = copy.querySelectorAll<HTMLElement>(".hero-word");
    const copyLines = copy.querySelectorAll<HTMLElement>(".hero-intro-line");
    const headerItems = section.querySelectorAll<HTMLElement>(".hero-header-item");

    gsap.set(section, {
      "--gradient-top": GRADIENT_START.top,
      "--gradient-bottom": GRADIENT_START.bottom,
    });
    gsap.set(copyLines, { color: "#ffffff" });
    gsap.set(whiteOverlay, { opacity: 0 });

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      loadTl.fromTo(
        words,
        { y: "100%" },
        { y: "0%", duration: 1.2, stagger: 0.05, ease: "power4.out" },
        0,
      );

      loadTl.fromTo(
        headerItems,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 1.2 },
        0,
      );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: true,
          pinReparent: false,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTl.to(
        chrome,
        {
          opacity: 0,
          y: -12,
          ease: "power1.inOut",
        },
        0,
      );

      scrollTl.to(
        section,
        {
          "--gradient-top": GRADIENT_MID.top,
          "--gradient-bottom": GRADIENT_MID.bottom,
          ease: "power1.inOut",
        },
        0,
      );

      scrollTl.to(
        section,
        {
          "--gradient-top": GRADIENT_END.top,
          "--gradient-bottom": GRADIENT_END.bottom,
          ease: "power1.inOut",
        },
        0.5,
      );

      scrollTl.to(
        whiteOverlay,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power1.inOut",
        },
        0.5,
      );

      scrollTl.to(
        copyLines,
        {
          color: "#0c1018",
          duration: 0.15,
          ease: "power1.inOut",
        },
        0.5,
      );
    }, wrapper);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <section
        ref={sectionRef}
        className="hero-section relative flex h-screen w-full flex-col overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, var(--gradient-top) 0%, var(--gradient-bottom) 100%)",
        }}
      >
        <div
          ref={whiteOverlayRef}
          className="pointer-events-none absolute inset-0 z-[1] bg-white opacity-0"
          aria-hidden="true"
        />

        <div
          ref={copyRef}
          className={`${HERO_COPY_LAYER_CLASS} z-[4] opacity-100 will-change-[transform,opacity]`}
        >
          <div className="hero-copy-inner">
            {HERO_LINES.map((line) => (
              <HeroLine
                key={line}
                line={line}
                className="hero-display-line hero-intro-line"
              />
            ))}
          </div>
        </div>

        <div
          ref={chromeRef}
          className="relative z-10 flex h-full flex-col pointer-events-none"
        >
          <SiteNav animate className="pointer-events-auto" />
        </div>
      </section>
    </div>
  );
}
