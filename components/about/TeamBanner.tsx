import Image from "next/image";
import { useTranslations } from "next-intl";

export function TeamBanner() {
  const t = useTranslations("about.hero");
  return (
    <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
      <Image
        src="/team/group.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(14,42,74,0.92) 0%, rgba(14,42,74,0.78) 40%, rgba(14,42,74,0.25) 80%, transparent 100%)",
        }}
      />
      <div className="container-page relative z-10 flex h-full items-center">
        <div className="max-w-2xl text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
            {t("tag")}
          </p>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">{t("subtitle")}</p>
        </div>
      </div>
    </section>
  );
}
