import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getDict } from "@/lib/i18n";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  const dict = getDict("en");
  return (
    <>
      <SiteHeader
        locale="en"
        dict={dict.nav}
        langDict={dict.langSwitcher}
        servicesNavItems={dict.servicesPage.hero.navItems}
        viewAllLabel={dict.nav.servicesViewAll}
      />
      {children}
      <SiteFooter locale="en" dict={dict.footer} />
    </>
  );
}
