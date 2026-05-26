export type ManifestoBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "pullquote"; text: string };

export type ManifestoSection = {
  id: string;
  label: string;
  blocks: ManifestoBlock[];
  imageAfter?: boolean;
};

export const MANIFESTO_HERO = {
  lines: ["Where Did Africa's", "Digital Promise Go?"] as const,
  title: "Where Did Africa's Digital Promise Go?",
  kicker: "Our Manifesto",
  lead: "We build software for the leaders writing Africa's next chapter because the continent that gave the world mobile money deserves technology that matches its ambition.",
};

export const MANIFESTO_SECTIONS: ManifestoSection[] = [
  {
    id: "paradox",
    label: "A. THE PARADOX",
    blocks: [
      {
        type: "paragraph",
        text: "Here's what doesn't make sense: Africa pioneered mobile money — M-Pesa moved billions before Apple Pay existed. African farmers use SMS to get market prices while their American counterparts still rely on century-old commodity exchanges. African entrepreneurs build billion-dollar companies with duct tape and determination.",
      },
      {
        type: "paragraph",
        text: "Yet somehow, the same continent that taught the world financial inclusion is still running on spreadsheets. The same innovators who reimagined banking are stuck with ERP systems designed for 1990s Europe. The same markets that leapfrogged landlines are drowning in software that treats Africa like an afterthought.",
      },
      {
        type: "paragraph",
        text: "This is the paradox that keeps us awake: Africa innovates around broken technology instead of demanding technology that amplifies innovation.",
      },
    ],
  },
  {
    id: "betrayal",
    label: "B. THE GREAT AFRICAN SOFTWARE BETRAYAL",
    blocks: [
      {
        type: "paragraph",
        text: 'For two decades, global software companies have treated Africa like a testing ground for last year\'s features. They\'ve sold us "emerging market solutions" — a euphemism for simplified, stripped-down versions of tools that work brilliantly elsewhere.',
      },
      {
        type: "paragraph",
        text: "Meanwhile, local companies have built impressive solutions... for problems that shouldn't exist. We've created workarounds for workarounds. We've digitized dysfunction instead of reimagining possibilities.",
      },
      {
        type: "paragraph",
        text: "The result? African businesses run on digital duct tape:",
      },
      {
        type: "list",
        items: [
          "Banks that process millions of transactions daily still reconcile accounts manually",
          "Agricultural cooperatives that feed nations track inventory on WhatsApp",
          "NGOs that manage million-dollar budgets copy-paste between Excel and email",
          "Logistics companies that move goods across borders use paper receipts and phone calls",
          "Government agencies that serve millions still file reports in triplicate",
        ],
      },
      {
        type: "paragraph",
        text: "This isn't just inefficiency — it's technological colonialism. Africa's brilliant minds are trapped solving problems that better software would eliminate entirely.",
      },
    ],
    imageAfter: true,
  },
  {
    id: "missing-pieces",
    label: "C. THE MISSING PIECES",
    blocks: [
      {
        type: "paragraph",
        text: "After working with hundreds of businesses across East Africa, we've identified the systematic gaps that keep African companies from reaching their potential:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Context-Aware Intelligence — Most software assumes stable internet, reliable power, and predictable workflows.",
          "Integration That Actually Integrates — African businesses don't have the luxury of single-vendor solutions. They need systems that talk to M-Pesa and Mastercard, that connect village cooperatives with export markets, that bridge the gap between traditional practices and digital possibilities.",
          "Scale-Smart Architecture — African companies grow in leaps, not increments. A business might serve 1,000 customers today and 100,000 next year. They need software that scales like African ambition — rapidly, affordably, and without requiring complete rebuilds.",
          "Compliance That Doesn't Crush — Operating across African markets means navigating dozens of regulatory frameworks. Businesses need systems that handle complexity gracefully, not bureaucracy that buries innovation under paperwork.",
          "Local Intelligence, Global Standards — African businesses compete globally but operate locally. They need software that understands Tanzanian tax law and Kenyan import procedures while delivering the performance standards of Silicon Valley.",
        ],
      },
      {
        type: "pullquote",
        text: "African businesses need systems that thrive in uncertainty — that work offline, sync when connected, and adapt to local realities without breaking.",
      },
    ],
  },
  {
    id: "thesis",
    label: "D. THE NEXIFY THESIS",
    blocks: [
      {
        type: "paragraph",
        text: "We founded Nexify Africa on a simple but radical premise: African businesses deserve software as sophisticated as their ambitions.",
      },
      {
        type: "paragraph",
        text: 'Not "good enough for Africa" software. Not "emerging market" compromises. Not hand-me-down solutions from markets that don\'t understand how innovation actually happens here.',
      },
      {
        type: "paragraph",
        text: "Software that amplifies what's already extraordinary about African business:",
      },
      {
        type: "list",
        items: [
          "The resourcefulness that builds billion-dollar companies with minimal capital",
          "The resilience that thrives despite infrastructure challenges",
          "The innovation that creates entirely new markets and business models",
          "The determination that finds opportunities where others see obstacles",
        ],
      },
      {
        type: "paragraph",
        text: "Our Core Beliefs:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Africa Doesn't Need Catching Up — It Needs Leaping Ahead — We don't build yesterday's solutions for today's problems. We architect tomorrow's possibilities for leaders who refuse to accept limitations.",
          "Local Insight + Global Excellence = Unstoppable — Understanding matatu route optimization and international payment rails. Speaking fluent Kiswahili and fluent Python. This combination is our competitive advantage.",
          "Technology Should Eliminate Problems, Not Create Them — Every system we build should make someone's job easier, faster, or more profitable. If it doesn't, we haven't finished building it.",
          'Scale Happens Fast in Africa — Software Should Keep Up — We design for the business you\'re becoming, not just the business you are today. Because in Africa, "hockey stick growth" isn\'t a metaphor — it\'s Tuesday.',
        ],
      },
    ],
    imageAfter: true,
  },
  {
    id: "sectors",
    label: "E. THE SECTORS WE'RE TRANSFORMING",
    blocks: [
      {
        type: "paragraph",
        text: "Financial Services & FinTech — From mobile money integration that actually works to risk assessment models trained on African data patterns — we're building the financial infrastructure for Africa's next economic leap.",
      },
      {
        type: "paragraph",
        text: "Agriculture & AgriTech — Supply chain transparency from farm to export. Weather-smart irrigation systems. Market linkage platforms that get farmers fair prices. Technology that treats agriculture like the sophisticated industry it is.",
      },
      {
        type: "paragraph",
        text: "Healthcare Systems — Patient records that follow people across clinic networks. Telemedicine platforms built for African connectivity realities. Inventory systems that prevent medicine shortages before they happen.",
      },
      {
        type: "paragraph",
        text: "Government & Public Sector — Digital services that citizens actually want to use. Transparency platforms that build trust. Administrative systems that serve millions without breaking down.",
      },
      {
        type: "paragraph",
        text: "Logistics & Trade — Real-time cargo tracking across complex trade routes. Automated customs processing. Route optimization that accounts for African road realities.",
      },
      {
        type: "paragraph",
        text: "Each sector gets technology designed for its unique challenges and built to amplify its unique strengths.",
      },
    ],
  },
  {
    id: "difference",
    label: "F. THE NEXIFY DIFFERENCE",
    blocks: [
      {
        type: "paragraph",
        text: "We Start with the Hard Problems — While others optimize marketing funnels, we solve supply chain complexity. While others build social features, we architect systems that work across borders, languages, and currencies.",
      },
      {
        type: "paragraph",
        text: "We Think in Systems, Not Apps — An inventory system that doesn't integrate with accounting is just an expensive calculator. We build ecosystems that make entire business models possible.",
      },
      {
        type: "paragraph",
        text: "We Design for African Scale — Not Silicon Valley scale — African scale. Rapid growth with limited resources. Massive geographic spread with inconsistent infrastructure. Enormous opportunity with complex execution.",
      },
      {
        type: "paragraph",
        text: "We Ship Solutions, Not Software — Our job isn't finished when the code works. It's finished when businesses are making more money, serving more customers, or solving bigger problems.",
      },
    ],
    imageAfter: true,
  },
  {
    id: "future",
    label: "G. THE FUTURE WE'RE BUILDING",
    blocks: [
      {
        type: "paragraph",
        text: 'In five years, when someone asks "What happened to Africa\'s digital promise?" the answer will be simple: It wasn\'t broken. It was just getting started.',
      },
      {
        type: "paragraph",
        text: "We envision an Africa where:",
      },
      {
        type: "list",
        items: [
          "Businesses scale limited only by market size, not software limitations",
          "Innovation happens at African speed — which is to say, impossibly fast",
          "Technology amplifies human potential instead of constraining it",
          "Digital infrastructure serves African ambition, not foreign assumptions",
        ],
      },
      {
        type: "paragraph",
        text: "This isn't wishful thinking. This is inevitable. The only question is who builds it.",
      },
    ],
  },
  {
    id: "stakes",
    label: "H. WHY THIS MATTERS",
    blocks: [
      {
        type: "paragraph",
        text: "This isn't just about better software. It's about economic justice.",
      },
      {
        type: "paragraph",
        text: "Every time an African business fails because of technological limitations — limitations that wouldn't exist for a company in Silicon Valley — that's a missed opportunity for the entire continent. Jobs not created. Innovation not scaled. Potential not realized.",
      },
      {
        type: "paragraph",
        text: "Every time brilliant African minds spend their days fighting software instead of fighting poverty, inequality, or climate change — that's a tragedy multiplied across millions of people.",
      },
      {
        type: "paragraph",
        text: "We're not building software. We're building the digital infrastructure for African prosperity.",
      },
    ],
    imageAfter: true,
  },
  {
    id: "experiment",
    label: "I. THE EXPERIMENT CONTINUES",
    blocks: [
      {
        type: "paragraph",
        text: "Like the entrepreneurs we serve, we're running an experiment. We believe that world-class technology, built by people who understand African markets, will unlock economic potential that benefits everyone.",
      },
      {
        type: "paragraph",
        text: "We believe that the next breakthrough in financial inclusion will come from Dar es Salaam, not San Francisco. That the future of agricultural technology is being written in Kenyan fields, not California labs. That the most innovative government services are being designed by people who understand what citizens actually need.",
      },
      {
        type: "paragraph",
        text: "We might be wrong. But we're betting our company, our time, and our reputations that we're right.",
      },
      {
        type: "paragraph",
        text: "Because the alternative — accepting that African businesses deserve second-class technology — is unacceptable.",
      },
      {
        type: "paragraph",
        text: "The future is being built now. The only question is whether it's being built here, by us, for us.",
      },
      {
        type: "paragraph",
        text: "At Nexify Africa, the answer is yes.",
      },
    ],
  },
];
