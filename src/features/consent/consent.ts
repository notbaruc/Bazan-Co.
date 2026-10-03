/** Consentimiento de cookies de analítica, guardado en el navegador del visitante. */
export type ConsentValue = 'granted' | 'denied';

const STORAGE_KEY = 'bazan-consent';
export const CONSENT_EVENT = 'bazan:consent';

export function getConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Modo privado o almacenamiento bloqueado: la decisión vale solo para esta visita.
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}
