export type ArticleTone = "strategy" | "systems" | "product" | "growth";

export type ArticleSummary = {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  imagePosition?: string;
  tone: ArticleTone;
};

export type ArticleSection = {
  id: string;
  navLabel: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  image?: {
    src: string;
    alt: string;
    variant?: "wide" | "half";
    position?: string;
  };
};

export type ArticleDetail = ArticleSummary & {
  heroKicker: string;
  publishedLabel: string;
  author: string;
  intro: string;
  sections: ArticleSection[];
  quote: string;
  gallery: Array<{
    src: string;
    alt: string;
    position?: string;
  }>;
};

const DETAIL_SECTIONS: ArticleSection[] = [
  {
    id: "introduction",
    navLabel: "Introduction",
    title: "Introduction",
    paragraphs: [
      "Launching a digital product or growth platform is not the same as building a stronger company. The work succeeds when the team can explain the customer, the operating model, and the decisions the product is meant to improve.",
      "At Nexify Africa, we see the same pattern repeatedly: teams move faster when product strategy, workflow design, and useful data are shaped together instead of being handled as separate projects.",
    ],
  },
  {
    id: "competition",
    navLabel: "Why teams fail because of competition",
    title: "Most startups do not fail because of competition",
    paragraphs: [
      "Competition matters, but it is rarely the first problem. Early-stage teams usually lose momentum because they copy what the market appears to reward before they understand what their own customer truly needs.",
      "The bigger risk is building too much too soon. That creates complicated dashboards, brittle workflows, and onboarding paths that ask customers to decode the product before they see value.",
    ],
    bullets: [
      "Building something people do not actually want",
      "Rushing into development with no validation",
      "Lack of product-market fit clarity",
      "Poor user experience and friction-filled onboarding",
      "Scattered processes and no alignment inside the team",
    ],
    image: {
      src: "/images/manifesto/warehouse-tablet.png",
      alt: "A team member reviewing operational analytics on a tablet",
      variant: "wide",
    },
  },
  {
    id: "mistakes",
    navLabel: "Common product mistakes",
    title: "The most common product mistakes early startups make",
    paragraphs: [
      "Founders often fall in love with an idea. Users fall in love with solutions that reduce effort, remove uncertainty, and make the next action obvious.",
      "A focused MVP should prove the riskiest assumption first. If the product does not reveal whether a user understands, trusts, and repeats the workflow, the build is still guessing.",
    ],
    bullets: [
      "Building too much, too fast",
      "No real user validation",
      "Weak or confusing onboarding",
      "Treating UX as optional",
    ],
  },
  {
    id: "roadmap",
    navLabel: "Roadmap for building",
    title: "A practical roadmap for building a product that lasts",
    paragraphs: [
      "The strongest product roadmaps start with a narrow problem and a clear operating promise. They show who the product is for, what action it should make easier, and what evidence will prove it is working.",
      "From there, teams can design a system around the product: decision rules, data feedback, onboarding flows, support moments, and the internal ownership needed to keep improving it.",
    ],
  },
  {
    id: "success",
    navLabel: "What drives long-term success",
    title: "What drives long-term SaaS success",
    paragraphs: [
      "Long-term success comes from compounding clarity. Each release should teach the team something useful about customer behavior, workflow constraints, or the economics of delivery.",
      "That means the best products are not only well-designed screens. They are operating systems for how a team sells, supports, measures, and improves the promise it has made to the market.",
    ],
  },
  {
    id: "closing",
    navLabel: "Closing thoughts",
    title: "Closing thoughts",
    paragraphs: [
      "Teams win when they stop treating digital products as isolated builds and start treating them as business infrastructure. The product, the process, and the data should make each other stronger.",
      "That is the work worth doing before scale: choosing the right problem, building with intention, listening to your users, and delivering value clearly and consistently.",
    ],
    bullets: [
      "Choosing the right problem",
      "Building with intention",
      "Listening to your users",
      "Delivering value clearly and consistently",
    ],
  },
];

