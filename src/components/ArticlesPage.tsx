"use client";

import { type FormEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

function NewsletterForm({ compact = false }: { compact?: boolean }) {
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
            placeholder="Enter your email address"
            className="articles-newsletter-input"
          />
        </div>
        <button type="submit" className="articles-newsletter-button">
          <span>Subscribe</span>
          <ArrowIcon />
        </button>
      </form>
      <p className="articles-newsletter-status" aria-live="polite">
        {subscribed
          ? "Thanks. The next Nexify note is on its way."
          : "Monthly notes. No noise."}
      </p>
    </div>
  );
}

function ArticleCard({
  article,
  index,
}: {
  article: ArticleSummary;
  index: number;
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
            priority={index < 2}
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
            Read more
            <ArrowIcon className="articles-card-arrow" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function ArticlesPage() {
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
    <main ref={pageRef} className="articles-page">
      <section className="articles-hero" aria-labelledby="articles-heading">
        <div className="articles-hero-inner">
          <p className="articles-kicker articles-hero-reveal">
            <span aria-hidden="true" />
            Articles
          </p>
          <h1 id="articles-heading" className="articles-hero-title articles-hero-reveal">
            Clear thinking for teams building Africa&apos;s next digital advantage.
          </h1>
          <p className="articles-hero-copy articles-hero-reveal">
            Practical notes on product strategy, automation, analytics, and the operating
            systems that help ambitious teams move with more confidence.
          </p>
          <div className="articles-hero-reveal">
            <NewsletterForm />
          </div>

          <div className="articles-hero-dossier articles-hero-reveal" aria-hidden="true">
            <div className="articles-dossier-line" />
            <div className="articles-dossier-pill">Product</div>
            <div className="articles-dossier-pill">Systems</div>
            <div className="articles-dossier-pill">Growth</div>
          </div>
        </div>
      </section>

      <section ref={indexRef} className="articles-index" aria-labelledby="articles-index-heading">
        <div className="articles-index-inner">
          <h2 id="articles-index-heading" className="sr-only">
            Latest articles
          </h2>

          <div className="articles-grid" aria-label="Latest articles">
            {ARTICLES.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>

          <aside className="articles-subscribe-band articles-reveal" aria-label="Subscribe to articles">
            <div>
              <p className="articles-subscribe-kicker">Nexify notes</p>
              <h2>One sharp read for the next build decision.</h2>
            </div>
            <NewsletterForm compact />
          </aside>
        </div>
      </section>
    </main>
  );
}
