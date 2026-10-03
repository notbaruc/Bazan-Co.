# Proyecto: Bazan & Co. (landing premium)

## Contexto
- Negocio: Bazan & Co., ingeniería web en Chihuahua, México, con servicio remoto global. Vendo diseño web premium, SEO técnico y landing pages de alta conversión para negocios locales y PYMEs. Soy fundador y único desarrollador.
- Público objetivo: dueños de negocios locales (industria, maquila, servicios, comercio), no técnicos. Deciden por confianza y por ver resultados.
- Objetivo único de la página: que el visitante me escriba por WhatsApp o agende una consulta.
- Deploy: Netlify, con build estático.

## Stack
Vite + React 18 + TypeScript · Tailwind CSS (tokens en variables CSS) · Framer Motion (componentes) + GSAP/ScrollTrigger solo donde se justifique · Lenis (smooth scroll) · react-i18next (ES/EN) · Three.js/R3F solo si el hero lo justifica, con lazy loading y fallback estático.

## Dirección de diseño
Premium, tecnológico, oscuro y elegante (referencias: Linear, Vercel, Stripe, Apple). Tema oscuro por defecto con un acento distintivo. Tipografía display con carácter + sans legible. Detalles: glassmorphism sutil, gradientes con grano, bordes con glow, spotlight al cursor, fondo tipo aurora o grid. Mobile-first: la mayoría de las visitas vienen del celular.

## Presupuesto de rendimiento (innegociable)
Mi pitch de venta es la velocidad; el sitio no puede contradecirlo.
- Lighthouse móvil: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
- LCP < 2s en 4G simulado, CLS < 0.05, INP < 200ms.
- Animar solo `transform` y `opacity`.
- Lazy loading de lo pesado y code splitting. Imágenes WebP/AVIF con dimensiones explícitas. Fuentes self-hosted con `font-display: swap` y subset.
- Respetar `prefers-reduced-motion`.
- Reportar el tamaño del bundle al cierre de cada fase.

## Reglas de contenido (obligatorias)
1. NO afirmar "Certificación C1 en Inglés". Usar "Inglés avanzado" hasta que yo actualice.
2. Los contadores solo muestran datos verificables. Nada de "0 proyectos". Usar cifras reales que yo dé o indicadores como "100% bilingüe" o "<2s de carga".
3. Portafolio: Soldaduras y Equipos, RIES Chihuahua y GECH. Cada proyecto con descripción propia (problema, solución, stack, resultado) y placeholders marcados `[PENDIENTE USUARIO]` para métricas y testimonios. No inventar métricas ni testimonios.
4. Alt text correctos en todas las imágenes.
5. Sin claims no demostrables (ej. "A/B testing integrado") salvo que yo los respalde.
6. Aviso de privacidad coherente con lo que hace el sitio (formulario + Google Analytics + WhatsApp).
7. Mantener botón flotante de WhatsApp con mensaje pre-llenado y banner de cookies discreto y accesible.

## Reglas de trabajo
- Al iniciar cada sesión: lee `PROGRESS.md` y `PLAN.md`. Al terminar cada fase: actualiza `PROGRESS.md` (hecho, decisiones, pendientes, métricas), haz commit con mensaje claro y espera mi visto bueno.
- Una fase a la vez. No adelantes trabajo de fases futuras.
- Si algo es ambiguo o es una decisión de diseño importante, pregúntame antes de asumir.
- Sé honesto: si una idea mía empeora rendimiento, accesibilidad o conversión, dímelo y propón algo mejor.
- Código tipado, componentes reutilizables, sin `any`, sin código muerto.
