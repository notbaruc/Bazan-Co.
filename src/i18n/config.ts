import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';

export type SupportedLanguage = 'es' | 'en';
export const LANG_STORAGE_KEY = 'bazan_lang';

export function resolveInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') {
    return 'es';
  }

  const pathname = window.location.pathname;
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return 'en';
  }

  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'en' || stored === 'es') {
      return stored;
    }
  } catch {
    // Almacenamiento local no disponible
  }

  const htmlLang = document.documentElement.lang?.toLowerCase();
  if (htmlLang === 'en' || htmlLang === 'es') {
    return htmlLang;
  }

  const navLang = window.navigator.language?.toLowerCase() ?? 'es';
  return navLang.startsWith('en') ? 'en' : 'es';
}

export function syncDocumentLanguageMeta(lang: SupportedLanguage) {
  if (typeof document === 'undefined') return;

  const dictionary = lang === 'en' ? en : es;
  document.documentElement.lang = lang;
  document.title = dictionary.meta.title;

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute('content', dictionary.meta.description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', dictionary.meta.title);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', dictionary.meta.description);
  }
}

export function applyLanguageChange(nextLang: SupportedLanguage) {
  void i18n.changeLanguage(nextLang);

  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, nextLang);
  } catch {
    // Ignorar en modo privado restringido
  }

  syncDocumentLanguageMeta(nextLang);

  const hash = window.location.hash || '';
  const targetPath = nextLang === 'en' ? '/en/' : '/';
  if (window.location.pathname !== targetPath) {
    window.history.pushState({ lang: nextLang }, '', `${targetPath}${hash}`);
  }
}

void i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: resolveInitialLanguage(),
  fallbackLng: 'es',
  initImmediate: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
