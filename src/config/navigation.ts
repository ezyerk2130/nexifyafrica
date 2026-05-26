export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Team", href: "/team" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Careers", href: "/careers" },
] as const;

export const CONTACT_LINK = { label: "Contact", href: "/contact" } as const;

export const FOOTER_NAV = [...NAV_LINKS, CONTACT_LINK] as const;

export const SITE_ROUTES = [
  "/",
  "/case-studies",
  "/manifesto",
  "/team",
  "/careers",
  "/contact",
] as const;
