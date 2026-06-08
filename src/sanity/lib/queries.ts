import { cache } from "react";
import { client } from "./client";

// ─── Shared fetch helper ──────────────────────────────────────────────────────

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: { tags: tags.length ? tags : ["sanity"] },
    });
  } catch (err) {
    console.error("[Sanity] fetch failed", { tags, error: err });
    throw err;
  }
}

/**
 * List-query variant: never throws. Logs and returns an empty array on failure
 * so list-rendering pages degrade gracefully to their static fallbacks.
 */
async function sanityFetchList<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T[]> {
  try {
    const result = await sanityFetch<T[]>(query, params, tags);
    return Array.isArray(result) ? result : [];
  } catch {
    return [];
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type SanityImageRef = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; width: number; height: number };
};

export type SanityCaseStudyCard = {
  _id: string;
  title: string;
  slug: { current: string };
  cardClient: string;
  metric: string;
  metricLabel: string;
  cardImage?: { asset: { _ref: string; _type: "reference" } };
};

export type SanityCaseStudySidebar = {
  client: string;
  industry: string;
  services: string;
  projectDuration: string;
};

export type SanityCaseStudyContentBlock = {
  id: { current: string };
  title: string;
  paragraphs: string[];
  bullets?: string[];
  image?: {
    asset: SanityImageRef["asset"];
    alt?: string;
    variant: "wide" | "square";
  };
};

export type SanityCaseStudyDetail = {
  _id: string;
  title: string;
  slug: { current: string };
  heroLines: string[];
  heroRevealLines: string[];
  cardClient: string;
  metric: string;
  metricLabel: string;
  sidebar: SanityCaseStudySidebar;
  sections: SanityCaseStudyContentBlock[];
};

export type SanityService = {
  _id: string;
  number: string;
  title: string;
  description: string;
  order: number;
};

export type SanityFaqItem = {
  _id: string;
  question: string;
  answer: string;
  order: number;
};

export type SanityPrinciple = {
  _id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
};

export type SanityTeamMember = {
  _id: string;
  name: string;
  role: string;
  portrait?: SanityImageRef;
  order: number;
};

export type SanityHomePage = {
  // Hero
  heroLines?: string[];
  heroRevealLines?: string[];
  heroCtaText?: string;
  heroCtaHref?: string;
  // Principles
  principlesHeadingBefore: string;
  principlesHeadingHighlight: string;
  principlesHeadingAfter: string;
  // Services
  servicesHeading: string;
  // FAQ
  faqHeadingItalic?: string;
  faqHeading?: string;
  // Case studies page
  caseStudiesHeroLines?: string[];
  caseStudiesRevealLines?: string[];
};

// Portable Text block — a flexible catch-all for the blog-style manifesto body
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ManifestoPTBlock = Record<string, any>;

export type SanityManifestoPage = {
  heroLines?: string[];
  heroRevealLines?: string[];
  title?: string;
  kicker?: string;
  lead?: string;
  body?: ManifestoPTBlock[];
};

export type SanityContactDetail = {
  id: string;
  title: string;
  lines: string[];
  href?: string;
};

export type SanityContactForm = {
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  companyLabel?: string;
  companyPlaceholder?: string;
  detailsLabel?: string;
  detailsPlaceholder?: string;
  submitText?: string;
  submitSentText?: string;
};

export type SanityContactPage = {
  heroLines: string[];
  heroRevealLines: string[];
  visualHeadline: string;
  visualDescription: string;
  visualImage?: SanityImageRef;
  details: SanityContactDetail[];
  form?: SanityContactForm;
};

export type SanityTeamPage = {
  heroLines: string[];
  heroRevealLines: string[];
  defaultTeamImage?: SanityImageRef;
};

export type SanityNavLink = { label: string; href: string };

export type SanitySiteSettings = {
  brandName?: string;
  footerWordmark?: string;
  navLinks?: SanityNavLink[];
  contactLinkLabel?: string;
  contactLinkHref?: string;
  subscribeLabel?: string;
  subscribePlaceholder?: string;
  subscribeButtonText?: string;
  subscribeNote?: string;
  subscribeSuccessMessage?: string;
  copyright?: string;
  seoTitle?: string;
  seoTitleTemplate?: string;
  seoDescription?: string;
  ogImage?: SanityImageRef;
};

