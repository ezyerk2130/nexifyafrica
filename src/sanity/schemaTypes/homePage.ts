import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "servicesHeading",
      title: "Services Section Heading",
      type: "string",
      initialValue: "Our Services",
    }),
    defineField({
      name: "principlesHeadingBefore",
      title: "Principles Heading – Before Highlight",
      type: "string",
      initialValue: "We help teams ",
    }),
    defineField({
      name: "principlesHeadingHighlight",
      title: "Principles Heading – Highlighted Word(s)",
      type: "string",
      initialValue: "move with intent",
    }),
    defineField({
      name: "principlesHeadingAfter",
      title: "Principles Heading – After Highlight",
      type: "text",
      rows: 2,
      initialValue:
        ", build for scale, and design digital products that survive contact with reality.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page Settings" }),
  },
});
