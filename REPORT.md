# REPORT — Refactor de la landing de Bazan & Co.

> Rama: `redesign/premium` (local, **sin push, sin merge a `main`, sin despliegue**).
> Fecha: 2026-10-03 · Commits: `fa17aa1` (plan) → `2430f6a` (F1) → `cea0d67` (F2) → `694b931` (F3) → `c3c707d` (F4) → `cb311c1` (F5) → `ef2fb67` y siguientes (F6).
> Detalle por fase: [`PROGRESS.md`](PROGRESS.md) · Plan y auditoría inicial: [`PLAN.md`](PLAN.md).

## 1. Resumen

El sitio pasó de HTML/CSS/JS vanilla a **Astro 7 (Vite) + islas de React 18 + TypeScript estricto + Tailwind CSS v4**, generado como HTML estático para Netlify. Es bilingüe (`/` y `/en/`), tiene las 11 secciones pedidas, animaciones premium que respetan el presupuesto, SEO completo, GA4 con consentimiento, formulario con Netlify Forms y WhatsApp en todos los puntos de conversión.

Cumple el presupuesto de `CLAUDE.md` en todas las páginas: **Lighthouse móvil 99/100/100/100, escritorio 100/100/100/100, LCP 1.66 s, CLS 0, INP ≤ 144 ms con CPU ×4.**

## 2. Métricas antes / después

Lighthouse 13, mediana de 5 corridas en móvil (Moto G Power simulado, 4G lento, CPU ×4) y 3 en escritorio. "Antes" = producción actual (`bazanconsultoria.netlify.app`); "después" = build servido con brotli, como en Netlify. Navegador de pruebas: Microsoft Edge (Chromium).

| Métrica | Antes | Después |
|---|---|---|
| **Performance móvil** | 78 | **99** |
| **Accessibility móvil** | 96 | **100** |
| **Best Practices móvil** | 100 | **100** |
| **SEO móvil** | 100 | **100** |
| Performance escritorio | 96 | **100** (A11y 100 · BP 100 · SEO 100) |
| **LCP móvil** | 3.88 s | **1.66 s** |
| LCP escritorio | 1.12 s | **0.40 s** |
| **CLS** | 0 (escritorio 0.009) | **0** |
| TBT móvil | 225 ms | **0 ms** |
| **INP** (Event Timing, CPU ×4, interacciones reales) | no medido | **96–112 ms móvil · 144 ms escritorio** |
| Peso total de la home | 436 KB | **112 KB** |
| JS que se ejecuta al cargar | 9.5 KB + Google Analytics (siempre) | **3.0 KB** gz (+6.5 KB solo en escritorio, en idle) |
| JS diferido | — | 51 KB gz de la isla del formulario (React), solo al llegar al formulario |
| GA | siempre, sin consentimiento | solo si el visitante acepta cookies |
| Fuentes | Google Fonts, 12 pesos, cadena bloqueante | self-hosted, 4 woff2 (80 KB), 2 precargadas (42 KB) |
| HTML de la home (gz, con CSS inline) | 35.7 KB sin minificar + CSS aparte | 29.5 KB |

Prueba de estrés adicional (Lighthouse con CPU ×4 **real**, no simulado): 92 / LCP 1.87 s / TBT ~300 ms. En esta máquina varía ±4 puntos.

Accesibilidad: **axe-core completo sin violaciones** en las 5 páginas (móvil y escritorio), navegación por teclado verificada, `prefers-reduced-motion` respetado.

## 3. Decisiones marcadas `[REVISAR]`

**Arquitectura y stack**
1. **Astro + islas de React** en lugar de una SPA de Vite (me pediste usar lo mejor para rendimiento). Astro usa Vite por dentro. **No modifiqué la línea "Stack" de `CLAUDE.md`**; sugiero actualizarla.
2. **Sin `react-i18next`:** cada idioma es una página estática; uso diccionarios TypeScript tipados (`src/i18n/es.ts`, `en.ts`) que fallan el build si falta una clave. Ahorra ~20 KB de JS.
3. **Sin Framer Motion, GSAP ni Three.js:** todos los efectos se lograron con CSS/vanilla (ver §5).
4. Gestor **npm** (pnpm no estaba instalado). Versiones exactas. ESLint 10 con `eslint-plugin-jsx-a11y-x` (fork compatible). Sin Husky.
5. Fuentes copiadas a `src/assets/fonts/` (sin depender de red ni de paquetes en el build).

