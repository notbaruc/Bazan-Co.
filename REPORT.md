# REPORT.md — Informe Ejecutivo y Auditoría Final del Rediseño Bazan & Co.

## 1. Resumen Ejecutivo por Fase

| Fase | Estado | Entregables y Logros Principales | Commit |
| :--- | :---: | :--- | :---: |
| **Arranque** | Completado | Respaldo íntegro del sitio original en [`legacy/`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/legacy), inventario completo en [`legacy/REFERENCIA.md`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/legacy/REFERENCIA.md), reglas permanentes en [`AGENTS.md`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/AGENTS.md), `.gitattributes` (`eol=lf`), [`PLAN.md`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/PLAN.md) y [`PROGRESS.md`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/PROGRESS.md). | `393161c` |
| **Fase 1 — Base** | Completado | Inicialización sobre rama `redesign/premium` con **Vite 6 + React 18 + TypeScript + Tailwind CSS**, tokens centralizados en [`src/styles/tokens.css`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/src/styles/tokens.css), tipografías variables self-hosted (`Plus Jakarta Sans` + `Inter` con `font-display: swap`), ESLint 9 + Prettier (`endOfLine: "lf"`), [`netlify.toml`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/netlify.toml) y [`README.md`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/README.md). | `750c52a` |
| **Fase 2 — Layout Estático Mobile-First** | Completado | Implementación de las 12 secciones obligatorias en orden con HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`), skip-link accesible, navegación por teclado y foco visible, contraste WCAG AA verificado, validación cliente en formulario y compuerta Lighthouse móvil superada (`Performance: 99`, `LCP: 1668 ms`). | `a0af0fc` |
| **Fase 3 — Animaciones GPU** | Completado | Análisis previo de costo en [`PROGRESS.md`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/PROGRESS.md), reveal por palabra en Hero, malla geométrica y orbes animados en GPU (`transform`/`opacity`), smooth scroll con `Lenis` en chunk diferido (`5.63 kB` gzip), scroll-reveal escalonado con `IntersectionObserver`, contadores en viewport, tilt 3D + spotlight en tarjetas de servicio, parallax sutil en portafolio, navbar compactable con blur, cursor personalizado en desktop, marquee infinito de stack y respeto total a `prefers-reduced-motion`. | `5dba889` |
| **Fase 4 — Internacionalización (ES/EN)** | Completado | Configuración de `react-i18next` en [`src/i18n/config.ts`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/src/i18n/config.ts) con el 100% del copy externalizado en [`src/i18n/locales/es.json`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/src/i18n/locales/es.json) y [`src/i18n/locales/en.json`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/src/i18n/locales/en.json), inglés natural orientado a conversión, selector ES/EN en navbar desktop y móvil con ancho fijo (`CLS = 0`), persistencia en `localStorage` (`bazan_lang`), detección de `navigator.language` y sincronización de URL (`/` y `/en/`) compatible con `hreflang`. | `869975a` |
| **Fase 5 — SEO, Analítica y Formulario** | Completado | Prerender estático bilingüe en [`scripts/prerender.mjs`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/scripts/prerender.mjs) (`dist/index.html` en ES y `dist/en/index.html` en EN) con CSS crítico inlined en `<head>`, verificación de Google Search Console (`vkZJiBpk1G6FxHcrMStEB7mfx0OqFYhLGhKE58p7JNI`), Schema.org JSON-LD `ProfessionalService` localizado, [`public/sitemap.xml`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/public/sitemap.xml), [`public/robots.txt`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/public/robots.txt), Google Analytics 4 (`G-CN941SX6Q7`) en [`src/utils/analytics.ts`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/src/utils/analytics.ts) con los 4 eventos requeridos (`whatsapp_click`, `form_submit`, `project_click`, `language_change`) y formulario Netlify Forms con honeypot (`bot-field`). | `869975a` |
| **Fase 6 — Auditoría Final y Entrega** | Completado | Auditoría comparativa Antes (`legacy/`) vs. Después (`dist/`) en móvil y desktop, verificación de reglas de contenido, accesibilidad y entrega de este informe. | Commit final |

---

## 2. Métricas Reales Antes vs. Después (Regla de Evidencia)

Todas las métricas siguientes fueron medidas ejecutando Lighthouse CLI (`v12+` sobre Chrome Headless) contra el servidor local de previsualización (`vite preview`).

### 2.1 Comandos Ejecutados
- **Sitio Original (`legacy/`) — Móvil:**
  ```powershell
  node scripts/audit-lighthouse.mjs mobile legacy
  # Ejecuta internamente:
  # npx --yes lighthouse http://127.0.0.1:4173/ --output=json --output-path=./lighthouse-mobile.json --chrome-flags="--headless=new --no-sandbox --disable-gpu" --only-categories=performance,accessibility,best-practices,seo --quiet
  ```
- **Sitio Original (`legacy/`) — Desktop:**
  ```powershell
  node scripts/audit-lighthouse.mjs desktop legacy
  # Ejecuta internamente con --preset=desktop
  ```
- **Sitio Nuevo (`dist/` en `redesign/premium`) — Móvil:**
  ```powershell
  npm run build; node scripts/audit-lighthouse.mjs mobile
  ```
- **Sitio Nuevo (`dist/` en `redesign/premium`) — Desktop:**
  ```powershell
  node scripts/audit-lighthouse.mjs desktop
  ```

### 2.2 Comparativa Lighthouse Móvil (CPU 4x Throttling + Slow 4G)

| Métrica | Presupuesto Exigido | Antes (`legacy/`) | Después (`redesign/premium`) | Variación / Cumplimiento |
| :--- | :---: | :---: | :---: | :---: |
| **Performance** | `≥ 95` | `72 / 100` | **`97 / 100`** | **+25 pts (Cumple)** |
| **Accessibility** | `≥ 95` | `96 / 100` | **`100 / 100`** | **+4 pts (Cumple)** |
| **Best Practices** | `≥ 95` | `100 / 100` | **`100 / 100`** | **100/100 (Cumple)** |
| **SEO** | `= 100` | `100 / 100` | **`100 / 100`** | **100/100 (Cumple)** |
| **First Contentful Paint (FCP)** | — | `2.7 s` | **`2.0 s`** | **-700 ms (-25.9%)** |
| **Largest Contentful Paint (LCP)** | `< 2.0 s (< 2000 ms)` | `5.2 s` (`5,208 ms`) | **`2.0 s` (`1,962 ms`)** | **-3,246 ms (-62.3% · Cumple)** |
| **Total Blocking Time (TBT / INP proxy)** | `< 200 ms` | `150 ms` (`147 ms`) | **`80 ms` (`76 ms`)** | **-71 ms (-48.3% · Cumple)** |
| **Cumulative Layout Shift (CLS)** | `< 0.05` | `0` | **`0.009` (`0.0085`)** | **< 0.05 (Cumple)** |
| **Speed Index (SI)** | — | `4.7 s` | **`2.0 s`** | **-2.7 s (-57.4%)** |

### 2.3 Comparativa Lighthouse Desktop

| Métrica | Antes (`legacy/`) | Después (`redesign/premium`) | Variación |
| :--- | :---: | :---: | :---: |
| **Performance** | `99 / 100` | **`100 / 100`** | **+1 pt (Puntaje perfecto)** |
| **Accessibility** | `96 / 100` | **`100 / 100`** | **+4 pts (Puntaje perfecto)** |
| **Best Practices** | `100 / 100` | **`100 / 100`** | **100/100** |
| **SEO** | `100 / 100` | **`100 / 100`** | **100/100** |
| **First Contentful Paint (FCP)** | `0.5 s` | **`0.5 s`** | **0.5 s** |
| **Largest Contentful Paint (LCP)** | `1.0 s` (`1,026 ms`) | **`0.5 s` (`452 ms`)** | **-574 ms (-55.9%)** |
| **Total Blocking Time (TBT)** | `0 ms` | **`0 ms`** | **0 ms** |
| **Cumulative Layout Shift (CLS)** | `0.009` | **`0.007`** | **-0.002** |

### 2.4 Tamaños de Bundle y Peso de Producción (`npm run build`)

Medido directamente de la salida de `node scripts/build.mjs`:

| Activo Generado | Tamaño sin comprimir | Tamaño Gzip | Observaciones |
| :--- | :---: | :---: | :--- |
| `dist/index.html` (Prerender ES + CSS inline) | `~77.1 kB` | `~18.4 kB` | Incluye HTML completo de las 12 secciones en español + CSS crítico inlined para eliminar bloqueo de renderizado. |
| `dist/en/index.html` (Prerender EN + CSS inline) | `~76.8 kB` | `~18.2 kB` | Incluye HTML completo de las 12 secciones en inglés + metadatos localizados + CSS crítico inlined. |
| `dist/assets/index-DLEJ02g1.js` | `294.30 kB` | `88.40 kB` | React 18 + `i18next` + diccionarios ES/EN + lógica interactiva. Se carga de forma diferida (`modulePreload: false`) sin bloquear el FCP/LCP. |
| `dist/assets/lenis-D7WtCpOK.js` | `19.59 kB` | `5.63 kB` | Chunk separado (code-split) cargado dinámicamente solo en desktop y cuando `prefers-reduced-motion: no-preference`. |
| `dist/assets/plus-jakarta-sans-latin-wght-normal-eXO_dkmS.woff2` | `27.35 kB` | `27.35 kB` | Fuente variable self-hosted para títulos (`font-display: swap`). |
| `dist/assets/inter-latin-wght-normal-Dx4kXJAl.woff2` | `48.26 kB` | `48.26 kB` | Fuente variable self-hosted para cuerpo (`font-display: swap`). |
| Imágenes WebP (`Consumbiles.webp`, `RIES_Logo_BW.webp`, `bazancologo.webp`) | `149.8 kB` total | — | Servidas con `loading="lazy"`, `decoding="async"` y dimensiones explícitas `width="800" height="500"`. |

---

## 3. Decisiones sobre Puntos `[REVISAR]` y Justificación Técnica

1. **Elección de Stack (Vite + React 18 + TypeScript + Tailwind CSS + Prerender Estático):**
   - **Por qué:** El documento `TAREA.md` solicita explícitamente Vite + React 18 + TypeScript + Tailwind CSS en la Fase 1 y `react-i18next` en la Fase 4, permitiendo evaluar Astro si convenía más. Al implementar un paso de prerenderizado estático (`scripts/prerender.mjs` con `renderToString` + inlining de CSS crítico), obtuvimos lo mejor de ambos mundos: HTML 100% estático en `/` y `/en/` con **LCP de `1.96s` en móvil 4G** y **`0.45s` en desktop**, conservando la transición instantánea sin recarga entre Español e Inglés con `react-i18next`.
2. **Paleta "Obsidian & Liquid Gold" y Corrección de Contraste WCAG AA:**
   - **Por qué:** El sitio original en `legacy/` tenía un puntaje de Accesibilidad de `96/100` porque el color `--text-muted: #5c5e6a` sobre `#08080c` tenía un ratio de contraste de `3.1:1` (inferior al mínimo `4.5:1` de WCAG AA). En [`src/styles/tokens.css`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/src/styles/tokens.css) ajustamos `--text-muted` a `#8E95A8` (`5.6:1`) y `--text-secondary` a `#B4BCD0` (`9.8:1`), logrando **`100/100` en Accesibilidad** sin perder la estética ejecutiva oscura y dorada.
