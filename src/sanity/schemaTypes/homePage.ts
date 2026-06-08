import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "principles", title: "Principles Section" },
    { name: "services", title: "Services Section" },
    { name: "faq", title: "FAQ Section" },
    { name: "buildCta", title: "Build CTA Section" },
    { name: "caseStudiesPage", title: "Case Studies Page Hero" },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: "heroLines",
      title: "Hero Headline",
      description:
        "The main hero headline. Type it as one sentence — the layout wraps the words automatically.",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroRevealLines",
      title: "Hero Reveal Text",
      description:
        "Text shown in the white reveal layer on scroll. Type it as one block — the layout wraps it automatically.",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA Button Text",
      type: "string",
      initialValue: "Our work",
      group: "hero",
    }),
    defineField({
      name: "heroCtaHref",
      title: "Hero CTA Button Link",
      type: "string",
      initialValue: "#work",
      group: "hero",
    }),

    // ── Principles ────────────────────────────────────────────────────────────
    defineField({
      name: "principlesHeadingBefore",
      title: "Principles Heading – Before Highlight",
      type: "string",
      initialValue: "We help teams ",
      group: "principles",
    }),
    defineField({
      name: "principlesHeadingHighlight",
      title: "Principles Heading – Highlighted Word(s)",
      type: "string",
      initialValue: "move with intent",
      group: "principles",
    }),
    defineField({
      name: "principlesHeadingAfter",
      title: "Principles Heading – After Highlight",
      type: "text",
      rows: 2,
      initialValue:
        ", build for scale, and design digital products that survive contact with reality.",
      group: "principles",
    }),

    // ── Services ──────────────────────────────────────────────────────────────
    defineField({
      name: "servicesHeading",
      title: "Services Section Heading",
      type: "string",
      initialValue: "Our Services",
      group: "services",
    }),

    // ── FAQ ───────────────────────────────────────────────────────────────────
    defineField({
      name: "faqHeadingItalic",
      title: "FAQ Heading – Italic Part",
      description: 'e.g. "Questions?"',
      type: "string",
      initialValue: "Questions?",
      group: "faq",
    }),
    defineField({
      name: "faqHeading",
      title: "FAQ Heading – Main Part",
      description: 'e.g. "Glad you asked."',
      type: "string",
      initialValue: "Glad you asked.",
      group: "faq",
    }),

    // ── Build CTA ─────────────────────────────────────────────────────────────
    defineField({
      name: "buildCtaHeading",
      title: "Build CTA – Heading",
      type: "string",
      initialValue: "Have an idea?",
      group: "buildCta",
    }),
    defineField({
      name: "buildCtaDescription",
      title: "Build CTA – Description",
      type: "text",
      rows: 2,
      initialValue:
        "We've solved problems in over 15 industries. If you've got a challenge, we've likely tackled something similar.",
      group: "buildCta",
    }),
    defineField({
      name: "buildCtaButtonText",
      title: "Build CTA – Button Text",
      type: "string",
      initialValue: "Let's Build Together",
      group: "buildCta",
    }),
    defineField({
      name: "buildCtaButtonHref",
      title: "Build CTA – Button Link",
      type: "string",
      initialValue: "/contact",
      group: "buildCta",
    }),

    // ── Case Studies Page Hero ────────────────────────────────────────────────
    defineField({
      name: "caseStudiesHeroLines",
      title: "Case Studies Page – Hero Headline",
      description: "One sentence; the layout wraps the words automatically.",
      type: "text",
      rows: 2,
      group: "caseStudiesPage",
    }),
    defineField({
      name: "caseStudiesRevealLines",
      title: "Case Studies Page – Reveal Text",
      description: "One block; the layout wraps it automatically.",
      type: "text",
      rows: 2,
      group: "caseStudiesPage",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page Settings" }),
  },
});
