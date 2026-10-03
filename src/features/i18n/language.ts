/**
 * Preferencia de idioma del visitante. Solo se guarda cuando la elige explícitamente
 * (selector, sugerencia o "No, gracias"); el script inline del <head> la usa para redirigir.
 */
export const LANGUAGE_STORAGE_KEY = 'bazan-lang';

export function saveLanguagePreference(locale: string): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  } catch {
    // Almacenamiento bloqueado: la elección vale solo para esta navegación.
  }
}

export function getLanguagePreference(): string | null {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return null;
  }
}
