// Reporte de tamaño del build: `node scripts/report-size.mjs` (tras `astro build`).
// Muestra el peso real que descarga cada página (HTML + JS + CSS + fuentes precargadas)
// y el total por tipo de archivo, en bruto, gzip y brotli.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const DIST = 'dist';

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function sizes(buffer) {
  return {
    raw: buffer.length,
    gzip: gzipSync(buffer, { level: 9 }).length,
    brotli: brotliCompressSync(buffer).length,
  };
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
const files = walk(DIST);
const typeOf = (file) => {
  const ext = extname(file).slice(1);
  if (['woff2', 'woff'].includes(ext)) return 'font';
  if (['avif', 'webp', 'png', 'jpg', 'jpeg', 'svg', 'ico'].includes(ext)) return 'image';
  return ext;
};

const totals = new Map();
for (const file of files) {
  const type = typeOf(file);
  const s = sizes(readFileSync(file));
  const t = totals.get(type) ?? { count: 0, raw: 0, gzip: 0, brotli: 0 };
  totals.set(type, {
    count: t.count + 1,
    raw: t.raw + s.raw,
    gzip: t.gzip + s.gzip,
    brotli: t.brotli + s.brotli,
  });
}

console.log('\n== Totales por tipo (dist/) ==');
console.table(
  [...totals].map(([type, t]) => ({
    tipo: type,
    archivos: t.count,
    bruto: kb(t.raw),
    gzip: ['font', 'image'].includes(type) ? '—' : kb(t.gzip),
    brotli: ['font', 'image'].includes(type) ? '—' : kb(t.brotli),
  })),
);

// Peso por página: recursos referenciados desde el HTML (scripts, módulos, preloads, estilos).
const pages = files.filter((f) => f.endsWith('.html'));
const refRegex = /(?:src|href)="(\/_astro\/[^"]+)"/g;
const importRegex = /(?:import\(|from\s*|import\s*)["'](\/_astro\/[^"']+|\.\/[^"']+)["']/g;

function jsClosure(entry, seen = new Set()) {
  if (seen.has(entry)) return seen;
  seen.add(entry);
  const code = readFileSync(join(DIST, entry), 'utf8');
  for (const [, ref] of code.matchAll(importRegex)) {
    const resolved = ref.startsWith('./') ? `/_astro/${ref.slice(2)}` : ref;
    if (resolved.endsWith('.js')) jsClosure(resolved, seen);
  }
  return seen;
}

console.log('\n== Peso por página (HTML con CSS inline + JS alcanzable + fuentes precargadas) ==');
const rows = pages.map((page) => {
  const html = readFileSync(page);
  const htmlText = html.toString('utf8');
  const refs = [...htmlText.matchAll(refRegex)].map((m) => m[1]);
  const islandRefs = [
    ...htmlText.matchAll(/(?:component-url|renderer-url)="(\/_astro\/[^"]+)"/g),
  ].map((m) => m[1]);
  const js = new Set();
  for (const ref of [...refs, ...islandRefs].filter((r) => r.endsWith('.js'))) jsClosure(ref, js);
  const fonts = refs.filter((r) => r.endsWith('.woff2'));
  const jsGzip = [...js].reduce((sum, f) => sum + sizes(readFileSync(join(DIST, f))).gzip, 0);
  const fontBytes = fonts.reduce((sum, f) => sum + statSync(join(DIST, f)).size, 0);
  return {
    página: '/' + relative(DIST, page).split(sep).join('/'),
    'HTML gzip': kb(sizes(html).gzip),
    'JS gzip (total diferido)': kb(jsGzip),
    'archivos JS': js.size,
    'fuentes precargadas': `${fonts.length} · ${kb(fontBytes)}`,
  };
});
console.table(rows);
