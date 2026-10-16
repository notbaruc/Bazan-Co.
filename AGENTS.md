# AGENTS.md — Reglas Innegociables del Proyecto Bazan & Co.

Este archivo conserva las secciones críticas de `TAREA.md` para asegurar que nunca se pierdan durante la ejecución o compactación de contexto.

## Seguridad
- Trabaja SOLO en la rama `redesign/premium`. NUNCA hagas push, merge ni despliegue a producción.
- Entorno: Windows + PowerShell. No uses comandos de bash (cp, rm, cat, grep, export); no encadenes con `&&` (usa `;`). Edita archivos con tus herramientas de edición. Agrega `.gitattributes` (`* text=auto eol=lf`) y Prettier con `endOfLine: "lf"`.
- No inventes datos: nada de métricas, testimonios, cifras de clientes ni certificaciones. Usa `[PENDIENTE USUARIO]`.
- REGLA DE EVIDENCIA: no reportes ninguna métrica que no hayas medido ejecutando el comando. Anota el comando y el resultado real. Si no puedes medir algo, dilo. No cierres una fase sin build, lint y typecheck sin errores.
- Haz exactamente lo que se pide. Ideas extra van a "Ideas para después" en PROGRESS.md, no se implementan.

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
