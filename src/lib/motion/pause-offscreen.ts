/** Pausa las animaciones en bucle (`[data-loop]`) cuando salen de pantalla para ahorrar GPU y batería. */
export function initPauseOffscreen(): void {
  const loops = document.querySelectorAll<HTMLElement>('[data-loop]');
  if (loops.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      entry.target.toggleAttribute('data-paused', !entry.isIntersecting);
    }
  });
  loops.forEach((loop) => observer.observe(loop));
}
