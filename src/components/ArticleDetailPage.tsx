"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import {
  articlePath,
  type ArticleDetail,
  type ArticleSection,
  type ArticleSummary,
} from "@/data/articles";
import { useBatchReveal } from "@/hooks/useBatchReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type ArticleDetailPageProps = {
  article: ArticleDetail;
  relatedArticles: ArticleSummary[];
};

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4.25 2.5V4.5M11.75 2.5V4.5M2.75 6.25H13.25M3.25 4H12.75C13.3023 4 13.75 4.44772 13.75 5V12.25C13.75 12.8023 13.3023 13.25 12.75 13.25H3.25C2.69772 13.25 2.25 12.8023 2.25 12.25V5C2.25 4.44772 2.69772 4 3.25 4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M8 4.75V8.25L10.35 9.65"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M9.12 14.25V8.77h1.84l.35-2.27H9.12V5.03c0-.62.3-1.22 1.28-1.22h1V1.88s-.9-.15-1.76-.15c-1.8 0-2.97 1.09-2.97 3.06V6.5h-2v2.27h2v5.48h2.45Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4.08 5.72H1.86V14h2.22V5.72ZM4.27 3.16c0-.72-.53-1.27-1.3-1.27s-1.3.55-1.3 1.27c0 .7.51 1.27 1.27 1.27h.02c.78 0 1.31-.57 1.31-1.27ZM14.33 9.25c0-2.54-1.35-3.72-3.16-3.72-1.46 0-2.11.8-2.48 1.36V5.72H6.47c.03.78 0 8.28 0 8.28h2.22V9.38c0-.25.02-.49.09-.67.18-.49.61-1 1.32-1 .93 0 1.31.75 1.31 1.84V14h2.22V9.25h.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M9.28 6.92 14.02 1.5h-1.12L8.78 6.2 5.5 1.5H1.7l4.97 7.12L1.7 14.3h1.12l4.34-4.96 3.46 4.96h3.8L9.28 6.92Zm-1.54 1.75-.5-.7-4-5.66h1.72l3.23 4.58.5.7 4.2 5.96h-1.72L7.74 8.67Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.5 8H12.5M12.5 8L8.75 4.25M12.5 8L8.75 11.75"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareLinks({ article }: { article: ArticleDetail }) {
  const path = articlePath(article.slug);
  const encodedTitle = encodeURIComponent(article.title);
  const encodedPath = encodeURIComponent(path);

  return (
    <div className="article-detail-share" aria-label="Share this article">
      <span>Share this post</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedPath}`}
        aria-label="Share on Facebook"
        target="_blank"
        rel="noreferrer"
      >
        <FacebookIcon />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedPath}&title=${encodedTitle}`}
        aria-label="Share on LinkedIn"
        target="_blank"
        rel="noreferrer"
      >
        <LinkedInIcon />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedPath}`}
        aria-label="Share on X"
        target="_blank"
        rel="noreferrer"
      >
        <XIcon />
      </a>
    </div>
  );
}

function SectionImage({
  image,
}: {
  image: NonNullable<ArticleSection["image"]>;
}) {
  return (
    <figure className={`article-detail-section-image is-${image.variant ?? "wide"}`}>
      <div className="article-detail-section-image-frame">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="eager"
          className="article-detail-section-img"
          sizes="(min-width: 1024px) 760px, 100vw"
          style={{ objectPosition: image.position ?? "center" }}
        />
      </div>
    </figure>
  );
}

function ArticleBodySection({ section }: { section: ArticleSection }) {
  return (
    <section
      id={section.id}
      className="article-detail-section article-detail-reveal"
      aria-labelledby={`${section.id}-heading`}
    >
      <h2 id={`${section.id}-heading`}>{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {section.bullets?.length ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {section.image ? <SectionImage image={section.image} /> : null}
    </section>
  );
}

function RelatedArticleCard({
  article,
}: {
  article: ArticleSummary;
}) {
  return (
    <article className="article-detail-related-card article-detail-reveal">
      <Link href={articlePath(article.slug)} aria-label={`Read ${article.title}`}>
        <div className="article-detail-related-media">
          <Image
            src={article.image}
            alt={article.alt}
            fill
            loading="eager"
            className="article-detail-related-img"
            sizes="(min-width: 1024px) 31vw, 100vw"
            style={{ objectPosition: article.imagePosition ?? "center" }}
          />
          <span>{article.category}</span>
        </div>
        <div className="article-detail-related-body">
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <span className="article-detail-related-link">
            Read More
            <ArrowIcon />
          </span>
        </div>
      </Link>
    </article>
  );
}

function ArticleSidebar({ article }: { article: ArticleDetail }) {
  return (
    <aside className="article-detail-toc article-detail-reveal" aria-label="Article sidebar">
      <div className="article-detail-author-card">
        <div className="article-detail-author-mark" aria-hidden="true">
          N
        </div>
        <div>
          <span>Author</span>
          <strong>{article.author}</strong>
        </div>
      </div>

      <div className="article-detail-toc-card">
        <p>Content</p>
        <nav>
          {article.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.navLabel}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default function ArticleDetailPage({
  article,
  relatedArticles,
}: ArticleDetailPageProps) {
  const pageRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const page = pageRef.current;
      if (!page) return;

      const heroItems = gsap.utils.toArray<HTMLElement>(
        ".article-detail-hero-reveal",
        page,
      );

      const setSettledState = () => {
        gsap.set(heroItems, { autoAlpha: 1, y: 0 });
        gsap.set(".article-detail-hero-img", {
          yPercent: 0,
          scale: 1,
          clearProps: "transform",
        });
      };

      if (prefersReducedMotion) {
        setSettledState();
        return;
      }

      try {
        gsap.fromTo(
          heroItems,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.08,
            ease: "power4.out",
          },
        );

        gsap.fromTo(
          ".article-detail-hero-img",
          { yPercent: -4, scale: 1.05 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: ".article-detail-hero-media",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        const refreshFrame = window.requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });

        return () => {
          window.cancelAnimationFrame(refreshFrame);
        };
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("[ArticleDetailPage] Animation unavailable:", error);
        }
        setSettledState();
      }
    },
    {
      scope: pageRef,
      dependencies: [prefersReducedMotion],
      revertOnUpdate: true,
    },
  );

  useBatchReveal({
    scopeRef: contentRef,
    targets: ".article-detail-reveal",
    disabled: prefersReducedMotion,
    y: 42,
    start: "top 88%",
    duration: 0.85,
    stagger: 0.07,
  });

  return (
    <>
      <div className="article-detail-shell">
        <SiteNav variant="light" className="article-detail-site-nav" />

        <main ref={pageRef} className="article-detail-page">
          <section className="article-detail-hero" aria-labelledby="article-detail-heading">
            <div className="article-detail-hero-inner">
              <p className="article-detail-kicker article-detail-hero-reveal">
                <span aria-hidden="true" />
                {article.heroKicker}
              </p>
              <h1 id="article-detail-heading" className="article-detail-hero-reveal">
                {article.title}
              </h1>
              <p className="article-detail-dek article-detail-hero-reveal">
                {article.excerpt}
              </p>

              <div className="article-detail-meta-row article-detail-hero-reveal">
                <div className="article-detail-meta-list">
                  <span>
                    <CalendarIcon />
                    {article.publishedLabel}
                  </span>
                  <span>
                    <ClockIcon />
                    {article.readTime}
                  </span>
                </div>
                <ShareLinks article={article} />
              </div>

              <figure className="article-detail-hero-media article-detail-hero-reveal">
                <Image
                  src={article.image}
                  alt={article.alt}
                  fill
                  className="article-detail-hero-img"
                  sizes="(min-width: 1280px) 1320px, (min-width: 1024px) calc(100vw - 96px), 100vw"
                  preload
                  style={{ objectPosition: article.imagePosition ?? "center" }}
                />
              </figure>
            </div>
          </section>

          <section ref={contentRef} className="article-detail-content-wrap">
            <div className="article-detail-content-inner">
              <ArticleSidebar article={article} />

              <article className="article-detail-prose">
                <p className="article-detail-intro article-detail-reveal">
                  {article.intro}
                </p>

                {article.sections.map((section) => (
                  <div key={section.id}>
                    <ArticleBodySection section={section} />
                    {section.id === "mistakes" && article.quote ? (
                      <blockquote className="article-detail-quote article-detail-reveal">
                        <p>{article.quote}</p>
                      </blockquote>
                    ) : null}
                    {section.id === "roadmap" && article.gallery.length ? (
                      <div className="article-detail-gallery article-detail-reveal">
                        {article.gallery.map((image) => (
                          <figure key={image.alt}>
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              loading="lazy"
                              className="article-detail-gallery-img"
                              sizes="(min-width: 1024px) 380px, 50vw"
                              style={{ objectPosition: image.position ?? "center" }}
                            />
                          </figure>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </article>
            </div>

            <section className="article-detail-related" aria-labelledby="article-related-heading">
              <div className="article-detail-related-header article-detail-reveal">
                <p>
                  <span aria-hidden="true" />
                  Articles
                </p>
                <div>
                  <h2 id="article-related-heading">News and insights from our team</h2>
                  <Link href="/articles" className="site-button site-button--blue article-detail-related-button">
                    View all articles
                    <ArrowIcon />
                  </Link>
                </div>
              </div>

              <div className="article-detail-related-grid">
                {relatedArticles.map((relatedArticle) => (
                  <RelatedArticleCard
                    key={relatedArticle.slug}
                    article={relatedArticle}
                  />
                ))}
              </div>
            </section>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
