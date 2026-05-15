import { setRequestLocale, getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/legal/LegalPage";

export default async function AvisoLegal({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.legalNotice");
  const en = locale === "en";

  return (
    <LegalPage title={t("title")} lastUpdated="2026-05-14">
      {en ? (
        <>
          <h2>Provider identity</h2>
          <p><strong>Holder:</strong> [PENDING: name or company]</p>
          <p><strong>VAT / NIF:</strong> [PENDING]</p>
          <p><strong>Address:</strong> [PENDING]</p>
          <p><strong>Email:</strong> hola@tuagenciaweb.es</p>
          <p><strong>Phone:</strong> +34 000 000 000</p>

          <h2>Purpose</h2>
          <p>This legal notice governs the use of the tuagenciaweb.es website, owned by the holder above.</p>

          <h2>Terms of use</h2>
          <p>Access to the website is free. The user agrees to use it in accordance with the law and not to harm the image, interests, or rights of Tuagenciaweb.</p>

          <h2>Intellectual property</h2>
          <p>All content on the site (texts, images, code) is property of Tuagenciaweb or is licensed for use.</p>

          <h2>Applicable law</h2>
          <p>This notice is governed by Spanish law (LSSI-CE, Law 34/2002).</p>
        </>
      ) : (
        <>
          <h2>Identidad del prestador</h2>
          <p><strong>Titular:</strong> [PENDIENTE: nombre o razón social]</p>
          <p><strong>NIF / CIF:</strong> [PENDIENTE]</p>
          <p><strong>Domicilio:</strong> [PENDIENTE]</p>
          <p><strong>Email:</strong> hola@tuagenciaweb.es</p>
          <p><strong>Teléfono:</strong> +34 000 000 000</p>

          <h2>Objeto</h2>
          <p>El presente aviso legal regula el uso del sitio web tuagenciaweb.es, propiedad del titular indicado.</p>

          <h2>Condiciones de uso</h2>
          <p>El acceso al sitio web es gratuito. El usuario se compromete a usarlo conforme a la ley y a no dañar la imagen, intereses o derechos de Tuagenciaweb.</p>

          <h2>Propiedad intelectual</h2>
          <p>Todos los contenidos del sitio (textos, imágenes, código) son propiedad de Tuagenciaweb o cuentan con licencia de uso.</p>

          <h2>Legislación aplicable</h2>
          <p>Este aviso se rige por la legislación española (LSSI-CE, Ley 34/2002).</p>
        </>
      )}
    </LegalPage>
  );
}
