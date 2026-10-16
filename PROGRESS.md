# PROGRESS.md — Registro de Avance, Decisiones y Métricas

## Checklist de Fases
- [x] **Arranque:** Mover sitio original a `legacy/`, crear `legacy/REFERENCIA.md`, `AGENTS.md`, `.gitattributes`, `PLAN.md` y `PROGRESS.md`.
- [x] **Fase 1 — Base:** Vite + React 18 + TypeScript + Tailwind CSS, design tokens, fuentes self-hosted, ESLint + Prettier (`eol: lf`), `netlify.toml`, `README.md`.
- [x] **Fase 2 — Layout Estático Mobile-First:** Todas las secciones en orden, HTML semántico, foco visible, contraste AA, validación de formulario en cliente, compuerta Lighthouse móvil superada (`Performance: 99`, `Accessibility: 100`, `Best Practices: 100`, `SEO: 100`, `LCP: 1.7 s (1668 ms)`, `TBT: 30 ms`, `CLS: 0.008`).
- [x] **Fase 3 — Animaciones:** Registro de efectos y costos, implementación `transform`/`opacity`, prueba con CPU throttling 4x, compuerta Lighthouse móvil superada (`Performance: 98`, `Accessibility: 96`, `Best Practices: 100`, `SEO: 100`, `LCP: 2.0 s (1967 ms < 2000 ms)`, `TBT: 40 ms (39 ms)`, `CLS: 0.009`).
- [ ] **Fase 4 — i18n ES/EN:** `react-i18next`, selector en navbar, persistencia, copy 100% en JSON, rutas `/` y `/en/` compatibles con `hreflang`, cero CLS, compuerta Lighthouse móvil.
- [ ] **Fase 5 — SEO, Analítica y Formulario:** Prerender estático (`/` y `/en/`), Search Console tag, JSON-LD `ProfessionalService`, `sitemap.xml`, `robots.txt`, GA4 (`G-CN941SX6Q7`) + 4 eventos, Netlify Forms con honeypot y estados, compuerta Lighthouse móvil.
- [ ] **Fase 6 — Auditoría Final y Entrega:** Auditoría móvil y desktop, revisión de código y contenido, creación de `REPORT.md`.

---

## Compuertas de Rendimiento Medidas (Evidencia Real)

### Cierre de Fase 2 (Layout Estático Mobile-First)
- **Comando ejecutado:** `node scripts/audit-lighthouse.mjs mobile` (`npx --yes lighthouse http://127.0.0.1:4173/ --output=json --output-path=./lighthouse-mobile.json --chrome-flags="--headless=new --no-sandbox --disable-gpu" --only-categories=performance,accessibility,best-practices,seo --quiet`)
- **Resultados medidos (Móvil con CPU 4x slowdown y Slow 4G):**
  - **Performance:** `99 / 100` (Presupuesto: ≥ 95)
  - **Accessibility:** `100 / 100` (Presupuesto: ≥ 95)
  - **Best Practices:** `100 / 100` (Presupuesto: ≥ 95)
  - **SEO:** `100 / 100` (Presupuesto: = 100)
  - **FCP:** `1.7 s`
  - **LCP:** `1.7 s` (`1668 ms`, Presupuesto: < 2000 ms)
  - **TBT:** `30 ms` (`28 ms`, Presupuesto INP/TBT: < 200 ms)
  - **CLS:** `0.008` (Presupuesto: < 0.05)

### Cierre de Fase 3 (Animaciones e Interacciones GPU)
- **Comando ejecutado:** `node scripts/audit-lighthouse.mjs mobile`
- **Resultados medidos (Móvil con CPU 4x slowdown y Slow 4G):**
  - **Performance:** `98 / 100` (Presupuesto: ≥ 95)
  - **Accessibility:** `96 / 100` (Presupuesto: ≥ 95)
  - **Best Practices:** `100 / 100` (Presupuesto: ≥ 95)
  - **SEO:** `100 / 100` (Presupuesto: = 100)
  - **FCP:** `2.0 s`
  - **LCP:** `2.0 s` (`1967 ms`, Presupuesto: < 2000 ms)
  - **TBT:** `40 ms` (`39 ms`, Presupuesto INP/TBT: < 200 ms)
  - **CLS:** `0.009` (Presupuesto: < 0.05)

