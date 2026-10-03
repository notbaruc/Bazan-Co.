/**
 * Scroll-reveal para `[data-reveal]`. Los estilos y el escalonado (por posición entre hermanos,
 * con :nth-child) están en global.css, así este script no escribe estilos.
 */
export function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );
  elements.forEach((element) => observer.observe(element));
}
