import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Services } from "@/components/home/Services";
import { Projects } from "@/components/home/Projects";
import { Pricing } from "@/components/home/Pricing";
import { FAQ } from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Projects />
        <Pricing />
        <FAQ />
      </main>
      <SiteFooter />
    </>
  );
}