---

## Registro Previo de Efectos y Costos — Fase 3 (Animaciones)

Antes de implementar la Fase 3, se documenta el costo técnico de cada efecto y qué se aprueba o descarta para proteger el presupuesto (`LCP < 2s`, `Performance ≥ 95`, `CLS < 0.05`, `INP < 200ms` con CPU throttling 4x):

| Efecto solicitado | Decisión | Costo en Bundle / CPU / GPU | Estrategia de Implementación |
| :--- | :--- | :--- | :--- |
| **1. Hero con reveal por palabra** | **APROBADO** | `0 KB` JS extra / Compositor GPU (`transform`, `opacity`) | Escalado por palabra con `transition-delay` escalonado en el `<h1>`, manteniendo visibilidad inmediata en SSR para que el párrafo/título LCP se pinte sin esperar hidratación ni penalizar LCP en móvil. |
| **2. Fondo animado ligero en Hero vs Three.js** | **APROBADO CSS/SVG / DESCARTADO Three.js** | CSS/SVG: `0 KB` JS, GPU-only (`transform`, `opacity`). Three.js: `+150 KB` gzipped JS + compilación de shaders WebGL (~350-600ms TBT en CPU móvil 4x). | Se implementa malla geométrica arquitectónica + orbes radiales animados con `@keyframes float-orb` (`translate3d` y `scale`). Se **descarta Three.js** porque su peso y bloqueo de hilo principal romperían el presupuesto de TBT/LCP en móvil. |
| **3. Smooth Scroll (Lenis) + Scroll-Reveal escalonado** | **APROBADO (con carga diferida y respeto a reduced-motion)** | Lenis: `~3 KB` gzipped; Scroll-reveal: `IntersectionObserver` nativo (`0 KB` librerías). | Se inicializa `Lenis` de forma no bloqueante tras el primer pintado (`requestIdleCallback` / `setTimeout`) solo cuando `prefers-reduced-motion: no-preference` y en dispositivos de puntero fino, evitando trabajo innecesario durante la ventana crítica de LCP/TBT móvil. |
| **4. Contadores animados en viewport** | **APROBADO** | `< 0.5 KB` JS (`requestAnimationFrame` + `IntersectionObserver`) | Anima valores numéricos verificables (`<2s`, `95+`, `100%`, `1:1`) al entrar en viewport, pero renderiza el valor final real en el HTML estático inicial para que crawlers, usuarios sin JS y el primer frame de LCP nunca muestren `0`. |
| **5. Tarjetas de servicios con Tilt 3D y Spotlight al cursor** | **APROBADO** | `< 0.8 KB` JS, activo solo en `(pointer: fine)` | Calcula `rotateX`/`rotateY` (máx. `5deg`) y coordenadas `--mouse-x`/`--mouse-y` en `onPointerMove`, aplicando `transform: perspective(1000px) rotateX(...) rotateY(...)` y un `radial-gradient` de opacidad en capa absoluta. |
| **6. Parallax sutil en portafolio** | **APROBADO** | `< 0.5 KB` JS (`requestAnimationFrame` pasivo en scroll) | Desplazamiento vertical sutil (`translate3d(0, y, 0)` entre `-12px` y `+12px`) sobre la imagen dentro de su contenedor `overflow-hidden`, cero reflujo (`CLS = 0`). |
| **7. Navbar que se compacta con blur al hacer scroll** | **APROBADO** | `< 0.2 KB` JS (`scroll` listener pasivo) | Cambia estado cuando `window.scrollY > 32`, reduciendo padding/escala visual con `backdrop-blur-xl`, fondo más denso y sombra sutil sin alterar el flujo del documento (`fixed`). |
| **8. Cursor personalizado solo en desktop** | **APROBADO** | `< 0.6 KB` JS, activo solo en `(hover: hover) and (pointer: fine)` | Anillo dorado que sigue al puntero mediante `translate3d(x, y, 0)` con interpolación suave en `requestAnimationFrame` y se expande sobre enlaces/botones interactivos. Totalmente inactivo en pantallas táctiles. |
| **9. Micro-interacciones en botones y formulario** | **APROBADO** | `0 KB` JS (CSS `transform`/`opacity` + estados de foco/validación) | Efecto de destello diagonal (`skewX` + `translate3d`) en botones primarios, elevación `-2px`, y feedback visual instantáneo en inputs del formulario. |
| **10. Marquee infinito de tecnologías** | **APROBADO** | `0 KB` JS (CSS `@keyframes marquee-scroll` con `translate3d(-50%, 0, 0)`) | Carrusel continuo con las tecnologías reales del stack (`React 18`, `TypeScript`, `Tailwind CSS`, `Vite`, `SEO Técnico`, `Core Web Vitals`, `Schema.org`, `Google Analytics 4`, `Search Console`, `Netlify Edge`). Se pausa en `:hover` y se desactiva en `prefers-reduced-motion`. |
| **11. Preloader de pantalla completa** | **DESCARTADO** | Penalización directa de `+600ms a +1500ms` en LCP móvil. | La regla de Fase 3 indica *"preloader solo si no empeora el LCP"*. Cualquier overlay o preloader inicial retrasa el pintado del elemento principal del Hero y degrada el LCP por encima de 2s en 4G lento. Se descarta por completo. |

