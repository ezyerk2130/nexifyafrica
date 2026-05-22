"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  "Work",
  "Approach",
  "Services",
  "News",
  "About",
  "Join",
  "Contact",
] as const;

const HERO_LINES = [
  "New Genre is a global design",
  "& technology studio",
  "accelerating tomorrow's ideas.",
];

const HERO_LINES_REVEAL = [
  "We create strategies, brand systems, digital",
  "products, and experiences for the world's",
  "most disruptive thinkers.",
];

const GRADIENT_START = {
  top: "#0D0D12",
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
  "hero-copy-layer pointer-events-none absolute inset-0 flex w-full items-center justify-center px-6";

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
    const headerItems = section.querySelectorAll<HTMLElement>(".hero-header-item");

    gsap.set(section, {
      "--gradient-top": GRADIENT_START.top,
      "--gradient-bottom": GRADIENT_START.bottom,
    });

    gsap.set(copyReveal, { opacity: 0, y: 32 });
    gsap.set(revealWords, { y: "110%", opacity: 0 });
    gsap.set(whiteOverlay, { opacity: 0 });

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      loadTl.fromTo(
        words,
        { y: "100%" },
        { y: "0%", duration: 1.2, stagger: 0.05 },
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
        copyReveal,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power1.inOut",
        },
        0,
      );

      scrollTl.to(
        revealWords,
        {
          y: "0%",
          opacity: 1,
          duration: 0.22,
          stagger: 0.006,
          ease: "power3.out",
        },
        0.02,
      );

      scrollTl.to(
        copy,
        {
          y: -24,
          opacity: 0,
          duration: 0.3,
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
        0.32,
      );

      scrollTl.to(
        whiteOverlay,
        {
          opacity: 1,
          ease: "power1.inOut",
        },
        0.32,
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
        className={`${HERO_COPY_LAYER_CLASS} z-[2] opacity-100 will-change-[transform,opacity]`}
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
        className={`${HERO_COPY_LAYER_CLASS} hero-copy-reveal-layer z-[3] translate-y-8 opacity-0`}
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
            NEW GENRE
          </a>

          <nav className="hero-header-item will-change-[transform,opacity] hidden items-center gap-6 text-sm text-white/90 lg:flex lg:gap-8">
            {NAV_ITEMS.map((item, index) => (
              <span key={item} className="flex items-center gap-6 lg:gap-8">
                {index === 5 && (
                  <span className="h-4 w-px bg-white/30" aria-hidden="true" />
                )}
                <a
                  href={`#${item.toLowerCase()}`}
                  className="transition-opacity duration-300 hover:opacity-60"
                >
                  {item}
                </a>
              </span>
            ))}
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

        <div className="pointer-events-auto px-8 pb-10 md:px-12 lg:px-16">
          <a
            href="#work"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
          >
            Our work
          </a>
        </div>

        <aside
          className="pointer-events-auto absolute top-1/2 right-0 hidden -translate-y-1/2 lg:flex"
          aria-label="Awwards Site of the Day"
        >
          <div className="flex flex-col items-center gap-3 bg-black px-3 py-6 text-white">
            <span className="text-lg font-bold">W.</span>
            <span className="text-[10px] tracking-[0.15em] uppercase [writing-mode:vertical-rl]">
              Site of the Day
            </span>
          </div>
        </aside>
      </div>
    </section>
    </div>
  );
}
