export type AnalyticsEventName =
  'whatsapp_click' | 'form_submit' | 'project_click' | 'language_change';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaInitialized?: boolean;
  }
}

export const GA_MEASUREMENT_ID: string =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || 'G-CN941SX6Q7';

const COOKIE_STORAGE_KEY = 'bazan_cookie_consent';

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(COOKIE_STORAGE_KEY) === 'accepted';
  } catch {
    return false;
  }
}

export function initGoogleAnalytics(): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;
  if (window.__gaInitialized) return;

  window.__gaInitialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });

  const existingScript = document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.appendChild(script);
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return;

  if (hasAnalyticsConsent() && !window.__gaInitialized) {
    initGoogleAnalytics();
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params ?? {});
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}
