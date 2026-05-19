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
    slug: "chinaway",
    name: "Chinaway",
    sector: "other",
    year: 2025,
    url: "https://chinaway.vercel.app/es",
    image: "/portfolio/chinaway.png",
  },
  {
    slug: "reformlab-barcelona",
    name: "Reformlab Barcelona",
    sector: "reforms",
    year: 2025,
    url: "https://reformlab-barcelona.surge.sh",
    image: "/portfolio/reformlab.png",
  },
  {
    slug: "redline-marketing",
    name: "Redline Marketing",
    sector: "marketing",
    year: 2025,
    url: "https://redlinemarketing.lovable.app/",
    mockup: {
      theme: "red",
      eyebrow: "Performance Marketing",
      wordmark: "Redline",
      tagline: "Estrategia digital con foco en resultados medibles.",
    },
  },
  {
    slug: "yg-event-solutions",
    name: "YG Event Solutions",
    sector: "events",
    year: 2025,
    url: "https://ygeventsolutions.com/",
    mockup: {
      theme: "gold",
      eyebrow: "Event Solutions",
      wordmark: "YG Events",
      tagline: "Eventos corporativos y experiencias a medida.",
    },
  },

  // ── Conceptuales ──────────────────────────────────────────
  {
    slug: "big-mamma-concept",
    name: "Big Mamma Concept",
    sector: "restoration",
    year: 2025,
    url: null,
    conceptual: true,
    inspiredBy: { brand: "Big Mamma Group", url: "https://www.bigmammagroup.com/es/" },
    mockup: {
      theme: "red",
      eyebrow: "Trattoria · Bistrot · Pizzeria",
      wordmark: "Big Mamma",
      tagline: "Una experiencia italiana, ruidosa y honesta.",
    },
  },
  {
    slug: "lady-dumpling-concept",
    name: "Lady Dumpling Concept",
    sector: "food",
    year: 2025,
    url: null,
    conceptual: true,
    inspiredBy: { brand: "Lady Dumpling", url: "https://www.ladydumpling.com/" },
    mockup: {
      theme: "green",
      eyebrow: "Dumpling House",
      wordmark: "Lady Dumpling",
      tagline: "Dim sum y bao en la barra.",
    },
  },
  {
    slug: "nobu-barcelona-concept",
    name: "Nobu Barcelona Concept",
    sector: "hospitality",
    year: 2025,
    url: null,
    conceptual: true,
    inspiredBy: { brand: "Nobu Barcelona", url: "https://www.nobuhotels.com/barcelona/es/" },
    mockup: {
      theme: "gold",
      eyebrow: "Hotel & Restaurant",
      wordmark: "NOBU",
      tagline: "Barcelona",
    },
  },
  {
    slug: "big-architecture-concept",
    name: "BIG Architecture Concept",
    sector: "architecture",
    year: 2025,
    url: null,
    conceptual: true,
    inspiredBy: { brand: "BIG Architects", url: "https://big.dk/" },
    mockup: {
      theme: "graphite",
      eyebrow: "Bjarke Ingels Group",
      wordmark: "BIG.",
      tagline: "Architecture · Engineering · Product Design",
      chromeLight: true,
    },
  },
];

export const FEATURED_SLUGS = [
  "chinaway",
  "reformlab-barcelona",
  "redline-marketing",
  "yg-event-solutions",
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
