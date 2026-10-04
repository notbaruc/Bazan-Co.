/** Ejecuta trabajo no urgente cuando el navegador está libre (con un límite de espera). */
export function whenIdle(callback: () => void, timeout = 2000): void {
  if ('requestIdleCallback' in window) window.requestIdleCallback(callback, { timeout });
  else setTimeout(callback, Math.min(timeout, 1500));
}
