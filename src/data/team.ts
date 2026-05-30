export type TeamMember = {
  id: string;
  name: string;
  role: string;
};

export const TEAM_IMAGE = "/images/team/member-portrait.png";

export const TEAM_HERO_LINES = ["The team behind"] as const;

export const TEAM_HERO_REVEAL_LINES = [
  "A senior team.",
  "No hand-offs, no layers.",
  "You work directly with us",
] as const;

export const TEAM_MEMBERS: TeamMember[] = [
  { id: "john-kowalski", name: "John Kowalski", role: "Partner" },
  { id: "janina-boderek", name: "Janina Boderek", role: "Founder" },
  { id: "sarah-johnson", name: "Sarah Johnson", role: "Senior Consultant" },
  { id: "michael-brown", name: "Michael Brown", role: "Strategy Lead" },
  { id: "david-garcia", name: "David Garcia", role: "Innovation Officer" },
  { id: "robert-miller", name: "Robert Miller", role: "Solutions Architect" },
  { id: "jessica-mercedes", name: "Jessica Mercedes", role: "Client Director" },
  { id: "kevin-rodriguez", name: "Kevin Rodriguez", role: "Project Manager" },
];
