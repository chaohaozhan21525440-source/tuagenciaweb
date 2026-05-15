import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
      </main>
    </>
  );
}
