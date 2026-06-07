"use client";

import { useEffect, useId, useRef, useState } from "react";
import RevealText from "@/components/RevealText";
import { HOME_FAQ_ITEMS } from "@/data/homeFaq";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollWordReveal } from "@/hooks/useScrollWordReveal";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function FaqToggleIcon({ open }: { open: boolean }) {
  return (
    <span className="home-faq-icon" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.33203 8L12.6654 8"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={`home-faq-icon-vertical${open ? " is-hidden" : ""}`}
          d="M8 3.33325V12.6666"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function HomeFaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();
  const prefersReducedMotion = usePrefersReducedMotion();

  useScrollWordReveal(headingRef, sectionRef, prefersReducedMotion);

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    const items = list.querySelectorAll<HTMLElement>(".home-faq-item");

    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    try {
      gsap.set(items, { opacity: 0, y: 40 });

      const ctx = gsap.context(() => {
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.07,
              ease: "power4.out",
              overwrite: true,
            });
          },
        });
      }, section);

      return () => {
        ctx.revert();
      };
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[HomeFaqSection] Animation unavailable:", error);
      }
      gsap.set(items, { opacity: 1, y: 0 });
    }
  }, [prefersReducedMotion]);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section ref={sectionRef} id="faq" className="home-faq text-neutral-900">
      <div className="home-section-inner home-section-inner--faq">
        <header className="home-faq-header">
          <h2 ref={headingRef} className="home-faq-heading">
            <RevealText
              block
              segments={[
                { text: "Questions?", italic: true, keepTogether: true },
                { text: "Glad you asked." },
              ]}
            />
          </h2>
        </header>

        <div ref={listRef} className="home-faq-list">
          {HOME_FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const answerId = `${baseId}-${item.id}-answer`;

            return (
              <article
                key={item.id}
                className={`home-faq-item${isOpen ? " is-open" : ""}`}
              >
                <button
                  type="button"
                  className="home-faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(item.id)}
                >
                  <span className="home-faq-question">{item.question}</span>
                  <span className="home-faq-toggle">
                    <FaqToggleIcon open={isOpen} />
                  </span>
                </button>

                <div
                  id={answerId}
                  className={`home-faq-answer${isOpen ? " is-open" : ""}`}
                  aria-hidden={!isOpen}
                >
                  <div className="home-faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
