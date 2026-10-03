# PROGRESS — Bazan & Co. landing premium

> Se lee al iniciar cada sesión junto con `PLAN.md`. Se actualiza al cerrar cada fase.
> Rama de trabajo: `redesign/premium` (nunca merge a `main` sin aprobación del usuario).

**Estado actual:** ejecución autónoma en curso (2026-10-03). Fase 1 cerrada.

## Checklist de fases
- [x] **Fase 1 — Base:** scaffold, design tokens, estructura de carpetas, linting, reporte de tamaño.
- [ ] **Fase 2 — Layout y secciones estáticas** con correcciones de contenido.
- [ ] **Fase 3 — Animaciones y micro-interacciones.**
- [ ] **Fase 4 — i18n ES/EN.**
- [ ] **Fase 5 — SEO, analítica, formulario y WhatsApp.**
- [ ] **Fase 6 — Optimización final y auditoría de calidad.**

## Métricas por fase
| Fase | JS cargado por la home (gz) | CSS (gz, inline) | HTML home (gz) | Fuentes | Lighthouse móvil (P/A/BP/SEO) | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Sitio actual (referencia) | 9.5 KB sin minificar + GA | 28.9 KB sin minificar | 35.7 KB sin minificar | Google Fonts, 12 pesos | ver Fase 2 | — | — | — |
| Fase 1 (página de tokens) | 0 KB | incluido en HTML | 4.3 KB | 4 woff2 · 80.5 KB total, 1 precargada (20.5 KB) | n/a (página temporal) | — | — | — |

## Fase 1 — hecho
- Rama `redesign/premium` creada desde el commit del plan. Sitio anterior movido a `legacy/` (fuera del build: Astro solo compila `src/` y `public/`).
- Scaffold **Astro 7.3.5 + @astrojs/react 7 + React 18.3.1 + TypeScript 6 (tsconfig `strictest`) + Tailwind CSS 4.3 (`@tailwindcss/vite`)**. Salida 100 % estática; CSS inline en el HTML.
- Design tokens centralizados en `src/styles/global.css` (`@theme`): paleta A1, tipografía B2, escala fluida, espaciado de layout, radios, sombras/glow, easings y duraciones. La paleta por defecto de Tailwind está desactivada: solo existen los colores del sistema.
- Fuentes self-hosted con la API de fuentes de Astro (proveedor local): Instrument Serif 400 normal/itálica, Geist variable, Geist Mono 400; woff2 subset latin (cubre español), `font-display: swap`, fallbacks con `size-adjust` generados automáticamente. Licencias OFL junto a los archivos.
- Estructura por feature (`src/features/*`, `src/components/ui`, `src/i18n`, `src/lib`).
- ESLint 10 (flat config: `typescript-eslint` strict, `no-explicit-any` = error, Astro, jsx-a11y estricto, react-hooks) + Prettier (plugins Astro y Tailwind). `astro check`: 0 errores.
- `netlify.toml`: build, Node 24, caché inmutable para `/_astro/*`, revalidación del HTML, redirecciones (`/index.html` y rutas del sitio anterior).
- `README.md` (UTF-8) con cómo correr, construir y desplegar. Scripts `report-size.mjs` y `list-pending.mjs`.

## Decisiones tomadas
- Deploy en Netlify con build estático. *(usuario)*
- Paleta **A1 "Tinta y Oro"** y tipografía **B2 (Instrument Serif + Geist)**. *(usuario)*
- **SSG: Astro + islas de React** ("usa lo que sea mejor para la optimización y diseño"). Astro usa Vite como motor, así que el requisito "Vite + React 18 + TS + Tailwind" se cumple; el contenido se entrega como HTML estático y React solo se carga en componentes interactivos. *(usuario delegó; justificación en PLAN.md §1)*
- `[REVISAR]` **No modifiqué la línea "Stack" de `CLAUDE.md`** (contenido dictado por ti). Sugiero cambiarla a: "Astro (Vite) + islas de React 18 + TypeScript · Tailwind CSS v4…".
- `[REVISAR]` Gestor de paquetes **npm** (pnpm no está instalado en esta máquina; npm evita un paso extra en Netlify).
- `[REVISAR]` **Sin Husky/lint-staged** por ahora: no fue pedido en la Fase 1 ("no agregar dependencias fuera de alcance"). Anotado en Ideas para después.
- `[REVISAR]` Versiones fijadas exactas (`--save-exact`) para builds reproducibles. ESLint 10 con `eslint-plugin-jsx-a11y-x` (fork compatible con ESLint 10; el plugin original solo soporta hasta ESLint 9).
- `[REVISAR]` Las fuentes se copiaron a `src/assets/fonts/` desde los paquetes Fontsource y luego se desinstalaron esos paquetes: el build no depende de red ni de paquetes de fuentes.
- `[REVISAR]` Redirecciones 301 de `/img/*`, `/css/*`, `/js/*` (rutas del sitio anterior) a `/`.
- Nada se mergea a `main`; cada fase se revisa en la rama. *(usuario)*

## Pendientes del usuario
### Contenido (necesario para la Fase 2)
- [ ] Cifras reales y verificables para los indicadores del hero (o confirmar que usamos solo "100% bilingüe", "Inglés avanzado" y "< 2 s").
- [ ] **GECH:** qué es, URL, problema, solución, stack, resultado.
- [ ] Soldaduras y Equipos y RIES Chihuahua: problema que resolvió cada uno, resultado y, si existen, métricas y testimonios (con permiso del cliente).
- [ ] Confirmar el grado académico: ¿Ingeniería en Desarrollo de Software en UTCH BIS terminada o en curso?
- [ ] ¿Hay herramienta para agendar consultas (Cal.com, Calendly…)?
- [ ] Confirmar el compromiso "respuesta en menos de 24 horas".
- [ ] Confirmar el email `contacto@bazanco.com` (¿el dominio existe y recibe correo?) y el número de WhatsApp `+52 614 343 6765`.
- [ ] Redes o perfiles profesionales para enlazar (LinkedIn, GitHub…), si los hay.

### Para fases posteriores
- [ ] ¿Dominio propio (p. ej. `bazanco.com`)?
- [ ] Datos del aviso de privacidad: nombre del responsable, domicilio o medio de contacto, medio para ejercer derechos ARCO. Recomendado: revisión legal.
- [ ] Revisión del copy en inglés (Fase 4).

## Ideas para después
- Husky + lint-staged para correr lint/format antes de cada commit.
- Actualizar la línea "Stack" de `CLAUDE.md` para reflejar Astro.
