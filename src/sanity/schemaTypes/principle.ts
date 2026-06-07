import { defineField, defineType } from "sanity";

export const principleType = defineType({
  name: "principle",
  title: "Principle",
  type: "document",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Check Circle", value: "check-circle" },
          { title: "People", value: "people" },
          { title: "Eye", value: "eye" },
          { title: "Layers", value: "layers" },
          { title: "Book", value: "book" },
          { title: "Pen", value: "pen" },
        ],
        layout: "dropdown",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "icon" },
  },
  orderings: [{ title: "Sort Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
