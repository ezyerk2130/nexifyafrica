/**
 * One-time seed script — imports all existing src/data/* content into Sanity.
 *
 * Usage:
 *   1. Set SANITY_API_WRITE_TOKEN in .env.local (Editor token from sanity.io/manage)
 *   2. npx tsx scripts/seed-sanity.ts
 *
 * This script is safe to run multiple times (uses createOrReplace).
 */

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
  heroLines: ["Modernizing Healthcare", "Security with SecOps"],
  heroRevealLines: ["Healthcare organizations need more than security tools—", "they need operational trust."],
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
  heroLines: ["A Force For Progress in Tech", "Across Africa"],
  heroRevealLines: [
    "We create strategies, brand systems, digital",
    "products, and experiences for the world's",
    "most disruptive thinkers.",
  ],
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
  // Case studies page hero
  caseStudiesHeroLines: [
    "Stories of change —",
    "and the strategy behind them",
  ],
  caseStudiesRevealLines: ["Real outcomes.", "Measured impact."],
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

const manifestoPage = {
  _id: "manifestoPage",
  _type: "manifestoPage" as const,
  heroLines: ["Our manifesto"],
  heroRevealLines: ["Where Did Africa's", "Digital Promise Go?"],
  title: "Where Did Africa's Digital Promise Go?",
  kicker: "Our Manifesto",
  lead: "We build software for the leaders writing Africa's next chapter because the continent that gave the world mobile money deserves technology that matches its ambition.",
  body: [
    // ── A. THE PARADOX ──────────────────────────────────────────────────────
    ptBlock("h2-a", "h2", "A. THE PARADOX"),
    ptBlock("p-a1", "normal", "Here's what doesn't make sense: Africa pioneered mobile money — M-Pesa moved billions before Apple Pay existed. African farmers use SMS to get market prices while their American counterparts still rely on century-old commodity exchanges. African entrepreneurs build billion-dollar companies with duct tape and determination."),
    ptBlock("p-a2", "normal", "Yet somehow, the same continent that taught the world financial inclusion is still running on spreadsheets. The same innovators who reimagined banking are stuck with ERP systems designed for 1990s Europe. The same markets that leapfrogged landlines are drowning in software that treats Africa like an afterthought."),
    ptBlock("p-a3", "normal", "This is the paradox that keeps us awake: Africa innovates around broken technology instead of demanding technology that amplifies innovation."),

    // ── B. THE GREAT AFRICAN SOFTWARE BETRAYAL ──────────────────────────────
    ptBlock("h2-b", "h2", "B. THE GREAT AFRICAN SOFTWARE BETRAYAL"),
    ptBlock("p-b1", "normal", "For two decades, global software companies have treated Africa like a testing ground for last year's features. They've sold us \"emerging market solutions\" — a euphemism for simplified, stripped-down versions of tools that work brilliantly elsewhere."),
    ptBlock("p-b2", "normal", "Meanwhile, local companies have built impressive solutions... for problems that shouldn't exist. We've created workarounds for workarounds. We've digitized dysfunction instead of reimagining possibilities."),
    ptBlock("p-b3", "normal", "The result? African businesses run on digital duct tape:"),
    ptBullet("bl-b1", "Banks that process millions of transactions daily still reconcile accounts manually"),
    ptBullet("bl-b2", "Agricultural cooperatives that feed nations track inventory on WhatsApp"),
    ptBullet("bl-b3", "NGOs that manage million-dollar budgets copy-paste between Excel and email"),
    ptBullet("bl-b4", "Logistics companies that move goods across borders use paper receipts and phone calls"),
    ptBullet("bl-b5", "Government agencies that serve millions still file reports in triplicate"),
    ptBlock("p-b4", "normal", "This isn't just inefficiency — it's technological colonialism. Africa's brilliant minds are trapped solving problems that better software would eliminate entirely."),

    // ── D. THE NEXIFY THESIS ────────────────────────────────────────────────
    ptBlock("h2-d", "h2", "D. THE NEXIFY THESIS"),
    ptBlock("p-d1", "normal", "We founded Nexify Africa on a simple but radical premise: African businesses deserve software as sophisticated as their ambitions."),
    ptBlock("p-d2", "normal", "Not \"good enough for Africa\" software. Not \"emerging market\" compromises. Not hand-me-down solutions from markets that don't understand how innovation actually happens here."),
  ],
};

const teamPage = {
  _id: "teamPage",
  _type: "teamPage" as const,
  heroLines: ["The team behind"],
  heroRevealLines: ["A senior team.", "No hand-offs, no layers.", "You work directly with us"],
};

const contactPage = {
  _id: "contactPage",
  _type: "contactPage" as const,
  heroLines: ["Contact"],
  heroRevealLines: ["Let's start", "the conversation"],
  visualHeadline: "Got an idea? Let's build it right.",
  visualDescription: "From strategy and brand systems to full product development, we help Africa's most ambitious teams build software that converts, scales, and stands out.",
  details: [
    { id: "phone", title: "Phone:", lines: ["+255687473582"], href: "tel:+255687473582" },
    { id: "email", title: "Email:", lines: ["info@nexifyafrica.com"], href: "mailto:info@nexifyafrica.com" },
    { id: "address", title: "Address:", lines: ["Masaki, Haile Selassie Road,", "Dar es Salaam, Tanzania"] },
  ],
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
  await client.createOrReplace(homePage);
  console.log("  ✓ homePage singleton");

  await client.createOrReplace(manifestoPage);
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
