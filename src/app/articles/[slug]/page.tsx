import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetailPage from "@/components/ArticleDetailPage";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/articles";
import { normalizePathSegment } from "@/lib/slug";
import {
  getAllArticleSlugsFromSanityResult,
  getArticleBySlugFromSanityResult,
  getRelatedArticlesFromSanityResult,
} from "@/sanity/lib/queries";

type ArticleRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const sanitySlugs = await getAllArticleSlugsFromSanityResult();
  const allSlugs = sanitySlugs.ok ? sanitySlugs.data : getAllArticleSlugs();
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const pathSegment = normalizePathSegment(slug);
  const sanityArticle = await getArticleBySlugFromSanityResult(slug);
  const article = sanityArticle.ok
    ? sanityArticle.data
    : getArticleBySlug(pathSegment);

  if (!article) {
    notFound();
  }

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const image = article.ogImage || article.image;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, alt: article.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArticleRoute({ params }: ArticleRouteProps) {
  const { slug } = await params;
  const pathSegment = normalizePathSegment(slug);
  const sanityArticle = await getArticleBySlugFromSanityResult(slug);
  const article = sanityArticle.ok
    ? sanityArticle.data
    : getArticleBySlug(pathSegment);

  if (!article) {
    notFound();
  }

  const sanityRelated = sanityArticle.ok
    ? await getRelatedArticlesFromSanityResult(article.slug)
    : null;
  const relatedArticles = sanityRelated?.ok
    ? sanityRelated.data
    : getRelatedArticles(article.slug);

  return (
    <ArticleDetailPage
      article={article}
      relatedArticles={relatedArticles}
    />
  );
}
