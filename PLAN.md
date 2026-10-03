# PLAN — Refactor de la landing de Bazan & Co.

> Documento vivo. Se lee al iniciar cada sesión junto con `PROGRESS.md`.
> Fecha de la auditoría: 2026-10-03 · Commit auditado: `19e882a` (rama `main`).
> Sitio en producción: https://bazanconsultoria.netlify.app

---

## 0. Auditoría del sitio actual

### 0.1 Estructura

| Archivo | Tamaño | Notas |
|---|---|---|
| `index.html` | 35.7 KB | Una sola página, 8 secciones + footer, modal de privacidad, banner de cookies, FAB de WhatsApp. SVG de íconos (Heroicons) repetidos inline. |
| `css/styles.css` | 28.9 KB | BEM limpio, tokens en `:root`. Sin minificar. |
| `js/main.js` | 9.5 KB | 10 funciones `init*` vanilla, sin dependencias. |
| `img/` | 2.4 MB | 8 archivos, **solo 3 se usan** (ver 0.4). |
| `robots.txt`, `sitemap.xml` | — | Correctos pero mínimos (1 URL, sin hreflang). |
| `README.md` | 28 B | Codificado en **UTF-16** (se ve corrupto en GitHub). |
| `.vscode/extensions.json` | — | Recomienda una extensión ajena al proyecto. |

**No hay** `package.json`, build, `netlify.toml`, `_headers` ni `_redirects`: Netlify publica la raíz del repo tal cual.

### 0.2 CSS — qué hay y qué sirve
- **Reutilizable (como referencia, no copia literal):**
  - Escala de espaciado (`--space-xs` … `--space-5xl`), radios, sombras y duraciones → base para los tokens de Tailwind.
  - Curva `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`: buena; se conserva como token de motion.
  - Patrones visuales que ya encajan con la nueva dirección: grid de fondo en el hero, divisores con glow, línea de acento superior en cards al hover, eyebrow con línea.
  - Tipografía fluida con `clamp()` para h1/h2/h3.
- **Problemas detectados:**
  - **Contraste insuficiente**: `--text-muted #5c5e6a` sobre `#0a0a0c` = **3.07:1** (sobre superficies 2.80:1). Se usa en textos de cards, labels y footer → falla WCAG AA (4.5:1). Lighthouse Accessibility lo marcará.
  - Google Fonts se carga **dos veces** (`<link>` en el HTML y `@import` en el CSS); el `@import` crea una cadena bloqueante. Se piden 12 pesos (Inter 7 + Plus Jakarta 5).
  - Sin `prefers-reduced-motion` en ningún lado (incluye `scroll-behavior: smooth`, partículas infinitas y el pulso del WhatsApp).
  - `filter: blur(100px)` en glows de 500–600 px y 15 partículas animadas en bucle: costoso en GPU móvil.
  - Se anima `left`, `width` y `gap` (shimmer del botón, subrayado del navbar, link del portafolio) → no cumple "solo transform/opacity".
  - Estilos inline dispersos en el HTML.

### 0.3 JS — qué hay y qué sirve
| Función | Veredicto |
|---|---|
| `initRevealAnimations` | Se reemplaza. **Bug de rendimiento**: el `h1` del hero arranca en `opacity: 0` hasta que corre JS → retrasa el LCP y, si JS falla, el contenido queda invisible. |
| `initParticles` | Se elimina (sustituido por fondo aurora/grid en CSS). |
| `initCounterAnimation` | Se elimina. Los contadores parten de "0" en el HTML (un crawler o un JS lento ve "0 proyectos") y las cifras no son verificables (regla 2). |
| `initMobileMenu` | Lógica reutilizable; le falta cerrar con Escape, devolver foco y bloquear scroll. |
| `initNavbarScroll` | Reutilizable (patrón rAF correcto). |
| `initSmoothScroll` | Se reemplaza. **Bug**: el enlace "Aviso de Privacidad" tiene `href="#"` y `document.querySelector('#')` lanza `SyntaxError` en consola (penaliza Best Practices). |
| `initContactForm` | Se reemplaza. Envía a Google Forms con `mode: 'no-cors'`: **nunca detecta errores**, siempre muestra "¡Mensaje enviado!". Sin honeypot ni antispam. Los `entry.*` se documentan por si se mantiene Google Forms. |
| `initWhatsAppButton` | Se reemplaza. El FAB está en `opacity: 0` pero sigue siendo **enfocable y clicable** antes de 400 px de scroll. |
| `initCookieBanner` | Se reemplaza. Solo "Aceptar" (no hay "Rechazar") y GA ya se cargó antes de pedir consentimiento. |
| `initPrivacyModal` | Se reemplaza por página propia. Sin focus trap, `aria-modal` en el overlay, no se oculta del árbol de accesibilidad al cerrar. |

