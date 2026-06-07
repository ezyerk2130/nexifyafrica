import { defineField, defineType } from "sanity";

const manifestoSectionType = defineField({
  name: "manifestoSection",
  title: "Section",
  type: "object",
  fields: [
    defineField({ name: "id", title: "Section ID", type: "slug", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "blocks",
      title: "Content Blocks",
      type: "array",
      of: [
        {
          type: "object",
          name: "contentBlock",
          fields: [
            defineField({
              name: "type",
              title: "Block Type",
              type: "string",
              options: {
                list: [
                  { title: "Paragraph", value: "paragraph" },
                  { title: "List (unordered)", value: "list" },
                  { title: "List (ordered)", value: "ordered-list" },
                  { title: "Pull Quote", value: "pullquote" },
                ],
                layout: "radio",
              },
              initialValue: "paragraph",
            }),
            defineField({ name: "text", title: "Text (paragraph / pullquote)", type: "text", rows: 3 }),
            defineField({
              name: "items",
              title: "List Items",
              type: "array",
              of: [{ type: "text" }],
            }),
          ],
          preview: {
            select: { title: "type", subtitle: "text" },
          },
        },
      ],
    }),
    defineField({
      name: "imageAfter",
      title: "Show image after this section",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Section Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "imageAlt", title: "Image Alt Text", type: "string" }),
    defineField({
      name: "imageFit",
      title: "Image Fit",
      type: "string",
      options: { list: ["cover", "contain"], layout: "radio" },
      initialValue: "cover",
    }),
  ],
  preview: {
    select: { title: "label" },
  },
});

export const manifestoPageType = defineType({
  name: "manifestoPage",
  title: "Manifesto Page",
  type: "document",
  fields: [
    defineField({
      name: "heroLines",
      title: "Hero Lines",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "heroRevealLines",
      title: "Hero Reveal Lines",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "kicker", title: "Kicker", type: "string" }),
    defineField({ name: "lead", title: "Lead Text", type: "text", rows: 3 }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [manifestoSectionType],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Manifesto Page" }),
  },
});
