"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import TeamHero from "@/components/TeamHero";
import {
  TEAM_IMAGE,
  TEAM_MEMBERS,
  type TeamMember,
} from "@/data/team";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LAYOUT_INNER =
  "mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12";

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="team-card-wrap">
      <article
        className={`card-team ${isHovered ? "card-team--hover" : ""}`}
        tabIndex={0}
        aria-label={`${member.name}, ${member.role}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <div className="team-card-media">
          <Image
            src={TEAM_IMAGE}
            alt={`Portrait of ${member.name}`}
            fill
            className="image-cover"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            priority={index < 4}
          />
        </div>

        <div className="text-wrap-team">
          <div className="text-small text-body-bold">{member.name}</div>
          <div className="text-small body-medium">{member.role}</div>
        </div>
      </article>
    </div>
  );
}

export default function TeamPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".team-card-wrap");

    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    try {
      gsap.set(cards, { opacity: 0, y: 56 });

      const ctx = gsap.context(() => {
        ScrollTrigger.batch(cards, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.09,
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
        console.warn("[TeamPage] Animation unavailable:", error);
      }
      gsap.set(cards, { opacity: 1, y: 0 });
    }
  }, [prefersReducedMotion]);

  return (
    <>
      <TeamHero />

      <section ref={sectionRef} className="team-page text-neutral-900">
        <div className={`${LAYOUT_INNER} pb-24 pt-16 lg:pb-32 lg:pt-20`}>
          <div ref={gridRef} className="team-grid">
            {TEAM_MEMBERS.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
