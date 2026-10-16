import { useEffect, useState } from 'react';
import { ArrowRightIcon, CloseIcon, MenuIcon } from './ui/Icons';

const NAV_ITEMS = [
  { id: 'problema', label: 'El Problema' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'portafolio', label: 'Portafolio' },
  { id: 'por-que', label: 'Por qué nosotros' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contacto', label: 'Contacto' },
];

export function Navbar() {
  const [activeId, setActiveId] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ['hero', ...NAV_ITEMS.map((item) => item.id)];
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
        Saltar al contenido principal
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-obsidian-base/90 backdrop-blur-md">
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex h-[4.5rem] max-w-container items-center justify-between px-6"
        >
          <a
            href="#hero"
            className="group inline-flex items-center gap-3 rounded-lg py-1"
            aria-label="Bazan & Co. — Ir al inicio"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-light to-gold-dark font-heading text-base font-black text-content-inverse shadow-sm"
              aria-hidden="true"
            >
              B
            </span>
            <span className="font-heading text-lg font-extrabold tracking-tight text-content-primary">
              Bazan <span className="text-gold">&amp;</span> Co.
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-gold-light'
                        : 'text-content-secondary hover:text-content-primary'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute inset-x-3 bottom-0.5 h-0.5 rounded-full bg-gold"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#contacto"
              className="btn-gold-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm"
            >
              <span>Agenda una Consulta</span>
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-content-primary hover:border-gold/40 lg:hidden"
          >
            {mobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="border-t border-white/10 bg-obsidian-surface px-6 py-5 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
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
                      {item.label}
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
                <span>Agenda una Consulta Técnica</span>
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
