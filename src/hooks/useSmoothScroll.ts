"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Lenis stays desktop-only; mobile uses native scroll with ScrollTrigger pin. */
const DESKTOP_MQ = "(min-width: 1024px)";
const TOUCH_MQ = "(max-width: 1023px)";

export function useSmoothScroll(enabled = true) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!enabled || prefersReducedMotion || typeof document === "undefined") return;

    ScrollTrigger.config({ ignoreMobileResize: true });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    const mm = gsap.matchMedia();

    mm.add(DESKTOP_MQ, () => {
      const scroller = document.documentElement;
      ScrollTrigger.defaults({ scroller });

      const lenis = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      });

      ScrollTrigger.scrollerProxy(scroller, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      lenis.on("scroll", ScrollTrigger.update);
      ScrollTrigger.refresh();

      return () => {
        lenis.destroy();
        ScrollTrigger.clearScrollMemory();
        ScrollTrigger.refresh();
      };
    });

    mm.add(TOUCH_MQ, () => {
      ScrollTrigger.normalizeScroll({
        allowNestedScroll: true,
        type: "touch,wheel,pointer",
      });
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.normalizeScroll(false);
        ScrollTrigger.refresh();
      };
    });

    return () => {
      window.removeEventListener("resize", onResize);
      mm.revert();
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
    };
  }, [enabled, prefersReducedMotion]);
}
