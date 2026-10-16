# TAREA: Refactor completo de Bazan & Co. a un sitio premium en React

Ejecuta todo de principio a fin, de forma autónoma. No podré responder durante la ejecución. Decide con criterio y registra lo dudoso como `[REVISAR]`.

## Contexto
Bazan & Co. es mi firma de ingeniería web en Chihuahua, México (servicio remoto global): diseño web premium, SEO técnico y landing pages de alta conversión para negocios locales y PYMEs. Soy el único desarrollador. Público: dueños de negocios locales, no técnicos, que deciden por confianza y resultados. Objetivo único de la página: que me escriban por WhatsApp o agenden una consulta. Sitio actual: https://bazanconsultoria.netlify.app (HTML/CSS/JS vanilla). Deploy: Netlify, build estático.

## Seguridad
- Trabaja SOLO en la rama `redesign/premium`. NUNCA hagas push, merge ni despliegue a producción.
- Entorno: Windows + PowerShell. No uses comandos de bash (cp, rm, cat, grep, export); no encadenes con `&&` (usa `;`). Edita archivos con tus herramientas de edición. Agrega `.gitattributes` (`* text=auto eol=lf`) y Prettier con `endOfLine: "lf"`.
- No inventes datos: nada de métricas, testimonios, cifras de clientes ni certificaciones. Usa `[PENDIENTE USUARIO]`.
- REGLA DE EVIDENCIA: no reportes ninguna métrica que no hayas medido ejecutando el comando. Anota el comando y el resultado real. Si no puedes medir algo, dilo. No cierres una fase sin build, lint y typecheck sin errores.
- Haz exactamente lo que se pide. Ideas extra van a "Ideas para después" en PROGRESS.md, no se implementan.

## Arranque
1. Si el workspace tiene el código del sitio actual, muévelo a `legacy/` (fuera del build). Si no, abre la URL pública y guarda todo su contenido (textos, servicios, proyectos, datos de contacto, meta, ID de analítica) en `legacy/REFERENCIA.md`.
2. Guarda las secciones "Seguridad", "Presupuesto de rendimiento" y "Reglas de contenido" de este archivo en `AGENTS.md`, para no perderlas si tu contexto se compacta.
3. Crea `PLAN.md` (plan por fases con riesgos; decide entre Vite + prerender estático o Astro con islas de React, justificado con el presupuesto de rendimiento; elige 1 paleta y 1 tipografía "premium, tecnológico, oscuro y elegante") y `PROGRESS.md` (checklist de fases, decisiones, pendientes). Commit y continúa.
4. Al cerrar cada fase: actualiza PROGRESS.md y haz commit.

## Presupuesto de rendimiento (innegociable: mi pitch es la velocidad)
Lighthouse móvil: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100. LCP < 2s, CLS < 0.05, INP < 200ms. Animar solo `transform` y `opacity`. Lazy loading y code splitting de lo pesado. Imágenes WebP/AVIF con dimensiones. Fuentes self-hosted, subset, `font-display: swap`. Respetar `prefers-reduced-motion`. Medir con `npm run preview` + `npx lighthouse` (Chrome instalado).
**Compuerta:** al cierre de las fases 2 a 5, si no se cumple el presupuesto, corrige o sacrifica el efecto que lo rompe ANTES de avanzar.

## Reglas de contenido (obligatorias)
1. NO afirmar "Certificación C1 en Inglés". Usar "Inglés avanzado (iTEP Academic Plus)".
2. Contadores solo con datos verificables (ej. "100% bilingüe", "<2s de carga"). Nunca "0 proyectos".
3. Portafolio: Soldaduras y Equipos, RIES Chihuahua y GECH. Cada uno con descripción propia (problema, solución, stack, resultado) y `[PENDIENTE USUARIO]` para métricas y testimonios.
4. Alt text correctos. Sin claims no demostrables (ej. "A/B testing integrado").
5. Aviso de privacidad coherente con lo que hace el sitio (formulario + Google Analytics + WhatsApp).
6. Botón flotante de WhatsApp con mensaje pre-llenado y banner de cookies discreto y accesible.
Conserva el tono actual ("no construimos páginas, diseñamos máquinas de conversión").

## Fases
**1. Base:** Vite + React 18 + TypeScript + Tailwind (o lo decidido en PLAN.md), design tokens centralizados, fuentes, ESLint + Prettier, `netlify.toml` con caché y redirects, README con comandos de PowerShell.
**2. Layout estático, mobile-first, sin animaciones:** Hero → Barra de confianza → Problema/Solución → Servicios (Diseño Web Premium, Optimización SEO, Landing Pages de Alta Conversión) → Proceso (Diagnóstico, Diseño, Desarrollo, Lanzamiento) → Portafolio → Por qué Bazan & Co. → FAQ → CTA final → Contacto → Footer. Navbar con sección activa, HTML semántico, foco visible, contraste AA. Formulario solo visual + validación en cliente. Si tienes navegador, revisa capturas a 390px, 768px y 1440px.
**3. Animaciones (la fase más delicada):** antes de implementar, anota en PROGRESS.md qué efectos usarás y su costo. Hero con reveal por palabra y fondo animado ligero (Three.js solo si lo justifican números medidos), smooth scroll (Lenis) con scroll-reveal escalonado, contadores en viewport, tarjetas de servicios con tilt 3D y spotlight al cursor, parallax sutil en portafolio, navbar que se compacta con blur, cursor personalizado solo en desktop, micro-interacciones en botones y formulario, marquee de tecnologías, preloader solo si no empeora el LCP. Prueba con CPU throttling 4x. Anota los efectos descartados y por qué.
**4. i18n ES/EN:** react-i18next, selector en navbar, persistencia y detección por navegador, TODO el copy en archivos de traducción, inglés natural y orientado a conversión, rutas compatibles con hreflang, sin layout shift al cambiar de idioma.
**5. SEO, analítica y formulario:** prerender/SSG, título, meta y Open Graph mejorados, conservar la verificación de Search Console (`vkZJiBpk1G6FxHcrMStEB7mfx0OqFYhLGhKE58p7JNI`), JSON-LD (ProfessionalService), sitemap, robots, hreflang. Google Analytics sin romper el tracking actual (si no encuentras el ID, variable de entorno y `[PENDIENTE USUARIO]`) más eventos: clic en WhatsApp, envío de formulario, clic en proyecto, cambio de idioma. Formulario con Netlify Forms, honeypot, estados (validando, enviando, éxito, error) y accesible por teclado.
**6. Auditoría final (actúa como revisor crítico):** Lighthouse móvil y desktop, accesibilidad (teclado, contraste, reduced-motion), código duplicado o muerto, dependencias innecesarias, revisión de contenido contra las reglas, prueba de formulario, WhatsApp y analítica, y que el build de Netlify funcione sin pasos raros.

## Entrega final
Escribe `REPORT.md` con: métricas antes/después (medidas, con el comando), decisiones `[REVISAR]`, todos los `[PENDIENTE USUARIO]`, efectos descartados y por qué, riesgos restantes, e instrucciones exactas para revisar la rama y, si apruebo, hacer merge y desplegar.