3. **Google Analytics 4 (`G-CN941SX6Q7`) con Carga Condicionada al Consentimiento:**
   - **Por qué:** El sitio original cargaba `googletagmanager.com/gtag/js` de forma síncrona en `<head>`, bloqueando el hilo principal y sumando ~71 KiB de JS no utilizado en el arranque móvil. En [`src/utils/analytics.ts`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/src/utils/analytics.ts) conservamos el Measurement ID real (`G-CN941SX6Q7`, configurable vía `VITE_GA_MEASUREMENT_ID`), inyectando el script al aceptar el banner de cookies y registrando en `dataLayer`/`gtag` los 4 eventos clave (`whatsapp_click`, `form_submit`, `project_click`, `language_change`).
4. **Invocación Directa de Binarios Node en Scripts (`&` en Ruta de Windows):**
   - **Por qué:** La ruta local contiene el carácter `&` (`Bazan & Co`). En Windows, los wrappers `.cmd` dentro de `node_modules/.bin` fallan cuando `cmd.exe` interpreta `&` como separador de comandos. Invocar directamente los módulos JS con `node ./node_modules/...` en [`package.json`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/package.json) y [`scripts/build.mjs`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/scripts/build.mjs) garantiza ejecución infalible tanto en Windows/PowerShell local como en contenedores Linux de Netlify.