export type SanityCareersPage = {
  heroLines?: string[];
  heroRevealLines?: string[];
  kicker?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

// ─── Queries ──────────────────────────────────────────────────────────────────

const CASE_STUDY_CARD_FIELDS = `
  _id,
  title,
  slug,
  cardClient,
  metric,
  metricLabel,
  cardImage { asset }
`;

const CASE_STUDY_SECTION_FIELDS = `
  id,
  title,
  paragraphs,
  bullets,
  image {
    asset,
    alt,
    variant
  }
`;

export async function getCaseStudyCards(): Promise<SanityCaseStudyCard[]> {
  return sanityFetchList<SanityCaseStudyCard>(
    `*[_type == "caseStudy"] | order(title asc) { ${CASE_STUDY_CARD_FIELDS} }`,
    {},
    ["caseStudy"],
  );
}

export async function getAllCaseStudySlugsFromSanity(): Promise<string[]> {
  const results = await sanityFetchList<{ slug?: { current?: string } }>(
    `*[_type == "caseStudy"] { slug }`,
    {},
    ["caseStudy"],
  );
  return results
    .map((r) => r.slug?.current)
    .filter((s): s is string => typeof s === "string" && s.length > 0);
}

export async function getCaseStudyBySlugFromSanity(
  slug: string,
): Promise<SanityCaseStudyDetail | null> {
  const result = await sanityFetch<SanityCaseStudyDetail | null>(
    `*[_type == "caseStudy" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      heroLines,
      heroRevealLines,
      cardClient,
      metric,
      metricLabel,
      sidebar,
      sections[] { ${CASE_STUDY_SECTION_FIELDS} }
    }`,
    { slug },
    ["caseStudy"],
  );
  return result ?? null;
}

export async function getServices(): Promise<SanityService[]> {
  return sanityFetchList<SanityService>(
    `*[_type == "service"] | order(order asc) { _id, number, title, description, order }`,
    {},
    ["service"],
  );
}

export async function getFaqItems(): Promise<SanityFaqItem[]> {
  return sanityFetchList<SanityFaqItem>(
    `*[_type == "faqItem"] | order(order asc) { _id, question, answer, order }`,
    {},
    ["faqItem"],
  );
}

export async function getPrinciples(): Promise<SanityPrinciple[]> {
  return sanityFetchList<SanityPrinciple>(
    `*[_type == "principle"] | order(order asc) { _id, icon, title, description, order }`,
    {},
    ["principle"],
  );
}

export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  return sanityFetchList<SanityTeamMember>(
    `*[_type == "teamMember"] | order(order asc) { _id, name, role, portrait, order }`,
    {},
    ["teamMember"],
  );
}

export async function getHomePage(): Promise<SanityHomePage | null> {
  return sanityFetch(
    `*[_type == "homePage" && _id == "homePage"][0] {
      heroLines,
      heroRevealLines,
      heroCtaText,
      heroCtaHref,
      principlesHeadingBefore,
      principlesHeadingHighlight,
      principlesHeadingAfter,
      servicesHeading,
      faqHeadingItalic,
      faqHeading,
      caseStudiesHeroLines,
      caseStudiesRevealLines
    }`,
    {},
    ["homePage"],
  );
}

export async function getManifestoPage(): Promise<SanityManifestoPage | null> {
  return sanityFetch(
    `*[_type == "manifestoPage" && _id == "manifestoPage"][0] {
      heroLines,
      heroRevealLines,
      title,
      kicker,
      lead,
      body[] {
        ...,
        _type == "image" => { ..., asset }
      }
    }`,
    {},
    ["manifestoPage"],
  );
}

export async function getContactPage(): Promise<SanityContactPage | null> {
  return sanityFetch(
    `*[_type == "contactPage" && _id == "contactPage"][0] {
      heroLines,
      heroRevealLines,
      visualHeadline,
      visualDescription,
      visualImage { asset },
      details[] { id, title, lines, href },
      form
    }`,
    {},
    ["contactPage"],
  );
}

// Cached so the layout fetch + generateMetadata fetch dedupe within one request.
export const getSiteSettings = cache(
  async (): Promise<SanitySiteSettings | null> => {
    return sanityFetch(
      `*[_type == "siteSettings" && _id == "siteSettings"][0] {
        brandName,
        footerWordmark,
        navLinks[] { label, href },
        contactLinkLabel,
        contactLinkHref,
        subscribeLabel,
        subscribePlaceholder,
        subscribeButtonText,
        subscribeNote,
        subscribeSuccessMessage,
        copyright,
        seoTitle,
        seoTitleTemplate,
        seoDescription,
        ogImage { asset }
      }`,
      {},
      ["siteSettings"],
    );
  },
);

export async function getCareersPage(): Promise<SanityCareersPage | null> {
  return sanityFetch(
    `*[_type == "careersPage" && _id == "careersPage"][0] {
      heroLines,
      heroRevealLines,
      kicker,
      description,
      primaryCtaLabel,
      primaryCtaHref,
      secondaryCtaLabel,
      secondaryCtaHref
    }`,
    {},
    ["careersPage"],
  );
}

export async function getTeamPage(): Promise<SanityTeamPage | null> {
  return sanityFetch(
    `*[_type == "teamPage" && _id == "teamPage"][0] {
      heroLines,
      heroRevealLines,
      defaultTeamImage { asset }
    }`,
    {},
    ["teamPage"],
  );
}
