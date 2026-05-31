export const CONTACT_HERO_LINES = ["Contact"] as const;

export const CONTACT_HERO_REVEAL_LINES = [
  "Let's start",
  "the conversation",
] as const;

export const CONTACT_VISUAL = {
  imageSrc: "/images/contact/hero-bg.avif",
  headline: "Got an idea? Let's build it right.",
  description:
    "From strategy and brand systems to full product development, we help Africa's most ambitious teams build software that converts, scales, and stands out.",
};

export const CONTACT_DETAILS = [
  {
    id: "phone",
    title: "Phone:",
    lines: ["+255687473582"],
    href: "tel:+255687473582",
  },
  {
    id: "email",
    title: "Email:",
    lines: ["info@nexifyafrica.com"],
    href: "mailto:info@nexifyafrica.com",
  },
  {
    id: "address",
    title: "Address:",
    lines: ["Masaki, Haile Selassie Road,", "Dar es Salaam, Tanzania"],
  },
] as const;
