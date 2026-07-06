import { cache } from "react";
import type {
  ArticleDetail,
  ArticleSection,
  ArticleSummary,
  ArticleTone,
} from "@/data/articles";
import {
  caseStudyPathSegment,
  decodePathSegment,
  normalizePathSegment,
} from "@/lib/slug";
import { client } from "./client";
import { imageUrl } from "./image";

// ─── Shared fetch helper ──────────────────────────────────────────────────────

// Time-based ISR: every Sanity-backed page refreshes at most this often, so CMS
// edits appear automatically even when the Sanity webhook isn't configured.
// The webhook (/api/revalidate) still provides near-instant updates via tags.
const REVALIDATE_SECONDS = 60;

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: {
        tags: tags.length ? tags : ["sanity"],
        revalidate: REVALIDATE_SECONDS,
      },
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

export type SanityLoadResult<T> =
  | { ok: true; data: T }
  | { ok: false; data: null; error: unknown };

async function sanityFetchResult<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<SanityLoadResult<T>> {
  try {
    return { ok: true, data: await sanityFetch<T>(query, params, tags) };
  } catch (error) {
    return { ok: false, data: null, error };
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type SanityImageRef = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; width: number; height: number };
};

type SanityArticleImage = {
  asset?: Parameters<typeof imageUrl>[0];
  alt?: string | null;
  position?: string | null;
  variant?: "wide" | "half" | null;
};

export type SanityArticleContentBlock = {
  id?: { current?: string } | null;
  navLabel?: string | null;
  title?: string | null;
  paragraphs?: string[] | null;
  bullets?: string[] | null;
  image?: SanityArticleImage | null;
};

export type SanityArticle = {
  _id: string;
  title?: string | null;
  slug?: { current?: string } | null;
  category?: string | null;
  cardLabel?: string | null;
  publishedAt?: string | null;
  publishedLabel?: string | null;
  readTime?: string | null;
  author?: string | null;
  tone?: string | null;
  excerpt?: string | null;
  heroKicker?: string | null;
  mainImage?: SanityArticleImage | null;
  intro?: string | null;
  sections?: SanityArticleContentBlock[] | null;
  quote?: string | null;
  gallery?: SanityArticleImage[] | null;
  featured?: boolean | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  ogImage?: Parameters<typeof imageUrl>[0];
};

export type SanityCaseStudyCard = {
  _id: string;
  title: string;
  slug: { current: string };
  cardClient?: string | null;
  metric?: string | null;
  metricLabel?: string | null;
  cardImage?: { asset: { _ref: string; _type: "reference" } };
};

export type SanityCaseStudySidebar = {
  client: string;
  industry: string;
  services: string;
  projectDuration: string;
};

// Hero copy is authored as a single field; arrays are still accepted for
// backward compatibility with previously seeded multi-line content.
export type HeroText = string | string[];

export type SanityCaseStudyContentBlock = {
  id: { current: string };
  title: string;
  paragraphs?: string[] | null;
  bullets?: string[] | null;
  image?: {
    asset?: SanityImageRef["asset"] | null;
    alt?: string | null;
    variant?: "wide" | "square" | null;
  };
};

export type SanityCaseStudyDetail = {
  _id: string;
  title: string;
  slug: { current: string };
  heroLines: HeroText;
  heroRevealLines: HeroText;
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
  heroLines?: HeroText;
  heroRevealLines?: HeroText;
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
  // Build CTA
  buildCtaHeading?: string;
  buildCtaDescription?: string;
  buildCtaButtonText?: string;
  buildCtaButtonHref?: string;
  // Case studies page
  caseStudiesHeroLines?: HeroText;
  caseStudiesRevealLines?: HeroText;
};

// Portable Text block — a flexible catch-all for the blog-style manifesto body
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ManifestoPTBlock = Record<string, any>;

export type SanityManifestoPage = {
  heroLines?: HeroText;
  heroRevealLines?: HeroText;
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
  heroLines: HeroText;
  heroRevealLines: HeroText;
  visualHeadline: string;
  visualDescription: string;
  visualImage?: SanityImageRef;
  details: SanityContactDetail[];
  form?: SanityContactForm;
};

