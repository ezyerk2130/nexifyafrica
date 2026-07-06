import { articleType } from "./article";
import { blogPageType } from "./blogPage";
import { careersPageType } from "./careersPage";
import { caseStudyType } from "./caseStudy";
import { contactPageType } from "./contactPage";
import { contactSubmissionType } from "./contactSubmission";
import { faqItemType } from "./faqItem";
import { homePageType } from "./homePage";
import { manifestoPageType } from "./manifestoPage";
import { principleType } from "./principle";
import { serviceType } from "./service";
import { siteSettingsType } from "./siteSettings";
import { teamMemberType } from "./teamMember";
import { teamPageType } from "./teamPage";

export const schemaTypes = [
  // Repeatable documents
  articleType,
  caseStudyType,
  serviceType,
  faqItemType,
  principleType,
  teamMemberType,
  contactSubmissionType,
  // Singletons
  siteSettingsType,
  blogPageType,
  homePageType,
  manifestoPageType,
  teamPageType,
  contactPageType,
  careersPageType,
];