**Contenido**
6. **Voz:** se conserva el "nosotros" de marca y el tono ("No construimos páginas web…"), sin decir que somos agencia o equipo, más el diferenciador "hablas directo con el ingeniero".
7. **"Agenda una consulta"** lleva al formulario (no hay herramienta de agenda). El CTA principal es WhatsApp.
8. **Enlace a RIES Chihuahua oculto:** el **certificado HTTPS de `rieschihuahua.com` es inválido** (`ERR_CERT_COMMON_NAME_INVALID`). Reactivar en `src/i18n/es.ts` y `en.ts` cuando se corrija.
9. Textos de **reto/solución** de Soldaduras y RIES redactados a partir de sus sitios públicos; capturas reales tomadas de esos sitios.
10. Textos del **Proceso** y de la **FAQ** describen un flujo estándar sin prometer precios, tiempos ni posiciones en Google.
11. Se conservan del sitio anterior (tus textos): "consulta técnica sin costo" y "Te respondemos en menos de 24 horas".
12. Credencial: "Formación en Ingeniería en Desarrollo de Software (UTCH BIS)" (vale si el título está terminado o en curso).
13. Indicador "95+ Lighthouse móvil de este sitio": verdadero hoy (99); mantenerlo solo si las mediciones lo sostienen.
14. **Copy en inglés** redactado por mí (natural, no literal): revísalo.
15. Títulos SEO: "Diseño web premium y SEO en Chihuahua | Bazan & Co." / "Premium Web Design & SEO from Chihuahua, Mexico | Bazan & Co.".

**Comportamiento**
16. **Detección de idioma = sugerencia, no redirección automática** (Googlebot rastrea en inglés; una redirección le ocultaría la versión en español). La preferencia elegida sí se recuerda y redirige antes del primer render.
17. **Un aviso a la vez:** la sugerencia de idioma espera a la decisión de cookies.
18. Los `id` de sección son iguales en ambos idiomas (el cambio de idioma conserva la sección).
19. `lang`/`hreflang` genéricos (`es`, `en`); `x-default` → español.
20. **GA4 solo con consentimiento previo** (mismo ID `G-CN941SX6Q7`): verás menos visitas que hoy, pero es coherente con el banner y el aviso. El histórico sigue en la misma propiedad.
21. **CSP con hashes** (máxima seguridad); cuesta ~80 ms de FCP simulado.
22. Sin JS, el formulario muestra la página de confirmación genérica de Netlify.
23. Número de WhatsApp con el formato del sitio anterior (`5216143436765`).
24. Ícono blanco de WhatsApp sobre el verde oficial (contraste del logotipo 2:1; el botón tiene nombre accesible).
25. Cursor personalizado = anillo que acompaña al cursor nativo (no lo oculta).
26. `content-visibility: auto` en las secciones bajo el hero: en saltos muy largos con scroll suave una sección puede tardar un frame en pintarse.
27. Compuerta de rendimiento evaluada con Lighthouse estándar (como PageSpeed Insights); la prueba de CPU ×4 real se usó como control de regresión.
28. Redirecciones 301 de `/img/*`, `/css/*`, `/js/*` (rutas del sitio anterior) a `/`.

## 4. Pendientes del usuario (`[PENDIENTE USUARIO]`)

`npm run pending` los lista (15 por idioma + la captura de GECH). **Hoy se ven en la página como etiquetas "PENDIENTE"**, así que hay que llenarlos (o pedirme que se oculten) antes de publicar.

**En el sitio**
- [ ] Soldaduras y Equipos: resultado medible y testimonio (con permiso del cliente).
- [ ] RIES Chihuahua: resultado medible y testimonio. **Corregir su certificado HTTPS.**
- [ ] **GECH:** tipo de proyecto y sector, reto, solución, stack, resultado, testimonio, URL y captura. (Si no hay información pronto, recomiendo quitar la tarjeta.)
- [ ] FAQ: rangos de precio orientativos (opcional), tiempo típico de entrega, plan de mantenimiento/soporte.
- [ ] Aviso de privacidad: nombre completo del responsable y domicilio; plazo de respuesta ARCO; tiempo de conservación de mensajes. **Recomendado: revisión legal** (el texto es coherente con lo que hace el sitio, pero no es asesoría legal).

**Por confirmar**
- [ ] Email `contacto@bazanco.com`: ¿el dominio existe y recibe correo? Número de WhatsApp `+52 614 343 6765`.
- [ ] Compromiso "respuesta en menos de 24 horas".
- [ ] Estado del título (UTCH BIS).
- [ ] Cifras reales adicionales para la barra de confianza (p. ej. proyectos entregados), si las quieres mostrar.
- [ ] Herramienta de agenda (Cal.com/Calendly) y perfiles profesionales (LinkedIn, GitHub) para enlazar.
- [ ] ID de GA: se conservó `G-CN941SX6Q7` (encontrado en `legacy/`). Si cambias de propiedad, define `PUBLIC_GA_ID` en Netlify.

**Configuración en Netlify y GA (no se puede hacer desde el código)**
- [ ] Activar **Form detection** (Site configuration → Forms) y la **notificación por email**.
- [ ] En GA4, marcar `generate_lead` y `whatsapp_click` como **eventos clave**.

## 5. Efectos e ideas descartados (y por qué)

