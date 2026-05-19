import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MapContact } from "@/components/layout/MapContact";
import { getDict } from "@/lib/i18n";

export default function EsLayout({ children }: { children: React.ReactNode }) {
  const dict = getDict("es");
  return (
    <>
      <SiteHeader locale="es" dict={dict.nav} langDict={dict.langSwitcher} />
      {children}
      <MapContact locale="es" dict={dict.contactFooter} />
      <SiteFooter locale="es" dict={dict.footer} />
    </>
  );
}
