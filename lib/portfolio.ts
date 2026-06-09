export type Sector =
  | "dental"
  | "legal"
  | "reforms"
  | "hospitality"
  | "ecommerce"
  | "restoration"
  | "food"
  | "architecture"
  | "marketing"
  | "events"
  | "music"
  | "other";

export type MockupTheme = "red" | "green" | "gold" | "graphite" | "blue";

export type ProjectMockup = {
  theme: MockupTheme;
  eyebrow: string;
  wordmark: string;
  tagline: string;
  chromeLight?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  sector: Sector;
  url: string | null;
  image?: string;
  year: number;
  conceptual?: boolean;
  inspiredBy?: { brand: string; url: string };
  mockup?: ProjectMockup;
};

export const PROJECTS: Project[] = [
  // ── Real clients ──────────────────────────────────────────
  {
    slug: "klippup",
    name: "KlippUp",
    sector: "marketing",
    year: 2026,
    url: "https://klippup.com/",
    image: "/portfolio/klippup.png",
  },
  {
    slug: "sushimaydo",
    name: "Sushi Maydo",
    sector: "restoration",
    year: 2026,
    url: "https://sushimaydo.es/",
    image: "/portfolio/sushimaydo.png",
  },
  {
    slug: "chinaway",
    name: "Chinaway",
    sector: "other",
    year: 2025,
    url: "https://chinaway.vercel.app/es",
    image: "/portfolio/chinaway.png",
  },
  {
    slug: "redline-marketing",
    name: "Redline Marketing",
    sector: "marketing",
    year: 2025,
    url: "https://redlinemarketing.lovable.app/",
    image: "/portfolio/redline-marketing.png",
  },
  {
    slug: "yg-event-solutions",
    name: "YG Event Solutions",
    sector: "events",
    year: 2025,
    url: "https://ygeventsolutions.com/",
    image: "/portfolio/yg-event-solutions.png",
  },
  {
    slug: "melodify",
    name: "Melodify",
    sector: "music",
    year: 2026,
    url: "https://melodify.es",
    image: "/portfolio/melodify.png",
  },

  // ── Conceptuales ──────────────────────────────────────────
  {
    slug: "big-mamma-concept",
    name: "Big Mamma",
    sector: "restoration",
    year: 2025,
    url: "https://www.bigmammagroup.com/es/",
    image: "/portfolio/big-mamma.png",
    conceptual: true,
    inspiredBy: { brand: "Big Mamma Group", url: "https://www.bigmammagroup.com/es/" },
  },
  {
    slug: "lady-dumpling-concept",
    name: "Lady Dumpling",
    sector: "food",
    year: 2025,
    url: "https://www.ladydumpling.com/",
    image: "/portfolio/lady-dumpling.png",
    conceptual: true,
    inspiredBy: { brand: "Lady Dumpling", url: "https://www.ladydumpling.com/" },
  },
  {
    slug: "nobu-barcelona-concept",
    name: "Nobu Barcelona",
    sector: "hospitality",
    year: 2025,
    url: "https://www.nobuhotels.com/barcelona/es/",
    image: "/portfolio/nobu-barcelona.png",
    conceptual: true,
    inspiredBy: { brand: "Nobu Barcelona", url: "https://www.nobuhotels.com/barcelona/es/" },
  },
  {
    slug: "big-architecture-concept",
    name: "BIG Architects",
    sector: "architecture",
    year: 2025,
    url: "https://big.dk/projects/tennessee-performing-arts-center-23847",
    image: "/portfolio/big-architects.png",
    conceptual: true,
    inspiredBy: { brand: "BIG Architects", url: "https://big.dk/" },
  },
];

export const FEATURED_SLUGS = [
  "klippup",
  "sushimaydo",
  "chinaway",
  "redline-marketing",
  "yg-event-solutions",
  "melodify",
] as const;

export function getFeatured(): Project[] {
  return FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)!).filter(Boolean);
}

export function getRealClients(): Project[] {
  return PROJECTS.filter((p) => !p.conceptual);
}

export function getConceptual(): Project[] {
  return PROJECTS.filter((p) => p.conceptual);
}