### 0.4 Assets
| Archivo | Uso | Decisión propuesta |
|---|---|---|
| `bazancologo.png` (165 KB, 560×560) | `og:image` y favicon | Regenerar set de favicons (SVG + 32 px + apple-touch 180 px) y una OG image 1200×630 dedicada. |
| `bazancologo.webp` (8 KB) | favicon | Ídem. |
| `Consumbiles.webp` (82 KB, 1408×768) | Portafolio Soldaduras | **Es una ilustración generada por IA** (texto deformado: "PIETONISN", "WIRENIALOESG"), no una captura del proyecto. Mostrarla como trabajo real resta confianza → reemplazar por captura real del sitio. Nombre con typo. |
| `RIES_Logo_BW.webp` (31 KB, 960×504) | Portafolio RIES | Es el logo del cliente, no el sitio → usar captura real del sitio; el logo puede ir como detalle. |
| `Consumibles.jpg` (75 KB) | **Sin uso** | Eliminar (duplicado del webp). |
| `portfolio-corporate/ecommerce/restaurant.jpg` (2.0 MB) | **Sin uso** | Eliminar. |

Además: los `<img>` del portafolio declaran `width="800" height="500"` (16:10) pero las imágenes son 1408×768 (~16:9) → recorte y riesgo de CLS.

