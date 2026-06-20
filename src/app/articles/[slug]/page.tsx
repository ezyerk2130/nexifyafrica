import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetailPage from "@/components/ArticleDetailPage";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/articles";
import { normalizePathSegment } from "@/lib/slug";

type ArticleRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(normalizePathSegment(slug));

  if (!article) {
    notFound();
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticleRoute({ params }: ArticleRouteProps) {
  const { slug } = await params;
  const article = getArticleBySlug(normalizePathSegment(slug));

  if (!article) {
    notFound();
  }

  return (
    <ArticleDetailPage
      article={article}
      relatedArticles={getRelatedArticles(article.slug)}
    />
  );
}
