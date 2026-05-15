"use client";

const TECHS = [
  { name: "Next.js", path: "M11.214.006c-.052.005-.216.022-.364.033-3.408.308-6.6 2.147-8.624 4.974A11.88 11.88 0 0 0 .108 10.256c-.096.66-.108.854-.108 1.748s.012 1.089.108 1.748c.652 4.507 3.86 8.293 8.209 9.696.779.251 1.6.422 2.533.526.364.04 1.936.04 2.3 0 1.611-.179 2.977-.578 4.323-1.265.207-.105.247-.134.219-.157a211.55 211.55 0 0 1-1.954-2.62l-1.917-2.59-2.404-3.558a342.755 342.755 0 0 0-2.422-3.556c-.009-.001-.018 1.579-.022 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.038-.14.045-.495.045H7.81l-.108-.068a.44.44 0 0 1-.157-.172l-.05-.105.005-4.704.007-4.706.073-.092a.644.644 0 0 1 .174-.143c.096-.047.134-.051.54-.051.479 0 .558.018.682.154.035.038 1.337 2.0 2.895 4.36 1.557 2.36 3.687 5.59 4.733 7.181l1.9 2.893.097-.063a12.41 12.41 0 0 0 2.474-2.173c1.736-1.99 2.86-4.42 3.237-7.006.097-.66.109-.853.109-1.748 0-.894-.012-1.088-.109-1.748C23.046 5.495 19.84 1.71 15.49.307a12.835 12.835 0 0 0-2.499-.523A33.55 33.55 0 0 0 11.214.006z" },
  { name: "React", path: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278z" },
  { name: "Tailwind", path: "M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" },
  { name: "Vercel", path: "M24 22.525H0l12-21.05 12 21.05z" },
];

export function TrustBar() {
  return (
    <div className="relative z-10 mx-auto max-w-[1360px] px-6 pb-16 md:px-10">
      <div
        className="grid grid-cols-2 items-center gap-6 rounded-3xl bg-white px-10 py-8 md:grid-cols-5"
        style={{ boxShadow: "0 12px 40px -16px rgba(15,23,42,0.10), 0 1px 2px rgba(15,23,42,0.04)" }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 flex gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2.5l2.95 6.1 6.7.97-4.85 4.72 1.15 6.66L12 17.77 6.05 20.95 7.2 14.29 2.35 9.57l6.7-.97L12 2.5z" />
              </svg>
            ))}
          </div>
          <div className="text-[16px] font-bold text-slate-900">5.0 valoración media</div>
          <div className="text-[13px] text-slate-500">Basado en 20+ reseñas</div>
        </div>

        <div className="flex flex-col items-center text-center">
          <svg viewBox="0 0 28 28" fill="none" className="mb-2 h-9 w-9 text-[#1f6bff]">
            <circle cx="11" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="19.5" cy="11" r="2.6" stroke="currentColor" strokeWidth="1.7" />
            <path d="M4.5 21c.7-3.2 3.3-5 6.5-5s5.8 1.8 6.5 5M18 16.5c2.7 0 4.8 1.6 5.4 4.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <div className="text-[16px] font-bold text-slate-900">Más de 20 proyectos</div>
          <div className="text-[13px] text-slate-500">entregados con éxito</div>
        </div>

        <div className="flex flex-col items-center text-center">
          <svg viewBox="0 0 28 28" fill="none" className="mb-2 h-9 w-9 text-[#1f6bff]">
            <path d="M14 3.5l8 3.2v6.5c0 4.7-3.4 8.9-8 10.3-4.6-1.4-8-5.6-8-10.3V6.7l8-3.2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M10.5 13.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="text-[16px] font-bold text-slate-900">Soporte y acompañamiento</div>
          <div className="text-[13px] text-slate-500">antes, durante y después</div>
        </div>

        <div className="flex flex-col items-center text-center">
          <svg viewBox="0 0 28 28" fill="currentColor" className="mb-2 h-8 w-8 text-[#1f6bff]">
            <path d="M15.5 3.5L7 15.5h5.5L11 24.5l8.5-12.5H14l1.5-8.5z" />
          </svg>
          <div className="text-[16px] font-bold text-slate-900">Entrega rápida</div>
          <div className="text-[13px] text-slate-500">en plazos acordados</div>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="mb-2 text-[13px] font-semibold text-slate-700">Tecnologías que usamos</div>
          <div className="flex items-center justify-center gap-4 text-slate-500">
            {TECHS.map((t) => (
              <svg key={t.name} viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-label={t.name}>
                <title>{t.name}</title>
                <path d={t.path} />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