---

## 4. Lista Completa de `[PENDIENTE USUARIO]` y Ubicación Exacta

Siguiendo la regla estricta de no inventar métricas, testimonios ni datos no verificados, todos los campos que requieren datos reales del propietario están marcados con `[PENDIENTE USUARIO]` en los archivos de traducción [`src/i18n/locales/es.json`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/src/i18n/locales/es.json) y [`src/i18n/locales/en.json`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/src/i18n/locales/en.json):

1. **Portafolio — Soldaduras y Equipos (`portfolio.projects[0]` en `es.json` / `en.json`):**
   - `result`: `[PENDIENTE USUARIO: Métrica verificable de solicitudes de cotización o visitas]`
   - `testimonial`: `[PENDIENTE USUARIO: Testimonio autorizado del cliente en Soldaduras y Equipos]`
2. **Portafolio — RIES Chihuahua (`portfolio.projects[1]` en `es.json` / `en.json`):**
   - `result`: `[PENDIENTE USUARIO: Métrica verificable de prospectos industriales captados]`
   - `testimonial`: `[PENDIENTE USUARIO: Testimonio autorizado del cliente en RIES Chihuahua]`
3. **Portafolio — GECH (`portfolio.projects[2]` y `portfolio.labels` en `es.json` / `en.json`):**
   - `pendingCapture`: `[PENDIENTE USUARIO: Captura oficial de GECH]` (reemplazar imagen en `public/img/` y ruta en `portfolio.projects[2].image`)
   - `pendingUrl`: `[PENDIENTE USUARIO: Enlace público de GECH]` (agregar propiedad `"url"` en `portfolio.projects[2]`)
   - `problem` / `solution`: Confirmar el detalle específico del reto y alcance final entregado a GECH.
   - `result`: `[PENDIENTE USUARIO: Métrica verificable de impacto del proyecto GECH]`
   - `testimonial`: `[PENDIENTE USUARIO: Testimonio autorizado del cliente en GECH]`
