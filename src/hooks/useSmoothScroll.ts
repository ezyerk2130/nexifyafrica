"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ScrollTrigger } from "@/lib/gsap";

export function useSmoothScroll(enabled = true) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;

    let lenis: Lenis | null = null;

    try {
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const refresh = () => ScrollTrigger.refresh();
      refresh();
      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("resize", refresh);
        lenis?.destroy();
        ScrollTrigger.refresh();
      };
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[Lenis] Smooth scroll unavailable:", error);
      }
      return undefined;
    }
  }, [enabled, prefersReducedMotion]);
}
