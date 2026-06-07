export type HomeService = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const HOME_SERVICES_HEADING = "Our Services";

export const HOME_SERVICES: readonly HomeService[] = [
  {
    id: "corporate-strategy",
    number: "01.",
    title: "Corporate Strategy",
    description:
      "Define the roadmap. We align your long-term vision with actionable quarterly milestones.",
  },
  {
    id: "risk-management",
    number: "02.",
    title: "Risk Management",
    description:
      "Identify vulnerabilities. We stress-test your operations against market volatility.",
  },
  {
    id: "capital-allocation",
    number: "03.",
    title: "Capital Allocation",
    description:
      "Optimize resources. Ensure every dollar deployed drives maximum ROI for stakeholders.",
  },
  {
    id: "digital-transformation",
    number: "04.",
    title: "Digital Transformation",
    description:
      "Modernize legacy systems. We integrate AI and cloud infrastructure to speed up workflow.",
  },
  {
    id: "mergers-acquisitions",
    number: "05.",
    title: "Mergers & Acquisitions",
    description:
      "Navigate complexity. From due diligence to post-merger integration, we secure the deal.",
  },
  {
    id: "executive-coaching",
    number: "06.",
    title: "Executive Coaching",
    description:
      "Empower leadership. We train C-Suite executives to lead with clarity and authority.",
  },
] as const;
