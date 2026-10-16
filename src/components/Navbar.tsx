import { useEffect, useState } from 'react';
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
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 28);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2.5 focus:font-heading focus:text-sm focus:font-bold focus:text-content-inverse focus:shadow-glow"
      >
        {t('nav.skipToContent')}
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 border-b border-white/10 bg-obsidian-base/90 backdrop-blur-xl transition-opacity duration-300 ${
            scrolled || mobileMenuOpen ? 'opacity-100 shadow-md' : 'opacity-65'
          }`}
        />

        <nav
          aria-label={t('nav.mainAria')}
          className={`relative mx-auto flex h-[4.5rem] max-w-container items-center justify-between px-6 transition-transform duration-300 ${
            scrolled ? 'scale-[0.985]' : 'scale-100'
          }`}
        >
          <a href="#hero" className="group inline-flex shrink-0 items-center gap-3 rounded-lg py-1">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-light to-gold-dark font-heading text-base font-black text-content-inverse shadow-sm transition-transform duration-300 group-hover:scale-105"
              aria-hidden="true"
            >
              B
            </span>
            <span className="font-heading text-lg font-extrabold tracking-tight text-content-primary">
              Bazan <span className="text-gold">&amp;</span> Co.
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
                    className={`relative whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-opacity ${
                      isActive
                        ? 'text-gold-light opacity-100'
                        : 'text-content-secondary opacity-85 hover:text-content-primary hover:opacity-100'
                    }`}
                  >
                    {t(`nav.items.${item.key}`)}
                    <span
                      className={`
                        absolute inset-x-3 bottom-0.5 h-0.5 origin-left rounded-full bg-gold transition-transform duration-300
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
              className="inline-flex h-10 items-center rounded-xl border border-white/10 bg-obsidian-surface p-1"
            >
              <GlobeIcon className="ml-2 mr-1.5 h-4 w-4 text-gold" />
              <button
                type="button"
                onClick={() => handleLanguageSwitch('es')}
                aria-pressed={currentLang === 'es'}
                className={`w-9 rounded-lg py-1 font-mono text-xs font-bold transition-opacity ${
                  currentLang === 'es'
                    ? 'bg-gold text-content-inverse shadow-sm'
                    : 'text-content-secondary hover:text-content-primary'
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                aria-pressed={currentLang === 'en'}
                className={`w-9 rounded-lg py-1 font-mono text-xs font-bold transition-opacity ${
                  currentLang === 'en'
                    ? 'bg-gold text-content-inverse shadow-sm'
                    : 'text-content-secondary hover:text-content-primary'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href="#contacto"
              className="btn-gold-primary inline-flex min-w-[11.5rem] items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm"
            >
              <span>{t('nav.ctaDesktop')}</span>
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <div
              role="group"
              aria-label={t('nav.langSwitcherAria')}
              className="inline-flex h-10 items-center rounded-xl border border-white/10 bg-obsidian-surface p-1"
            >
              <button
                type="button"
                onClick={() => handleLanguageSwitch('es')}
                aria-pressed={currentLang === 'es'}
                className={`w-8 rounded-lg py-1 font-mono text-xs font-bold ${
                  currentLang === 'es'
                    ? 'bg-gold text-content-inverse'
                    : 'text-content-secondary hover:text-content-primary'
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                aria-pressed={currentLang === 'en'}
                className={`w-8 rounded-lg py-1 font-mono text-xs font-bold ${
                  currentLang === 'en'
                    ? 'bg-gold text-content-inverse'
                    : 'text-content-secondary hover:text-content-primary'
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-content-primary hover:border-gold/40"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="relative border-t border-white/10 bg-obsidian-surface/95 px-6 py-5 backdrop-blur-xl lg:hidden"
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
                      className={`flex min-h-[2.75rem] items-center rounded-lg px-3 text-base font-medium ${
                        isActive
                          ? 'bg-gold/10 text-gold-light'
                          : 'text-content-secondary hover:text-content-primary'
                      }`}
                    >
                      {t(`nav.items.${item.key}`)}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 border-t border-white/10 pt-4">
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold-primary flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-xl px-5 text-sm"
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
