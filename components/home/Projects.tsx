import Image from "next/image";
import { PROJECTS, type Project } from "@/lib/portfolio";

const SECTOR_LABEL: Record<Project["sector"], string> = {
  dental: "Dental",
  legal: "Legal",
  reforms: "Reformas",
  hospitality: "Hostelería",
  ecommerce: "E-commerce",
  other: "Web",
};

function Card({ p }: { p: Project }) {
  const inner = (
    <div className="group h-full overflow-hidden rounded-[20px] border border-[#EEF1F6] bg-white shadow-[0_10px_30px_-15px_rgba(15,23,42,.10)] transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(15,23,42,.20)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F1F5F9]">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <h3 className="text-[17px] font-bold tracking-[-0.01em] text-[#0B1220]">
          {p.comingSoon ? "Próximamente" : p.name}
        </h3>
        <div className="mt-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#64748B]">
          {SECTOR_LABEL[p.sector]} · {p.year}
        </div>
      </div>
    </div>
  );

  if (p.url && !p.comingSoon) {
    return (
      <a href={p.url} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }
  return <div className="h-full">{inner}</div>;
}

export function Projects() {
  const items = PROJECTS.slice(0, 6);
  return (
    <section id="proyectos" className="relative bg-[#FBFCFE]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,.18)]" />
            PROYECTOS
          </span>
          <h2 className="mt-5 text-balance text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.025em] text-[#0B1220]">
            Trabajo reciente
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[16px] leading-[1.6] text-[#475569]">
            Una muestra de webs que hemos lanzado.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
