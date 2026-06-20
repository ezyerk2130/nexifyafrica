"use client";

import type { RefObject } from "react";
import { motion } from "@/lib/animation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type UseBatchRevealOptions = {
  scopeRef: RefObject<HTMLElement | null>;
  targets: string;
  disabled?: boolean;
  y?: number;
  start?: string;
  duration?: number;
  stagger?: number;
  ease?: string;
};

export function useBatchReveal({
  scopeRef,
  targets,
  disabled = false,
  y = 48,
  start = motion.batchReveal.start,
  duration = motion.batchReveal.duration,
  stagger = motion.batchReveal.stagger,
  ease = motion.batchReveal.ease,
}: UseBatchRevealOptions) {
  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope) return;

      const elements = gsap.utils.toArray<HTMLElement>(targets, scope);
      if (!elements.length) return;

      try {
        if (disabled) {
          gsap.set(elements, { autoAlpha: 1, y: 0 });
          return;
        }

        gsap.set(elements, { autoAlpha: 0, y });

        ScrollTrigger.batch(elements, {
          start,
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration,
              stagger,
              ease,
              overwrite: true,
            });
          },
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("[useBatchReveal] Animation unavailable:", error);
        }
        gsap.set(elements, { autoAlpha: 1, y: 0 });
      }
    },
    {
      scope: scopeRef,
      dependencies: [disabled, targets, y, start, duration, stagger, ease],
      revertOnUpdate: true,
    },
  );
}
