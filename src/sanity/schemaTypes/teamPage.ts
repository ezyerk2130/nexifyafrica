import { defineField, defineType } from "sanity";

export const teamPageType = defineType({
  name: "teamPage",
  title: "Team Page",
  type: "document",
  fields: [
    defineField({
      name: "heroLines",
      title: "Hero Headline",
      description: "One sentence; the layout wraps the words automatically.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroRevealLines",
      title: "Hero Reveal Text",
      description: "One block; the layout wraps it automatically.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "defaultTeamImage",
      title: "Default Team Portrait Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Team Page Settings" }),
  },
});
