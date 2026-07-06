"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import {
  ARTICLES,
  articlePath,
  type ArticleSummary,
} from "@/data/articles";
import { useBatchReveal } from "@/hooks/useBatchReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

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

type BlogPageSettings = {
  kicker: string;
  heading: string;
  description: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterIdleText: string;
  newsletterSuccessText: string;
  readMoreLabel: string;
};

const DEFAULT_BLOG_PAGE_SETTINGS: BlogPageSettings = {
  kicker: "Blog Page",
  heading: "Insights that help you build, grow, and scale smarter",
  description:
    "Practical notes on product strategy, automation, analytics, and the operating systems that help ambitious teams move with more confidence.",
  newsletterPlaceholder: "Enter your email address",
  newsletterButtonText: "Subscribe",
  newsletterIdleText: "Monthly notes. No noise.",
  newsletterSuccessText: "Thanks. The next Nexify note is on its way.",
  readMoreLabel: "Read More",
};

function ArticleCard({
  article,
  index,
  readMoreLabel,
}: {
  article: ArticleSummary;
  index: number;
  readMoreLabel: string;
}) {
  return (
    <article id={article.slug} className="articles-card articles-reveal">
      <Link
        className="articles-card-link"
        href={articlePath(article.slug)}
        aria-label={`Read ${article.title}`}
      >
        <div className="articles-card-media">
          <Image
            src={article.image}
            alt={article.alt}
            fill
            className="articles-card-image"
            sizes="(min-width: 1180px) 31vw, (min-width: 768px) 46vw, 100vw"
            preload={index < 2}
            style={{ objectPosition: article.imagePosition ?? "center" }}
          />
          <span className={`articles-card-chip articles-card-chip--${article.tone}`}>
            {article.category}
          </span>
        </div>
        <div className="articles-card-body">
          <div className="articles-card-meta">
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <span className="articles-card-cta">
            {readMoreLabel}
            <ArrowIcon className="articles-card-arrow" />
          </span>
        </div>
      </Link>
    </article>
  );
}

type ArticlesPageProps = {
  articles?: ArticleSummary[];
  settings?: Partial<Record<keyof BlogPageSettings, string | null>> | null;
};

function normalizeBlogPageSettings(
  settings?: Partial<Record<keyof BlogPageSettings, string | null>> | null,
): BlogPageSettings {
  return {
    kicker: settings?.kicker?.trim() || DEFAULT_BLOG_PAGE_SETTINGS.kicker,
    heading: settings?.heading?.trim() || DEFAULT_BLOG_PAGE_SETTINGS.heading,
    description:
      settings?.description?.trim() || DEFAULT_BLOG_PAGE_SETTINGS.description,
    newsletterPlaceholder:
      settings?.newsletterPlaceholder?.trim() ||
      DEFAULT_BLOG_PAGE_SETTINGS.newsletterPlaceholder,
    newsletterButtonText:
      settings?.newsletterButtonText?.trim() ||
      DEFAULT_BLOG_PAGE_SETTINGS.newsletterButtonText,
    newsletterIdleText:
      settings?.newsletterIdleText?.trim() ||
      DEFAULT_BLOG_PAGE_SETTINGS.newsletterIdleText,
    newsletterSuccessText:
      settings?.newsletterSuccessText?.trim() ||
      DEFAULT_BLOG_PAGE_SETTINGS.newsletterSuccessText,
    readMoreLabel:
      settings?.readMoreLabel?.trim() || DEFAULT_BLOG_PAGE_SETTINGS.readMoreLabel,
  };
}

export default function ArticlesPage({
  articles = ARTICLES,
  settings: settingsOverride,
}: ArticlesPageProps) {
  const settings = normalizeBlogPageSettings(settingsOverride);
  const pageRef = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const page = pageRef.current;
      if (!page) return;

      const heroItems = gsap.utils.toArray<HTMLElement>(
        ".articles-hero-reveal",
        page,
      );
      const cardImages = gsap.utils.toArray<HTMLElement>(
        ".articles-card-image",
        page,
      );

      const setSettledState = () => {
        gsap.set(heroItems, { autoAlpha: 1, y: 0 });
        gsap.set(cardImages, { "--articles-card-image-y": "0px" });
      };

      if (prefersReducedMotion) {
        setSettledState();
        return;
      }

      try {
        gsap.fromTo(
          heroItems,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
            ease: "power4.out",
          },
        );

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          cardImages.forEach((image, index) => {
            const direction = index % 2 === 0 ? 1 : -1;

            gsap.fromTo(
              image,
              { "--articles-card-image-y": `${-8 * direction}px` },
              {
                "--articles-card-image-y": `${8 * direction}px`,
                ease: "none",
                scrollTrigger: {
                  trigger: image.closest(".articles-card") ?? image,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                },
              },
            );
          });

          const refreshFrame = window.requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });

          return () => {
            window.cancelAnimationFrame(refreshFrame);
          };
        });

        return () => {
          mm.revert();
        };
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("[ArticlesPage] Animation unavailable:", error);
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
    scopeRef: indexRef,
    targets: ".articles-reveal",
    disabled: prefersReducedMotion,
    y: 46,
    start: "top 88%",
    duration: 0.9,
    stagger: 0.08,
  });

  return (
    <>
      <div className="articles-shell">
        <SiteNav variant="light" className="articles-site-nav" />
      </div>
      <main ref={pageRef} className="articles-page">
        <section className="articles-hero" aria-labelledby="articles-heading">
          <div className="articles-hero-inner">
            <h1
              id="articles-heading"
              className="articles-hero-title articles-hero-reveal"
            >
              {settings.heading}
            </h1>
            <p className="articles-hero-copy articles-hero-reveal">
              {settings.description}
            </p>
          </div>
        </section>

        <section
          ref={indexRef}
          className="articles-index"
          aria-labelledby="articles-index-heading"
        >
          <div className="articles-index-inner">
            <h2 id="articles-index-heading" className="sr-only">
              Latest articles
            </h2>

            <div className="articles-grid" aria-label="Latest articles">
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  index={index}
                  readMoreLabel={settings.readMoreLabel}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
