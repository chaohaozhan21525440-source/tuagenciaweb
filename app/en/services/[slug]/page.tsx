import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/services/detail/ServiceDetailPage";
import { getDict } from "@/lib/i18n";
import { getServicePathsForStaticParams, slugToId, SERVICE_SLUGS } from "@/lib/services";

const dict = getDict("en");

export function generateStaticParams() {
  return getServicePathsForStaticParams("en");
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = slugToId(slug, "en");
  if (!id) return {};
  const service = dict.servicesDetail[id];
  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: {
      canonical: `/en/services/${slug}`,
      languages: {
        es: `/es/servicios/${SERVICE_SLUGS[id].es}`,
        en: `/en/services/${slug}`,
      },
    },
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function ServiceDetailEn({ params }: Props) {
  const { slug } = await params;
  const id = slugToId(slug, "en");
  if (!id) notFound();
  const service = dict.servicesDetail[id];
  return (
    <ServiceDetailPage
      service={service}
      locale="en"
      hubLabel={dict.servicesPage.detailNav.hubLabel}
      viewProjectLabel={dict.servicesPage.detailNav.viewProject}
    />
  );
}
