import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/schemas";

const valid = {
  name: "María García",
  email: "maria@example.com",
  sector: "dental",
  budget: "b1_2k",
  message: "Necesito una web para mi clínica con 4 médicos.",
  gdpr: true,
  website: "",
};

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects short name", () => {
    expect(contactSchema.safeParse({ ...valid, name: "M" }).success).toBe(false);
  });

  it("rejects invalid email", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects short message", () => {
    expect(contactSchema.safeParse({ ...valid, message: "Hola" }).success).toBe(false);
  });

  it("requires gdpr=true", () => {
    expect(contactSchema.safeParse({ ...valid, gdpr: false }).success).toBe(false);
  });

  it("rejects unknown sector value", () => {
    expect(contactSchema.safeParse({ ...valid, sector: "marketing" }).success).toBe(false);
  });

  it("rejects when honeypot is filled", () => {
    expect(contactSchema.safeParse({ ...valid, website: "spam.com" }).success).toBe(false);
  });

  it("allows phone and company to be empty", () => {
    expect(contactSchema.safeParse({ ...valid, phone: "", company: "" }).success).toBe(true);
  });
});
