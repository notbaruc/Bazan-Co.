/**
 * Orquestador de animaciones. Reglas:
 * - Con `prefers-reduced-motion: reduce` no se inicializa nada (el contenido ya es visible).
 * - Los efectos de puntero (tilt, magnético, cursor, parallax) y Lenis solo se descargan en
 *   dispositivos con mouse/trackpad, mediante import() dinámico.
 * - Todo anima únicamente `transform` y `opacity`.
 */
import { whenIdle } from '@/lib/idle';
import { initCounters } from './counters';
import { initNavbarScroll } from './navbar-scroll';
import { initPauseOffscreen } from './pause-offscreen';
import { initReveal } from './reveal';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

export function initMotion(): void {
  initNavbarScroll();
  if (reducedMotion.matches) return;

  document.documentElement.classList.add('motion-ok');
  initReveal();
  initCounters();
  initPauseOffscreen();

  if (!finePointer.matches) return;
  whenIdle(() => {
    void import('./pointer-effects').then(({ initPointerEffects }) => initPointerEffects());
    void import('./smooth-scroll').then(({ initSmoothScroll }) => initSmoothScroll());
  });
}
