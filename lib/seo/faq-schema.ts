export type FaqItem = { q: string; a: string };

export function buildFaqPageSchema(items: FaqItem[]): string {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
  return JSON.stringify(json);
}
