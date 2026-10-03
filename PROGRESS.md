# PROGRESS — Bazan & Co. landing premium

> Se lee al iniciar cada sesión junto con `PLAN.md`. Se actualiza al cerrar cada fase.
> Rama de trabajo: `redesign/premium` (nunca merge a `main` sin aprobación del usuario).

**Estado actual:** ejecución autónoma en curso (2026-10-03). Fases 1–2 cerradas.

## Checklist de fases
- [x] **Fase 1 — Base:** scaffold, design tokens, estructura de carpetas, linting, reporte de tamaño.
- [x] **Fase 2 — Layout y secciones estáticas** con correcciones de contenido.
- [ ] **Fase 3 — Animaciones y micro-interacciones.**
- [ ] **Fase 4 — i18n ES/EN.**
- [ ] **Fase 5 — SEO, analítica, formulario y WhatsApp.**
- [ ] **Fase 6 — Optimización final y auditoría de calidad.**

## Métricas por fase
| Fase | JS cargado por la home (gz) | CSS (gz, inline) | HTML home (gz) | Fuentes | Lighthouse móvil (P/A/BP/SEO) | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Sitio actual en producción (referencia) | 9.5 KB sin minificar + GA | 28.9 KB sin minificar | 35.7 KB sin minificar | Google Fonts, 12 pesos | **78 / 96 / 100 / 100** | 3.88 s | 0 | 225 ms |
| Fase 1 (página de tokens) | 0 KB | incluido en HTML | 4.3 KB | 4 woff2 · 80.5 KB total, 1 precargada (20.5 KB) | n/a (página temporal) | — | — | — |
| Fase 2 (landing estática) | 0 KB al cargar · 46.9 KB diferidos (isla del formulario, `client:visible`) | incluido en HTML | 23.8 KB | 2 precargadas (42.1 KB) | **100 / 100 / 100 / 100** | 1.51 s | 0 | 16 ms |

> Lighthouse 13 móvil (Moto G Power simulado, 4G lento, CPU ×4), mediana de 3 corridas, contra `dist/` servido con brotli (simula Netlify) usando Microsoft Edge (no hay Chrome en esta máquina). La referencia del sitio actual se midió contra producción. Peso total transferido de la home: 103 KB (antes 436 KB).

## Fase 1 — hecho
- Rama `redesign/premium` creada desde el commit del plan. Sitio anterior movido a `legacy/` (fuera del build: Astro solo compila `src/` y `public/`).
- Scaffold **Astro 7.3.5 + @astrojs/react 7 + React 18.3.1 + TypeScript 6 (tsconfig `strictest`) + Tailwind CSS 4.3 (`@tailwindcss/vite`)**. Salida 100 % estática; CSS inline en el HTML.
- Design tokens centralizados en `src/styles/global.css` (`@theme`): paleta A1, tipografía B2, escala fluida, espaciado de layout, radios, sombras/glow, easings y duraciones. La paleta por defecto de Tailwind está desactivada: solo existen los colores del sistema.
- Fuentes self-hosted con la API de fuentes de Astro (proveedor local): Instrument Serif 400 normal/itálica, Geist variable, Geist Mono 400; woff2 subset latin (cubre español), `font-display: swap`, fallbacks con `size-adjust` generados automáticamente. Licencias OFL junto a los archivos.
- Estructura por feature (`src/features/*`, `src/components/ui`, `src/i18n`, `src/lib`).
- ESLint 10 (flat config: `typescript-eslint` strict, `no-explicit-any` = error, Astro, jsx-a11y estricto, react-hooks) + Prettier (plugins Astro y Tailwind). `astro check`: 0 errores.
- `netlify.toml`: build, Node 24, caché inmutable para `/_astro/*`, revalidación del HTML, redirecciones (`/index.html` y rutas del sitio anterior).
- `README.md` (UTF-8) con cómo correr, construir y desplegar. Scripts `report-size.mjs` y `list-pending.mjs`.

