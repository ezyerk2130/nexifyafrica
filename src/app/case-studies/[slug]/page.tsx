import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetailPage from "@/components/CaseStudyDetailPage";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
} from "@/data/caseStudies";

type CaseStudyRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Case Study" };
  }

  const overview = study.sections.find((section) => section.id === "overview");

  return {
    title: study.title,
    description: overview?.paragraphs[0] ?? study.title,
  };
}

export default async function CaseStudyRoute({ params }: CaseStudyRouteProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyDetailPage study={study} />;
}
