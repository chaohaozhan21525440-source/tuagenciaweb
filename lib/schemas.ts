import { z } from "zod";

export const TIPO_IDS = ["corporate", "shop", "landing", "seo"] as const;
export type TipoId = (typeof TIPO_IDS)[number];

export const TIPO_LABELS: Record<TipoId, { es: string; en: string }> = {
  corporate: { es: "Web corporativa", en: "Corporate website" },
  shop: { es: "Tienda online", en: "Online shop" },
  landing: { es: "Landing page", en: "Landing page" },
  seo: { es: "SEO / Marketing", en: "SEO / Marketing" },
};

export const contactSchema = z.object({
  nombre: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  tipo: z.enum(TIPO_IDS),
  tel: z.string().trim().max(40).optional().or(z.literal("")),
  mensaje: z.string().trim().min(10).max(2000),
  gdpr: z.literal(true),
  website: z.string().max(0),
  locale: z.enum(["es", "en"]).optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;
