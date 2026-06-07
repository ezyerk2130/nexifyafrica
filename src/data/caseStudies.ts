export type CaseStudyCard = {
  client: string;
  title: string;
  metric: string;
  metricLabel: string;
  slug?: string;
};

export type CaseStudySidebar = {
  client: string;
  industry: string;
  services: string;
  projectDuration: string;
};

export type CaseStudyContentBlock = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  image?: {
    src?: string;
    alt?: string;
    variant: "wide" | "square";
  };
};

export type CaseStudyDetail = {
  slug: string;
  title: string;
  heroLines: readonly string[];
  heroRevealLines: readonly string[];
  sidebar: CaseStudySidebar;
  sections: readonly CaseStudyContentBlock[];
};

export const CASE_STUDY_DETAILS: Record<string, CaseStudyDetail> = {
  "modernizing-healthcare-security": {
    slug: "modernizing-healthcare-security",
    title: "Modernizing Healthcare Security with SecOps",
    heroLines: ["Modernizing Healthcare", "Security with SecOps"],
    heroRevealLines: [
      "Healthcare organizations need more than security tools—",
      "they need operational trust.",
    ],
    sidebar: {
      client: "Regional Health Network",
      industry: "Healthcare",
      services: "SecOps governance, SOC optimization, managed security",
      projectDuration: "January 2024 – July 2024",
    },
    sections: [
      {
        id: "overview",
        title: "Overview",
        paragraphs: [
          "A regional healthcare provider needed to strengthen security operations without disrupting clinical workflows. Nexify Africa partnered with their leadership team to modernize monitoring, reduce alert fatigue, and build a SecOps program that scales with the organization.",
        ],
      },
      {
        id: "challenge",
        title: "The challenge",
        paragraphs: [
          "Legacy tooling produced high volumes of alerts with limited context, while compliance requirements continued to expand across clinical and administrative systems. The internal team lacked bandwidth to triage incidents and maintain audit-ready documentation.",
        ],
        bullets: [
          "Alert fatigue slowed incident response across the SOC",
          "Fragmented logging made root-cause analysis difficult",
          "Compliance reporting required manual, time-consuming assembly",
          "Clinical staff could not be pulled into security operations",
        ],
      },
      {
        id: "approach",
        title: "Our approach",
        paragraphs: [
          "We started with a structured discovery phase, then aligned stakeholders on priorities before implementing tuned detection, standardized runbooks, and managed monitoring that could run alongside day-to-day care delivery.",
        ],
        bullets: [
          "Mapped existing controls, workflows, and compliance gaps",
          "Defined SecOps objectives tied to uptime and audit readiness",
          "Prioritized high-signal detection rules over volume",
          "Integrated logging pipelines across clinical and back-office systems",
          "Established escalation paths with clear ownership",
        ],
      },
      {
        id: "solution",
        title: "The solution",
        paragraphs: [
          "We delivered a unified SecOps model with managed detection, SOC workflow redesign, and quarterly governance reviews—giving leadership visibility while keeping security operations out of the clinical lane.",
        ],
        image: {
          alt: "Healthcare security operations team collaborating",
          variant: "wide",
        },
      },
      {
        id: "results",
        title: "Results",
        paragraphs: [
          "Within the first six months, the organization moved from reactive patching to a proactive security posture with measurable improvements across response time and operational overhead.",
        ],
        bullets: [
          "60% reduction in false-positive alerts",
          "Faster incident triage with standardized runbooks",
          "Audit-ready reporting delivered on a recurring cadence",
          "Clinical teams remained focused on patient care",
        ],
        image: {
          alt: "Healthcare professionals in a clinical environment",
          variant: "square",
        },
      },
      {
        id: "conclusion",
        title: "Conclusion",
        paragraphs: [
          "The program gave the provider a security layer that works in the background—clear reporting for leadership, reliable monitoring for the SOC, and confidence that patient data stays protected as the organization grows.",
          "Nexify Africa continues to support quarterly reviews and managed services as the client expands its digital footprint.",
        ],
      },
    ],
  },
};

export const CASE_STUDY_CARDS: readonly CaseStudyCard[] = [
  {
    client: "Healthcare",
    title: "Modernizing Healthcare Security with SecOps",
    metric: "60%",
    metricLabel: "reduction in false positives",
    slug: "modernizing-healthcare-security",
  },
  {
    client: "Code_House",
    title: "Improving execution reliability for multi-team automation workflows",
    metric: "40%",
    metricLabel: "increase in release frequency",
  },
  {
    client: "Moana",
    title: "Reducing operational overhead across long-running data pipelines",
    metric: "70%",
    metricLabel: "reduction in manual intervention",
  },
  {
    client: "Jasmin Studio",
    title: "“Things started moving immediately. Less discussion, more execution.”",
    metric: "55%",
    metricLabel: "increase in team productivity",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudyDetail | undefined {
  return CASE_STUDY_DETAILS[slug];
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(CASE_STUDY_DETAILS);
}