### 0.5 Analítica, SEO y Netlify
- **GA4** `G-CN941SX6Q7` cargado síncrono en el `<head>` sin consentimiento previo. No hay eventos de conversión (clic a WhatsApp, envío de formulario) → hoy no se puede medir el objetivo único de la página. **Se conserva el mismo ID** para no perder el histórico.
- **Search Console**: meta `google-site-verification` presente → se conserva igual.
- SEO on-page: `title` y `description` buenos. Faltan: `canonical`, `hreflang`, `twitter:card`, datos estructurados (JSON-LD), `theme-color`, `apple-touch-icon`. `og:image` es **ruta relativa** (las redes sociales no la resuelven).
- **Netlify** (cabeceras reales del sitio): HSTS sí; `Cache-Control: max-age=0, must-revalidate` también en CSS e imágenes (sin caché inmutable); **sin cabeceras de seguridad** (CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- Sitemap con 1 URL y sin alternos de idioma.

### 0.6 Contenido que viola las reglas de `CLAUDE.md`
| Ubicación actual | Problema | Regla |
|---|---|---|
| Hero stats: "100+ Proyectos Web Entregados", "99 % Performance Score" | Cifras no verificadas; en HTML arrancan en "0". | 2 |
| Hero stat "C1 — Certificación en Inglés", párrafo de Nosotros, card "Alcance Internacional" | Afirma Certificación C1 (3 lugares). | 1 |
| Servicios: "A/B testing integrado", "Máxima tasa de conversión" | Claims no demostrables. | 5 |
| Portafolio Soldaduras: alt "Dashboard e-commerce premium con gráficas…" | Alt text falso. Descripción truncada ("…soldaduras,"). | 3, 4 |
| Portafolio RIES: alt "Logo de microempresa de suministros para soldaduras." y descripción casi idéntica a la de Soldaduras | Alt impreciso, descripción sin identidad propia. | 3, 4 |
| Portafolio: GECH | No existe. | 3 |
| Aviso de privacidad: "No recopilamos información personal a través de formularios" | **Falso**: hay un formulario que envía nombre y email a Google Forms. | 6 |
| Banner: "Al continuar, aceptas su uso" | Consentimiento implícito; GA ya cargó. | 6, 7 |
| Voz "Somos una firma… somos ingenieros… no somos una agencia más" | Plural/agencia cuando eres fundador único. Riesgo de confianza si el cliente lo descubre en la primera llamada. | 5 (decisión abierta) |
| "Te contactaremos en menos de 24 horas" | Compromiso de servicio: confirmar que lo sostienes. | 5 (pendiente usuario) |

### 0.7 Resumen: qué se reutiliza
1. **Copy y arquitectura de información** (hero → nosotros → servicios → portafolio → diferenciadores → CTA → contacto), con las correcciones de 0.6.
2. **Tokens** de espaciado, radios, sombras y easing como punto de partida del sistema de diseño.
3. **Íconos** Heroicons (MIT) → como componentes SVG tipados o vía `lucide`/`@heroicons` con tree-shaking.
4. **Integraciones**: ID de GA4, meta de GSC, número de WhatsApp y mensaje pre-llenado, IDs de Google Forms (si se mantiene ese backend).
5. **Assets**: logo (para regenerar favicons/OG). El resto se reemplaza por capturas reales.
6. **Patrones de JS**: rAF para el scroll del navbar; IntersectionObserver para reveals.

---

## 1. Decisión clave: SSG / prerender

### Opciones
- **A. Vite + React + prerender estático** (p. ej. `vite-react-ssg` o script propio con `react-dom/server`): SPA que se prerenderiza a HTML y luego **hidrata la página completa**.
- **B. Astro (usa Vite por dentro) + islas de React**: HTML estático por defecto, solo se hidratan los componentes interactivos (`client:idle` / `client:visible`).

### Comparación contra el presupuesto de rendimiento
Tamaños aproximados en gzip (se verifican en la fase 1):

| Pieza | KB gz aprox. | Opción A | Opción B |
|---|---|---|---|
| react + react-dom 18 | ~45 | Bloquea hidratación de toda la página | Solo carga cuando una isla se hidrata (diferido) |
| Framer Motion (`LazyMotion` + `domAnimation`) | ~20 | En el bundle principal | Solo en las islas que lo usen; los reveals de secciones estáticas con CSS + IO (~1 KB) |
| i18next + react-i18next | ~20 | Necesario (+ recursos del idioma) | **Innecesario**: cada idioma es una página estática con diccionario tipado |
| Lenis | ~4 | Igual | Igual (script suelto) |
| **JS que corre antes de que la página sea interactiva** | | **~90–110 KB** + hidratación de todo el árbol | **~0 KB** bloqueante; ~50–70 KB diferidos |

- **LCP (< 2 s)**: empate. Ambas sirven el `h1` en HTML. Depende de fuentes y de no animar el `h1` desde `opacity: 0`.
- **TBT / INP (< 200 ms)**: aquí está la diferencia. En Lighthouse móvil (CPU ×4) hidratar ~100 KB de JS y todo el árbol de React cuesta del orden de 150–400 ms de hilo principal. El TBT pesa 30 % del score de Performance: con la opción A, llegar a ≥ 95 es posible pero con margen mínimo, y cada animación nueva lo reduce. Con B, el hilo principal queda casi libre en la carga.
- **SEO = 100 + i18n**: Astro genera `/` y `/en/` como páginas estáticas reales con `hreflang`, `lang` y sitemap con alternos de forma nativa. En A hay que montar prerender por idioma a mano.
- **Imágenes (CLS < 0.05)**: `astro:assets` genera AVIF/WebP responsivas con `width`/`height` automáticos. En A se necesita un plugin aparte y disciplina manual.
- **Netlify**: idéntico (salida estática en `dist/`).

### Recomendación: **B — Astro + islas de React**
Es la opción que cumple el presupuesto con margen y no a base de pelear contra él: el contenido (90 % de la landing) es estático y no debe pagar el costo de React. React, TypeScript, Tailwind, Framer Motion y Lenis se mantienen; Vite sigue siendo el motor de build.

**Lo que implica (requiere tu aprobación):**
1. Actualizar la línea **Stack** de `CLAUDE.md`: "Astro (Vite) + islas de React 18 + TypeScript…".
2. **Eliminar `react-i18next`** del stack: diccionarios TypeScript tipados por idioma, pasados como props a las islas. Menos JS y errores de traducción detectados en compilación.
3. Framer Motion solo dentro de islas interactivas; las secciones estáticas usan CSS + un observer mínimo (o la API vanilla `inView`/`animate` de Motion, ~3 KB).
4. Curva de aprendizaje: archivos `.astro` para layout y secciones; `.tsx` para islas.

**Si prefieres A** (React puro de punta a punta): es viable con `LazyMotion`, recursos de i18n separados por ruta, `React.lazy` agresivo y sin GSAP ni R3F. Asumimos el riesgo de quedar en 90–95 en Performance móvil y lo medimos desde la fase 1.

### Otras recomendaciones de stack
- **Three.js / R3F en el hero: no recomendado.** three + R3F ≈ 190 KB gz, más el costo de GPU en móviles de gama media. El efecto "premium" se logra con aurora en CSS (gradientes en capas animados solo con `transform`) + grano SVG + grid. Si en la fase 3 quieres probarlo, se hace como experimento medido, cargado tras `requestIdleCallback`, solo en desktop y con fallback estático.
- **GSAP/ScrollTrigger: no previsto.** Solo si en la fase 3 aparece una secuencia con pin/scrub que Motion no resuelva.
- **Lenis: solo desktop y nunca con `prefers-reduced-motion`.** En móvil (la mayoría de tus visitas) no aporta y puede degradar INP y el scroll nativo.
- **Tailwind v4**: configuración CSS-first con `@theme`, los tokens son variables CSS nativas (encaja con "tokens en variables CSS").

---

## 2. Presupuestos técnicos por recurso (propuesta)

| Recurso | Presupuesto |
|---|---|
| HTML de la home (gz) | ≤ 30 KB |
| CSS total (gz) | ≤ 20 KB, crítico inline |
| JS bloqueante en la carga | 0 KB (opción B) / ≤ 70 KB (opción A) |
| JS total de la página (gz) | ≤ 120 KB |
| Fuentes | ≤ 2 archivos precargados, ≤ 100 KB en total (woff2, subset latin) |
| Imágenes above the fold | 0 (el LCP es texto) |
| Terceros en la carga inicial | 0 (GA solo tras consentimiento) |

Se reportan al cierre de cada fase en `PROGRESS.md` (tabla de métricas).

---

## 3. Estrategia de ramas y deploy (aplica a todas las fases)
- **Riesgo crítico**: en cuanto exista `netlify.toml` con `build`/`publish`, un merge a `main` reemplaza el sitio en producción. **Nada se mergea a `main` hasta terminar la fase 6.**
- Trabajo en una rama de integración (`rebuild`) con una rama por fase; Netlify **Deploy Previews / Branch deploys** para revisar cada fase en una URL real y correr Lighthouse ahí.
- El sitio actual sigue en vivo sin cambios durante todo el proceso.

---

## Fase 1 — Base
**Objetivo:** proyecto que compila, con tokens, estructura, linting y medición de tamaño desde el día uno. Sin secciones reales.

**Pasos**
1. Confirmar decisiones bloqueantes: SSG (A/B), paleta, tipografía.
2. Scaffold: Astro + `@astrojs/react` + TypeScript `strict` (opción B) — o Vite + React 18 + TS + prerender (opción A). Fijar versión de Node (`.nvmrc` + `NODE_VERSION` en `netlify.toml`).
3. Tailwind v4 con tokens en `src/styles/tokens.css`: colores (paleta elegida, con contraste AA verificado), tipografía (escala fluida con `clamp`), espaciado, radios, sombras, glow, z-index, duraciones y easings, breakpoints mobile-first.
4. Fuentes self-hosted (woff2, subset latin, `font-display: swap`), precarga solo de la fuente del `h1`, fallback con `size-adjust` para evitar CLS por el cambio de fuente.
5. Estructura de carpetas (opción B):
   ```
   src/
     components/
       ui/          # Button, Card, Badge, Container, SectionHeader… (.astro)
       sections/    # Hero, About, Services, Portfolio… (.astro)
       islands/     # componentes React interactivos (.tsx)
     layouts/       # BaseLayout.astro (head, SEO, fuentes)
     pages/         # index.astro (ES), en/index.astro, privacidad.astro, 404.astro
     i18n/          # es.ts, en.ts, tipos
     data/          # projects.ts, services.ts (tipados)
     lib/           # utilidades (whatsapp, analytics, consent)
     styles/        # tokens.css, global.css
     assets/        # imágenes procesadas por astro:assets
   public/          # fonts/, favicons, robots.txt
   scripts/         # report-size.mjs
   ```
6. Calidad: ESLint (flat config) con `typescript-eslint` strict (`no-explicit-any` = error), `eslint-plugin-astro`, `jsx-a11y`, `react-hooks`; Prettier con plugins de Astro y Tailwind; `astro check` / `tsc --noEmit` en el build.
7. `netlify.toml` mínimo (comando de build, carpeta de publicación, versión de Node).
8. Script `report-size` (gzip y brotli de JS/CSS/HTML del build) para el reporte de fin de fase.
9. Limpieza: README en UTF-8, quitar `.vscode/extensions.json` ajeno, mover el sitio legacy fuera de la raíz.
10. Página de prueba que muestre los tokens (botones, tipografía, colores) para validar la dirección visual; se elimina en la fase 2.

**Entregable:** build verde en Deploy Preview, lint/typecheck sin errores, reporte de tamaño base.

**Riesgos**
- Versiones mayores recientes (Tailwind v4, Astro) con integraciones que cambian → fijar versiones exactas.
- El sitio actual se publica desde la raíz: si Netlify toma la rama equivocada, se rompe producción (ver §3).
- Licencias de fuentes: usar solo OFL o con licencia que permita self-hosting.

**Decisiones abiertas**
- D1.1 SSG: A o B (recomendado B).
- D1.2 Paleta (ver Anexo A) y tipografía (Anexo B).
- D1.3 ¿Sitio legacy a `legacy/` hasta la fase 2 o se borra del árbol (queda en git)? Recomendado: `legacy/` y se borra al cerrar la fase 2.
- D1.4 ¿Husky + lint-staged en pre-commit? Recomendado: sí (ligero).
- D1.5 Gestor de paquetes: npm o pnpm. Recomendado: pnpm.

---

## Fase 2 — Layout y secciones estáticas (con correcciones de contenido)
**Objetivo:** la landing completa en ES, estática, accesible y con contenido honesto. Sin animaciones.

**Pasos**
1. Componentes UI: `Container`, `Section`, `SectionHeader` (eyebrow + título + lead), `Button` (primary/secondary/ghost, como `<a>` o `<button>`), `Card`, `Badge`, `Icon`.
2. Secciones:
   - **Navbar**: logo, anclas, CTA, menú móvil (isla mínima: Escape, foco, `aria-expanded`, bloqueo de scroll). Skip link "Saltar al contenido".
   - **Hero**: `h1` visible desde el primer paint (es el LCP), subtítulo, 2 CTAs (WhatsApp principal + consulta), **indicadores verificables** en lugar de contadores: "100% bilingüe ES/EN", "Inglés avanzado", "< 2 s de carga" (solo cuando lo midamos en este sitio), cifras reales que tú des.
   - **Nosotros**: sin "Certificación C1" → "Inglés avanzado". Voz según D2.1.
   - **Servicios** (3): sin "A/B testing integrado" ni "Máxima tasa de conversión"; beneficios verificables.
   - **Portafolio** (3 casos: Soldaduras y Equipos, RIES Chihuahua, GECH): problema · solución · stack · resultado; métricas y testimonio como `[PENDIENTE USUARIO]`; capturas reales con alt descriptivo; enlace externo con `rel="noopener"`.
   - **Diferenciadores**.
   - **CTA final**.
   - **Contacto**: datos + markup del formulario (labels, `autocomplete`, errores accesibles). El envío se conecta en la fase 5.
   - **Footer**: enlaces, aviso de privacidad (página), año dinámico en build.
   - **FAB de WhatsApp** (enlace `wa.me` con mensaje pre-llenado; visible y accesible desde el inicio o con aparición que no lo deje enfocable mientras está oculto).
   - **Página `/privacidad`** con estructura y `[PENDIENTE USUARIO]` en datos legales; **página 404**.
3. Imágenes: capturas reales de los 3 sitios en AVIF/WebP, responsivas, con `width`/`height` y `loading="lazy"`.
4. Textos en un diccionario tipado `src/i18n/es.ts` (solo ES). Esto prepara la fase 4 sin traducir nada todavía.
5. Revisión de accesibilidad: jerarquía de headings, landmarks, foco visible, objetivos táctiles ≥ 44 px, contraste.

**Entregable:** Deploy Preview navegable en móvil; checklist de reglas de contenido 1–7 marcado; Lighthouse preliminar.

**Riesgos**
- Falta de contenido real (GECH, métricas, capturas) → secciones con placeholders visibles. Mitigación: placeholders con estilo de "pendiente" que no se puedan publicar por error (el build falla si encuentra `[PENDIENTE USUARIO]` en modo producción final).
- Sin animaciones el sitio se verá "plano" en esta fase: es intencional.

**Decisiones abiertas**
- D2.1 **Voz**: primera persona honesta ("Soy [tu nombre], ingeniero…" / "Trabajas directo conmigo") vs. marca en tercera persona ("Bazan & Co. diseña…") sin plural de agencia. Recomendado: marca + "trabajas directo con el ingeniero" como diferenciador. Evitar el "somos una firma/agencia".
- D2.2 CTA principal: ¿WhatsApp o "Agenda una consulta"? ¿Hay herramienta de agenda (Cal.com / Calendly / Google Calendar)? Si no la hay, "Agendar" debe llevar a WhatsApp o al formulario y decirlo claramente.
- D2.3 ¿Agregar secciones de conversión nuevas — "Cómo trabajo" (proceso en 4 pasos) y FAQ (precios orientativos, tiempos, qué incluye)? Recomendado: sí; reducen la fricción del público no técnico. Necesitan tu contenido.
- D2.4 ¿El formulario se queda o se simplifica? (Menos campos = más conversiones.)

---

## Fase 3 — Animaciones y micro-interacciones
**Objetivo:** el acabado premium sin romper el presupuesto.

**Pasos**
1. Fondo del hero: aurora (capas de gradiente animadas con `transform`) + grano (SVG `feTurbulence` estático, como imagen) + grid con máscara radial. Pausa con IntersectionObserver fuera de pantalla.
2. Reveals de secciones: CSS + observer mínimo (`transform`/`opacity`), stagger corto. **El `h1` del hero no parte de `opacity: 0`** (protege el LCP).
3. Spotlight al cursor en cards: un elemento con gradiente radial que se mueve con `transform` (no con `background-position`), actualizado en `requestAnimationFrame`, solo con `(hover: hover) and (pointer: fine)`.
4. Bordes con glow animado (`opacity`/`transform` de un pseudo-elemento), hover de botones (shimmer con `transform` en lugar de `left`).
5. Islas con Framer Motion donde aporte: menú móvil, transición de éxito del formulario, tabs/acordeón de FAQ si existe.
6. Lenis solo en desktop y sin `prefers-reduced-motion`; anclas compatibles con el offset del navbar.
7. `prefers-reduced-motion: reduce` → sin aurora animada, sin reveals (contenido visible), sin pulso del FAB, scroll nativo.

**Entregable:** Deploy Preview + video corto de las interacciones + comparación de métricas contra la fase 2.

**Riesgos**
- `backdrop-filter` y `filter: blur` grandes en móviles de gama media → limitar el glassmorphism al navbar y a cards puntuales; los glows con gradientes radiales sin `blur`.
- INP por handlers de `pointermove` → rAF + pasivos + solo en dispositivos con puntero fino.
- Animaciones que desplazan layout → CLS. Solo `transform`/`opacity`.

**Decisiones abiertas**
- D3.1 ¿Experimento con R3F en el hero? Recomendado: no (ver §1).
- D3.2 Intensidad del motion: sobria (Linear/Stripe) vs. más expresiva (Apple). Recomendado: sobria.
- D3.3 ¿FAB de WhatsApp con pulso? Recomendado: un solo pulso a los pocos segundos, no en bucle infinito (distrae y gasta batería).

---

## Fase 4 — i18n ES/EN
**Objetivo:** versión en inglés indexable y de la misma calidad.

**Pasos**
1. Rutas: ES en `/` (conserva la URL actual y su posicionamiento), EN en `/en/`; privacidad en `/privacidad` y `/en/privacy`.
2. Diccionario `en.ts` con el mismo tipo que `es.ts` (falta una clave = error de compilación).
3. Selector de idioma como enlace real (no toggle con JS), con `hreflang` en el enlace y que conserve la sección cuando sea posible.
4. `<html lang>`, `og:locale` + `og:locale:alternate`, `hreflang` (`es`, `en`, `x-default` → `/`).
5. Mensaje pre-llenado de WhatsApp, labels y errores del formulario, banner de cookies y aviso de privacidad por idioma.
6. No redirigir automáticamente por idioma del navegador (perjudica SEO y molesta); como máximo, una sugerencia discreta.

**Entregable:** ambas versiones en Deploy Preview, validación de `hreflang`.

**Riesgos**
- Calidad del copy en inglés: tu pitch es "100% bilingüe", así que un error en EN cuesta más que en cualquier otro sitio. Yo redacto, tú revisas.
- Longitud de textos en EN/ES que rompe layouts (botones, navbar) → probar ambos idiomas en 360 px.

**Decisiones abiertas**
- D4.1 Variante: `es-MX` / `en-US` o genéricas `es` / `en`. Recomendado: `es-MX` en contenido + `hreflang="es"` genérico; `en` genérico.
- D4.2 ¿Aviso de privacidad en inglés es traducción de cortesía (prevalece el español)? Recomendado: sí, indicándolo.

---

## Fase 5 — SEO, analítica, formulario y WhatsApp
**Objetivo:** medir y capturar cada conversión, con privacidad coherente.

**Pasos**
1. **SEO**: `title`/`description` por idioma, `canonical`, OG/Twitter con imagen 1200×630 absoluta, JSON-LD (`ProfessionalService` con `areaServed`, `founder`, `sameAs`), sitemap con alternos, `robots.txt`, favicons + `manifest`, `theme-color`. Conservar la meta de Search Console.
2. **Consentimiento**: banner discreto y accesible (no modal, no tapa el FAB ni los CTAs), botones **Aceptar** y **Rechazar** con el mismo peso, enlace al aviso, preferencia guardada y modificable desde el footer.
3. **GA4** (`G-CN941SX6Q7`) con Consent Mode v2; el script **se carga solo tras aceptar** y en idle. Eventos: `whatsapp_click` (con ubicación: hero/fab/cta/contacto), `generate_lead` (formulario enviado), `cta_click`, `outbound_click` (portafolio). Marcar `whatsapp_click` y `generate_lead` como eventos clave en GA4.
4. **Formulario**: validación nativa + mensajes accesibles, honeypot, estados reales de éxito y error, consentimiento al aviso de privacidad, evento de conversión. Backend según D5.1.
5. **WhatsApp**: helper tipado que construye `wa.me` con mensaje pre-llenado por idioma y contexto (p. ej. incluye el servicio elegido). Verificar el formato del número (hoy `521…`).
6. **Aviso de privacidad** coherente: responsable, datos que recaba el formulario, finalidades, Google Analytics (cookies, opt-out), WhatsApp/Meta, encargados (Netlify, Google), derechos ARCO y medio para ejercerlos, cambios al aviso.
7. **`netlify.toml`**: cabeceras de seguridad (CSP compatible con GA y el backend del formulario, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors`), `Cache-Control: immutable` para assets con hash, redirecciones (p. ej. `/index.html` → `/`).

**Entregable:** conversiones visibles en GA4 DebugView, formulario probado de punta a punta, aviso de privacidad listo para tu revisión.

**Riesgos**
- El aviso de privacidad es un documento legal: yo preparo una base coherente con lo que hace el sitio, pero **no es asesoría legal**; recomiendo que lo revise un abogado o al menos validarlo contra la LFPDPPP vigente.
- CSP demasiado estricta rompe GA o el formulario → probar en Deploy Preview con la consola abierta.
- Con consentimiento previo, GA registrará menos visitas que hoy (las que rechacen). Es lo correcto y además mejora el Lighthouse.
- Netlify Forms solo detecta formularios presentes en el HTML del build (en la opción B se cumple de forma natural).

**Decisiones abiertas**
- D5.1 Backend del formulario: **Netlify Forms** (recomendado: nativo, antispam, notificación por email, plan gratuito con límite mensual) vs. mantener Google Forms (sin detección de errores) vs. servicio externo (Formspree, etc.).
- D5.2 ¿Dominio propio (p. ej. `bazanco.com`, que ya aparece en el email)? Afecta canonical, sitemap, OG y Search Console. Recomendado: migrar al dominio propio en la fase 6.
- D5.3 ¿GA4 es suficiente o prefieres una alternativa sin cookies (Plausible, Netlify Analytics)? Sin cookies se puede quitar el banner, pero tiene costo mensual.

---

## Fase 6 — Optimización final y auditoría de calidad
**Objetivo:** demostrar con números que el sitio cumple el presupuesto y publicarlo.

**Pasos**
1. Lighthouse móvil (mediana de 5 corridas) en Deploy Preview: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100. Idealmente Lighthouse CI en cada deploy preview.
2. Core Web Vitals: LCP < 2 s (4G simulado), CLS < 0.05, INP < 200 ms (prueba manual en Android de gama media + DevTools).
3. Análisis de bundle: eliminar dependencias sobrantes, verificar code splitting, subset real de fuentes, formatos y tamaños de imagen.
4. Accesibilidad: axe sin violaciones, navegación completa con teclado, lector de pantalla (NVDA en Windows, VoiceOver en iOS), zoom 200 %, `prefers-reduced-motion`.
5. Cross-browser: Safari iOS (backdrop-filter, `100dvh`), Chrome Android, Firefox, Edge.
6. Auditoría de contenido contra las reglas 1–7; **el build de producción falla si queda algún `[PENDIENTE USUARIO]`**.
7. Enlaces rotos, 404, redirecciones, cabeceras (securityheaders.com).
8. Publicación: merge a `main`, dominio propio si aplica, reenviar sitemap en Search Console, verificar GA4 en tiempo real.
9. Post-lanzamiento: revisar los datos de campo (CrUX/PageSpeed) a las 4 semanas.

**Entregable:** informe final (scores, CWV, tamaños, checklist de accesibilidad y contenido) en `PROGRESS.md` + sitio en producción.

**Riesgos**
- Lighthouse varía entre corridas ±3–5 puntos → usar mediana y fijar condiciones.
- Contenido pendiente bloquea el lanzamiento → definir con tiempo qué va sin métricas/testimonios.

**Decisiones abiertas**
- D6.1 ¿Lanzamiento con dominio propio o se mantiene `bazanconsultoria.netlify.app`?
- D6.2 ¿Lanzar con placeholders ocultos (casos sin métricas) o esperar contenido real?

---

## Anexo A — Propuestas de paleta (no aplicadas)
Ratios de contraste WCAG calculados sobre el fondo base / superficie elevada.

### A1 · "Tinta y Oro" (evolución de la marca actual)
Continuidad con el logo (oro + "B" azul tinta). Se vuelve más tecnológico con fondos azul-tinta en lugar de negro neutro y un azul acero de apoyo para auroras.

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| `bg` | `#07090F` | Fondo base | — |
| `surface` | `#0E121B` | Secciones/cards | — |
| `elevated` | `#151A26` | Cards elevadas, inputs | — |
| `text` | `#F3F1EA` | Títulos | 17.6 / 15.4 |
| `text-secondary` | `#A9AEBB` | Párrafos | 9.0 / 7.8 |
| `text-muted` | `#878D9C` | Labels, metadatos | 6.0 / 5.2 |
| `accent` | `#D9B45A` | CTA, enlaces, glow | 10.1 / 8.8 |
| `accent-hi` | `#EDD08A` | Hover, gradientes | 13.3 / 11.6 |
| `support` | `#5B7BB5` | Solo decorativo (aurora, grid) | 4.7 / 4.1 |

Texto sobre botón de acento: `#07090F` → 10.1:1.
**A favor:** no hay que rehacer el logo; el oro transmite "premium". **En contra:** el oro sobre oscuro puede leerse más "despacho/lujo" que "tecnología" si no se equilibra con el azul acero.

### A2 · "Grafito y Chispa"
Neutros grafito (estilo Vercel/Linear) con un acento naranja brasa, como chispa de soldadura: conecta con tu público industrial y maquilador y no se confunde con el verde de WhatsApp.

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| `bg` | `#0A0A0B` | Fondo base | — |
| `surface` | `#111113` | Secciones/cards | — |
| `elevated` | `#18181B` | Cards elevadas, inputs | — |
| `text` | `#F5F5F4` | Títulos | 18.1 / 16.2 |
| `text-secondary` | `#A8A8AE` | Párrafos | 8.4 / 7.5 |
| `text-muted` | `#8A8A92` | Labels, metadatos | 5.8 / 5.2 |
| `accent` | `#FF6A3D` | CTA, enlaces, glow | 7.0 / 6.2 |
| `accent-hi` | `#FF9A70` | Hover, gradientes | 9.5 / 8.5 |
| `support` | `#FFC56B` | Gradiente cálido de aurora | 12.7 / 11.4 |

Texto sobre botón de acento: `#0A0A0B` → 7.0:1.
**A favor:** más distintivo y "tech"; la energía del naranja empuja a los CTAs. **En contra:** obliga a recolorear el logo (de oro a naranja o a monocromo).

> Ambas: el verde de WhatsApp (`#25D366`) queda reservado al FAB y a los CTAs de WhatsApp para que se reconozcan al instante.

## Anexo B — Propuestas tipográficas (no aplicadas)
Todas con licencia **SIL OFL** (self-hosting permitido), variables y con subset latin (cubre á é í ó ú ñ ü ¿ ¡). Pesos estimados en woff2 con subset latin; se verifican en la fase 1.

### B1 · "Ingeniería con carácter" — Bricolage Grotesque + Inter
- **Display:** Bricolage Grotesque (variable, pesos 600–800, eje óptico): grotesca con personalidad, se ve moderna y poco vista.
- **Texto:** Inter (variable 400–600): máxima legibilidad en pantallas pequeñas, cifras tabulares para indicadores.
- Carga estimada: ~35 KB + ~45 KB.
- Encaja mejor con la paleta **A2**.

### B2 · "Editorial premium" — Instrument Serif + Geist
- **Display:** Instrument Serif (400 + itálica) para titulares grandes, con palabras clave en itálica como acento. Estilo editorial que hoy usan sitios tech premium.
- **Texto:** Geist (variable 400–600) + Geist Mono para etiquetas técnicas ("< 2 s", "ES/EN", stack de proyectos).
- Carga estimada: ~25 KB (+25 KB itálica) + ~30 KB (+ mono opcional ~25 KB).
- Encaja mejor con la paleta **A1**.
- Ojo: Instrument Serif tiene un solo peso; funciona en titulares ≥ 32 px, no en títulos pequeños (h3 y menores irían en Geist).
