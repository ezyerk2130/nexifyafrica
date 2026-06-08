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
      name: "form",
      title: "Contact Form Labels",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "nameLabel", title: "Name Label", type: "string", initialValue: "Name" }),
        defineField({ name: "namePlaceholder", title: "Name Placeholder", type: "string", initialValue: "John Carter" }),
        defineField({ name: "emailLabel", title: "Email Label", type: "string", initialValue: "Email" }),
        defineField({ name: "emailPlaceholder", title: "Email Placeholder", type: "string", initialValue: "example@nexifyafrica.com" }),
        defineField({ name: "companyLabel", title: "Company Label", type: "string", initialValue: "Company" }),
        defineField({ name: "companyPlaceholder", title: "Company Placeholder", type: "string", initialValue: "Your company" }),
        defineField({ name: "detailsLabel", title: "Project Details Label", type: "string", initialValue: "Project details" }),
        defineField({ name: "detailsPlaceholder", title: "Project Details Placeholder", type: "string", initialValue: "Tell us about your project" }),
        defineField({ name: "submitText", title: "Submit Button Text", type: "string", initialValue: "Send Message" }),
        defineField({ name: "submitSentText", title: "Submit Sent Text", type: "string", initialValue: "Message sent" }),
      ],
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
