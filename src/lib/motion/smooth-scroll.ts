/** Smooth scroll con Lenis (solo escritorio y sin reduced-motion; se carga con import() dinámico). */
import Lenis from 'lenis';

export function initSmoothScroll(): void {
  const navHeight = document.getElementById('site-header')?.offsetHeight ?? 64;
  // Lenis toma el control; el scroll suave nativo de CSS se desactiva para no duplicar.
  document.documentElement.style.scrollBehavior = 'auto';
  new Lenis({
    autoRaf: true,
    lerp: 0.12,
    anchors: { offset: -(navHeight + 16) },
  });
}
