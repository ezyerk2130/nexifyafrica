export const mediaQueries = {
  desktop: "(min-width: 1024px)",
  touch: "(max-width: 1023px)",
} as const;

export const motion = {
  wordReveal: {
    duration: 1.2,
    stagger: 0.05,
    ease: "power4.out",
  },
  batchReveal: {
    duration: 0.85,
    stagger: 0.08,
    ease: "power4.out",
    start: "top 88%",
  },
  refreshDebounceMs: 250,
} as const;
