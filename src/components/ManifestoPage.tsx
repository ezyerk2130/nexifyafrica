"use client";

import { Fragment } from "react";
import Footer from "@/components/Footer";
import PinnedHero from "@/components/PinnedHero";
import {
  MANIFESTO_HERO,
  MANIFESTO_SECTIONS,
  type ManifestoBlock,
} from "@/data/manifesto";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const LAYOUT_INNER =
  "mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12";

function ManifestoImagePlaceholder({ label }: { label: string }) {
  return (
    <figure className="manifesto-figure manifesto-figure-fullbleed">
      <div
        className="manifesto-image-placeholder flex aspect-[21/9] w-full min-h-[220px] items-center justify-center bg-neutral-200 sm:min-h-[300px] lg:min-h-[360px]"
        aria-hidden="true"
      >
        <span className="text-sm tracking-[0.12em] text-neutral-500 uppercase">
          Image placeholder
        </span>
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
  useSmoothScroll(true);

  return (
    <>
      <PinnedHero lines={MANIFESTO_HERO.lines} />

      <article className="manifesto-page bg-white text-neutral-900">
        <ManifestoImagePlaceholder label="Manifesto hero image" />

        <div
          className={`manifesto-content ${LAYOUT_INNER}`}
        >
          <p className="manifesto-kicker">{MANIFESTO_HERO.kicker}</p>
          <p className="manifesto-lead">{MANIFESTO_HERO.lead}</p>

          {MANIFESTO_SECTIONS.map((section, index) => {
            const previousSection = index > 0 ? MANIFESTO_SECTIONS[index - 1] : null;
            const followsImage = Boolean(previousSection?.imageAfter);

            return (
              <Fragment key={section.id}>
                {followsImage ? (
                  <ManifestoImagePlaceholder
                    label={`Illustration after ${previousSection?.label}`}
                  />
                ) : null}

                <section
                  id={section.id}
                  className={`manifesto-section ${followsImage ? "manifesto-section--after-image" : ""}`}
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
              </Fragment>
            );
          })}
        </div>
      </article>

      <Footer />
    </>
  );
}
