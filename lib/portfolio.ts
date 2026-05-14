export type Sector = "dental" | "legal" | "reforms" | "hospitality" | "ecommerce" | "other";

export type Project = {
  slug: string;
  name: string;
  sector: Sector;
  url: string | null;
  image: string;
  year: number;
  comingSoon?: boolean;
};

export const PROJECTS: Project[] = [
  { slug: "dentistlab", name: "Dentistlab", sector: "dental", url: "https://dentistlab.surge.sh", image: "/portfolio/dentistlab.png", year: 2025 },
  { slug: "chinaway", name: "Chinaway", sector: "other", url: "https://chinaway.vercel.app/es", image: "/portfolio/chinaway.png", year: 2025 },
  { slug: "reformlab-barcelona", name: "Reformlab Barcelona", sector: "reforms", url: "https://reformlab-barcelona.surge.sh", image: "/portfolio/reformlab.png", year: 2025 },
  { slug: "forma-clinica", name: "Forma Clínica", sector: "other", url: "https://forma-clinica.surge.sh", image: "/portfolio/forma.png", year: 2025 },
  { slug: "slot-5", name: "Próximamente", sector: "other", url: null, image: "/portfolio/placeholder.png", year: 2026, comingSoon: true },
  { slug: "slot-6", name: "Próximamente", sector: "other", url: null, image: "/portfolio/placeholder.png", year: 2026, comingSoon: true },
];

export const FEATURED_SLUGS = ["dentistlab", "chinaway", "reformlab-barcelona", "forma-clinica"] as const;

export function getFeatured(): Project[] {
  return FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)!).filter(Boolean);
}
