import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/services/detail/ServiceDetailPage";
import { getDict } from "@/lib/i18n";
import { getServicePathsForStaticParams, slugToId, SERVICE_SLUGS } from "@/lib/services";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo/schemas";

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
  const url = `https://www.tuagenciaweb.es/en/services/${slug}`;
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
      url,
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: service.meta.title,
      description: service.meta.description,
    },
  };
}

export default async function ServiceDetailEn({ params }: Props) {
  const { slug } = await params;
  const id = slugToId(slug, "en");
  if (!id) notFound();
  const service = dict.servicesDetail[id];

  const serviceJson = buildServiceSchema({
    name: service.hero.h1Top,
    description: service.meta.description,
    url: `/en/services/${slug}`,
  });
  const breadcrumbJson = buildBreadcrumbSchema([
    { name: "Home", url: "/en" },
    { name: dict.servicesPage.detailNav.hubLabel, url: "/en/services" },
    { name: service.hero.h1Top, url: `/en/services/${slug}` },
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
        locale="en"
        hubLabel={dict.servicesPage.detailNav.hubLabel}
      />
    </>
  );
}
