"use client";

import { useEffect, useRef, type ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const GRADIENT_START = {
  top: "#003B8C",
  bottom: "#003B8C",
};

const GRADIENT_END = {
  top: "#FFFFFF",
  bottom: "#FFFFFF",
};

const SCROLL_EXIT = 0.06;
const SCROLL_EXIT_END = SCROLL_EXIT + 0.18;
const SCROLL_WHITE = 0.22;
const REVEAL_TRIGGER = 0.36;
const REVEAL_RESET = 0.28;
const INTRO_WORD_REVEAL = {
  duration: 1.2,
  stagger: 0.05,
  ease: "power4.out",
} as const;

const HERO_COPY_LAYER_CLASS =
  "hero-copy-layer pointer-events-none absolute inset-0 flex w-full items-center justify-center px-6 pb-24 sm:px-8 sm:pb-0 lg:justify-start lg:px-16";

function HeroLine({
  line,
  wordClassName,
  className,
}: {
  line: string;
  wordClassName: string;
  className?: string;
}) {
  const words = (line ?? "").split(" ");

  return (
    <span className={`block ${className ?? ""}`}>
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
    </span>
  );
}

export type PinnedHeroProps = {
  lines: readonly string[];
  revealLines?: readonly string[];
  navVariant?: "dark" | "light";
  cta?: ReactNode;
  sectionId?: string;
};

export default function PinnedHero({
  lines,
  revealLines,
  navVariant = "dark",
  cta,
  sectionId,
}: PinnedHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const copyRevealRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);
  const hasReveal = Boolean(revealLines?.length);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const copy = copyRef.current;
    const copyReveal = copyRevealRef.current;
    const chrome = chromeRef.current;
    const whiteOverlay = whiteOverlayRef.current;

    if (!wrapper || !section || !copy || !chrome || !whiteOverlay) {
      return;
    }

    if (hasReveal && !copyReveal) {
      return;
    }

    const words = copy.querySelectorAll<HTMLElement>(".hero-word");
    const introLines = copy.querySelectorAll<HTMLElement>(".hero-intro-line");
    const revealWords = copyReveal?.querySelectorAll<HTMLElement>(".hero-word-reveal");
    const revealLineEls = copyReveal?.querySelectorAll<HTMLElement>(".hero-reveal-line");
    const headerItems = section.querySelectorAll<HTMLElement>(".hero-header-item");

    const setFinalState = () => {
      gsap.set(section, {
        "--gradient-top": GRADIENT_END.top,
        "--gradient-bottom": GRADIENT_END.bottom,
      });
      gsap.set(words, { y: "0%" });
      gsap.set(headerItems, { opacity: 1, y: 0 });
      gsap.set(whiteOverlay, { opacity: 1 });
      gsap.set(introLines, { color: "#0c1018" });
      if (copyReveal) {
        gsap.set(copyReveal, { opacity: 1, y: 0, visibility: "visible" });
      }
      if (revealWords?.length) {
        gsap.set(revealWords, { y: "0%" });
      }
      if (revealLineEls?.length) {
        gsap.set(revealLineEls, { color: "#0c1018" });
      }
    };

    if (prefersReducedMotion) {
      setFinalState();
      return;
    }

    let ctx: ReturnType<typeof gsap.context> | undefined;
    try {
      gsap.set(section, {
        "--gradient-top": GRADIENT_START.top,
        "--gradient-bottom": GRADIENT_START.bottom,
      });

      if (copyReveal) {
        gsap.set(copyReveal, { opacity: 0, y: 24, visibility: "hidden" });
      }
      if (revealWords?.length) {
        gsap.set(revealWords, { y: "100%" });
      }
      if (revealLineEls?.length) {
        gsap.set(revealLineEls, { color: "#ffffff" });
      }
      gsap.set(introLines, { color: "#ffffff" });
      gsap.set(whiteOverlay, { opacity: 0 });

      ctx = gsap.context(() => {
        const loadTl = gsap.timeline({ defaults: { ease: "power4.out" } });

        loadTl.fromTo(
          words,
          { y: "100%" },
          {
            y: "0%",
            duration: INTRO_WORD_REVEAL.duration,
            stagger: INTRO_WORD_REVEAL.stagger,
            ease: INTRO_WORD_REVEAL.ease,
          },
          0,
        );

        loadTl.fromTo(
          headerItems,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 1.2 },
          0,
        );

        let revealActive = false;
        let introAtTopShown = true;
        let introRevealTl: gsap.core.Timeline | null = null;

        const hideIntroForScroll = () => {
          introRevealTl?.kill();
          introRevealTl = null;
          introAtTopShown = false;
          gsap.set(copy, { opacity: 0, y: -24, visibility: "hidden" });
          gsap.set(chrome, { opacity: 0, y: -12 });
          gsap.set(words, { y: "100%" });
          gsap.set(headerItems, { opacity: 0, y: -16 });
          gsap.set(introLines, { color: "#ffffff" });
        };

        const showIntroInstant = () => {
          introRevealTl?.kill();
          introRevealTl = null;
          introAtTopShown = true;
          gsap.set(copy, { opacity: 1, y: 0, visibility: "visible" });
          gsap.set(chrome, { opacity: 1, y: 0 });
          gsap.set(words, { y: "0%" });
          gsap.set(headerItems, { opacity: 1, y: 0 });
          gsap.set(introLines, { color: "#ffffff" });
        };

        const playIntroReveal = () => {
          if (introAtTopShown) return;

          introRevealTl?.kill();
          introAtTopShown = true;

          gsap.set(copy, { opacity: 1, y: 0, visibility: "visible" });
          gsap.set(chrome, { opacity: 1, y: 0 });
          gsap.set(words, { y: "100%" });
          gsap.set(headerItems, { opacity: 0, y: -16 });
          gsap.set(introLines, { color: "#ffffff" });

          introRevealTl = gsap.timeline({ defaults: { ease: INTRO_WORD_REVEAL.ease } });
          introRevealTl
            .to(
              words,
              {
                y: "0%",
                duration: INTRO_WORD_REVEAL.duration,
                stagger: INTRO_WORD_REVEAL.stagger,
                ease: INTRO_WORD_REVEAL.ease,
              },
              0,
            )
            .to(headerItems, { opacity: 1, y: 0, duration: INTRO_WORD_REVEAL.duration }, 0);
        };

        const updateIntroForScroll = (progress: number, direction: number) => {
          if (direction === -1) {
            if (progress <= 0.001) {
              playIntroReveal();
            } else {
              hideIntroForScroll();
            }
            return;
          }

          if (progress >= SCROLL_EXIT_END) {
            hideIntroForScroll();
            return;
          }

          if (progress <= SCROLL_EXIT) {
            showIntroInstant();
            return;
          }

          introRevealTl?.kill();
          introRevealTl = null;
          introAtTopShown = false;

          const fadeT = (progress - SCROLL_EXIT) / (SCROLL_EXIT_END - SCROLL_EXIT);
          gsap.set(copy, {
            opacity: 1 - fadeT,
            y: -24 * fadeT,
            visibility: "visible",
          });
          gsap.set(chrome, { opacity: 1 - fadeT, y: -12 * fadeT });
        };

        const revealTl =
          copyReveal && revealWords?.length
            ? gsap.timeline({ paused: true })
            : null;

        if (revealTl && copyReveal && revealWords?.length) {
          const revealWordEls = revealWords;
          revealTl
            .set(copyReveal, { visibility: "visible" })
            .to(copyReveal, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
            })
            .fromTo(
              revealWordEls,
              { y: "100%" },
              {
                y: "0%",
                duration: 1.2,
                stagger: 0.05,
                ease: "power4.out",
              },
              0.12,
            );

          if (revealLineEls?.length) {
            revealTl.to(
              revealLineEls,
              { color: "#0c1018", duration: 0.35, ease: "power2.inOut" },
              0.15,
            );
          }
        }

        const resetReveal = () => {
          if (!copyReveal || !revealWords?.length) return;
          revealTl?.pause(0);
          gsap.set(copyReveal, { opacity: 0, y: 24, visibility: "hidden" });
          gsap.set(revealWords, { y: "100%" });
          if (revealLineEls?.length) {
            gsap.set(revealLineEls, { color: "#ffffff" });
          }
        };

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200%",
            pin: true,
            pinReparent: false,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              updateIntroForScroll(self.progress, self.direction);

              if (!revealTl) return;

              if (self.progress >= REVEAL_TRIGGER && !revealActive) {
                revealActive = true;
                revealTl.restart(true);
              } else if (self.progress < REVEAL_RESET && revealActive) {
                revealActive = false;
                resetReveal();
              }
            },
          },
        });

        scrollTl.to(
          section,
          {
            "--gradient-top": GRADIENT_END.top,
            "--gradient-bottom": GRADIENT_END.bottom,
            duration: 0.2,
            ease: "power2.inOut",
          },
          SCROLL_WHITE,
        );

        scrollTl.to(
          whiteOverlay,
          { opacity: 1, duration: 0.2, ease: "power2.inOut" },
          SCROLL_WHITE,
        );

        scrollTl.to({}, { duration: 0.58 }, SCROLL_WHITE + 0.2);
      }, wrapper);

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        ctx?.revert();
        ScrollTrigger.refresh();
      };
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[PinnedHero] Animation unavailable:", error);
      }
      ctx?.revert();
      setFinalState();
    }
  }, [hasReveal, prefersReducedMotion]);

  return (
    <div ref={wrapperRef} className="relative">
      <section
        id={sectionId}
        ref={sectionRef}
        className="hero-section relative flex w-full flex-col overflow-hidden"
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
          <h1 className="hero-copy-inner">
            {(lines ?? []).map((line) => (
              <HeroLine
                key={line}
                line={line}
                wordClassName="hero-word"
                className="hero-display-line hero-intro-line"
              />
            ))}
          </h1>
        </div>

        {hasReveal && revealLines ? (
          <div
            ref={copyRevealRef}
            className={`${HERO_COPY_LAYER_CLASS} hero-copy-reveal-layer z-[5] translate-y-8 opacity-0`}
          >
            <div className="hero-copy-inner">
              {revealLines.map((line) => (
                <HeroLine
                  key={line}
                  line={line}
                  wordClassName="hero-word-reveal"
                  className="hero-display-line hero-reveal-line"
                />
              ))}
            </div>
          </div>
        ) : null}

        <div
          ref={chromeRef}
          className="relative z-10 flex h-full flex-col pointer-events-none"
        >
          <SiteNav
            animate
            variant={navVariant}
            className="pointer-events-auto"
          />

          <div className="flex-1" aria-hidden="true" />

          {cta ? (
            <div className="pointer-events-auto px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-10 lg:px-16">
              {cta}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
