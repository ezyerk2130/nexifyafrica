import { defineField, defineType } from "sanity";

export const manifestoPageType = defineType({
  name: "manifestoPage",
  title: "Manifesto Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "intro", title: "Introduction" },
    { name: "body", title: "Body Content" },
  ],
  fields: [
    defineField({
      name: "heroLines",
      title: "Hero Headline",
      description: "One sentence; the layout wraps the words automatically.",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroRevealLines",
      title: "Hero Reveal Text",
      description: "One block; the layout wraps it automatically.",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({ name: "title", title: "Title", type: "string", group: "intro" }),
    defineField({ name: "kicker", title: "Kicker", type: "string", group: "intro" }),
    defineField({ name: "lead", title: "Lead Text", type: "text", rows: 3, group: "intro" }),
    defineField({
      name: "body",
      title: "Manifesto Body",
      description:
        "Edit the full manifesto as one continuous document. Use H2 for section labels (A. THE PARADOX, etc.). Use the image button (⊞) to insert images between paragraphs.",
      type: "array",
      group: "body",
      of: [
        {
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Section Label (H2)", value: "h2" },
            { title: "Sub-heading (H3)", value: "h3" },
            { title: "Pull Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet List", value: "bullet" },
            { title: "Numbered List", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
          },
        },
        {
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Describe the image for screen readers",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption (optional)",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Manifesto Page" }),
  },
});