export const ARTICLES: ArticleDetail[] = [
  {
    slug: "scaling-smarter-intelligent-solutions-business-growth",
    category: "Growth",
    date: "Field note 01",
    publishedLabel: "December 18, 2025",
    readTime: "6 min read",
    author: "Nexify Africa",
    title: "Scaling Smarter: How Intelligent Solutions Empower Business Growth",
    excerpt:
      "It is about building systems that expand effortlessly so your team, platform, or product can handle more users.",
    image: "/images/manifesto/hero-collaboration.png",
    alt: "A team reviewing a tablet during a strategy session",
    tone: "strategy",
    heroKicker: "Article Details",
    intro:
      "Early-stage teams often underestimate how fragile their foundation really is. At the beginning, every decision feels small. The stronger teams design for clarity before the pressure arrives.",
    quote:
      "Designing useful digital systems is not about making things look good. It is about understanding how real people search for moments of certainty, speed, and trust.",
    gallery: [
      {
        src: "/images/home/wanna-build.png",
        alt: "Two product collaborators working around a laptop",
        position: "center",
      },
      {
        src: "/images/team/member-portrait.png",
        alt: "A product strategist portrait in warm light",
        position: "center",
      },
    ],
    sections: DETAIL_SECTIONS,
  },
  {
    slug: "operations-before-automation",
    category: "Systems",
    date: "Field note 02",
    publishedLabel: "January 9, 2026",
    readTime: "5 min read",
    author: "Nexify Africa",
    title: "Why automation only works after the operating model is clear",
    excerpt:
      "The practical questions we ask before turning workflows, reporting, and delivery into software.",
    image: "/images/manifesto/warehouse-tablet.png",
    alt: "A warehouse operator showing analytics on a tablet",
    imagePosition: "center",
    tone: "systems",
    heroKicker: "Article Details",
    intro:
      "Automation is useful only when the team already understands the decisions, handoffs, and exceptions inside the workflow.",
    quote:
      "The fastest automation project is the one that refuses to automate confusion.",
    gallery: [
      {
        src: "/images/manifesto/warehouse-tablet.png",
        alt: "Warehouse analytics on a tablet",
      },
      {
        src: "/images/manifesto/hero-collaboration.png",
        alt: "Team members reviewing a digital plan",
      },
    ],
    sections: DETAIL_SECTIONS,
  },
  {
    slug: "idea-to-mvp-without-losing-customer-signal",
    category: "Product",
    date: "Field note 03",
    publishedLabel: "January 22, 2026",
    readTime: "7 min read",
    author: "Nexify Africa",
    title: "From idea to MVP without losing the customer signal",
    excerpt:
      "A leaner launch path for founders who need evidence, not just a polished interface.",
    image: "/images/home/wanna-build.png",
    alt: "Two digital product collaborators with a laptop",
    imagePosition: "center",
    tone: "product",
    heroKicker: "Article Details",
    intro:
      "An MVP should be a learning engine. Its job is to expose the assumptions that matter before the team spends heavily.",
    quote:
      "The right MVP helps a team learn faster than its assumptions can harden.",
    gallery: [
      {
        src: "/images/home/wanna-build.png",
        alt: "Product collaborators with a laptop",
      },
      {
        src: "/images/contact/hero-bg.avif",
        alt: "Abstract warm signal light",
      },
    ],
    sections: DETAIL_SECTIONS,
  },
  {
    slug: "decision-velocity-dashboard-advantage",
    category: "Analytics",
    date: "Field note 04",
    publishedLabel: "February 5, 2026",
    readTime: "4 min read",
    author: "Nexify Africa",
    title: "Decision velocity is the quiet advantage most dashboards miss",
    excerpt:
      "Better reporting starts with the decisions leaders need to make each week.",
    image: "/images/contact/hero-bg.avif",
    alt: "Abstract warm light used as a visual metaphor for signal",
    imagePosition: "center",
    tone: "growth",
    heroKicker: "Article Details",
    intro:
      "Dashboards are not successful because they display more information. They work when they shorten the distance between signal and action.",
    quote:
      "A useful dashboard is a decision surface, not a wall of charts.",
    gallery: [
      {
        src: "/images/contact/hero-bg.avif",
        alt: "Abstract warm signal light",
      },
      {
        src: "/images/manifesto/warehouse-tablet.png",
        alt: "Operational analytics on a tablet",
      },
    ],
    sections: DETAIL_SECTIONS,
  },
  {
    slug: "founder-workflow-growth-chaos",
    category: "Workflow",
    date: "Field note 05",
    publishedLabel: "February 20, 2026",
    readTime: "6 min read",
    author: "Nexify Africa",
    title: "The founder workflow that stops growth from becoming chaos",
    excerpt:
      "A practical look at handoffs, ownership, and tooling before the team starts hiring fast.",
    image: "/images/team/member-portrait.png",
    alt: "Portrait of a product team member",
    imagePosition: "center",
    tone: "strategy",
    heroKicker: "Article Details",
    intro:
      "The founder workflow is the first operating system in a company. When it stays invisible for too long, growth turns messy.",
    quote:
      "The work a founder repeats manually is usually the first signal for what the company needs to systemize.",
    gallery: [
      {
        src: "/images/team/member-portrait.png",
        alt: "A product team member portrait",
      },
      {
        src: "/images/home/wanna-build.png",
        alt: "Product collaborators with a laptop",
      },
    ],
    sections: DETAIL_SECTIONS,
  },
  {
    slug: "customer-experience-built-into-operations",
    category: "Experience",
    date: "Field note 06",
    publishedLabel: "March 12, 2026",
    readTime: "5 min read",
    author: "Nexify Africa",
    title: "Customer experience is built into operations earlier than most teams think",
    excerpt:
      "The backstage systems that make digital products feel calmer, faster, and more reliable.",
    image: "/images/manifesto/hero-collaboration.png",
    alt: "A team collaborating around a tablet",
    imagePosition: "70% center",
    tone: "product",
    heroKicker: "Article Details",
    intro:
      "Customers feel the quality of internal systems, even when they never see them. Every unclear handoff eventually becomes a customer moment.",
    quote:
      "Customer experience is often decided backstage before a user ever opens the product.",
    gallery: [
      {
        src: "/images/manifesto/hero-collaboration.png",
        alt: "Team collaboration around a tablet",
      },
      {
        src: "/images/manifesto/warehouse-tablet.png",
        alt: "Operational analytics on a tablet",
      },
    ],
    sections: DETAIL_SECTIONS,
  },
];

export function articlePath(slug: string) {
  return `/careers/${slug}`;
}

export function getAllArticleSlugs() {
  return ARTICLES.map((article) => article.slug);
}

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3) {
  return ARTICLES.filter((article) => article.slug !== slug).slice(0, limit);
}
