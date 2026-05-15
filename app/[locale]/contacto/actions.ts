"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/schemas";
import { sendLeadEmails } from "@/lib/resend";
import { checkContactLimit } from "@/lib/ratelimit";

export type SubmitResult =
  | { ok: true; honeypot?: boolean }
  | { ok: false; error: "validation" | "ratelimit" | "send"; retryAfterSeconds?: number };

export async function submitContact(formData: FormData): Promise<SubmitResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse({
    ...raw,
    gdpr: raw.gdpr === "on" || raw.gdpr === "true",
  });

  if (!parsed.success) {
    if (typeof raw.website === "string" && raw.website.length > 0) {
      return { ok: true, honeypot: true };
    }
    return { ok: false, error: "validation" };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const { success, retryAfterSeconds } = await checkContactLimit(ip);
  if (!success) return { ok: false, error: "ratelimit", retryAfterSeconds };

  try {
    await sendLeadEmails(parsed.data);
    return { ok: true };
  } catch {
    return { ok: false, error: "send" };
  }
}
