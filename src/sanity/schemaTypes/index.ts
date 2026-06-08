import { careersPageType } from "./careersPage";
import { caseStudyType } from "./caseStudy";
import { contactPageType } from "./contactPage";
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
  caseStudyType,
  serviceType,
  faqItemType,
  principleType,
  teamMemberType,
  // Singletons
  siteSettingsType,
  homePageType,
  manifestoPageType,
  teamPageType,
  contactPageType,
  careersPageType,
];
