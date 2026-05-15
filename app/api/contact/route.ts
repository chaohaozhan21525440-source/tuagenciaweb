import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { sendLeadEmails } from "@/lib/resend";
import { checkContactLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type SubmitResult =
  | { ok: true; honeypot?: boolean }
  | { ok: false; error: "validation" | "ratelimit" | "send"; retryAfterSeconds?: number };

export async function POST(req: Request): Promise<NextResponse<SubmitResult>> {
  const formData = await req.formData();
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse({ ...raw, gdpr: raw.gdpr === "on" || raw.gdpr === "true" });
  if (!parsed.success) {
    if (typeof raw.website === "string" && raw.website.length > 0) {
      return NextResponse.json({ ok: true, honeypot: true });
    }
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const { success, retryAfterSeconds } = await checkContactLimit(ip);
  if (!success) return NextResponse.json({ ok: false, error: "ratelimit", retryAfterSeconds }, { status: 429 });
  try {
    await sendLeadEmails(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] send failed:", e);
    return NextResponse.json({ ok: false, error: "send" }, { status: 500 });
  }
}
