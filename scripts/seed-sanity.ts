/**
 * One-time seed script — imports all existing src/data/* content into Sanity.
 *
 * Usage:
 *   1. Set SANITY_API_WRITE_TOKEN in .env.local (Editor token from sanity.io/manage)
 *   2. npx tsx scripts/seed-sanity.ts
 *
 * This script is safe to run multiple times (uses createOrReplace).
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "v0quzgcv",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  { id: "corporate-strategy", number: "01.", title: "Corporate Strategy", description: "Define the roadmap. We align your long-term vision with actionable quarterly milestones.", order: 1 },
  { id: "risk-management", number: "02.", title: "Risk Management", description: "Identify vulnerabilities. We stress-test your operations against market volatility.", order: 2 },
  { id: "capital-allocation", number: "03.", title: "Capital Allocation", description: "Optimize resources. Ensure every dollar deployed drives maximum ROI for stakeholders.", order: 3 },
  { id: "digital-transformation", number: "04.", title: "Digital Transformation", description: "Modernize legacy systems. We integrate AI and cloud infrastructure to speed up workflow.", order: 4 },
  { id: "mergers-acquisitions", number: "05.", title: "Mergers & Acquisitions", description: "Navigate complexity. From due diligence to post-merger integration, we secure the deal.", order: 5 },
  { id: "executive-coaching", number: "06.", title: "Executive Coaching", description: "Empower leadership. We train C-Suite executives to lead with clarity and authority.", order: 6 },
];

const faqItems = [
  { id: "what-we-do", question: "What does Nexify Africa actually do?", answer: "We partner with ambitious teams to shape strategy, build brand systems, and ship digital products. From early discovery through launch, we help you turn complex ideas into software that scales.", order: 1 },
  { id: "who-we-work-with", question: "Who do you typically work with?", answer: "Founders, product leaders, and growth-stage companies across Africa who need a senior team without the overhead. If you are building something meaningful and want clarity, speed, and craft, we are a strong fit.", order: 2 },
  { id: "services", question: "What services do you offer?", answer: "Corporate strategy, risk management, capital allocation, digital transformation, M&A advisory, and executive coaching — backed by hands-on product design and engineering when you need to build, not just plan.", order: 3 },
  { id: "engagement", question: "How does an engagement typically start?", answer: "We begin with a focused conversation to understand your goals, constraints, and timeline. From there, we propose a scoped engagement — whether that is a strategy sprint, a brand system, or a full product build.", order: 4 },
  { id: "startups-only", question: "Do you only work with startups?", answer: "No. We work with startups, scale-ups, and established organizations modernizing how they operate. What matters is ambition, urgency, and a willingness to move with intent.", order: 5 },
  { id: "location", question: "Where are you based?", answer: "We are headquartered in Dar es Salaam, Tanzania, and collaborate with teams across Africa and internationally — remotely or on-site when the project calls for it.", order: 6 },
  { id: "contact", question: "How do I get in touch?", answer: "Reach us at info@nexifyafrica.com or +255 687 473 582. You can also use the contact form on our site — we respond to every serious inquiry within one business day.", order: 7 },
];

const principles = [
  { id: "practical-first", icon: "check-circle", title: "Practical first", description: "We build for everyday operations and real users — not presentations that never ship.", order: 1 },
  { id: "people-over-process", icon: "people", title: "People over process", description: "Systems should support your team doing their best work, never the other way around.", order: 2 },
  { id: "clarity-beats-complexity", icon: "eye", title: "Clarity beats complexity", description: "If something needs constant explanation, it is probably too complicated.", order: 3 },
  { id: "built-to-scale", icon: "layers", title: "Built to scale", description: "What we design at ten people should still work at a hundred.", order: 4 },
  { id: "senior-involvement", icon: "book", title: "Senior involvement", description: "You work directly with experienced people, from strategy through launch.", order: 5 },
  { id: "designed-not-copied", icon: "pen", title: "Designed, not copied", description: "We do not reuse frameworks — we design systems around your goals.", order: 6 },
];

const teamMembers = [
  { id: "john-kowalski", name: "John Kowalski", role: "Partner", order: 1 },
  { id: "janina-boderek", name: "Janina Boderek", role: "Founder", order: 2 },
  { id: "sarah-johnson", name: "Sarah Johnson", role: "Senior Consultant", order: 3 },
  { id: "michael-brown", name: "Michael Brown", role: "Strategy Lead", order: 4 },
  { id: "david-garcia", name: "David Garcia", role: "Innovation Officer", order: 5 },
  { id: "robert-miller", name: "Robert Miller", role: "Solutions Architect", order: 6 },
  { id: "jessica-mercedes", name: "Jessica Mercedes", role: "Client Director", order: 7 },
  { id: "kevin-rodriguez", name: "Kevin Rodriguez", role: "Project Manager", order: 8 },
];

const caseStudy = {
  _id: "case-study-modernizing-healthcare-security",
  _type: "caseStudy" as const,
  title: "Modernizing Healthcare Security with SecOps",
  slug: { _type: "slug" as const, current: "modernizing-healthcare-security" },
  heroLines: "Modernizing Healthcare Security with SecOps",
  heroRevealLines:
    "Healthcare organizations need more than security tools — they need operational trust.",
  cardClient: "Healthcare",
  metric: "60%",
  metricLabel: "reduction in false positives",
  sidebar: {
    client: "Regional Health Network",
    industry: "Healthcare",
    services: "SecOps governance, SOC optimization, managed security",
    projectDuration: "January 2024 – July 2024",
  },
  sections: [
    { id: { _type: "slug" as const, current: "overview" }, title: "Overview", paragraphs: ["A regional healthcare provider needed to strengthen security operations without disrupting clinical workflows. Nexify Africa partnered with their leadership team to modernize monitoring, reduce alert fatigue, and build a SecOps program that scales with the organization."] },
    { id: { _type: "slug" as const, current: "challenge" }, title: "The challenge", paragraphs: ["Legacy tooling produced high volumes of alerts with limited context, while compliance requirements continued to expand across clinical and administrative systems. The internal team lacked bandwidth to triage incidents and maintain audit-ready documentation."], bullets: ["Alert fatigue slowed incident response across the SOC", "Fragmented logging made root-cause analysis difficult", "Compliance reporting required manual, time-consuming assembly", "Clinical staff could not be pulled into security operations"] },
    { id: { _type: "slug" as const, current: "approach" }, title: "Our approach", paragraphs: ["We started with a structured discovery phase, then aligned stakeholders on priorities before implementing tuned detection, standardized runbooks, and managed monitoring that could run alongside day-to-day care delivery."], bullets: ["Mapped existing controls, workflows, and compliance gaps", "Defined SecOps objectives tied to uptime and audit readiness", "Prioritized high-signal detection rules over volume", "Integrated logging pipelines across clinical and back-office systems", "Established escalation paths with clear ownership"] },
    { id: { _type: "slug" as const, current: "solution" }, title: "The solution", paragraphs: ["We delivered a unified SecOps model with managed detection, SOC workflow redesign, and quarterly governance reviews—giving leadership visibility while keeping security operations out of the clinical lane."] },
    { id: { _type: "slug" as const, current: "results" }, title: "Results", paragraphs: ["Within the first six months, the organization moved from reactive patching to a proactive security posture with measurable improvements across response time and operational overhead."], bullets: ["60% reduction in false-positive alerts", "Faster incident triage with standardized runbooks", "Audit-ready reporting delivered on a recurring cadence", "Clinical teams remained focused on patient care"] },
    { id: { _type: "slug" as const, current: "conclusion" }, title: "Conclusion", paragraphs: ["The program gave the provider a security layer that works in the background—clear reporting for leadership, reliable monitoring for the SOC, and confidence that patient data stays protected as the organization grows.", "Nexify Africa continues to support quarterly reviews and managed services as the client expands its digital footprint."] },
  ],
};

const homePage = {
  _id: "homePage",
  _type: "homePage" as const,
  // Hero
  heroLines: "A Force For Progress in Tech Across Africa",
  heroRevealLines:
    "We create strategies, brand systems, digital products, and experiences for the world's most disruptive thinkers.",
  heroCtaText: "Our work",
  heroCtaHref: "#work",
  // Principles
  principlesHeadingBefore: "We help teams ",
  principlesHeadingHighlight: "move with intent",
  principlesHeadingAfter:
    ", build for scale, and design digital products that survive contact with reality.",
  // Services
  servicesHeading: "Our Services",
  // FAQ
  faqHeadingItalic: "Questions?",
  faqHeading: "Glad you asked.",
  // Build CTA
  buildCtaHeading: "Wanna Build Something?",
  buildCtaDescription:
    "We've solved problems in over 15 industries. If you've got a challenge, we've likely tackled something similar.",
  buildCtaButtonText: "Let's Build Together",
  buildCtaButtonHref: "/contact",
  // Case studies page hero
  caseStudiesHeroLines: "Stories of change — and the strategy behind them",
  caseStudiesRevealLines: "Real outcomes. Measured impact.",
};

// Helpers to build Portable Text blocks
function ptBlock(key: string, style: string, text: string) {
  return {
    _type: "block",
    _key: key,
    style,
    children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
    markDefs: [],
  };
}
function ptBullet(key: string, text: string) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
    markDefs: [],
  };
}
function ptNumber(key: string, text: string) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    listItem: "number",
    level: 1,
    children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
    markDefs: [],
  };
}

// Full manifesto content (sections A–I), authored as structured blocks so it
// can be converted to Portable Text and managed in Sanity.
type ManifestoBlk =
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { quote: string };

type ManifestoSeedSection = {
  label: string;
  blocks: ManifestoBlk[];
  imageAfter?: boolean;
};

const manifestoSections: ManifestoSeedSection[] = [
  {
    label: "A. THE PARADOX",
    blocks: [
      { p: `Here's what doesn't make sense: Africa pioneered mobile money — M-Pesa moved billions before Apple Pay existed. African farmers use SMS to get market prices while their American counterparts still rely on century-old commodity exchanges. African entrepreneurs build billion-dollar companies with duct tape and determination.` },
      { p: `Yet somehow, the same continent that taught the world financial inclusion is still running on spreadsheets. The same innovators who reimagined banking are stuck with ERP systems designed for 1990s Europe. The same markets that leapfrogged landlines are drowning in software that treats Africa like an afterthought.` },
      { p: `This is the paradox that keeps us awake: Africa innovates around broken technology instead of demanding technology that amplifies innovation.` },
    ],
  },
  {
    label: "B. THE GREAT AFRICAN SOFTWARE BETRAYAL",
    blocks: [
      { p: `For two decades, global software companies have treated Africa like a testing ground for last year's features. They've sold us "emerging market solutions" — a euphemism for simplified, stripped-down versions of tools that work brilliantly elsewhere.` },
      { p: `Meanwhile, local companies have built impressive solutions... for problems that shouldn't exist. We've created workarounds for workarounds. We've digitized dysfunction instead of reimagining possibilities.` },
      { p: `The result? African businesses run on digital duct tape:` },
      { ul: [
        `Banks that process millions of transactions daily still reconcile accounts manually`,
        `Agricultural cooperatives that feed nations track inventory on WhatsApp`,
        `NGOs that manage million-dollar budgets copy-paste between Excel and email`,
        `Logistics companies that move goods across borders use paper receipts and phone calls`,
        `Government agencies that serve millions still file reports in triplicate`,
      ] },
      { p: `This isn't just inefficiency — it's technological colonialism. Africa's brilliant minds are trapped solving problems that better software would eliminate entirely.` },
    ],
    imageAfter: true,
  },
  {
    label: "C. THE MISSING PIECES",
    blocks: [
      { p: `After working with hundreds of businesses across East Africa, we've identified the systematic gaps that keep African companies from reaching their potential:` },
      { ol: [
        `Context-Aware Intelligence — Most software assumes stable internet, reliable power, and predictable workflows.`,
        `Integration That Actually Integrates — African businesses don't have the luxury of single-vendor solutions. They need systems that talk to M-Pesa and Mastercard, that connect village cooperatives with export markets, that bridge the gap between traditional practices and digital possibilities.`,
        `Scale-Smart Architecture — African companies grow in leaps, not increments. A business might serve 1,000 customers today and 100,000 next year. They need software that scales like African ambition — rapidly, affordably, and without requiring complete rebuilds.`,
        `Compliance That Doesn't Crush — Operating across African markets means navigating dozens of regulatory frameworks. Businesses need systems that handle complexity gracefully, not bureaucracy that buries innovation under paperwork.`,
        `Local Intelligence, Global Standards — African businesses compete globally but operate locally. They need software that understands Tanzanian tax law and Kenyan import procedures while delivering the performance standards of Silicon Valley.`,
      ] },
      { quote: `African businesses need systems that thrive in uncertainty — that work offline, sync when connected, and adapt to local realities without breaking.` },
    ],
  },
  {
    label: "D. THE NEXIFY THESIS",
    blocks: [
      { p: `We founded Nexify Africa on a simple but radical premise: African businesses deserve software as sophisticated as their ambitions.` },
      { p: `Not "good enough for Africa" software. Not "emerging market" compromises. Not hand-me-down solutions from markets that don't understand how innovation actually happens here.` },
      { p: `Software that amplifies what's already extraordinary about African business:` },
      { ul: [
        `The resourcefulness that builds billion-dollar companies with minimal capital`,
        `The resilience that thrives despite infrastructure challenges`,
        `The innovation that creates entirely new markets and business models`,
        `The determination that finds opportunities where others see obstacles`,
      ] },
      { p: `Our Core Beliefs:` },
      { ol: [
        `Africa Doesn't Need Catching Up — It Needs Leaping Ahead — We don't build yesterday's solutions for today's problems. We architect tomorrow's possibilities for leaders who refuse to accept limitations.`,
        `Local Insight + Global Excellence = Unstoppable — Understanding matatu route optimization and international payment rails. Speaking fluent Kiswahili and fluent Python. This combination is our competitive advantage.`,
        `Technology Should Eliminate Problems, Not Create Them — Every system we build should make someone's job easier, faster, or more profitable. If it doesn't, we haven't finished building it.`,
        `Scale Happens Fast in Africa — Software Should Keep Up — We design for the business you're becoming, not just the business you are today. Because in Africa, "hockey stick growth" isn't a metaphor — it's Tuesday.`,
      ] },
    ],
  },
  {
    label: "E. THE SECTORS WE'RE TRANSFORMING",
    blocks: [
      { p: `Financial Services & FinTech — From mobile money integration that actually works to risk assessment models trained on African data patterns — we're building the financial infrastructure for Africa's next economic leap.` },
      { p: `Agriculture & AgriTech — Supply chain transparency from farm to export. Weather-smart irrigation systems. Market linkage platforms that get farmers fair prices. Technology that treats agriculture like the sophisticated industry it is.` },
      { p: `Healthcare Systems — Patient records that follow people across clinic networks. Telemedicine platforms built for African connectivity realities. Inventory systems that prevent medicine shortages before they happen.` },
      { p: `Government & Public Sector — Digital services that citizens actually want to use. Transparency platforms that build trust. Administrative systems that serve millions without breaking down.` },
      { p: `Logistics & Trade — Real-time cargo tracking across complex trade routes. Automated customs processing. Route optimization that accounts for African road realities.` },
      { p: `Each sector gets technology designed for its unique challenges and built to amplify its unique strengths.` },
    ],
  },
  {
    label: "F. THE NEXIFY DIFFERENCE",
    blocks: [
      { p: `We Start with the Hard Problems — While others optimize marketing funnels, we solve supply chain complexity. While others build social features, we architect systems that work across borders, languages, and currencies.` },
      { p: `We Think in Systems, Not Apps — An inventory system that doesn't integrate with accounting is just an expensive calculator. We build ecosystems that make entire business models possible.` },
      { p: `We Design for African Scale — Not Silicon Valley scale — African scale. Rapid growth with limited resources. Massive geographic spread with inconsistent infrastructure. Enormous opportunity with complex execution.` },
      { p: `We Ship Solutions, Not Software — Our job isn't finished when the code works. It's finished when businesses are making more money, serving more customers, or solving bigger problems.` },
    ],
  },
  {
    label: "G. THE FUTURE WE'RE BUILDING",
    blocks: [
      { p: `In five years, when someone asks "What happened to Africa's digital promise?" the answer will be simple: It wasn't broken. It was just getting started.` },
      { p: `We envision an Africa where:` },
      { ul: [
        `Businesses scale limited only by market size, not software limitations`,
        `Innovation happens at African speed — which is to say, impossibly fast`,
        `Technology amplifies human potential instead of constraining it`,
        `Digital infrastructure serves African ambition, not foreign assumptions`,
      ] },
      { p: `This isn't wishful thinking. This is inevitable. The only question is who builds it.` },
    ],
  },
  {
    label: "H. WHY THIS MATTERS",
    blocks: [
      { p: `This isn't just about better software. It's about economic justice.` },
      { p: `Every time an African business fails because of technological limitations — limitations that wouldn't exist for a company in Silicon Valley — that's a missed opportunity for the entire continent. Jobs not created. Innovation not scaled. Potential not realized.` },
      { p: `Every time brilliant African minds spend their days fighting software instead of fighting poverty, inequality, or climate change — that's a tragedy multiplied across millions of people.` },
      { p: `We're not building software. We're building the digital infrastructure for African prosperity.` },
    ],
  },
  {
    label: "I. THE EXPERIMENT CONTINUES",
    blocks: [
      { p: `Like the entrepreneurs we serve, we're running an experiment. We believe that world-class technology, built by people who understand African markets, will unlock economic potential that benefits everyone.` },
      { p: `We believe that the next breakthrough in financial inclusion will come from Dar es Salaam, not San Francisco. That the future of agricultural technology is being written in Kenyan fields, not California labs. That the most innovative government services are being designed by people who understand what citizens actually need.` },
      { p: `We might be wrong. But we're betting our company, our time, and our reputations that we're right.` },
      { p: `Because the alternative — accepting that African businesses deserve second-class technology — is unacceptable.` },
      { p: `The future is being built now. The only question is whether it's being built here, by us, for us.` },
      { p: `At Nexify Africa, the answer is yes.` },
    ],
  },
];

type SeedImageBlock = {
  _type: "image";
  _key: string;
  asset: { _type: "reference"; _ref: string };
  alt?: string;
};

function buildManifestoBody(imageBlock: SeedImageBlock | null) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: any[] = [];
  let counter = 0;
  const key = () => `mb-${(counter++).toString(36)}`;

  for (const section of manifestoSections) {
    out.push(ptBlock(key(), "h2", section.label));
    for (const block of section.blocks) {
      if ("p" in block) out.push(ptBlock(key(), "normal", block.p));
      else if ("quote" in block) out.push(ptBlock(key(), "blockquote", block.quote));
      else if ("ul" in block) for (const item of block.ul) out.push(ptBullet(key(), item));
      else if ("ol" in block) for (const item of block.ol) out.push(ptNumber(key(), item));
    }
    if (section.imageAfter && imageBlock) out.push(imageBlock);
  }

  return out;
}

const manifestoBase = {
  _id: "manifestoPage",
  _type: "manifestoPage" as const,
  heroLines: "Our manifesto",
  heroRevealLines: "Where Did Africa's Digital Promise Go?",
  title: "Where Did Africa's Digital Promise Go?",
  kicker: "Our Manifesto",
  lead: "We build software for the leaders writing Africa's next chapter because the continent that gave the world mobile money deserves technology that matches its ambition.",
};

const teamPage = {
  _id: "teamPage",
  _type: "teamPage" as const,
  heroLines: "The team behind",
  heroRevealLines: "A senior team. No hand-offs, no layers. You work directly with us",
};

const contactPage = {
  _id: "contactPage",
  _type: "contactPage" as const,
  heroLines: "Contact",
  heroRevealLines: "Let's start the conversation",
  visualHeadline: "Got an idea? Let's build it right.",
  visualDescription: "From strategy and brand systems to full product development, we help Africa's most ambitious teams build software that converts, scales, and stands out.",
  form: {
    nameLabel: "Name",
    namePlaceholder: "John Carter",
    emailLabel: "Email",
    emailPlaceholder: "example@nexifyafrica.com",
    companyLabel: "Company",
    companyPlaceholder: "Your company",
    detailsLabel: "Project details",
    detailsPlaceholder: "Tell us about your project",
    submitText: "Send Message",
    submitSentText: "Message sent",
  },
  details: [
    { id: "phone", title: "Phone:", lines: ["+255687473582"], href: "tel:+255687473582" },
    { id: "email", title: "Email:", lines: ["info@nexifyafrica.com"], href: "mailto:info@nexifyafrica.com" },
    { id: "address", title: "Address:", lines: ["Masaki, Haile Selassie Road,", "Dar es Salaam, Tanzania"] },
  ],
};

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings" as const,
  brandName: "Nexify Africa",
  footerWordmark: "Nexify Africa",
  navLinks: [
    { _key: "nav-home", label: "Home", href: "/" },
    { _key: "nav-manifesto", label: "Manifesto", href: "/manifesto" },
    { _key: "nav-team", label: "Team", href: "/team" },
    { _key: "nav-case-studies", label: "Case Studies", href: "/case-studies" },
    { _key: "nav-careers", label: "Careers", href: "/careers" },
  ],
  contactLinkLabel: "Contact",
  contactLinkHref: "/contact",
  subscribeLabel: "Subscribe",
  subscribePlaceholder: "Enter your email",
  subscribeButtonText: "Subscribe",
  subscribeNote: "By subscribing you agree to with our Privacy Policy.",
  subscribeSuccessMessage: "Thanks for subscribing. We'll be in touch soon.",
  copyright: "© {year} Nexify Africa. All rights reserved.",
  seoTitle: "Nexify Africa",
  seoTitleTemplate: "%s — Nexify Africa",
  seoDescription:
    "Strategy, brand systems, and digital products for Africa's most disruptive thinkers.",
};

const careersPage = {
  _id: "careersPage",
  _type: "careersPage" as const,
  heroLines: "Careers",
  heroRevealLines: "Open roles and opportunities are coming soon.",
  kicker: "Coming soon",
  description: "Open roles and opportunities are coming soon.",
  primaryCtaLabel: "Back to home",
  primaryCtaHref: "/",
  secondaryCtaLabel: "View case studies",
  secondaryCtaHref: "/case-studies",
};

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Error: SANITY_API_WRITE_TOKEN is not set in .env.local");
    console.error("Create an Editor token at https://www.sanity.io/manage → your project → API → Tokens");
    process.exit(1);
  }

  console.log("Seeding Sanity dataset...\n");

  // Services
  for (const s of services) {
    await client.createOrReplace({ _id: `service-${s.id}`, _type: "service", ...s });
    console.log(`  ✓ service: ${s.title}`);
  }

  // FAQ
  for (const f of faqItems) {
    await client.createOrReplace({ _id: `faq-${f.id}`, _type: "faqItem", ...f });
    console.log(`  ✓ faqItem: ${f.question.slice(0, 50)}`);
  }

  // Principles
  for (const p of principles) {
    await client.createOrReplace({ _id: `principle-${p.id}`, _type: "principle", ...p });
    console.log(`  ✓ principle: ${p.title}`);
  }

  // Team members
  for (const m of teamMembers) {
    await client.createOrReplace({ _id: `team-${m.id}`, _type: "teamMember", ...m });
    console.log(`  ✓ teamMember: ${m.name}`);
  }

  // Case study
  await client.createOrReplace(caseStudy);
  console.log(`  ✓ caseStudy: ${caseStudy.title}`);

  // Singletons
  await client.createOrReplace(siteSettings);
  console.log("  ✓ siteSettings singleton");

  await client.createOrReplace(careersPage);
  console.log("  ✓ careersPage singleton");

  await client.createOrReplace(homePage);
  console.log("  ✓ homePage singleton");

  // Upload the manifesto image so it can be embedded in the Portable Text body.
  // Sanity dedupes assets by content hash, so re-running reuses the same asset.
  let manifestoImageBlock: SeedImageBlock | null = null;
  try {
    const warehousePath = join(
      process.cwd(),
      "public",
      "images",
      "manifesto",
      "warehouse-tablet.png",
    );
    const asset = await client.assets.upload("image", readFileSync(warehousePath), {
      filename: "warehouse-tablet.png",
    });
    manifestoImageBlock = {
      _type: "image",
      _key: "mb-img-warehouse",
      asset: { _type: "reference", _ref: asset._id },
      alt: "Warehouse operator reviewing inventory and analytics on a tablet",
    };
    console.log("  ✓ uploaded manifesto image");
  } catch (err) {
    console.warn("  ! could not upload manifesto image (continuing without it)", err);
  }

  await client.createOrReplace({
    ...manifestoBase,
    body: buildManifestoBody(manifestoImageBlock),
  });
  console.log("  ✓ manifestoPage singleton");

  await client.createOrReplace(teamPage);
  console.log("  ✓ teamPage singleton");

  await client.createOrReplace(contactPage);
  console.log("  ✓ contactPage singleton");

  console.log("\nDone! Open http://localhost:3000/studio to review your content.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
