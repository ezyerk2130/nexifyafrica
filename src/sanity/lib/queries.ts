import { client } from "./client";

// ─── Shared fetch helper ──────────────────────────────────────────────────────

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { tags: tags.length ? tags : ["sanity"] },
  });
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
  servicesHeading: string;
  principlesHeadingBefore: string;
  principlesHeadingHighlight: string;
  principlesHeadingAfter: string;
};

export type SanityManifestoBlock = {
  type: "paragraph" | "list" | "ordered-list" | "pullquote";
  text?: string;
  items?: string[];
};

export type SanityManifestoSection = {
  id: { current: string };
  label: string;
  blocks: SanityManifestoBlock[];
  imageAfter?: boolean;
  image?: SanityImageRef;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
};

export type SanityManifestoPage = {
  heroLines: string[];
  heroRevealLines: string[];
  title: string;
  kicker: string;
  lead: string;
  sections: SanityManifestoSection[];
};

export type SanityContactDetail = {
  id: string;
  title: string;
  lines: string[];
  href?: string;
};

export type SanityContactPage = {
  heroLines: string[];
  heroRevealLines: string[];
  visualHeadline: string;
  visualDescription: string;
  visualImage?: SanityImageRef;
  details: SanityContactDetail[];
};

export type SanityTeamPage = {
  heroLines: string[];
  heroRevealLines: string[];
  defaultTeamImage?: SanityImageRef;
};

// ─── Queries ──────────────────────────────────────────────────────────────────

const CASE_STUDY_CARD_FIELDS = `
  _id,
  title,
  slug,
  cardClient,
  metric,
  metricLabel
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
  return sanityFetch(
    `*[_type == "caseStudy"] | order(title asc) { ${CASE_STUDY_CARD_FIELDS} }`,
    {},
    ["caseStudy"],
  );
}

export async function getAllCaseStudySlugsFromSanity(): Promise<string[]> {
  const results = await sanityFetch<Array<{ slug: { current: string } }>>(
    `*[_type == "caseStudy"] { slug }`,
    {},
    ["caseStudy"],
  );
  return results.map((r) => r.slug.current);
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
  return sanityFetch(
    `*[_type == "service"] | order(order asc) { _id, number, title, description, order }`,
    {},
    ["service"],
  );
}

export async function getFaqItems(): Promise<SanityFaqItem[]> {
  return sanityFetch(
    `*[_type == "faqItem"] | order(order asc) { _id, question, answer, order }`,
    {},
    ["faqItem"],
  );
}

export async function getPrinciples(): Promise<SanityPrinciple[]> {
  return sanityFetch(
    `*[_type == "principle"] | order(order asc) { _id, icon, title, description, order }`,
    {},
    ["principle"],
  );
}

export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  return sanityFetch(
    `*[_type == "teamMember"] | order(order asc) { _id, name, role, portrait, order }`,
    {},
    ["teamMember"],
  );
}

export async function getHomePage(): Promise<SanityHomePage | null> {
  return sanityFetch(
    `*[_type == "homePage" && _id == "homePage"][0] {
      servicesHeading,
      principlesHeadingBefore,
      principlesHeadingHighlight,
      principlesHeadingAfter
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
      sections[] {
        id,
        label,
        blocks[] { type, text, items },
        imageAfter,
        image { asset },
        imageAlt,
        imageFit
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
      details[] { id, title, lines, href }
    }`,
    {},
    ["contactPage"],
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
