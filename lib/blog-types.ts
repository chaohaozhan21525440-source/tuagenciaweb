export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

/**
 * Helper that types an array as BlogBlock[] without widening literal types.
 * Use in dict files so `dict.blogPage.articles[n].content` infers correctly
 * and the discriminated union narrows in `switch (block.type)`.
 */
export const blocks = (b: BlogBlock[]): BlogBlock[] => b;
