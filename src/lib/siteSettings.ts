import { CONTACT_LINK, NAV_LINKS } from "@/config/navigation";

export type NavLink = { label: string; href: string };

export type SiteSettings = {
  brandName: string;
  footerWordmark: string;
  navLinks: NavLink[];
  contactLink: NavLink;
  subscribeLabel: string;
  subscribePlaceholder: string;
  subscribeButtonText: string;
  subscribeNote: string;
  subscribeSuccessMessage: string;
  copyright: string;
};

// Static defaults — used whenever Sanity has no value for a given field.
// Kept in a server-safe module so both the client provider and the server
// layout can import it without crossing the "use client" boundary.
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName: "Nexify Africa",
  footerWordmark: "Nexify Africa",
  navLinks: NAV_LINKS.map((l) => ({ label: l.label, href: l.href })),
  contactLink: { label: CONTACT_LINK.label, href: CONTACT_LINK.href },
  subscribeLabel: "Subscribe",
  subscribePlaceholder: "Enter your email",
  subscribeButtonText: "Subscribe",
  subscribeNote: "By subscribing you agree to with our Privacy Policy.",
  subscribeSuccessMessage: "Thanks for subscribing. We'll be in touch soon.",
  copyright: "© {year} Nexify Africa. All rights reserved.",
};
