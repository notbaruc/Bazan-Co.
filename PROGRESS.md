# PROGRESS — Bazan & Co. landing premium

> Se lee al iniciar cada sesión junto con `PLAN.md`. Se actualiza al cerrar cada fase.

**Estado actual:** auditoría y plan entregados (2026-10-03). Esperando aprobación y decisiones bloqueantes para iniciar la Fase 1.

## Checklist de fases
- [ ] **Fase 1 — Base:** scaffold, design tokens, estructura de carpetas, linting, reporte de tamaño.
- [ ] **Fase 2 — Layout y secciones estáticas** con correcciones de contenido.
- [ ] **Fase 3 — Animaciones y micro-interacciones.**
- [ ] **Fase 4 — i18n ES/EN.**
- [ ] **Fase 5 — SEO, analítica, formulario y WhatsApp.**
- [ ] **Fase 6 — Optimización final y auditoría de calidad.**

## Métricas por fase
| Fase | JS total (gz) | CSS (gz) | HTML home (gz) | Fuentes | Lighthouse móvil (P/A/BP/SEO) | LCP | CLS | INP |
|---|---|---|---|---|---|---|---|---|
| Sitio actual (referencia) | 9.5 KB sin minificar + GA | 28.9 KB sin minificar | 35.7 KB sin minificar | Google Fonts, 12 pesos | Pendiente de medir | — | — | — |

## Decisiones tomadas
- Deploy en Netlify con build estático. *(usuario)*
- Stack base según `CLAUDE.md`. La variante de prerender (Vite + prerender vs. Astro + islas) sigue abierta: ver D1.1. *(usuario)*
- Tema oscuro por defecto, mobile-first, dirección visual premium/tecnológica. *(usuario)*
- Presupuesto de rendimiento y reglas de contenido 1–7 de `CLAUDE.md` son innegociables. *(usuario)*
- Se conservan el ID de GA4 `G-CN941SX6Q7` y la verificación de Search Console para no perder el histórico. *(propuesta en el plan; confirmar)*
- Nada se mergea a `main` hasta cerrar la Fase 6; cada fase se revisa en un Deploy Preview de Netlify. *(propuesta en el plan; confirmar)*

## Pendientes del usuario
### Bloqueantes para la Fase 1
- [ ] **D1.1** Elegir SSG: Astro + islas de React (recomendado) o Vite + React + prerender. Si es Astro, aprobar el cambio de la línea "Stack" en `CLAUDE.md` y quitar `react-i18next`.
- [ ] **D1.2** Elegir paleta (A1 "Tinta y Oro" / A2 "Grafito y Chispa") y tipografía (B1 Bricolage + Inter / B2 Instrument Serif + Geist). Ver anexos de `PLAN.md`.
- [ ] D1.3–D1.5 Sitio legacy a `legacy/`, Husky + lint-staged, npm o pnpm (hay recomendación por defecto en el plan).

### Contenido (necesario para la Fase 2)
- [ ] Cifras reales y verificables para los indicadores del hero (o confirmar que usamos solo "100% bilingüe", "Inglés avanzado" y "< 2 s").
- [ ] **GECH:** qué es, URL, problema, solución, stack, resultado.
- [ ] Soldaduras y Equipos y RIES Chihuahua: problema que resolvió cada uno, resultado y, si existen, métricas y testimonios (con permiso del cliente).
- [ ] Capturas reales de los 3 sitios (o autorización para tomarlas yo de los sitios publicados).
- [ ] Confirmar el grado académico: ¿Ingeniería en Desarrollo de Software en UTCH BIS terminada o en curso?
- [ ] **D2.1** Voz del sitio: primera persona vs. marca (sin "somos una firma/agencia").
- [ ] **D2.2** ¿Hay herramienta para agendar consultas (Cal.com, Calendly…)? Si no, el CTA "Agenda" lleva a WhatsApp o al formulario.
- [ ] **D2.3** ¿Agregar secciones "Cómo trabajo" y FAQ? Si sí, tiempos de entrega típicos, qué incluye cada servicio y si se muestran precios orientativos.
- [ ] Confirmar el compromiso "respuesta en menos de 24 horas".
- [ ] Confirmar el email de contacto `contacto@bazanco.com` (¿el dominio existe y recibe correo?) y el número de WhatsApp `+52 614 343 6765`.
- [ ] Redes o perfiles profesionales para enlazar (LinkedIn, GitHub…), si los hay.

### Para fases posteriores
- [ ] **D5.1** Backend del formulario: Netlify Forms (recomendado), Google Forms o un servicio externo.
- [ ] **D5.2 / D6.1** ¿Dominio propio (p. ej. `bazanco.com`)?
- [ ] **D5.3** GA4 con consentimiento (recomendado) o analítica sin cookies.
- [ ] Datos del aviso de privacidad: nombre del responsable, domicilio para notificaciones o medio de contacto, medio para ejercer derechos ARCO. Recomendado: revisión legal.
- [ ] Revisión del copy en inglés (Fase 4).