export type SanityTeamPage = {
  heroLines: HeroText;
  heroRevealLines: HeroText;
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
  heroLines?: HeroText;
  heroRevealLines?: HeroText;
  kicker?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export type SanityBlogPage = {
  kicker?: string;
  heading?: string;
  description?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  newsletterIdleText?: string;
  newsletterSuccessText?: string;
  readMoreLabel?: string;
};

// ─── Queries ──────────────────────────────────────────────────────────────────

const ARTICLE_IMAGE_FIELDS = `
  asset,
  alt,
  position
`;

const ARTICLE_SECTION_FIELDS = `
  id,
  navLabel,
  title,
  paragraphs,
  bullets,
  image {
    ${ARTICLE_IMAGE_FIELDS},
    variant
  }
`;

const ARTICLE_CARD_FIELDS = `
  _id,
  title,
  slug,
  category,
  cardLabel,
  publishedAt,
  readTime,
  tone,
  excerpt,
  mainImage { ${ARTICLE_IMAGE_FIELDS} }
`;

const ARTICLE_DETAIL_FIELDS = `
  ${ARTICLE_CARD_FIELDS},
  publishedLabel,
  author,
  heroKicker,
  intro,
  sections[] { ${ARTICLE_SECTION_FIELDS} },
  quote,
  gallery[] { ${ARTICLE_IMAGE_FIELDS} },
  featured,
  seoTitle,
  seoDescription,
  ogImage
`;

const FALLBACK_ARTICLE_IMAGE = "/images/manifesto/hero-collaboration.png";
const DEFAULT_ARTICLE_AUTHOR = "Nexify Africa";
const ARTICLE_TONES: ArticleTone[] = ["strategy", "systems", "product", "growth"];

const articleDateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function cleanText(value: string | null | undefined, fallback = "") {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function cleanTextList(values: string[] | null | undefined) {
  return (values ?? []).map((value) => value.trim()).filter(Boolean);
}

function formatArticleDate(value: string | null | undefined) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return value;
  return articleDateFormatter.format(date);
}

function articlePathSegment(value: string) {
  const normalized = normalizePathSegment(value);
  return normalized || encodeURIComponent(decodePathSegment(value).trim());
}

function normalizeArticleTone(value: string | null | undefined): ArticleTone {
  return ARTICLE_TONES.includes(value as ArticleTone) ? (value as ArticleTone) : "strategy";
}

function articleSlugFromSanity(article: SanityArticle) {
  const rawSlug = cleanText(article.slug?.current, cleanText(article.title));
  return rawSlug ? articlePathSegment(rawSlug) : "";
}

function sanityArticleMatchesPath(article: SanityArticle, pathSegment: string) {
  return [article.slug?.current, article.title]
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .some((value) => articlePathSegment(value) === pathSegment);
}

function toArticleSummary(article: SanityArticle): ArticleSummary | null {
  const title = cleanText(article.title);
  const slug = articleSlugFromSanity(article);
  if (!title || !slug) return null;

  const publishedLabel = cleanText(
    article.publishedLabel,
    formatArticleDate(article.publishedAt),
  );
  const image =
    imageUrl(article.mainImage?.asset, 1400) ??
    imageUrl(article.ogImage, 1400) ??
    FALLBACK_ARTICLE_IMAGE;

  return {
    slug,
    category: cleanText(article.category, "Article"),
    date: cleanText(article.cardLabel, publishedLabel || "Nexify note"),
    readTime: cleanText(article.readTime, "5 min read"),
    title,
    excerpt: cleanText(article.excerpt, cleanText(article.seoDescription, title)),
    image,
    alt: cleanText(article.mainImage?.alt, `${title} article image`),
    imagePosition: cleanText(article.mainImage?.position, "center"),
    tone: normalizeArticleTone(article.tone),
  };
}

function toArticleSection(section: SanityArticleContentBlock): ArticleSection | null {
  const title = cleanText(section.title);
  if (!title) return null;

  const idSource = cleanText(section.id?.current, title);
  const sectionBullets = cleanTextList(section.bullets);
  const imageSrc = imageUrl(section.image?.asset, 1200);

  return {
    id: articlePathSegment(idSource),
    navLabel: cleanText(section.navLabel, title),
    title,
    paragraphs: cleanTextList(section.paragraphs),
    bullets: sectionBullets.length ? sectionBullets : undefined,
    image: imageSrc
      ? {
          src: imageSrc,
          alt: cleanText(section.image?.alt, `${title} section image`),
          variant: section.image?.variant === "half" ? "half" : "wide",
          position: cleanText(section.image?.position, "center"),
        }
      : undefined,
  };
}

function toArticleDetail(article: SanityArticle): ArticleDetail | null {
  const summary = toArticleSummary(article);
  if (!summary) return null;

  const publishedLabel = cleanText(
    article.publishedLabel,
    formatArticleDate(article.publishedAt),
  );

  return {
    ...summary,
    heroKicker: cleanText(article.heroKicker, "Article Details"),
    publishedLabel: publishedLabel || summary.date,
    author: cleanText(article.author, DEFAULT_ARTICLE_AUTHOR),
    intro: cleanText(article.intro, summary.excerpt),
    sections: (article.sections ?? [])
      .map(toArticleSection)
      .filter((section): section is ArticleSection => section !== null),
    quote: cleanText(article.quote),
    gallery: (article.gallery ?? [])
      .map((galleryImage) => {
        const src = imageUrl(galleryImage.asset, 900);
        if (!src) return null;
        return {
          src,
          alt: cleanText(galleryImage.alt, `${summary.title} gallery image`),
          position: cleanText(galleryImage.position, "center"),
        };
      })
      .filter(
        (
          galleryImage,
        ): galleryImage is { src: string; alt: string; position: string } =>
          galleryImage !== null,
      ),
    seoTitle: cleanText(article.seoTitle),
    seoDescription: cleanText(article.seoDescription),
    ogImage: imageUrl(article.ogImage, 1400) ?? undefined,
  };
}

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

const CASE_STUDY_DETAIL_FIELDS = `
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
`;

export async function getArticleSummariesFromSanityResult(): Promise<
  SanityLoadResult<ArticleSummary[]>
> {
  const result = await sanityFetchResult<SanityArticle[]>(
    `*[_type == "article"] | order(featured desc, publishedAt desc, _createdAt desc) { ${ARTICLE_CARD_FIELDS} }`,
    {},
    ["article"],
  );

  if (!result.ok) return result;

  const articles = Array.isArray(result.data) ? result.data : [];
  return {
    ok: true,
    data: articles
      .map(toArticleSummary)
      .filter((article): article is ArticleSummary => article !== null),
  };
}

export async function getArticleSummariesFromSanity(): Promise<ArticleSummary[]> {
  const result = await getArticleSummariesFromSanityResult();
  if (!result.ok) throw result.error;
  return result.data;
}

export async function getAllArticleSlugsFromSanityResult(): Promise<
  SanityLoadResult<string[]>
> {
  const result = await sanityFetchResult<SanityArticle[]>(
    `*[_type == "article"] { _id, title, slug }`,
    {},
    ["article"],
  );

  if (!result.ok) return result;

  const articles = Array.isArray(result.data) ? result.data : [];
  return {
    ok: true,
    data: articles.map(articleSlugFromSanity).filter(Boolean),
  };
}

export async function getAllArticleSlugsFromSanity(): Promise<string[]> {
  const result = await getAllArticleSlugsFromSanityResult();
  if (!result.ok) throw result.error;
  return result.data;
}

function uniqueArticleSlugCandidates(slug: string): string[] {
  const decoded = decodePathSegment(slug);
  const encoded = encodeURIComponent(decoded);
  const normalized = normalizePathSegment(decoded);
  return Array.from(new Set([slug, decoded, encoded, normalized])).filter(Boolean);
}

export async function getArticleBySlugFromSanityResult(
  slug: string,
): Promise<SanityLoadResult<ArticleDetail | null>> {
  const slugCandidates = uniqueArticleSlugCandidates(slug);

  const result = await sanityFetchResult<SanityArticle | null>(
    `*[_type == "article" && slug.current in $slugs][0] { ${ARTICLE_DETAIL_FIELDS} }`,
    { slugs: slugCandidates },
    ["article"],
  );

  if (!result.ok) return result;
  if (result.data) {
    return { ok: true, data: toArticleDetail(result.data) };
  }

  const normalizedPathSegment = articlePathSegment(slug);
  const fallbackResult = await sanityFetchResult<SanityArticle[]>(
    `*[_type == "article"] | order(featured desc, publishedAt desc, _createdAt desc) { ${ARTICLE_DETAIL_FIELDS} }`,
    {},
    ["article"],
  );

  if (!fallbackResult.ok) return fallbackResult;

  const fallbackArticles = Array.isArray(fallbackResult.data)
    ? fallbackResult.data
    : [];
  const matchedArticle =
    fallbackArticles.find((article) =>
      sanityArticleMatchesPath(article, normalizedPathSegment),
    ) ?? null;

  return { ok: true, data: matchedArticle ? toArticleDetail(matchedArticle) : null };
}

export async function getArticleBySlugFromSanity(
  slug: string,
): Promise<ArticleDetail | null> {
  const result = await getArticleBySlugFromSanityResult(slug);
  if (!result.ok) throw result.error;
  return result.data;
}

export async function getRelatedArticlesFromSanityResult(
  slug: string,
  limit = 3,
): Promise<SanityLoadResult<ArticleSummary[]>> {
  const slugCandidates = uniqueArticleSlugCandidates(slug);
  const result = await sanityFetchResult<SanityArticle[]>(
    `*[_type == "article" && !(slug.current in $slugs)] | order(featured desc, publishedAt desc, _createdAt desc) { ${ARTICLE_CARD_FIELDS} }`,
    { slugs: slugCandidates },
    ["article"],
  );

  if (!result.ok) return result;

  const articles = Array.isArray(result.data) ? result.data : [];
  return {
    ok: true,
    data: articles
      .map(toArticleSummary)
      .filter((article): article is ArticleSummary => article !== null)
      .slice(0, limit),
  };
}

export async function getRelatedArticlesFromSanity(
  slug: string,
  limit = 3,
): Promise<ArticleSummary[]> {
  const result = await getRelatedArticlesFromSanityResult(slug, limit);
  if (!result.ok) throw result.error;
  return result.data;
}

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
    .filter((s): s is string => typeof s === "string" && s.length > 0)
    .map(caseStudyPathSegment);
}

