import { defineField, defineType } from "sanity";

export const blogPageType = defineType({
  name: "blogPage",
  title: "Blog Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "newsletter", title: "Newsletter" },
    { name: "cards", title: "Article Cards" },
  ],
  fields: [
    defineField({
      name: "kicker",
      title: "Kicker",
      type: "string",
      group: "hero",
      initialValue: "Blog Page",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "text",
      rows: 2,
      group: "hero",
      initialValue: "Insights that help you build, grow, and scale smarter",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue:
        "Practical notes on product strategy, automation, analytics, and the operating systems that help ambitious teams move with more confidence.",
    }),
    defineField({
      name: "newsletterPlaceholder",
      title: "Email Placeholder",
      type: "string",
      group: "newsletter",
      initialValue: "Enter your email address",
    }),
    defineField({
      name: "newsletterButtonText",
      title: "Button Text",
      type: "string",
      group: "newsletter",
      initialValue: "Subscribe",
    }),
    defineField({
      name: "newsletterIdleText",
      title: "Idle Status Text",
      type: "string",
      group: "newsletter",
      initialValue: "Monthly notes. No noise.",
    }),
    defineField({
      name: "newsletterSuccessText",
      title: "Success Status Text",
      type: "string",
      group: "newsletter",
      initialValue: "Thanks. The next Nexify note is on its way.",
    }),
    defineField({
      name: "readMoreLabel",
      title: "Read More Label",
      type: "string",
      group: "cards",
      initialValue: "Read More",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Blog Page" }),
  },
});
