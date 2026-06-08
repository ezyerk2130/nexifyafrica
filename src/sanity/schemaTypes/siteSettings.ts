import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand" },
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "SEO / Metadata" },
  ],
  fields: [
    // ── Brand ───────────────────────────────────────────────────────────────
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      initialValue: "Nexify Africa",
      group: "brand",
    }),
    defineField({
      name: "footerWordmark",
      title: "Footer Wordmark Text",
      description: "Large wordmark rendered at the bottom of every page",
      type: "string",
      initialValue: "Nexify Africa",
      group: "brand",
    }),

    // ── Navigation ──────────────────────────────────────────────────────────
    defineField({
      name: "navLinks",
      title: "Primary Navigation Links",
      type: "array",
      group: "navigation",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link (href)", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "contactLinkLabel",
      title: "Contact Link Label",
      type: "string",
      initialValue: "Contact",
      group: "navigation",
    }),
    defineField({
      name: "contactLinkHref",
      title: "Contact Link Href",
      type: "string",
      initialValue: "/contact",
      group: "navigation",
    }),

    // ── Footer ──────────────────────────────────────────────────────────────
    defineField({
      name: "subscribeLabel",
      title: "Subscribe Label",
      type: "string",
      initialValue: "Subscribe",
      group: "footer",
    }),
    defineField({
      name: "subscribePlaceholder",
      title: "Subscribe Input Placeholder",
      type: "string",
      initialValue: "Enter your email",
      group: "footer",
    }),
    defineField({
      name: "subscribeButtonText",
      title: "Subscribe Button Text",
      type: "string",
      initialValue: "Subscribe",
      group: "footer",
    }),
    defineField({
      name: "subscribeNote",
      title: "Subscribe Note",
      type: "string",
      initialValue: "By subscribing you agree to with our Privacy Policy.",
      group: "footer",
    }),
    defineField({
      name: "subscribeSuccessMessage",
      title: "Subscribe Success Message",
      type: "string",
      initialValue: "Thanks for subscribing. We'll be in touch soon.",
      group: "footer",
    }),
    defineField({
      name: "copyright",
      title: "Copyright Line",
      description: 'Use {year} to insert the current year automatically',
      type: "string",
      initialValue: "© {year} Nexify Africa. All rights reserved.",
      group: "footer",
    }),

    // ── SEO ─────────────────────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "Default SEO Title",
      type: "string",
      initialValue: "Nexify Africa",
      group: "seo",
    }),
    defineField({
      name: "seoTitleTemplate",
      title: "Title Template",
      description: 'Use %s for the page title, e.g. "%s — Nexify Africa"',
      type: "string",
      initialValue: "%s — Nexify Africa",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "Default SEO Description",
      type: "text",
      rows: 3,
      initialValue:
        "Strategy, brand systems, and digital products for Africa's most disruptive thinkers.",
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph / Social Image",
      type: "image",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
