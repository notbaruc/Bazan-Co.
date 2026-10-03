// Lista los placeholders `[PENDIENTE USUARIO]` del código fuente: `node scripts/list-pending.mjs`.
// Con `--strict` termina con código 1 si queda alguno (útil antes de lanzar a producción).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MARK = '[PENDIENTE USUARIO]';
const strict = process.argv.includes('--strict');

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const hits = walk('src')
  .filter((file) => /\.(astro|tsx?|json|css)$/.test(file))
  .flatMap((file) =>
    readFileSync(file, 'utf8')
      .split('\n')
      .map((line, i) => ({ file, line: i + 1, text: line.trim() }))
      .filter(({ text }) => text.includes(MARK)),
  );

for (const { file, line, text } of hits) console.log(`${file}:${line}  ${text}`);
console.log(`\n${hits.length} placeholder(s) ${MARK}.`);
if (strict && hits.length > 0) process.exit(1);
