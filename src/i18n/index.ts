import en from './en';
import es, { type Dictionary } from './es';

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}

/** Rutas de cada página por idioma (con barra final, como las sirve Netlify). */
export const routes = {
  home: { es: '/', en: '/en/' },
  privacy: { es: '/privacidad/', en: '/en/privacy/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteName = keyof typeof routes;

export type { Dictionary };

/** Marca de dato pendiente del usuario (ver `es.ts`). */
export const PENDING_MARK = '[PENDIENTE USUARIO]';

export function isPending(text: string | null | undefined): text is string {
  return typeof text === 'string' && text.startsWith(PENDING_MARK);
}

export function stripPending(text: string): string {
  return text.replace(PENDING_MARK, '').trim();
}
