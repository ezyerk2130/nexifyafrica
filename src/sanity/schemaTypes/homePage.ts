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