function uniqueCaseStudySlugCandidates(slug: string): string[] {
  const decoded = decodePathSegment(slug);
  const encoded = encodeURIComponent(decoded);
  return Array.from(new Set([slug, decoded, encoded])).filter(Boolean);
}

function matchesCaseStudyPath(study: SanityCaseStudyDetail, pathSegment: string) {
  return [study.slug?.current, study.title]
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .some((value) => caseStudyPathSegment(value) === pathSegment);
}

export async function getCaseStudyBySlugFromSanity(
  slug: string,
): Promise<SanityCaseStudyDetail | null> {
  const slugCandidates = uniqueCaseStudySlugCandidates(slug);

  const result = await sanityFetch<SanityCaseStudyDetail | null>(
    `*[_type == "caseStudy" && slug.current in $slugs][0] { ${CASE_STUDY_DETAIL_FIELDS} }`,
    { slugs: slugCandidates },
    ["caseStudy"],
  );
  if (result) return result;

  const normalizedPathSegment = caseStudyPathSegment(slug);
  const fallbackResults = await sanityFetchList<SanityCaseStudyDetail>(
    `*[_type == "caseStudy"] { ${CASE_STUDY_DETAIL_FIELDS} }`,
    {},
    ["caseStudy"],
  );

  return (
    fallbackResults.find((study) =>
      matchesCaseStudyPath(study, normalizedPathSegment),
    ) ?? null
  );
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
      buildCtaHeading,
      buildCtaDescription,
      buildCtaButtonText,
      buildCtaButtonHref,
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

export async function getBlogPage(): Promise<SanityBlogPage | null> {
  return sanityFetch(
    `*[_type == "blogPage" && _id == "blogPage"][0] {
      kicker,
      heading,
      description,
      newsletterPlaceholder,
      newsletterButtonText,
      newsletterIdleText,
      newsletterSuccessText,
      readMoreLabel
    }`,
    {},
    ["blogPage"],
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
