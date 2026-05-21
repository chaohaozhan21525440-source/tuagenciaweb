import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/services/detail/ServiceDetailPage";
import { getDict } from "@/lib/i18n";
import { getServicePathsForStaticParams, slugToId, SERVICE_SLUGS } from "@/lib/services";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo/schemas";

const dict = getDict("es");

export function generateStaticParams() {
  return getServicePathsForStaticParams("es");
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = slugToId(slug, "es");
  if (!id) return {};
  const service = dict.servicesDetail[id];
  const url = `https://www.tuagenciaweb.es/es/servicios/${slug}`;
  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: {
      canonical: `/es/servicios/${slug}`,
      languages: {
        es: `/es/servicios/${slug}`,
        en: `/en/services/${SERVICE_SLUGS[id].en}`,
      },
    },
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      url,
      locale: "es_ES",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: service.meta.title,
      description: service.meta.description,
    },
  };
}

export default async function ServiceDetailEs({ params }: Props) {
  const { slug } = await params;
  const id = slugToId(slug, "es");
  if (!id) notFound();
  const service = dict.servicesDetail[id];

  const serviceJson = buildServiceSchema({
    name: service.hero.h1Top,
    description: service.meta.description,
    url: `/es/servicios/${slug}`,
  });
  const breadcrumbJson = buildBreadcrumbSchema([
    { name: "Inicio", url: "/es" },
    { name: dict.servicesPage.detailNav.hubLabel, url: "/es/servicios" },
    { name: service.hero.h1Top, url: `/es/servicios/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceJson }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJson }}
      />
      <ServiceDetailPage
        service={service}
        locale="es"
        hubLabel={dict.servicesPage.detailNav.hubLabel}
      />
    </>
  );
}
