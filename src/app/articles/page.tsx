import type { Metadata } from "next";
import ArticlesPage from "@/components/ArticlesPage";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Articles and field notes from Nexify Africa on product strategy, automation, analytics, and digital growth.",
};

export default function ArticlesRoute() {
  return <ArticlesPage />;
}
