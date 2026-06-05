import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const WORD_REVEAL = {
  duration: 1.2,
  stagger: 0.05,
  ease: "power4.out",
} as const;

export function useScrollWordReveal(
  containerRef: RefObject<HTMLElement | null>,
  scopeRef: RefObject<HTMLElement | null>,
  prefersReducedMotion: boolean,
) {
  useEffect(() => {
    const container = containerRef.current;
    const scope = scopeRef.current ?? container;
    if (!container || !scope) return;

    const words = container.querySelectorAll<HTMLElement>(".hero-word");

    if (!words.length) return;

    if (prefersReducedMotion) {
      gsap.set(words, { y: "0%" });
      return;
    }

    try {
      gsap.set(words, { y: "100%" });

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(words, {
              y: "0%",
              duration: WORD_REVEAL.duration,
              stagger: WORD_REVEAL.stagger,
              ease: WORD_REVEAL.ease,
              overwrite: true,
            });
          },
        });
      }, scope);

      return () => {
        ctx.revert();
      };
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[useScrollWordReveal] Animation unavailable:", error);
      }
      gsap.set(words, { y: "0%" });
    }
  }, [containerRef, scopeRef, prefersReducedMotion]);
}
