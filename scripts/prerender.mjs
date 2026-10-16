import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const distDir = resolve('dist');
const ssrDir = resolve('dist-ssr');

console.log('> Generando bundle SSR temporal para prerender...');
execFileSync(
  process.execPath,
  [
    resolve('./node_modules/vite/bin/vite.js'),
    'build',
    '--ssr',
    'src/entry-server.tsx',
    '--outDir',
    'dist-ssr',
  ],
  { stdio: 'inherit' }
);

const serverEntryPath = resolve(ssrDir, 'entry-server.js');
const { renderApp } = await import(pathToFileURL(serverEntryPath).href);

let templateHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

// Inline critical CSS to eliminate render-blocking network round-trip on mobile 4G
const cssLinkRegex = /<link rel="stylesheet"[^>]*href="\/assets\/(index-[^"]+\.css)"[^>]*>/;
const cssMatch = templateHtml.match(cssLinkRegex);
if (cssMatch && cssMatch[1]) {
  const cssFilePath = resolve(distDir, 'assets', cssMatch[1]);
  if (existsSync(cssFilePath)) {
    const rawCss = readFileSync(cssFilePath, 'utf-8').replace(/url\(\.\//g, 'url(/assets/');
    templateHtml = templateHtml.replace(cssLinkRegex, `<style>${rawCss}</style>`);
  }
}

const esHtml = renderApp('es');
const finalEsHtml = templateHtml.replace('<div id="root"></div>', `<div id="root">${esHtml}</div>`);
writeFileSync(resolve(distDir, 'index.html'), finalEsHtml, 'utf-8');

const enDir = resolve(distDir, 'en');
if (!existsSync(enDir)) {
  mkdirSync(enDir, { recursive: true });
}
const enHtml = renderApp('en');
const finalEnHtml = templateHtml
  .replace('<html lang="es">', '<html lang="en">')
  .replace(
    '<title>Bazan &amp; Co. — Ingeniería Web Premium | Desarrollo, SEO Técnico &amp; Landing Pages</title>',
    '<title>Bazan &amp; Co. — Premium Web Engineering | Custom Development, Technical SEO &amp; High-Converting Landing Pages</title>'
  )
  .replace(
    'content="Bazan &amp; Co. es una firma de ingeniería web en Chihuahua, México (servicio remoto global). Diseñamos sitios rápidos (<2s), bilingües y orientados a la conversión para negocios locales y PYMEs."',
    'content="Bazan &amp; Co. is a software and web engineering firm in Chihuahua, Mexico (serving clients globally). We build fast (<2s), bilingual, conversion-driven websites for SMBs."'
  )
  .replace(
    'content="Bazan &amp; Co. — No construimos páginas web. Diseñamos máquinas de conversión."',
    'content="Bazan &amp; Co. — We don\'t just build websites. We engineer conversion machines."'
  )
  .replace(
    'content="Firma de ingeniería web en Chihuahua, México. Diseño web premium, SEO técnico y landing pages de alta conversión con carga menor a 2 segundos."',
    'content="Software and web engineering firm in Chihuahua, Mexico. Premium web design, technical SEO, and high-converting landing pages with sub-2s load times."'
  )
  .replace(
    'content="Bazan &amp; Co. — Ingeniería Web Premium | Desarrollo, SEO &amp; Landing Pages"',
    'content="Bazan &amp; Co. — Premium Web Engineering | Development, SEO &amp; Landing Pages"'
  )
  .replace(
    'content="Diseño web premium, SEO técnico y landing pages de alta conversión para negocios locales y PYMEs."',
    'content="Premium web design, technical SEO, and high-converting landing pages for growing businesses and SMBs."'
  )
  .replace(
    '"description": "Firma de ingeniería web en Chihuahua, México con servicio remoto global: diseño web premium, SEO técnico y landing pages de alta conversión para negocios locales y PYMEs."',
    '"description": "Software and web engineering firm in Chihuahua, Mexico serving clients globally: premium web design, technical SEO, and high-converting landing pages for SMBs."'
  )
  .replace(
    '<link rel="canonical" href="https://bazanconsultoria.netlify.app/" />',
    '<link rel="canonical" href="https://bazanconsultoria.netlify.app/en/" />'
  )
  .replace(
    '<meta property="og:url" content="https://bazanconsultoria.netlify.app/" />',
    '<meta property="og:url" content="https://bazanconsultoria.netlify.app/en/" />'
  )
  .replace(
    '<meta property="og:locale" content="es_MX" />',
    '<meta property="og:locale" content="en_US" />'
  )
  .replace(
    '<meta property="og:locale:alternate" content="en_US" />',
    '<meta property="og:locale:alternate" content="es_MX" />'
  )
  .replace('<div id="root"></div>', `<div id="root">${enHtml}</div>`);

writeFileSync(resolve(enDir, 'index.html'), finalEnHtml, 'utf-8');

rmSync(ssrDir, { recursive: true, force: true });
console.log(
  '> Prerender completado con CSS crítico inline: dist/index.html (ES) y dist/en/index.html (EN)'
);
