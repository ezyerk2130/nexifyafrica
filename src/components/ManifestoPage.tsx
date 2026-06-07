"use client";

import { Fragment } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import ManifestoHero from "@/components/ManifestoHero";
import {
  MANIFESTO_HERO,
  MANIFESTO_SECTIONS,
  type ManifestoBlock,
} from "@/data/manifesto";

const LAYOUT_INNER =
  "mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12";

const MANIFESTO_IMAGE_FRAME =
  "manifesto-image-placeholder relative aspect-[21/9] w-full min-h-[220px] overflow-hidden sm:min-h-[300px] lg:min-h-[360px]";

// Normalized section shape – compatible with both local data and Sanity-fetched data
export type NormalizedManifestoSection = {
  id: string;
  label: string;
  blocks: Array<{
    type: "paragraph" | "list" | "ordered-list" | "pullquote";
    text?: string;
    items?: string[];
    ordered?: boolean;
  }>;
  imageAfter?: boolean;
  imageAfterSrc?: string;
  imageAfterAlt?: string;
  imageAfterFit?: "cover" | "contain";
  imageAfterObjectPosition?: string;
};

function ManifestoImage({
  label,
  src,
  alt,
  fit = "cover",
  objectPosition,
}: {
  label: string;
  src?: string;
  alt?: string;
  fit?: "cover" | "contain";
  objectPosition?: string;
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
            className={
              isContain ? "object-contain" : "object-cover object-center"
            }
            style={
              isContain
                ? { objectPosition: objectPosition ?? "center 22%" }
                : undefined
            }
            sizes="100vw"
            priority={src.includes("hero-collaboration")}
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

type BlockType = NormalizedManifestoSection["blocks"][number];

function ManifestoBlockRenderer({ block }: { block: BlockType | ManifestoBlock }) {
  if (block.type === "pullquote") {
    return (
      <blockquote className="manifesto-pullquote font-sans">
        <p>{block.text}</p>
      </blockquote>
    );
  }

  if (block.type === "paragraph") {
    return <p className="manifesto-body">{block.text}</p>;
  }

  // Handle both local "list" (with ordered boolean) and Sanity "ordered-list" type
  const isOrdered =
    block.type === "ordered-list" ||
    ("ordered" in block && block.ordered === true);
  const ListTag = isOrdered ? "ol" : "ul";
  const items = block.items ?? [];

  return (
    <ListTag
      className={
        isOrdered ? "manifesto-body manifesto-ordered-list" : "manifesto-body manifesto-list"
      }
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ListTag>
  );
}

type Props = {
  heroLines?: readonly string[];
  heroRevealLines?: readonly string[];
  kicker?: string;
  lead?: string;
  sections?: NormalizedManifestoSection[];
};

export default function ManifestoPage({ heroLines, heroRevealLines, kicker, lead, sections }: Props = {}) {
  const SECTIONS = sections ?? (MANIFESTO_SECTIONS as unknown as NormalizedManifestoSection[]);
  const displayKicker = kicker ?? MANIFESTO_HERO.kicker;
  const displayLead = lead ?? MANIFESTO_HERO.lead;

  return (
    <>
      <ManifestoHero lines={heroLines} revealLines={heroRevealLines} />

      <article className="manifesto-page text-neutral-900">
        <ManifestoImage
          label="Manifesto hero image"
          src="/images/manifesto/hero-collaboration.png"
          alt="Team members collaborating around a tablet in a modern office"
        />

        <div className={`manifesto-content ${LAYOUT_INNER}`}>
          <p className="manifesto-kicker">{displayKicker}</p>
          <p className="manifesto-lead">{displayLead}</p>
        </div>

        {SECTIONS.map((section) => (
          <Fragment key={section.id}>
            <div className={LAYOUT_INNER}>
              <section
                id={section.id}
                className="manifesto-section"
                aria-labelledby={`${section.id}-heading`}
              >
                <ManifestoAccentLine />
                <h2
                  id={`${section.id}-heading`}
                  className="manifesto-section-label"
                >
                  {section.label}
                </h2>

                <div className="manifesto-section-body">
                  {section.blocks.map((block, blockIndex) => (
                    <ManifestoBlockRenderer
                      key={`${section.id}-${blockIndex}`}
                      block={block}
                    />
                  ))}
                </div>
              </section>
            </div>

            {section.imageAfter ? (
              <ManifestoImage
                label={`Illustration for ${section.label}`}
                src={section.imageAfterSrc}
                alt={section.imageAfterAlt}
                fit={section.imageAfterFit}
                objectPosition={section.imageAfterObjectPosition}
              />
            ) : null}
          </Fragment>
        ))}
      </article>

      <Footer />
    </>
  );
}
