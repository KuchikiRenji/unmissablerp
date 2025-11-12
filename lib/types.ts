export type StatsResponse = {
  playerCount: number;
  uptimeHours: number;
  economy: { gdp: number; businesses: number };
  playersOverTime: { t: string; v: number }[];
};

export type ApplyRequest = {
  fullName: string;
  discordTag: string;
  ign: string;
  age: number;
  experience: string;
  why: string;
};

export interface AssetItem {
  id: string;
  name: string;
  type: "script" | "mlo" | "vehicle";
  source: "custom" | "premade";
  status: "active" | "pending" | "testing";
  previewImage?: string;
  description?: string;
}

export const copy = {
  hero: {
    headline: "UNMISSABLERP — Next-level GTA RP",
    sub: "Gritty stories. High-stakes moments. A living city that remembers."
  },
  features: [
    {
      title: "Serious RP, Zero Nonsense",
      desc: "Curated whitelist keeps quality high and stories grounded.",
      image: "/IMAGEB.jpg"
    },
    {
      title: "Economy that Breathes",
      desc: "Supply, demand, and player-driven businesses shape the streets.",
      image: "/IMAGED.jpg"
    },
    {
      title: "Events that Matter",
      desc: "Heists, elections, turf wars — choices ripple through the city.",
      image: "/IMAGEE.jpg"
    }
  ],
  rules: ["Respect immersion.", "No hate or harassment.", "Staff decisions are final."]
};


