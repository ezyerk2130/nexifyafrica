import { defineField, defineType } from "sanity";

export const teamPageType = defineType({
  name: "teamPage",
  title: "Team Page",
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