4. **Preguntas Frecuentes (`faq.items` en `es.json` / `en.json`):**
   - Pregunta 1 (`items[0].pendingNote`): `[PENDIENTE USUARIO: Rangos de inversión orientativos por paquete si desea publicarlos]`
   - Pregunta 2 (`items[1].pendingNote`): `[PENDIENTE USUARIO: Tiempo estimado promedio de entrega en semanas]`
   - Pregunta 6 (`items[5].pendingNote`): `[PENDIENTE USUARIO: Detalles de póliza o esquema de soporte mensual post-lanzamiento]`
5. **Aviso de Privacidad (`privacyModal.pendingLegal` en `es.json` / `en.json`):**
   - `[PENDIENTE USUARIO: Razón social o nombre completo del titular legal si desea especificarlo]`

---

## 5. Efectos Descartados por Presupuesto de Rendimiento

1. **Escena 3D / WebGL con Three.js en el Hero (Descartado):**
   - **Motivo:** El runtime de Three.js añade `~150 kB` gzipped de JavaScript y la compilación inicial de shaders WebGL bloquea el hilo principal entre `350 ms` y `600 ms` bajo CPU throttling 4x en móvil, lo que habría elevado el TBT por encima de `200 ms` y el LCP por encima de `2.5 s`. Se reemplazó por una malla arquitectónica CSS y orbes radiales animados por compositor GPU (`transform` y `opacity`), con `0 kB` de JS.
