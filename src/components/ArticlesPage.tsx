"use client";

import { type FormEvent, useRef, useState } from "react";
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
import { gsap, useGSAP } from "@/lib/gsap";

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

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.75 4.25H13.25V11.75H2.75V4.25Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M3 4.5L8 8.35L13 4.5"
        stroke="currentColor"
        strokeWidth="1.2"
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

function NewsletterForm({
  compact = false,
  settings,
}: {
  compact?: boolean;
  settings: BlogPageSettings;
}) {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <div
      className={compact ? "articles-newsletter is-compact" : "articles-newsletter"}
    >
      <form onSubmit={handleSubmit} className="articles-newsletter-form">
        <label
          className="sr-only"
          htmlFor={compact ? "article-email-compact" : "article-email"}
        >
          Email address
        </label>
        <div className="articles-newsletter-field">
          <span className="articles-newsletter-icon">
            <MailIcon />
          </span>
          <input
            id={compact ? "article-email-compact" : "article-email"}
            type="email"
            required
            placeholder={settings.newsletterPlaceholder}
            className="articles-newsletter-input"
          />
        </div>
        <button type="submit" className="articles-newsletter-button">
          <span>{settings.newsletterButtonText}</span>
          <ArrowIcon />
        </button>
      </form>
      <p className="articles-newsletter-status" aria-live="polite">
        {subscribed
          ? settings.newsletterSuccessText
          : settings.newsletterIdleText}
      </p>
    </div>
  );
}

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

      const setSettledState = () => {
        gsap.set(heroItems, { autoAlpha: 1, y: 0 });
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
          <p className="articles-kicker articles-hero-reveal">
            <span aria-hidden="true" />
            {settings.kicker}
          </p>
          <h1 id="articles-heading" className="articles-hero-title articles-hero-reveal">
            {settings.heading}
          </h1>
          <p className="articles-hero-copy articles-hero-reveal">
            {settings.description}
          </p>
          <div className="articles-hero-reveal">
            <NewsletterForm settings={settings} />
          </div>
        </div>
      </section>

      <section ref={indexRef} className="articles-index" aria-labelledby="articles-index-heading">
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