## Fase 2 — hecho
- Landing completa en español, en el orden pedido: Hero → Barra de confianza → Problema/Solución → Servicios → Proceso → Portafolio → Por qué Bazan & Co. → FAQ → CTA final → Contacto → Footer. Además: página `/privacidad`, página 404, botón flotante de WhatsApp, banner de cookies y skip link.
- Todo el copy vive en `src/i18n/es.ts` (diccionario tipado); los componentes no tienen texto fijo. `*texto*` marca el énfasis en itálica dorada de los títulos.
- Componentes UI reutilizables: `Button` (enlace con estilo de botón), `Section`, `SectionHeader`, `RichText`, `Icon` (set propio de trazos), `WhatsAppIcon`, `Logo`, `Pending` (placeholder visible).
- **Reglas de contenido aplicadas:** sin "Certificación C1" (ahora "Inglés avanzado"); sin contadores inventados (indicadores: "<2 s objetivo de carga", "100% bilingüe", "95+ Lighthouse móvil de este sitio" —medido—, "1:1 trato directo"); sin "A/B testing integrado" ni "Máxima tasa de conversión"; descripciones propias por proyecto (reto, solución, stack, resultado) con placeholders en métricas y testimonios; alt text descriptivos de capturas reales; aviso de privacidad coherente con formulario + GA con consentimiento + WhatsApp.
- **Portafolio con capturas reales** de soldadurasequipos.netlify.app y rieschihuahua.com (tomadas con Edge headless, convertidas a AVIF/WebP responsivas con `astro:assets`). Stack detectado del código público: Soldaduras = HTML + Tailwind CSS + JavaScript + Google Maps; RIES = HTML + CSS + JavaScript.
- Navbar fija con indicador de sección activa (IntersectionObserver), menú móvil accesible (Escape, `aria-expanded`, foco). FAB de WhatsApp con mensaje pre-llenado, visible siempre y que se desplaza si el banner de cookies lo taparía. Banner de cookies con **Aceptar/Rechazar** del mismo peso, preferencia guardada y reabrible desde el footer.
- Formulario (isla React, `client:visible`): validación en cliente accesible (`aria-invalid`, `aria-describedby`, resumen con `role="alert"`, foco al primer error). Antes de hidratar funciona la validación nativa del navegador. El envío se conecta en la Fase 5.
- Favicons (`favicon.ico`, 32 px, apple-touch) generados del logo actual.
- **Compuerta de calidad superada:** Lighthouse móvil 100/100/100/100, LCP 1.51 s, CLS 0, TBT 16 ms. INP: no lo mide Lighthouse en navegación; TBT ≈ 0 y casi sin JS en la carga (se mide en la Fase 6).

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
- `[REVISAR]` **Voz del sitio:** se conserva el "nosotros" de marca del sitio actual ("No construimos páginas web…"), pero sin afirmar que somos agencia/firma/equipo, y se repite el diferenciador honesto "hablas directo con el ingeniero que construye tu sitio".
- `[REVISAR]` **CTA "Agenda una consulta"** lleva al formulario de contacto (no hay herramienta de agenda). El CTA principal del hero es WhatsApp.
- `[REVISAR]` **Enlace a RIES Chihuahua oculto:** el certificado HTTPS de `rieschihuahua.com` es inválido (`ERR_CERT_COMMON_NAME_INVALID`, verificado el 2026-10-03). Mandar visitantes ahí les mostraría una advertencia de seguridad. La tarjeta se muestra sin enlace; reactivar en `src/i18n/es.ts` cuando se corrija (probablemente falta emitir el certificado del dominio en Netlify).
- `[REVISAR]` **Textos de reto/solución de Soldaduras y RIES** redactados a partir de lo que muestran sus sitios públicos. Valida que reflejen la necesidad real del cliente.
- `[REVISAR]` **Textos del Proceso** (Diagnóstico, Diseño, Desarrollo, Lanzamiento): describen un flujo estándar ("revisas y apruebas la propuesta antes del desarrollo", "Analytics y Search Console configurados"). Confirma que así trabajas.
- `[REVISAR]` **FAQ:** 6 preguntas con respuestas que no comprometen precios ni tiempos; los datos concretos quedaron como `[PENDIENTE USUARIO]`. La respuesta sobre Google no promete posiciones.
- `[REVISAR]` Se conservan del sitio anterior (redactados por ti): "consulta técnica sin costo" y "Te respondemos en menos de 24 horas".
- `[REVISAR]` Credencial mostrada como "Formación en Ingeniería en Desarrollo de Software (UTCH BIS)": es verdadera tanto si el título está terminado como en curso. Ajustar cuando confirmes.
- `[REVISAR]` Indicador "95+ Lighthouse móvil de este sitio": se mantiene solo mientras las mediciones lo sostengan (hoy 100). Se vuelve a verificar en la Fase 6.
- `[REVISAR]` Botón de WhatsApp: ícono blanco sobre el verde oficial (#25D366) por reconocimiento de marca; el contraste del ícono es 2:1 (es un logotipo, el botón tiene nombre accesible).

## Pendientes del usuario
### Placeholders `[PENDIENTE USUARIO]` en el sitio (`npm run pending` los lista; 16 al cierre de la Fase 2)
- [ ] Soldaduras y Equipos: resultado medible y testimonio.
- [ ] RIES Chihuahua: resultado medible y testimonio. **Corregir el certificado HTTPS de rieschihuahua.com.**
- [ ] **GECH:** tipo de proyecto y sector, reto, solución, stack, resultado, testimonio, URL y captura.
- [ ] FAQ: rangos de precio orientativos (si quieres mostrarlos), tiempo típico de entrega, plan de mantenimiento/soporte.
- [ ] Aviso de privacidad: nombre completo del responsable y domicilio; plazo de respuesta ARCO y tiempo de conservación de mensajes.

### Contenido por confirmar
- [ ] Cifras reales adicionales para la barra de confianza (p. ej. proyectos entregados), si las quieres mostrar.
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
