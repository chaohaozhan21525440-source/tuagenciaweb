export type Sector =
  | "dental"
  | "legal"
  | "reforms"
  | "hospitality"
  | "ecommerce"
  | "restoration"
  | "food"
  | "architecture"
  | "other";

export type MockupTheme = "red" | "green" | "gold" | "graphite" | "blue";

export type Project = {
  slug: string;
  name: string;
  sector: Sector;
  url: string | null;
  image?: string;
  year: number;
  conceptual?: boolean;
  inspiredBy?: { brand: string; url: string };
  theme?: MockupTheme;
  comingSoon?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "big-mamma-concept",
    name: "Big Mamma Concept",
    sector: "restoration",
    year: 2025,
    url: null,
    conceptual: true,
    theme: "red",
    inspiredBy: { brand: "Big Mamma Group", url: "https://www.bigmammagroup.com/es/" },
  },
  {
    slug: "lady-dumpling-concept",
    name: "Lady Dumpling Concept",
    sector: "food",
    year: 2025,
    url: null,
    conceptual: true,
    theme: "green",
    inspiredBy: { brand: "Lady Dumpling", url: "https://www.ladydumpling.com/" },
  },
  {
    slug: "nobu-barcelona-concept",
    name: "Nobu Barcelona Concept",
    sector: "hospitality",
    year: 2025,
    url: null,
    conceptual: true,
    theme: "gold",
    inspiredBy: { brand: "Nobu Barcelona", url: "https://www.nobuhotels.com/barcelona/es/" },
  },
  {
    slug: "big-architecture-concept",
    name: "BIG Architecture Concept",
    sector: "architecture",
    year: 2025,
    url: null,
    conceptual: true,
    theme: "graphite",
    inspiredBy: { brand: "BIG Architects", url: "https://big.dk/" },
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
    slug: "dental-concept",
    name: "Dental Concept",
    sector: "dental",
    year: 2025,
    url: null,
    conceptual: true,
    theme: "blue",
  },
  {
    slug: "chinaway",
    name: "Chinaway",
    sector: "other",
    year: 2025,
    url: "https://chinaway.vercel.app/es",
    image: "/portfolio/chinaway.png",
  },
];

export const FEATURED_SLUGS = [
  "big-mamma-concept",
  "lady-dumpling-concept",
  "nobu-barcelona-concept",
  "reformlab-barcelona",
] as const;

export function getFeatured(): Project[] {
  return FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)!).filter(Boolean);
}
