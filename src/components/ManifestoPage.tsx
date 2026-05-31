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

function ManifestoBlockRenderer({ block }: { block: ManifestoBlock }) {
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

  const ListTag = block.ordered ? "ol" : "ul";

  return (
    <ListTag
      className={
        block.ordered ? "manifesto-body manifesto-ordered-list" : "manifesto-body manifesto-list"
      }
    >
      {block.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ListTag>
  );
}

export default function ManifestoPage() {
  return (
    <>
      <ManifestoHero />

      <article className="manifesto-page text-neutral-900">
        <ManifestoImage
          label="Manifesto hero image"
          src="/images/manifesto/hero-collaboration.png"
          alt="Team members collaborating around a tablet in a modern office"
        />

        <div className={`manifesto-content ${LAYOUT_INNER}`}>
          <p className="manifesto-kicker">{MANIFESTO_HERO.kicker}</p>
          <p className="manifesto-lead">{MANIFESTO_HERO.lead}</p>
        </div>

        {MANIFESTO_SECTIONS.map((section) => (
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
