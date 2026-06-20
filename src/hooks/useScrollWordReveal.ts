"use client";

import type { RefObject } from "react";
import { motion } from "@/lib/animation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function useScrollWordReveal(
  containerRef: RefObject<HTMLElement | null>,
  scopeRef: RefObject<HTMLElement | null>,
  prefersReducedMotion: boolean,
) {
  useGSAP(
    () => {
      const container = containerRef.current;
      const scope = scopeRef.current ?? container;
      if (!container || !scope) return;

      const words = container.querySelectorAll<HTMLElement>(".hero-word");

      if (!words.length) return;

      try {
        if (prefersReducedMotion) {
          gsap.set(words, { y: "0%" });
          return;
        }

        gsap.set(words, { y: "100%" });

        ScrollTrigger.create({
          trigger: container,
          start: motion.batchReveal.start,
          once: true,
          onEnter: () => {
            gsap.to(words, {
              y: "0%",
              duration: motion.wordReveal.duration,
              stagger: motion.wordReveal.stagger,
              ease: motion.wordReveal.ease,
              overwrite: true,
            });
          },
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("[useScrollWordReveal] Animation unavailable:", error);
        }
        gsap.set(words, { y: "0%" });
      }
    },
    {
      scope: scopeRef,
      dependencies: [prefersReducedMotion],
      revertOnUpdate: true,
    },
  );
}
