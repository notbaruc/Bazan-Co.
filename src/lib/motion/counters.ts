/** Cuenta hacia el valor final de `[data-counter]` al entrar en pantalla. El HTML ya trae el valor final. */
const DURATION_MS = 1400;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function animate(element: HTMLElement): void {
  const target = Number(element.dataset['counter']);
  if (!Number.isFinite(target)) return;
  const prefix = element.dataset['prefix'] ?? '';
  const suffix = element.dataset['suffix'] ?? '';
  const start = performance.now();

  const frame = (now: number) => {
    const progress = Math.min((now - start) / DURATION_MS, 1);
    element.textContent = `${prefix}${Math.round(easeOutCubic(progress) * target)}${suffix}`;
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

export function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.6 },
  );
  counters.forEach((counter) => observer.observe(counter));
}
