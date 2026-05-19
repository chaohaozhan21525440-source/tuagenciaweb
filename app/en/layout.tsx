import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MapContact } from "@/components/layout/MapContact";
import { getDict } from "@/lib/i18n";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  const dict = getDict("en");
  return (
    <>
      <SiteHeader locale="en" dict={dict.nav} langDict={dict.langSwitcher} />
      {children}
      <MapContact locale="en" dict={dict.contactFooter} />
      <SiteFooter locale="en" dict={dict.footer} />
    </>
  );
}