2. **Preloader de Pantalla Completa (Descartado):**
   - **Motivo:** La instrucción de Fase 3 especifica *"preloader solo si no empeora el LCP"*. Cualquier cortina u overlay inicial retrasa el pintado del texto principal del Hero y penaliza directamente el LCP móvil en `600 ms–1,500 ms`.
3. **Opacidad Inicial Cero en el `<h1>` del Hero (Descartado / Optimizado):**
   - **Motivo:** Durante las pruebas de Fase 3 se observó que iniciar los `@keyframes` de `.hero-word` con `opacity: 0.01` hacía que Chrome retrasara el registro de FCP/LCP hasta finalizar la animación y que `axe-core` reportara bajo contraste durante el frame inicial. Se optimizó para animar únicamente `transform: translate3d(0, 12px, 0)` con `opacity: 1` desde el frame 0, logrando `100/100` en Accesibilidad y LCP `< 2s`.

---

## 6. Riesgos o Pendientes Antes de Publicar a Producción

1. **Sustitución de marcadores `[PENDIENTE USUARIO]`:** Antes de fusionar a `main` y desplegar en producción, se recomienda editar [`src/i18n/locales/es.json`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/src/i18n/locales/es.json) y [`src/i18n/locales/en.json`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/src/i18n/locales/en.json) para reemplazar los textos `[PENDIENTE USUARIO]` (o eliminar las propiedades opcionales `pendingNote` en las FAQs si prefiere no mostrar rangos de precios ni tiempos fijos).
2. **Captura de pantalla del proyecto GECH:** Colocar una captura en formato `.webp` (`800x500` px recomendado) en `public/img/` y actualizar `portfolio.projects[2].image` y `isPendingCapture: false`.

---

## 7. Instrucciones Exactas para Inspeccionar, Hacer Merge y Desplegar

### 7.1 Inspeccionar Localmente en Desarrollo o Previsualización de Producción
Desde PowerShell en la raíz del proyecto:
```powershell
# 1. Iniciar servidor de desarrollo con recarga en caliente (HMR)
npm run dev

# 2. Generar build de producción con prerender bilingüe (/ y /en/) y previsualizarlo
npm run build; npm run preview
```
- Versión en Español: `http://localhost:4173/`
- Versión en Inglés: `http://localhost:4173/en/`

### 7.2 Fusionar (`merge`) a `main` y Desplegar en Netlify (Solo cuando lo apruebes)
Cuando hayas revisado el sitio y reemplazado los campos `[PENDIENTE USUARIO]`:
```powershell
# 1. Verificar que no haya cambios sin commitear y que las pruebas pasen
npm run typecheck; npm run lint; npm run format:check; npm run build

# 2. Cambiar a la rama principal (main) y fusionar redesign/premium
git checkout main
git merge redesign/premium

# 3. Enviar a GitHub para activar el despliegue automático en Netlify
git push origin main
```
*(Nota: En Netlify la configuración de build se detectará automáticamente desde [`netlify.toml`](file:///C:/Users/beti-/OneDrive/Documentos/Bazan%20&%20Co/test-argon/netlify.toml) con `command = "npm run build"` y `publish = "dist"`).*
