import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/env", () => ({
  getEnv: () => ({
    RESEND_API_KEY: "test",
    CONTACT_EMAIL_TO: "to@example.com",
    CONTACT_EMAIL_FROM: "from@example.com",
    UPSTASH_REDIS_REST_URL: "http://localhost",
    UPSTASH_REDIS_REST_TOKEN: "test",
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  }),
}));

vi.mock("@/lib/resend", () => ({ sendLeadEmails: vi.fn().mockResolvedValue(undefined) }));
vi.mock("@/lib/ratelimit", () => ({ checkContactLimit: vi.fn().mockResolvedValue({ success: true, retryAfterSeconds: 0 }) }));

vi.mock("next/headers", () => ({
  headers: () => Promise.resolve(new Headers({ "x-forwarded-for": "127.0.0.1" })),
}));

import { submitContact } from "@/app/[locale]/contacto/actions";

function fd(data: Record<string, string>) {
  const f = new FormData();
  Object.entries(data).forEach(([k, v]) => f.append(k, v));
  return f;
}

describe("submitContact", () => {
  it("returns ok on valid payload", async () => {
    const out = await submitContact(fd({
      name: "Maria",
      email: "m@example.com",
      sector: "dental",
      budget: "b1_2k",
      message: "Necesito una web para mi clínica con 4 médicos.",
      gdpr: "on",
      website: "",
    }));
    expect(out.ok).toBe(true);
  });

  it("returns validation error on bad payload", async () => {
    const out = await submitContact(fd({
      name: "M",
      email: "no-email",
      sector: "dental",
      budget: "b1_2k",
      message: "short",
      gdpr: "on",
      website: "",
    }));
    expect(out.ok).toBe(false);
    if (!out.ok) expect(out.error).toBe("validation");
  });

  it("silently succeeds when honeypot is filled", async () => {
    const out = await submitContact(fd({
      name: "Bot",
      email: "bot@example.com",
      sector: "dental",
      budget: "b1_2k",
      message: "Spam spam spam spam spam spam spam spam spam.",
      gdpr: "on",
      website: "http://spam.com",
    }));
    expect(out.ok).toBe(true);
    if (out.ok) expect(out.honeypot).toBe(true);
  });
});
