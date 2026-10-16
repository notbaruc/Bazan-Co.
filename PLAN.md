# PLAN.md — Plan Maestro de Ingeniería: Refactor Bazan & Co.

## 1. Decisión Arquitectónica: Vite + React 18 + TypeScript + Tailwind CSS + Prerender Estático (SSG)

### Comparativa Técnica
| Criterio | Opción A: Vite + React 18 + Prerender Estático (Elegida) | Opción B: Astro + Islas de React |
| :--- | :--- | :--- |
| **Alineación con `TAREA.md`** | Cumple literalmente el stack de Fase 1 (`Vite + React 18 + TypeScript + Tailwind`) y Fase 4 (`react-i18next` en toda la app sin recarga ni CLS). | Requiere duplicar sistema de traducción entre frontmatter `.astro` e islas React o hidratar toda la página como una sola isla. |
| **LCP y FCP (Presupuesto < 2s)** | El script de prerender (`scripts/prerender.mjs` con `react-dom/server`) genera HTML estático completo en `dist/index.html` (ES) y `dist/en/index.html` (EN). El navegador pinta el Hero inmediatamente con HTML + CSS sin bloquearse en JS. | Excelente LCP por HTML estático, pero sin ventaja real frente a Vite prerenderizado para una landing single-page. |
| **Cambio de idioma sin CLS (Fase 4)** | Cambio instantáneo en cliente mediante `react-i18next` + actualización de ruta (`/` ↔ `/en/`) con `CLS = 0.000`, manteniendo además rutas estáticas pre-renderizadas para SEO y `hreflang`. | Cambiar entre `/` y `/en/` en Astro implica navegación MPA completa o hidratar todo el árbol. |
| **Peso del Bundle JS** | ~55 KB gzipped total (React 18 + i18next ligeros, cero librerías pesadas de animación). | Similar cuando las secciones interactivas (Navbar, Hero, Servicios, Portafolio, Contadores, FAQ, Formulario, Cookies) requieren hidratación. |

**Justificación con el Presupuesto de Rendimiento:**
Con **Vite + React 18 + TypeScript + Tailwind CSS + Prerender Estático (`renderToString`)**, obtenemos lo mejor de ambos mundos:
1. **SEO = 100 y LCP < 2s:** Los crawlers y usuarios reciben el HTML completo pre-renderizado tanto en `/` (`lang="es"`) como en `/en/` (`lang="en"`), con sus respectivos `<title>`, `<meta>`, Open Graph, `hreflang`, JSON-LD y formulario estático para Netlify Forms.
2. **Performance ≥ 95 e INP < 200ms:** Cero hidratación bloqueante pesada; animaciones implementadas exclusivamente con CSS `transform` y `opacity` + `IntersectionObserver` nativo.

---

## 2. Dirección Visual: Paleta y Tipografía ("Premium, Tecnológico, Oscuro y Elegante")

### Paleta: "Obsidian & Liquid Gold"
Diseñada específicamente para proyectar autoridad de ingeniería de software, evitando el negro puro plano mediante matices obsidiana y asegurando **contraste WCAG AA/AAA (≥ 4.5:1 en texto normal, ≥ 7:1 en titulares)**:

- **Fondos:**
  - `bg-base`: `#07080C` (Obsidiana profundo)
  - `bg-surface`: `#0F1117` (Superficie de tarjetas técnicas)
  - `bg-elevated`: `#161922` (Superficie elevada / estados interactivos)
  - `bg-glass`: `rgba(15, 17, 23, 0.80)` (Paneles translúcidos con `backdrop-filter: blur(16px)`)
- **Texto (Verificado WCAG AA/AAA):**
  - `text-primary`: `#F5F6FA` (Blanco platino — ratio **18.4:1** sobre `#07080C`)
  - `text-secondary`: `#B0B5C4` (Gris titanio — ratio **9.6:1** sobre `#07080C`)
  - `text-muted`: `#8A90A2` (Gris acero — ratio **6.1:1** sobre `#07080C` y **5.3:1** sobre `#0F1117`; corrige el déficit de contraste del sitio legacy)
  - `text-inverse`: `#07080C` (Sobre botones dorados `#D4AF37` — ratio **10.2:1**)
- **Acentos:**
  - `accent`: `#D4AF37` (Oro metálico de precisión)
  - `accent-light`: `#F0D57B` (Oro champán luminoso)
  - `accent-dark`: `#AA8620` (Oro bronce)
  - `accent-tech`: `#38BDF8` (Cian técnico sutil para badges de performance/estado)
- **Bordes:**
  - `border-subtle`: `rgba(255, 255, 255, 0.08)`
  - `border-accent`: `rgba(212, 175, 55, 0.30)`

### Tipografía Self-Hosted (Cero Peticiones Externas a Google Fonts)
- **Headings / Display:** `Plus Jakarta Sans Variable` (`@fontsource-variable/plus-jakarta-sans`, subset `latin` + `latin-ext`, `font-display: swap`, pesos 600–800).
- **Body / UI:** `Inter Variable` (`@fontsource-variable/inter`, subset `latin` + `latin-ext`, `font-display: swap`, pesos 400–600).
- **Monospace (detalles técnicos/métricas):** Stack nativo de alta precisión (`'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`) para no añadir peso de fuentes extra.

---

## 3. Plan por Fases y Gestión de Riesgos

