import { defineField, defineType } from "sanity";

const ARTICLE_TONES = [
  { title: "Strategy", value: "strategy" },
  { title: "Systems", value: "systems" },
  { title: "Product", value: "product" },
  { title: "Growth", value: "growth" },
];

const imageFields = [
  defineField({
    name: "asset",
    title: "Image",
    type: "image",
    options: { hotspot: true },
  }),
  defineField({
    name: "alt",
    title: "Alt Text",
    description: "Short description for accessibility and SEO.",
    type: "string",
  }),
  defineField({
    name: "position",
    title: "Image Position",
    description: 'Optional CSS object-position value, for example "center" or "70% center".',
    type: "string",
    initialValue: "center",
  }),
];

const articleSection = defineField({
  name: "articleSection",
  title: "Article Section",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Section ID",
      description: "Used for the table of contents link anchor.",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "navLabel",
      title: "Table of Contents Label",
      description: "Optional. Leave blank to use the section heading automatically.",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Section Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      validation: (rule) => rule.min(1),
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
        ...imageFields,
        defineField({
          name: "variant",
          title: "Layout Variant",
          type: "string",
          options: {
            list: [
              { title: "Wide", value: "wide" },
              { title: "Half", value: "half" },
            ],
            layout: "radio",
          },
          initialValue: "wide",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "navLabel",
    },
  },
});

const galleryImage = defineField({
  name: "galleryImage",
  title: "Gallery Image",
  type: "object",
  fields: imageFields,
  preview: {
    select: {
      title: "alt",
      media: "asset",
    },
    prepare({ title, media }) {
      return {
        title: title || "Gallery image",
        media,
      };
    },
  },
});

export const articleType = defineType({
  name: "article",
  title: "Blog Article",
  type: "document",
  groups: [
    { name: "card", title: "Card" },
    { name: "hero", title: "Hero and Metadata" },
    { name: "body", title: "Body Sections" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: ["card", "hero", "seo"],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: ["card", "seo"],
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "card",
      initialValue: "Growth",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tone",
      title: "Card Color Tone",
      type: "string",
      group: "card",
      options: { list: ARTICLE_TONES, layout: "radio" },
      initialValue: "strategy",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Shown in the hero, article cards, metadata, and social sharing.",
      type: "text",
      rows: 3,
      group: ["card", "hero", "seo"],
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "cardLabel",
      title: "Card Label",
      description: 'Small listing label, for example "Field note 01".',
      type: "string",
      group: "card",
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedLabel",
      title: "Published Label",
      description: "Optional display label. Leave blank to format the published date automatically.",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      group: "hero",
      initialValue: "5 min read",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "hero",
      initialValue: "Nexify Africa",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroKicker",
      title: "Hero Kicker",
      type: "string",
      group: "hero",
      initialValue: "Article Details",
    }),
    defineField({
      name: "mainImage",
      title: "Hero and Card Image",
      type: "object",
      group: ["card", "hero", "seo"],
      fields: imageFields,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro Paragraph",
      type: "text",
      rows: 4,
      group: "body",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      description: "Each section appears in the article body and table of contents.",
      type: "array",
      group: "body",
      of: [articleSection],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "quote",
      title: "Highlighted Text",
      description:
        "Neutral highlighted text block displayed after the section whose ID is 'mistakes'.",
      type: "text",
      rows: 3,
      group: "body",
    }),
    defineField({
      name: "gallery",
      title: "Two Image Gallery",
      description: "Displayed after the section whose ID is 'roadmap'.",
      type: "array",
      group: "body",
      of: [galleryImage],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      group: "card",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "mainImage.asset",
    },
  },
  orderings: [
    {
      title: "Published date, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Title",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
