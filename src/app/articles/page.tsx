import type { Metadata } from "next";
import ArticlesPage from "@/components/ArticlesPage";
import { ARTICLES } from "@/data/articles";
import {
  getArticleSummariesFromSanityResult,
  getBlogPage,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Articles and field notes from Nexify Africa on product strategy, automation, analytics, and digital growth.",
};

export default async function ArticlesRoute() {
  const [articleResult, blogPage] = await Promise.all([
    getArticleSummariesFromSanityResult(),
    getBlogPage().catch(() => null),
  ]);
  const articles = articleResult.ok ? articleResult.data : ARTICLES;

  return <ArticlesPage articles={articles} settings={blogPage} />;
}
