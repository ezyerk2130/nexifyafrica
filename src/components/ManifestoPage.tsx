"use client";

import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Footer from "@/components/Footer";
import ManifestoHero from "@/components/ManifestoHero";
import { MANIFESTO_HERO } from "@/data/manifesto";
import { imageUrl } from "@/sanity/lib/image";
import { isSafeHref } from "@/lib/url";
import type { ManifestoPTBlock } from "@/sanity/lib/queries";

const LAYOUT_INNER =
  "mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12";

const MANIFESTO_IMAGE_FRAME =
  "manifesto-image-placeholder relative aspect-[21/9] w-full min-h-[220px] overflow-hidden sm:min-h-[300px] lg:min-h-[360px]";

function ManifestoImage({
  label,
  src,
  alt,
  fit = "cover",
}: {
  label: string;
  src?: string;
  alt?: string;
  fit?: "cover" | "contain";
}) {
  const isContain = fit === "contain";
  return (
    <figure className="manifesto-figure">
      <div
        className={`${MANIFESTO_IMAGE_FRAME} ${
          isContain ? "bg-neutral-100" : "bg-neutral-200"
        }`}
      >
        {src ? (
          <Image
            src={src}
            alt={alt ?? label}
            fill
            className={isContain ? "object-contain" : "object-cover object-center"}
            sizes="100vw"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-neutral-200"
            aria-hidden="true"
          >
            <span className="text-sm tracking-[0.12em] text-neutral-500 uppercase">
              Image placeholder
            </span>
          </div>
        )}
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

function ManifestoAccentLine() {
  return <div className="manifesto-accent-line" aria-hidden="true" />;
}

// Split the PT body array into segments — consecutive text blocks together,
// image blocks isolated so they can be rendered full-width outside the text container.
type TextSegment = { type: "text"; blocks: ManifestoPTBlock[] };
type ImageSegment = {
  type: "image";
  block: ManifestoPTBlock;
};
type Segment = TextSegment | ImageSegment;

function splitAtImages(body: ManifestoPTBlock[]): Segment[] {
  const segments: Segment[] = [];
  let text: ManifestoPTBlock[] = [];

  for (const block of body) {
    if (block._type === "image") {
      if (text.length > 0) {
        segments.push({ type: "text", blocks: text });
        text = [];
      }
      segments.push({ type: "image", block });
    } else {
      text.push(block);
    }
  }
  if (text.length > 0) segments.push({ type: "text", blocks: text });

  return segments;
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="manifesto-body">{children}</p>,
    h2: ({ children }) => (
      <>
        <ManifestoAccentLine />
        <h2 className="manifesto-section-label">{children}</h2>
      </>
    ),
    h3: ({ children }) => (
      <h3 className="manifesto-section-label" style={{ fontSize: "1.1em" }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="manifesto-pullquote font-sans">
        <p>{children}</p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="manifesto-body manifesto-list">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="manifesto-body manifesto-ordered-list">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href as string | undefined;
      if (!isSafeHref(href)) {
        return <>{children}</>;
      }
      const isExternal = /^https?:\/\//i.test(href!.trim());
      return (
        <a
          href={href}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

type Props = {
  heroLines?: string | readonly string[];
  heroRevealLines?: string | readonly string[];
  kicker?: string;
  lead?: string;
  body?: ManifestoPTBlock[];
};

export default function ManifestoPage({ heroLines, heroRevealLines, kicker, lead, body }: Props = {}) {
  const displayKicker = kicker ?? MANIFESTO_HERO.kicker;
  const displayLead = lead ?? MANIFESTO_HERO.lead;
  const segments = body && body.length > 0 ? splitAtImages(body) : [];

  return (
    <>
      <ManifestoHero lines={heroLines} revealLines={heroRevealLines} />

      <article className="manifesto-page text-neutral-900">
        {/* Static hero image at the top */}
        <ManifestoImage
          label="Manifesto hero image"
          src="/images/manifesto/hero-collaboration.png"
          alt="Team members collaborating around a tablet in a modern office"
        />

        <div className={`manifesto-content ${LAYOUT_INNER}`}>
          <p className="manifesto-kicker">{displayKicker}</p>
          <p className="manifesto-lead">{displayLead}</p>
        </div>

        {segments.map((segment, i) => {
          if (segment.type === "image") {
            const { block } = segment;
            const src =
              imageUrl(block as Parameters<typeof imageUrl>[0], 1400) ?? undefined;
            return (
              <ManifestoImage
                key={(block._key as string) ?? i}
                label={(block.caption as string) ?? (block.alt as string) ?? "Manifesto image"}
                src={src}
                alt={block.alt as string | undefined}
              />
            );
          }

          return (
            <div key={i} className={LAYOUT_INNER}>
              <div className="manifesto-section-body">
                <PortableText
                  value={segment.blocks}
                  components={portableTextComponents}
                />
              </div>
            </div>
          );
        })}
      </article>

      <Footer />
    </>
  );
}
