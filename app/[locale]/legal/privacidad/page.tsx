import { setRequestLocale, getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/legal/LegalPage";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.privacy" });
  const description = locale === "en"
    ? "How we collect, use and protect your personal data."
    : "Cómo recogemos, usamos y protegemos tus datos personales.";
  return buildMetadata({
    locale: locale as "es" | "en",
    path: "/legal/privacidad",
    title: `${t("title")} · Tuagenciaweb`,
    description,
  });
}

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.privacy");
  const en = locale === "en";

  return (
    <LegalPage title={t("title")} lastUpdated="2026-05-14">
      <h2>{en ? "Data controller" : "Responsable del tratamiento"}</h2>
      <p>{en ? "Provider:" : "Titular:"} [PENDIENTE]</p>
      <p>Email: hola@tuagenciaweb.es</p>

      <h2>{en ? "Data we collect" : "Datos que recogemos"}</h2>
      <p>{en ? "Contact form data: name, email, optional phone/company, sector, budget range, message." : "Datos del formulario de contacto: nombre, email, teléfono y empresa (opcionales), sector, rango de presupuesto, mensaje."}</p>

      <h2>{en ? "Legal basis" : "Base legal"}</h2>
      <p>{en ? "User consent (GDPR art. 6.1.a) and legitimate interest in answering enquiries (GDPR art. 6.1.f)." : "Consentimiento del usuario (RGPD art. 6.1.a) e interés legítimo en responder a consultas (RGPD art. 6.1.f)."}</p>

      <h2>{en ? "Purpose" : "Finalidad"}</h2>
      <p>{en ? "Reply to your enquiry and store it for follow-up." : "Responder a tu consulta y conservarla para seguimiento."}</p>

      <h2>{en ? "Retention period" : "Plazo de conservación"}</h2>
      <p>{en ? "We keep the data for up to 3 years from the last interaction, or until you request deletion." : "Conservamos los datos hasta 3 años desde la última interacción, o hasta que solicites su supresión."}</p>

      <h2>{en ? "Data processors" : "Encargados del tratamiento"}</h2>
      <ul>
        <li>Vercel Inc. (hosting, USA — SCCs)</li>
        <li>Resend (transactional email, EU)</li>
        <li>Upstash (rate limit, EU)</li>
      </ul>

      <h2>{en ? "Your rights" : "Tus derechos"}</h2>
      <p>{en ? "Access, rectification, deletion, restriction, portability, objection. Email hola@tuagenciaweb.es." : "Acceso, rectificación, supresión, limitación, portabilidad y oposición. Email: hola@tuagenciaweb.es."}</p>
    </LegalPage>
  );
}
