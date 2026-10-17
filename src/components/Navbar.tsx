import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { applyLanguageChange, type SupportedLanguage } from '../i18n/config';
import { trackEvent } from '../utils/analytics';
import { ArrowRightIcon, CloseIcon, GlobeIcon, MenuIcon } from './ui/Icons';

const SECTION_KEYS = [
  { id: 'problema', key: 'problema' },
  { id: 'servicios', key: 'servicios' },
  { id: 'proceso', key: 'proceso' },
  { id: 'portafolio', key: 'portafolio' },
  { id: 'por-que', key: 'porQue' },
  { id: 'faq', key: 'faq' },
  { id: 'contacto', key: 'contacto' },
] as const;

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [activeId, setActiveId] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollSentinelRef = useRef<HTMLDivElement | null>(null);

  const currentLang: SupportedLanguage = i18n.language?.startsWith('en') ? 'en' : 'es';

  const handleLanguageSwitch = (nextLang: SupportedLanguage) => {
    if (nextLang === currentLang) return;
    trackEvent('language_change', {
      from_language: currentLang,
      to_language: nextLang,
    });
    applyLanguageChange(nextLang);
  };

  useEffect(() => {
    const sentinel = scrollSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setScrolled(!entry.isIntersecting);
        }
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', ...SECTION_KEYS.map((item) => item.id)];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <div
        ref={scrollSentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-7"
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:font-body focus:text-sm focus:font-semibold focus:text-ink-inverse focus:shadow-glow"
      >
        {t('nav.skipToContent')}
      </a>

      <header className="fixed inset-x-0 top-0 z-50 transform-gpu">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 border-b border-line bg-bg/90 backdrop-blur-md transition-opacity duration-500 ${
            scrolled || mobileMenuOpen ? 'opacity-100 shadow-md' : 'opacity-80'
          }`}
        />

        <nav
          aria-label={t('nav.mainAria')}
          className="relative mx-auto flex h-[4.5rem] max-w-container items-center justify-between px-6"
        >
          <a
            href="#hero"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-lg py-1"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-hi to-accent-lo font-body text-sm font-extrabold text-ink-inverse shadow-sm transition-transform duration-300 group-hover:scale-105"
              aria-hidden="true"
            >
              B
            </span>
            <span className="font-body text-lg font-semibold tracking-tight text-ink">
              Bazan <span className="text-accent">&amp;</span> Co.
            </span>
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {SECTION_KEYS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-opacity ${
                      isActive ? 'text-ink opacity-100' : 'text-ink-secondary hover:text-ink'
                    }`}
                  >
                    {t(`nav.items.${item.key}`)}
                    <span
                      className={`
                        absolute inset-x-3.5 bottom-0.5 h-px origin-left rounded-full bg-accent transition-transform duration-300
                        ${isActive ? 'scale-x-100' : 'scale-x-0'}
                      `}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <div
              role="group"
              aria-label={t('nav.langSwitcherAria')}
              className="inline-flex h-10 items-center rounded-full border border-line-strong bg-surface p-1"
            >
              <GlobeIcon className="ml-2 mr-1 h-4 w-4 text-accent" />
              <button
                type="button"
                onClick={() => handleLanguageSwitch('es')}
                aria-pressed={currentLang === 'es'}
                className={`w-9 rounded-full py-1 font-mono text-xs font-semibold transition-opacity ${
                  currentLang === 'es'
                    ? 'bg-elevated text-ink shadow-sm'
                    : 'text-ink-secondary hover:text-ink'
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                aria-pressed={currentLang === 'en'}
                className={`w-9 rounded-full py-1 font-mono text-xs font-semibold transition-opacity ${
                  currentLang === 'en'
                    ? 'bg-elevated text-ink shadow-sm'
                    : 'text-ink-secondary hover:text-ink'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href="#contacto"
              className="btn-gold-primary inline-flex min-h-11 min-w-[11.5rem] items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink-inverse shadow-glow hover:bg-accent-hi"
            >
              <span>{t('nav.ctaDesktop')}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <div
              role="group"
              aria-label={t('nav.langSwitcherAria')}
              className="inline-flex h-10 items-center rounded-full border border-line-strong bg-surface p-1"
            >
              <button
                type="button"
                onClick={() => handleLanguageSwitch('es')}
                aria-pressed={currentLang === 'es'}
                className={`w-8 rounded-full py-1 font-mono text-xs font-semibold ${
                  currentLang === 'es'
                    ? 'bg-elevated text-ink'
                    : 'text-ink-secondary hover:text-ink'
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                aria-pressed={currentLang === 'en'}
                className={`w-8 rounded-full py-1 font-mono text-xs font-semibold ${
                  currentLang === 'en'
                    ? 'bg-elevated text-ink'
                    : 'text-ink-secondary hover:text-ink'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink hover:border-accent/50"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="relative border-t border-line bg-bg/95 px-6 py-5 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {SECTION_KEYS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex min-h-[2.75rem] items-center rounded-xl px-3 text-base font-medium ${
                        isActive ? 'bg-accent/10 text-accent' : 'text-ink-secondary hover:text-ink'
                      }`}
                    >
                      {t(`nav.items.${item.key}`)}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 border-t border-line pt-4">
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold-primary flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-ink-inverse shadow-glow"
              >
                <span>{t('nav.ctaMobile')}</span>
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