---

## Decisiones Registradas y Puntos `[REVISAR]`
1. **Stack Base (`[DECIDIDO]`):** Se eligió **Vite + React 18 + TypeScript + Tailwind CSS + Prerender Estático (`renderToString` en postbuild)** sobre Astro con islas. Esto respeta literalmente el stack pedido en Fase 1 y Fase 4 (`react-i18next`), entregando HTML estático pre-renderizado para `/` y `/en/` con LCP < 2s y cambio de idioma instantáneo sin recarga ni CLS.
2. **Compatibilidad con `&` en ruta de Windows (`[DECIDIDO]`):** Dado que el directorio padre se llama `Bazan & Co`, los shims `.cmd` de `node_modules/.bin` en `cmd.exe` fallaban al interpretar `&` como separador de comando. Se configuraron los scripts de `package.json` y `scripts/build.mjs` para invocar directamente los binarios JS mediante `node ./node_modules/...`, funcionando de forma idéntica en Windows y en Linux (Netlify).
3. **Paleta y Contraste (`[DECIDIDO]`):** Se definió la paleta **"Obsidian & Liquid Gold"** (`#07080C` base, `#0F1117` surface, `#D4AF37` oro metálico, `#8E95A8` texto muted mejorado a >5.6:1 para cumplir WCAG AA donde el sitio original `#5c5e6a` fallaba).
3. **ID de Google Analytics (`[REVISAR]`):** Se conservó el ID real encontrado en el `index.html` original (`G-CN941SX6Q7`) como valor por defecto de `VITE_GA_MEASUREMENT_ID`, asegurando continuidad total del tracking actual.
4. **Imágenes de Portafolio (`[REVISAR]`):** Se reutilizan y optimizan las imágenes reales del repositorio (`Consumbiles.webp`, `RIES_Logo_BW.webp`, `GECH_Logo.webp`) con dimensiones explícitas (`width="800" height="500"`). Para GECH no existía URL externa en el HTML original (solo el asset `img/GECH_Logo.webp`), por lo que su URL externa queda marcada con `[PENDIENTE USUARIO]`.

---

## Elementos `[PENDIENTE USUARIO]`
- **Portafolio — Soldaduras y Equipos:** Métricas de conversión post-lanzamiento y testimonio del cliente (`[PENDIENTE USUARIO]`).
- **Portafolio — RIES Chihuahua:** Métricas de captación B2B en sector maquilador y testimonio del cliente (`[PENDIENTE USUARIO]`).
- **Portafolio — GECH:** Métricas de impacto, testimonio del cliente y confirmación de URL pública si aplica (`[PENDIENTE USUARIO]`).
- **Aviso de Privacidad:** Confirmar razón social / domicilio fiscal completo si desea incluirlo además de Chihuahua, México y `contacto@bazanco.com` (`[PENDIENTE USUARIO]`).

---

## Ideas para después (No implementadas para respetar el alcance)
- Blog técnico MDX con artículos de SEO local para PYMEs en Chihuahua y Texas.
- Calculadora interactiva de ROI / cotizador preliminar con envío directo a WhatsApp.
- Integración directa con Calendly / Cal.com embebido bajo demanda tras clic en CTA.
- Generación dinámica de imágenes Open Graph por sección o caso de estudio.
