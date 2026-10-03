import es, { type Dictionary } from './es';

export const locales = ['es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

const dictionaries: Record<Locale, Dictionary> = { es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };

/** Marca de dato pendiente del usuario (ver `es.ts`). */
export const PENDING_MARK = '[PENDIENTE USUARIO]';

export function isPending(text: string | null | undefined): text is string {
  return typeof text === 'string' && text.startsWith(PENDING_MARK);
}

export function stripPending(text: string): string {
  return text.replace(PENDING_MARK, '').trim();
}
