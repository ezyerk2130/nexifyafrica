import type { Metadata } from "next";
import ArticlesPage from "@/components/ArticlesPage";
import { ARTICLES } from "@/data/articles";
import {
  getArticleSummariesFromSanity,
  getBlogPage,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Articles and field notes from Nexify Africa on product strategy, automation, analytics, and digital growth.",
};

export default async function ArticlesRoute() {
  const [sanityArticles, blogPage] = await Promise.all([
    getArticleSummariesFromSanity().catch(() => []),
    getBlogPage().catch(() => null),
  ]);
  const articles = sanityArticles.length > 0 ? sanityArticles : ARTICLES;

  return <ArticlesPage articles={articles} settings={blogPage} />;
}
