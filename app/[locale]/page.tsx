import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

export default function Home() {
  return (
    <main className="container-page py-20">
      <h1 className="text-4xl font-bold">Tuagenciaweb</h1>
      <LocaleSwitcher />
    </main>
  );
}
