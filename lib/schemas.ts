import { z } from "zod";
export const TIPOS = ["Web corporativa", "Tienda online", "Landing page", "SEO / Marketing"] as const;
export const contactSchema = z.object({
  nombre: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  tipo: z.enum(TIPOS),
  tel: z.string().trim().max(40).optional().or(z.literal("")),
  mensaje: z.string().trim().min(10).max(2000),
  gdpr: z.literal(true),
  website: z.string().max(0),
});
export type ContactInput = z.infer<typeof contactSchema>;
