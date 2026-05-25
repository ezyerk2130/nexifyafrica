"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Team", href: "#team" },
  { label: "Case Studies", href: "#work" },
  { label: "Careers", href: "#careers" },
] as const;

const HERO_LINES = [
  "A Force For Progress in Tech",
  "Across Africa",
];

const HERO_LINES_REVEAL = [
  "We create strategies, brand systems, digital",
  "products, and experiences for the world's",
  "most disruptive thinkers.",
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
  wordClassName,
  className,
}: {
  line: string;
  wordClassName: string;
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
          <span className={`${wordClassName} inline-block will-change-transform`}>
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

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const copyRevealRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const copy = copyRef.current;
    const copyReveal = copyRevealRef.current;
    const chrome = chromeRef.current;
    const whiteOverlay = whiteOverlayRef.current;

    if (!wrapper || !section || !copy || !copyReveal || !chrome || !whiteOverlay) {
      return;
    }

    const words = copy.querySelectorAll<HTMLElement>(".hero-word");
    const revealWords = copyReveal.querySelectorAll<HTMLElement>(".hero-word-reveal");
    const revealLines = copyReveal.querySelectorAll<HTMLElement>(".hero-reveal-line");
    const headerItems = section.querySelectorAll<HTMLElement>(".hero-header-item");

    gsap.set(section, {
      "--gradient-top": GRADIENT_START.top,
      "--gradient-bottom": GRADIENT_START.bottom,
    });

    gsap.set(copyReveal, { opacity: 0, y: 32 });
    gsap.set(revealWords, { y: "100%" });
    gsap.set(revealLines, { color: "#ffffff" });
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

      const revealWordAnimation = {
        y: "0%",
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out",
      };

      let revealWordsPlayed = false;

      const playRevealWords = () => {
        if (revealWordsPlayed) return;
        revealWordsPlayed = true;
        gsap.killTweensOf(revealWords);
        gsap.fromTo(revealWords, { y: "100%" }, revealWordAnimation);
      };

      const resetRevealWords = () => {
        revealWordsPlayed = false;
        gsap.killTweensOf(revealWords);
        gsap.set(revealWords, { y: "100%" });
      };

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
          onUpdate: (self) => {
            if (self.progress > 0.01) {
              playRevealWords();
            } else {
              resetRevealWords();
            }
          },
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
        copyReveal,
        {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: "power1.inOut",
        },
        0,
      );

      scrollTl.to(
        copy,
        {
          y: -24,
          opacity: 0,
          duration: 0.2,
          ease: "power1.inOut",
        },
        0.1,
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
        revealLines,
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
        id="hero-section"
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
              wordClassName="hero-word"
              className="hero-display-line hero-intro-line"
            />
          ))}
        </div>
      </div>

      <div
        ref={copyRevealRef}
        className={`${HERO_COPY_LAYER_CLASS} hero-copy-reveal-layer z-[5] translate-y-8 opacity-0`}
      >
        <div className="hero-copy-inner">
          {HERO_LINES_REVEAL.map((line) => (
            <HeroLine
              key={line}
              line={line}
              wordClassName="hero-word-reveal"
              className="hero-display-line hero-reveal-line"
            />
          ))}
        </div>
      </div>

      <div ref={chromeRef} className="relative z-10 flex h-full flex-col pointer-events-none">
        <header className="pointer-events-auto flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8 lg:px-16 lg:pt-10">
          <a
            href="#"
            className="hero-header-item will-change-[transform,opacity] text-sm font-semibold tracking-[0.2em] text-white uppercase lg:text-base"
          >
            NEXIFY AFRICA
          </a>

          <nav className="hero-header-item will-change-[transform,opacity] hidden items-center gap-6 text-sm text-white/90 lg:flex lg:gap-8">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-opacity duration-300 hover:opacity-60"
              >
                {item.label}
              </a>
            ))}
            <span className="h-4 w-px bg-white/30" aria-hidden="true" />
            <a
              href="#contact"
              className="transition-opacity duration-300 hover:opacity-60"
            >
              Contact
            </a>
          </nav>

          <div className="hero-header-item will-change-[transform,opacity] flex items-center gap-5 lg:hidden">
            <a
              href="#contact"
              className="text-sm text-white transition-opacity duration-300 hover:opacity-60"
            >
              Contact
            </a>
            <button
              type="button"
              className="flex flex-col justify-center gap-[7px] p-1"
              aria-label="Open menu"
            >
              <span className="block h-px w-6 bg-white" aria-hidden="true" />
              <span className="block h-px w-6 bg-white" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="flex-1" aria-hidden="true" />

        <div className="pointer-events-auto px-6 pb-10 sm:px-8 lg:px-16">
          <a
            href="#work"
            className="site-button hero-cta-button border border-solid border-white bg-transparent"
          >
            Our work
          </a>
        </div>
      </div>
    </section>
    </div>
  );
}
