"use client";

import Image from "next/image";
import CaseStudyHero from "@/components/CaseStudyHero";
import Footer from "@/components/Footer";
import type { CaseStudyContentBlock, CaseStudyDetail } from "@/data/caseStudies";

const LAYOUT_INNER =
  "mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12";

type CaseStudyDetailPageProps = {
  study: CaseStudyDetail;
};

function CaseStudySectionImage({
  image,
}: {
  image: NonNullable<CaseStudyContentBlock["image"]>;
}) {
  const isWide = image.variant === "wide";

  return (
    <figure
      className={
        isWide
          ? "case-study-section-image case-study-section-image--wide"
          : "case-study-section-image case-study-section-image--square"
      }
    >
      <div
        className={
          isWide
            ? "case-study-section-image-frame case-study-section-image-frame--wide"
            : "case-study-section-image-frame case-study-section-image-frame--square"
        }
      >
        {image.src ? (
          <Image
            src={image.src}
            alt={image.alt ?? "Case study image"}
            fill
            className="object-cover object-center"
            sizes={
              isWide
                ? "(max-width: 1024px) 100vw, 720px"
                : "(max-width: 1024px) 100vw, 608px"
            }
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-neutral-100"
            aria-hidden="true"
          >
            <span className="text-sm text-neutral-400">Image placeholder</span>
          </div>
        )}
      </div>
      {image.alt ? (
        <figcaption className="sr-only">{image.alt}</figcaption>
      ) : null}
    </figure>
  );
}

function CaseStudyContentSection({ section }: { section: CaseStudyContentBlock }) {
  return (
    <section
      id={section.id}
      className="case-study-content-section"
      aria-labelledby={`${section.id}-heading`}
    >
      <h2 id={`${section.id}-heading`} className="case-study-content-heading">
        {section.title}
      </h2>

      <div className="case-study-section-body">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph} className="case-study-detail-body">
            {paragraph}
          </p>
        ))}

        {section.bullets?.length ? (
          <ul className="case-study-bullet-list">
            {section.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {section.image ? <CaseStudySectionImage image={section.image} /> : null}
      </div>
    </section>
  );
}

export default function CaseStudyDetailPage({ study }: CaseStudyDetailPageProps) {
  const { sidebar, sections } = study;

  return (
    <>
      <CaseStudyHero
        lines={study.heroLines}
        revealLines={study.heroRevealLines}
      />

      <main className="case-study-detail bg-[#F4F6F8] text-neutral-900">
        <div className={`case-study-detail-layout ${LAYOUT_INNER}`}>
          <aside
            className="case-study-sidebar"
            aria-label="Project details"
          >
            <div className="case-study-sidebar-card">
              <dl className="case-study-sidebar-list">
                <div className="case-study-sidebar-item">
                  <dt className="case-study-sidebar-label">Client</dt>
                  <dd className="case-study-sidebar-value">{sidebar.client}</dd>
                </div>
                <div className="case-study-sidebar-item">
                  <dt className="case-study-sidebar-label">Industry</dt>
                  <dd className="case-study-sidebar-value">{sidebar.industry}</dd>
                </div>
                <div className="case-study-sidebar-item">
                  <dt className="case-study-sidebar-label">Services</dt>
                  <dd className="case-study-sidebar-value">{sidebar.services}</dd>
                </div>
                <div className="case-study-sidebar-item case-study-sidebar-item--last">
                  <dt className="case-study-sidebar-label">Project Duration</dt>
                  <dd className="case-study-sidebar-value">
                    {sidebar.projectDuration}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="case-study-content">
            {sections.map((section) => (
              <CaseStudyContentSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
