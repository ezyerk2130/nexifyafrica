import { defineField, defineType } from "sanity";

export const careersPageType = defineType({
  name: "careersPage",
  title: "Careers Page",
  type: "document",
  fields: [
    defineField({
      name: "heroLines",
      title: "Hero Headline",
      description: "One sentence; the layout wraps the words automatically.",
      type: "text",
      rows: 2,
      initialValue: "Careers",
    }),
    defineField({
      name: "heroRevealLines",
      title: "Hero Reveal Text",
      description: "One block; the layout wraps it automatically.",
      type: "text",
      rows: 3,
      initialValue: "Open roles and opportunities are coming soon.",
    }),
    defineField({
      name: "kicker",
      title: "Kicker",
      type: "string",
      initialValue: "Coming soon",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      initialValue: "Open roles and opportunities are coming soon.",
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      type: "string",
      initialValue: "Back to home",
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA Href",
      type: "string",
      initialValue: "/",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA Label",
      type: "string",
      initialValue: "View case studies",
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Secondary CTA Href",
      type: "string",
      initialValue: "/case-studies",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Careers Page Settings" }),
  },
});
