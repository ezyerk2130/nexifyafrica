import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetailPage from "@/components/CaseStudyDetailPage";
import { imageUrl } from "@/sanity/lib/image";
import {
  getAllCaseStudySlugsFromSanity,
  getCaseStudyBySlugFromSanity,
} from "@/sanity/lib/queries";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
  type CaseStudyDetail,
} from "@/data/caseStudies";

type CaseStudyRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const sanitySlugs = await getAllCaseStudySlugsFromSanity().catch(() => []);
  const localSlugs = getAllCaseStudySlugs();
  const all = Array.from(new Set([...sanitySlugs, ...localSlugs]));
  return all.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyRouteProps): Promise<Metadata> {
  const { slug } = await params;

  const sanityStudy = await getCaseStudyBySlugFromSanity(slug).catch(() => null);
  if (sanityStudy?.slug?.current) {
    const overview = sanityStudy.sections?.find((s) => s.id?.current === "overview");
    return {
      title: sanityStudy.title,
      description: overview?.paragraphs?.[0] ?? sanityStudy.title,
    };
  }

  const localStudy = getCaseStudyBySlug(slug);
  if (localStudy) {
    const overview = localStudy.sections.find((s) => s.id === "overview");
    return {
      title: localStudy.title,
      description: overview?.paragraphs[0] ?? localStudy.title,
    };
  }

  notFound();
}

export default async function CaseStudyRoute({ params }: CaseStudyRouteProps) {
  const { slug } = await params;

  // Try Sanity first, then fall back to local static data
  const sanityStudy = await getCaseStudyBySlugFromSanity(slug).catch(() => null);

  let study: CaseStudyDetail | undefined;

  // Use Sanity only when it returns a usable slug; otherwise fall back to local data.
  if (sanityStudy?.slug?.current) {
    study = {
      slug: sanityStudy.slug.current,
      title: sanityStudy.title,
      heroLines: sanityStudy.heroLines ?? [],
      heroRevealLines: sanityStudy.heroRevealLines ?? [],
      sidebar: {
        client: sanityStudy.sidebar?.client ?? "",
        industry: sanityStudy.sidebar?.industry ?? "",
        services: sanityStudy.sidebar?.services ?? "",
        projectDuration: sanityStudy.sidebar?.projectDuration ?? "",
      },
      sections: (sanityStudy.sections ?? []).map((section) => {
        const src = imageUrl(section.image?.asset);
        return {
          id: section.id?.current ?? (section.id as unknown as string),
          title: section.title,
          paragraphs: section.paragraphs ?? [],
          bullets: section.bullets,
          image: src
            ? {
                src,
                alt: section.image?.alt,
                variant: section.image?.variant ?? "wide",
              }
            : undefined,
        };
      }),
    };
  } else {
    study = getCaseStudyBySlug(slug);
  }

  if (!study) {
    notFound();
  }

  return <CaseStudyDetailPage study={study} />;
}
