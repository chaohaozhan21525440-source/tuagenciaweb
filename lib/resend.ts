import { Resend } from "resend";
import { getEnv } from "./env";
import type { ContactInput } from "./schemas";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

export async function sendLeadEmails(p: ContactInput) {
  const env = getEnv();
  const resend = new Resend(env.RESEND_API_KEY);
  const subject = `Lead Tuagenciaweb · ${p.nombre} (${p.tipo})`;
  const leadBody = `
    <h2>Nuevo lead</h2>
    <ul>
      <li><b>Nombre:</b> ${esc(p.nombre)}</li>
      <li><b>Email:</b> ${esc(p.email)}</li>
      <li><b>Tipo:</b> ${esc(p.tipo)}</li>
      <li><b>Tel:</b> ${esc(p.tel ?? "")}</li>
    </ul>
    <p><b>Mensaje:</b></p>
    <p>${esc(p.mensaje).replace(/\n/g, "<br/>")}</p>
  `;
  const confirmBody = `
    <p>Hola ${esc(p.nombre)},</p>
    <p>Hemos recibido tu mensaje y te responderemos en menos de 24 horas.</p>
    <p>— Tuagenciaweb</p>
  `;
  await Promise.all([
    resend.emails.send({ from: env.CONTACT_EMAIL_FROM, to: env.CONTACT_EMAIL_TO, replyTo: p.email, subject, html: leadBody }),
    resend.emails.send({ from: env.CONTACT_EMAIL_FROM, to: p.email, subject: "Hemos recibido tu mensaje · Tuagenciaweb", html: confirmBody }),
  ]);
}
