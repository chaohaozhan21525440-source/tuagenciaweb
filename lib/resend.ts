import { Resend } from "resend";
import { getEnv } from "./env";
import type { ContactInput } from "./schemas";
import { TIPO_LABELS } from "./schemas";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

const COPY = {
  es: {
    leadIntro: "Nuevo lead",
    labels: { name: "Nombre", email: "Email", type: "Tipo", phone: "Tel", message: "Mensaje" },
    confirmSubject: "Hemos recibido tu mensaje · Tuagenciaweb",
    confirmHello: (name: string) => `Hola ${name},`,
    confirmBody: "Hemos recibido tu mensaje y te responderemos en menos de 24 horas.",
    confirmSig: "— Tuagenciaweb",
  },
  en: {
    leadIntro: "New lead",
    labels: { name: "Name", email: "Email", type: "Project type", phone: "Phone", message: "Message" },
    confirmSubject: "We've received your message · Tuagenciaweb",
    confirmHello: (name: string) => `Hi ${name},`,
    confirmBody: "We've received your message and we'll reply in under 24 hours.",
    confirmSig: "— Tuagenciaweb",
  },
} as const;

export async function sendLeadEmails(p: ContactInput) {
  const env = getEnv();
  const resend = new Resend(env.RESEND_API_KEY);
  const locale = (p.locale ?? "es") as "es" | "en";
  const c = COPY[locale];
  const tipoLabel = TIPO_LABELS[p.tipo][locale];

  const subject = `Lead Tuagenciaweb · ${p.nombre} (${tipoLabel})`;
  const leadBody = `
    <h2>${c.leadIntro}</h2>
    <ul>
      <li><b>${c.labels.name}:</b> ${esc(p.nombre)}</li>
      <li><b>${c.labels.email}:</b> ${esc(p.email)}</li>
      <li><b>${c.labels.type}:</b> ${esc(tipoLabel)}</li>
      <li><b>${c.labels.phone}:</b> ${esc(p.tel ?? "")}</li>
      <li><b>locale:</b> ${locale}</li>
    </ul>
    <p><b>${c.labels.message}:</b></p>
    <p>${esc(p.mensaje).replace(/\n/g, "<br/>")}</p>
  `;
  const confirmBody = `
    <p>${c.confirmHello(esc(p.nombre))}</p>
    <p>${c.confirmBody}</p>
    <p>${c.confirmSig}</p>
  `;
  await Promise.all([
    resend.emails.send({ from: env.CONTACT_EMAIL_FROM, to: env.CONTACT_EMAIL_TO, replyTo: p.email, subject, html: leadBody }),
    resend.emails.send({ from: env.CONTACT_EMAIL_FROM, to: p.email, subject: c.confirmSubject, html: confirmBody }),
  ]);
}
