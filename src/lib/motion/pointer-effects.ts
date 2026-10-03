/**
 * Efectos para mouse/trackpad (se carga solo con `(hover: hover) and (pointer: fine)`):
 * tilt 3D + spotlight en tarjetas, botones magnéticos, cursor que sigue al puntero y parallax.
 * Todo se escribe en `transform` dentro de requestAnimationFrame.
 */

const TILT_MAX_DEG = 5;
const MAGNET_MAX_PX = 6;
const PARALLAX_MAX_PX = 14;

function initTilt(): void {
  for (const card of document.querySelectorAll<HTMLElement>('[data-tilt]')) {
    const spotlight = card.querySelector<HTMLElement>('[data-spotlight]');
    let frame = 0;

    card.addEventListener('pointermove', (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = (x / rect.width - 0.5) * 2 * TILT_MAX_DEG;
        const rotateX = (0.5 - y / rect.height) * 2 * TILT_MAX_DEG;
        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        if (spotlight) {
          spotlight.style.transform = `translate(${x - spotlight.offsetWidth / 2}px, ${y - spotlight.offsetHeight / 2}px)`;
        }
      });
    });

    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      card.style.transform = '';
    });
  }
}

function initMagnetic(): void {
  for (const element of document.querySelectorAll<HTMLElement>('[data-magnetic]')) {
    let frame = 0;
    element.addEventListener('pointermove', (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        element.style.transform = `translate(${(dx * MAGNET_MAX_PX).toFixed(1)}px, ${(dy * MAGNET_MAX_PX).toFixed(1)}px)`;
      });
    });
    element.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      element.style.transform = '';
    });
  }
}

function initCursor(): void {
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(ring);

  let targetX = -100;
  let targetY = -100;
  let x = targetX;
  let y = targetY;
  let active = false;
  let running = false;

  const loop = () => {
    x += (targetX - x) * 0.22;
    y += (targetY - y) * 0.22;
    ring.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${active ? 1.8 : 1})`;
    if (Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1) {
      requestAnimationFrame(loop);
    } else {
      running = false;
    }
  };

  window.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      active = Boolean(target?.closest('a, button, summary, select, input, textarea, [data-tilt]'));
      ring.classList.add('is-visible');
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () =>
    ring.classList.remove('is-visible'),
  );
}

function initParallax(): void {
  const layers = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
  if (layers.length === 0) return;
  const visible = new Set<HTMLElement>();

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!(entry.target instanceof HTMLElement)) continue;
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    }
    update();
  });
  layers.forEach((layer) => observer.observe(layer));

  let ticking = false;
  function update() {
    ticking = false;
    const viewport = window.innerHeight;
    for (const layer of visible) {
      const rect = layer.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const offset = Math.max(-1, Math.min(1, progress)) * -PARALLAX_MAX_PX;
      layer.style.transform = `translateY(${offset.toFixed(1)}px) scale(1.08)`;
    }
  }

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
}

export function initPointerEffects(): void {
  initTilt();
  initMagnetic();
  initCursor();
  initParallax();
}
