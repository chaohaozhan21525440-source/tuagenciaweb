import { es } from "./dict.es";
import { en } from "./dict.en";
import type { Locale } from "./config";

export { locales, defaultLocale, isLocale } from "./config";
export type { Locale } from "./config";
export type { Dict } from "./dict.es";
export {
  ROUTES,
  SECTION_HASHES,
  path,
  sectionPath,
  alternatePath,
} from "./slugs";
export type { RouteKey } from "./slugs";

const DICTS = { es, en } as const;

export function getDict(locale: Locale) {
  return DICTS[locale];
}
