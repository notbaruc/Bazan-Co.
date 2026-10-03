# Bazan & Co. — Landing premium

Sitio de [Bazan & Co.](https://bazanconsultoria.netlify.app): ingeniería web en Chihuahua, México.
Construido con **Astro (Vite) + islas de React 18 + TypeScript + Tailwind CSS v4**, generado
como HTML estático y desplegado en **Netlify**.

> Contexto, reglas de contenido y presupuesto de rendimiento: [`CLAUDE.md`](CLAUDE.md).
> Plan por fases: [`PLAN.md`](PLAN.md). Estado actual: [`PROGRESS.md`](PROGRESS.md).
> El sitio anterior (HTML/CSS/JS) se conserva como referencia en [`legacy/`](legacy/) y no forma parte del build.

## Requisitos

- Node.js 24 (ver `.nvmrc`; mínimo 22.12)
- npm 10+

## Comandos

| Comando              | Qué hace                                                        |
| -------------------- | --------------------------------------------------------------- |
| `npm install`        | Instala dependencias                                            |
| `npm run dev`        | Servidor de desarrollo en `http://localhost:4321`               |
| `npm run build`      | Typecheck (`astro check`) + build de producción en `dist/`      |
| `npm run preview`    | Sirve `dist/` localmente para probar el build                   |
| `npm run lint`       | ESLint (TypeScript estricto, Astro, accesibilidad JSX)          |
| `npm run format`     | Prettier (incluye orden de clases de Tailwind)                  |
| `npm run size`       | Reporte de peso del build por tipo de archivo y por página      |
| `npm run pending`    | Lista los `[PENDIENTE USUARIO]` que quedan en `src/`            |

> **Windows:** si la ruta del proyecto contiene `&` (p. ej. `Bazan & Co`), los atajos de
> `node_modules/.bin` fallan en `cmd.exe`. Ejecuta las herramientas con Node directamente:
> `node node_modules/astro/bin/astro.mjs dev|build|preview|check`,
> `node node_modules/eslint/bin/eslint.js .`, `node scripts/report-size.mjs`.

## Estructura

```
src/
  assets/        # fuentes (woff2 subset latin) e imágenes procesadas por astro:assets
  components/ui/ # piezas reutilizables sin lógica de negocio (Button, Section…)
  features/      # una carpeta por sección o funcionalidad (hero, services, contact…)
  i18n/          # textos por idioma
  layouts/       # BaseLayout (head, SEO, fuentes)
  lib/           # utilidades compartidas (config del sitio, analítica…)
  pages/         # rutas
  styles/        # global.css: design tokens (@theme de Tailwind)
scripts/         # report-size.mjs, list-pending.mjs
legacy/          # sitio anterior, solo referencia
```

## Design tokens

Todos los tokens viven en [`src/styles/global.css`](src/styles/global.css) (bloque `@theme` de
Tailwind v4): colores (paleta A1 "Tinta y Oro"), tipografía (Instrument Serif + Geist + Geist Mono),
escala fluida, espaciado, radios, sombras, easings y duraciones. Las fuentes son self-hosted
mediante la API de fuentes de Astro (`astro.config.mjs`), con `font-display: swap` y fallbacks
con métricas ajustadas para evitar CLS.

## Variables de entorno

| Variable       | Uso                                                                                   |
| -------------- | ------------------------------------------------------------------------------------- |
| `PUBLIC_GA_ID` | ID de Google Analytics 4. Por defecto `G-CN941SX6Q7`. Vacío = analítica desactivada. |

Ver `.env.example`. GA solo se carga si el visitante acepta cookies de analítica.

## Despliegue (Netlify)

La configuración está en [`netlify.toml`](netlify.toml): comando `npm run build`, carpeta `dist`,
Node 24, cabeceras de caché/seguridad y redirecciones. No hay pasos manuales.

1. Cada push a una rama genera un **Deploy Preview / Branch deploy** (si está activado en Netlify).
2. Producción se publica **solo** al hacer merge a `main`.
3. **Formulario:** usa Netlify Forms. Activa *Form detection* en Netlify (Site configuration → Forms)
   y configura la notificación por email. El formulario se llama `contacto`.