### Fase 1: Base e Infraestructura
- **Entregables:** Movimiento del sitio actual a `legacy/`, configuración de Vite + React 18 + TypeScript + Tailwind CSS, tokens centralizados en `src/styles/tokens.css` y `tailwind.config.js`, fuentes self-hosted (`@fontsource-variable`), ESLint + Prettier (`endOfLine: "lf"`), `.gitattributes`, `netlify.toml` (headers de caché inmutable para assets, CSP/seguridad y redirects SPA/i18n), `README.md` con comandos en PowerShell.
- **Riesgos y Mitigación:**
  - *Riesgo:* Conflictos CRLF/LF en Windows. *Mitigación:* `.gitattributes` con `* text=auto eol=lf` y `.prettierrc` con `"endOfLine": "lf"`.
  - *Riesgo:* Que `legacy/` contamine el build. *Mitigación:* Excluir `legacy/` en `tsconfig.json` y ESLint.

### Fase 2: Layout Estático Mobile-First (Sin Animaciones)
- **Entregables:** Todas las secciones obligatorias en orden exacto:
  1. `Navbar` (con detector de sección activa, selector de idioma preparado, accesibilidad por teclado y menú móvil).
  2. `Hero` (propuesta de valor, CTAs a WhatsApp y Consulta, contadores verificables).
  3. `TrustBar` (Barra de confianza: UTCH BIS, iTEP Academic Plus, Core Web Vitals <2s, Arquitectura limpia, Trato directo con el ingeniero).
  4. `ProblemSolution` (Comparativa clara entre agencias tradicionales/plantillas lentas vs. ingeniería web de conversión Bazan & Co.).
  5. `Services` (Diseño Web Premium, Optimización SEO, Landing Pages de Alta Conversión — sin claims no demostrables como A/B testing).
  6. `Process` (Diagnóstico, Diseño, Desarrollo, Lanzamiento).
  7. `Portfolio` (Soldaduras y Equipos, RIES Chihuahua y GECH con problema, solución, stack, resultado y `[PENDIENTE USUARIO]` para métricas/testimonios).
  8. `WhyUs` (Por qué Bazan & Co. — diferenciadores técnicos y de negocio).
  9. `FAQ` (Preguntas frecuentes orientadas a dueños de PYMEs con acordeón accesible).
  10. `FinalCTA` (Banner de cierre de alta conversión).
  11. `Contact` (Formulario con validación en cliente + datos directos).
  12. `Footer` + `PrivacyModal` (coherente con Netlify Forms + GA4 + WhatsApp) + `WhatsAppFab` + `CookieBanner`.
- **Compuerta de Rendimiento:** Medir con `npm run preview` + `npx lighthouse` en móvil.

### Fase 3: Animaciones de Bajo Costo y Alta Precisión
- **Entregables:** Registro previo de costos en `PROGRESS.md`. Implementación de:
  - Reveal por palabra en Hero (`transform` y `opacity`).
  - Fondo animado ligero en CSS/SVG con malla geométrica y resplandor radial (se descarta Three.js y preloader bloqueante para proteger LCP < 2s e INP < 200ms).
  - Smooth scroll ligero compatible con navegación por anclas y `prefers-reduced-motion` (se evalúa Lenis vs. implementación CSS/RAF; si Lenis no degrada INP/TBT con CPU 4x se mantiene, documentando mediciones reales).
  - Scroll-reveal escalonado con `IntersectionObserver`.
  - Contadores animados en viewport para valores numéricos verificables (`100%`, `<2s`, `95+`).
  - Tarjetas de servicios con tilt 3D suave (`rotateX`/`rotateY` en desktop) y spotlight radial al cursor vía CSS custom properties.
  - Parallax sutil en imágenes de portafolio (`translate3d`).
  - Navbar compacta con blur al hacer scroll.
  - Cursor personalizado solo en dispositivos con puntero fino (`(pointer: fine)`).
  - Marquee infinito de tecnologías en CSS puro (`translate3d`).
  - Respeto absoluto a `@media (prefers-reduced-motion: reduce)`.
- **Compuerta de Rendimiento:** Prueba con CPU throttling 4x en Lighthouse móvil (≥ 95 en todo, SEO = 100).

### Fase 4: Internacionalización (i18n ES/EN)
- **Entregables:** `react-i18next` + `i18next`, archivos `src/i18n/locales/es.json` y `src/i18n/locales/en.json` con el 100% del copy, detección de idioma y persistencia en `localStorage`, rutas `/` (ES) y `/en/` (EN) sincronizadas sin layout shift (`CLS = 0`).
- **Compuerta de Rendimiento:** Medición Lighthouse móvil post-i18n.

### Fase 5: SEO Técnico, Analítica (GA4) y Formulario (Netlify Forms)
- **Entregables:**
  - Script SSG (`scripts/prerender.mjs`) que genera `dist/index.html` y `dist/en/index.html` con metadatos localizados, `hreflang`, `canonical`, Open Graph y JSON-LD (`ProfessionalService`).
  - Meta tag de verificación de Search Console intacta (`vkZJiBpk1G6FxHcrMStEB7mfx0OqFYhLGhKE58p7JNI`).
  - `public/sitemap.xml` (con entradas `/` y `/en/` + `xhtml:link` hreflang) y `public/robots.txt`.
  - Integración de Google Analytics 4 (`G-CN941SX6Q7`, configurable por `VITE_GA_MEASUREMENT_ID` con fallback al ID original del sitio) + eventos personalizados (`whatsapp_click`, `form_submit`, `project_click`, `language_change`).
  - Formulario conectado a Netlify Forms (`data-netlify="true"`, `netlify-honeypot="bot-field"`, estados `idle`, `validating`, `submitting`, `success`, `error`, accesible por teclado con `aria-live`).
- **Compuerta de Rendimiento:** Medición Lighthouse móvil post-SEO/SSG.

### Fase 6: Auditoría Final y Entrega (`REPORT.md`)
- **Entregables:** Auditoría crítica de Lighthouse móvil y desktop, accesibilidad, contraste, reduced-motion, limpieza de código/dependencias, verificación de todas las reglas de contenido y redacción de `REPORT.md`.
