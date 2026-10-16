# PROGRESS.md — Registro de Avance, Decisiones y Métricas

## Checklist de Fases
- [x] **Arranque:** Mover sitio original a `legacy/`, crear `legacy/REFERENCIA.md`, `AGENTS.md`, `.gitattributes`, `PLAN.md` y `PROGRESS.md`.
- [ ] **Fase 1 — Base:** Vite + React 18 + TypeScript + Tailwind CSS, design tokens, fuentes self-hosted, ESLint + Prettier (`eol: lf`), `netlify.toml`, `README.md`.
- [ ] **Fase 2 — Layout Estático Mobile-First:** Todas las secciones en orden, HTML semántico, foco visible, contraste AA, validación de formulario en cliente, compuerta Lighthouse móvil.
- [ ] **Fase 3 — Animaciones:** Registro de efectos y costos, implementación `transform`/`opacity`, prueba con CPU throttling 4x, compuerta Lighthouse móvil.
- [ ] **Fase 4 — i18n ES/EN:** `react-i18next`, selector en navbar, persistencia, copy 100% en JSON, rutas `/` y `/en/` compatibles con `hreflang`, cero CLS, compuerta Lighthouse móvil.
- [ ] **Fase 5 — SEO, Analítica y Formulario:** Prerender estático (`/` y `/en/`), Search Console tag, JSON-LD `ProfessionalService`, `sitemap.xml`, `robots.txt`, GA4 (`G-CN941SX6Q7`) + 4 eventos, Netlify Forms con honeypot y estados, compuerta Lighthouse móvil.
- [ ] **Fase 6 — Auditoría Final y Entrega:** Auditoría móvil y desktop, revisión de código y contenido, creación de `REPORT.md`.

---

## Decisiones Registradas y Puntos `[REVISAR]`
1. **Stack Base (`[DECIDIDO]`):** Se eligió **Vite + React 18 + TypeScript + Tailwind CSS + Prerender Estático (`renderToString` en postbuild)** sobre Astro con islas. Esto respeta literalmente el stack pedido en Fase 1 y Fase 4 (`react-i18next`), entregando HTML estático pre-renderizado para `/` y `/en/` con LCP < 2s y cambio de idioma instantáneo sin recarga ni CLS.
2. **Paleta y Contraste (`[DECIDIDO]`):** Se definió la paleta **"Obsidian & Liquid Gold"** (`#07080C` base, `#0F1117` surface, `#D4AF37` oro metálico, `#8A90A2` texto muted mejorado a >5.3:1 para cumplir WCAG AA donde el sitio original `#5c5e6a` fallaba).
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
