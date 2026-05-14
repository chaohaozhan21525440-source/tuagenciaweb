import { Lightning, Rocket, Storefront } from "@phosphor-icons/react/dist/ssr";

export type PackId = "essential" | "professional" | "shop";

export type Pack = {
  id: PackId;
  name: { es: string; en: string };
  price: string;
  priceNote: { es: string; en: string };
  tagline: { es: string; en: string };
  features: { es: string[]; en: string[] };
  delivery: { es: string; en: string };
  highlight: boolean;
  cta: { es: string; en: string };
  Icon: typeof Lightning;
};

export const PACKS: Pack[] = [
  {
    id: "essential",
    name: { es: "Esencial", en: "Essential" },
    price: "590 €",
    priceNote: { es: "pago único", en: "one-off" },
    tagline: { es: "Una landing profesional para empezar a tener presencia.", en: "A professional landing to start being online." },
    features: {
      es: [
        "Diseño a medida (no plantillas)",
        "Web one-page hasta 5 secciones",
        "Mobile-first",
        "Formulario de contacto + WhatsApp",
        "Dominio .es + hosting primer año",
        "SSL + SEO básico",
        "Google Maps + Google Business",
        "1 ronda de revisiones",
      ],
      en: [
        "Custom design (no templates)",
        "One-page site up to 5 sections",
        "Mobile-first",
        "Contact form + WhatsApp",
        ".es domain + first year hosting",
        "SSL + basic SEO",
        "Google Maps + Google Business",
        "1 revision round",
      ],
    },
    delivery: { es: "Entrega en 7 días laborables", en: "Delivered in 7 business days" },
    highlight: false,
    cta: { es: "Quiero el Esencial", en: "I want Essential" },
    Icon: Lightning,
  },
  {
    id: "professional",
    name: { es: "Profesional", en: "Professional" },
    price: "990 €",
    priceNote: { es: "pago único", en: "one-off" },
    tagline: { es: "Web completa multi-página, lista para vender y posicionar.", en: "Complete multi-page site, ready to sell and rank." },
    features: {
      es: [
        "Todo lo del Esencial",
        "Hasta 6 páginas",
        "Blog integrado (MDX)",
        "Multi-idioma (ES + EN)",
        "SEO técnico (schema, OG, sitemap multilingüe)",
        "Analítica (Vercel + GA4)",
        "Micro-interacciones premium",
        "2 rondas de revisiones",
        "Soporte 3 meses incluido",
      ],
      en: [
        "Everything in Essential",
        "Up to 6 pages",
        "Integrated MDX blog",
        "Multi-language (ES + EN)",
        "Technical SEO (schema, OG, multilingual sitemap)",
        "Analytics (Vercel + GA4)",
        "Premium micro-interactions",
        "2 revision rounds",
        "3 months support included",
      ],
    },
    delivery: { es: "Entrega en 14 días laborables", en: "Delivered in 14 business days" },
    highlight: true,
    cta: { es: "Quiero la Profesional", en: "I want Professional" },
    Icon: Rocket,
  },
  {
    id: "shop",
    name: { es: "Tienda online", en: "Online shop" },
    price: "1.890 €",
    priceNote: { es: "pago único", en: "one-off" },
    tagline: { es: "E-commerce o proyecto a medida con pagos online.", en: "E-commerce or custom project with online payments." },
    features: {
      es: [
        "Todo lo de la Profesional",
        "Tienda hasta 50 productos",
        "Stripe integrado",
        "Gestión de stock básica",
        "Emails transaccionales",
        "Panel de admin",
        "SEO avanzado (Schema Product)",
        "3 rondas de revisiones",
        "Soporte 6 meses incluido",
      ],
      en: [
        "Everything in Professional",
        "Shop up to 50 products",
        "Stripe integration",
        "Basic stock management",
        "Transactional emails",
        "Admin panel",
        "Advanced SEO (Schema Product)",
        "3 revision rounds",
        "6 months support included",
      ],
    },
    delivery: { es: "Entrega en 21 días laborables", en: "Delivered in 21 business days" },
    highlight: false,
    cta: { es: "Quiero la Tienda", en: "I want the Shop" },
    Icon: Storefront,
  },
];

export const EXTRAS = [
  { name: { es: "Mantenimiento mensual", en: "Monthly maintenance" }, price: "39 €/mes" },
  { name: { es: "Página adicional", en: "Extra page" }, price: "89 €" },
  { name: { es: "Redacción de contenidos por página", en: "Copywriting per page" }, price: "49 €" },
  { name: { es: "Traducción extra a otro idioma", en: "Extra language translation" }, price: "desde 199 €" },
  { name: { es: "SEO técnico avanzado", en: "Advanced technical SEO" }, price: "desde 249 €" },
  { name: { es: "Integraciones a medida", en: "Custom integrations" }, price: "desde 149 €" },
];
