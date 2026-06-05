export type PrincipleIconId =
  | "check-circle"
  | "people"
  | "eye"
  | "layers"
  | "book"
  | "pen";

export const HOME_PRINCIPLES_HEADING = {
  before: "We help teams ",
  highlight: "move with intent",
  after:
    ", build for scale, and design digital products that survive contact with reality.",
} as const;

export const HOME_PRINCIPLES = [
  {
    id: "practical-first",
    icon: "check-circle" as PrincipleIconId,
    title: "Practical first",
    description:
      "We build for everyday operations and real users — not presentations that never ship.",
  },
  {
    id: "people-over-process",
    icon: "people" as PrincipleIconId,
    title: "People over process",
    description:
      "Systems should support your team doing their best work, never the other way around.",
  },
  {
    id: "clarity-beats-complexity",
    icon: "eye" as PrincipleIconId,
    title: "Clarity beats complexity",
    description:
      "If something needs constant explanation, it is probably too complicated.",
  },
  {
    id: "built-to-scale",
    icon: "layers" as PrincipleIconId,
    title: "Built to scale",
    description:
      "What we design at ten people should still work at a hundred.",
  },
  {
    id: "senior-involvement",
    icon: "book" as PrincipleIconId,
    title: "Senior involvement",
    description:
      "You work directly with experienced people, from strategy through launch.",
  },
  {
    id: "designed-not-copied",
    icon: "pen" as PrincipleIconId,
    title: "Designed, not copied",
    description:
      "We do not reuse frameworks — we design systems around your goals.",
  },
] as const;
