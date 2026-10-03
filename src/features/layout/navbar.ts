/** Menú móvil accesible + indicador de sección activa. */
export function initNavbar(): void {
  const header = document.getElementById('site-header');
  const toggle = header?.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.getElementById('mobile-menu');
  if (!header || !toggle || !menu) return;

  const iconOpen = toggle.querySelector<HTMLElement>('[data-icon-open]');
  const iconClose = toggle.querySelector<HTMLElement>('[data-icon-close]');

  const setOpen = (open: boolean, restoreFocus = false) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute(
      'aria-label',
      (open ? toggle.dataset['labelClose'] : toggle.dataset['labelOpen']) ?? '',
    );
    if (iconOpen) iconOpen.hidden = open;
    if (iconClose) iconClose.hidden = !open;
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });
  window.matchMedia('(min-width: 48rem)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });

  // Sección activa: la que cruza la franja central del viewport.
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  const ids = [...new Set(links.map((link) => link.hash.slice(1)))];
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);

  const setActive = (id: string | null) => {
    for (const link of links) {
      if (id !== null && link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActive(visible.target.id);
      else if (window.scrollY < window.innerHeight / 2) setActive(null);
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((section) => observer.observe(section));
}
