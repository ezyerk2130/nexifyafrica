import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
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
    defineField({
      name: "visualHeadline",
      title: "Visual Headline",
      type: "string",
    }),
    defineField({
      name: "visualDescription",
      title: "Visual Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "visualImage",
      title: "Visual Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "details",
      title: "Contact Details",
      type: "array",
      of: [
        {
          type: "object",
          name: "contactDetail",
          fields: [
            defineField({ name: "id", title: "ID", type: "string" }),
            defineField({ name: "title", title: "Label", type: "string" }),
            defineField({
              name: "lines",
              title: "Lines",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({ name: "href", title: "Link (href)", type: "string" }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page Settings" }),
  },
});
