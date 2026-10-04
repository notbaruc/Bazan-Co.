/**
 * Google Analytics 4 con consentimiento previo:
 * - gtag.js solo se descarga si el visitante acepta cookies de analítica (y en idle, para no
 *   competir con la carga de la página).
 * - Si después rechaza, se actualiza el consentimiento y se borran las cookies `_ga*`.
 * - Los eventos se descartan mientras no haya consentimiento.
 * El ID se configura con la variable de entorno PUBLIC_GA_ID (por defecto, el ID del sitio anterior).
 */
import { CONSENT_EVENT, getConsent } from '@/features/consent/consent';
import { whenIdle } from '@/lib/idle';

const GA_ID = import.meta.env.PUBLIC_GA_ID ?? 'G-CN941SX6Q7';

type GtagArgs = [command: string, ...params: unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

let loaded = false;

// gtag.js solo reconoce el objeto `arguments` (no un arreglo) dentro de dataLayer.
function gtag(..._args: GtagArgs): void {
  window.dataLayer = window.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

function load(): void {
  if (loaded || !GA_ID) return;
  loaded = true;
  window.gtag = gtag;
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  gtag('js', new Date());
  gtag('config', GA_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.append(script);
}

function revoke(): void {
  if (loaded) gtag('consent', 'update', { analytics_storage: 'denied' });
  const domain = location.hostname;
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim() ?? '';
    if (!name.startsWith('_ga')) continue;
    for (const target of [domain, `.${domain}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${target}`;
    }
  }
}

/** Envía un evento a GA4 solo si hay consentimiento. */
export function track(event: string, params: Record<string, string> = {}): void {
  if (getConsent() !== 'granted') return;
  load(); // Si aún no cargó (idle pendiente), el evento queda en cola en dataLayer.
  gtag('event', event, { ...params, language: document.documentElement.lang });
}

/** Clics que importan para el negocio, delegados en el documento. */
function trackClicks(): void {
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const whatsapp = target.closest<HTMLElement>('[data-wa-source]');
    if (whatsapp) {
      track('whatsapp_click', { source: whatsapp.dataset['waSource'] ?? 'unknown' });
      return;
    }
    const project = target.closest<HTMLElement>('[data-project]');
    if (project) {
      track('project_click', { project_id: project.dataset['project'] ?? 'unknown' });
      return;
    }
    const languageSwitch = target.closest<HTMLElement>('[data-lang-switch]');
    if (languageSwitch) {
      track('language_change', {
        from: document.documentElement.lang,
        to: languageSwitch.dataset['langSwitch'] ?? 'unknown',
      });
    }
  });
}

export function initAnalytics(): void {
  trackClicks();
  if (getConsent() === 'granted') whenIdle(load, 3000);
  window.addEventListener(CONSENT_EVENT, (event) => {
    if (!(event instanceof CustomEvent)) return;
    const value: unknown = event.detail;
    if (value === 'granted') load();
    else if (value === 'denied') revoke();
  });
}
