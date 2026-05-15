import { z } from "zod";

export const SECTORS = ["dental", "legal", "reforms", "hospitality", "ecommerce", "other"] as const;
export const BUDGETS = ["lt1k", "b1_2k", "b2_5k", "gt5k"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  sector: z.enum(SECTORS),
  budget: z.enum(BUDGETS),
  message: z.string().trim().min(20).max(2000),
  gdpr: z.literal(true),
  website: z.string().max(0),
});

export type ContactInput = z.infer<typeof contactSchema>;
