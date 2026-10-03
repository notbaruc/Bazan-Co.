/** Navbar compacta con fondo difuminado después de los primeros píxeles de scroll. */
const THRESHOLD_PX = 24;

export function initNavbarScroll(): void {
  const header = document.getElementById('site-header');
  if (!header) return;

  let ticking = false;
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > THRESHOLD_PX);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  // En el siguiente frame: leer scrollY ahora forzaría el primer layout dentro de este script.
  requestAnimationFrame(update);
}
