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

const GRADIENT_START = {
  top: "#0D0D12",
  bottom: "#7289A5",
};

const GRADIENT_END = {
  top: "#1A2438",
  bottom: "#A8BFD4",
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;

    if (!section || !copy) return;

    const words = copy.querySelectorAll<HTMLElement>(".hero-word");
    const headerItems = section.querySelectorAll<HTMLElement>(".hero-header-item");

    gsap.set(section, {
      "--gradient-top": GRADIENT_START.top,
      "--gradient-bottom": GRADIENT_START.bottom,
    });

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
          end: "+=120%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl.to(
        copy,
        {
          y: -48,
          scale: 0.94,
          opacity: 0,
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
        0,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="hero-section relative flex h-screen w-full flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--gradient-top) 0%, var(--gradient-bottom) 100%)",
      }}
    >
      <header className="relative z-10 flex items-center justify-between px-8 pt-8 md:px-12 md:pt-10 lg:px-16">
        <a
          href="#"
          className="hero-header-item will-change-[transform,opacity] text-sm font-semibold tracking-[0.2em] text-white uppercase md:text-base"
        >
          NEW GENRE
        </a>

        <nav className="hero-header-item will-change-[transform,opacity] hidden items-center gap-6 text-sm text-white/90 md:flex lg:gap-8">
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
      </header>

      <div className="relative z-10 flex flex-1 items-center px-8 md:px-12 lg:px-16">
        <div
          ref={copyRef}
          className="hero-copy will-change-[transform,opacity] max-w-4xl"
        >
          {HERO_LINES.map((line) => (
            <p
              key={line}
              className="font-serif text-[clamp(2rem,5vw,3.75rem)] leading-[1.15] tracking-[-0.02em] text-white"
            >
              {line.split(" ").map((word, wordIndex) => (
                <span
                  key={`${line}-${wordIndex}`}
                  className="inline-block overflow-hidden align-top"
                >
                  <span className="hero-word inline-block will-change-transform">
                    {word}
                    {wordIndex < line.split(" ").length - 1 ? "\u00A0" : ""}
                  </span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-8 pb-10 md:px-12 lg:px-16">
        <a
          href="#work"
          className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
        >
          Our work
        </a>
      </div>

      <aside
        className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 md:flex"
        aria-label="Awwwards Site of the Day"
      >
        <div className="flex flex-col items-center gap-3 bg-black px-3 py-6 text-white">
          <span className="text-lg font-bold">W.</span>
          <span
            className="text-[10px] tracking-[0.15em] uppercase [writing-mode:vertical-rl]"
          >
            Site of the Day
          </span>
        </div>
      </aside>
    </section>
  );
}