| Descartado / ajustado | Motivo |
|---|---|
| Preloader | Retrasa el primer render y el LCP. |
| Three.js / R3F en el hero | ~190 KB gz (×4 el JS del sitio) y costo de GPU en móviles; la aurora CSS logra el efecto con ~0 KB. |
| Framer Motion | Los efectos se lograron con CSS/vanilla; costaría 18–30 KB gz sin diferencia visible. |
| GSAP / ScrollTrigger | No hay secuencias con pin/scrub que lo justifiquen. |
| `react-i18next` | Páginas estáticas por idioma; la librería solo agregaría JS. |
| Reveal del titular por palabra → por línea | Por palabra costaba ~100 ms de bloqueo extra con CPU ×4. |
| Fade del párrafo del hero | Es el elemento LCP en móvil; retrasaba el LCP ~500 ms. |
| Aurora animada en móvil | Queda fija < 768 px (~80 ms de bloqueo menos); se anima en escritorio. |
| `mix-blend-mode` en el grano | Recomponía la capa en cada frame. |
| Contador animado en "<2 s" | Contar de 0 mostraría valores falsos ("<0 s"). |
| Redirección automática por idioma del navegador | Ocultaría la versión en español a Google. |
| Página de "gracias" propia, pruebas E2E y Lighthouse CI en el repo, Husky | Fuera de alcance; anotados en "Ideas para después" de `PROGRESS.md`. |

## 6. Riesgos y recomendaciones post-lanzamiento

**Riesgos**
1. **Placeholders visibles** si se publica sin llenarlos (ver §4).
2. **Netlify Forms** no recibirá envíos si *Form detection* está apagada (en sitios nuevos viene apagada). Probar un envío real en el deploy preview.
3. **Primer deploy con build:** el sitio actual se publica sin build desde la raíz; con `netlify.toml` Netlify pasará a `npm run build` → `dist`. Verifica en Site configuration → Build & deploy que no haya un *publish directory* o *base directory* fijado en la UI que contradiga el archivo.
4. **Menos sesiones en GA** por el consentimiento previo (esperado).
5. **CSP estricta:** si en el futuro agregas un script de terceros (chat, píxel, Calendly), hay que permitir su dominio en `astro.config.mjs` (`security.csp`).
6. **Certificado de rieschihuahua.com** inválido: además del portafolio, afecta al cliente.
7. **Aviso de privacidad** sin datos del responsable ni revisión legal.

**Recomendaciones después de publicar**
- Search Console: reenviar `https://bazanconsultoria.netlify.app/sitemap.xml`, inspeccionar `/` y `/en/` y revisar la sección de hreflang.
- PageSpeed Insights sobre la URL pública (con datos de campo de CrUX a las 4 semanas).
- GA4 → Tiempo real: aceptar cookies y comprobar `page_view`, `whatsapp_click` y un `generate_lead` de prueba.
- Probar el formulario en producción y confirmar que llega el correo de Netlify.
- Revisar cabeceras con securityheaders.com.
- A mediano plazo: dominio propio (`bazanco.com`), agenda en línea, testimonios reales, analítica sin cookies si quieres medir a todos.

## 7. Cómo revisar la rama y, si apruebas, publicar

> La carpeta del proyecto tiene `&` en la ruta (`Bazan & Co`): en Windows los atajos `npm run …` fallan en `cmd.exe`. Usa los comandos con `node` de abajo, o mueve el proyecto a una ruta sin `&`.

**1. Ver la rama localmente** (desde la carpeta del repositorio). Git no deja abrir la misma rama en dos carpetas: si sigue abierta en el worktree de Claude (`.claude/worktrees/bazan-landing-refactor-plan-d80ae2`), trabaja ahí o cierra ese worktree primero.

```bash
git checkout redesign/premium
```

```bash
npm ci
```

```bash
node node_modules/astro/bin/astro.mjs build
```

```bash
node node_modules/astro/bin/astro.mjs preview
```

Abre `http://localhost:4321/` y `http://localhost:4321/en/`. Para listar los pendientes: `node scripts/list-pending.mjs`.

**2. Ver un deploy preview en Netlify** (recomendado antes de mergear): sube la rama y abre un pull request; Netlify generará una URL de preview con el build real (formularios incluidos, si activaste *Form detection*).

```bash
git push -u origin redesign/premium
```

**3. Checklist antes del merge**
- [ ] Placeholders llenados u ocultados (`node scripts/list-pending.mjs --strict` debe terminar sin pendientes).
- [ ] *Form detection* y notificaciones activas en Netlify; envío de prueba recibido en el preview.
- [ ] Copy en inglés y aviso de privacidad revisados.
- [ ] Decisiones `[REVISAR]` validadas.

**4. Publicar** (Netlify despliega solo al recibir el push a `main`):

```bash
git checkout main
```

```bash
git merge --no-ff redesign/premium
```

```bash
git push origin main
```

**5. Después del deploy:** sigue las recomendaciones de §6. Si algo sale mal, en Netlify → Deploys puedes volver al deploy anterior con *Publish deploy* (rollback inmediato).
