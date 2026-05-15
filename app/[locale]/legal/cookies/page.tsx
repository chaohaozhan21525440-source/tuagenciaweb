import { setRequestLocale, getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/legal/LegalPage";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.cookies" });
  const description = locale === "en"
    ? "Information about the cookies used on this site and how to manage them."
    : "Información sobre las cookies utilizadas en este sitio y cómo gestionarlas.";
  return buildMetadata({
    locale: locale as "es" | "en",
    path: "/legal/cookies",
    title: `${t("title")} · Tuagenciaweb`,
    description,
  });
}

export default async function Cookies({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.cookies");
  const en = locale === "en";

  return (
    <LegalPage title={t("title")} lastUpdated="2026-05-14">
      <h2>{en ? "What are cookies" : "Qué son las cookies"}</h2>
      <p>{en ? "Small files stored in your browser to remember preferences or measure usage." : "Pequeños archivos guardados en el navegador para recordar preferencias o medir el uso."}</p>

      <h2>{en ? "Cookies we use" : "Cookies que usamos"}</h2>
      <table>
        <thead>
          <tr><th>{en ? "Name" : "Nombre"}</th><th>{en ? "Purpose" : "Finalidad"}</th><th>{en ? "Duration" : "Duración"}</th><th>{en ? "Type" : "Tipo"}</th></tr>
        </thead>
        <tbody>
          <tr><td>tw_consent</td><td>{en ? "Stores cookie preferences" : "Guarda preferencias de cookies"}</td><td>12 {en ? "months" : "meses"}</td><td>{en ? "Necessary" : "Necesaria"}</td></tr>
          <tr><td>NEXT_LOCALE</td><td>{en ? "Stores language preference" : "Guarda preferencia de idioma"}</td><td>{en ? "Session" : "Sesión"}</td><td>{en ? "Necessary" : "Necesaria"}</td></tr>
          <tr><td>_vercel_analytics</td><td>Vercel Analytics</td><td>{en ? "Session" : "Sesión"}</td><td>{en ? "Analytics" : "Analítica"}</td></tr>
        </tbody>
      </table>

      <h2>{en ? "How to manage them" : "Cómo gestionarlas"}</h2>
      <p>{en ? "You can change your choice at any time via the cookie banner footer link, or by clearing your browser cookies." : "Puedes cambiar tu elección en cualquier momento desde el enlace del pie del banner de cookies, o borrando las cookies de tu navegador."}</p>
    </LegalPage>
  );
}
