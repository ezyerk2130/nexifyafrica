"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    return () => {
      lenis.destroy();
    };
  }, [enabled]);
}
