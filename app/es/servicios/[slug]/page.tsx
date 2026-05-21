import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/services/detail/ServiceDetailPage";
import { getDict } from "@/lib/i18n";
import { getServicePathsForStaticParams, slugToId, SERVICE_SLUGS } from "@/lib/services";

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
      locale: "es_ES",
      type: "article",
    },
  };
}

export default async function ServiceDetailEs({ params }: Props) {
  const { slug } = await params;
  const id = slugToId(slug, "es");
  if (!id) notFound();
  const service = dict.servicesDetail[id];
  return (
    <ServiceDetailPage
      service={service}
      locale="es"
      hubLabel={dict.servicesPage.detailNav.hubLabel}
    />
  );
}
