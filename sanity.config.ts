import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

const SINGLETONS = ["homePage", "manifestoPage", "teamPage", "contactPage"] as const;
const SINGLETON_LABELS: Record<string, string> = {
  homePage: "Home Page",
  manifestoPage: "Manifesto Page",
  teamPage: "Team Page",
  contactPage: "Contact Page",
};

export default defineConfig({
  name: "nexify-africa",
  title: "Nexify Africa",
  projectId: "v0quzgcv",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Repeatable documents
            S.documentTypeListItem("caseStudy").title("Case Studies"),
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("faqItem").title("FAQ Items"),
            S.documentTypeListItem("principle").title("Principles"),
            S.documentTypeListItem("teamMember").title("Team Members"),
            S.divider(),
            // Singletons
            ...SINGLETONS.map((typeName) =>
              S.listItem()
                .title(SINGLETON_LABELS[typeName]!)
                .id(typeName)
                .child(
                  S.document()
                    .schemaType(typeName)
                    .documentId(typeName)
                    .title(SINGLETON_LABELS[typeName]!),
                ),
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Prevent creating new instances of singletons
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (template) => !SINGLETONS.includes(template.templateId as (typeof SINGLETONS)[number]),
        );
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if ((SINGLETONS as readonly string[]).includes(schemaType)) {
        return prev.filter(({ action }) => action !== "duplicate" && action !== "delete");
      }
      return prev;
    },
  },
});
