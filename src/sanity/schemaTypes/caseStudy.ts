import { defineField, defineType } from "sanity";

const contentBlock = defineField({
  name: "contentBlock",
  title: "Content Block",
  type: "object",
  fields: [
    defineField({ name: "id", title: "Section ID", type: "slug", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "bullets",
      title: "Bullet Points",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "Section Image",
      type: "object",
      fields: [
        defineField({ name: "asset", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
        defineField({
          name: "variant",
          title: "Variant",
          type: "string",
          options: { list: ["wide", "square"], layout: "radio" },
          initialValue: "wide",
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroLines",
      title: "Hero Lines",
      description: "Lines displayed in the dark hero overlay",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "heroRevealLines",
      title: "Hero Reveal Lines",
      description: "Lines displayed in the white hero reveal layer",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "cardClient",
      title: "Card – Client / Industry Label",
      type: "string",
    }),
    defineField({ name: "metric", title: "Card – Metric", type: "string" }),
    defineField({ name: "metricLabel", title: "Card – Metric Label", type: "string" }),
    defineField({
      name: "sidebar",
      title: "Sidebar",
      type: "object",
      fields: [
        defineField({ name: "client", title: "Client", type: "string" }),
        defineField({ name: "industry", title: "Industry", type: "string" }),
        defineField({ name: "services", title: "Services", type: "string" }),
        defineField({ name: "projectDuration", title: "Project Duration", type: "string" }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      type: "array",
      of: [contentBlock],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
  orderings: [{ title: "Title", name: "titleAsc", by: [{ field: "title", direction: "asc" }] }],
});
