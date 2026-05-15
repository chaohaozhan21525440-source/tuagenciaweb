import { Resend } from "resend";
import { getEnv } from "./env";
import type { ContactInput } from "./schemas";

export async function sendLeadEmails(payload: ContactInput) {
  const env = getEnv();
  const resend = new Resend(env.RESEND_API_KEY);
  const subject = `Lead Tuagenciaweb · ${payload.name} (${payload.sector})`;
  const leadBody = `
    <h2>Nuevo lead</h2>
    <ul>
      <li><b>Nombre:</b> ${escapeHtml(payload.name)}</li>
      <li><b>Email:</b> ${escapeHtml(payload.email)}</li>
      <li><b>Teléfono:</b> ${escapeHtml(payload.phone ?? "")}</li>
      <li><b>Empresa:</b> ${escapeHtml(payload.company ?? "")}</li>
      <li><b>Sector:</b> ${payload.sector}</li>
      <li><b>Presupuesto:</b> ${payload.budget}</li>
    </ul>
    <p><b>Mensaje:</b></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
  `;

  const confirmBody = `
    <p>Hola ${escapeHtml(payload.name)},</p>
    <p>Hemos recibido tu mensaje y te responderemos en menos de 24 horas.</p>
    <p>— Tuagenciaweb</p>
  `;

  await Promise.all([
    resend.emails.send({ from: env.CONTACT_EMAIL_FROM, to: env.CONTACT_EMAIL_TO, replyTo: payload.email, subject, html: leadBody }),
    resend.emails.send({ from: env.CONTACT_EMAIL_FROM, to: payload.email, subject: "Hemos recibido tu mensaje · Tuagenciaweb", html: confirmBody }),
  ]);
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}
