import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getDict } from "@/lib/i18n";

export default function EsLayout({ children }: { children: React.ReactNode }) {
  const dict = getDict("es");
  return (
    <>
      <SiteHeader
        locale="es"
        dict={dict.nav}
        langDict={dict.langSwitcher}
        servicesNavItems={dict.servicesPage.hero.navItems}
        viewAllLabel={dict.nav.servicesViewAll}
      />
      {children}
      <SiteFooter locale="es" dict={dict.footer} />
    </>
  );
}
